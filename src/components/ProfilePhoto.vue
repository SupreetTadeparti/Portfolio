<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  layer: {
    type: Number,
    default: 1,
  },
});

const styleProps = computed(() => ({
  "--right-shift": props.layer,
}));
</script>

<template>
  <div
    class="profile-img"
    :style="styleProps"
    :class="String.fromCharCode('a'.charCodeAt(0) + props.layer)"
  >
    <img width="256" height="256" src="../assets/profile.png" alt="" />
  </div>
</template>

<style scoped>
@keyframes twist {
  0% {
    transform: translate(50%, -50%) rotateY(-20deg);
  }
  50% {
    transform: translate(50%, -50%) rotateY(-30deg);
  }
  100% {
    transform: translate(50%, -50%) rotateY(-20deg);
  }
}

.profile-img.a {
  background-image: url("../assets/navgeo/1.svg");
}
.profile-img.b {
  background-image: url("../assets/navgeo/2.svg");
}
.profile-img.c {
  background-image: url("../assets/navgeo/3.svg");
}
.profile-img.d {
  background-image: url("../assets/navgeo/4.svg");
}
.profile-img.e {
  background-image: url("../assets/navgeo/5.svg");
}

.profile-img {
  position: absolute;
  top: 50%;
  right: calc(25% + var(--right-shift) * 5px);
  transform-style: preserve-3d;
  transform: translate(50%, -50%) rotateY(-20deg);
  background-size: cover;
  padding: 1.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: twist 6s infinite;
  animation-timing-function: ease-in-out;
}
</style>
