<script setup lang="ts"></script>

<template>
  <div class="name">
    <p>Hi there, my name is</p>
    <h1 class="highlight primary">Supreet Tadeparti</h1>
    <p>I am a <span class="highlight secondary">software developer.</span></p>
  </div>
</template>

<style scoped>
* {
  --text-clr: var(--white);
  color: hsl(var(--text-clr));
}

h1 {
  font-size: 4.5em;
}

p {
  font-size: 1.5em;
  font-family: Funnel Sans;
}

.primary.highlight {
  --text-clr: var(--primary);
}

.secondary.highlight {
  --text-clr: var(--secondary);
}

.highlight {
  text-shadow: 0 0 5px hsl(var(--text-clr));
}
</style>
