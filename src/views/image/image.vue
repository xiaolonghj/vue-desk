<template>
  <div class="image-content">
    <el-card>
      <div slot="header" class="el-card-box clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-button
          type="success"
          size="mini"
          class="add-image-btn"
          @click="addImageDialogVisible = true;"
        >添加素材</el-button>
        <el-radio-group v-model="collect" size="mini" class="mt25" @change="isCollect">
          <el-radio-button :label="false">全部</el-radio-button>
          <el-radio-button :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-row :gutter="10" class="mt15">
          <el-col
            :xl="4"
            :lg="4"
            :md="6"
            :sm="12"
            v-for="(item,index) in images"
            :key="index"
            class="imageBox"
          >
            <div class="demo-image__error">
              <el-image style="height: 120px" :src="item.url" fit="cover"></el-image>
              <!-- 收藏删除按钮 -->
              <div class="collect-delete">
                <i
                  :class="{'el-icon-star-on':item.is_collected,'el-icon-star-off':!item.is_collected}"
                  @click="onCollect(item)"
                ></i>
                <i class="el-icon-delete" @click="onDeletImage(item.id)"></i>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="page"
          :page-sizes="[10, 20, 30,40]"
          :page-size="per_page"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          class="mt15"
        ></el-pagination>
      </div>
    </el-card>
    <!-- 添加素材上传弹窗 -->
    <el-dialog title="上传素材" :visible.sync="addImageDialogVisible" width="30%" class="tc">
      <el-upload
        class="upload-demo"
        drag
        action="http://api-toutiao-web.itheima.net/mp/v1_0/user/images"
        :headers="uploadHeaders"
        name="image"
        multiple
        :on-success="uploadSuccess"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addImageDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addImageDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getImages, collectImage, deleteImage } from "@/api/image.js";
export default {
  data() {
    const token = window.sessionStorage.getItem("token");
    return {
      collect: false,
      images: [],
      addImageDialogVisible: false,
      /* 请求头 */
      uploadHeaders: {
        Authorization: `Bearer ${token}`,
      },
      /* 分页参数 */
      page: 1,
      per_page: 10,
      total: null,
    };
  },
  created() {
    /* 加载图片素材 */
    this.loadImages(1);
  },
  methods: {
    loadImages(page = 1) {
      this.page = page;
      getImages({
        collect: this.collect,
        page: this.page,
        per_page: this.per_page,
      })
        .then((res) => {
          this.images = res.data.data.results;
          this.total = res.data.data.total_count;
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /* 单选框筛选 */
    isCollect() {
      this.loadImages(1);
    },
    handleSizeChange(val) {
      this.per_page = val;
      this.loadImages();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.loadImages(val);
    },
    /* 上传成功 */
    uploadSuccess() {
      this.addImageDialogVisible = false;
      this.loadImages();
    },
    /* 收藏取消收藏 */
    onCollect(item) {
      collectImage(item.id, !item.is_collected).then((res) => {
        item.is_collected = !item.is_collected;
      });
    },
    /* 删除图片 */
    onDeletImage(imageId) {
      deleteImage(imageId).then((res) => {
        this.$message.success("删除成功");
        this.loadImages();
      });
    },
  },
};
</script>

<style lang="less" scoped>
.el-image {
  width: 100%;
}
.el-card-box {
  position: relative;
}
.add-image-btn {
  position: absolute;
  right: 0px;
  top: 30px;
}
.demo-image__error {
  position: relative;
}
.collect-delete {
  position: absolute;
  height: 40px;
  line-height: 40px;
  left: 0px;
  bottom: 5px;
  background: rgba(0, 0, 0, 0.3);
  color: #fff;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0px 10px;
  box-sizing: border-box;
}

.collect-delete i {
  border: none;
  background: none;
  color: #fff;
  font-size: 18px;
  line-height: 40px;
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
  color: wheat;
}
</style>