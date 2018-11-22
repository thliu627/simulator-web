<template>
    <div>
        <el-container>
            <el-header>
                <div class="simulation-model" style="border-bottom:1px solid #ccc;margin-top:25px;">
                     <el-tabs v-model="activeName" @tab-click="handleClick">
                         <p>模型选择</p>
                        <el-tab-pane label="Matlab/Simulate" name="first">
                            <el-checkbox-group v-model="checkList">
                            <div class="check-item" >
                                <el-checkbox style="float:left;line-height:30px;" label="控制模型"></el-checkbox>
                                <el-upload
                                    v-show="checkList.indexOf('控制模型') > -1"
                                    style="float:left;margin-left:86px"
                                    class="upload-control"
                                    :on-remove="handleRemove"
                                    action=""
                                    multiple
                                    :limit="5"
                                    :file-list="controlFileList">
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
                            <div class="check-item" >
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
           activeName: 'first',
           checkList:[],
           controlFileList:[],
           motorFileList:[],
           mathFileList:[],
           elecFileList:[],
           checkList2:[],
           turbulenceFileList:[],
           flowFileList:[],
           multiphaseFileList:[],
           griddingFileList:[]
        }
    },
    methods:{
        handleClick(tab, event) {
            console.log(tab, event);
        },
        handleRemove(file, fileList) {
        console.log(file, fileList);
      },
    }
}

</script>

<style>
.simulation-model{width: 700px;margin: 0 auto;}
.fixed-menu{width: 100%;height: 80px;position: fixed;left:0;bottom: 0;background-color: #fff;z-index:1000;}
.check-item{overflow: hidden;min-height: 50px;}
</style>





