<template>
  <div class="h-auto text-white">
    <div class="h-full flex flex-row">
      <div class="flex flex-col w-1/12 mt-10">
        <p>{{ dir }}</p>
        <!--     <h1 v-if="isLoaded">Carpeta: {{ dirs[0].folder }}</h1>
        
        <input
          type="text"
          v-model="dir"
          class="bg-slate-500 my-10"
          @keyup.enter="fetchData()"
          v-if="isLoaded"
        />-->
        <DriveNav @new-route="(route) => changePath(route)" />

        <button
          @click="goToPreviousPath()"
          class="bg-purple-700 text-white py-0.5 px-2 rounded-xl"
        >
          Back
        </button>
      </div>

      <div class="card w-9/12 mt-5">
        <RouteNav
          :route-array="routeArray"
          @new-route="(route) => changePath(route)"
        />
        <FileTable
          :files="dirs"
          @set-route="(route) => changePath(route)"
        ></FileTable>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { RouteNavigation } from "~/types/common";

  const dir = ref("c:\\");
  const actualFolder = ref("");
  const isLoaded = ref(false);

  const previousPath = ref("c:\\");

  const selectedElement = ref();

  const routeArray = ref([] as Array<RouteNavigation>);

  let dirs: any = reactive([]);

  function generateRouteArray() {
    let array = [] as Array<RouteNavigation>;
    let splitArray = dir.value.split("\\");
    splitArray.forEach((folder: string) => {
      let routeSplitted = dir.value.split(folder);
      const routeNav: RouteNavigation = {
        folder: folder,
        route: routeSplitted[0] + folder,
      };
      array.push(routeNav);
    });
    routeArray.value = array;
  }

  async function changePath(route: string) {
    previousPath.value = dir.value;
    dir.value = route;
    await fetchData();
    generateRouteArray();
    isLoaded.value = true;
  }

  async function goToPreviousPath() {
    await changePath(previousPath.value);
  }

  async function fetchData() {
    isLoaded.value = false;
    generateRouteArray();
    const response = await $fetch(`/api/ls?dir=${dir.value}&template=false`, {
      method: "GET",
    });
    if (response.dirs) {
      dirs = response.dirs;
      // console.log(dirs);
      isLoaded.value = true;
    }
  }

  await fetchData();

  onMounted(async () => {
    await fetchData();
    console.log("PRE FETCH");
  });
</script>

<style scoped></style>
