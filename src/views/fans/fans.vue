<template>
  <div class="fans-content">
    <el-card>
      <div slot="header" class="el-card-box clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>粉丝管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="粉丝列表" name="first">
          <el-row :gutter="20">
            <el-col
              :sm="6"
              :md="4"
              :lg="3"
              v-for="(item,index) in fansList"
              :key="index"
              class="fans-list"
            >
              <div class="border">
                <el-avatar :size="50" :src="item.photo"></el-avatar>
                <p>{{item.name}}</p>
              </div>
            </el-col>
          </el-row>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="per_page"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total_count"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="second">
          <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
          <div id="main" style="width: 600px;height:400px;"></div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import { getFansList } from "@/api/fans";
import * as echarts from "echarts";
export default {
  data() {
    return {
      activeName: "first",
      fansList: [],
      //分页页码页数
      page: 1,
      per_page: 20,
      total_count: null,
    };
  },
  created() {
    this.loadingFans();
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById("main"));
    // 绘制图表
    myChart.setOption({
      title: {
        text: "粉丝画像",
      },
      tooltip: {},
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
      },
      yAxis: {},
      series: [
        {
          name: "销量",
          type: "bar",
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    });
  },
  methods: {
    /* 请求粉丝列表 */
    loadingFans() {
      getFansList({
        page: this.page,
        per_page: this.per_page,
      }).then((res) => {
        this.fansList = res.data.data.results;
        this.total_count = res.data.data.total_count;
        console.log(res);
      });
    },

    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleSizeChange(val) {
      this.per_page = val;
      this.loadingFans();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.loadingFans();
    },
  },
};
</script>

<style lang="less" scoped>
.fans-list {
  text-align: center
}
.border{
  border: 1px solid #eee !important;
  padding: 10px;
  box-sizing: border-box;
  margin: 0 0 15px 0;
}
</style>

