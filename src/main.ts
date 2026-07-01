import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./app/router";
import { pinia } from "./app/providers/pinia";
import { vueQueryPlugin } from "./app/providers/query-client";
import "./app/styles/index.scss";

async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import("../mocks/browser");
    return worker.start({
      onUnhandledRequest: "bypass",
    });
  }
}

async function bootstrap() {
  await enableMocking();

  const app = createApp(App);

  app.use(pinia);
  app.use(router);
  app.use(vueQueryPlugin);

  app.mount("#app");
}

bootstrap();
