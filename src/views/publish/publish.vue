<template>
  <div class="pulish">
    <el-card>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>发布文章</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 编辑发布文章内容 -->
      <el-form label-width="50px" class="mt35">
        <el-form-item label="标题">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <quill-editor ref="myTextEditor" v-model="article.content"></quill-editor>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="article.channel_id" placeholder="请选择活动区域">
            <el-option
              v-for="(item,index) in channels"
              :key="item.index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onPublish(false)">发布</el-button>
          <el-button @click="onPublish(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getChannels, publishArticle } from "@/api/article";
export default {
  data() {
    return {
      //文章请求参数
      article: {
        title: "",
        content: "",
        cover: {
          type: 0,
          images: [],
        },
        channel_id: null,
      },
      //频道选中参数
      channels: [],
    };
  },
  created() {
    this.getChannelsList();
  },
  methods: {
    //获取频道数据
    getChannelsList() {
      getChannels()
        .then((res) => {
          this.channels = res.data.data.channels;
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //发布文章
    onPublish(draft) {
      publishArticle(this.article, draft)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="less" scoped>
</style>
