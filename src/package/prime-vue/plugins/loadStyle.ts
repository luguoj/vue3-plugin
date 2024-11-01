import {definePreset, usePreset} from "@primevue/themes";

export function loadStyle() {
    import("@primevue/themes/lara").then(lara => {
        usePreset(definePreset(lara.default, {
            semantic: {
                primary: {
                    50: '{sky.50}',
                    100: '{sky.100}',
                    200: '{sky.200}',
                    300: '{sky.300}',
                    400: '{sky.400}',
                    500: '{sky.500}',
                    600: '{sky.600}',
                    700: '{sky.700}',
                    800: '{sky.800}',
                    900: '{sky.900}',
                    950: '{sky.950}'
                }
            }
        }))
        import("./loadThemePatch").then(({loaded}) => loaded)
    })
    import("./loadPrimeStyles").then(({loaded}) => loaded)
}
