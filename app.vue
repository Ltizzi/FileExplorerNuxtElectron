<template>
  <div class="">
    <NuxtLayout>
      <NuxtPage></NuxtPage>
    </NuxtLayout>
  </div>
</template>
<script setup lang="ts">
  console.log("START...");
</script>
<style>
  body {
    height: 100vh;
    background-image: linear-gradient(
      to bottom right,
      var(--tw-gradient-stops)
    );
    --tw-gradient-from: #172554 var(--tw-gradient-from-position);
    --tw-gradient-to: rgb(23 37 84 / 0) var(--tw-gradient-to-position);
    --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to);
    --tw-gradient-to: #312e81 var(--tw-gradient-to-position);
  }
</style>
