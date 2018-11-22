<template>
  <el-container v-loading="loading">
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
        <el-button type="primary" size="mini" style="margin-left: 5px" icon="el-icon-search" @click="loadUser">搜索
        </el-button>
        <el-button style="float: right;" type="primary" @click="showAddUserForm" size="mini" icon="el-icon-plus">
          添加用户
        </el-button>
      </div>
      <div style="text-align: left; margin-top: 10px">
        <el-table
          :data="userList"
          border
          stripe
          style="width: 100%"
          size="mini">
          <el-table-column
            prop="username"
            align="left"
            label="用户名">
          </el-table-column>
          <el-table-column
            prop="nickname"
            align="left"
            label="昵称">
          </el-table-column>
          <el-table-column
            prop="mobile"
            align="left"
            label="手机号">
          </el-table-column>
          <el-table-column
            prop="email"
            align="left"
            label="邮箱">
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
              {{scope.row.enabled==false?'已禁用':'已启用'}}
            </template>
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="148">
            <template slot-scope="scope">
              <el-button @click="showEditUserForm(scope.row)" size="mini">编辑
              </el-button>
              <el-button @click="deleteUser(scope.row)" type="danger" size="mini">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="display: flex;float:right;justify-content: space-between;margin: 2px">
          <el-pagination
            background
            :page-size="userTable.pageSize"
            :current-page="userTable.currentPage"
            @current-change="changeUser"
            layout="total, prev, pager, next"
            :total="userTable.totalCount">
          </el-pagination>
        </div>
      </div>
    </el-main>
    <el-form v-loading="formLoading" :model="user" :rules="rules" ref="userForm" style="margin: 0px;padding: 0px;"
             label-width="80px">
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
                <el-form-item prop="username" label="用户名:">
                  <el-input v-model="user.username" size="mini" style="width: 200px"
                            placeholder="请输入权限名"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col>
              <div>
                <el-form-item prop="nickname" label="昵称:">
                  <el-input v-model="user.nickname" size="mini" style="width: 200px"
                            placeholder="请输入路径"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div>
                <el-form-item prop="mobile" label="手机号:">
                  <el-input v-model="user.mobile" size="mini" style="width: 200px"
                            placeholder="请输入路径"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col>
              <div>
                <el-form-item prop="email" label="邮箱:">
                  <el-input v-model="user.email" size="mini" style="width: 200px"
                            placeholder="请输入备注"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
              <el-col>
                <div>
                  <el-form-item prop="remark" label="备注:">
                    <el-input v-model="user.remark" size="mini" style="width: 200px"
                              placeholder="请输入备注"></el-input>
                  </el-form-item>
                </div>
              </el-col>
              <el-col>
                <div>
                  <el-form-item prop="enabled" label="状态:">
                    <el-select v-model="user.enabled" size="mini" style="width: 200px" placeholder="请选择类型">
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
            <el-button size="mini" type="primary" @click="submitForm('userForm')">确 定</el-button>
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
        userList: [{
          userId: '',
          username: '',
          nickname: '',
          mobile: '',
          email: '',
          remark: '',
          enabled: ''
        }],
        userTable: {
          pageSize: 10,
          totalCount: -1,
          currentPage: 1,
        },
        user: {
          userId: '',
          username: '',
          nickname: '',
          mobile: '',
          email: '',
          remark: '',
          enabled: ''
        },
        formLoading: '',
        loading: '',
        enabledStatus: [],
        dialogTitle: '',
        dialogVisible: false,
        rules: {
          name: [
            {required: true, message: '请输入权限名', trigger: 'blur'}
          ],
          path: [
            {required: true, message: '请输入路径', trigger: 'blur'}
          ],
          method: [
            {required: true, message: '请输入类别', trigger: 'change'}
          ],
          enabled: [
            {required: true, message: '请输入状态', trigger: 'change'}
          ]
        }
      }
    },
    mounted: function () {
      this.loadUser();
      this.initEnabledStatus();
    },
    methods: {
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
      loadUser() {
        let _this = this;
        this.loading = true;
        this.getRequest("sso-service", "/user?pageNumber=" + this.userTable.currentPage + "&pageSize=" + this.userTable.pageSize).then(resp => {
          _this.userList = resp.data.dataList;
          _this.userTable.totalCount = resp.data.totalCount;
          _this.loading = false;
        });
      },
      changeUser(currentChange) {
        this.userTable.currentPage = currentChange;
        this.loadUser();
      },
      cancelForm() {
        this.dialogVisible = false;
        this.clearEditUserForm();
      },
      showAddUserForm() {
        this.dialogTitle = "新增用户";
        this.dialogOperation = "addUser";
        this.dialogVisible = true;
      },
      showEditUserForm(row) {
        this.dialogTitle = "编辑用户";
        this.dialogOperation = "editUser";
        this.user.userId = row.userId;
        this.user.username = row.username;
        this.user.nickname = row.nickname;
        this.user.mobile = row.mobile;
        this.user.email = row.email;
        this.user.remark = row.remark;
        this.user.enabled = row.enabled;
        this.dialogVisible = true;
      },
      submitForm(formName) {
        let _this = this;
        this.formLoading = true;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.dialogOperation == 'addUser') {
              this.postRequest("sso-service", "/user", this.user).then(resp => {
                _this.formLoading = false;
                if (resp.code == '000000') {
                  _this.$message({type: 'success', message: resp.msg});
                }
                _this.dialogVisible = false;
                _this.clearEditUserForm();
                _this.loadUser();
              })
            } else if (this.dialogOperation == 'editUser') {
              this.putRequest("sso-service", "/user", this.user).then(resp => {
                _this.formLoading = false;
                if (resp.code == '000000') {
                  _this.$message({type: 'success', message: resp.msg});
                }
                _this.dialogVisible = false;
                _this.clearEditUserForm();
                _this.loadUser();
              })
            }
          }
          _this.formLoading = false;
        });
      },
      doDelete(userId) {
        this.formLoading = true;
        let _this = this;
        this.deleteRequest("sso-service", "/user?userId=" + userId).then(resp => {
          _this.formLoading = false;
          if (resp.code == '000000') {
            _this.$message({type: 'success', message: resp.msg});
          }
          _this.loadUser();
        })
      },
      deleteUser(row) {
        this.$confirm('此操作将永久删除[' + row.username + '], 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.doDelete(row.userId);
        }).catch(() => {
        });
      },
      clearEditUserForm() {
        this.user = {
          userId: '',
          username: '',
          nickname: '',
          mobile: '',
          email: '',
          remark: '',
          enabled: ''
        };
      },
    }
  }
</script>
