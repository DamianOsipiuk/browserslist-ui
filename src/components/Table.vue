<template>
  <table>
    <thead>
      <tr>
        <th>
          <img class="icon" :src="browser.icon" :alt="browser.name" />
        </th>
        <th>{{ browser.name }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(coverage, version) in browser.versions" :key="version">
        <td>{{ version }}</td>
        <td>{{ coverage }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { BrowserData } from "../utils";

@Options({
  props: {
    browser: {} as BrowserData,
  },
})
export default class Table extends Vue {}
</script>

<style scoped>
table {
  position: relative;
  border-top: 2px solid rgba(255, 255, 255, 0.12);
  padding: 5px 0;
  width: 100%;
}
th {
  position: sticky;
  background-color: #303030;
  top: 55px;
  min-width: 150px;
}
td {
  text-align: center;
}
.icon {
  width: 32px;
  height: 32px;
  aspect-ratio: 1;
}
</style>
