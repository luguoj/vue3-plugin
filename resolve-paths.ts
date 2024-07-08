import path from "node:path";
import fs from "node:fs";
import {resolve} from "path";

const moduleDir = path.join(__dirname, "src/package");
const subModuleResolvePaths: Record<string, string> [] = fs
    .readdirSync(moduleDir)
    .filter(
        file => fs.statSync(path.join(moduleDir, file)).isDirectory()
    )
    .map(
        file => (
            {
                [`@package/${file}`]: resolve(__dirname, "./src/package", file)
            }
        )
    )
export const resolvePaths: Record<string, string> = subModuleResolvePaths
    .reduce(
        (previousValue,
         currentValue, currentIndex
        ) => (
            {
                ...(previousValue || {}),
                ...currentValue
            }
        )
    )