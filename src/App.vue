<script setup lang="ts">
import Headline from "./components/Headline.vue";
import ProfilePhoto from "./components/ProfilePhoto.vue";
</script>

<template>
  <main>
    <div class="left">
      <Headline />
    </div>
    <div class="right">
      <!-- <ProfilePhoto :layer="5" />
      <ProfilePhoto :layer="4" />
      <ProfilePhoto :layer="3" /> -->
      <ProfilePhoto :layer="1" />
      <!-- <ProfilePhoto :layer="1" /> -->
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

.left {
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>
