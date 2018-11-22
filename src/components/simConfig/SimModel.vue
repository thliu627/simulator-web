<template>
  <div>
    <el-container>
      <el-header>
        <div class="simulation-model" style="border-bottom:1px solid #ccc;margin-top:25px;">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <p>模型选择</p>
            <el-tab-pane label="Matlab" name="Matlab">
              <el-checkbox-group v-model="checkList">
                <div class="check-item">
                  <el-checkbox style="float:left;line-height:30px;" label="Matlab控制模型">控制模型</el-checkbox>
                  <el-upload
                    style="float:left;margin-left:86px"
                    multiple
                    :action="uploadUrl"
                    :limit="uploadLimit"
                    name="file"
                    v-show="checkList.indexOf('Matlab控制模型') > -1"
                    :on-success="uploadSuccess"
                    :file-list="MatlabControlFileList">
                    <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
                </div>
                <div class="check-item">
                  <el-checkbox style="float:left;line-height:30px;" label="电机模型"></el-checkbox>
                  <el-upload
                    v-show="checkList.indexOf('电机模型') > -1"
                    style="float:left;margin-left:86px"
                    class="upload-motor"
                    :on-remove="handleRemove"
                    action=""
                    multiple
                    :limit="5"
                    :file-list="motorFileList">
                    <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
                </div>
                <div class="check-item">
                  <el-checkbox style="float:left;line-height:30px;" label="数学模型"></el-checkbox>
                  <el-upload
                    v-show="checkList.indexOf('数学模型') > -1"
                    style="float:left;margin-left:86px"
                    class="upload-math"
                    :on-remove="handleRemove"
                    action=""
                    multiple
                    :limit="5"
                    :file-list="mathFileList">
                    <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
                </div>
                <div class="check-item">
                  <el-checkbox style="float:left;line-height:30px;" label="电力电子组件模型"></el-checkbox>
                  <el-upload
                    v-show="checkList.indexOf('电力电子组件模型') > -1"
                    style="float:left;margin-left:30px"
                    class="upload-elec"
                    :on-remove="handleRemove"
                    action=""
                    multiple
                    :limit="5"
                    :file-list="elecFileList">
                    <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
                </div>
              </el-checkbox-group>
            </el-tab-pane>
            <el-tab-pane label="Fluent" name="second">
              <el-checkbox-group v-model="checkList2">
                <div class="check-item">
                  <el-checkbox style="float:left;line-height:30px;" label="湍流模型"></el-checkbox>
                  <el-upload
                    v-show="checkList2.indexOf('湍流模型') > -1"
                    style="float:left;margin-left:86px"
                    class="upload-control"
                    :on-remove="handleRemove"
                    action=""
                    multiple
                    :limit="5"
                    :file-list="turbulenceFileList">
                    <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
                </div>
                <div class="check-item">
                  <el-checkbox style="float:left;line-height:30px;" label="流动和传热模型"></el-checkbox>
                  <el-upload
                    v-show="checkList2.indexOf('流动和传热模型') > -1"
                    style="float:left;margin-left:44px"
                    class="upload-motor"
                    :on-remove="handleRemove"
                    action=""
                    multiple
                    :limit="5"
                    :file-list="flowFileList">
                    <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
                </div>
                <div class="check-item">
                  <el-checkbox style="float:left;line-height:30px;" label="多相流模型"></el-checkbox>
                  <el-upload
                    v-show="checkList2.indexOf('多相流模型') > -1"
                    style="float:left;margin-left:73px"
                    class="upload-math"
                    :on-remove="handleRemove"
                    action=""
                    multiple
                    :limit="5"
                    :file-list="multiphaseFileList">
                    <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
                </div>
                <div class="check-item">
                  <el-checkbox style="float:left;line-height:30px;" label="动网格模型"></el-checkbox>
                  <el-upload
                    v-show="checkList2.indexOf('动网格模型') > -1"
                    style="float:left;margin-left:73px"
                    class="upload-elec"
                    :on-remove="handleRemove"
                    action=""
                    multiple
                    :limit="5"
                    :file-list="griddingFileList">
                    <el-button size="small" type="primary">点击上传</el-button>
                  </el-upload>
                </div>
              </el-checkbox-group>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-header>
      <el-main></el-main>
      <el-footer class="fixed-menu">
        <el-row type="flex" justify="end">
          <el-button @click="previous" type="primary">上一步</el-button>
          <el-button @click="next" type="primary">下一步</el-button>
          <el-button type="primary">返回首页</el-button>
        </el-row>
      </el-footer>
    </el-container>
  </div>
</template>

<script>

  export default {
    name: "SimulationSoftware",
    data() {
      return {
        activeName: 'Matlab',
        checkList: [],
        controlFileList: [],
        motorFileList: [],
        mathFileList: [],
        elecFileList: [],
        checkList2: [],
        turbulenceFileList: [],
        flowFileList: [],
        multiphaseFileList: [],
        griddingFileList: [],
        fileList: [],
        uploadUrl: 'http://localhost:9001/file/upload',
        uploadLimit: 5,
        MatlabControlFileList: []
      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      previous() {
        this.$router.replace({path: '/config/simSoftware'});
      },
      next() {
        this.$router.replace({path: '/config/modelParam'});
      },
      uploadSuccess(resp, file, fileList) {
        console.log(JSON.stringify(resp))
        console.log("file="+JSON.stringify(file));
        console.log("fileList="+JSON.stringify(fileList));
      }
    }
  }

</script>

<style>
  .simulation-model {
    width: 700px;
    margin: 0 auto;
  }

  .fixed-menu {
    width: 100%;
    height: 80px;
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: #fff;
    z-index: 1000;
  }

  .check-item {
    overflow: hidden;
    min-height: 50px;
  }
</style>





