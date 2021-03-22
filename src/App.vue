<script lang="ts">
import browserslist from "browserslist";
import { computed, defineComponent, ref, watchEffect } from "vue";

import Table from "./components/Table.vue";
import Progress from "./components/Progress.vue";
import { BrowserType, BrowserData, browserMap } from "./utils";
import versions from "./versions.json";

export default defineComponent({
  name: "App",
  components: { Table, Progress },
  setup() {
    const worker = ref<ServiceWorker>();
    const updateExists = ref(false);

    const browserString = ref(
      new URLSearchParams(window.location.search).get("q") || "defaults",
    );
    const browserData = ref([] as BrowserData[]);
    const queryError = ref(false);
    const totalCoverage = ref("0");

    const appendQueryToUrl = () => {
      if (!queryError.value) {
        history.replaceState(
          undefined,
          "Browserslist UI",
          "/?q=" + encodeURIComponent(browserString.value),
        );
      }
    };

    watchEffect(() => {
      let data: Record<string, BrowserData> = {};
      queryError.value = false;
      try {
        const result = browserslist(browserString.value);
        const usageData = browserslist.usage.global;
        data = result.reduce((acc: Record<string, BrowserData>, item) => {
          const coverage = usageData?.[item].toFixed(2) + "%" || "unknown";
          const [name, version] = item.split(" ");
          if (acc[name]) {
            acc[name].versions[version] = coverage;
          } else {
            let browser = browserMap[name];
            if (!browser) {
              browser = {
                name,
                id: name,
                icon: browserMap.unknown.icon,
                type: browserMap.unknown.type,
              };
            }
            acc[name] = {
              ...browser,
              versions: { [version]: coverage },
            };
          }
          return acc;
        }, {});
        totalCoverage.value = browserslist.coverage(result).toFixed(2);
      } catch (error) {
        queryError.value = true;
        totalCoverage.value = "0";
      }

      browserData.value = Object.values(data);
    });

    const desktopBrowsers = computed(() => {
      return browserData.value.filter(
        (browser: BrowserData) => browser.type === BrowserType.Desktop,
      );
    });

    const mobileBrowsers = computed(() => {
      return browserData.value.filter(
        (browser: BrowserData) => browser.type === BrowserType.Mobile,
      );
    });

    function showRefreshUI(event: CustomEvent<ServiceWorker>) {
      worker.value = event.detail;
      updateExists.value = true;
    }
    function refreshApp() {
      updateExists.value = false;
      if (!worker.value) {
        // eslint-disable-next-line no-console
        console.warn("No worker data found when trying to refresh!");
        return;
      }
      worker.value.postMessage({ type: "SKIP_WAITING" });
    }

    // @ts-expect-error FIXME
    document.addEventListener("worker-updated", showRefreshUI, {
      once: true,
    });

    return {
      browserString,
      queryError,
      totalCoverage,
      versions,
      appendQueryToUrl,
      desktopBrowsers,
      mobileBrowsers,

      showRefreshUI,
      refreshApp,
      updateExists,
    };
  },
});
</script>

<template>
  <h1>Browserslist UI</h1>
  <button class="update-button" v-if="updateExists" @click="refreshApp">
    New version available! Click to update.
  </button>
  <div class="query">
    <div class="input">
      <input
        id="userInput"
        v-on:input="appendQueryToUrl"
        v-model="browserString"
      />
      <label for="userInput">
        &#128269;
        <a
          href="https://github.com/browserslist/browserslist#query-composition"
        >
          Browserslist query
        </a>
        <span class="error" v-if="queryError">&#10071; Invalid query</span>
      </label>
    </div>
  </div>

  <Progress v-bind:value="totalCoverage" />
  <main>
    <section>
      <h1>Desktop Browsers</h1>
      <Table
        v-for="browser in desktopBrowsers"
        :key="browser.name"
        :browser="browser"
      />
    </section>
    <section>
      <h1>Mobile Browsers</h1>
      <Table
        v-for="browser in mobileBrowsers"
        :key="browser.name"
        :browser="browser"
      />
    </section>
  </main>
  <footer>
    <div>
      <p>Source</p>
      <p>
        <a href="https://github.com/DamianOsipiuk/browserslist-ui">GitHub</a>
      </p>
    </div>
    <div>
      <p>
        <a href="https://github.com/browserslist/browserslist">Browserslist</a>
      </p>
      <p>{{ versions.browserslist }}</p>
    </div>
    <div>
      <p>
        <a href="https://github.com/ben-eb/caniuse-lite">caniuse-lite</a>
      </p>
      <p>{{ versions.caniuse }}</p>
    </div>
  </footer>
</template>

<style>
@media (max-width: 700px) {
  main {
    flex-direction: column;
  }
}

body {
  width: 100%;
  padding: 0;
  margin: 0;
  color: #fff;
  background-color: #303030;
}
#app {
  font-family: Roboto, sans-serif;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.query {
  position: sticky;
  width: 100%;
  top: 0;
  z-index: 2;
  background-color: #424242;
  border-bottom: rgba(255, 255, 255, 0.12) 1px solid;
}
.progress {
  margin-top: 10px;
}
main {
  position: relative;
  display: flex;
  gap: 50px;
  text-align: center;
}
section:nth-child(1) {
  margin-right: 10px;
}
footer {
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 30px;
  padding: 30px 0;
  background-color: #424242;
  border-top: rgba(255, 255, 255, 0.12) 1px solid;
}
footer div {
  margin: 10px 0;
  text-align: center;
  min-width: 100px;
}
footer p {
  margin: 0;
}

input {
  color: #fff;
  width: 100%;
  background-color: #424242;
  height: 56px;
  padding: 20px 16px 6px;
  outline: rgba(255, 255, 255, 0.12);

  display: inline-flex;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;

  border: none;
}

.input {
  position: relative;
  width: 100%;
}

input:hover {
  filter: brightness(95%);
  width: 100%;
}

.input label {
  position: absolute;
  top: 5px;
  left: 16px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.75rem;
}

a {
  color: #fff;
}

.error {
  color: red;
}

.update-button {
  position: fixed;
  top: 5px;
  right: 5px;
  height: 50px;
  background: #424242;
  color: white;
  z-index: 3;
}
</style>
