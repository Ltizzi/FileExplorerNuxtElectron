<template>
  <div
    class="overflow-x-auto overflow-y-scroll h-fit rounded-lg border-0 border-gray-200 dark:border-violet-950"
  >
    <table
      class="min-w-full border text-lg text-yellow-200 border-purple-600 bg-white dark:border-violet-950 dark:bg-indigo-950"
    >
      <thead
        class="ltr:text-left rtl:text-right border border-purple-600 dark:bg-gradient-to-br dark:from-indigo-950 dark:to-pink-950 dark:via-violet-950 dark:from-30% dark:via-90%"
      >
        <tr>
          <th
            class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-yellow-50"
          >
            Name
          </th>
          <th
            class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white"
          >
            Type
          </th>
          <th
            class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white"
          >
            Size
          </th>
          <th
            class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white"
          >
            Modified
          </th>
        </tr>
      </thead>

      <tbody
        class="divide-y divide-violet-600 dark:divide-violet-600 dark:bg-gradient-to-r dark:from-indigo-950 dark:to-purple-950 dark:via-90% dark:via-violet-950 text-yellow-50 border border-purple-600"
      >
        <!--    @click=" file.folder)"$emit('setRoute', file.isFolder ? file.route : openFile(file.route)) -->
        <tr
          v-if="props.showDrives"
          v-for="(drive, index) in props.drives"
          :key="index"
          :class="[
            ' hover:cursor-pointer',
            index == state.selectedFile ? 'selected' : '',
          ]"
          @dblclick="$emit('setRoute', drive)"
          @mouseover="state.selectedFile = index"
        >
          <td
            class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white flex flex-row gap-5"
          >
            <span><IconsDriveIcon /></span>
            <p>{{ drive }}</p>
          </td>
          <td
            class="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200"
          >
            "DRIVE"
          </td>
          <td
            class="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200"
          >
            0
          </td>

          <td
            class="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200"
          >
            0
          </td>
        </tr>
        <tr
          v-if="!props.showDrives"
          :class="[
            ' hover:cursor-pointer',
            state.selectedFile == -1 ? 'selected' : '',
          ]"
        >
          <td
            class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white flex flex-row gap-5 w-full"
          >
            ...
          </td>
        </tr>
        <tr
          v-if="!props.showDrives"
          v-for="(file, index) in props.files"
          :key="index"
          :class="[
            ' hover:cursor-pointer',
            index == state.selectedFile ? 'selected' : '',
          ]"
          @dblclick="
            file.isFolder ? $emit('setRoute', file.route) : openFile(file.route)
          "
          @mouseover="state.selectedFile = index"
        >
          <td
            class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white flex flex-row gap-5"
          >
            <span v-if="file.isFolder"><IconsFolderIcon /></span>
            <p>{{ file.name }}</p>
          </td>
          <td
            class="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200"
          >
            {{ !file.isFolder ? getExtension(file.name) : "DIR" }}
          </td>
          <td
            class="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200"
          >
            {{ file.size }} bytes
          </td>

          <td
            class="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200"
          >
            {{ file.modified }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
  // import { ipcRenderer } from "electron";
  import type { HDElement } from "~/types/common";

  const props = defineProps({
    files: Array<HDElement>,
    drives: Array<string>,
    showDrives: Boolean,
  });

  const state = reactive({
    selectedFile: 0,
  });

  const emit = defineEmits(["setRoute", "goBack", "goPreviousDir"]);

  document.addEventListener("keydown", (event) => {
    let maxIndex = 0;
    if (props.files && !props.showDrives) {
      maxIndex = props.files.length - 1;
    }
    if (props.drives && props.showDrives) {
      maxIndex = props.drives.length - 1;
    }
    if (event.key === "ArrowDown" && state.selectedFile != maxIndex) {
      state.selectedFile += 1;
    }
    if (event.key === "ArrowUp") {
      if (!props.showDrives && state.selectedFile != -1)
        state.selectedFile -= 1;
      if (props.showDrives && state.selectedFile != 0) state.selectedFile -= 1;
    }
    if (
      event.key === "Enter" &&
      state.selectedFile >= 0 &&
      props.files &&
      props.files[state.selectedFile].isFolder &&
      !props.showDrives
    ) {
      if (state.selectedFile >= 0)
        emit("setRoute", props.files[state.selectedFile].route);
      setTimeout(() => {
        state.selectedFile = 0;
      }, 100);
    }
    if (event.key === "Enter" && state.selectedFile == -1) {
      emit("goPreviousDir");
      state.selectedFile = 0;
    }
    if (
      event.key == "Enter" &&
      props.files &&
      state.selectedFile != -1 &&
      !props.files[state.selectedFile].isFolder &&
      !props.showDrives
    ) {
      openFile(props.files[state.selectedFile].route);
    }
    if (event.key === "Enter" && props.showDrives && props.drives) {
      emit("setRoute", props.drives[state.selectedFile]);
    }
    if (event.key === "Backspace") {
      emit("goBack");
    }
  });

  // document.addEventListener("keydown", (event) => {});

  function openFile(route: string) {
    console.log("DOBLE CLICK");

    const { ipcRenderer } = window.require("electron");
    // $fetch("/api/openfile?route=" + route, { method: "GET" });
    ipcRenderer.send("openfile", route);
  }

  function getExtension(name: string) {
    let splittedString = name.split(".");
    return splittedString[splittedString.length - 1];
  }

  // onMounted(() => {
  //   if (props.showDrives) showDrives.value = true;
  //   else showDrives.value = false;
  // });
</script>
<style>
  .selected {
    --tw-bg-opacity: 1;
    background-color: rgb(219 39 119 / var(--tw-bg-opacity));
  }
</style>
