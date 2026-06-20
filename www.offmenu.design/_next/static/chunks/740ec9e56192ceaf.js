(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,82955,e=>{"use strict";var t=e.i(18050),r=e.i(71645);let o=(0,r.forwardRef)(function({opacities:e=[.04,.04,.04,.04,.04,.08,.08,.08,.08,.14],totalSize:o=4,dotSize:n=2,className:i,center:u,color:a="foreground"},l){let f=(0,r.useRef)(null),s=(0,r.useRef)("playing"),c=(0,r.useRef)(0),d=(0,r.useRef)(null),m=(0,r.useRef)(null),_=(0,r.useRef)(null),g=(0,r.useRef)(null),v=(0,r.useRef)(null),h=(0,r.useRef)(null),p=(0,r.useRef)(-1e3),y=(0,r.useRef)([0,0]),R=(0,r.useRef)(0);(0,r.useImperativeHandle)(l,()=>({reveal(e,t){p.current=c.current,y.current=[e,t],R.current=1},hide(){p.current=c.current,R.current=0}}),[]);let S=(0,r.useCallback)(()=>{let e=getComputedStyle(document.documentElement),t="background"===a?"--color-background":"--color-foreground";return function(e){let t=document.createElement("canvas").getContext("2d");if(t){t.fillStyle=e;let r=t.fillStyle;if(r.startsWith("#")){let e=r.slice(1);return[parseInt(e.slice(0,2),16),parseInt(e.slice(2,4),16),parseInt(e.slice(4,6),16)]}let o=r.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);if(o)return[parseInt(o[1]),parseInt(o[2]),parseInt(o[3])]}return[0,0,0]}(e.getPropertyValue(t).trim())},[a]),[w,A]=(0,r.useState)([0,0,0]),[b,E]=(0,r.useState)(!1);(0,r.useEffect)(()=>{let e=()=>{let e=S();A(e),E((.299*e[0]+.587*e[1]+.114*e[2])/255>.5)};e();let t=new MutationObserver(e);t.observe(document.documentElement,{attributes:!0,attributeFilter:["class","data-theme","style"]});let r=window.matchMedia("(prefers-color-scheme: dark)");return r.addEventListener("change",e),()=>{t.disconnect(),r.removeEventListener("change",e)}},[S]);let P=(0,r.useMemo)(()=>b&&"foreground"===a?e.map(e=>.5*e):e,[e,b,a]);(0,r.useEffect)(()=>{let e=h.current;if(!e)return;let t=d.current;if(t){let[r,o,n]=w,i=Array(6).fill([r/255,o/255,n/255]).flat();e.uniform3fv(t,i)}let r=m.current;r&&e.uniform1fv(r,P)},[w,P]);let T=(0,r.useMemo)(()=>({u_colors:{value:Array(6).fill(w).map(([e,t,r])=>[e/255,t/255,r/255]),type:"uniform3fv"},u_opacities:{value:P,type:"uniform1fv"},u_total_size:{value:o,type:"uniform1f"},u_dot_size:{value:n,type:"uniform1f"}}),[w,P,o,n]),C=(0,r.useMemo)(()=>`#version 300 es
precision mediump float;

in vec2 fragCoord;

uniform float u_time;
uniform float u_opacities[10];
uniform vec3 u_colors[6];
uniform float u_total_size;
uniform float u_dot_size;
uniform vec2 u_resolution;
uniform float u_event_time;
uniform vec2 u_event_origin;
uniform float u_revealing;

out vec4 fragColor;

float PHI = 1.61803398874989484820459;
float random(vec2 xy) {
  return fract(tan(distance(xy * PHI, xy) * 0.5) * xy.x);
}

void main() {
  vec2 st = fragCoord.xy;

  ${u?.includes("x")?"st.x -= abs(floor((mod(u_resolution.x, u_total_size) - u_dot_size) * 0.5));":""}
  ${u?.includes("y")?"st.y -= abs(floor((mod(u_resolution.y, u_total_size) - u_dot_size) * 0.5));":""}

  float opacity = step(0.0, st.x);
  opacity *= step(0.0, st.y);

  vec2 st2 = vec2(int(st.x / u_total_size), int(st.y / u_total_size));

  float frequency = 5.0;
  float show_offset = random(st2);
  float rand = random(st2 * floor((u_time / frequency) + show_offset + frequency) + 1.0);
  opacity *= u_opacities[int(rand * 10.0)];
  opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.x / u_total_size));
  opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.y / u_total_size));

  vec3 color = u_colors[int(show_offset * 6.0)];

  // Simple fade in/out
  float event_elapsed = u_time - u_event_time;

  if (u_revealing > 0.5) {
    opacity *= smoothstep(0.0, 0.3, event_elapsed);
  } else {
    opacity *= 1.0 - smoothstep(0.0, 0.3, event_elapsed);
  }

  fragColor = vec4(color, opacity);
  fragColor.rgb *= fragColor.a;
}`,[u]);return(0,r.useEffect)(()=>{let e,t=f.current;if(!t)return;let r=document.createElement("canvas"),o=Math.max(1,Math.min(window.devicePixelRatio??1,2));t.width=r.width=t.offsetWidth*o,t.height=r.height=t.offsetHeight*o;let n=r.getContext("webgl2"),i=t.getContext("2d");if(!n||!i)return;let u=`#version 300 es
precision mediump float;
in vec2 coordinates;
uniform vec2 u_resolution;
out vec2 fragCoord;

void main(void) {
  gl_Position = vec4(coordinates, 0.0, 1.0);
  fragCoord = (coordinates + 1.0) * 0.5 * u_resolution;
  fragCoord.y = u_resolution.y - fragCoord.y;
}`,a=n.createShader(n.VERTEX_SHADER);if(!a)return;if(n.shaderSource(a,u),n.compileShader(a),!n.getShaderParameter(a,n.COMPILE_STATUS))return void console.error("Vertex shader error:",n.getShaderInfoLog(a));let l=n.createShader(n.FRAGMENT_SHADER);if(!l)return;if(n.shaderSource(l,C),n.compileShader(l),!n.getShaderParameter(l,n.COMPILE_STATUS))return void console.error("Fragment shader error:",n.getShaderInfoLog(l));let S=n.createProgram();if(!S)return;if(n.attachShader(S,a),n.attachShader(S,l),n.linkProgram(S),!n.getProgramParameter(S,n.LINK_STATUS))return void console.error("Shader program error:",n.getProgramInfoLog(S));n.useProgram(S);let w=n.createBuffer(),A=new Float32Array([-1,-1,1,-1,-1,1,1,1]);n.bindBuffer(n.ARRAY_BUFFER,w),n.bufferData(n.ARRAY_BUFFER,A,n.STATIC_DRAW);let b=n.getAttribLocation(S,"coordinates");n.enableVertexAttribArray(b),n.vertexAttribPointer(b,2,n.FLOAT,!1,0,0);let E=n.getUniformLocation(S,"u_resolution"),P=n.getUniformLocation(S,"u_time");for(let e in _.current=n.getUniformLocation(S,"u_event_time"),g.current=n.getUniformLocation(S,"u_event_origin"),v.current=n.getUniformLocation(S,"u_revealing"),T){let t=n.getUniformLocation(S,e),r=T[e];switch("u_colors"===e&&(d.current=t,h.current=n),"u_opacities"===e&&(m.current=t),r.type){case"uniform1f":n.uniform1f(t,r.value);break;case"uniform3fv":n.uniform3fv(t,r.value.flat());break;case"uniform1fv":n.uniform1fv(t,r.value)}}n.uniform2f(E,t.width/o,t.height/o),n.uniform1f(_.current,-1e3),n.uniform2f(g.current,0,0),n.uniform1f(v.current,0),n.enable(n.BLEND),n.blendFunc(n.SRC_ALPHA,n.ONE),n.disable(n.DEPTH_TEST);let x=null;e=window.requestAnimationFrame(function o(u){if(!n||!i||!t)return;if("paused"===s.current){e=window.requestAnimationFrame(o);return}let a=u/1e3;null===x&&(x=a),c.current=a-x,n.viewport(0,0,n.canvas.width,n.canvas.height),n.uniform1f(P,c.current),n.uniform1f(_.current,p.current),n.uniform2f(g.current,y.current[0],y.current[1]),n.uniform1f(v.current,R.current),n.clear(n.COLOR_BUFFER_BIT|n.DEPTH_BUFFER_BIT),n.drawArrays(n.TRIANGLE_STRIP,0,4),i.clearRect(0,0,t.width,t.height),i.drawImage(r,0,0),e=window.requestAnimationFrame(o)});let I=new ResizeObserver(()=>{t&&n&&(t.width=r.width=t.offsetWidth*o,t.height=r.height=t.offsetHeight*o,n.uniform2f(E,t.width/o,t.height/o))});return I.observe(t),()=>{window.cancelAnimationFrame(e),I.disconnect(),n.deleteShader(a),n.deleteShader(l),n.deleteProgram(S),n.deleteBuffer(w),h.current=null,d.current=null,m.current=null,_.current=null,g.current=null,v.current=null}},[C,T]),(0,t.jsx)("canvas",{ref:f,className:i,"aria-hidden":!0})});e.s(["default",0,o])},4626,e=>{e.n(e.i(82955))}]);