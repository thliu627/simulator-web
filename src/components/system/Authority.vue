<template>
  <el-container v-loading="loading">
    <el-header style="margin-top:10px;padding-top: 12px;padding-bottom: 0px;border: solid 1px #e6e6e6;text-align: left">
      <template v-for="(application,index) in applicationList">
        <el-button @click="changeApplication(application,index)" size="small"
                   :type="activeIndex==index?'primary':''">{{application.nameZh}}
        </el-button>
      </template>
    </el-header>
    <el-main v-show="true" style="padding-left: 0px; padding-top: 10px; padding-right: 0px">
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
        <el-button type="primary" size="mini" style="margin-left: 5px" icon="el-icon-search" @click="loadAuthority">搜索
        </el-button>
        <el-button style="float: right;" type="primary" @click="showAddAuthorityForm" size="mini" icon="el-icon-plus">添加权限
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
            width="148">
            <template slot-scope="scope">
              <el-button @click="showEditAuthorityForm(scope.row)" size="mini">编辑
              </el-button>
              <el-button @click="deleteAuthority(scope.row)" type="danger" size="mini">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="display: flex;float:right;justify-content: space-between;margin: 2px">
          <el-pagination
            background
            :page-size="authorityTable.pageSize"
            :current-page="authorityTable.currentPage"
            @current-change="changeAuthority"
            layout="total, prev, pager, next"
            :total="authorityTable.totalCount">
          </el-pagination>
        </div>
      </div>
    </el-main>
    <el-form v-loading="formLoading" :model="authority" :rules="rules" ref="authority" style="margin: 0px;padding: 0px;" label-width="80px">
      <div style="text-align: left">
        <el-dialog
          :title="dialogTitle"
          style="padding-left: 0px;"
          :close-on-click-modal="false"
          @close="cancelForm"
          :visible.sync="dialogVisible"
          width="30%">
          <el-row>
            <el-col>
              <div>
                <el-form-item prop="name" label="权限名:">
                  <el-input v-model="authority.name" size="mini" style="width: 200px"
                            placeholder="请输入权限名"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col>
              <div>
                <el-form-item prop="path"  label="路径:">
                  <el-input v-model="authority.path" size="mini" style="width: 200px"
                            placeholder="请输入路径"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div>
                <el-form-item prop="method" label="类型:">
                  <el-select v-model="authority.method" size="mini"  style="width: 200px" placeholder="请选择类型">
                    <el-option
                      v-for="ar in httpMethod"
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
                  <el-input v-model="authority.remark" size="mini" style="width: 200px"
                            placeholder="请输入备注"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div>
                <el-form-item prop="enabled" label="状态:">
                  <el-select v-model="authority.enabled" size="mini" style="width: 200px" placeholder="请选择类型">
                    <el-option
                      v-for="ar in enabledStatus"
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
            <el-button size="mini" @click="cancelForm">取 消</el-button>
            <el-button size="mini" type="primary" @click="submitForm('authority')">确 定</el-button>
            </span>
        </el-dialog>
      </div>
    </el-form>
  </el-container>
</template>
<script>
  export default {
    data() {
      return {
        dataList: [],
        currentApplicationId: '',
        applicationList: [{
          applicationId: '',
          name: '',
          nameZh: '',
          remark: ''
        }
        ],
        activeIndex: 0,
        authorityList: [],
        authorityTable: {
          pageSize: 10,
          totalCount: -1,
          currentPage: 1,
        },
        authority: {
          authorityId: '',
          name: '',
          path: '',
          method: '',
          remark: '',
          enabled: ''
        },
        formLoading: '',
        loading: '',
        httpMethod: [],
        enabledStatus: [],
        dialogTitle: '',
        dialogVisible: false,
        rules: {
          name: [
            { required: true, message: '请输入权限名', trigger: 'blur' }
          ],
          path: [
            { required: true, message: '请输入路径', trigger: 'blur' }
          ],
          method: [
            { required: true, message: '请输入类别', trigger: 'change' }
          ],
          enabled: [
            { required: true, message: '请输入状态', trigger: 'change' }
          ]
        }
      }
    },
    mounted: function () {
      this.initData();
    },
    methods: {
      initData() {
        this.loadApplication();
      },
      initEnabledStatus() {
        this.enabledStatus = [
          {
            status: false,
            description: "禁用"
          },
          {
            status: true,
            description: "启用"
          }
        ]
      },
      initHttpMethod() {
        this.httpMethod = [
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
          this.loadAuthority();
          this.initHttpMethod();
          this.initEnabledStatus();
        });
      },
      loadAuthority() {
        let _this = this;
        this.loading = true;
        this.getRequest("sso-service", "/authority?applicationId=" + this.currentApplicationId + "&pageNumber=" + this.authorityTable.currentPage + "&pageSize=" + this.authorityTable.pageSize).then(resp => {
          _this.authorityList = resp.data.dataList;
          _this.authorityTable.totalCount = resp.data.totalCount;
          _this.loading = false;
        });
      },
      changeAuthority(currentChange) {
        this.authorityTable.currentPage = currentChange;
        this.loadAuthority();
      },
      changeApplication(application, index) {
        this.activeIndex = index;
        this.currentApplicationId = application.applicationId;
        this.loadAuthority();
      },
      cancelForm() {
        this.dialogVisible = false;
        this.clearEditAuthorityForm();
      },
      showAddAuthorityForm() {
        this.dialogTitle = "新增权限";
        this.dialogOperation = "addAuthority";
        this.dialogVisible = true;
      },
      showEditAuthorityForm(row) {
        this.dialogTitle = "编辑权限";
        this.dialogOperation = "editAuthority";
        this.authority.authorityId = row.authorityId;
        this.authority.name = row.name;
        this.authority.path = row.path;
        this.authority.method = row.method;
        this.authority.enabled = row.enabled;
        this.authority.remark = row.remark;
        this.dialogVisible = true;
      },
      submitForm(formName) {
        let _this = this;
        this.formLoading = true;
        this.$refs[formName].validate((valid) => {
          console.log(valid);
          if (valid) {
            if (this.dialogOperation == 'addAuthority') {
              this.postRequest("sso-service", "/authority?applicationIrespd=" + this.currentApplicationId, this.authority).then(resp => {
                _this.formLoading = false;
                if (resp.code == '000000') {
                  _this.$message({type: 'success', message: resp.msg});
                } else {
                  _this.$message({type: 'error', message: resp.msg});
                }
                _this.dialogVisible = false;
                _this.clearEditAuthorityForm();
                _this.loadAuthority();
              })
            } else if (this.dialogOperation == 'editAuthority') {
              this.putRequest("sso-service", "/authority", this.authority).then(resp => {
                _this.formLoading = false;
                if (resp.code == '000000') {
                  _this.$message({type: 'success', message: resp.msg});
                } else {
                  _this.$message({type: 'error', message: resp.msg});
                }
                _this.dialogVisible = false;
                _this.clearEditAuthorityForm();
                _this.loadAuthority();
              })
            }
          }
          _this.formLoading = false;
        });
      },
      doDelete(authorityId){
        this.formLoading = true;
        let _this = this;
        this.deleteRequest("sso-service", "/authority?authorityId="+authorityId).then(resp=> {
          _this.formLoading = false;
          if (resp.code == '000000') {
            _this.$message({type: 'success', message: resp.msg});
          } else {
            _this.$message({type: 'error', message: resp.msg});
          }
          _this.loadAuthority();
        })
      },
      deleteAuthority(row) {
        this.$confirm('此操作将永久删除[' + row.name + '], 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.doDelete(row.authorityId);
        }).catch(() => {
        });
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
