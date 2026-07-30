import { cp, mkdir, rm } from "node:fs/promises";
import { join } from "node:path";
const modules=["cardio","urgencias","infecciosas","neuro","neumo","digestivo","endocrino","nefro-uro","psiquiatria","hemato-reuma","trauma-derma-orl","guardias"];
await mkdir("public",{recursive:true});
for(const module of modules){await rm(join("public",module),{recursive:true,force:true}); await cp(module,join("public",module),{recursive:true});}
for(const asset of ["app.js","styles.css","favicon.svg"]){await cp(asset,join("public",asset));}
await mkdir("public/legacy",{recursive:true}); await cp("index.html","public/legacy/index.html");
console.log(`Sincronizadas ${modules.length} rutas heredadas y sus recursos.`);
