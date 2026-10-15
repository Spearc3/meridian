import{i as e,n as t,r as n,t as r}from"./index-BohLVjH7.js";import{C as i,E as a,S as o,T as s,_ as c,a as l,d as u,g as d,p as f,t as p,x as m,y as h}from"./three.module-DGZj7gmX.js";var g=e(n(),1),_=t();function v({className:e=``}){let t=(0,g.useRef)(null);return(0,g.useEffect)(()=>{let e=t.current;if(!e)return;let n=window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,g=new o,_=new c(-.5,.5,.5,-.5,0,1),v=window.matchMedia(`(pointer: coarse)`).matches,y=new p({antialias:!v});y.setPixelRatio(Math.min(window.devicePixelRatio,v?1.5:2)),y.domElement.style.opacity=`0`,y.domElement.style.transition=`opacity 0.6s ease`,y.outputColorSpace=m,e.appendChild(y.domElement);let b=new s().load(r,()=>{C(),y.domElement.style.opacity=`1`});b.colorSpace=m,b.wrapS=d,b.wrapT=d,b.minFilter=u;let x={uTime:{value:0},uTexture:{value:b},uUvScale:{value:new a(1,1)},uUvOffset:{value:new a(0,0)}},S=new f(new h(1,1),new i({uniforms:x,vertexShader:`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position.xy * 2.0, 0.0, 1.0);
          }
        `,fragmentShader:`
          uniform float uTime;
          uniform sampler2D uTexture;
          uniform vec2 uUvScale;
          uniform vec2 uUvOffset;
          varying vec2 vUv;

          // The surf line runs upper-left to lower-right, with open water to the
          // upper right — so the swell has to travel shoreward, down and to the
          // left. SHORE is that heading; every wave marches along it.
          const vec2 SHORE = vec2(-0.707, -0.707);
          const float PI = 3.14159265;
          const float TAU = 6.28318531;

          // Long swell, cross swell, and a fine chop. Each is sin(k·(d·uv) - ωt),
          // which propagates along +d; summed, they never visibly repeat.
          float swell(vec2 uv, float t) {
            float travel = dot(SHORE, uv);
            float cross = dot(vec2(-SHORE.y, SHORE.x), uv);

            float a = sin(travel * 9.0 - t * 0.55);
            float b = sin(travel * 15.0 + cross * 4.0 - t * 0.42);
            float c = sin(travel * 24.0 - cross * 6.0 - t * 0.80);
            float d = sin(travel * 38.0 - t * 1.05);
            return a * 0.42 + b * 0.30 + c * 0.18 + d * 0.10;
          }

          void main() {
            vec2 uv = vUv * uUvScale + uUvOffset;

            float wave = swell(vUv, uTime);

            // Distance along the shoreward heading: ~0 at the sand in the lower
            // left, falling to -1.41 out at open water in the upper right.
            float shoreDist = dot(SHORE, vUv);
            // Confine the swash to the beach; the open water keeps its own swell.
            float shoreBand = smoothstep(-1.05, -0.12, shoreDist);

            // Swash cycle: the sea rushes up the sand quickly, then drains back
            // slowly — the asymmetry is what makes it read as surf rather than a
            // sine wave. One full run every 9 seconds.
            //
            // sin^2 is zero in both value AND slope at each end of the cycle, so
            // it wraps seamlessly. The phase warp below skews the peak earlier to
            // get the fast-up/slow-back shape without reintroducing a velocity
            // jump at the reset — the warp is monotonic (1 + 0.6cos > 0) and
            // fixes both endpoints.
            float phase = fract(uTime / 9.0);
            float skewed = phase + 0.6 * sin(PI * phase) / PI;
            float run = sin(PI * skewed);
            float swash = run * run * shoreBand;

            // Sampling at uv - SHORE*k makes the image travel along +SHORE, so the
            // foam edge climbs the sand as k rises and recedes as it falls.
            vec2 displaced = uv
              + SHORE * wave * 0.008
              - SHORE * swash * 0.045;

            vec3 color = texture2D(uTexture, displaced).rgb;

            // Crests catch a touch more light; the sand darkens as the wash wets
            // it and dries again behind the retreating edge.
            color *= 1.0 + wave * 0.04;
            color *= 1.0 - swash * 0.06;

            gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
            #include <colorspace_fragment>
          }
        `}));g.add(S);let C=()=>{let{clientWidth:t,clientHeight:n}=e;y.setSize(t,n),y.domElement.style.width=`100%`,y.domElement.style.height=`100%`,y.domElement.style.display=`block`;let r=b.image;if(r?.width){let e=r.width/r.height,i=t/n;if(i>e){let t=e/i;x.uUvScale.value.set(1,t),x.uUvOffset.value.set(0,(1-t)/2)}else{let t=i/e;x.uUvScale.value.set(t,1),x.uUvOffset.value.set((1-t)/2,0)}}};C();let w=window.setInterval(()=>{b.image?.width&&(C(),window.clearInterval(w))},60),T=new ResizeObserver(C);T.observe(e);let E=new l,D=0,O=!0,k=()=>{if(!O){D=0;return}D=requestAnimationFrame(k),x.uTime.value=n?0:E.getElapsedTime(),y.render(g,_)};k();let A=new IntersectionObserver(([e])=>{O=!!e?.isIntersecting,O&&!D&&(D=requestAnimationFrame(k))});return A.observe(e),()=>{cancelAnimationFrame(D),A.disconnect(),window.clearInterval(w),T.disconnect(),b.dispose(),y.dispose(),e.removeChild(y.domElement)}},[]),(0,_.jsx)(`div`,{ref:t,className:e,"aria-hidden":`true`})}export{v as default};