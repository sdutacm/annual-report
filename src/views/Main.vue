<template>
  <div class="music" v-if="musicStart">
    <button @click="switchMuteBGM" class="play_button">
      <img v-if="musicPlay" src="../assets/img/music_playing.svg" alt="" />
      <img v-else src="../assets/img/music_shutoff.svg" alt="" />
    </button>
  </div>
  <Suspense>
    <Start v-if="gogo"></Start>
  </Suspense>
  <Message v-if="!gogo"></Message>
</template>

<script setup>
import { onMounted } from "vue";
import { Howl } from "howler";
import Start from "./Start.vue";
import Message from "./Message.vue";
import {
  gogo,
  bgmMuted,
  playBGM,
  switchMuteBGM,
  musicPlay,
  musicStart,
} from "@/assets/global";

onMounted(() => {
  !window.bgm &&
    (window.bgm = new Howl({
      src: [
        `${new URL("../assets/audio/bgm-2025.flac", import.meta.url).href}`,
      ],
      html5: true,
      volume: 0.66,
      loop: true,
    }));
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.defa-enter-from,
.defa-leave-to {
  transition: all 0.5s ease;
  transition-delay: 0.5s;
}

.music {
  position: fixed;
  /* left: 75%; */
  right: 10%;
  /* top: 3.5%; */
  top: calc(5% - 0.2rem);
  /* background-color: red; */
  z-index: 999999;
}

.play_button {
  border: 0;
  width: 0.8rem;
  aspect-ratio: 1/1;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.1);
}

.playing {
  height: 0.7rem;
  /* clip-path: circle(50% at 50% 50%); */
  /* border-radius: 50%; */
}
</style>
