/* eslint-disable no-console */

import { register } from "register-service-worker";

const hour = 1000 * 60 * 60;

if (process.env.NODE_ENV === "production") {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log("App is being served from cache by a service worker.");
    },
    registered(reg) {
      console.log("Service worker has been registered.");
      setInterval(() => {
        console.log("Check for updates");
        reg.update();
      }, hour);
    },
    cached() {
      console.log("Content has been cached for offline use.");
    },
    updatefound() {
      console.log("New content is downloading.");
    },
    updated(reg) {
      console.log("New content is available; please refresh.");
      document.dispatchEvent(
        new CustomEvent("worker-updated", { detail: reg.waiting }),
      );
    },
    offline() {
      console.log(
        "No internet connection found. App is running in offline mode.",
      );
    },
    error(error) {
      console.error("Error during service worker registration:", error);
    },
  });
}
