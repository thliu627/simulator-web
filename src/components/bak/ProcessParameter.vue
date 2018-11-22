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
                    prop="tools"
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
                    prop="source"
                    align="center"
                    label="学科类型"
                >
                </el-table-column>
                  <el-table-column
                    prop="source"
                    align="center"
                    label="仿真优先级"
                >
                </el-table-column>
                 <el-table-column
                    prop="source"
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
                            @click="handleDdsDetail(scope.$index, scope.row)">编辑</el-button>
                    </template>
                </el-table-column>
                </el-table>
            </el-header>
            <el-main style="width:80%;margin:0 auto;overflow:hidden;">
                <!-- 仿真交互DDS配置 -->
                <div v-show='simulationSwitch'>
                    <div style="overflow:hidden;">
                        <p style="float:left;">仿真交互DDS配置：模型6</p>
                        <el-button @click="dialogSimulationVisible = true" style="float:left;margin:13px 0 0 30px;" type="primary" size='mini'>添加</el-button>
                    </div>
                    <el-table
                        :data="modelList"
                        border
                        stripe
                        size="mini"
                        style="width:100%;">
                        <el-table-column
                            prop="tools"
                            align="center"
                            label="域"
                        >
                        </el-table-column>
                         <el-table-column
                            prop="tools"
                            align="center"
                            label="角色"
                        >
                        </el-table-column>
                         <el-table-column
                            prop="tools"
                            align="center"
                            label="主题名称"
                        >
                        </el-table-column>
                         <el-table-column
                            prop="tools"
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
                                @click="delModeData(scope.$index, scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
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
        <!-- 模型配置添加弹窗 -->
        <el-dialog title="添加" :visible.sync="dialogSimulationVisible" width="43%">
            <el-form :model="simulationModel" style="overflow:hidden;">
                <el-form-item label="域" :label-width="formLabelWidth" style="float:left;">
                    <el-input v-model="simulationModel.name" auto-complete="off" style="width:100%;"></el-input>
                </el-form-item>
                <el-form-item label="角色" :label-width="formLabelWidth" style="float:left;">
                    <el-input v-model="simulationModel.name" auto-complete="off" style="width:100%;"></el-input>
                </el-form-item>
                <el-form-item label="主题名称" :label-width="formLabelWidth" style="float:left;">
                    <el-input v-model="simulationModel.name" auto-complete="off" style="width:100%;"></el-input>
                </el-form-item>
                <el-form-item label="Qos" :label-width="formLabelWidth" style="float:left;">
                    <el-input v-model="simulationModel.name" auto-complete="off" style="width:100%;"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="overflow:hidden;">
                <el-button @click="dialogSimulationVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogSimulationVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>

export default {
    name:"ProcessParameter",
    data(){
        return {
            simulationSwitch:true,
            dialogSimulationVisible:false,
            formLabelWidth:'70px',
            simulationModel:{
                name:"111"
            },
            modelList:[
                {tools:"大牛神",name:"hahaha",source:"哟哟哟哟"},
                {tools:"大牛神",name:"hahaha",source:"哟哟哟哟"},
                {tools:"大牛神",name:"hahaha",source:"哟哟哟哟"},
                {tools:"大牛神",name:"hahaha",source:"哟哟哟哟"},
            ]
        }
    },
    methods:{
        handleDdsDetail(){

        },
        handleParamDetail(){

        }
    }
}

</script>

<style>
.fixed-menu{width: 100%;height: 80px;position: fixed;left:0;bottom: 0;background-color: #fff;z-index:1000;}
</style>


