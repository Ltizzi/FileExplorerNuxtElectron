<template>
  <div
    class="border border-purple-600 w-full py-5 bg-gradient-to-r from-blue-950 from-10% via-indigo-900 via-30% to-purple-900 to-95%"
  >
    <ol class="flex flew-row gap-0.5 justify-start text-white">
      <li class="w-auto" v-for="route in props.routeArray">
        <span
          v-if="route.folder.length > 0"
          class="bg-purple-100 text-purple-800 text-base font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-pink-500 dark:text-pink-50 hover:cursor-pointer"
          @click="$emit('newRoute', route.route)"
          :alt="route.route"
          >{{ route.folder }}</span
        >
      </li>
    </ol>
  </div>
</template>

<script setup lang="ts">
  import type { RouteNavigation } from "~/types/common";

  const props = defineProps({
    routeArray: Array<RouteNavigation>,
  });
</script>

<style scoped></style>
