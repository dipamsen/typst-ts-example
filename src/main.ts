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

let quest = `A uniform capillary tube of inner radius $r$ is dipped vertically into a beaker filled with water. The water rises to a height $h$ in the capillary tube above the water surface in the beaker. The surface tension of water is $sigma$. The angle of contact between water and the wall of the capillary tube is $theta$. Ignore the mass of water in the meniscus. Which of the following statements is (are) true?`;
let options = [
  `For a given material of the capillary tube, $h$ decreases with increase in $r$`,
  `For a given material of the capillary tube, $h$ is independent of $sigma$`,
  `If this experiment is performed in a lift going up with a constant acceleration, then $h$ decreases`,
  `$h$ is proportional to contact angle $theta$`,
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
