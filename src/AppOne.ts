import * as BABYLON from 'babylonjs'
export class AppOne {
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


const createScene = function (engine: BABYLON.Engine, canvas: HTMLCanvasElement) {
    // this is the default code from the playground:

    // This creates a basic Babylon Scene object (non-mesh)
    const scene = new BABYLON.Scene(engine);

    // create a camera
    const camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 0, -10), scene);
    // add controller to camera
    camera.attachControl(canvas, true);

    // create a light
    const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(0, 1, 0), scene);

    // create a box
    const box = BABYLON.MeshBuilder.CreateBox('box', {
        size: 1,
    }, scene);

    // create a sphere
    const sphere = BABYLON.MeshBuilder.CreateSphere('sphere', {
        segments: 32,
        diameter: 1,
    }, scene);
    sphere.position = new BABYLON.Vector3(2, 0, 0);

    // create a plane
    const plane = BABYLON.MeshBuilder.CreatePlane('plane', {}, scene);
    plane.position = new BABYLON.Vector3(-2, 0, 0);
    plane.rotation = new BABYLON.Vector3(45, 0, 0);

    // create a line
    const points = [
        new BABYLON.Vector3(3, 0, 0),
        new BABYLON.Vector3(3, 1, 1),
        new BABYLON.Vector3(3, 1, 0),
    ];
    const lines = BABYLON.MeshBuilder.CreateLines('lines', {
        points
    }, scene);

    return scene;
};