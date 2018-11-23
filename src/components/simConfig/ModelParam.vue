<template>
  <div>
    <el-container style="margin-bottom:80px;">
      <el-header style="width:80%;margin:0 auto;height:auto;">
        <p style="line-height:40px">模型列表</p>
        <el-table
          :data="modelList"
          border
          stripe
          size="mini"
          style="width:100%;">
          <el-table-column
            prop="softwareName"
            align="center"
            label="仿真工具">
          </el-table-column>
          <el-table-column
            prop="modelName"
            align="center"
            label="模型名称">
          </el-table-column>
          <el-table-column
            prop="dataSource"
            align="center"
            label="数据源">
            <template slot-scope="scope">
              <el-select v-model="scope.row.dataSource" placeholder="请选择" size="mini">
                <el-option label="本地" value="本地"></el-option>
                <el-option label="订阅" value="订阅"></el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="模型DDS配置">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handleDdsDetail(scope.$index, scope.row)">配置
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="参数设置">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handleParamDetail(scope.$index, scope.row)">设置
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-header>
      <el-main style="width:80%;margin:0 auto;overflow:hidden;">
        <!-- DDS配置 -->
        <div v-show='ddsShow'>
          <div style="overflow:hidden;">
            <p style="float:left;">模型DDS配置：{{current.modelName}}</p>
            <el-button @click="addDdsRow" style="float:left;margin:13px 0 0 30px;" type="primary"
                       size='mini'>添加
            </el-button>
            <el-button @click="saveDds" style="float: right;margin:13px 0 0 30px;" type="primary"
                       size='mini'>保存当前模型参数
            </el-button>
          </div>
          <el-table
            :data="ddsList"
            border
            stripe
            size="mini"
            style="width:100%;">
            <el-table-column
              prop="domain"
              align="center"
              label="域">
              <template slot-scope="scope">
                <el-input size="mini" v-model="scope.row.domain" placeholder="请输入内容"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="role"
              align="center"
              label="角色">
              <template slot-scope="scope">
                <el-select v-model="scope.row.role" placeholder="请选择" size="mini">
                  <el-option label="订阅者" value="订阅者"></el-option>
                  <el-option label="发布者" value="发布者"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              prop="topicName"
              align="center"
              label="主题名称">
              <template slot-scope="scope">
                <el-input size="mini" v-model="scope.row.topicName" placeholder="请输入内容"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="QoS"
              align="center"
              label="QoS">
              <template slot-scope="scope">
                <el-input size="mini" v-model="scope.row.QoS" disabled placeholder="请输入内容"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="removeRow(scope.$index, ddsList)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <!-- 输入参数设置 -->
        <div v-show="inputParamShow" style="width:45%;float:left;">
          <div style="overflow:hidden;">
            <p style="float:left;">输入参数：{{current.modelName}}</p>
            <el-button @click="addInputParamRow" style="float:left;margin:13px 0 0 30px;" type="primary"
                       size='mini'>添加
            </el-button>
            <el-button @click="saveInputParam" style="float:right;margin:13px 0 0 30px;" type="primary"
                       size='mini'>保存当前模型参数
            </el-button>
          </div>
          <el-table
            :data="inputParamList"
            border
            stripe
            size="mini"
            style="width:100%;">
            <el-table-column
              prop="name"
              align="center"
              label="参数名称">
              <template slot-scope="scope">
                <el-input size="mini" v-model="scope.row.name" placeholder="请输入"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="value"
              align="center"
              label="参数值">
              <template slot-scope="scope">
                <el-input size="mini" v-model="scope.row.value" placeholder="请输入"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="isInteractive"
              align="center"
              label="是否交互">
              <template slot-scope="scope">
                <el-select v-model="scope.row.isInteractive" placeholder="请选择" size="mini">
                  <el-option label="true" value="true"></el-option>
                  <el-option label="false" value="false"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="removeRow(scope.$index, inputParamList)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 输出参数设置 -->
        <div v-show="outputParamShow" style="width:45%;float:left;margin-left:10%">
          <div style="overflow:hidden;">
            <p style="float:left;">输出参数：{{current.modelName}}</p>
            <el-button @click="addOutputParamRow" style="float:left;margin:13px 0 0 30px;" type="primary"
                       size='mini'>添加
            </el-button>
            <el-button @click="saveOutputParam" style="float:right;margin:13px 0 0 30px;" type="primary"
                       size='mini'>保存当前模型参数
            </el-button>
          </div>
          <el-table
            :data="outputParamList"
            border
            stripe
            size="mini"
            style="width:100%;">
            <el-table-column
              prop="type"
              align="center"
              label="输出类型">
              <template slot-scope="scope">
                <el-input size="mini" v-model="scope.row.type" placeholder="请输入"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="fileName"
              align="center"
              label="文件名称">
              <template slot-scope="scope">
                <el-input size="mini" v-model="scope.row.fileName" placeholder="请输入"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="param"
              align="center"
              label="输出参数">
              <template slot-scope="scope">
                <el-input size="mini" v-model="scope.row.param" placeholder="请输入"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="isInteractive"
              align="center"
              label="是否交互">
              <template slot-scope="scope">
                <el-select v-model="scope.row.isInteractive" placeholder="请选择" size="mini">
                  <el-option label="true" value="true"></el-option>
                  <el-option label="false" value="false"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column
              align="isInteractive"
              label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="removeRow(scope.$index, outputParamList)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>
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
    name: "ModelParameter",
    data() {
      return {
        ddsShow: false,
        inputParamShow: false,
        outputParamShow: false,
        modelList: [
          {
            //隐藏字段，用于判断软件不同模型类别允许相同模型名
            modelType: '',
            softwareName: '',
            modelName: '',
            dataSource: ''
          }
        ],
        ddsList: [
          {
            domain: '',
            role: '',
            topicName: '',
            QoS: ''
          }
        ],
        inputParamList: [
          {
            name: '',
            value: '',
            isInteractive: ''
          }
        ],
        outputParamList: [
          {
            type: '',
            fileName: '',
            param: '',
            isInteractive: ''
          }
        ],
        current: {
          softwareName: '',
          modelName: '',
          modelType: ''
        }
      }
    },
    mounted: function () {
      this.modelList = [];
      this.ddsList = [];
      this.inputParamList = [];
      this.outputParamList = [];
      let softwareList = this.$store.state.project.software;
      softwareList.forEach(software => {
        software.model.forEach(model => {
          let modelRow = {
            modelType: model.modelType,
            softwareName: software.softwareName,
            modelName: model.name,
            dataSource: model.dataSource
          }
          this.modelList.push(modelRow);
        })
      });
    },
    methods: {
      handleDdsDetail(index, row) {
        //更新当前选取状态 用于区分哪个软件 哪个模型 哪个模型类别
        this.current.modelName = row.modelName;
        this.current.modelType = row.modelType;
        this.current.softwareName = row.softwareName;
        //清空当前DDS列表并渲染
        let softwareList = this.$store.state.project.software;
        this.ddsList = [];
        softwareList.forEach(software => {
          software.model.forEach(model => {
            if (software.softwareName == this.current.softwareName &&
              model.name == this.current.modelName &&
              model.modelType == this.current.modelType) {
              if (model.modelDDS != undefined) {
                this.ddsList = model.modelDDS;
              }
            }
          })
        });
        this.inputParamShow = false;
        this.outputParamShow = false;
        this.ddsShow = true;
      },
      handleParamDetail(index, row) {
        //更新当前选取状态 用于区分哪个软件 哪个模型 哪个模型类别
        this.current.modelName = row.modelName;
        this.current.modelType = row.modelType;
        this.current.softwareName = row.softwareName;
        //清空当前参数列表并渲染
        let softwareList = this.$store.state.project.software;
        this.inputParamList = [];
        this.outputParamList = [];
        softwareList.forEach(software => {
          software.model.forEach(model => {
            if (software.softwareName == this.current.softwareName &&
              model.name == this.current.modelName &&
              model.modelType == this.current.modelType) {
              if (model.param != undefined) {
                if (model.param.inputParam != undefined) {
                  this.inputParamList = model.param.inputParam;
                }
                if (model.param.outputParam != undefined) {
                  this.outputParamList = model.param.outputParam;
                }
              }
            }
          })
        });
        this.ddsShow = false;
        this.inputParamShow = true;
        this.outputParamShow = true;
      },
      previous() {
        this.$router.replace({path: '/config/simModel'});
      },
      next() {
        let softwareList = this.$store.state.project.software;
        softwareList.forEach(software => {
          software.model.forEach(model => {
            this.modelList.forEach(currentMode=>{
              if (software.softwareName == currentMode.softwareName &&
                model.name == currentMode.modelName &&
                model.modelType == currentMode.modelType) {
                model.dataSource = currentMode.dataSource;
              }
            })
          })
        });
        this.$store.state.project.software = softwareList;
        this.$router.replace({path: '/config/processParam'});
      },
      addDdsRow() {
        let dds = {
          domain: '',
          role: '订阅者',
          topicName: '',
          QoS: '默认'
        };
        if (this.ddsList == undefined) {
          this.ddsList = [];
        }
        this.ddsList.push(dds);
      },
      addInputParamRow() {
        let inputParam = {
          name: '',
          value: '',
          isInteractive: 'true'
        };
        if (this.inputParamList == undefined) {
          this.inputParamList = [];
        }
        this.inputParamList.push(inputParam);
      },
      addOutputParamRow() {
        let outputParam = {
          type: '',
          fileName: '',
          param: '',
          isInteractive: 'true'
        };
        if (this.outputParamList == undefined) {
          this.outputParamList = [];
        }
        this.outputParamList.push(outputParam);
      },
      removeRow(index, rowList) {
        rowList.splice(index, 1);
      },
      saveDds() {
        let softwareList = this.$store.state.project.software;
        softwareList.forEach(software => {
          software.model.forEach(model => {
            if (software.softwareName == this.current.softwareName &&
              model.name == this.current.modelName &&
              model.modelType == this.current.modelType) {
              if (model != undefined) {
                model.modelDDS = this.ddsList;
              }
            }
          })
        });
        this.$store.state.project.software = softwareList;
        this.successMessage();
      },
      saveInputParam() {
        let softwareList = this.$store.state.project.software;
        softwareList.forEach(software => {
          software.model.forEach(model => {
            if (software.softwareName == this.current.softwareName &&
              model.name == this.current.modelName &&
              model.modelType == this.current.modelType) {
              //为了不破坏输出参数原数据
              if (model != undefined) {
                let originOutputParam = [];
                if (model.param != undefined && model.param.outputParam != undefined) {
                  originOutputParam = model.param.outputParam;
                }
                model.param = {
                  inputParam: this.inputParamList,
                  outputParam: originOutputParam
                }
                console.log(model);
              }
            }
          })
        });
        this.$store.state.project.software = softwareList;
        this.successMessage();
      },
      saveOutputParam() {
        let softwareList = this.$store.state.project.software;
        softwareList.forEach(software => {
          software.model.forEach(model => {
            if (software.softwareName == this.current.softwareName &&
              model.name == this.current.modelName &&
              model.modelType == this.current.modelType) {
              //为了不破坏输入参数原数据
              if (model != undefined) {
                let originInputParam = [];
                if (model.param != undefined && model.param.inputParam != undefined) {
                  originInputParam = model.param.inputParam;
                }
                model.param = {
                  inputParam: originInputParam,
                  outputParam: this.outputParamList
                }
              }
            }
          })
        });
        this.$store.state.project.software = softwareList;
        this.successMessage();
      },
      successMessage() {
        this.$message({type: 'success', message: '成功'});
      }
    }
  }
</script>

<style>
  .fixed-menu {
    width: 100%;
    height: 80px;
    position: fixed;
    left: 0;
    bottom: 0;
    background-color: #fff;
    z-index: 1000;
  }
</style>


