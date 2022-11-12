import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",
  port: 8099,
  // 设置中文
  locales: {
    "/": {
      lang: "zh-CN",
      title: "寒舞博客",
      description: "hanwu 的博客演示",
    },
  },

  theme,

  shouldPrefetch: false,
});
