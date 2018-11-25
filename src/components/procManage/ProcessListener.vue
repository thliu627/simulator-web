<template>
     <el-container>
            <el-main>
                <div class="monitoring">
                    <div class="scroll-content" ref="scrollContent">
                        <div id="hideEle"></div>
                    </div>
                    <div class="progress-bar">
                        <span class="progress"><i ref="progressBar"></i></span>
                        <!--<button size="small" @click="userControl('start')" type="primary">开始</button>-->
                        <!--<button size="small" @click="userControl('pause')" type="primary">暂停</button>-->
                        <span class="start" ref="start" @click="userControl('start')">开始</span>
                        <span class="pause" ref="pause" @click="userControl('pause')">暂停</span>
                    </div>
                </div>
            </el-main>
            <el-footer class="fixed-menu">
                <el-row type="flex" justify="end">
                    <!--<el-button type="primary">上一步</el-button>-->
                    <el-button @click="next" :disabled="disabled" type="primary">查看结果</el-button>
                    <el-button type="primary">返回首页</el-button>
                </el-row>
            </el-footer>
        </el-container>
</template>

<script>

export default {
    name:"ProcessListener",
    data(){
        return {
            control:true,
            progressNum:0,
            thisIndex:0,
            loadText:[
                "正在初始化……",
                "初始化完成，开始加载资源",
                "资源加载中……",
                "资源加载完成，开始编译",
                "编译中……",
                "任务1编译中……",
                "任务2编译中……",
                "任务3编译中……",
                "任务4编译中……",
                "编译完成！"
            ],
            operateInter:null,
            disabled: true
        }
    },
    mounted:function () {
      console.log(JSON.stringify(this.$store.state.project));
    },
    methods:{
        userControl(type){
            if(type == "start"){
                if(this.control){
                    if(this.loadText.length*10 === this.progressNum){
                        return ;
                    }
                    this.control = false;
                    clearInterval(this.operateInter);
                    this.operateInter = setInterval(()=>{
                        if(this.progressNum >= this.loadText.length*10){
                            clearInterval(this.operateInter);
                            return ;
                        }
                        this.progressNum+=10;
                        let p=document.createElement("p");
                        let rootElement = document.querySelector(".scroll-content");
                        p.innerHTML = this.loadText[this.thisIndex];
                        this.thisIndex+=1;
                        this.$refs.scrollContent.appendChild(p);
                        this.$refs.progressBar.style.width = this.progressNum+"%";
                        if (this.progressNum == 100) {
                          this.disabled = false;
                        }
                        rootElement.scrollTop = rootElement.scrollHeight;
                    },1000);
                }else{
                    return ;
                }
            }else{
                if(this.loadText.length*10 === this.progressNum){
                    return ;
                }
                this.control = true;
                clearInterval(this.operateInter);
            }
        },
        next() {
          this.$router.replace({path: '/manage/result'});
        }
    }
}

</script>

<style>
.monitoring{width: 80%;margin: 0 auto;}
.fixed-menu{width: 100%;height: 80px;position: fixed;left:0;bottom: 0;background-color: #fff;}
.scroll-content{padding:0 20px;height: 300px;line-height:18px;border:1px solid #ccc;font-size: 16px;
overflow-y: scroll;text-align: left;}
.progress-bar{margin:20px auto 100px;width: 100%;height: 35px;overflow: hidden;}
.progress-bar span{float: left; display:block;height:100%;}
.progress-bar span.progress{width: 90%;background-color: #ccc;overflow: hidden;}
.progress-bar span.progress i{display:block;height: 100%; width:auto;background-color:#7dd43c;float: left;}
.progress-bar span.start,.progress-bar span.pause{width: 4%;height:35px;line-height: 35px;text-align: center;font-size: 14px;
cursor: pointer;margin-left:8px;}
</style>


