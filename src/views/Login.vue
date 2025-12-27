<template>
  <section>
    <div id="login">
      <p class="oj">SDUT OJ</p>
      <form class="form-control" action="" @submit.prevent="userLogin">
        <p class="title">Login</p>
        <div class="input-field">
          <input
            required=""
            class="input"
            type="text"
            v-model="userinfo.loginName"
          />
          <label class="label" for="input">Email or Username</label>
        </div>
        <div class="input-field">
          <input
            required=""
            class="input"
            type="password"
            v-model="userinfo.password"
          />
          <label class="label" for="input">Password</label>
        </div>
        <div class="errorinfo">{{ errinfo }}</div>
        <button
          class="submit-btn"
          type="submit"
          name="submit"
          @touchstart="userLogin"
        >
          SUBMIT
        </button>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { avatar, userid } from "@/assets/global";
import req from "@/utils/req";
const errinfo = ref(null);
const userinfo = ref({
  loginName: "",
  password: "",
});
const router = useRouter();

const userLogin = async () => {
  try {
    const res = await req.post(`/login`, {
      loginName: userinfo.value.loginName,
      password: userinfo.value.password,
    });
    userid.value = String(res.userId);
    avatar.value = res.avatar;
    router.push({ name: "main" });
  } catch (e) {
    if (e.code) {
      errinfo.value = e.msg;
    } else {
      errinfo.value = e.message;
    }
  }
};
</script>
<style scoped>
@import url("../assets/login.css");
</style>
