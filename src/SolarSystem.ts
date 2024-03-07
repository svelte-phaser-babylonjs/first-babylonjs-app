import * as BABYLON from 'babylonjs'
export class SolarSystem {
    engine: BABYLON.Engine;
    scene: BABYLON.Scene;

    constructor(readonly canvas: HTMLCanvasElement) {
        // create BabylonJS engine with anti-aliasing activated
        this.engine = new BABYLON.Engine(canvas, true)

        window.addEventListener('resize', () => {
            this.engine.resize();
        });

        // create the scene
        this.scene = createScene(this.engine, this.canvas)
    }

    debug(debugOn: boolean = true) {
        if (debugOn) {
            this.scene.debugLayer.show({ overlay: true });
        } else {
            this.scene.debugLayer.hide();
        }
    }

    run() {
        this.debug(true);

        // running render loop
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
    }
}

const createCamera = function (scene: BABYLON.Scene) {
    const camera = new BABYLON.ArcRotateCamera('camera', 0, 0, 15, BABYLON.Vector3.Zero(), scene);

    // limit camera movement
    camera.lowerRadiusLimit = 6;
    camera.upperRadiusLimit = 20;

    return camera;
}

const createLight = function (scene: BABYLON.Scene) {
    const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);
    return light;
}

const createSun = function (scene: BABYLON.Scene) {
    const sun = BABYLON.MeshBuilder.CreateSphere('sun', { segments: 16, diameter: 4 }, scene);

    return sun;
}


const createScene = function (engine: BABYLON.Engine, canvas: HTMLCanvasElement) {
    // this is the default code from the playground:

    // This creates a basic Babylon Scene object (non-mesh)
    const scene = new BABYLON.Scene(engine);

    const camera = createCamera(scene);
    camera.attachControl(canvas);

    createLight(scene);

    // create the sun
    createSun(scene);

    return scene;
};