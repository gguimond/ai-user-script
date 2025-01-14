import { build } from 'esbuild';

const scripts = [
    {
        entry: 'stocktwits-sentiment.user.ts',
        outfile: 'dist/stocktwits-sentiment.user.js',
        banner: `
// ==UserScript==
// @name         Stocktwits sentiment
// @namespace    https://github.com/gguimond
// @version      0.1
// @description  Automatically add sentiment to Stocktwits posts
// @author       guimog
// @match        https://stocktwits.com/*
// @icon         https://cdn-1.webcatalog.io/catalog/stocktwits/stocktwits-icon-filled-256.webp?v=1736139118476
// @grant        none
// ==/UserScript==
`.trim()
    }
];

scripts.forEach(({ entry, outfile, banner }) => {
    build({
        entryPoints: [entry],
        bundle: true,
        outfile: outfile,
        target: 'esnext',
        format: 'iife',
        platform: 'browser',
        banner: { js: banner },
        tsconfig: 'tsconfig.json',
        treeShaking: true,
        loader: {'.png': 'dataurl'}
      }).catch(() => process.exit(1));
    console.log(`Built ${entry} -> ${outfile}`);
})
