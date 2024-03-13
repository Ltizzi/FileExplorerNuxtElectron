<template>
  <div
    class="overflow-x-auto rounded-lg border-0 border-gray-200 dark:border-violet-950"
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
          v-for="file in props.files"
          class="hover:bg-pink-600 hover:cursor-pointer"
          @dblclick="
            file.isFolder ? $emit('setRoute', file.route) : openFile(file.route)
          "
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
  //import { ipcRenderer } from "electron";
  import type { HDElement } from "~/types/common";

  const props = defineProps({ files: Array<HDElement> });

  function openFile(route: string) {
    console.log("DOBLE CLICK");
    if (typeof window !== "undefined") {
      const { ipcRenderer } = window.require("electron");
      // $fetch("/api/openfile?route=" + route, { method: "GET" });
      ipcRenderer.send("openfile", route);
    }
  }

  function getExtension(name: string) {
    let splittedString = name.split(".");
    return splittedString[splittedString.length - 1];
  }
</script>
