<template>
  <div>
    <el-container style="margin-bottom:80px;">
      <el-header style="width:80%;margin:0 auto;height:auto;">
        <p style="line-height:40px">仿真列表</p>
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
            prop="subjectType"
            align="center"
            label="学科类型">
            <template slot-scope="scope">
              <el-input size="mini" v-model="scope.row.subjectType" placeholder="请输入内容"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="level"
            align="center"
            label="仿真优先级">
            <template slot-scope="scope">
              <el-input size="mini" v-model="scope.row.level" placeholder="请输入内容"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            prop="step"
            align="center"
            label="仿真步长">
            <template slot-scope="scope">
              <el-input size="mini" v-model="scope.row.step" placeholder="请输入内容"></el-input>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="仿真交互DDS">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="primary"
                @click="handleDdsDetail(scope.$index, scope.row)">编辑
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-header>
      <el-main style="width:80%;margin:0 auto;overflow:hidden;">
        <!-- 仿真交互DDS配置 -->
        <div v-show='subjectDdsShow'>
          <div style="overflow:hidden;">
            <p style="float:left;">仿真交互DDS配置：{{current.modelName}}</p>
            <el-button @click="addSubjectDdsRow" style="float:left;margin:13px 0 0 30px;" type="primary"
                       size='mini'>添加
            </el-button>
            <el-button @click="saveSubjectDds" style="float: right;margin:13px 0 0 30px;" type="primary"
                       size='mini'>保存当前模型参数
            </el-button>
          </div>
          <el-table
            :data="subjectDdsList"
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
              label="Qos">
              <template slot-scope="scope">
                <el-input size="mini" v-model="scope.row.QoS" placeholder="请输入内容"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="removeRow(scope.$index, subjectDdsList)">删除
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
    name: "ProcessParameter",
    data() {
      return {
        subjectDdsShow: false,
        subjectDdsList: [{
          //域
          domain: '',
          //角色
          role: '',
          //主题名称
          topicName: '',
          //QoS
          QoS: ''
        }
        ],
        modelList: [{
          //隐藏字段，用于判断软件不同模型类别允许相同模型名
          modelType: '',
          softwareName: '',
          modelName: '',
          subjectType: '',
          level: '',
          step: ''
        }
        ],
        current: {
          softwareName: '',
          modelName: '',
          modelType: ''
        }
      }
    },
    mounted() {
      this.modelList = [];
      this.subjectDdsList = [];
      let softwareList = this.$store.state.project.software;
      softwareList.forEach(software => {
        software.model.forEach(model => {
          let modelRow = {
            modelType: model.modelType,
            softwareName: software.softwareName,
            modelName: model.name,
            subjectType: model.subjectType,
            level: model.level,
            step: model.step
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
        this.subjectDdsList = [];
        softwareList.forEach(software => {
          software.model.forEach(model => {
            if (software.softwareName == this.current.softwareName &&
              model.name == this.current.modelName &&
              model.modelType == this.current.modelType) {
              console.log(model.subjectDDS);
              if (model.subjectDDS != undefined) {
                this.subjectDdsList = model.subjectDDS;
              }
            }
          })
        });
        this.subjectDdsShow = true;
      },
      previous() {
        this.$router.replace({path: '/config/modelParam'});
      },
      next() {
        let softwareList = this.$store.state.project.software;
        softwareList.forEach(software => {
          software.model.forEach(model => {
            this.modelList.forEach(currentMode => {
              if (software.softwareName == currentMode.softwareName &&
                model.name == currentMode.modelName &&
                model.modelType == currentMode.modelType) {
                model.subjectType = currentMode.subjectType;
                model.level = currentMode.level;
                model.step = currentMode.step;
              }
            })
          })
        });
        this.$store.state.project.software = softwareList;
        this.postRequest("sso-service", "/project?project=" + encodeURIComponent(JSON.stringify(this.$store.state.project))).then(resp => {
          console.log(JSON.stringify(resp.data));
        });
        this.$router.replace({path: '/manage/listener'});
      },
      addSubjectDdsRow() {
        let subjectDds = {
          domain: '',
          role: '订阅者',
          topicName: '',
          QoS: '默认'
        };
        this.subjectDdsList.push(subjectDds);
      },
      removeRow(index, rowList) {
        rowList.splice(index, 1);
      },
      saveSubjectDds() {
        let softwareList = this.$store.state.project.software;
        softwareList.forEach(software => {
          software.model.forEach(model => {
            if (software.softwareName == this.current.softwareName &&
              model.name == this.current.modelName &&
              model.modelType == this.current.modelType) {
              if (model != undefined) {
                model.subjectDDS = this.subjectDdsList;
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


