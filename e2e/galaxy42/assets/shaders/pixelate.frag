uniform sampler2D tDiffuse;
uniform float pixelSize;
uniform vec2 resolution;
varying vec2 vTextureCoord;

void main(){

  vec2 dxy = pixelSize / resolution;
  vec2 coord = dxy * floor( vTextureCoord / dxy );
  gl_FragColor = texture2D(tDiffuse, coord);

}
