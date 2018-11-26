<template>
    <div>
        <el-container>
            <el-header></el-header>
            <el-main>
                <div class="new-project">
                    <el-row>
                        <el-col :span="4">
                            <div class="grid-content">
                                <span style="line-height:40px;font-size:14px">工程名称：</span>
                            </div>
                        </el-col>
                        <el-col :span="15">
                            <div class="grid-content">
                                <el-input v-model="project.name" placeholder="请输入工程名称"></el-input>
                            </div>
                        </el-col>
                        <el-col :span="5">
                            <div class="grid-content">
                                <el-button @click="next()" style="margin-left:25px" type="primary">确定</el-button>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-main>
            <el-footer class="fixed-menu">
                <el-row type="flex" justify="end">
                    <el-button @click="next()" type="primary">下一步</el-button>
                    <el-button type="primary">返回首页</el-button>
                </el-row>
            </el-footer>
        </el-container>
    </div>
</template>

<script>

export default {
    name: "NewProject",
    data(){
        return {
            project: {
              projectId: this.$store.state.project.projectId,
              name: this.$store.state.project.name
            }
        }
    },
    mounted: function () {
      let localProject = this.$store.state.project;
      console.log(localProject.projectId);
      if (localProject.projectId == undefined || localProject.projectId == '') {
        return;
      }
      let _this = this;
      this.getRequest("sso-service", "/project/" + localProject.projectId).then(resp => {
        _this.project.projectId = resp.data.projectId;
        _this.project.name = resp.data.name;
      })
    },
    methods: {
      next() {
        let project = this.$store.state.project;
        let _this = this;
        if (this.name == '') {
          this.$message({type: 'error', message: '请输入工程名'});
        };
        if (project.projectId == '') {
          this.postRequest("sso-service", "/project", this.project).then(resp => {
            _this.formLoading = false;
            if (resp.code == '000000') {
              _this.$store.state.project.projectId = resp.data.projectId;
              _this.$store.state.project.name = resp.data.name;
              _this.$message({type: 'success', message: resp.msg});
              this.$router.replace({path: '/config/simSoftware'});
            }
          })
        } else {
          this.putRequest("sso-service", "/project", this.project).then(resp => {
            _this.formLoading = false;
            if (resp.code == '000000') {
              _this.$store.state.project.projectId = resp.data.projectId;
              _this.$store.state.project.name = resp.data.name;
              _this.$message({type: 'success', message: resp.msg});
              this.$router.replace({path: '/config/simSoftware'});
            }
          })
        }

      }
    }
}

</script>

<style>
.new-project{width: 480px;margin: 0 auto;}
.fixed-menu{width: 100%;height: 80px;position: fixed;left:0;bottom: 0;background-color: #fff;}
</style>


