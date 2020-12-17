<template>
  <h1>Browserslist UI</h1>
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
    <span>
      Source -
      <a href="https://github.com/DamianOsipiuk">GitHub</a>
    </span>
    <span>
      <a href="https://github.com/browserslist/browserslist">Browserslist</a>
      -
      {{ browserslistVersion }}
    </span>
    <span>
      <a href="https://github.com/ben-eb/caniuse-lite">caniuse-lite</a> -
      {{ caniuseVersion }}
    </span>
  </footer>
</template>

<script lang="ts">
import browserslist from "browserslist";
import { Options, Vue } from "vue-class-component";
import Table from "./components/Table.vue";
import Progress from "./components/Progress.vue";
import { BrowserType, BrowserData, browserMap } from "./utils";

@Options({
  components: { Table, Progress },
  data: () => ({
    browserString:
      new URLSearchParams(window.location.search).get("q") || "defaults",
    queryError: false,
    totalCoverage: "unknown",
  }),
  computed: {
    browserslistVersion() {
      // @ts-expect-error TODO
      return window.browserslistVersion;
    },
    caniuseVersion() {
      // @ts-expect-error TODO
      return window.caniuseVersion;
    },
    browserData(): BrowserData[] {
      let data: Record<string, BrowserData> = {};
      this.queryError = false;
      try {
        const result = browserslist(this.browserString);
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
        this.totalCoverage = browserslist.coverage(result).toFixed(2);
      } catch (error) {
        this.queryError = true;
        this.totalCoverage = 0;
      }

      return Object.values(data);
    },
    desktopBrowsers() {
      return this.browserData.filter(
        (browser: BrowserData) => browser.type === BrowserType.Desktop,
      );
    },
    mobileBrowsers() {
      return this.browserData.filter(
        (browser: BrowserData) => browser.type === BrowserType.Mobile,
      );
    },
  },
  methods: {
    appendQueryToUrl() {
      if (!this.queryError) {
        history.replaceState(
          undefined,
          "Browserslist UI",
          "/?q=" + this.browserString,
        );
      }
    },
  },
})
export default class App extends Vue {}
</script>

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
main {
  position: relative;
  display: flex;
  gap: 50px;
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
</style>
