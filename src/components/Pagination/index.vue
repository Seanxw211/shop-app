<!-- 分页器 -->
<template>
  <div class="pagination">
    <!-- 上 -->
    <button :disabled="pageNo == 1" @click="$emit('getPageNo', pageNo - 1)">
      上一页
    </button>
    <button
      v-if="startNumAndEnd.start > 1"
      @click="$emit('getPageNo', 1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>
    <button v-if="startNumAndEnd.start > 2">···</button>

    <!-- 中 -->
    <button
      v-for="(page, index) in startNumAndEnd.end"
      :key="index"
      v-if="page >= startNumAndEnd.start"
      @click="$emit('getPageNo', page)"
      :class="{ active: pageNo == page }"
    >
      {{ page }}
    </button>
    <!-- 下 -->
    <button v-if="startNumAndEnd.end < totalPage - 1">···</button>
    <button
      v-if="startNumAndEnd.end < totalPage"
      @click="$emit('getPageNo', totalPage)"
      :class="{ active: pageNo == totalPage }"
    >
      {{ totalPage }}
    </button>
    <button
      :disabled="pageNo == totalPage"
      @click="$emit('getPageNo', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["total", "pageSize", "pageNo", "continues"],
  computed: {
    // 计算出一共有多少页
    totalPage() {
      return Math.ceil(this.total / this.pageSize);
    },
    // 计算连续页面的起始页和结束页
    startNumAndEnd() {
      const { continues, totalPage, pageNo } = this;
      // 先定义起始和结束
      let start = 0;
      let end = 0;
      // 如果连续页面不足continue(特殊情况)
      if (totalPage < continues) {
        start = 1;
        end = totalPage;
      } else {
        // 正常情况
        start = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);
        // 当前页在前几页
        if (start < 1) {
          start = 1;
          end = continues;
        }
        // 当前页在后几页
        if (end > totalPage) {
          start = totalPage - continues + 1;
          end = totalPage;
        }
      }
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>