import { MarkdownRenderer } from "./lib/markdownrenderer";

const txt = `@@@
# Hallo Welt

@@@ bg-dark
## Slide 2

@@@
## Slide 3
- test
- test22
  - test 33`;
const md = MarkdownRenderer.it.render(txt);

console.log(md);
