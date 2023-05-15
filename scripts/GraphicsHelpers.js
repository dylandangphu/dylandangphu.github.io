import * as THREE from 'three';
import GLOW_VERTEX_SHADER from '../shader/glowVertex.glsl'
import GLOW_FRAGMENT_SHADER from '../shader/glowFragment.glsl'


export const fov = 50;
export const aspectRatio = screen.width / screen.height;
export const nearF = 0.1;
export const farF = 1000;
export const camera = new THREE.PerspectiveCamera(fov, aspectRatio, nearF, farF);
export const frame = document.querySelector('#containerFrame');
export const canvas = document.querySelector('#bg');
export const context = canvas.getContext('webgl2');


const planetProto = {
  sphere: function(size) {
    const sphere = new THREE.SphereGeometry(size, 32, 32);
    
    return sphere;
  },
  material: (options) => {
    const material = new THREE.MeshPhongMaterial();
    if (options) {
      for (const property in options) {
        material[property] = options[property];
      } 
    }
    
    return material;
  },
  shaderMaterial: (options) => {
    const material = new THREE.ShaderMaterial();
    if (options) {
      for (const property in options) {
        material[property] = options[property];
      } 
    }
    return material;
  },
  glowMaterial: (intensity, fade, color) => {
    const glowMaterial = new THREE.ShaderMaterial({
      uniforms: { 
        'c': {
          type: 'f',
          value: intensity
        },
        'p': { 
          type: 'f',
          value: fade
        },
        glowColor: { 
          type: 'c',
          value: new THREE.Color(color)
        },
        viewVector: {
          type: 'v3',
          value: camera.position
        }
      },
      vertexShader: GLOW_VERTEX_SHADER,
      fragmentShader: GLOW_FRAGMENT_SHADER,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true
    });
    
    return glowMaterial;
  },
  texture: (material, property, uri) => {
    const textureLoader = new THREE.TextureLoader();
    textureLoader.crossOrigin = true;
    textureLoader.load(
      uri,
      (texture) => {
        material[property] = texture;
        material.needsUpdate = true;
      }
    );
  }
};

const textureLoader = new THREE.TextureLoader();
    textureLoader.crossOrigin = true;

export const createPlanet = (options) => {
  // Create the planet's Surface
  const surfaceGeometry = planetProto.sphere(options.surface.size);
  const surfaceMaterial = planetProto.shaderMaterial(options.surface.material);
  const surface = new THREE.Mesh(surfaceGeometry, surfaceMaterial);
  
  // Create the planet's Atmosphere
  const atmosphereGeometry = planetProto.sphere(options.surface.size + options.atmosphere.size);
  const atmosphereMaterialDefaults = {
    side: THREE.DoubleSide,
    transparent: true
  }
  const atmosphereMaterialOptions = Object.assign(atmosphereMaterialDefaults, options.atmosphere.material);
  const atmosphereMaterial = planetProto.material(atmosphereMaterialOptions);
  const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
  
  // Create the planet's Atmospheric glow
  const atmosphericGlowGeometry = planetProto.sphere(options.surface.size + options.atmosphere.size + options.atmosphere.glow.size);
  const atmosphericGlowMaterial = planetProto.glowMaterial(options.atmosphere.glow.intensity, options.atmosphere.glow.fade, options.atmosphere.glow.color);
  const atmosphericGlow = new THREE.Mesh(atmosphericGlowGeometry, atmosphericGlowMaterial);
  
  // Nest the planet's Surface and Atmosphere into a planet object
  const planet = new THREE.Object3D();
  surface.name = 'surface';
  atmosphere.name = 'atmosphere';
  atmosphericGlow.name = 'atmosphericGlow';
  planet.add(surface);
  planet.add(atmosphere);
  planet.add(atmosphericGlow);

  // Load the Atmosphere's texture
  for (const textureProperty in options.atmosphere.textures) {
    planetProto.texture(
      atmosphereMaterial,
      textureProperty,
      options.atmosphere.textures[textureProperty]
    );
  }
  
  return planet;
};