import { sidebar } from "vuepress-theme-hope";
import { devNote } from './devNote'

export const zhSidebar = sidebar({
  "/": [
    "",
    {
      icon: "discover",
      text: "Demo",
      prefix: "demo/",
      link: "demo/",
      children: "structure",
    },
    {
      text: "Java",
      icon: "note",
      prefix: "devNote/",
      children: "structure",
    },
    // "intro",
    // "slides",
  ],
  '/devNote/': devNote,


});
