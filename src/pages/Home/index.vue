<template>
  <div>
    <!-- 使用三级联动组件  （已经注册为全局组件 直接使用） -->
    <TypeNav />
    <ListContaniner />
    <Recommend />
    <Rank />
    <Like />
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor" />
    <Brand />
  </div>
</template>

<script>
// 引入组件
import ListContaniner from "./ListContaniner";
import Recommend from "./Recommend";
import Rank from "./Rank";
import Like from "./Like";
import Floor from "./Floor";
import Brand from "./Brand";
import { mapState } from "vuex";

export default {
  name: "",
  components: {
    ListContaniner,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  mounted() {
    // 派发floor组件的数据
    this.$store.dispatch("getFloorList");
  },
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList,
    }),
  },
};
</script>
<style scoped>
</style>