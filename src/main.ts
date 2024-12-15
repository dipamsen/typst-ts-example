import { $typst } from "@myriaddreamin/typst.ts/dist/esm/contrib/snippet.mjs";
import renderUrl from "@myriaddreamin/typst-ts-renderer/pkg/typst_ts_renderer_bg.wasm?url";
import compileUrl from "@myriaddreamin/typst-ts-web-compiler/pkg/typst_ts_web_compiler_bg.wasm?url";
import "./style.css";

const app = document.getElementById("app")!;

$typst.setRendererInitOptions({
  getModule: () => new URL(renderUrl, import.meta.url),
});

$typst.setCompilerInitOptions({
  getModule: () => new URL(compileUrl, import.meta.url),
});

let quest = `In Typst, what is the purpose of a #raw("#set", lang: "typ") rule?`;
let options = [
  `To set the value of a variable.`,
  `To set default values for optional parameters on an element`,
  `For template usage`,
  `None of these`,
];
const content = (width: number) => `
#set page(width: ${width}pt, height: auto, margin: 1em)
#set text(2em, hyphenate: false)
#set par(justify: true)


#let options(..opts) = {
  set enum(numbering: "(A)")
  for opt in opts.pos() {
    [+ #opt]
  }
}

${quest}

#options${options.map((x) => `[${x}]`).join("")}

`;

addEventListener("resize", async () => {
  svg.innerHTML = await $typst.svg({
    mainContent: content(window.innerWidth),
  });
});

const svg = document.createElement("svg");
svg.innerHTML = await $typst.svg({
  mainContent: content(window.innerWidth),
});
app.appendChild(svg);

// app?.appendChild(document.createTextNode("Hello, World!"));
