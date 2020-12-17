<template>
  <div class="progress">
    <div class="progress-value" v-bind:style="{ width: value + '%' }" />
    <div class="progress-text">Total Coverage: {{ value }}%</div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    value: 0,
  },
})
export default class Progress extends Vue {}
</script>

<style scoped>
.progress {
  background: rgba(255, 255, 255, 0.1);
  align-items: center;
  position: relative;
  padding: 0 5px;
  display: flex;
  width: 90%;
  height: 40px;
  max-width: 670px;
}

.progress-value {
  transition: ease-out 0.5s;
  box-shadow: 0 10px 40px -10px #fff;
  background: #34c2e3;
  height: 30px;
  width: 0;
}

.progress-text {
  width: 100%;
  text-align: center;
  position: absolute;
  color: #fff;
}
</style>
