<script setup lang="ts">
import Headline from "./components/Headline.vue";
import NavItem from "./components/NavItem.vue";
import { ref, Ref } from "vue";

// Which page/nav layer is active
let activeLayer: Ref<number, number> = ref(3);

// Which page/nav layer is hovered
let hoverLayer: Ref<number, number> = ref(3);

// Navbar is initially in display mode.
// On click of nav item, it will go to selection mode
let selectScreen: Ref<boolean, boolean> = ref(false);

const handleNavClick = (layer: number) => {
  selectScreen.value = !selectScreen.value;
  activeLayer.value = layer;
  // activeLayer.value = (activeLayer.value % 5) + 1;
};

const pages = ["Home", "About", "Skills", "Projects", "Contact"];
</script>

<template>
  <main>
    <div class="left center">
      <Headline />
    </div>
    <div class="right">
      <template v-for="(page, n) in pages">
        <Transition name="nav-item-display" mode="out-in">
          <NavItem
            v-if="selectScreen || n === activeLayer"
            :key="n"
            :layer="pages.length - n"
            :translation="selectScreen ? n - 2 : 0"
            :scale="
              (!selectScreen && n === activeLayer) ||
              (selectScreen && n === hoverLayer)
                ? 1
                : 0.75
            "
            :page="page"
            :click="() => handleNavClick(n)"
            @mouseover="hoverLayer = n"
          />
        </Transition>
      </template>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  height: 100%;
  /* background-image: url("./assets/bg.svg"); */
  background-color: hsl(var(--black));
  background-size: cover;
  padding: 2em;
}

main > * {
  position: relative;
  width: 100%;
}

.left {
  flex-direction: column;
}

.right {
  /* 3d effect, fixes rotation direction illusion */
  perspective: 1000px;
  perspective-origin: center center;
  overflow-y: auto;
}
</style>
