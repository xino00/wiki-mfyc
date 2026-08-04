import {describe,expect,it} from "vitest";
import {existsSync,readFileSync} from "node:fs";
describe("compatibilidad de URLs",()=>{for(const path of ["cardio/index.html","urgencias/index.html","infecciosas/index.html"]){it(`conserva /${path}`,()=>expect(existsSync(path)).toBe(true));}it("mantiene búsqueda local degradada",()=>expect(readFileSync("app.js","utf8")).toContain("applySimpleSearch"));});
