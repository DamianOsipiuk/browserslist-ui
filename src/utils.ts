export enum BrowserType {
  Desktop,
  Mobile,
}

export interface Browser {
  name: string;
  id: string;
  icon: string;
  type: BrowserType;
}

export interface BrowserData extends Browser {
  versions: { [key: string]: string };
}

type BrowserMap = Record<string, Browser>;

export const browserMap: BrowserMap = {
  android: {
    name: "Android",
    id: "android",
    icon: require("@/assets/browsers/android.svg"),
    type: BrowserType.Mobile,
  },
  baidu: {
    name: "Baidu",
    id: "baidu",
    icon: require("@/assets/browsers/baidu.svg"),
    type: BrowserType.Desktop,
  },
  bb: {
    name: "BlackBerry",
    id: "bb",
    icon: require("@/assets/browsers/bb.svg"),
    type: BrowserType.Mobile,
  },
  chrome: {
    name: "Chrome",
    id: "chrome",
    icon: require("@/assets/browsers/chrome.svg"),
    type: BrowserType.Desktop,
  },
  and_chr: {
    name: "Chrome Android",
    id: "and_chr",
    icon: require("@/assets/browsers/chrome.svg"),
    type: BrowserType.Mobile,
  },
  edge: {
    name: "Edge",
    id: "edge",
    icon: require("@/assets/browsers/edge.svg"),
    type: BrowserType.Desktop,
  },
  electron: {
    name: "Electron",
    id: "electron",
    icon: require("@/assets/browsers/electron.svg"),
    type: BrowserType.Desktop,
  },
  ie: {
    name: "Internet Explorer",
    id: "ie",
    icon: require("@/assets/browsers/ie.svg"),
    type: BrowserType.Desktop,
  },
  ie_mob: {
    name: "Internet Explorer Mobile",
    id: "ie_mob",
    icon: require("@/assets/browsers/ie.svg"),
    type: BrowserType.Mobile,
  },
  firefox: {
    name: "Mozilla Firefox",
    id: "firefox",
    icon: require("@/assets/browsers/firefox.svg"),
    type: BrowserType.Desktop,
  },
  and_ff: {
    name: "Firefox Android",
    id: "and_ff",
    icon: require("@/assets/browsers/firefox.svg"),
    type: BrowserType.Mobile,
  },
  ios_saf: {
    name: "iOS Safari",
    id: "ios_saf",
    icon: require("@/assets/browsers/safari.svg"),
    type: BrowserType.Mobile,
  },
  node: {
    name: "Node.js",
    id: "node",
    icon: require("@/assets/browsers/v8.svg"),
    type: BrowserType.Desktop,
  },
  opera: {
    name: "Opera",
    id: "opera",
    icon: require("@/assets/browsers/opera.svg"),
    type: BrowserType.Desktop,
  },
  op_mini: {
    name: "Opera Mini",
    id: "op_mini",
    icon: require("@/assets/browsers/opera.svg"),
    type: BrowserType.Mobile,
  },
  op_mob: {
    name: "Opera Mobile",
    id: "op_mob",
    icon: require("@/assets/browsers/opera.svg"),
    type: BrowserType.Mobile,
  },
  and_qq: {
    name: "QQ Browser",
    id: "and_qq",
    icon: require("@/assets/browsers/unknown.svg"),
    type: BrowserType.Mobile,
  },
  safari: {
    name: "Safari",
    id: "safari",
    icon: require("@/assets/browsers/safari.svg"),
    type: BrowserType.Desktop,
  },
  samsung: {
    name: "Samsung Internet",
    id: "samsung",
    icon: require("@/assets/browsers/samsung.svg"),
    type: BrowserType.Mobile,
  },
  and_uc: {
    name: "UC Browser",
    id: "and_uc",
    icon: require("@/assets/browsers/uc.svg"),
    type: BrowserType.Mobile,
  },
  kaios: {
    name: "KaiOS Browser",
    id: "kaios",
    icon: require("@/assets/browsers/kaios.svg"),
    type: BrowserType.Mobile,
  },
  unknown: {
    name: "Unknown",
    id: "unknown",
    icon: require("@/assets/browsers/unknown.svg"),
    type: BrowserType.Desktop,
  },
};
