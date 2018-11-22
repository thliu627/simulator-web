<template>
  <div class="template-container">
  <el-form :rules="rules" class="login-container" label-position="left"
           label-width="0px">
    <h3 class="login_title">存管2.0后台管理系统</h3>
    <el-form-item prop="account">
      <el-input type="text" class="sblc" v-model="loginForm.username" auto-complete="off" placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-checkbox class="login_remember" v-model="checked" label-position="left">记住密码</el-checkbox>
    <el-form-item style="width: 100%">
      <el-button type="primary"  v-loading="loading" @click.native.prevent="submitClick" style="width: 100%">登录</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        rules: {
          account: [{required: true, message: '请输入用户名', trigger: 'blur'}],
          checkPass: [{required: true, message: '请输入密码', trigger: 'blur'}]
        },
        checked: true,
        loginForm: {
          username: 'admin',
          password: '123'
        },
        loading: false
      }
    },
    methods: {
      submitClick: function () {
        var _this = this;
        this.loading = true;
        setTimeout(() => {
        this.postRequest("sso-service", '/user/login', {
          username: this.loginForm.username,
          password: this.loginForm.password
        }).then(resp=> {
          _this.loading = false;
          if (resp && resp.status == 200) {
            var data = resp.data;
            _this.$store.commit('login', data.msg);
            var path = _this.$route.query.redirect;
            _this.$router.replace({path: path == '/' || path == undefined ? '/home' : path});
          }
        });
        }, 200);
      }
    }
  }
</script>
<style>
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    background:rgba(50,50,50,0.6);
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    top:50%;
    left: 50%;
    margin-top: -200px;
    margin-left: -210px;
    width: 350px;
    padding: 35px 35px 15px 35px;
    position: absolute;
    height: 300px;
  }

  .template-container {
    height: 100%;
    width: 100%;
    position: relative;
    opacity:0.9;
    background: url("../assets/login_bg.jpg") no-repeat center center fixed;
    background-size: 100%;
  }

  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #ffffff;
  }

  .login_remember {
    margin: 0px 0px 35px 0px;
    text-align: left;
  }

  .sblc {
    color: white;
  }
</style>
