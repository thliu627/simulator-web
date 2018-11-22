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
                                <el-radio v-model="radio" label="1" @click.native="independent">独立仿真</el-radio>
                                <el-radio style="margin-left:45px;" v-model="radio" label="2" @click.native="unite">联合仿真</el-radio>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-header>
            <el-main>
               <div class="cut-tab" v-show="independentSwitch">
                    <p style="font-size:14px;line-height:40px;">仿真软件</p>
                    <div class="text-indent">
                        <el-checkbox-group v-model="independentDataList">
                            <p class="line-num"><el-checkbox label="复选框 A"></el-checkbox></p>
                            <p class="line-num"><el-checkbox label="复选框 B"></el-checkbox></p>
                            <p class="line-num"><el-checkbox label="复选框 C"></el-checkbox></p>
                            <p class="line-num"><el-checkbox label="复选框 D"></el-checkbox></p>
                            <p class="line-num"><el-checkbox label="复选框 E"></el-checkbox></p>
                            <p class="line-num"><el-checkbox label="复选框 F"></el-checkbox></p>
                        </el-checkbox-group>
                    </div>
               </div>
               <div class="cut-tab" v-show="uniteSwitch">
                    <p style="font-size:14px;line-height:40px;">仿真软件</p>
                    <div class="text-indent">
                        <el-checkbox-group v-model="uniteDataList">
                            <p class="line-num"><el-checkbox label="1"></el-checkbox></p>
                            <p class="line-num"><el-checkbox label="12"></el-checkbox></p>
                            <p class="line-num"><el-checkbox label="134"></el-checkbox></p>
                            <p class="line-num"><el-checkbox label="15"></el-checkbox></p>
                            <p class="line-num"><el-checkbox label="167"></el-checkbox></p>
                            <p class="line-num"><el-checkbox label="18"></el-checkbox></p>
                        </el-checkbox-group>
                    </div>
               </div>
            </el-main>
            <el-footer class="fixed-menu">
                <el-row type="flex" justify="end">
                    <el-button type="primary">上一步</el-button>
                    <el-button type="primary">下一步</el-button>
                    <el-button type="primary">返回首页</el-button>
                </el-row>
            </el-footer>
        </el-container>
    </div>
</template>

<script>

export default {
    name:"SimulationSoftware",
    data(){
        return {
            radio: '1',
            independentSwitch:true,
            uniteSwitch:false,
            independentDataList:[],
            uniteDataList:[]
        }
    },
    methods:{
        independent(){
            this.independentSwitch = true;
            this.uniteSwitch = false;
        },
        unite(){
            this.independentSwitch = false;
            this.uniteSwitch = true;
        }
    }
}

</script>

<style>
.simulation-type{width: 500px;margin: 0 auto;}
.cut-tab{width: 500px;margin: 0 auto;}
.text-indent{margin-left: 70px;}
.line-num{line-height: 25px;}
.fixed-menu{width: 100%;height: 80px;position: fixed;left:0;bottom: 0;background-color: #fff;z-index:1000;}
</style>





