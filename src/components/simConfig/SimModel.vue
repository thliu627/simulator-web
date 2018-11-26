<template>
  <div>
    <el-container>
      <el-header>
        <div class="simulation-model" style="border-bottom:1px solid #ccc;margin-top:25px;">
          <el-tabs v-model="activeName">
            <p>模型选择</p>
            <el-tab-pane v-if="softwareShowList.indexOf('Matlab') > -1" label="Matlab" name="Matlab">
              <el-button style="float: left;margin-bottom: 8px" size="small" type="primary"
                         @click="addModel(MatlabModelList)">添加模型
              </el-button>
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
                  prop="type"
                  align="left"
                  label="模型类型">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.type" placeholder="请选择" size="mini">
                      <el-option label="控制模型" value="控制模型"></el-option>
                      <el-option label="电机模型" value="电机模型"></el-option>
                      <el-option label="数学模型" value="数学模型"></el-option>
                      <el-option label="电力电子模型" value="电力电子模型"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  align="right"
                  label="上传文件"
                  width="100">
                  <template slot-scope="scope">
                    <el-upload
                      :action="uploadUrl"
                      :limit="uploadLimit"
                      name="file"
                      :show-file-list="false"
                      :on-success="function (resp, file, fileList) {return uploadSuccess(resp, file, fileList, scope.row)}">
                      <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                  </template>
                </el-table-column>
                <el-table-column
                  align="right"
                  label="文件信息"
                  width="300">
                  <template slot-scope="scope">
                    <el-tag style="float: left" type="success">{{scope.row.file.name == '' ? '未上传' :
                      scope.row.file.name}}
                    </el-tag>
                    <el-button @click="removeUpload(scope.row)" size="small" type="danger" plain>取消上传</el-button>
                  </template>
                </el-table-column>
                <el-table-column
                  fixed="right"
                  label="操作"
                  width="80">
                  <template slot-scope="scope">
                    <el-button type="danger" size="small" @click="removeModel(scope.$index, MatlabModelList)">删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>

            <el-tab-pane v-if="softwareShowList.indexOf('Fluent') > -1" label="Fluent" name="Fluent">
              <el-button style="float: left;margin-bottom: 8px" size="small" type="primary"
                         @click="addModel(FluentModelList)">添加模型
              </el-button>
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
                  prop="type"
                  align="left"
                  label="模型类型">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.type" placeholder="请选择" size="mini">
                      <el-option label="湍流模型" value="湍流模型"></el-option>
                      <el-option label="流动和传热模型" value="流动和传热模型"></el-option>
                      <el-option label="多相流模型" value="多相流模型"></el-option>
                      <el-option label="动网格模型" value="动网格模型"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  align="right"
                  label="上传文件"
                  width="100">
                  <template slot-scope="scope">
                    <el-upload
                      :action="uploadUrl"
                      :limit="uploadLimit"
                      name="file"
                      :show-file-list="false"
                      :on-success="function (resp, file, fileList) {return uploadSuccess(resp, file, fileList, scope.row)}">
                      <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                  </template>
                </el-table-column>
                <el-table-column
                  align="right"
                  label="文件信息"
                  width="300">
                  <template slot-scope="scope">
                    <el-tag style="float: left" type="success">{{scope.row.file.name == '' ? '未上传' :
                      scope.row.file.name}}
                    </el-tag>
                    <el-button @click="removeUpload(scope.row)" size="small" type="danger" plain>取消上传</el-button>
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
              <el-button style="float: left;margin-bottom: 8px" size="small" type="primary"
                         @click="addModel(MultisimModelList)">添加模型
              </el-button>
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
                  prop="type"
                  align="left"
                  label="模型类型">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.type" placeholder="请选择" size="mini">
                      <el-option label="控制模型" value="控制模型"></el-option>
                      <el-option label="电机模型" value="电机模型"></el-option>
                      <el-option label="数学模型" value="数学模型"></el-option>
                      <el-option label="电力电子模型" value="电力电子模型"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  align="right"
                  label="上传文件"
                  width="100">
                  <template slot-scope="scope">
                    <el-upload
                      :action="uploadUrl"
                      :limit="uploadLimit"
                      name="file"
                      :show-file-list="false"
                      :on-success="function (resp, file, fileList) {return uploadSuccess(resp, file, fileList, scope.row)}">
                      <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                  </template>
                </el-table-column>
                <el-table-column
                  align="right"
                  label="文件信息"
                  width="300">
                  <template slot-scope="scope">
                    <el-tag style="float: left" type="success">{{scope.row.file.name == '' ? '未上传' :
                      scope.row.file.name}}
                    </el-tag>
                    <el-button @click="removeUpload(scope.row)" size="small" type="danger" plain>取消上传</el-button>
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
              <el-button style="float: left;margin-bottom: 8px" size="small" type="primary"
                         @click="addModel(ProteusModelList)">添加模型
              </el-button>
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
                  prop="type"
                  align="left"
                  label="模型类型">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.type" placeholder="请选择" size="mini">
                      <el-option label="控制模型" value="控制模型"></el-option>
                      <el-option label="电机模型" value="电机模型"></el-option>
                      <el-option label="数学模型" value="数学模型"></el-option>
                      <el-option label="电力电子模型" value="电力电子模型"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  align="right"
                  label="上传文件"
                  width="100">
                  <template slot-scope="scope">
                    <el-upload
                      :action="uploadUrl"
                      :limit="uploadLimit"
                      name="file"
                      :show-file-list="false"
                      :on-success="function (resp, file, fileList) {return uploadSuccess(resp, file, fileList, scope.row)}">
                      <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                  </template>
                </el-table-column>
                <el-table-column
                  align="right"
                  label="文件信息"
                  width="300">
                  <template slot-scope="scope">
                    <el-tag style="float: left" type="success">{{scope.row.file.name == '' ? '未上传' :
                      scope.row.file.name}}
                    </el-tag>
                    <el-button @click="removeUpload(scope.row)" size="small" type="danger" plain>取消上传</el-button>
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
              <el-button style="float: left;margin-bottom: 8px" size="small" type="primary"
                         @click="addModel(AutomationModelList)">添加模型
              </el-button>
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
                  prop="type"
                  align="right"
                  label="模型类型">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.type" placeholder="请选择" size="mini">
                      <el-option label="控制模型" value="控制模型"></el-option>
                      <el-option label="电机模型" value="电机模型"></el-option>
                      <el-option label="数学模型" value="数学模型"></el-option>
                      <el-option label="电力电子模型" value="电力电子模型"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  align="right"
                  label="上传文件"
                  width="100">
                  <template slot-scope="scope">
                    <el-upload
                      :action="uploadUrl"
                      :limit="uploadLimit"
                      name="file"
                      :show-file-list="false"
                      :on-success="function (resp, file, fileList) {return uploadSuccess(resp, file, fileList, scope.row)}">
                      <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                  </template>
                </el-table-column>
                <el-table-column
                  align="right"
                  label="文件信息"
                  width="300">
                  <template slot-scope="scope">
                    <el-tag style="float: left" type="success">{{scope.row.file.name == '' ? '未上传' :
                      scope.row.file.name}}
                    </el-tag>
                    <el-button @click="removeUpload(scope.row)" size="small" type="danger" plain>取消上传</el-button>
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
              <el-button style="float: left;margin-bottom: 8px" size="small" type="primary"
                         @click="addModel(LabviewModelList)">添加模型
              </el-button>
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
                  prop="type"
                  align="left"
                  label="模型类型">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.type" placeholder="请选择" size="mini">
                      <el-option label="控制模型" value="控制模型"></el-option>
                      <el-option label="电机模型" value="电机模型"></el-option>
                      <el-option label="数学模型" value="数学模型"></el-option>
                      <el-option label="电力电子模型" value="电力电子模型"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column
                  align="right"
                  label="上传文件"
                  width="100">
                  <template slot-scope="scope">
                    <el-upload
                      :action="uploadUrl"
                      :limit="uploadLimit"
                      name="file"
                      :show-file-list="false"
                      :on-success="function (resp, file, fileList) {return uploadSuccess(resp, file, fileList, scope.row)}">
                      <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>
                  </template>
                </el-table-column>
                <el-table-column
                  align="right"
                  label="文件信息"
                  width="300">
                  <template slot-scope="scope">
                    <el-tag style="float: left" type="success">{{scope.row.file.name == '' ? '未上传' :
                      scope.row.file.name}}
                    </el-tag>
                    <el-button @click="removeUpload(scope.row)" size="small" type="danger" plain>取消上传</el-button>
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
            modelId: '',
            name: '',
            type: '',
            file: {
              fileId: '',
              name: '',
              path: ''
            }
          }
        ],
        FluentModelList: [
          {
            modelId: '',
            name: '',
            type: '',
            file: {
              fileId: '',
              name: '',
              path: ''
            }
          }
        ],
        MultisimModelList: [
          {
            modelId: '',
            name: '',
            type: '',
            file: {
              fileId: '',
              name: '',
              path: ''
            }
          }
        ],
        ProteusModelList: [
          {
            modelId: '',
            name: '',
            type: '',
            file: {
              fileId: '',
              name: '',
              path: ''
            }
          }
        ],
        AutomationModelList: [
          {
            modelId: '',
            name: '',
            type: '',
            file: {
              fileId: '',
              name: '',
              path: ''
            }
          }
        ],
        LabviewModelList: [
          {
            modelId: '',
            name: '',
            type: '',
            file: {
              fileId: '',
              name: '',
              path: ''
            }
          }
        ],
        uploadUrl: 'http://localhost:9001/file/upload',
        uploadLimit: 99,
      }
    },
    mounted: function () {
      this.initData();
    },
    methods: {
      initData() {
        this.clearModelList();
        let localProject = this.$store.state.project;
        if (localProject.projectId != undefined && localProject.projectId != '') {
          this.getRequest("sso-service", '/project/' + localProject.projectId).then(resp => {
            this.$store.state.project = resp.data;

            let softwareList = this.$store.state.project.softwareList;
            softwareList.forEach(software => {
              if (this.activeName == 0) {
                this.activeName = software.name;
              }
              this.softwareShowList.push(software.name);
            });
            let pause = false;
            this.softwareSequence.forEach(name => {
              this.softwareShowList.forEach(software => {
                if (software.name == name && !pause) {
                  this.activeName = name;
                  pause = true;
                }
              })
            });

            softwareList.forEach(software => {
              if (software.modelList != undefined) {
                software.modelList.forEach(model => {
                  if (software.name == 'Matlab') {
                    this.MatlabModelList.push(model);
                  } else if (software.name == 'Fluent') {
                    this.FluentModelList.push(model);
                  } else if (software.name == 'Multisim') {
                    this.MultisimModelList.push(model);
                  } else if (software.name == 'Proteus') {
                    this.ProteusModelList.push(model);
                  } else if (software.name == 'Automation') {
                    this.AutomationModelList.push(model);
                  } else if (software.name == 'Labview') {
                    this.LabviewModelList.push(model);
                  }
                });
              }
            });
          });
        }
      },
      previous() {
        this.$router.replace({path: '/config/simSoftware'});
      },
      next() {
        let _this = this;
        let localProject = this.$store.state.project;
        if (localProject.projectId != undefined && localProject.projectId != '') {
          let softwareList = this.$store.state.project.softwareList;
          softwareList.forEach(software => {
            software.modelList = [];
            if (software.name == 'Matlab') {
              this.MatlabModelList.forEach(model => {
                software.modelList.push(model);
              })
            } else if (software.name == 'Fluent') {
              this.FluentModelList.forEach(model => {
                software.modelList.push(model);
              })
            } else if (software.name == 'Multisim') {
              this.MultisimModelList.forEach(model => {
                software.modelList.push(model);
              })
            } else if (software.name == 'Proteus') {
              this.ProteusModelList.forEach(model => {
                software.modelList.push(model);
              })
            } else if (software.name == 'Automation') {
              this.AutomationModelList.forEach(model => {
                software.modelList.push(model);
              })
            } else if (software.name == 'Labview') {
              this.LabviewModelList.forEach(model => {
                software.modelList.push(model);
              })
            }
          });

          this.putRequestJSON("sso-service", "/model?projectId=" + localProject.projectId, softwareList).then(resp => {
            _this.formLoading = false;
            if (resp.code == '000000') {
              _this.$store.state.project = resp.data;
              _this.$message({type: 'success', message: resp.msg});
              this.$router.replace({path: '/config/modelParam'});
            }
          })
        }
      },
      getNewModel(model) {
        let newModel = {
          type: model.type,
          name: model.name,
          file: {
            fileId: model.file.fileId,
            name: model.file.name,
            path: model.file.path
          }
        };
        return newModel;
      },
      uploadSuccess(resp, file, fileList, row) {
        fileList = [];
        if (file != undefined) {
          row.file.fileId = resp.id;
          row.file.name = resp.name;
          row.file.path = resp.path;
        }
      },
      addModel(modelList) {
        let model = {
          modelId: '',
          name: '',
          type: '',
          file: {
            fileId: '',
            name: '',
            path: ''
          }
        };
        modelList.push(model);
      },
      removeModel(index, modelList) {
        modelList.splice(index, 1);
      },
      removeUpload(row) {
        row.file = {
          fileId: '',
          name: '未上传',
          path: ''
        }
      },
      clearModelList() {
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

  .wz-cl {
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





