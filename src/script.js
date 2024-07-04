import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Timer } from "three/addons/misc/Timer.js";
import GUI from "lil-gui";
import gsap from "gsap";

import { Sky } from "three/addons/objects/Sky.js";

/**
 * Base
 */
// Debug
// const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");
/**
 * textures
 */
//Floor
const textureLoader = new THREE.TextureLoader();
const floorAlphaTexture = textureLoader.load("./floor/alpha.webp");
const floorColorTexture = textureLoader.load("./floor/aerial_rocks_02_1k/aerial_rocks_02_diff_1k.webp");
const floorARMTexture = textureLoader.load("./floor/aerial_rocks_02_1k/aerial_rocks_02_arm_1k.webp");
const floorNormalTexture = textureLoader.load("./floor/aerial_rocks_02_1k/aerial_rocks_02_nor_gl_1k.webp");
const floorDisplacementTexture = textureLoader.load("./floor/aerial_rocks_02_1k/aerial_rocks_02_disp_1k.webp");
//Floor-Config
floorColorTexture.colorSpace = THREE.SRGBColorSpace;
floorColorTexture.repeat.set(8, 8);
floorColorTexture.wrapS = THREE.RepeatWrapping;
floorColorTexture.wrapT = THREE.RepeatWrapping;

floorARMTexture.repeat.set(8, 8);
floorARMTexture.wrapS = THREE.RepeatWrapping;
floorARMTexture.wrapT = THREE.RepeatWrapping;

floorNormalTexture.repeat.set(8, 8);
floorNormalTexture.wrapS = THREE.RepeatWrapping;
floorNormalTexture.wrapT = THREE.RepeatWrapping;

floorDisplacementTexture.repeat.set(8, 8);
floorDisplacementTexture.wrapS = THREE.RepeatWrapping;
floorDisplacementTexture.wrapT = THREE.RepeatWrapping;

//Wall
const wallColorTexture = textureLoader.load("./wall/rustic_stone_wall_02_1k/rustic_stone_wall_02_diff_1k.webp");
const wallARMTexture = textureLoader.load("./wall/rustic_stone_wall_02_1k/rustic_stone_wall_02_arm_1k.webp");
const wallNormalTexture = textureLoader.load("./wall/rustic_stone_wall_02_1k/rustic_stone_wall_02_nor_gl_1k.webp");
//Wall-Config
wallColorTexture.colorSpace = THREE.SRGBColorSpace;

//Ceil
const ceilColorTexture = textureLoader.load("./ceil/clay_roof_tiles_1k/clay_roof_tiles_diff_1k.webp");
const ceilARMTexture = textureLoader.load("./ceil/clay_roof_tiles_1k/clay_roof_tiles_arm_1k.webp");
const ceilNormalTexture = textureLoader.load("./ceil/clay_roof_tiles_1k/clay_roof_tiles_nor_gl_1k.webp");
//Ceil-Config
ceilColorTexture.colorSpace = THREE.SRGBColorSpace;
ceilColorTexture.repeat.set(3, 1);
ceilColorTexture.wrapS = THREE.RepeatWrapping;

ceilARMTexture.repeat.set(3, 1);
ceilARMTexture.wrapS = THREE.RepeatWrapping;

ceilNormalTexture.repeat.set(3, 1);
ceilNormalTexture.wrapS = THREE.RepeatWrapping;

//Bushes
const bushColorTexture = textureLoader.load("./bush/forest_leaves_03_1k/forest_leaves_03_diff_1k.webp");
const bushARMTexture = textureLoader.load("./bush/forest_leaves_03_1k/forest_leaves_03_arm_1k.webp");
const bushNormalTexture = textureLoader.load("./bush/forest_leaves_03_1k/forest_leaves_03_nor_gl_1k.webp");

bushColorTexture.colorSpace = THREE.SRGBColorSpace;
bushColorTexture.repeat.set(1, 1);

bushARMTexture.repeat.set(1, 1);

bushNormalTexture.repeat.set(1, 1);

//Graves
const graveARMTexture = textureLoader.load("./grave/plastered_stone_wall_1k/plastered_stone_wall_arm_1k.webp");
const graveNormalTexture = textureLoader.load("./grave/plastered_stone_wall_1k/plastered_stone_wall_nor_gl_1k.webp");
const graveColorTexture = textureLoader.load("./grave/plastered_stone_wall_1k/plastered_stone_wall_diff_1k.webp");

//Door
const doorAlphaTexture = textureLoader.load("./door/alpha.webp");
const doorAOTexture = textureLoader.load("./door/ambientOcclusion.webp");
const doorColorTexture = textureLoader.load("./door/color.webp");
const doorHeightTexture = textureLoader.load("./door/height.webp");
const doorMetalTexture = textureLoader.load("./door/metalness.webp");
const doorNormalTexture = textureLoader.load("./door/normal.webp");
const doorRoughTexture = textureLoader.load("./door/roughness.webp");

doorColorTexture.colorSpace = THREE.SRGBColorSpace;

// Scene
const scene = new THREE.Scene();

/**
 * House
 */
const houseProperties = {
  width: 4,
  height: 2.5,
  depth: 4,
};
//Floor
const meshFloor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20, 100, 100),
  new THREE.MeshStandardMaterial({
    alphaMap: floorAlphaTexture,
    transparent: true,
    map: floorColorTexture,
    aoMap: floorARMTexture,
    roughnessMap: floorARMTexture,
    metalnessMap: floorARMTexture,
    normalMap: floorNormalTexture,
    displacementMap: floorDisplacementTexture,
    displacementScale: 0.6,
    displacementBias: -0.29,
  })
);
meshFloor.rotation.x = -Math.PI * 0.5;
scene.add(meshFloor);

//? House
const groupHouse = new THREE.Group();
scene.add(groupHouse);

//Walls
const meshWalls = new THREE.Mesh(
  new THREE.BoxGeometry(houseProperties.width, houseProperties.height, houseProperties.depth),
  new THREE.MeshStandardMaterial({
    map: wallColorTexture,
    normalMap: wallNormalTexture,
    roughnessMap: wallARMTexture,
    metalnessMap: wallARMTexture,
    aoMap: wallARMTexture,
  })
);
meshWalls.position.y = houseProperties.height / 2;
groupHouse.add(meshWalls);
//Roof
const meshRoof = new THREE.Mesh(
  new THREE.ConeGeometry(3.5, 1.5, 4),
  new THREE.MeshStandardMaterial({
    map: ceilColorTexture,
    normalMap: ceilNormalTexture,
    aoMap: ceilARMTexture,
    metalnessMap: ceilARMTexture,
    roughnessMap: ceilARMTexture,
  })
);
meshRoof.position.y = houseProperties.height + 0.75;
meshRoof.rotation.y = Math.PI * 0.25;
groupHouse.add(meshRoof);
//Door
const meshDoor = new THREE.Mesh(
  new THREE.PlaneGeometry(2.2, 2.2, 50, 50),
  new THREE.MeshStandardMaterial({
    map: doorColorTexture,
    alphaMap: doorAlphaTexture,
    transparent: true,
    aoMap: doorAOTexture,
    roughnessMap: doorRoughTexture,
    metalnessMap: doorMetalTexture,
    normalMap: doorNormalTexture,
    displacementMap: doorHeightTexture,
    displacementScale: 0.15,
    displacementBias: -0.04,
  })
);
meshDoor.position.set(0, 1, 2 + 0.001);
groupHouse.add(meshDoor);
//Bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({
  color: "#ccffcc",
  map: bushColorTexture,
  aoMap: bushARMTexture,
  metalnessMap: bushARMTexture,
  roughnessMap: bushARMTexture,
  normalMap: bushNormalTexture,
});

const meshBush1 = new THREE.Mesh(bushGeometry, bushMaterial);
meshBush1.position.set(0.8, 0.2, 2.2);
meshBush1.scale.setScalar(0.5);
meshBush1.rotation.x = -0.75;

const meshBush2 = new THREE.Mesh(bushGeometry, bushMaterial);
meshBush2.position.set(1.4, 0.1, 2.1);
meshBush2.scale.setScalar(0.25);
meshBush2.rotation.x = -0.75;

const meshBush3 = new THREE.Mesh(bushGeometry, bushMaterial);
meshBush3.position.set(-0.8, 0.1, 2.2);
meshBush3.scale.setScalar(0.4);
meshBush3.rotation.x = -0.75;

const meshBush4 = new THREE.Mesh(bushGeometry, bushMaterial);
meshBush4.position.set(-1, 0.05, 2.6);
meshBush4.scale.setScalar(0.15);
meshBush4.rotation.x = -0.75;

groupHouse.add(meshBush4, meshBush3, meshBush2, meshBush1);

//Graves
const gravesGroup = new THREE.Group();

const materialGraves = new THREE.MeshStandardMaterial({
  map: graveColorTexture,
  aoMap: graveARMTexture,
  metalnessMap: graveARMTexture,
  roughnessMap: graveARMTexture,
  normalMap: graveNormalTexture,
});
const geometryGraves = new THREE.BoxGeometry(0.6, 0.8, 0.2);

for (let i = 0; i < 30; i++) {
  const angle = Math.random() * Math.PI * 2;
  const radius = 4 + Math.random() * 4;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;

  //mesh
  const grave = new THREE.Mesh(geometryGraves, materialGraves);
  grave.position.set(x, Math.random() * 0.4, z);
  grave.rotation.x = (Math.random() - 0.5) * 0.4;
  grave.rotation.y = (Math.random() - 0.5) * 0.4;
  grave.rotation.z = (Math.random() - 0.5) * 0.4;
  //add to group
  gravesGroup.add(grave);
}
scene.add(gravesGroup);

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight("#86cdff", 0.275);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight("#86cdff", 0.8);
directionalLight.position.set(3, 2, -8);
scene.add(directionalLight);

// Point light
const doorLight = new THREE.PointLight("#ff7d46", 0);
doorLight.position.set(0, 2.2, 2.5);
groupHouse.add(doorLight);

//Light hidden
gsap.to(doorLight, { intensity: 7, duration: 3, repeatDelay: 3, repeat: Infinity, ease: "bounce.inOut" });

/**
 * Ghost
 */
const ghost1 = new THREE.PointLight("#8800ff", 6);
const ghost2 = new THREE.PointLight("#ff0088", 6);
const ghost3 = new THREE.PointLight("#ff0000", 6);
scene.add(ghost1, ghost2, ghost3);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 6;
camera.position.y = 3;
camera.position.z = 6;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Mapping
 */

directionalLight.shadow.mapSize.width = 256;
directionalLight.shadow.mapSize.height = 256;
directionalLight.shadow.camera.top = 8;
directionalLight.shadow.camera.bottom = -8;
directionalLight.shadow.camera.right = 8;
directionalLight.shadow.camera.left = -8;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 20;

ghost1.shadow.mapSize.width = 256;
ghost1.shadow.mapSize.height = 256;
ghost1.shadow.camera.far = 10;

ghost2.shadow.mapSize.width = 256;
ghost2.shadow.mapSize.height = 256;
ghost2.shadow.camera.far = 10;

ghost3.shadow.mapSize.width = 256;
ghost3.shadow.mapSize.height = 256;
ghost3.shadow.camera.far = 10;

/**
 * Shadows
 */

//Renderer
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

//cast and receive
directionalLight.castShadow = true;
ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;

meshWalls.castShadow = true;
meshWalls.receiveShadow = true;
meshRoof.castShadow = true;
meshFloor.receiveShadow = true;

gravesGroup.children.forEach((grave) => {
  grave.castShadow = true;
  grave.receiveShadow = true;
});

/**
 * Sky
 */

const sky = new Sky();
sky.scale.setScalar(100);
sky.material.uniforms["turbidity"].value = 10;
sky.material.uniforms["rayleigh"].value = 3;
sky.material.uniforms["mieCoefficient"].value = 0.1;
sky.material.uniforms["mieDirectionalG"].value = 0.95;
sky.material.uniforms["sunPosition"].value.set(0.3, -0.03, -0.95);

scene.add(sky);

/**
 * Fog
 */

scene.fog = new THREE.FogExp2("#0e343f", 0.15);

/**
 * Animate
 */
const timer = new Timer();

const tick = () => {
  // Timer
  timer.update();
  const elapsedTime = timer.getElapsed();

  //Ghost Animation
  const ghost1Angle = elapsedTime * 0.5;
  ghost1.position.x = Math.cos(ghost1Angle) * 5;
  ghost1.position.z = Math.sin(ghost1Angle) * 5;
  ghost1.position.y = (Math.sin(ghost1Angle) * Math.sin(ghost1Angle * 2.34) * Math.sin(ghost1Angle * 3.45) - 0.3) * 3;

  const ghost2Angle = -elapsedTime * 0.38;
  ghost2.position.x = Math.cos(ghost2Angle) * 7;
  ghost2.position.z = Math.sin(ghost2Angle) * 7;
  ghost2.position.y = (Math.sin(ghost2Angle) * Math.sin(ghost2Angle * 2.34) * Math.sin(ghost2Angle * 3.45) - 0.3) * 3;

  const ghost3Angle = -elapsedTime * 0.27;
  ghost3.position.x = Math.cos(ghost3Angle) * 7;
  ghost3.position.z = Math.sin(ghost3Angle) * 4;
  ghost3.position.y = (Math.sin(ghost3Angle) * Math.sin(ghost3Angle * 2.34) * Math.sin(ghost3Angle * 3.45) - 0.3) * 3;

  // Update controls
  if (camera.position.y < 0.5) camera.position.y = 0.5;
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
