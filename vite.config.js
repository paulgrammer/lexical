/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import path from "path";
import fs from "fs";
import { replaceCodePlugin } from "vite-plugin-replace";
import babel from "@rollup/plugin-babel";

const moduleResolution = [
  {
    find: "shared",
    replacement: path.resolve("./src/shared"),
  },
];

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    "process.env.IS_PREACT": process.env.IS_PREACT,
  },
  plugins: [
    replaceCodePlugin({
      replacements: [
        {
          from: /__DEV__/g,
          to: "true",
        },
      ],
    }),
    babel({
      babelHelpers: "bundled",
      babelrc: false,
      configFile: false,
      exclude: "/**/node_modules/**",
      extensions: ["jsx", "js", "ts", "tsx", "mjs"],
      plugins: ["@babel/plugin-transform-flow-strip-types"],
      presets: ["@babel/preset-react"],
    }),
    react(),
  ],
  resolve: {
    alias: moduleResolution,
  },
  build: {
    outDir: "build",
    rollupOptions: {
      input: {
        main: new URL("./index.html", import.meta.url).pathname,
        split: new URL("./split/index.html", import.meta.url).pathname,
      },
    },
  },
});
