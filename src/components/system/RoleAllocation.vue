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
      <el-aside
        style="width:20%;">
        <el-table
          @row-click="handleTableClick"
          :data="roleList"
          border
          :highlight-current-row="true"
          style="width: 100%; height: 100%"
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
        </el-table>
      </el-aside>
      <el-main v-show="roleAllocationShow"
               style="padding-left: 10px; padding-top: 0px; padding-right: 0px;">
        <div>
          <el-button style="float: left;" type="primary" @click="changeSelection" size="mini">
            全选/反选
          </el-button>
          <el-button style="float: left;" type="primary" @click="clearSelection" size="mini">
            全部取消选中
          </el-button>
          <el-button style="float: right;" type="primary" @click="submitRoleAllocationForm" size="mini">
            保存当前角色关联
          </el-button>
        </div>
        <div style="margin-top: 40px">
          <el-table
            ref="roleAllocationTable"
            @selection-change="handleSelectionChange"
            v-loading="roleAllocationLoading"
            :data="userList"
            border
            stripe
            style="width: 100%"
            size="mini">
            <el-table-column
              type="selection"
              prop="userId"
              align="left">
            </el-table-column>
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
          </el-table>
        </div>
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
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
  export default {
    data() {
      return {
        loading: false,
        roleAllocationLoading: false,
        roleAllocationShow: false,
        currentApplicationId: '',
        currentRoleId: '',
        applicationList: [{
          applicationId: '',
          name: '',
          nameZh: '',
          remark: ''
        }
        ],
        activeIndex: 0,
        originalSelection: [],
        currentSelection: [],
        roleList: [{
          roleId: '',
          name: '',
          remark: '',
          enabled: ''
        }],
        roleAllocationTable: '',
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
        selected: {
          enabled: []
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
        this.loadUser();
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
      loadUser() {
        let _this = this;
        this.roleAllocationLoading = true;
        this.getRequest("sso-service", "/user?pageNumber=" + this.userTable.currentPage + "&pageSize=" + this.userTable.pageSize).then(resp => {
          _this.userList = resp.data.dataList;
          _this.userTable.totalCount = resp.data.totalCount;
          _this.roleAllocationLoading = false;
        });
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
      loadSelectedUser() {
        let _this = this;
        this.roleAllocationLoading = true;
        this.getRequest("sso-service", "/role/selectedUserIds?roleId=" + this.currentRoleId).then(resp => {
          let selectedUserIds = resp.data;
          _this.clearSelection();
          selectedUserIds.forEach(selectUserId => {
            _this.userList.forEach(user=> {
              if (user.userId == selectUserId) {
                _this.$refs.roleAllocationTable.toggleRowSelection(user, true);
                _this.originalSelection.push(user);
              }
            });
          });
          _this.roleAllocationLoading = false;
          _this.roleAllocationShow = true;
        });
      },
      changeApplication(application, index) {
        this.activeIndex = index;
        this.currentApplicationId = application.applicationId;
        this.loadRole();
        this.roleAllocationShow = false;
      },
      changeUser(currentChange) {
        this.userTable.currentPage = currentChange;
        this.loadUser();
      },
      handleTableClick(row) {
        this.currentRoleId = row.roleId;
        this.originalSelection = [];
        this.currentSelection = [];
        this.loadSelectedUser();
      },
      changeSelection() {
        this.userList.forEach (row=> {
          this.$refs.roleAllocationTable.toggleRowSelection(row);
        });
      },
      handleSelectionChange(row) {
        this.currentSelection = row;
      },
      clearSelection() {
        this.$refs.roleAllocationTable.clearSelection();
      },
      submitRoleAllocationForm() {
        /**
         * org 1,3,5
         * cur 1,2,4
         * res
         * -ad 2,4
         * -rm 3,5
         */
        let _this = this;
        let addUserIds = [];
        let removeUserIds = [];
        this.currentSelection.forEach(currentUser=> {
          let exists = false;
          this.originalSelection.forEach(originalUser=>{
            if (currentUser.userId == originalUser.userId) {
              exists = true;
            }
          });
          if (!exists) {
            addUserIds.push(currentUser.userId);
          }
        });
        this.originalSelection.forEach(originalUser=> {
          let exists = false;
          this.currentSelection.forEach(currentUser=>{
            if (originalUser.userId == currentUser.userId) {
              exists = true;
            }
          });
          if (!exists) {
            removeUserIds.push(originalUser.userId);
          }
        });
        let userIds = {
          "addUserIds": addUserIds,
          "removeUserIds": removeUserIds
        };
        if (addUserIds.length == 0 && removeUserIds.length == 0) {
          _this.$message({type: 'warning', message: '角色->用户关联未改变'});
        }
        this.roleAllocationLoading = true;
        this.putRequestJSON("sso-service", "/role/userIds?roleId=" + this.currentRoleId, userIds).then(resp => {
          if (resp.code == '000000') {
            _this.$message({type: 'success', message: resp.msg});
          }
          _this.loadSelectedUser();
          this.roleAllocationLoading = false;
        })
      },
    }
  }
</script>
