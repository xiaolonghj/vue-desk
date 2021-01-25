<template>
  <div class="settings-box">
    <el-card>
      <div slot="header" class="el-card-box clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人设置</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-row>
        <el-col :span="18">
          <el-form
            :model="settingsRuleForm"
            :rules="settingsRules"
            ref="settingsRuleForm"
            label-width="100px"
            class="demo-ruleForm"
            style="width:600px"
          >
            <el-form-item label="编号：">
              <label>{{settingsRuleForm.id}}</label>
            </el-form-item>
            <el-form-item label="手机：">
              <label>{{settingsRuleForm.mobile}}</label>
            </el-form-item>
            <el-form-item label="媒体名称：" prop="name">
              <el-input v-model="settingsRuleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍：" prop="intro">
              <el-input type="textarea" v-model="settingsRuleForm.intro"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：" prop="email">
              <el-input v-model="settingsRuleForm.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="saveSettings('settingsRuleForm')">保存设置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6">
          <el-avatar
            class="avatar"
            shape="square"
            :size="100"
            fit="cover"
            :src="settingsRuleForm.photo"
          ></el-avatar>
          <p style="font-size:14px;margin-top:5px;width:100px;text-align:center">修改头像</p>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import { getUserProfile,editUserProfile } from "@/api/user";
import globalBus from "@/utils/global-bus"
export default {
  data() {
    var checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的邮箱格式"));
        }
      }, 100);
    };
    return {
      settingsRuleForm:{
        id:null,
        name:'',
        intro:'',
        photo:'',
        email:'',
        mobile:''
      },
      settingsRules: {
        name: [{ required: true, message: "请输入媒体名称", trigger: "blur" }],
        intro: [{ required: true, message: "请填写媒体介绍", trigger: "blur" }],
        email: [{ required: true, validator: checkEmail, trigger: "blur" }],
      },
    };
  },
  created() {
    this.loadingUserProfile();
  },
  methods: {
    /* 获取用户资料 */
    loadingUserProfile(){
      getUserProfile().then(res=>{
        this.settingsRuleForm=res.data.data
        console.log(this.settingsRuleForm)
      })
    },
    /* 编辑用户资料 */
    saveSettings(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          editUserProfile(this.settingsRuleForm).then(res=>{
            console.log(res);
            this.$message.success('保存成功')
            //发送通信信息
            globalBus.$emit('update-user',this.settingsRuleForm)
          })
        } else {
          this.$message.error('请正确填写信息')
          return false;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.avatar {
  margin: 30px 0 0 0px;
}
</style>