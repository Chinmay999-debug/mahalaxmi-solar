// Post-build step for the GitHub Pages static site (dist/client).
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const out = "dist/client";
const base = "/mahalaxmi-solar/";
const index = join(out, "index.html");

if (!existsSync(index)) {
  console.error(`[pages] ${index} was not generated — prerender failed.`);
  process.exit(1);
}
if (!readFileSync(index, "utf8").includes(`${base}assets/`)) {
  console.error(`[pages] index.html does not reference assets under ${base}.`);
  process.exit(1);
}

// Serve files as-is (no Jekyll processing).
writeFileSync(join(out, ".nojekyll"), "");

// The site is a single page: send unknown paths back to the home page.
writeFileSync(
  join(out, "404.html"),
  `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Mahalaxmi Solar Service</title>
    <meta http-equiv="refresh" content="0; url=${base}" />
    <link rel="canonical" href="${base}" />
    <script>location.replace("${base}");</script>
  </head>
  <body>
    <p><a href="${base}">Continue to Mahalaxmi Solar Service</a></p>
  </body>
</html>
`,
);

console.log(`[pages] Static site ready in ${out} (base ${base}).`);
