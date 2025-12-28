<template>
  <section>
    <div class="leitai">
      <img src="../assets/img/pmc.png" alt="" :class="['pmc', { bgactive: pmcActive }]" />
      <div class="lttxt">
        <div class="txt1">作为全新升级的组队赛</div>
        <div class="txt2">
          你和你的队友所向披靡，怒切 <span>{{ cnt }}</span> 题
        </div>
        <div class="txt3">
          一举夺得
          <span :class="medal ? `text-${medal}-dark` : ''">{{ chengji }}</span>
          的战绩
        </div>
        <div class="txt4">这份力量，就是你们的羁绊</div>
      </div>
      <div class="szyx">「BanG Dream! DOTA：全都不会玩！」</div>
      <div class="jz">「星月夜」</div>
      <div class="ygg">「Last | Eternity」</div>
      <div class="cc">「嘻嘻，我一定不能输」</div>
      <div class="hwc">「 原罪：毁灭侦探」</div>
      <div class="llzm">这些题目一定也使你历历在目 <span>🤗</span></div>
    </div>
  </section>
</template>

<script setup>
import { liuyang } from "@/assets/global";
let cnt = liuyang.value.competition.sdutpmc17th.solved;
let chengji = liuyang.value.competition.sdutpmc17th.awardStr;
let medal = liuyang.value.competition.sdutpmc17th.medal;
import { can, isnext, isScoll } from "@/assets/global";
import { ref, onMounted } from "vue";
const pmcActive = ref(false);
onMounted(() => {
  const lttxts = document.querySelectorAll(
    ".szyx, .jz, .ygg, .cc, .hwc, .llzm"
  );
  setTimeout(() => {
    pmcActive.value = true;
  }, 100);
  const ltall = new IntersectionObserver(
    (lists) => {
      lists.forEach((list) => {
        if (list.isIntersecting) {
          list.target.classList.add("ltactive");
          setTimeout(() => {
            lttxts.forEach((txt) => txt.classList.add("ltactive"));
          }, 8000);
        } else {
          list.target.classList.remove("ltactive");
          lttxts.forEach((txt) => txt.classList.remove("ltactive"));
        }
      });
    },
    { threshold: 0.7 }
  );
  const leitaianim = new IntersectionObserver(
    (lists) => {
      lists.forEach((list) => {
        if (list.isIntersecting) {
          setTimeout(() => {
            can.value = true;
            isnext.value = true;
            isScoll.value = true;
          }, 9000);
        }
      });
    },
    { threshold: 0.1 }
  );
  const leitai = document.querySelector(".leitai");
  leitaianim.observe(leitai);
  const alls = document.querySelectorAll(".txt1, .txt2, .txt3, .txt4");
  alls.forEach((alll) => ltall.observe(alll));
});
</script>

<style scoped>
@import url("../assets/leitai.css");

.ltactive {
  transform: translateX(0) translateY(0);
  opacity: 1;
  filter: blur(0);
}

.zgnanim {
  animation: fly 1s forwards;
}

.nlanim {
  animation: nl 5s forwards;
}

.bgactive {
  filter: blur(0) !important;
  opacity: 0.5 !important;
}
</style>
