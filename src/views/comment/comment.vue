<template>
  <div class="comment-box">
    <el-card>
      <div slot="header" class="el-card-box clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>评论管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-table :data="commentsData" stripe style="width: 100%">
        <el-table-column type="index" width="70" label="序号"></el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="total_comment_count" label="总评论数" width="150"></el-table-column>
        <el-table-column prop="fans_comment_count" label="粉丝评论数" width="150"></el-table-column>
        <el-table-column prop="comment_status" label="评论状态" width="150">
          <template slot-scope="scope">
            <span v-if="scope.row.comment_status">正常</span>
            <span v-else>关闭</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.comment_status"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="changeCommentStatus(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="per_page"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total_count"
        class="mt15"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getArticles} from "@/api/article.js";
import { getCommentStatus } from "@/api/comment.js";
export default {
  data() {
    return {
      commentsData: [],
      page: 1,
      per_page: 10,
      total_count: null,
    };
  },
  created() {
    this.loadingComments();
  },
  methods: {
    loadingComments() {
      getArticles({
        response_type: "comment",
        page: this.page,
        per_page: this.per_page,
        total_count: this.total_count,
      }).then((res) => {
        this.commentsData = res.data.data.results;
        this.total_count = res.data.data.total_count;
        console.log(this.commentsData);
        console.log(res);
      });
    },
    /* 每页显示条数 */
    handleSizeChange(val) {
      this.per_page = val;
      this.loadingComments();
    },
    /* 当前页码数 */
    handleCurrentChange(val) {
      this.page = val;
      this.loadingComments();
    },
    changeCommentStatus(article) {
      getCommentStatus(article.id.toString(), article.comment_status).then((res) => {
        console.log(res);
      });
    },
  },
};
</script>

<style lang="less" scoped>
</style>