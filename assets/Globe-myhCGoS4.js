import{a as e,i as t,n,r}from"./index-CIJTqx6J.js";import{C as i,S as a,_ as o,a as s,b as c,c as l,d as ee,g as te,i as u,l as d,m as ne,n as re,o as f,r as ie,t as ae,u as p,v as oe,x as se,y as ce}from"./three.module-BCF_izlg.js";var m=e(t(),1),le=`/meridian/assets/earth_atmos_2048-d1pdJ3jg.jpg`,ue=`/meridian/assets/earth_normal_2048-BD2vMuPH.jpg`,de=`/meridian/assets/earth_specular_2048-6aAFN27D.jpg`,fe=`/meridian/assets/earth_atmos_1024-CEWob4XO.jpg`,pe=`/meridian/assets/earth_normal_1024-CYLTuU97.jpg`,me=`/meridian/assets/earth_specular_1024-DEnDx2Ap.jpg`,he=`/meridian/assets/earth_clouds_1024-Drs1B1Zj.png`,h=r(),g={"New York":[40.71,-74.01],"Los Angeles":[34.05,-118.24],Chicago:[41.88,-87.63],Houston:[29.76,-95.37],Miami:[25.76,-80.19],Toronto:[43.65,-79.38],Vancouver:[49.28,-123.12],Montreal:[45.5,-73.57],Calgary:[51.05,-114.07],Singapore:[1.35,103.82],Thailand:[13.76,100.5],Malaysia:[3.14,101.69],China:[39.9,116.41],Japan:[35.68,139.69],India:[28.61,77.21],UAE:[25.2,55.27],Qatar:[25.29,51.53],"Saudi Arabia":[24.71,46.68],Oman:[23.59,58.41],Bahrain:[26.23,50.59],Kuwait:[29.38,47.99],"United Kingdom":[51.51,-.13],France:[48.86,2.35],Germany:[52.52,13.4],Italy:[41.9,12.5],Netherlands:[52.37,4.9],Switzerland:[47.38,8.54],Sydney:[-33.87,151.21],Melbourne:[-37.81,144.96],Brisbane:[-27.47,153.03],Auckland:[-36.85,174.76],"South Africa":[-26.2,28.05],Kenya:[-1.29,36.82],Morocco:[34.02,-6.84],Egypt:[30.04,31.24]},_=[{name:`Colombo`,region:`Sri Lanka — our desk`,lat:6.93,lon:79.86},...n.flatMap(e=>e.places.filter(e=>e in g).map(t=>({name:t,region:e.name,lat:g[t][0],lon:g[t][1]})))],v=1.6;function ge(e,t,n){let r=(90-e)*(Math.PI/180),a=(t+180)*(Math.PI/180);return new i(-n*Math.sin(r)*Math.cos(a),n*Math.cos(r),n*Math.sin(r)*Math.sin(a))}function y(){let e=(0,m.useRef)(null),[t,n]=(0,m.useState)(null);return(0,m.useEffect)(()=>{let t=e.current;if(!t)return;let r=new oe,m=new ne(40,1,.1,100);m.position.z=5.4;let h=window.matchMedia(`(pointer: coarse)`).matches,g=Math.min(window.devicePixelRatio,h?1.5:2),y=new ae({antialias:!0,alpha:!0});y.setPixelRatio(g),y.toneMapping=0,y.outputColorSpace=o,t.appendChild(y.domElement);let b=new f;b.rotation.x=.35,b.rotation.y=-1.1,r.add(b);let x=new f;x.rotation.z=23.4*Math.PI/180,b.add(x);let S=t.clientWidth*g<=640,C=new se,w=C.load(S?fe:le);w.colorSpace=o;let T=C.load(he);T.colorSpace=o;let E=C.load(S?me:de),D={uTime:{value:0},uOceanMask:{value:E}},O=new ee({map:w,normalMap:C.load(S?pe:ue),normalScale:new a(.85,.85),specularMap:E,specular:new u(`#16303f`),shininess:55});O.onBeforeCompile=e=>{e.uniforms.uTime=D.uTime,e.uniforms.uOceanMask=D.uOceanMask,e.fragmentShader=e.fragmentShader.replace(`void main() {`,`
          uniform float uTime;
          uniform sampler2D uOceanMask;

          float swell(vec2 uv, float time) {
            float a = sin(uv.x * 90.0 + time * 0.6);
            float b = sin(uv.y * 64.0 - time * 0.45);
            float c = sin((uv.x + uv.y) * 48.0 + time * 0.33);
            return (a * b + c) * 0.5;
          }

          void main() {
          `).replace(`#include <map_fragment>`,`
          #include <map_fragment>
          float ocean = texture2D(uOceanMask, vMapUv).r;
          float wave = swell(vMapUv, uTime);
          vec3 oceanShallow = vec3(0.129, 0.420, 0.729);
          vec3 oceanDeep = vec3(0.031, 0.169, 0.451);
          // Land is dark in the Blue Marble map; lift it so it holds up against
          // the lightened sea.
          diffuseColor.rgb *= mix(1.35, 1.0, ocean);
          vec3 water = mix(oceanDeep, oceanShallow, 0.5 + wave * 0.11);
          diffuseColor.rgb = mix(diffuseColor.rgb, water, ocean * 0.8);
          `)};let _e=new d(new c(v,96,96),O);x.add(_e);let k=new d(new c(v*1.012,96,96),new ee({map:T,transparent:!0,opacity:.42,depthWrite:!1}));x.add(k);let A=new s(16774368,2.3);A.position.set(-1.6,1.1,4.2),r.add(A),r.add(new re(7180456,.6));let j=new s(8373976,.45);j.position.set(3,-1,-2.5),r.add(j);let ve=new d(new c(v*1.16,64,64),new ce({transparent:!0,side:1,blending:2,depthWrite:!1,uniforms:{uColor:{value:new u(`#6fc4e0`)},uSun:{value:A.position.clone().normalize()}},vertexShader:`
          varying vec3 vNormal;
          varying vec3 vWorldNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vWorldNormal = normalize(mat3(modelMatrix) * normal);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,fragmentShader:`
          uniform vec3 uColor;
          uniform vec3 uSun;
          varying vec3 vNormal;
          varying vec3 vWorldNormal;
          void main() {
            float rim = pow(0.68 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.2);
            // Scatter concentrates on the lit limb, as it does from orbit.
            float lit = clamp(dot(vWorldNormal, uSun) * 0.5 + 0.62, 0.0, 1.0);
            gl_FragColor = vec4(uColor, 1.0) * rim * lit * 1.5;
          }
        `}));b.add(ve);let M=new f;x.add(M);let ye=new c(.028,16,16),N=new u(`#ffd79a`);_.forEach((e,t)=>{let n=ge(e.lat,e.lon,v*1.015),r=new d(ye,new p({color:N}));r.position.copy(n),r.userData={index:t},M.add(r);let i=new d(new c(.055,16,16),new p({color:N,transparent:!0,opacity:.22,depthWrite:!1}));i.position.copy(n),i.userData={halo:!0,phase:t*.7},M.add(i)});let be=new te,P=new a,F=!1,I=!1,L=!1,R=0,z=0,B=.0016,V=0,H=-1/0,U=1,W=()=>{H=performance.now()},G=e=>{let t=y.domElement.getBoundingClientRect();P.x=(e.clientX-t.left)/t.width*2-1,P.y=-((e.clientY-t.top)/t.height)*2+1,F=!0,I=!0,W(),L&&(B=(e.clientX-R)*35e-5,V=(e.clientY-z)*35e-5,b.rotation.y+=(e.clientX-R)*.005,b.rotation.x=l.clamp(b.rotation.x+(e.clientY-z)*.005,-.9,.9),R=e.clientX,z=e.clientY)},K=e=>{W(),L=!0,R=e.clientX,z=e.clientY,y.domElement.setPointerCapture(e.pointerId)},q=()=>{W(),L=!1},J=()=>{F=!1,n(null)};y.domElement.addEventListener(`pointermove`,G),y.domElement.addEventListener(`pointerdown`,K),y.domElement.addEventListener(`pointerup`,q),y.domElement.addEventListener(`pointerleave`,J);let Y=()=>{let e=t.clientWidth;y.setSize(e,e,!1),y.domElement.style.width=`100%`,y.domElement.style.height=`100%`,m.aspect=1,m.updateProjectionMatrix()};Y();let X=new ResizeObserver(Y);X.observe(t);let xe=new ie,Z=0,Q=!0,Se=new IntersectionObserver(([e])=>{Q=e.isIntersecting,Q&&!Z&&(Z=requestAnimationFrame($))});Se.observe(t);let $=()=>{if(!Q){Z=0;return}Z=requestAnimationFrame($);let e=xe.getElapsedTime(),t=performance.now()-H>5e3;if(U+=(+!!t-U)*(t?.02:.12),L||(B+=(.0016*U-B)*(t?.02:.08),V*=.94,b.rotation.y+=B,b.rotation.x=l.clamp(b.rotation.x+V,-.9,.9)),D.uTime.value=e,k.rotation.y+=4e-4*U,M.children.forEach(t=>{if(t.userData.halo){let n=1+Math.sin(e*1.6+t.userData.phase)*.35;t.scale.setScalar(n)}}),F&&I&&!L){I=!1,be.setFromCamera(P,m);let e=be.intersectObjects(M.children.filter(e=>!e.userData.halo),!1).filter(e=>e.object.getWorldPosition(new i).z>0),t=e.length>0?_[e[0].object.userData.index]:null;n(e=>e?.name===t?.name?e:t),y.domElement.style.cursor=e.length?`pointer`:`grab`}y.render(r,m)};return $(),()=>{cancelAnimationFrame(Z),Se.disconnect(),X.disconnect(),y.domElement.removeEventListener(`pointermove`,G),y.domElement.removeEventListener(`pointerdown`,K),y.domElement.removeEventListener(`pointerup`,q),y.domElement.removeEventListener(`pointerleave`,J),y.dispose(),t.removeChild(y.domElement)}},[]),(0,h.jsxs)(`div`,{className:`relative h-full w-full`,children:[(0,h.jsx)(`div`,{ref:e,className:`h-full w-full cursor-grab`}),t&&(0,h.jsxs)(`div`,{className:`pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 border border-primary/50 bg-abyss/80 px-4 py-2 text-center backdrop-blur`,children:[(0,h.jsx)(`p`,{className:`text-display text-xl text-primary`,children:t.name}),(0,h.jsx)(`p`,{className:`text-[10px] uppercase tracking-[0.24em] text-muted-foreground`,children:t.region})]})]})}export{y as default,_ as globePoints};