<!-- 
TODO:
On click function prop
-->

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  layer: {
    type: Number,
    default: 1,
  },
  page: {
    type: String,
    required: true,
  },
  click: {
    type: Function,
    required: true,
  },
  translation: {
    type: Number,
    required: true,
  },
  scale: {
    type: Number,
    required: true,
  },
});

const activeLayer: boolean = props.scale === 1;

// Dynamic import since it depends on props.layer
const bgImgUrl: string = new URL(
  `../assets/navgeo/${props.layer}.svg`,
  import.meta.url
).href;

const navImgUrl: string = new URL("../assets/profile.png", import.meta.url)
  .href;

const computedStyle = computed(() => ({
  "--translation": props.translation,
  "--scale": props.scale,
  "--zIndex": activeLayer ? "50" : "default",
}));
</script>

<template>
  <!-- Layer dependent class -->
  <div
    class="nav-item-container center"
    :class="String.fromCharCode('a'.charCodeAt(0) + props.layer - 1)"
    :style="computedStyle"
    @click="click()"
  >
    <!-- Layer dependent images -->
    <img class="bg-img" :src="bgImgUrl" alt="background image" />

    <div class="nav-img">
      <!-- TODO: Update alt to page linked to  -->
      <img width="180" height="180" :src="navImgUrl" :alt="props.page" />
    </div>
    <div class="nav-name">{{ props.page }}</div>
  </div>
</template>

<style scoped>
@keyframes twist {
  0% {
    transform: translate(-50%, -50%) rotateY(-20deg);
  }
  50% {
    transform: translate(-50%, -50%) rotateY(-30deg);
  }
  100% {
    transform: translate(-50%, -50%) rotateY(-20deg);
  }
}

@keyframes translateAppear {
  from {
    opacity: 0;
    translate: 0px calc(var(--translation) * 50px);
  }
  to {
    opacity: 1;
    translate: 0px calc(var(--translation) * 150px);
  }
}

.nav-item-display-enter-active {
  animation: translateAppear 0.5s ease-out forwards;
}

.nav-item-display-leave-active {
  animation: translateAppear 0.5s ease-out reverse forwards;
}

.nav-item-container {
  position: absolute;
  top: 50%;
  left: 50%;

  cursor: pointer;
  align-items: center;

  transform-style: preserve-3d;
  transform: translate(-50%, -50%) scale(var(--scale));

  /* Add twist 6s infinite if needed */

  opacity: 1;
  translate: 0px calc(var(--translation) * 150px);

  transition: transform 0.5s ease-in-out;

  z-index: var(--zIndex);
}

.nav-item-container:hover .nav-name {
  opacity: 1;
}

.nav-name {
  position: absolute;
  left: 7.5em;
  color: white;
  font-size: 1.65em;
  font-weight: 600;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

.nav-img {
  position: absolute;
  transform: translateY(-15px);
}

.bg-img {
  position: absolute;
  width: 15em;
}

/*
  Background Images Layer-appropriate Colors Assignment [BILCA (｡•̀ᴗ-)✧]
  Get a base color using sepia and make it more transformable using saturate.
  Use hue-rotate to change the color and brightness to make it darker.
  Only change the last 3 to modify color
*/
.nav-item-container.a > .bg-img {
  filter: drop-shadow(0 0 0.5rem white) sepia(100%) saturate(1000%)
    hue-rotate(300deg) brightness(75%) opacity(1);
}

.nav-item-container.b > .bg-img {
  filter: drop-shadow(0 0 0.5rem white) sepia(100%) saturate(1000%)
    hue-rotate(00deg) brightness(75%) opacity(1);
}

.nav-item-container.c > .bg-img {
  filter: drop-shadow(0 0 0.5rem white) sepia(100%) saturate(1000%)
    hue-rotate(150deg) brightness(75%) opacity(1);
}

.nav-item-container.d > .bg-img {
  filter: drop-shadow(0 0 0.5rem white) sepia(100%) saturate(1000%)
    hue-rotate(50deg) brightness(75%) opacity(1);
}

.nav-item-container.e > .bg-img {
  filter: drop-shadow(0 0 0.5rem white) sepia(100%) saturate(1000%)
    hue-rotate(250deg) brightness(75%) opacity(1);
}
</style>
