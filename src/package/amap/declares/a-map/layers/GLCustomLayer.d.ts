declare namespace AMap {
    namespace GLCustomLayer {
        interface Options extends TileLayer.Options {
            init: (gl: any) => void
            render: (gl: any, state: any) => void
        }
    }

    /**
     * 卫星图层
     */
    class GLCustomLayer extends TileLayer {
        constructor(options?: GLCustomLayer.Options);

        destroy(): void
    }
}
