import {PsrAMapTypes} from "../../../../types/PsrAMapTypes.ts"

type THREE162 = typeof import("three162")
export class ThreeJsContext {
    amap: AMap.Map
    viewMode: "3D" | "2D"
    customCoords: () => AMap.Map.CustomCoords
    onReadyHandler: PsrAMapTypes.ThreeJsLayer.OnReadyHandler
    THREE: THREE162

    protected constructor(amap: AMap.Map, THREE: THREE162, onReady: PsrAMapTypes.ThreeJsLayer.OnReadyHandler) {
        this.amap = amap
        this.viewMode = amap.getView().type
        this.customCoords = () => {
            amap.customCoords.setCenter([0, 0])
            return amap.customCoords
        };
        this.onReadyHandler = onReady
        this.THREE = THREE
    }

    renderContext?: PsrAMapTypes.ThreeJsLayer.RenderContext


    init(gl: WebGLRenderingContext) {
        const THREE = this.THREE
        const renderer = new THREE.WebGLRenderer({
            context: gl
        })         // 自动清空画布这里必须设置为 false，否则地图底图将无法显示
        renderer.autoClear = false;
        const camera = this.viewMode === "3D" ? new THREE.PerspectiveCamera() : new THREE.OrthographicCamera()
        const aLight = new THREE.AmbientLight(0xffffff, 0.3)
        const dLight = new THREE.DirectionalLight(0xffffff, 1)
        dLight.position.set(1000, -100, 900)
        const scene = new THREE.Scene()
        scene.add(aLight, dLight)
        this.renderContext = {
            renderer,
            camera,
            scene,
        }
        this.onReadyHandler({
            amap: this.amap,
            customCoords: this.customCoords,
            render: () => this.amap.render(),
            renderContext: this.renderContext,
            THREE
        })
    }

    render() {
        const THREE = this.THREE
        if (this.renderContext) {
            const {renderer, camera, scene} = this.renderContext
            // 这里必须执行！！重新设置 three 的 gl 上下文状态。
            renderer.resetState();
            // 重新设置图层的渲染中心点，将模型等物体的渲染中心点重置
            // 否则和 LOCA 可视化等多个图层能力使用的时候会出现物体位置偏移的问题
            if (camera instanceof THREE.PerspectiveCamera) {
                const {
                    near,
                    far,
                    fov,
                    up,
                    lookAt,
                    position
                } = this.customCoords().getCameraParams();
                camera.near = near;
                camera.far = far;
                camera.fov = fov;
                camera.position.set(...position);
                camera.up.set(...up);
                camera.lookAt(...lookAt);
                camera.aspect = this.amap.getSize().getWidth() / this.amap.getSize().getHeight();
                camera.updateProjectionMatrix();
            } else {
                // 2D 地图下使用的正交相机
                const {
                    near, far, top, bottom, left, right, position, rotation
                } = this.customCoords().getCameraParams();
                camera.near = near;
                camera.far = far;
                camera.top = top;
                camera.bottom = bottom;
                camera.left = left;
                camera.right = right;
                camera.position.set(...position);
                camera.rotateZ(rotation)
                camera.updateProjectionMatrix();
            }
            renderer.render(scene, camera)
            // 这里必须执行！！重新设置 three 的 gl 上下文状态。
            renderer.resetState();
        }
    }

    static create(
        {
            amap,
            THREE,
            onReady
        }: {
            amap: AMap.Map,
            THREE: THREE162
            onReady: PsrAMapTypes.ThreeJsLayer.OnReadyHandler
        }
    ) {
        return new ThreeJsContext(amap, THREE, onReady)
    }
}