/**
 * @author PSR
 */
declare namespace AMap {
    namespace GLCustomLayer {
        export interface Options extends TileLayer.Options {
            zIndex?: number;
            opacity?: number;
            visible?: boolean;
            zooms?: [number, number];
            init: GLCustomInitFunc;
            render: GLCustomRenderFunc;
        }

        export type GLCustomInitFunc = (gl: WebGLRenderingContext) => void;
        export type GLCustomRenderFunc = (
            gl: WebGLRenderingContext,
            frameState: any,
            viewState: any,
            context: any
        ) => void;
    }

    /**
     * gl自定义图层
     */
    class GLCustomLayer extends TileLayer {
        constructor(options?: GLCustomLayer.Options);

        destroy(): void
    }
}
