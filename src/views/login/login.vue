<template>
  <div class="login">
    <div class="login-box">
      <div class="logo">
        <img src="../../../src/assets/images/logo_index.png" alt srcset />
      </div>
      <el-form :model="loginForm" :rules="loginRules" ref="loginForm" class="login-form">
        <el-form-item prop="mobile">
          <el-input v-model="loginForm.mobile" placeholder="请输入手机号码">
            <i slot="prefix" class="el-input__icon el-icon-phone"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="loginForm.code" placeholder="请输入验证码">
            <i slot="prefix" class="el-input__icon el-icon-circle-check"></i>
          </el-input>
        </el-form-item>
        <el-form-item prop="agree">
          <el-checkbox v-model="loginForm.agree" size="mini">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-row>
          <el-col :span="24">
            <el-button type="primary" class="login-btn" :loading="loading" @click="onlogin">登录</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user';

export default {
  data() {
    //自定义阅读协议验证
    var checkAgree = (rule, value, callback) => {
      if (!value) return callback(new Error("请阅读并同意用户协议和隐私条款"));
      callback();
    };

    return {
      loginForm: {
        mobile: "13911111111",
        code: "246810",
        agree: false,
      },
      loginRules: {
        mobile: [
          { required: true, message: "请输入电话号码", trigger: "change" },
          {
            pattern: /^1[3|5|7|8|9]\d{9}$/,
            message: "请输入正确的号码格式",
            trigger: "change",
          },
        ],
        code: [
          { required: true, message: "验证码不能为空", trigger: "change" },
          { pattern: /^\d{6}$/, message: "请输入正确的验证码格式" },
        ],
        agree: [{ validator: checkAgree, trigger: "change" }],
      },
      //登录加载电话属性设置
      loading: false,
    };
  },
  created() {},
  methods: {
    //表单验证=>登录
    onlogin() {
      this.$refs["loginForm"].validate((valid) => {
        if (!valid) return;
        this.login();
      });
    },
    //登录请求
    login() {
      //登录按钮加载动画属性设置为true
      this.loading = true;
      //获取表单数据
      login(this.loginForm).then((res) => {
        //登录成功
        console.log(res);
        //保存token到本地存储
        window.sessionStorage.setItem('token',res.data.data.token)
        //提示登录成功
        this.$message.success("登录成功");
        //关闭loading
        this.loading = false;
        //跳转到首页
        this.$router.push('/home')
      }).catch((err) => {
        //登录失败
        console.log("登录失败", err);
        this.$message.error("登录失败,手机或验证码错误");
        //关闭loading
        this.loading = false;
    });
    },
  },
};
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  background: url(../../../src/assets/images/login_bg.jpg) no-repeat center top;
  background-size: cover;
  .login-box {
    width: 370px;
    height: 330px;
    background-color: #fff;
    border-radius: 5px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -185px;
    margin-left: -200px;
    padding: 20px 45px;
    box-sizing: border-box;
    .logo {
      margin: 0px auto;
      text-align: center;
      width: 100%;
      img {
        width: 60%;
      }
    }
    .login-form {
      margin-top: 20px;
      .el-input__icon {
        font-size: 16px;
      }
    }
    .login-btn {
      display: block;
      width: 100%;
      margin-top: 0px;
    }
  }
}
</style>
