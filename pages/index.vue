<template>
  <div class="h-screen text-white">
    <div class="h-screen flex flex-row">
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

      <div class="card w-9/12 mt-5 h-fit">
        <RouteNav
          :route-array="routeArray"
          @new-route="(route) => changePath(route)"
        />
        <FileTable
          :files="dirs"
          :drives="drives"
          :showDrives="showDrives"
          @set-route="(route) => changePath(route)"
          @go-back="goToPreviousPath()"
          @go-previous-dir="goToPreviousDir()"
        ></FileTable>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { RouteNavigation } from "~/types/common";

  const dir = ref("C:\\");
  const actualFolder = ref("");
  const isLoaded = ref(false);
  const drives = ref([]);
  const showDrives = ref(false);

  const previousPath = ref("C:\\");

  const selectedElement = ref();

  const routeArray = ref([] as Array<RouteNavigation>);

  const routeHistory = ref([] as Array<string>);

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
    if (showDrives.value) showDrives.value = false;
    console.log("ROUTE: ", route);
    if (route && route.length == 2 && route[1] == ":") {
      route = route + "\\";
    }
    if (
      route != previousPath.value &&
      route != routeHistory.value[routeHistory.value.length - 1]
    ) {
      routeHistory.value.push(dir.value);
    }
    console.log("ROUTE HISTORY:");
    console.log(routeHistory.value);
    previousPath.value = dir.value;
    dir.value = route;

    await fetchData();
    generateRouteArray();

    isLoaded.value = true;
  }

  async function goToPreviousPath() {
    let lastIndex = routeHistory.value.length - 1;
    await changePath(routeHistory.value[lastIndex]);
    checkHistory(lastIndex);
  }

  async function goToPreviousDir() {
    console.log("isROOT: ", checkIsRoot(dir.value));
    if (checkIsRoot(dir.value)) {
      showDrives.value = true;
      dir.value = "drives";
      routeArray.value = [];
    } else await goToPreviousPath();
  }

  function checkIsRoot(route: string) {
    if (route && route.length < 4) {
      return true;
    }
    return false;
  }

  function checkHistory(lastIndex: number) {
    console.log("DIR: ", dir.value);
    console.log("Previous: ", routeHistory.value[lastIndex]);
    // if (
    //   dir.value == routeHistory.value[lastIndex] ||
    //   previousPath.value == routeHistory.value[lastIndex]
    // ) {
    //   console.log(routeHistory.value.length);
    routeHistory.value.pop();
    //   console.log(routeHistory.value);
    //   console.log(routeHistory.value.length);
    // }
  }

  async function fetchData() {
    isLoaded.value = false;
    generateRouteArray();
    const response = await $fetch(`/api/ls?dir=${dir.value}&template=false`, {
      method: "GET",
    });
    if (response.dirs) {
      dirs = response.dirs;
    }
    isLoaded.value = true;
  }

  async function fetchDrives() {
    isLoaded.value = false;
    const response: any = await $fetch("/api/drives", { method: "GET" });
    drives.value = response.drives;
    console.log(drives.value);
    isLoaded.value = true;
  }

  onMounted(async () => {
    await fetchData();
    await fetchDrives();
  });
</script>

<style scoped></style>
