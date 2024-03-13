<template>
  <div>
    <ul class="flex flex-col gap-2">
      <li v-for="drive in drives">
        <span
          class="bg-pink-100 text-pink-800 text-base font-bold me-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300 hover:cursor-pointer"
          @click="$emit('newRoute', drive)"
          >{{ drive }}</span
        >
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  const drives = ref([]);
  onMounted(async () => {
    const response: any = await $fetch("/api/drives", { method: "GET" });
    drives.value = response.drives;
  });
</script>
