import path from "node:path";
import fs from "node:fs";

export function getAllSubModules(module: string) {
    const moduleDir = path.join(__dirname, "node_modules", module);
    const subModuleDirs = fs.readdirSync(moduleDir).filter(file =>
        fs.statSync(path.join(moduleDir, file)).isDirectory()
    )
    return subModuleDirs.map(subModule => module + "/" + subModule)
}