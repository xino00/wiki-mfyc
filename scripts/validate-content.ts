import { readdir, readFile } from "node:fs/promises";
import { topicFrontmatter } from "../lib/content";
const files=(await readdir("content/topics")).filter(x=>x.endsWith(".json")); let errors=0;
for(const file of files){try{topicFrontmatter.parse(JSON.parse(await readFile(`content/topics/${file}`,"utf8"))); console.log(`✓ ${file}`)}catch(error){errors++; console.error(`✗ ${file}`,error)}}
if(!files.length){console.error("No se encontró contenido estructurado"); process.exit(1)} if(errors)process.exit(1);
