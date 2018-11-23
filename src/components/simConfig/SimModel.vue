<template>
  <div>
    <el-container>
      <el-header>
        <div class="simulation-model" style="border-bottom:1px solid #ccc;margin-top:25px;">
          <el-tabs v-model="activeName">
            <p>模型选择</p>
            <el-tab-pane v-if="softwareShowList.indexOf('Matlab') > -1" label="Matlab" name="Matlab">
              <el-button style="float: left;margin-bottom: 8px" size="small" type="primary" @click="addModel(MatlabModelList)">添加模型</el-button>
              <el-table
                :data="MatlabModelList"
                ref="MatlabModelTable"
                border
                stripe
                style="width: 100%"
                size="mini">
                <el-table-column
                  prop="name"
                  align="left"
                  label="模型名称">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.name" placeholder="请输入内容"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="modelType"
                  align="left"
                  label="模型类型">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.modelType" placeholder="请选择" size="mini">
                      <el-option label="控制模型" value="控制模型"></el-option>
                      <el-option label="电机模型" value="电机模型"></el-option>
                      <el-option label="数学模型" value="数学模型"></el-option>
                      <el-option label="电力电子模型" value="电力电子模型"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  align="right"
                  label="上传文件">
                  <template slot-scope="scope">
                    <el-upload
                      :action="uploadUrl"
                      :limit="uploadLimit"
                      name="file"
                      :on-success="function (resp, file, fileList) {return uploadSuccess(resp, file, fileList, scope.row)}">
                      <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                  </template>
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="80">
                  <template slot-scope="scope">
                    <el-button type="danger" size="mini" @click="removeModel(scope.$index, MatlabModelList)">删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>

            <el-tab-pane v-if="softwareShowList.indexOf('Fluent') > -1" label="Fluent" name="Fluent">
              <el-button style="float: left;margin-bottom: 8px" size="small" type="primary" @click="addModel(FluentModelList)">添加模型</el-button>
              <el-table
                :data="FluentModelList"
                ref="FluentModelTable"
                border
                stripe
                style="width: 100%"
                size="mini">
                <el-table-column
                  prop="name"
                  align="left"
                  label="模型名称">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.name" placeholder="请输入内容"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="modelType"
                  align="left"
                  label="模型类型">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.modelType" placeholder="请选择" size="mini">
                      <el-option label="湍流模型" value="湍流模型"></el-option>
                      <el-option label="流动和传热模型" value="流动和传热模型"></el-option>
                      <el-option label="多相流模型" value="多相流模型"></el-option>
                      <el-option label="动网格模型" value="动网格模型"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  align="right"
                  label="上传文件">
                  <template slot-scope="scope">
                    <el-upload
                      style="height: 100%;"
                      :action="uploadUrl"
                      :limit="uploadLimit"
                      name="file"
                      :on-success="function (resp, file, fileList) {return uploadSuccess(resp, file, fileList, scope.row)}">
                      <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                  </template>
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="80">
                  <template slot-scope="scope">
                    <el-button type="danger" size="mini" @click="removeModel(scope.$index, FluentModelList)">删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>

            <el-tab-pane v-if="softwareShowList.indexOf('Multisim') > -1" label="Multisim" name="Multisim">
              <el-button style="float: left;margin-bottom: 8px" size="small" type="primary" @click="addModel(MultisimModelList)">添加模型</el-button>
              <el-table
                :data="MultisimModelList"
                ref="MultisimModelTable"
                border
                stripe
                style="width: 100%"
                size="mini">
                <el-table-column
                  prop="name"
                  align="left"
                  label="模型名称">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.name" placeholder="请输入内容"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="modelType"
                  align="left"
                  label="模型类型">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.modelType" placeholder="请选择" size="mini">
                      <el-option label="控制模型" value="控制模型"></el-option>
                      <el-option label="电机模型" value="电机模型"></el-option>
                      <el-option label="数学模型" value="数学模型"></el-option>
                      <el-option label="电力电子模型" value="电力电子模型"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  align="right"
                  label="上传文件">
                  <template slot-scope="scope">
                    <el-upload
                      style="height: 100%;"
                      :action="uploadUrl"
                      :limit="uploadLimit"
                      name="file"
                      :on-success="function (resp, file, fileList) {return uploadSuccess(resp, file, fileList, scope.row)}">
                      <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                  </template>
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="80">
                  <template slot-scope="scope">
                    <el-button type="danger" size="mini" @click="removeModel(scope.$index, MultisimModelList)">删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>

            <el-tab-pane v-if="softwareShowList.indexOf('Proteus') > -1" label="Proteus" name="Proteus">
              <el-button style="float: left;margin-bottom: 8px" size="small" type="primary" @click="addModel(ProteusModelList)">添加模型</el-button>
              <el-table
                :data="ProteusModelList"
                ref="ProteusModelTable"
                border
                stripe
                style="width: 100%"
                size="mini">
                <el-table-column
                  prop="name"
                  align="left"
                  label="模型名称">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.name" placeholder="请输入内容"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="modelType"
                  align="left"
                  label="模型类型">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.modelType" placeholder="请选择" size="mini">
                      <el-option label="控制模型" value="控制模型"></el-option>
                      <el-option label="电机模型" value="电机模型"></el-option>
                      <el-option label="数学模型" value="数学模型"></el-option>
                      <el-option label="电力电子模型" value="电力电子模型"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  align="right"
                  label="上传文件">
                  <template slot-scope="scope">
                    <el-upload
                      style="height: 100%;"
                      :action="uploadUrl"
                      :limit="uploadLimit"
                      name="file"
                      :on-success="function (resp, file, fileList) {return uploadSuccess(resp, file, fileList, scope.row)}">
                      <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                  </template>
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="80">
                  <template slot-scope="scope">
                    <el-button type="danger" size="mini" @click="removeModel(scope.$index, ProteusModelList)">删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>

            <el-tab-pane v-if="softwareShowList.indexOf('Automation') > -1" label="Automation" name="Automation">
              <el-button style="float: left;margin-bottom: 8px" size="small" type="primary" @click="addModel(AutomationModelList)">添加模型</el-button>
              <el-table
                :data="AutomationModelList"
                ref="AutomationModelTable"
                border
                stripe
                style="width: 100%"
                size="mini">
                <el-table-column
                  prop="name"
                  align="left"
                  label="模型名称">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.name" placeholder="请输入内容"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="modelType"
                  align="right"
                  label="模型类型">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.modelType" placeholder="请选择" size="mini">
                      <el-option label="控制模型" value="控制模型"></el-option>
                      <el-option label="电机模型" value="电机模型"></el-option>
                      <el-option label="数学模型" value="数学模型"></el-option>
                      <el-option label="电力电子模型" value="电力电子模型"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  align="left"
                  label="上传文件">
                  <template slot-scope="scope">
                    <el-upload
                      style="height: 100%;"
                      :action="uploadUrl"
                      :limit="uploadLimit"
                      name="file"
                      :on-success="function (resp, file, fileList) {return uploadSuccess(resp, file, fileList, scope.row)}">
                      <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                  </template>
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="80">
                  <template slot-scope="scope">
                    <el-button type="danger" size="mini" @click="removeModel(scope.$index, AutomationModelList)">删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>


            <el-tab-pane v-if="softwareShowList.indexOf('Labview') > -1" label="Labview" name="Labview">
              <el-button style="float: left;margin-bottom: 8px" size="small" type="primary" @click="addModel(LabviewModelList)">添加模型</el-button>
              <el-table
                :data="LabviewModelList"
                ref="LabviewModelTable"
                border
                stripe
                style="width: 100%"
                size="mini">
                <el-table-column
                  prop="name"
                  align="left"
                  label="模型名称">
                  <template slot-scope="scope">
                    <el-input size="mini" v-model="scope.row.name" placeholder="请输入内容"></el-input>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="modelType"
                  align="left"
                  label="模型类型">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.modelType" placeholder="请选择" size="mini">
                      <el-option label="控制模型" value="控制模型"></el-option>
                      <el-option label="电机模型" value="电机模型"></el-option>
                      <el-option label="数学模型" value="数学模型"></el-option>
                      <el-option label="电力电子模型" value="电力电子模型"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  align="right"
                  label="上传文件">
                  <template slot-scope="scope">
                    <el-upload
                      style="height: 100%;"
                      :action="uploadUrl"
                      :limit="uploadLimit"
                      name="file"
                      :on-success="function (resp, file, fileList) {return uploadSuccess(resp, file, fileList, scope.row)}">
                      <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                  </template>
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="80">
                  <template slot-scope="scope">
                    <el-button type="danger" size="mini" @click="removeModel(scope.$index, LabviewModelList)">删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
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
        activeName: '',
        softwareShowList: [],

        softwareSequence: [
          "Matlab",
          "Fluent",
          "Multisim",
          "Proteus",
          "Automation",
          "Labview",
        ],

        MatlabModelList: [
          {
            name: '',
            moduleType: '',
            file: {
              fileId: '',
              fileName: '',
              filePath: ''
            }
          }
        ],
        FluentModelList: [
          {
            name: '',
            moduleType: '',
            file: {
              fileId: '',
              fileName: '',
              filePath: ''
            }
          }
        ],
        MultisimModelList: [
          {
            name: '',
            moduleType: '',
            file: {
              fileId: '',
              fileName: '',
              filePath: ''
            }
          }
        ],
        ProteusModelList: [
          {
            name: '',
            moduleType: '',
            file: {
              fileId: '',
              fileName: '',
              filePath: ''
            }
          }
        ],
        AutomationModelList: [
          {
            name: '',
            moduleType: '',
            file: {
              fileId: '',
              fileName: '',
              filePath: ''
            }
          }
        ],
        LabviewModelList: [
          {
            name: '',
            moduleType: '',
            file: {
              fileId: '',
              fileName: '',
              filePath: ''
            }
          }
        ],
        uploadUrl: 'http://192.168.4.108:9001/file/upload',
        uploadLimit: 1,
      }
    },
    mounted: function() {
      this.initData();
    },
    methods: {
      initData () {
        this.clearModelList();

        let softwareList = this.$store.state.project.software;
        softwareList.forEach(software=> {
          console.log(software);
          if (this.activeName == 0) {
            this.activeName = software.softwareName;
          }
          this.softwareShowList.push(software.softwareName);
        });

        this.softwareSequence.forEach(softwareName=>{
          this.softwareShowList.forEach(software=> {
            if (software.softwareName == softwareName) {
              this.activeName = softwareName;
              return;
            }
          })
        })
      },
      previous() {
        this.$router.replace({path: '/config/simSoftware'});
      },
      next() {
        let softwareList = this.$store.state.project.software;
        softwareList.forEach(software=>{
          software.model = [];
          if (software.softwareName == 'Matlab') {
            this.MatlabModelList.forEach(model=> {
              software.model.push(model);
            })
          } else if (software.softwareName == 'Fluent') {
            this.FluentModelList.forEach(model=> {
              software.model.push(model);
            })
          } else if (software.softwareName == 'Multisim') {
            this.MultisimModelList.forEach(model=> {
              software.model.push(model);
            })
          } else if (software.softwareName == 'Proteus') {
            this.ProteusModelList.forEach(model=> {
              software.model.push(model);
            })
          } else if (software.softwareName == 'Automation') {
            this.AutomationModelList.forEach(model=> {
              software.model.push(model);
            })
          } else if (software.softwareName == 'Labview') {
            this.LabviewModelList.forEach(model=> {
              software.model.push(model);
            })
          }
        })
        this.$store.state.project.software = softwareList;
        this.$router.replace({path: '/config/modelParam'});
      },
      uploadSuccess(resp, file, fileList, row) {
        if (file != undefined) {
          row.file.fileId = resp.id;
          row.file.fileName = resp.name;
          row.file.filePath = resp.path;
        }
      },
      addModel(modelList) {
        let model = {
          name: '',
          modelType: '',
          file: {
            fileId: '',
            fileName: '',
            filePath: ''
          }
        };
        modelList.push(model);
      },
      removeModel(index, modelList) {
        modelList.splice(index, 1);
      },
      clearModelList () {
        this.MatlabModelList = [];
        this.FluentModelList = [];
        this.MultisimModelList = [];
        this.ProteusModelList = [];
        this.AutomationModelList = [];
        this.LabviewModelList = [];
      }
    }
  }

</script>

<style>
  .simulation-model {
    width: 700px;
    margin: 0 auto;
  }
  .wz-cl{
    float: right;
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





