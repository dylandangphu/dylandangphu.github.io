uniform float time;
uniform vec3 color;
uniform float progress;
uniform sampler2D texture1;
uniform vec4 resolution;
varying vec2 vScreenSpace;
varying vec3 vNormal;
varying vec2 vUv;
varying vec3 vPosition;
float PI = 3.141592653589793238;

// NOISE
float mod289(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
vec4 perm(vec4 x){return mod289(((x * 34.0) + 1.0) * x);}


float noise( in vec3 p){
    vec3 a = floor(p);
    vec3 d = p - a;
    d = d * d * (3.0 - 2.0 * d);

    vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
    vec4 k1 = perm(b.xyxy);
    vec4 k2 = perm(k1.xyxy + b.zzww);

    vec4 c = k2 + a.zzzz;
    vec4 k3 = perm(c);
    vec4 k4 = perm(c + 1.0);

    vec4 o1 = fract(k3 * (1.0 / 41.0));
    vec4 o2 = fract(k4 * (1.0 / 41.0));

    vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
    vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);

    return o4.y * d.y + o4.x * (1.0 - d.y);
}

// float noise( in vec3 p) {
//     vec3 i = floor(p);
//     vec3 f = fract(p);

//     vec3 u = f * f * (3.0 - 2.0 * f);

//     return mix(
//         mix(
//             mix(hash(i + vec3(0.0, 0.0, 0.0)), hash(i + vec3(1.0, 0.0, 0.0)), u.x),
//             mix(hash(i + vec3(0.0, 1.0, 0.0)), hash(i + vec3(1.0, 1.0, 0.0)), u.x),
//             u.y
//         ),
//         mix(
//             mix(hash(i + vec3(0.0, 0.0, 1.0)), hash(i + vec3(1.0, 0.0, 1.0)), u.x),
//             mix(hash(i + vec3(0.0, 1.0, 1.0)), hash(i + vec3(1.0, 1.0, 1.0)), u.x),
//             u.y
//         ),
//         u.z
//     );
// }

float rand(float n) {
  return fract(sin(n)* 43758.5453123);
}

float noise(float p) {
  float fl = floor(p);
  float fc = fract(p);
  return mix(rand(fl), rand(fl+1.0), fc);
}

void main() {
  float light = dot(vNormal, normalize(vec3(0.8)))*0.2+0.5;

  float stroke = cos((vScreenSpace.x - vScreenSpace.y));

  float smallnoise = noise(5000.*vec3(vScreenSpace,1.));
  float bignoise = noise(5.*vec3(vScreenSpace,1.));

  stroke += (smallnoise*2. - 1.) + (bignoise*1. - 1.);
  stroke = 1. - smoothstep(1.*light - 0.5, 1.*light, stroke);
  
  vec3 c = mix(vec3(0), color,1.);
  vec3 c2 = mix(vec3(stroke), color,0.8);

  gl_FragColor = vec4(c, 1.0);
  gl_FragColor = vec4(vScreenSpace, 0., 1.);
  gl_FragColor = vec4(vNormal, 1.);
  gl_FragColor = vec4(vec3(light), 1.);
  gl_FragColor = vec4(c2,0.6);

}