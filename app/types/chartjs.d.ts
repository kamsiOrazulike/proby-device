import { Plugin } from "chart.js";

declare module "chartjs-plugin-zoom" {
  const plugin: Plugin;
  export default plugin;
}
