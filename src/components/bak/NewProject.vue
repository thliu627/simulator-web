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
                                <el-input v-model="projectName" placeholder="请输入工程名称"></el-input>
                            </div>
                        </el-col>
                        <el-col :span="5">
                            <div class="grid-content">
                                <el-button style="margin-left:25px" type="primary">确定</el-button>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-main>
            <el-footer class="fixed-menu">
                <el-row type="flex" justify="end">
                    <el-button type="primary">下一步</el-button>
                    <el-button type="primary">返回首页</el-button>
                </el-row>
            </el-footer>
        </el-container>
    </div>
</template>

<script>

export default {
    name:"NewProject",
    data(){
        return {
            projectName: ''
        }
    }
}

</script>

<style>
.new-project{width: 480px;margin: 0 auto;}
.fixed-menu{width: 100%;height: 80px;position: fixed;left:0;bottom: 0;background-color: #fff;}
</style>


