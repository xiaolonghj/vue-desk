<template>
  <div class="article">
    <el-card>
      <!-- 面包屑 -->
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>内容管理</el-breadcrumb-item>
      </el-breadcrumb>
      <!-- 表单 -->
      <el-row>
        <el-col :span="16">
          <el-form label-width="80px" class="mt15">
            <el-form-item label="状态">
              <el-radio-group v-model="status">
                <el-radio :label="null">全部</el-radio>
                <el-radio :label="0">草稿</el-radio>
                <el-radio :label="1">待审核</el-radio>
                <el-radio :label="2">审核通过</el-radio>
                <el-radio :label="3">审核失败</el-radio>
                <el-radio :label="4">已删除</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="频道">
              <el-select v-model="channel_id" placeholder="请选择频道">
                <el-option :value="null" label="全部"></el-option>
                <el-option
                  v-for="(item,index) in channel"
                  :key="item.index"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="活动时间">
              <el-date-picker
                v-model="rangeDate"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getArticlesList()">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-card>
    <!-- 表格 -->
    <el-card class="mt15">
      <el-row>
        <el-col>
          <div class="total">根据筛选条件共{{total_count}}条数据</div>
        </el-col>
      </el-row>
      <el-table
        :data="articleTableData"
        v-loading="loading"
        border
        stripe
        style="width: 100%"
        class="mt15"
      >
        <el-table-column label="序号" type="index" width="60"></el-table-column>
        <el-table-column prop="cover" label="封面" width="150">
          <template slot-scope="scope">
            <img
              :src="scope.row.cover.images[0]"
              alt
              v-if="scope.row.cover.images[0]"
              class="cover-img"
            />
            <img src="@/assets/images/pic_bg.png" alt v-else class="cover-img" />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="status" label="状态" width="200">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===0">草稿</el-tag>
            <el-tag v-if="scope.row.status===1" type="info">待审核</el-tag>
            <el-tag v-if="scope.row.status===2" type="success">审核通过</el-tag>
            <el-tag v-if="scope.row.status===3" type="danger">审核失败</el-tag>
            <el-tag v-if="scope.row.status===4" type="warning">已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间" width="250"></el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              circle
              @click="editArtilce(scope.row.id)"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              circle
              @click="deleteArticle(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="per_page"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total_count"
        class="mt15 tr"
      ></el-pagination>
    </el-card>
    <!-- 编辑文章列表弹窗 -->
    <el-dialog title="编辑文章" :visible.sync="editDialogVisible" width="50%">
      <el-form
        :model="editRuleForm"
        :rules="editRules"
        ref="editRuleForm"
        label-width="60px"
        
        class="demo-ruleForm"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="editRuleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <quill-editor ref="myTextEditor" v-model="editRuleForm.content"></quill-editor>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="editRuleForm.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="editRuleForm.channel_id" placeholder="请选择活动区域">
            <el-option
              v-for="(item,index) in channels"
              :key="item.index"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editArtilceBtn(editRuleForm.id)">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
import {
  getArticles,
  getChannels,
  getDeleteArticle,
  getTargetArticle,
  getEditArticle,
} from "@/api/article";
export default {
  data() {
    return {
      //选择时间区间
      rangeDate: [],
      //频道数据
      channel: [],
      //文章列表数据
      articleTableData: [],
      //文章请求查询参数
      page: 1,
      per_page: 10,
      total_count: null,
      channel_id: null,
      status: null,
      begin_pubdate: null,
      end_pubdate: null,
      //加载动画属性
      loading: true,
      //获取频道
      channels: [],
      //编辑文章当前数据
      editRuleForm: {
        title: "",
        channel_id: null,
        content: "",
        cover: {
          type: null,
          images: [],
        },
      },
      editDialogVisible: false,
      editRules: {
        title: [{ required: true, message: "请输入标题", trigger: "blur" }],
        content: [{ required: true, message: "请输入内容", trigger: "blur" }],
      },
    };
  },
  created() {
    this.getArticlesList();
    this.getChannelsList();
  },
  methods: {
    //获取文章列表
    getArticlesList() {
      getArticles({
        page: this.page,
        per_page: this.per_page,
        total_count: this.total_count,
        channel_id: this.channel_id,
        status: this.status,
        begin_pubdate: this.rangeDate[0],
        end_pubdate: this.rangeDate[1],
      })
        .then((res) => {
          this.articleTableData = res.data.data.results;
          this.total_count = res.data.data.total_count;
          console.log(res);
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.loading = true;
        });
    },
    //每页显示多少条
    handleSizeChange(val) {
      this.per_page = val;
      this.getArticlesList();
    },
    //当前页码
    handleCurrentChange(val) {
      this.page = val;
      this.getArticlesList();
    },
    //获取文章频道
    getChannelsList() {
      getChannels()
        .then((res) => {
          this.channel = res.data.data.channels;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //删除文章列表
    deleteArticle(articleId) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          getDeleteArticle(articleId.toString())
            .then((res) => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.getArticlesList(this.page);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //获取指定文章
    editArtilce(articleId) {
      this.editDialogVisible = true;
      getChannels()
        .then((res) => {
          this.channels = res.data.data.channels;
        })
        .catch((err) => {
          console.log(err);
        });
      getTargetArticle(articleId)
        .then((res) => {
          this.editRuleForm = res.data.data;
        })
        .catch((errr) => {
          console.log(err);
        });
    },
    //修改指定文章列表
    editArtilceBtn(articleId) {
      this.$refs.editRuleForm.validate((valid) => {
        if (!valid) return this.$message.error("请输入必填项");
        this.editDialogVisible = false;
        getEditArticle(articleId, this.editRuleForm)
          .then((res) => {
            console.log(res);
            this.getArticlesList();
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },
  },
};
</script>

<style lang="less" scoped>
.cover-img {
  width: 60px;
  height: 60px;
}
</style>