import path from "node:path";
import fs from "node:fs";

function getSubModules(module: string) {
    const moduleDir = path.join(__dirname, "node_modules", module);
    const subModuleDirs = fs.readdirSync(moduleDir).filter(file =>
        fs.statSync(path.join(moduleDir, file)).isDirectory()
    )
    return subModuleDirs.map(subModule => module + "/" + subModule)
}

const packageJson = require('./package.json');
export const rollupExternal = [
    ...Object.keys(packageJson.dependencies),
    ...getSubModules("@antv"),
    ...getSubModules("primevue"),
    "primeflex/primeflex.css",
    "primeicons/primeicons.css"
];