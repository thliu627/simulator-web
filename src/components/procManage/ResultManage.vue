<template>
  <el-container>
    <el-header></el-header>
    <el-container style="width: 90%;margin: auto">
      <el-aside style="width:50%;text-align: left">
        <el-table
          stripe
          :data="simulatorResult">
          <el-table-column
            prop="id"
            label="序号"
            width="70%">
          </el-table-column>
          <el-table-column
            prop="fileName"
            label="文件">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作">
            <template slot-scope="scope">
              <el-button @click="" size="mini">预览
              </el-button>
              <el-button @click="" type="danger" size="mini">下载
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-aside>
      <el-main style="width:50%;">
        <img src="../../assets/1.png" style="width: auto;height: auto;max-width: 100%;max-height: 100%">
      </el-main>
    </el-container>
  </el-container>

</template>
<script>
  export default {
    data() {
      return {
        simulatorResult: [
          {
            id: '1',
            fileName: 'result.png'
          },
          {
            id: '2',
            fileName: 'result.txt'
          }
        ]
      }
    },
    mounted: function () {
    },
    methods: {
      createProject () {
        this.$router.replace({
          path: '/config/simSoftware',
        })
      }
    }
  }
</script>
<style>
  .container {
    width: 100%;
    height: 100%;
  }
  .center {
    width: 50%;
    height: 10%;
    overflow: auto;
    margin: auto;
    position: absolute;
    top: 0; left: 0; bottom: 0; right: 0;
  }
  .border {
    width: 50%;
    height: 10%;
    overflow: auto;
    margin: auto;
    position: absolute;
    left: 0; bottom: 0; right: 0;
  }
</style>
