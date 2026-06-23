import { VueQueryPlugin, QueryClient } from "@tanstack/vue-query";
import type { App } from "vue";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 30,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export const vueQueryPlugin = {
  install(app: App) {
    app.use(VueQueryPlugin, {
      queryClient,
    });
  },
};

export { queryClient };
