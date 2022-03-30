 <!-- 轮播图 -->
<template>
  <div class="swiper-container" ref="ref">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="carousel in list" :key="carousel.id">
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "Carousel",
  props: ["list"],
  watch: {
    // 监听bannerList数据的变化
    list: {
      immediate: true,
      handler(newValue, oldValue) {
        // 监听bannerList只能保证数据有了 但是v-for循环执行也要时间
        // 所以不能直接new swiper
        // $nextTick：在下次DOM更新循环结束之后执行回调。在 修改数据之后 立即使用这个方法，获取更新后的DOM
        // 在$nextTick里就可以保证v-for循环结束了 页面渲染完毕
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.ref, {
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              // 点击小点能切换图片
              clickable: true,
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>
<style scoped>
</style>