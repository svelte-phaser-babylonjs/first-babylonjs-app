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

    light.intensity = 0.5;
    light.groundColor = new BABYLON.Color3(0, 0, 1);

    return light;
}

const createSun = function (scene: BABYLON.Scene) {
    const sunMat = new BABYLON.StandardMaterial('sun-mat', scene);
    // emissive is as if the color has light
    sunMat.emissiveTexture = new BABYLON.Texture('assets/images/sun.jpg', scene);
    sunMat.diffuseColor = BABYLON.Color3.Black();
    sunMat.specularColor = BABYLON.Color3.Black();

    const sun = BABYLON.MeshBuilder.CreateSphere('sun', { segments: 16, diameter: 4 }, scene);
    sun.material = sunMat;

    // add a light source to the sun itself
    const sunLight = new BABYLON.PointLight('sun-light', BABYLON.Vector3.Zero(), scene);
    sunLight.intensity = 2;

    return sun;
}

const createPlanets = function (scene: BABYLON.Scene) {
    // planet material
    const planetMat = new BABYLON.StandardMaterial('planet-mat', scene);
    planetMat.diffuseTexture = new BABYLON.Texture('assets/images/sand.png', scene);
    planetMat.specularColor = BABYLON.Color3.Black();

    const speeds = [0.01, -0.01, 0.02];

    for (let i = 0; i < 3; ++i) {
        const planet = BABYLON.MeshBuilder.CreateSphere(`planet-${i}`, { segments: 16, diameter: 1 }, scene);
        planet.material = planetMat;

        planet.position.x = (2 * i) + 4;

        const orbit = {
            radius: planet.position.x,
            speed: speeds[i],
            angle: 0,
        };

        // animations
        scene.registerBeforeRender(() => {
            planet.position.x = orbit.radius * Math.sin(orbit.angle);
            planet.position.z = orbit.radius * Math.cos(orbit.angle);
            orbit.angle += orbit.speed;
        });
    }
}

const createSkyBox = function (scene: BABYLON.Scene) {
    const skybox = BABYLON.MeshBuilder.CreateBox('skybox', { size: 1000 }, scene);

    const skyboxMat = new BABYLON.StandardMaterial('skybox-mat', scene);
    skyboxMat.backFaceCulling = false;
    // remove reflection in skybox
    skyboxMat.specularColor = BABYLON.Color3.Black();
    skyboxMat.diffuseColor = BABYLON.Color3.Black();

    // texture the 6 side of the box
    skyboxMat.reflectionTexture = new BABYLON.CubeTexture('assets/images/skybox/skybox', scene);
    skyboxMat.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;

    // move the skybox with camera
    skybox.infiniteDistance = true;

    skybox.material = skyboxMat;

    return skybox;
}

const createScene = function (engine: BABYLON.Engine, canvas: HTMLCanvasElement) {
    // This creates a basic Babylon Scene object (non-mesh)
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = BABYLON.Color4.FromColor3(BABYLON.Color3.Black());

    const camera = createCamera(scene);
    camera.attachControl(canvas);

    // create and config the light
    createLight(scene);

    // create the sun
    createSun(scene);

    // create first planet
    createPlanets(scene);

    // create skybox
    createSkyBox(scene);

    return scene;
};