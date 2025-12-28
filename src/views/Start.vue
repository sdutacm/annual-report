<template>
  <section>
    <div class="start">
      <div class="sdutoj">SDUT OJ</div>
      <div class="ndbg">2025 年度报告</div>
      <div class="loader">
        <div class="blackhole">
          <div class="blackhole-circle"></div>
          <div class="blackhole-disc"></div>
        </div>
      </div>
      <div class="allinfo">
        <div class="user">
          <img
            :src="`https://cdn.sdutacm.cn/oj/image/avatars/${avatar}`"
            alt=""
            style="border-radius: 50%"
          />
          <div class="name">
            {{ nickname }}
          </div>
        </div>
        <button class="back" @click="Logout">
          <span>切换账号</span>
        </button>
      </div>
      <button
        class="brutalist-button"
        @click="Going"
        @touchstart="Going"
        :disabled="!isChecked"
      >
        <div class="ms-logo">
          <img
            src="../assets/img/sdutacm_logo_colorful-02a05aa9.svg"
            alt=""
            height="40px"
          />
        </div>
        <div class="button-text">
          <span>Get Start</span>
        </div>
      </button>
      <div class="tongyi">
        <input
          type="checkbox"
          class="ui-checkbox"
          :checked="isChecked"
          v-model="isChecked"
        />
        <p>同意使用我的账号数据统计</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import {
  userid,
  avatar,
  global,
  liuyang,
  playBGM,
  musicPlay,
  musicStart,
} from "@/assets/global";
import { gogo } from "@/assets/global";
import { useRouter } from "vue-router";
import req from "@/utils/req";
const isChecked = ref(true);
const router = useRouter();
const nickname = ref(null);
import { contain } from "@/assets/global";

onMounted(async () => {
  try {
    const getres = await req.get("/getSession");
    userid.value = String(getres.userId);
    avatar.value = String(getres.avatar);
    nickname.value = getres.nickname;
    router.push({ name: "main" });
  } catch (e) {
    router.push({ name: "login" });
  }
});

const Logout = async () => {
  try {
    const res = await req.post("/logout");
    console.log(res);
    router.push({ name: "login" });
  } catch (e) {
    console.log(e);
  }
};

if (window.screen.width > 1000) {
  contain.value = true;
} else {
  contain.value = false;
}
const Going = async () => {
  if (isChecked) {
    try {
      setTimeout(() => {
        musicStart.value = true;
        musicPlay.value = true;
      }, 1500);
      const globalres = await req.post("/getStaticObject", {
        key: "oj-annual-2025-global",
      });
      const selfres = await req.post("/getSelfStaticObject", {
        key: `oj-annual-2025-user-${userid.value}`,
      });
      global.value = globalres.content;
      liuyang.value = selfres.content;
      console.log(global.value);

      setTimeout(() => {
        gogo.value = false;
      }, 1000);

      setTimeout(() => {
        playBGM();
      }, 2500);
    } catch (e) {
      console.log(e);
    }
  } else {
    alert("iii");
  }
};
</script>

<style scoped>
@import url("../assets/start.css");
.smallcontain {
  max-width: 1000px;
  height: 100vh;
  position: relative;
}
</style>
