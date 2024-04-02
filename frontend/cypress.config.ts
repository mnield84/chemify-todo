import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
      // viteConfig?: Will try to infer, if passed it will be used as is
    },
  },

  e2e: {
  },
});
