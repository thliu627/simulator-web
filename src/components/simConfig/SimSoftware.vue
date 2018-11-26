<template>
  <div>
    <el-container>
      <el-header>
        <div class="simulation-type" style="border-bottom:1px solid #ccc;margin-top:25px;">
          <el-row>
            <el-col :span="5">
              <div class="grid-content">
                <span class="font" style="line-height:40px;font-size:14px;">仿真类型：</span>
              </div>
            </el-col>
            <el-col :span="19">
              <div class="grid-content" style="line-height:40px;">
                <el-radio v-model="radio" label="独立仿真" @click.native="independent">独立仿真</el-radio>
                <el-radio style="margin-left:45px;" v-model="radio" label="联合仿真" @click.native="unite">联合仿真</el-radio>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-header>
      <el-main>
        <div class="cut-tab" v-show="independentSwitch">
          <el-row>
            <el-col :span="5">
              <div class="grid-content">
                <span class="font" style="line-height:40px;font-size:14px;">仿真软件：</span>
              </div>
            </el-col>
            <el-col :span="19">
              <div class="text-indent">
                <p class="line-num">
                  <el-radio v-model="radioSoftWare" label="Matlab">Matlab</el-radio>
                </p>
                <p class="line-num">
                  <el-radio v-model="radioSoftWare" label="Fluent">Fluent</el-radio>
                </p>
                <p class="line-num">
                  <el-radio v-model="radioSoftWare" label="Multisim">Multisim</el-radio>
                </p>
                <p class="line-num">
                  <el-radio v-model="radioSoftWare" label="Proteus">Proteus</el-radio>
                </p>
                <p class="line-num">
                  <el-radio v-model="radioSoftWare" label="Automation">Automation</el-radio>
                </p>
                <p class="line-num">
                  <el-radio v-model="radioSoftWare" label="Labview">Labview</el-radio>
                </p>
              </div>
            </el-col>
          </el-row>
        </div>
        <div class="cut-tab" v-show="uniteSwitch">

          <el-row>
            <el-col :span="5">
              <div class="grid-content">
                <span class="font" style="line-height:40px;font-size:14px;">仿真软件：</span>
              </div>
            </el-col>
            <el-col :span="19">
              <div class="text-indent">
                <el-checkbox-group v-model="uniteDataList">
                  <p class="line-num check-cla">
                    <el-checkbox label="Matlab">Matlab</el-checkbox>
                  </p>
                  <p class="line-num check-cla">
                    <el-checkbox label="Fluent">Fluent</el-checkbox>
                  </p>
                  <p class="line-num check-cla">
                    <el-checkbox label="Multisim">Multisim</el-checkbox>
                  </p>
                  <p class="line-num check-cla">
                    <el-checkbox label="Proteus">Proteus</el-checkbox>
                  </p>
                  <p class="line-num check-cla">
                    <el-checkbox label="Automation">Automation</el-checkbox>
                  </p>
                  <p class="line-num check-cla">
                    <el-checkbox label="Labview">Labview</el-checkbox>
                  </p>
                </el-checkbox-group>
              </div>
            </el-col>
          </el-row>
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
    name: "SimulationSoftware",
    data() {
      return {
        radio: '独立仿真',
        radioSoftWare: '',
        independentSwitch: true,
        uniteSwitch: false,
        uniteDataList: []
      }
    },
    mounted: function () {
      this.initData();
    },
    methods: {
      initData() {
        let localProject = this.$store.state.project;
        if (localProject.projectId != undefined && localProject.projectId != '') {
          this.getRequest("sso-service", '/project/'+ localProject.projectId).then(resp => {
            let project = resp.data;
            if (project != null) {
              if (project.simulatorType != '') {
                this.radio = project.simulatorType;
                if (project.simulatorType == '独立仿真') {
                  this.independent();
                  project.softwareList.forEach(software=> {
                    this.radioSoftWare = software.name;
                  });
                } else if (project.simulatorType == '联合仿真') {
                  this.unite();
                  project.softwareList.forEach(software=> {
                    this.uniteDataList.push(software.name);
                  });
                }
              }
            }
          });
        }
      },
      independent() {
        this.independentSwitch = true;
        this.uniteSwitch = false;
        this.uniteDataList = [];
      },
      unite() {
        this.independentSwitch = false;
        this.uniteSwitch = true;
        this.radioSoftWare = '';
      },
      previous() {
        this.$router.replace({path: '/project/new'});
      },
      next() {
        let localProject = this.$store.state.project;
        let softwareNameList = [];
        let _this = this;
        if (this.radio == '独立仿真') {
          softwareNameList.push(this.radioSoftWare)
        } else {
          softwareNameList = this.uniteDataList;
        }
        this.putRequestJSON("sso-service", "/software?projectId=" + localProject.projectId + "&simulatorType=" + this.radio, softwareNameList).then(resp => {
          _this.formLoading = false;
          if (resp.code == '000000') {
            _this.$store.state.project = resp.data;
            _this.$message({type: 'success', message: resp.msg});
            this.$router.replace({path: '/config/simModel'});
          }
        })
      }
    }
  }

</script>

<style>
  .simulation-type {
    width: 500px;
    margin: 0 auto;
  }

  .cut-tab {
    width: 500px;
    margin: 0 auto;
  }

  .text-indent {
    text-align: left;
    margin-left: 93px;
    margin-top: 12px
  }

  .line-num {
    line-height: 25px;
  }
  .check-cla{
    line-height: 35px;
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
</style>





