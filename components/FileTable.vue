<template>
  <div
    class="overflow-x-auto rounded-lg border-0 border-gray-200 dark:border-violet-950"
  >
    <table
      class="min-w-full overflow-y-auto border text-lg text-yellow-200 border-purple-600 bg-white dark:border-violet-950 dark:bg-indigo-950 font-mono"
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
        class="divide-y divide-violet-600 dark:divide-violet-600 dark:bg-gradient-to-r dark:from-indigo-950 dark:to-purple-950 dark:via-90% dark:via-violet-950 border-purple-600 text-yellow-50 border"
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
            ' hover:cursor-pointer w-full',
            state.selectedFile == -1 ? 'selected' : '',
          ]"
        >
          <td
            class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white flex flex-row gap-5 w-full"
          >
            ...
          </td>
          <td class="full"></td>
          <td class="full"></td>
          <td class="full"></td>
        </tr>
        <tr
          v-if="!props.showDrives"
          v-for="(file, index) in props.files"
          :key="index"
          :class="[
            ' hover:cursor-pointer',
            index == state.selectedFile ? 'selected scroll-smooth' : '',
          ]"
          @dblclick="
            file.isFolder ? $emit('setRoute', file.route) : openFile(file.route)
          "
          @click.left="state.selectedFile = index"
        >
          <td
            class="whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-white flex flex-row gap-5"
          >
            <span v-if="file.isFolder"><IconsFolderIcon /></span>
            <p>{{ fileNameTemplateGenerator(file) }}</p>
          </td>
          <td
            class="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200"
          >
            {{ !file.isFolder ? getExtension(file.name) : "DIR" }}
          </td>
          <td
            class="whitespace-nowrap px-4 py-2 text-gray-700 dark:text-gray-200"
          >
            {{ fileSpaceTemplateGenerator(file.size) }}
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
  // import { ipcRenderer, shell } from 'electron';
  import type { HDElement } from "~/types/common";

  const props = defineProps({
    files: Array<HDElement>,
    drives: Array<string>,
    showDrives: Boolean,
  });

  const state = reactive({
    selectedFile: 0,
    canOpen: true,
    preview: "",
    previousIndex: [0],
  });

  const emit = defineEmits([
    "setRoute",
    "goBack",
    "goPreviousDir",
    "previewImg",
    "previewVideo",
    "previewAudio",
    "noPreview",
  ]);

  document.addEventListener("keydown", (event) => {
    let maxIndex = 0;
    if (props.files && !props.showDrives) {
      maxIndex = props.files.length - 1;
    }
    if (props.drives && props.showDrives) {
      maxIndex = props.drives.length - 1;
    }
    if (state.selectedFile === -1) {
      state.canOpen = false;
    } else state.canOpen = true;

    if (event.key === "ArrowDown" && state.selectedFile != maxIndex) {
      state.selectedFile += 1;
      handlePreview();
    }
    if (event.key === "PageDown" && state.selectedFile != maxIndex) {
      if (maxIndex - state.selectedFile < 20) state.selectedFile = maxIndex;
      else state.selectedFile += 20;
      handlePreview();
    }
    if (event.key === "ArrowUp") {
      if (!props.showDrives && state.selectedFile != -1) {
        state.selectedFile -= 1;
        handlePreview();
      }

      if (props.showDrives && state.selectedFile != 0) state.selectedFile -= 1;
    }
    if (event.key === "PageUp") {
      if (state.selectedFile < 20 && !props.showDrives) state.selectedFile = -1;
      if (state.selectedFile >= 20 && !props.showDrives) {
        state.selectedFile -= 20;
        handlePreview();
      }
      if (props.showDrives && props.drives.length < 20) {
        state.selectedFile = 0;
      }
    }
    if (event.key === "Home") {
      if (!props.showDrives) state.selectedFile = -1;
      else state.selectedFile = 0;
    }
    if (event.key === "End") {
      if (!props.showDrives) state.selectedFile = props.files.length - 1;
      else state.selectedFile = props.drives.length - 1;
    }
    if (
      event.key === "Enter" &&
      state.selectedFile >= 0 &&
      props.files &&
      props.files[state.selectedFile].isFolder &&
      !props.showDrives &&
      state.selectedFile >= 0
    ) {
      state.previousIndex.push(state.selectedFile);
      emit("setRoute", props.files[state.selectedFile].route);
      setTimeout(() => {
        state.selectedFile = -1;
      }, 100);
    }
    if (event.key === "Enter" && state.selectedFile == -1) {
      emit("goPreviousDir");
      state.selectedFile = state.previousIndex[state.previousIndex.length - 1];
      state.previousIndex.pop();
      state.canOpen = false;
    }
    if (
      event.key == "Enter" &&
      props.files &&
      state.selectedFile != -1 &&
      !props.files[state.selectedFile].isFolder &&
      !props.showDrives &&
      state.canOpen
    ) {
      openFile(props.files[state.selectedFile].route);
    }
    if (event.key === "Enter" && props.showDrives && props.drives) {
      state.previousIndex.push(state.selectedFile);
      emit("setRoute", props.drives[state.selectedFile]);
      state.selectedFile = -1;
    }
    if (event.key === "Backspace") {
      emit("goBack");
    }
  });

  const extensions = {
    img: ["jpg", "jpeg", "gif", "png", "jfif", "webp", "bmp"],
    video: ["mkv", "avi", "mp4", "mpg", "flv", "webm"],
    audio: ["wav", "mp3", "ogg", "flac"],
  };

  function handlePreview() {
    const route = props.files[state.selectedFile].route;
    console.log("ruta from handlepreview: ", route);
    if (!route || props.showDrives) {
      state.canOpen = false;
      return;
    } else {
      let extension = getExtension(route).toLowerCase();
      if (extensions.img.includes(extension)) {
        emit("previewImg", route);
      } else if (extensions.video.includes(extension)) {
        emit("previewVideo", route);
      } else if (extensions.audio.includes(extension)) {
        emit("previewAudio", route);
      } else {
        emit("noPreview");
      }
    }
  }

  async function openFile(route: string) {
    console.log("ruta: ", route);
    console.log(window);
    await commAPI.openFile(route);
    state.canOpen = false;
  }

  function getExtension(name: string) {
    let splittedString = name.split(".");
    return splittedString[splittedString.length - 1];
  }

  function fileSpaceTemplateGenerator(space: number) {
    let sol = 0;
    if (space > 1024) {
      sol = space / 1024;
      if (sol > 1024) {
        sol = sol / 1024;
        if (sol > 1024) {
          sol = sol / 1024;
          return sol.toFixed(2) + " Gb";
        } else return sol.toFixed(2) + " Mb";
      } else return sol.toFixed(2) + " Kb";
    } else return space + " B";
  }

  function fileNameTemplateGenerator(file: any) {
    if (file.name.length > 65) {
      return (
        file.name.substring(0, 65) +
        "(...)" +
        `${!file.isFolder ? "." + getExtension(file.name) : ""}`
      );
    }
    return file.name;
  }

  onMounted(() => {
    if (props.showDrives) state.selectedFile = 0;
    else if (!props.files && props.showDrives) state.selectedFile = -1;
    else state.selectedFile = -1;
  });
</script>
<style>
  .selected {
    --tw-bg-opacity: 1;
    background-color: rgb(219 39 119 / var(--tw-bg-opacity));
  }
</style>
