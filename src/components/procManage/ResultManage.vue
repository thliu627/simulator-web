<template>
  <el-container>
    <el-header></el-header>
    <el-container style="width: 90%;margin: auto">
        <el-table
            border
            stripe
            size="mini"
          :data="simulatorResult">
          <el-table-column
            prop="fileId"
            label="序号"
           >
          </el-table-column>
          <el-table-column
            prop="fileName"
            label="文件">
          </el-table-column>
          <el-table-column
            prop="filePath"
            label="预览">
            <template slot-scope="scope">
              <el-button @click="preview(scope.$index, scope.row)" size="mini">预览
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="filePath"
            label="下载">
            <template slot-scope="scope">
             <a class="download" target="_blank" :href="scope.row.filePath" download="">下载</a>
            </template>
          </el-table-column>
        </el-table>

      <el-main style="width:50%;padding-top:0">
        <img :src="lookImgUrl" style="width: auto;height: auto;max-width: 100%;max-height: 100%">
      </el-main>
    </el-container>
  </el-container>

</template>
<script>
  export default {
    data() {
      return {
        simulatorResult: [],
        lookImgUrl:""
      }
    },
    mounted: function () {
      this.getRequest("sso-service", `/project/result?projectName=${this.$store.state.project.name}`).then(resp => {
        resp.data.forEach(item => {
          this.simulatorResult.push(item)
        });
      });
    },
    methods: {
      preview(index,row){
        this.lookImgUrl = row.filePath;
      },
      downLoadFile(src){
        let $a = document.createElement('a');
        $a.setAttribute('href',src);
        $a.setAttribute('download',"");
        let evObj = document.createEvent('MouseEvents');
        evObj.initMouseEvent('click',true,true,window,0,0,0,0,0,false,false,true,false,0,null);
        $a.dispatchEvent(evObj);
      },
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
  .download{
    width:60px;
    height: 26px;
    display: inline-block;
    background-color: #20a0ff;
    color:#fff;
    text-align: center;
    line-height: 26px;
    font-size: 14px;
    border-radius: 5px;
    text-decoration: none;
  }
</style>
