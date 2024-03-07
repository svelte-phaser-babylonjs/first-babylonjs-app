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

    // This creates and positions a free camera (non-mesh)
    const camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);
    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());
    // add controller to camera
    camera.attachControl(canvas, true);

    // Universal camera
    const camera2 = new BABYLON.UniversalCamera('uni-cam', new BABYLON.Vector3(0, 0, -5), scene);

    // Follow camera
    const camera3 = new BABYLON.FollowCamera('follow-cam', new BABYLON.Vector3(0, 10, -20), scene);
    camera3.radius = 3;

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    const light = new BABYLON.HemisphericLight('hemi-light', new BABYLON.Vector3(0, 1, 0), scene);

    // Point light
    const light2 = new BABYLON.PointLight('point-light', new BABYLON.Vector3(0, 5, 0), scene);

    // Directional Light
    const light3 = new BABYLON.DirectionalLight('directional-light', new BABYLON.Vector3(5, -1, 0), scene);

    // create a box
    const box = BABYLON.MeshBuilder.CreateBox('box', {
        size: 1,
    }, scene);
    box.rotation.x = 5;
    box.rotation.y = 3;

    // make camera3 follow the box
    camera3.lockedTarget = box;

    // create a sphere
    const sphere = BABYLON.MeshBuilder.CreateSphere('sphere', {
        segments: 32,
        diameter: 2,
    }, scene);
    sphere.position = new BABYLON.Vector3(3, 0, 0);
    sphere.scaling = new BABYLON.Vector3(1, 0.7, 1); // sphere is now squished

    // create a plane
    const plane = BABYLON.MeshBuilder.CreatePlane('plane', {}, scene);
    plane.position = new BABYLON.Vector3(-2, 0, 0);
    plane.rotation = new BABYLON.Vector3(45, 0, 0);

    // create a line
    const points = [
        new BABYLON.Vector3(1, 0, 0),
        new BABYLON.Vector3(1, 1, 1),
        new BABYLON.Vector3(1, 1, 0),
    ];
    const lines = BABYLON.MeshBuilder.CreateLines('lines', {
        points
    }, scene);

    // Materials
    const material = new BABYLON.StandardMaterial('material', scene);
    material.diffuseColor = new BABYLON.Color3(1, 0, 1);
    // material.emissiveColor = new BABYLON.Color3(0, 1, 0);

    const material2 = new BABYLON.StandardMaterial('material2', scene);
    material2.diffuseTexture = new BABYLON.Texture('./assets/images/dark_rock.png', scene);

    // using material
    box.material = material;
    sphere.material = material2;

    return scene;
};