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
      <el-aside style="width:20%;border-left: #e6e6e6 1px solid; border-right: #e6e6e6 1px solid; border-top: #e6e6e6 1px solid">
        <el-tree :props="moduleTreeProps"
                 :data="moduleTree"
                 default-expand-all
                 :highlight-current="true"
                 :expand-on-click-node="false"
                 node-key="moduleId"
                 ref="tree"
                 @node-click="handleNodeClick"
                 highlight-current>
        </el-tree>
      </el-aside>
      <el-main style="padding-left: 10px; padding-top: 0px; padding-right: 0px;">
        <el-tabs v-show="modulePanelShow" type="card">
          <el-tab-pane label="下级模块">
            <div style="text-align: left;">
              <el-input
                placeholder="在此处填写模块名,记得回车哦..."
                clearable
                style="width:300px;margin: 0px;padding: 0px;"
                size="mini"
                @keyup.enter.native="loadAuthority"
                prefix-icon="el-icon-search">
                <!--v-model="keywords"-->
              </el-input>
              <el-button type="primary" size="mini" style="margin-left: 5px" icon="el-icon-search" @click="loadModule">搜索
              </el-button>
              <el-button style="float: right;" type="primary" @click="showAddModuleForm" size="mini" icon="el-icon-plus">添加下级模块
              </el-button>
            </div>
            <div style="text-align: left; margin-top: 10px">
              <el-table
                :data="moduleList"
                border
                stripe
                style="width: 100%"
                size="mini">
                <el-table-column
                  prop="name"
                  align="left"
                  label="模块名">
                </el-table-column>
                <el-table-column
                  prop="path"
                  align="left"
                  label="路由">
                </el-table-column>
                <el-table-column
                  prop="component"
                  align="left"
                  label="组件">
                </el-table-column>
                <el-table-column
                  prop="location"
                  align="left"
                  label="组件定位">
                </el-table-column>
                <el-table-column
                  prop="keepAlive"
                  align="left"
                  label="是否常驻">
                  <template slot-scope="scope">
                    {{scope.row.keepAlive==false?'实时渲染':'常驻'}}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="requireAuth"
                  align="left"
                  label="是否鉴权">
                  <template slot-scope="scope">
                    {{scope.row.requireAuth==false?'不鉴权':'鉴权'}}
                  </template>
                </el-table-column>
                <el-table-column
                  prop="enabled"
                  align="left"
                  label="状态">
                  <template slot-scope="scope">
                    <div :style="{'color': scope.row.enabled == true ? 'black' : 'red'}">
                      {{scope.row.enabled==false?'已禁用':'已启用'}}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="148">
                  <template slot-scope="scope">
                    <el-button @click="showEditModuleForm(scope.row)" size="mini">编辑
                    </el-button>
                    <el-button @click="deleteModule(scope.row)" type="danger" size="mini">删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
        <el-tabs v-loading="authorityTableLoading" v-show="authorityPanelShow" type="card">
          <el-tab-pane label="权限关联">
            <div style="text-align: left;">
              <el-input
                placeholder="在此处填写权限名,记得回车哦..."
                clearable
                style="width:300px;margin: 0px;padding: 0px;"
                size="mini"
                @keyup.enter.native="loadAuthority"
                prefix-icon="el-icon-search">
                <!--v-model="keywords"-->
              </el-input>
              <el-button type="primary" size="mini" style="margin-left: 5px" icon="el-icon-search" @click="loadModule">搜索
              </el-button>
              <el-button style="float: right;" type="primary" @click="showAddAuthorityForm" size="mini" icon="el-icon-plus">添加权限关联
              </el-button>
            </div>
            <div style="text-align: left; margin-top: 10px">
              <el-table
                :data="authorityList"
                border
                stripe
                style="width: 100%"
                size="mini">
                <el-table-column
                  prop="name"
                  align="left"
                  label="权限名">
                </el-table-column>
                <el-table-column
                  prop="path"
                  align="left"
                  label="路由">
                </el-table-column>
                <el-table-column
                  prop="method"
                  align="left"
                  label="请求类型">
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
                    <div :style="{'color': scope.row.enabled == true ? 'black' : 'red'}">
                      {{scope.row.enabled==false?'已禁用':'已启用'}}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="74">
                  <template slot-scope="scope">
                    <el-button @click="deleteAuthority(scope.row)" type="danger" size="mini">删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
        </el-tabs>
        <el-form v-loading="moduleFormLoading" :model="module" :rules="moduleRules" ref="moduleForm" style="margin: 0px;padding: 0px;" label-width="80px">
          <div style="text-align: left">
            <el-dialog
              :title="moduleDialogTitle"
              style="padding-left: 0px;"
              :close-on-click-modal="false"
              @close="cancelModuleForm"
              :visible.sync="moduleDialogVisible"
              width="30%">
              <el-row>
                <el-col>
                  <div>
                    <el-form-item prop="name" label="模块名:">
                      <el-input v-model="module.name" size="mini" style="width: 200px"
                                placeholder="请输入模块名"></el-input>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col>
                  <div>
                    <el-form-item prop="path"  label="路由:">
                      <el-input v-model="module.path" size="mini" style="width: 200px"
                                placeholder="请输入路由"></el-input>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <div>
                    <el-form-item prop="component" label="组件:">
                      <el-input v-model="module.component" size="mini" style="width: 200px"
                                placeholder="请输入组件"></el-input>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col>
                  <div>
                    <el-form-item prop="location" label="组件定位:">
                      <el-input v-model="module.location" size="mini" style="width: 200px"
                                placeholder="请输入组件定位"></el-input>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <div>
                    <el-form-item prop="keepAlive" label="是否常驻:">
                      <el-select v-model="module.keepAlive" size="mini" style="width: 200px" placeholder="请选择类型">
                        <el-option
                          v-for="item in selected.keepAlive"
                          :key="item.status"
                          :label="item.description"
                          :value="item.status">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col>
                  <div>
                    <el-form-item prop="requireAuth" label="是否鉴权:">
                      <el-select v-model="module.requireAuth" size="mini" style="width: 200px" placeholder="请选择类型">
                        <el-option
                          v-for="item in selected.requireAuth"
                          :key="item.status"
                          :label="item.description"
                          :value="item.status">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <div>
                    <el-form-item prop="enabled" label="状态:">
                      <el-select v-model="module.enabled" size="mini" style="width: 200px" placeholder="请选择类型">
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
            <el-button size="mini" @click="cancelModuleForm">取 消</el-button>
            <el-button size="mini" type="primary" @click="submitModuleForm('moduleForm')">确 定</el-button>
            </span>
            </el-dialog>
          </div>
        </el-form>
        <el-form v-loading="authorityFormLoading" :model="authority" :rules="authorityRules" ref="authorityForm" style="margin: 0px;padding: 0px;" label-width="80px">
          <div style="text-align: left">
            <el-dialog
              :title="authorityDialogTitle"
              style="padding-left: 0px;"
              :close-on-click-modal="false"
              @close="cancelAuthorityForm"
              :visible.sync="authorityDialogVisible"
              width="30%">
              <el-row>
                <el-col>
                  <div>
                    <el-form-item prop="name" label="权限:">
                      <el-select v-model="authority.authorityId" size="mini" style="width: 200px" placeholder="请选择权限" @change="changeAuthorityName">
                        <el-option
                          v-for="item in allAuthorityList"
                          :key="item.authorityId"
                          :label="item.name"
                          :value="item.authorityId">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col>
                  <div>
                    <el-form-item prop="path"  label="路径:">
                      <el-input v-model="authority.path" size="mini" style="width: 200px" disabled
                      ></el-input>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <div>
                    <el-form-item prop="method" label="类型:">
                      <el-select v-model="authority.method" size="mini"  style="width: 200px"  placeholder="" disabled>
                        <el-option
                          v-for="ar in selected.httpMethod"
                          :key="ar.method"
                          :label="ar.method"
                          :value="ar.method">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </el-col>
                <el-col>
                  <div>
                    <el-form-item prop="remark" label="备注:">
                      <el-input v-model="authority.remark" size="mini" style="width: 200px" disabled></el-input>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <div>
                    <el-form-item prop="enabled" label="状态:">
                      <el-select v-model="authority.enabled" size="mini" placeholder=""  style="width: 200px" disabled>
                        <el-option
                          v-for="ar in selected.enabled"
                          :key="ar.status"
                          :label="ar.description"
                          :value="ar.status">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </div>
                </el-col>
              </el-row>
              <span slot="footer">
            <el-button size="mini" @click="cancelAuthorityForm">取 消</el-button>
            <el-button size="mini" type="primary" @click="submitAuthorityForm('authorityForm')">确 定</el-button>
            </span>
            </el-dialog>
          </div>
        </el-form>
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

        currentModuleId: '',
        currentApplicationId: '',
        applicationList: [{
          applicationId: '',
          name: '',
          nameZh: '',
          remark: ''
        }
        ],
        activeIndex: 0,

        moduleList: [{
            moduleId: '',
            name: '',
            path: '',
            component: '',
            iconUrl: '',
            keepAlive: '',
            requireAuth: '',
            enabled: ''
          }
        ],
        module: {
          moduleId: '',
          name: '',
          path: '',
          component: '',
          iconUrl: '',
          keepAlive: '',
          location: '',
          requireAuth: '',
          enabled: ''
        },
        moduleFormLoading: '',
        moduleForm: '',
        moduleDialogTitle: '',
        moduleDialogVisible: false,
        moduleDialogOperation: '',
        modulePanelShow: '',
        moduleRules: {
          name: [
            {required: true, message: '请输入模块名', trigger: 'blur'}
          ],
          path: [
            {required: true, message: '请输入路由', trigger: 'blur'}
          ],
          enabled: [
            {required: true, message: '请输入状态', trigger: 'change'}
          ]
        },

        authorityList: [{
          authorityId: '',
          name: '',
          path: '',
          method: '',
          remark: '',
          enabled: ''
        }],
        authority: {
          authorityId: '',
          name: '',
          path: '',
          method: '',
          remark: '',
          enabled: ''
        },
        authorityTableLoading: false,
        allAuthorityList: [],
        authorityPanelShow: '',
        authorityFormLoading: '',
        authorityDialogTitle: '',
        authorityDialogVisible: false,
        authorityDialogOperation: '',
        authorityRules: {
          authorityId: [
            {required: true, message: '请选择权限', trigger: 'change'}
          ],
        },

        selected: {
          enabled: [],
          keepAlive: [],
          requireAuth: [],
          httpMethod: []
        },
        moduleTree: [{
          moduleId: '',
          name: '',
          path: '',
          component: '',
          location: '',
          iconUrl: '',
          keepAlive: '',
          requireAuth: '',
          enabled: '',
          sequence: '',
          children: [],
          authorityList: [],
          application: {
            applicationId: 2,
            name: '',
            nameZh: '',
            remark: ''
          }
        }],
        moduleTreeProps: {
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
      loadAllAuthorityList () {
        let _this = this;
        this.getRequest("sso-service", "/authority/"+this.currentApplicationId+"").then(resp => {
          _this.allAuthorityList = resp.data;
        });
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
        ],
        this.selected.keepAlive = [
          {
            status: true,
            description: "常驻"
          },
          {
            status: false,
            description: "实时渲染"
          }
        ],
        this.selected.requireAuth = [
          {
            status: false,
            description: "鉴权"
          },
          {
            status: true,
            description: "不鉴权"
          }
        ],
        this.selected.httpMethod = [
        {
          method: 'GET'
        }, {
          method: 'POST'
        }, {
          method: 'PUT'
        }, {
          method: 'DELETE'
        }, {
          method: 'OPTIONS'
        }, {
          method: 'TRACE'
        }, {
          method: 'HEAD'
        }]
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
          this.loadModule();
          this.loadAllAuthorityList();
        });
      },
      loadModule () {
        let _this = this;
        this.loading = true;
        this.getRequest("sso-service", "/module/allTree?applicationId=" + this.currentApplicationId).then(resp => {
          if (resp.data != null) {
            _this.moduleTree = [resp.data];
          }else {
            _this.moduleTree = [];
          }
          _this.refreshModuleList(resp.data);
          _this.loading = false;
        });
      },
      loadAuthority() {
        let _this = this;
        this.authorityTableLoading = true;
        this.getRequest("sso-service", "/authority/byModule?moduleId=" + this.currentModuleId).then(resp => {
          _this.authorityList = resp.data;
          _this.authorityTableLoading = false;
        });
      },
      /**
       * 递归找到moduleTree中的children并赋值给moduleList
       * @param children
       * @param currentKey
       */
      refreshModuleList (moduleTree) {
        let currentKey = this.$refs.tree.getCurrentKey();
        if (currentKey != null) {
          this.findByChildren([moduleTree], currentKey);
        }
      },
      /**
       * 递归找到moduleTree中的children并赋值给moduleList
       * 注意：this.$refs.tree.getCurrentNode()具有缓存
       * 即便重新将moduleTree赋值,currentNode不会立刻改变
       * @param children
       * @param currentKey
       */
      findByChildren(children, currentKey) {
        if (children.length == 0) {
          return;
        }
        children.forEach(childModule => {
          if (childModule.moduleId == currentKey) {
            this.moduleList = childModule.children;
            return;
          }
          this.findByChildren(childModule.children, currentKey);
        });
      },
      changeApplication(application, index) {
        this.activeIndex = index;
        this.currentApplicationId = application.applicationId;
        this.loadModule();
        this.loadAllAuthorityList();
        this.modulePanelShow = false;
        this.authorityPanelShow = false;
      },
      changeAuthorityName () {
        this.allAuthorityList.forEach(authority=> {
          if (authority.authorityId == this.authority.authorityId) {
            this.authority.name = authority.name;
            this.authority.path = authority.path;
            this.authority.method = authority.method;
            this.authority.remark = authority.remark;
            this.authority.enabled = authority.enabled;
            return;
          }
        })
      },
      cancelModuleForm() {
        this.moduleDialogVisible = false;
        this.clearEditModuleForm();
      },
      cancelAuthorityForm () {
        this.authorityDialogVisible = false;
        this.clearEditAuthorityForm();
      },
      showAddModuleForm() {
        this.moduleDialogTitle = "添加下级模块";
        this.moduleDialogOperation = "addModule";
        this.moduleDialogVisible = true;
      },
      showEditModuleForm(row) {
        this.moduleDialogTitle = "编辑模块";
        this.moduleDialogOperation = "editModule";
        this.module.moduleId = row.moduleId;
        this.module.name = row.name;
        this.module.path = row.path;
        this.module.component = row.component;
        this.module.location = row.location;
        this.module.keepAlive = row.keepAlive;
        this.module.requireAuth = row.requireAuth;
        this.module.enabled = row.enabled;
        this.moduleDialogVisible = true;
      },
      showAddAuthorityForm() {
        this.authorityDialogTitle = "添加权限关联";
        this.authorityDialogOperation = "addAuthority";
        this.authorityDialogVisible = true;
      },
      submitModuleForm(formName) {
        let _this = this;
        this.moduleFormLoading = true;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.moduleDialogOperation == 'addModule') {
              this.postRequest("sso-service", "/module?applicationId=" + this.currentApplicationId + "&parentId=" + this.currentModuleId, this.module).then(resp => {
                if (resp.code == '000000') {
                  _this.$message({type: 'success', message: resp.msg});
                }
                _this.clearEditModuleForm();
                _this.loadModule();
                _this.moduleFormLoading = false;
                _this.moduleDialogVisible = false;
              })
            } else if (this.moduleDialogOperation == 'editModule') {
              this.putRequest("sso-service", "/module", this.module).then(resp => {
                if (resp.code == '000000') {
                  _this.$message({type: 'success', message: resp.msg});
                }
                _this.clearEditModuleForm();
                _this.loadModule();
                _this.moduleFormLoading = false;
                _this.moduleDialogVisible = false;
              })
            }
          }
          _this.moduleFormLoading = false;
        });
      },
      submitAuthorityForm(formName) {
        let _this = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.authorityDialogOperation == 'addAuthority') {
              this.authorityFormLoading = true;
              this.postRequest("sso-service", "/module/link?moduleId=" + this.currentModuleId + "&authorityId=" + this.authority.authorityId).then(resp => {
                if (resp.code == '000000') {
                  _this.$message({type: 'success', message: resp.msg});
                }
                _this.cancelAuthorityForm();
                _this.loadAuthority();
                _this.authorityFormLoading = false;
                _this.authorityDialogVisible = false;
              })
            }
          }
        });
      },
      handleNodeClick(data, node, tree) {
        this.currentModuleId = data.moduleId;
        if (node.level == 3) {
          this.loadAuthority();
          this.authorityPanelShow = true;
          this.modulePanelShow = false;
        } else {
          this.moduleList = data.children;
          this.authorityPanelShow = false;
          this.modulePanelShow = true;
        }
      },
      doDelete(moduleId) {
        this.formLoading = true;
        let _this = this;
        this.deleteRequest("sso-service", "/module?moduleId=" + moduleId).then(resp => {
          if (resp.code == '000000') {
            _this.$message({type: 'success', message: resp.msg});
          }
          _this.loadModule();
        })
      },
      doDeleteAuthority(authorityId) {
        this.formLoading = true;
        let _this = this;
        this.deleteRequest("sso-service", "/module/link?moduleId=" + this.currentModuleId + "&authorityId=" + authorityId).then(resp => {
          if (resp.code == '000000') {
            _this.$message({type: 'success', message: resp.msg});
          }
          _this.loadAuthority();
        })
      },
      deleteModule(row) {
        this.$confirm('此操作将永久删除[' + row.name + '], 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.doDelete(row.moduleId);
        }).catch(() => {
        });
      },
      deleteAuthority(row) {
        this.$confirm('此操作将永久删除[' + row.name + '], 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.doDeleteAuthority(row.authorityId);
        }).catch(() => {
        });
      },
      clearEditModuleForm() {
        this.module = {
          moduleId: '',
          name: '',
          path: '',
          component: '',
          iconUrl: '',
          keepAlive: '',
          requireAuth: '',
          enabled: ''
        }
      },
      clearEditAuthorityForm() {
        this.authority = {
          authorityId: '',
          name: '',
          path: '',
          method: '',
          remark: '',
          enabled: ''
        };
      },
    }
  }
</script>
