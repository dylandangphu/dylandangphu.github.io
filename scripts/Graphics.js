import * as THREE from 'three';
import MY_VERTEX_SHADER from '../shader/vertex.glsl'
import MY_FRAGMENT_SHADER from '../shader/fragment.glsl'
import PLANET_VERTEX_SHADER from '../shader/planetVertex.glsl'
import PLANET_FRAGMENT_SHADER from '../shader/planetFragment.glsl'
import { camera, createPlanet, frame, canvas, context } from './GraphicsHelpers'
import { timeline } from './Animation'

const startCameraPosition = { x: 2.0, y: 0.0, z: 1.0}
const materialColor = 0xE69597;
const lightConfig = { color: 0x42f5a7, intensity: 1, distance: 100, decay: 2, position: { x: 10.0, y: 10.0, z: 10.0 } };
const spotLightConfig = { color: 0xffffff, intensity: 1, distance: 0, angle: 10, penumbra: 2,  position: { x: 2.0, y: 0.8, z: -1.0 } };
const cameraPosition = { x: 0.0, y: 1.0, z: 1.0 }
const stageZPostions = [1.0, 5.0, 12.0, 55.0]
const earthTilt = THREE.MathUtils.degToRad(23.5)

// Setup
const scene = new THREE.Scene();
const textureLoader = new THREE.TextureLoader();
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  context: context
});

// Lighting
const pointLight = new THREE.PointLight( lightConfig.color, lightConfig.intensity, lightConfig.distance, lightConfig.decay );
const ambientLight = new THREE.AmbientLight(lightConfig.color);
const spotLight = new THREE.SpotLight(spotLightConfig.color, spotLightConfig.intensity, spotLightConfig.distance, spotLightConfig.angle, spotLightConfig.penumbra);

// Galaxy
const galaxyGeometry = new THREE.SphereGeometry(100, 32, 32);
const galaxyMaterial = new THREE.MeshBasicMaterial({
  side: THREE.BackSide
});
const galaxy = new THREE.Mesh(galaxyGeometry, galaxyMaterial);

// Earth
const earth = createPlanet({
  surface: {
    size: 1,
    material: {
      uniforms: {
        sunDirection: { value: spotLight.position },
        dayTexture: { value: textureLoader.load( "/earthmap10k.jpg" ) },
        nightTexture: { value: textureLoader.load( "/earthlights10k.jpg" ) }
      },
      vertexShader: PLANET_VERTEX_SHADER,
      fragmentShader: PLANET_FRAGMENT_SHADER,
    },
    textures: {
      bumpMap: '/earthbump10k.jpg',
      specularMap: '/earthspec10k.jpg',
    }
  },
  atmosphere: {
    size: 0.003,
    material: {
      opacity: 0.4,
      color: 0xffffff,
    },
    textures: {
      map: '/earthcloudmap.jpg',
      alphaMap: '/earthcloudmaptrans_.jpg'
    },
    glow: {
      size: 0.003,
      intensity: 0.5,
      fade: 7,
      color: 0x93cfef
    }
  },
});

// Sphere
const sphereGeometry = new THREE.SphereGeometry( 55, 32, 32 ).translate(-34,-8,0);
const sphereMaterial = new THREE.ShaderMaterial({
  extensions: {
    derivatives: "#extension GL_OES_standard_derivatives : enable"
  },
  side: THREE.DoubleSide,
  uniforms: {
    time: {type: 'f', value: 0},
    resolution: { type: 'v4' ,value: new THREE.Vector4() },
    color: { type: 'v4', value: new THREE.Color(materialColor)}
  },
  vertexShader: MY_VERTEX_SHADER,
  fragmentShader: MY_FRAGMENT_SHADER,
})
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

export const renderBackground = async () => {
  renderer.setSize(frame.clientWidth, frame.clientHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  camera.position.set(startCameraPosition.x, startCameraPosition.y, startCameraPosition.z);
  pointLight.position.set(lightConfig.position.x, lightConfig.position.y, lightConfig.position.z);

  scene.remove(galaxy)
  scene.remove(earth)

  scene.add(pointLight, ambientLight);
  scene.add(sphere);
}

export const renderSpace = async () => {
  scene.remove(pointLight, ambientLight, sphere);

  textureLoader.crossOrigin = true;
  await textureLoader.load(
    '/starfield.png',
    (texture) => {
      galaxyMaterial.map = texture;
      scene.add(galaxy);
    }
  );

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(frame.clientWidth, frame.clientHeight);
  earth.rotation.z = earthTilt;
  galaxy.rotation.z = earthTilt;

  camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);

  spotLight.position.set(2.0, 0.8, -1.0);
  scene.add(spotLight);
  scene.add(earth);
}

export const animate = () => {
  requestAnimationFrame(animate);

  earth.getObjectByName('surface').rotation.y += .001;
  earth.getObjectByName('atmosphere').rotation.y += .001;
  galaxy.rotation.y -= .0005;

  camera.position.x = cameraPosition.x;
  camera.position.y = cameraPosition.y;
  camera.position.z = cameraPosition.z;

  sphere.rotation.z += 0.001;

  renderer.render(scene, camera);
}

export const stage = async (n) => {

  timeline.to('#SpaceOverlay',{ duration: 0, opacity:0 })
  await timeline.to(cameraPosition, { duration: 1.5, z: stageZPostions[n]})
  timeline.to('#SpaceOverlay',{ duration: 0.3, opacity:1 })

}

const rerenderCanvas = () => {
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(frame.clientWidth, frame.clientHeight);
  camera.aspect = frame.clientWidth / frame.clientHeight;
  camera.updateProjectionMatrix();
}

window.onresize = () => { rerenderCanvas() };
window.onorientationchange = () => { rerenderCanvas(); }