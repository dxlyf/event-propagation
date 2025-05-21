/// <reference types="vitest" />
import { defineConfig } from 'vite'
import { dts } from "rollup-plugin-dts";
export default defineConfig({
    build:{
      emptyOutDir:true,
      lib:{
          formats:['es','cjs','umd'],
          name:'EventEmitter4',
          entry:'./lib/index.ts',
          fileName: (format, entryName) => `eventemitter4.${format}.js`,
          
      },
      minify:false,
      sourcemap:false,

    },
    test: {
      // ...
    }
  })