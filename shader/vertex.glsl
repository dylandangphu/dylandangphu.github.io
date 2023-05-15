uniform float time;
uniform vec3 color;
varying vec2 uVu;
varying vec3 vPosition;
varying vec3 vNormal;
varying vec2 vScreenSpace;
uniform vec2 pixels;

float PI = 3.141592653589793238;

void main(){
  uVu = uv;
  vPosition = position;
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4( position, 1.0);
  vScreenSpace = gl_Position.xy/gl_Position.w;
}