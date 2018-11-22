<template>
  <el-container v-loading="loading" style="height: 98%">
    <el-header style="margin-top:10px;padding-top: 12px;padding-bottom: 0px;border: solid 1px #e6e6e6;text-align: left">
        <template v-for="(application,index) in applicationList">
            <el-button @click="changeApplication(application,index)" size="small"
                       :type="activeIndex==index?'primary':''">{{application.nameZh}}
            </el-button>
        </template>
    </el-header>
    <el-container style="margin-top: 10px;">
      <el-aside style="padding-top: 0px; padding-right: 10px; width: 80%">
        <div style="text-align: left;">
          <el-input
            placeholder="在此处填写角色名,记得回车哦..."
            clearable
            style="width:300px;margin: 0px;padding: 0px;"
            size="mini"
            @keyup.enter.native="loadAuthority"
            prefix-icon="el-icon-search">
            <!--v-model="keywords"-->
          </el-input>
          <el-button type="primary" size="mini" style="margin-left: 5px" icon="el-icon-search" @click="loadRole">搜索
          </el-button>
          <el-button style="float: right;" type="primary" @click="showAddRoleForm" size="mini" icon="el-icon-plus">添加角色
          </el-button>
        </div>
        <div style="text-align: left; margin-top: 10px">
          <el-table
            @row-click="handleTableClick"
            :data="roleList"
            border
            :highlight-current-row="true"
            style="width: 100%"
            size="mini">
            <el-table-column
              prop="name"
              align="left"
              label="角色名">
            </el-table-column>
            <el-table-column
              prop="remark"
              align="left"
              label="备注">
            </el-table-column>
            <el-table-column
              prop="enabled"
              align="left"
              label="状态">
              <template slot-scope="scope">
                {{scope.row.enabled==false?'禁用':'有效'}}
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="245">
              <template slot-scope="scope">
                <el-button size="mini" @click="showModuleAuthority(scope.row)">分配权限</el-button>
                <el-button @click="showEditRoleForm(scope.row)" size="mini">编辑
                </el-button>
                <el-button @click="deleteRole(scope.row)" type="danger" size="mini">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <el-form v-loading="roleFormLoading" :model="role" :rules="roleRules" ref="roleForm"
                 style="margin: 0px;padding: 0px;" label-width="80px">
          <div style="text-align: left">
            <el-dialog
              :title="roleDialogTitle"
              style="padding-left: 0px;"
              :close-on-click-modal="false"
              @close="cancelRoleForm"
              :visible.sync="roleDialogVisible"
              width="30%">
              <el-row>
                <el-col>
                  <div>
                    <el-form-item prop="name" label="角色名">
                      <el-input v-model="role.name" size="mini" style="width: 200px"
                                placeholder="请输入模块名"></el-input>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col>
                  <div>
                    <el-form-item prop="remark" label="备注">
                      <el-input v-model="role.remark" size="mini" style="width: 200px"
                                placeholder="请输入路由"></el-input>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <div>
                    <el-form-item prop="enabled" label="状态:">
                      <el-select v-model="role.enabled" size="mini" style="width: 200px" placeholder="请选择类型">
                        <el-option
                          v-for="item in selected.enabled"
                          :key="item.status"
                          :label="item.description"
                          :value="item.status">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <span slot="footer">
              <el-button size="mini" @click="cancelRoleForm">取 消</el-button>
              <el-button size="mini" type="primary" @click="submitRoleForm('roleForm')">确 定</el-button>
            </span>
            </el-dialog>
          </div>
        </el-form>
      </el-aside>
      <el-main
        style="padding-left: 0px;padding-top:10px; padding-right:0px;border-left: #e6e6e6 1px solid; border-right: #e6e6e6 1px solid; border-top: #e6e6e6 1px solid">
        <div style="text-align:left;padding-left:10px;font-size: 14px">当前角色:[{{currentRole.name || '未选中'}}]</div>
        <el-tree :props="moduleAuthorityTreeProp"
                 :data="moduleAuthorityTree"
                 default-expand-all
                 show-checkbox
                 :indent="35"
                 v-loading="treeLoading"
                 :highlight-current="true"
                 :expand-on-click-node="false"
                 node-key="id"
                 ref="tree"
                 highlight-current>
        </el-tree>
        <el-button style="float:left;margin-top:10px;margin-left: 10px" type="primary"
                   @click="submitModuleAuthorityTree()" size="mini">保存
        </el-button>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
  export default {
    data() {
      return {
        dataList: [],
        loading: '',

        currentRole: {
          roleId: '',
          name: ''
        },
        currentApplicationId: '',
        applicationList: [{
          applicationId: '',
          name: '',
          nameZh: '',
          remark: ''
        }],
        activeIndex: 0,

        roleList: [{
          roleId: '',
          name: '',
          remark: '',
          enabled: ''
        }],
        role: {
          roleId: '',
          name: '',
          remark: '',
          enabled: ''
        },
        roleFormLoading: '',
        roleForm: '',
        roleDialogTitle: '',
        roleDialogVisible: false,
        roleDialogOperation: '',
        roleRules: {
          name: [
            {required: true, message: '请输入权限名', trigger: 'blur'}
          ],
          enabled: [
            {required: true, message: '请输入状态', trigger: 'change'}
          ]
        },

        selected: {
          enabled: []
        },
        treeLoading: false,
        moduleAuthorityTree: [],
        moduleAuthorityTreeProp: {
          label: 'name',
          children: 'children'
        }
      }
    },
    mounted: function () {
      this.initData();
    },
    methods: {
      initData() {
        this.initSelectedConstant();
        this.loadApplication();
      },
      initSelectedConstant() {
        this.selected.enabled = [
          {
            status: true,
            description: "启用"
          },
          {
            status: false,
            description: "禁用"
          }
        ]
      },
      loadApplication() {
        let _this = this;
        this.getRequest("sso-service", "/application/all").then(resp => {
          if (resp.data.length == 0) {
            return;
          }
          let applicationList = resp.data;
          _this.applicationList = applicationList;
          _this.currentApplicationId = applicationList[0].applicationId;
          this.loadRole();
          this.loadModuleAuthority();
        });
      },
      loadRole() {
        let _this = this;
        this.loading = true;
        this.getRequest("sso-service", "/role?applicationId=" + this.currentApplicationId).then(resp => {
          _this.roleList = resp.data;
          _this.loading = false;
        });
      },
      loadSelectedModuleAuthority() {
        let _this = this;
        this.treeLoading = true;
        this.getRequest("sso-service", "/role/selectedTree?roleId=" + this.currentRole.roleId).then(resp => {
          let moduleAuthoritySelectedList = resp.data;
          let checkedKeys = [];
          moduleAuthoritySelectedList.forEach(moduleAuthoritySelected=>{
            let checkedAuthorityId = null;
            if (moduleAuthoritySelected.authority != null) {
              checkedAuthorityId = moduleAuthoritySelected.module.moduleId * -1 + '#' + moduleAuthoritySelected.authority.authorityId;
              checkedKeys.push(checkedAuthorityId);
            }
          });
          _this.$refs.tree.setCheckedKeys(checkedKeys);
          _this.treeLoading = false;
        });
      },
      loadModuleAuthority() {
        let _this = this;
        this.treeLoading = true;
        this.getRequest("sso-service", "/role/tree?applicationId=" + this.currentApplicationId).then(resp => {
          let orgModuleAuthorityTree = resp.data;
          // 遍历tree 为了保证把moduleId
          orgModuleAuthorityTree.forEach(firstLevelModuleAuthorityTree=>{
            firstLevelModuleAuthorityTree.id = firstLevelModuleAuthorityTree.id*-1;
            firstLevelModuleAuthorityTree.children.forEach(secondLevelModuleAuthorityTree=> {
              secondLevelModuleAuthorityTree.id = secondLevelModuleAuthorityTree.id*-1;
              secondLevelModuleAuthorityTree.children.forEach(thirdLevelModuleAuthorityTree=> {
                thirdLevelModuleAuthorityTree.id = secondLevelModuleAuthorityTree.id + '#' + thirdLevelModuleAuthorityTree.id;
              });
            });
          });
          _this.moduleAuthorityTree = orgModuleAuthorityTree;
          _this.treeLoading = false;
        });
      },
      changeApplication(application, index) {
        this.activeIndex = index;
        this.currentApplicationId = application.applicationId;
        this.loadRole();
        this.loadModuleAuthority();
        this.$refs.tree.setCheckedKeys([]);
        this.currentRole = [];
      },
      cancelRoleForm() {
        this.roleDialogVisible = false;
        this.clearEditRoleForm();
      },
      showAddRoleForm() {
        this.roleDialogTitle = "新增角色";
        this.roleDialogOperation = "addRole";
        this.roleDialogVisible = true;
      },
      showEditRoleForm(row) {
        this.roleDialogTitle = "编辑角色";
        this.roleDialogOperation = "editRole";
        this.role.roleId = row.roleId;
        this.role.name = row.name;
        this.role.remark = row.remark;
        this.role.enabled = row.enabled;
        this.roleDialogVisible = true;
      },
      showModuleAuthority(row) {
        this.currentRole.roleId = row.roleId;
        this.currentRole.name = row.name;
        this.loadSelectedModuleAuthority();
      },
      handleTableClick(row) {
      },
      submitRoleForm(formName) {
        let _this = this;
        this.roleFormLoading = true;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.roleDialogOperation == 'addRole') {
              this.postRequest("sso-service", "/role?applicationId=" + this.currentApplicationId, this.role).then(resp => {
                if (resp.code == '000000') {
                  _this.$message({type: 'success', message: resp.msg});
                }
                _this.clearEditRoleForm();
                _this.loadRole();
                _this.roleFormLoading = false;
                _this.roleDialogVisible = false;
              })
            } else if (this.roleDialogOperation == 'editRole') {
              this.putRequest("sso-service", "/role", this.role).then(resp => {
                if (resp.code == '000000') {
                  _this.$message({type: 'success', message: resp.msg});
                }
                _this.clearEditRoleForm();
                _this.loadRole();
                _this.roleFormLoading = false;
                _this.roleDialogVisible = false;
              })
            }
          }
          _this.roleFormLoading = false;
        });
      },
      submitModuleAuthorityTree() {
        this.treeLoading = true;
        let checkedKeys = this.$refs.tree.getCheckedKeys();
        let treeIds = [];
        checkedKeys.forEach(id=>{
          let treeId = id.toString();
          let moduleId = '';
          let authorityId = '';
          if (treeId.indexOf('#') > -1) {
            let treeIdArray = treeId.split('#');
            moduleId = treeIdArray[0] * -1;
            authorityId = treeIdArray[1];
          } else {
            moduleId = treeId * -1;
          }
          let treeIdJSON = {
            moduleId: moduleId,
            authorityId: authorityId
          }
          treeIds.push(treeIdJSON);
        });
        if (this.currentRole.roleId == '' || this.currentRole.roleId == undefined) {
          this.$message({type: 'warning', message: '请点击分配权限'});
          this.treeLoading = false;
          return;
        }
        // if (treeIds.length == 0) {
        //   this.$message({type: 'warning', message: '未选择具体权限'});
        //   this.treeLoading = false;
        //   return;
        // }
        let _this = this;
        this.postRequestJSON("sso-service", "/role/tree?roleId=" + this.currentRole.roleId, JSON.stringify(treeIds)).then(resp => {
          if (resp.code == '000000') {
            _this.$message({type: 'success', message: resp.msg});
          }
          this.loadSelectedModuleAuthority();
          _this.treeLoading = false;
        })
      },
      doDeleteRole(roleId) {
        this.formLoading = true;
        let _this = this;
        this.deleteRequest("sso-service", "/role?roleId=" + roleId).then(resp => {
          if (resp.code == '000000') {
            _this.$message({type: 'success', message: resp.msg});
          }
          _this.loadRole();
        })
      },
      deleteRole(row) {
        this.$confirm('此操作将永久删除[' + row.name + '], 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.doDeleteRole(row.roleId);
        }).catch(() => {
        });
      },
      clearEditRoleForm() {
        this.role = {
          roleId: '',
          name: '',
          remark: '',
          enabled: ''
        }
      },
    }
  }
</script>
