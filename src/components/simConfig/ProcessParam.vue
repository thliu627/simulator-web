<template>
  <div>
    <el-container style="margin-bottom:80px;">
      <el-header style="width:80%;margin:0 auto;height:auto;">
        <p style="line-height:40px">仿真列表</p>
        <el-table
          :data="simulationList"
          border
          stripe
          size="mini"
          style="width:100%;">
          <el-table-column
            prop="softwareName"
            align="center"
            label="仿真工具"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            align="center"
            label="模型名称"
          >
          </el-table-column>
          <el-table-column
            prop="subjectType"
            align="center"
            label="学科类型"
          >
          </el-table-column>
          <el-table-column
            prop="level"
            align="center"
            label="仿真优先级"
          >
          </el-table-column>
          <el-table-column
            prop="step"
            align="center"
            label="仿真步长"
          >
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
        <div v-show='simulationSwitch'>
          <div style="overflow:hidden;">
            <p style="float:left;">仿真交互DDS配置：{{ddsModeName}}</p>
            <el-button @click="dialogSimulationVisible = true" style="float:left;margin:13px 0 0 30px;" type="primary"
                       size='mini'>添加
            </el-button>
          </div>
          <el-table
            :data="ddsConfigList"
            border
            stripe
            size="mini"
            style="width:100%;">
            <el-table-column
              prop="domain"
              align="center"
              label="域"
            >
            </el-table-column>
            <el-table-column
              prop="role"
              align="center"
              label="角色"
            >
            </el-table-column>
            <el-table-column
              prop="topicName"
              align="center"
              label="主题名称"
            >
            </el-table-column>
            <el-table-column
              prop="QoS"
              align="center"
              label="Qos"
            >
            </el-table-column>
            <el-table-column
              align="center"
              label="操作"
            >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="delDdsData(scope.$index, scope.row)">删除
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
    <!-- 模型配置添加弹窗 -->
    <el-dialog title="添加" :visible.sync="dialogSimulationVisible" width="45%">
      <el-form :model="simulationModel" style="overflow:hidden;">
        <el-form-item label="域" :label-width="formLabelWidth" style="float:left;">
          <el-input v-model="simulationModel.domain" auto-complete="off" style="width:100%;"></el-input>
        </el-form-item>
        <el-form-item label="角色" :label-width="formLabelWidth" style="float:left;">
          <el-input v-model="simulationModel.role" auto-complete="off" style="width:100%;"></el-input>
        </el-form-item>
        <el-form-item label="主题名称" :label-width="formLabelWidth" style="float:left;">
          <el-input v-model="simulationModel.topicName" auto-complete="off" style="width:100%;"></el-input>
        </el-form-item>
        <el-form-item label="Qos" :label-width="formLabelWidth" style="float:left;">
          <el-input v-model="simulationModel.QoS" auto-complete="off" style="width:100%;"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" style="overflow:hidden;">
        <el-button @click="dialogSimulationVisible = false">取 消</el-button>
        <el-button type="primary" @click="addSimulationMode">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>

  export default {
    name: "ProcessParameter",
    data() {
      return {
        //添加标识和删除标识
        softWareName:"",
        modelName:"",
        simulationSwitch: false,
        dialogSimulationVisible: false,
        formLabelWidth: '70px',
        simulationList:[],
        ddsConfigList:[],
        ddsModeName:"",
        simulationModel:{
          domain: '',
          role: '',
          topicName: '',
          QoS: ''
        }
      }
    },
    mounted(){
        //模型展示
        let simulationTools = [];
        let modelName = [];
        let modelItem = [];
        let software = this.$store.state.project.software;
        for(let i=0;i<software.length;i++){
          simulationTools.push(software[i].softwareName);
          for(let j=0;j<software[i].model.length;j++){
            modelName.push(software[i].model[j].name);
            modelItem.push({
              subjectType:software[i].model[j].subjectType,
              level:software[i].model[j].level,
              step:software[i].model[j].step
            });
          }
        }
        for(let i=0;i<modelName.length;i++){
          modelItem[i].name = modelName[i];
          modelItem[i].softwareName = simulationTools[i];
        }
        this.simulationList = modelItem;
    },
    methods: {
      //编辑仿真列表
      handleDdsDetail(index,row) {
        this.softWareName = row.softWareName;
        this.modelName = row.name;
        this.simulationSwitch = true;
        this.ddsModeName = row.name;
        let software = this.$store.state.project.software;
        this.ddsConfigList = [];
        software.forEach((item,index) => {
          if(item.softwareName === row.softwareName){
            item.model.forEach((item2,index2) => {
              if(item2.name === row.name){
                item2.subjectDDS.forEach((item3,index3) =>{
                  this.ddsConfigList.push({
                    domain: item3.domain,
                    role: item3.role,
                    topicName: item3.topicName,
                    QoS: item3.QoS
                  })
                })
              }
            })
          }else{
            item.model.forEach((item4,index4) => {
              if(item4.name === row.name){
                item4.subjectDDS.forEach((item5,index5) =>{
                  this.ddsConfigList.push({
                    domain: item5.domain,
                    role: item5.role,
                    topicName: item5.topicName,
                    QoS: item5.QoS
                  })
                })
              }
            })
          }
        })
      },
      //删除DDS配置
      delDdsData(index,row){
        this.ddsConfigList = this.ddsConfigList.filter((item,index) =>{
          return row.domain !== item.domain;
        });
      },
      //添加DDS配置
      addSimulationMode(){
        if(this.simulationModel.domain && this.simulationModel.role && this.simulationModel.topicName && this.simulationModel.QoS){
          this.ddsConfigList.push({
            domain:this.simulationModel.domain,
            role:this.simulationModel.role,
            topicName:this.simulationModel.topicName,
            QoS:this.simulationModel.QoS
          });
          this.dialogSimulationVisible = false;
          this.simulationModel.domain ="";
          this.simulationModel.role ="";
          this.simulationModel.topicName ="";
          this.simulationModel.QoS ="";
        }else{
           this.$message({
            message: '请填写必填参数',
            type: 'warning'
          });
        }
      },
      previous() {
        this.$router.replace({path: '/config/modelParam'});
      },
      next() {
        let software = this.$store.state.project.software;
        for(let i=0;i<software.length;i++){
          for(let j=0;j<software[i].model.length;j++){
            // software[i].model[j].subjectDDS = this.ddsConfigList;
            for(let k=0;k<this.ddsConfigList.length;k++){
              software[i].model[j].subjectDDS.push(this.ddsConfigList[k]);
            }
          }
        }
        console.log(software)
        // this.$router.replace({path: '/manage/listener'});
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


