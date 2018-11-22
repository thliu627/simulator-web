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
                    label="数据源"
                >
                </el-table-column>
                <el-table-column
                    align="center"
                    label="模型DDS配置">
                     <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="primary"
                            @click="handleDdsDetail(scope.$index, scope.row)">配置</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="参数设置">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="primary"
                            @click="handleParamDetail(scope.$index, scope.row)">设置</el-button>
                    </template>
                </el-table-column>
                </el-table>
            </el-header>
            <el-main style="width:80%;margin:0 auto;overflow:hidden;">
                <!-- DDS配置 -->
                <div v-show='modelSwitch'>
                    <div style="overflow:hidden;">
                        <p style="float:left;">模型DDS配置：模型6</p>
                        <el-button @click="dialogModelVisible = true" style="float:left;margin:13px 0 0 30px;" type="primary" size='mini'>添加</el-button>
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

                <!-- 模型参数设置 -->
                <div v-show="modelParamSwitch" style="width:45%;float:left;">
                    <div style="overflow:hidden;">
                        <p style="float:left;">模型参数：模型1</p>
                        <el-button @click="dialogModelVisible = true" style="float:left;margin:13px 0 0 30px;" type="primary" size='mini'>添加</el-button>
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
                            label="参数名称"
                        >
                        </el-table-column>
                         <el-table-column
                            prop="tools"
                            align="center"
                            label="参数值"
                        >
                        </el-table-column>
                         <el-table-column
                            prop="tools"
                            align="center"
                            label="是否交互"
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
                                @click="delParamData(scope.$index, scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <!-- 输出参数设置 -->
                <div v-show="modelParamSwitch" style="width:45%;float:left;margin-left:10%">
                    <div style="overflow:hidden;">
                        <p style="float:left;">输出参数：模型1</p>
                        <el-button @click="dialogModelParamVisible = true" style="float:left;margin:13px 0 0 30px;" type="primary" size='mini'>添加</el-button>
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
                            label="输出类型"
                        >
                        </el-table-column>
                         <el-table-column
                            prop="tools"
                            align="center"
                            label="文件名称"
                        >
                        </el-table-column>
                         <el-table-column
                            prop="tools"
                            align="center"
                            label="输出参数"
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
                                @click="delOutputData(scope.$index, scope.row)">删除</el-button>
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
        <el-dialog title="添加" :visible.sync="dialogModelVisible" width="43%">
            <el-form :model="form" style="overflow:hidden;">
                <el-form-item label="域" :label-width="formLabelWidth" style="float:left;">
                    <el-input v-model="model.name" auto-complete="off" style="width:100%;"></el-input>
                </el-form-item>
                <el-form-item label="角色" :label-width="formLabelWidth" style="float:left;">
                    <el-input v-model="model.name" auto-complete="off" style="width:100%;"></el-input>
                </el-form-item>
                <el-form-item label="主题名称" :label-width="formLabelWidth" style="float:left;">
                    <el-input v-model="model.name" auto-complete="off" style="width:100%;"></el-input>
                </el-form-item>
                <el-form-item label="Qos" :label-width="formLabelWidth" style="float:left;">
                    <el-input v-model="model.name" auto-complete="off" style="width:100%;"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="overflow:hidden;">
                <el-button @click="dialogModelVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogModelVisible = false">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 参数设置添加弹窗 -->
         <el-dialog title="添加" :visible.sync="dialogModelParamVisible" width="30%">
            <el-form :model="modelParam" style="overflow:hidden;">
                <el-form-item label="输出类型" :label-width="formLabelWidth">
                    <el-input v-model="modelParam.name" auto-complete="off" style="width:100%;"></el-input>
                </el-form-item>
                <el-form-item label="文件名称" :label-width="formLabelWidth">
                    <el-input v-model="modelParam.name" auto-complete="off" style="width:100%;"></el-input>
                </el-form-item>
                <el-form-item label="输出参数" :label-width="formLabelWidth">
                    <el-input v-model="modelParam.name" auto-complete="off" style="width:100%;"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="overflow:hidden;">
                <el-button @click="dialogModelParamVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogModelParamVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>

export default {
    name:"ModelParameter",
    data(){
        return {
            modelSwitch:false,
            dialogModelVisible:false,
            modelParamSwitch:true,
            dialogModelParamVisible:false,
            formLabelWidth:'70px',
            model:{
                name:"111"
            },
            modelParam:{
                name:3232
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


