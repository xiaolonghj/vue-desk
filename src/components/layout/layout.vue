<template>
  <div class="layout">
    <el-container>
      <el-aside :width="isCollapse ? '64px' : '200px' ">
        <div class="logo">
          <img src="@/assets/images/logo_admin.png" alt srcset />
        </div>
        <el-menu
          default-active="/home"
          class="el-menu-vertical-demo"
          background-color="#001e34"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse="isCollapse"
          :collapse-transition="false"
          :router="true"
        >
          <el-menu-item index="/home">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/article">
            <i class="el-icon-document"></i>
            <span slot="title">内容管理</span>
          </el-menu-item>
          <el-menu-item index="/image">
            <i class="el-icon-setting"></i>
            <span slot="title">素材管理</span>
          </el-menu-item>
          <el-menu-item index="/publish">
            <i class="el-icon-setting"></i>
            <span slot="title">发布文章</span>
          </el-menu-item>
          <el-menu-item index="/comment">
            <i class="el-icon-document"></i>
            <span slot="title">评论设置</span>
          </el-menu-item>
          <el-menu-item index="/fans">
            <i class="el-icon-setting"></i>
            <span slot="title">粉丝管理</span>
          </el-menu-item>
          <el-menu-item index="/settings">
            <i class="el-icon-setting"></i>
            <span slot="title">个人设置</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container direction="vertical">
        <el-header>
          <div class="isCollapse" @click="handleCollapse">
            <i class="el-icon-s-fold"></i>
            上海卓繁信息股份有限公司
          </div>
          <el-dropdown class="el-dropdown-header">
            <span class="el-dropdown-link">
              <el-avatar size="small" :src="circleUrl"></el-avatar>
              {{userProfile.name}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="edit">修改昵称</el-dropdown-item>
              <el-dropdown-item command="settings">设置</el-dropdown-item>
              <el-dropdown-item command="loginOut" @click.native="loginOut">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { getUserProfile } from "@/api/user";
export default {
  data() {
    return {
      isCollapse: false,
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      userProfile: {
        email: "",
        id: 0,
        intro: "",
        mobile: "",
        name: "",
        photo: "",
      },
    };
  },
  created() {
    this.loadUserProfile();
  },
  methods: {
    handleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
    //除了登录接口其他都需要授权身份令牌token才能请求
    loadUserProfile() {
      getUserProfile().then((res) => {
        this.userProfile = res.data.data;
        console.log(this.userProfile);
      });
    },
    //登录退出
    loginOut() {
      this.$confirm("确认退出登录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          window.sessionStorage.clear();
          this.$router.push("/login");
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出",
          });
        });
    },
  },
};
</script>

<style lang="less" scoped>
.layout,
.el-container {
  height: 100%;
}
.el-header {
  background-color: #fff;
  color: #333;
  border-bottom: 1px solid #ddd;
  line-height: 60px;
}

.el-aside {
  background-color: #001e34;
  color: #333;
  height: 100%;
  line-height: 50px;
}
.logo img {
  width: 70%;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
.el-main {
  color: #333;
  padding: 15px;
}
.el-menu {
  border-right: none;
}
.logo {
  text-align: center;
  padding: 15px 0;
}
.isCollapse {
  cursor: pointer;
  display: inline-block;
  vertical-align: middle;
}
.el-dropdown-header {
  display: inline-block;
  vertical-align: middle;
  float: right;
  cursor: pointer;
}
.el-avatar {
  vertical-align: middle;
  margin-right: 5px;
}
</style>