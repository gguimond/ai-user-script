import { build } from 'esbuild';
//import externalGlobalPluginPackage from 'esbuild-plugin-external-global';

// Needed because the plugin is a CommonJS module.
//const { externalGlobalPlugin } = externalGlobalPluginPackage;

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
// @require      https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest
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
        //external: ['@tensorflow/tfjs'],
        treeShaking: true,
       /* plugins: [
            // This is needed to avoid embedding the entirety of TensorFlowJS in the script,
            // because it's instead provided by the @require declaration in the UserScript header.
            externalGlobalPlugin({
                '@tensorflow/tfjs': 'window.tf'
            })
        ]*/
      }).catch(() => process.exit(1));
    console.log(`Built ${entry} -> ${outfile}`);
})
