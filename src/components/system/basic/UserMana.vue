<template>
  <div>
    <div style="text-align: left" v-loading="fullloading">
      <el-input
        placeholder="默认展示部分用户，可以通过用户名搜索更多用户..."
        prefix-icon="el-icon-search"
        size="mini"
        style="width: 250px"
        v-model="keywords">
      </el-input>
      <el-button style="margin-left: 5px" size="mini" type="primary" icon="el-icon-search" @click="searchClick">搜索
      </el-button>
    </div>
    <div style="margin-top: 10px;text-align: left">
      <el-table
        :data="emps"
        v-loading="tableLoading"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
        size="mini">
        <el-table-column
          type="selection"
          align="left">
        </el-table-column>
        <el-table-column
          prop="name"
          align="left"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="username"
          align="left"
          label="用户名">
        </el-table-column>
        <el-table-column
          prop="role"
          align="left"
          label="所属角色">
        </el-table-column>
        <el-table-column
          prop="role"
          align="left"
          label="所属角色">
        </el-table-column>
        <el-table-column
          prop="role"
          align="left"
          label="所属角色">
        </el-table-column>
        <el-table-column
          prop="role"
          align="left"
          label="所属角色">
        </el-table-column>
      </el-table>
    </div>
  </div>

</template>
<script>
  import {isNotNullORBlank} from '../../../utils/utils'

  export default {
    mounted: function () {
      this.loading = true;
      this.initRoles();
    },
    methods: {},
    data() {
      return {
        props: {
          label: 'name',
          children: 'children'
        },
        newRole: '',
        newRoleZh: '',
        roles: [],
        treeData: [],
        checkedKeys: [],
        loading: false,
        activeColItem: -1
      };
    }
  }
</script>
