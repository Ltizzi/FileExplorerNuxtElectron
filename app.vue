<template>
  <NuxtLayout>
    <NuxtPage></NuxtPage>
  </NuxtLayout>
  <!-- <div class="h-auto bg-slate-900 text-white">
   <div class="h-full">
      <h1 v-if="isLoaded">Carpeta: {{ dirs[0].folder }}</h1>
      <input
        type="text"
        v-model="dir"
        class="bg-slate-500 my-10"
        @keyup.enter="fetchData()"
        v-if="isLoaded"
      />
      <div class="card w-full">
  
      </div>

       <ul v-for="di in dirs" class="flex flex-col gap-5">
        <li class="hover:bg-slate-700">
          <pre>
            {{ di }}
          </pre>
        </li>
      </ul> -->
  <!-- <ul v-for="di in dirs" class="flex flex-col gap-5">
        <li class="hover:bg-slate-700">
          <p class="flex flex-row gap-20 text-white">
            <span>{{ di.isFolder }}</span>
            <span>{{ di.name }}</span>
            <span>{{ di.size }} bytes</span>
            <span>{{ new Date(di.modified).getDay() }}</span>
          </p>
        </li>
      </ul> 
    </div>
  </div> -->
</template>
<script setup lang="ts">
  // import type { HDElement } from "./types/common";

  // const dir = ref("c:\\");
  // const actualFolder = ref("");
  // const isLoaded = ref(false);

  // const selectedElement = ref();

  // const rowClasses = () => {
  //   return "hover:bg-slate-600";
  // };

  // let dirs: any = reactive([]);

  // async function fetchData() {
  //   isLoaded.value = false;
  //   const response = await $fetch(`/api/ls?dir=${dir.value}&template=false`, {
  //     method: "GET",
  //   });
  //   if (response.dirs) {
  //     dirs = response.dirs;
  //     console.log(dirs);
  //     isLoaded.value = true;
  //   }
  // }

  // onMounted(async () => {
  //   await fetchData();
  //   // const response = await $fetch(`/api/ls?dir=c:\\`, {
  //   //   method: "GET",
  //   // });
  //   // if (response.dirs) {
  //   //   dirs = response.dirs;
  //   //   isLoaded.value = true;
  //   // }
  //   // console.log(dirs.value);
  // });
  console.log("START...");
</script>
<style>
  body {
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
