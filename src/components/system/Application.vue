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
        <el-button type="primary" size="mini" style="margin-left: 5px" icon="el-icon-search" @click="loadApplication">搜索
        </el-button>
        <el-button style="float: right;" type="primary" @click="showAddApplicationForm" size="mini" icon="el-icon-plus">
          添加应用
        </el-button>
      </div>
      <div style="text-align: left; margin-top: 10px">
        <el-table
          :data="applicationList"
          border
          stripe
          style="width: 100%"
          size="mini">
          <el-table-column
            prop="name"
            align="left"
            label="应用名">
          </el-table-column>
          <el-table-column
            prop="nameZh"
            align="left"
            label="中文名">
          </el-table-column>
          <el-table-column
            prop="remark"
            align="left"
            label="备注">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="148">
            <template slot-scope="scope">
              <el-button @click="showEditApplicationForm(scope.row)" size="mini">编辑
              </el-button>
              <el-button @click="deleteApplication(scope.row)" type="danger" size="mini">删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="display: flex;float:right;justify-content: space-between;margin: 2px">
          <el-pagination
            background
            :page-size="applicationTable.pageSize"
            :current-page="applicationTable.currentPage"
            @current-change="changeApplication"
            layout="total, prev, pager, next"
            :total="applicationTable.totalCount">
          </el-pagination>
        </div>
      </div>
    </el-main>
    <el-form v-loading="formLoading" :model="application" :rules="rules" ref="applicationForm" style="margin: 0px;padding: 0px;"
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
                <el-form-item prop="name" label="应用名:">
                  <el-input v-model="application.name" size="mini" style="width: 200px"
                            placeholder="请输入权限名"></el-input>
                </el-form-item>
              </div>
            </el-col>
            <el-col>
              <div>
                <el-form-item prop="nameZh" label="中文名:">
                  <el-input v-model="application.nameZh" size="mini" style="width: 200px"
                            placeholder="请输入路径"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <div>
                <el-form-item prop="remark" label="备注:">
                  <el-input v-model="application.remark" size="mini" style="width: 200px"
                            placeholder="请输入路径"></el-input>
                </el-form-item>
              </div>
            </el-col>
          </el-row>
          <span slot="footer">
            <el-button size="mini" @click="cancelForm">取 消</el-button>
            <el-button size="mini" type="primary" @click="submitForm('applicationForm')">确 定</el-button>
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
        applicationList: [{
          applicationId: '',
          name: '',
          nameZh: '',
          remark: ''
        }],
        applicationTable: {
          pageSize: 10,
          totalCount: -1,
          currentPage: 1,
        },
        application: {
          applicationId: '',
          name: '',
          nameZh: '',
          remark: ''
        },
        formLoading: '',
        loading: '',
        enabledStatus: [],
        dialogTitle: '',
        dialogVisible: false,
        rules: {
          name: [
            {required: true, message: '请输入应用名', trigger: 'blur'}
          ],
          nameZh: [
            {required: true, message: '请输入英文名', trigger: 'blur'}
          ],
          remark: [
            {required: true, message: '请输入备注', trigger: 'blur'}
          ]
        }
      }
    },
    mounted: function () {
      this.loadApplication();
    },
    methods: {
      loadApplication() {
        let _this = this;
        this.loading = true;
        this.getRequest("sso-service", "/application?pageNumber=" + this.applicationTable.currentPage + "&pageSize=" + this.applicationTable.pageSize).then(resp => {
          _this.applicationList = resp.data.dataList;
          _this.applicationTable.totalCount = resp.data.totalCount;
          _this.loading = false;
        });
      },
      changeApplication(currentChange) {
        this.applicationTable.currentPage = currentChange;
        this.loadApplication();
      },
      cancelForm() {
        this.dialogVisible = false;
        this.clearEditApplicationForm();
      },
      showAddApplicationForm() {
        this.dialogTitle = "新增应用";
        this.dialogOperation = "addApplication";
        this.dialogVisible = true;
      },
      showEditApplicationForm(row) {
        this.dialogTitle = "编辑应用";
        this.dialogOperation = "editApplication";
        this.application.applicationId = row.applicationId;
        this.application.name = row.name;
        this.application.nameZh = row.nameZh;
        this.application.remark = row.remark;
        this.dialogVisible = true;
      },
      submitForm(formName) {
        let _this = this;
        this.formLoading = true;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.dialogOperation == 'addApplication') {
              this.postRequest("sso-service", "/application", this.application).then(resp => {
                _this.formLoading = false;
                if (resp.code == '000000') {
                  _this.$message({type: 'success', message: resp.msg});
                }
                _this.dialogVisible = false;
                _this.clearEditApplicationForm();
                _this.loadApplication();
              })
            } else if (this.dialogOperation == 'editApplication') {
              this.putRequest("sso-service", "/application", this.application).then(resp => {
                _this.formLoading = false;
                if (resp.code == '000000') {
                  _this.$message({type: 'success', message: resp.msg});
                }
                _this.dialogVisible = false;
                _this.clearEditApplicationForm();
                _this.loadApplication();
              })
            }
          }
          _this.formLoading = false;
        });
      },
      doDelete(applicationId) {
        this.formLoading = true;
        let _this = this;
        this.deleteRequest("sso-service", "/application?applicationId=" + applicationId).then(resp => {
          _this.formLoading = false;
          if (resp.code == '000000') {
            _this.$message({type: 'success', message: resp.msg});
          }
          _this.loadApplication();
        })
      },
      deleteApplication(row) {
        this.$confirm('此操作将永久删除[' + row.name + '], 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.doDelete(row.applicationId);
        }).catch(() => {
        });
      },
      clearEditApplicationForm() {
        this.application = {
          applicationId: '',
          name: '',
          nameZh: '',
          remark: ''
        };
      },
    }
  }
</script>
