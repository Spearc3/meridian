import{a as e,i as t,r as n,t as r}from"./index-zKnVAbez.js";import{S as i,_ as a,f as o,h as s,l as c,p as l,r as u,s as d,t as f,v as p,x as m,y as h}from"./three.module-BCF_izlg.js";var g=e(t(),1),_=n();function v(){let e=(0,g.useRef)(null);return(0,g.useEffect)(()=>{let t=e.current;if(!t)return;let n=window.matchMedia(`(prefers-reduced-motion: reduce)`).matches,g=new p,_=new l(-.5,.5,.5,-.5,0,1),v=window.matchMedia(`(pointer: coarse)`).matches,y=new f({antialias:!1});y.setPixelRatio(Math.min(window.devicePixelRatio,v?1.5:2)),y.outputColorSpace=a,t.appendChild(y.domElement);let b=new m().load(r);b.colorSpace=a,b.wrapS=o,b.wrapT=o,b.minFilter=d;let x={uTime:{value:0},uTexture:{value:b},uUvScale:{value:new i(1,1)},uUvOffset:{value:new i(0,0)}},S=new c(new s(1,1),new h({uniforms:x,vertexShader:`
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
        `}));g.add(S);let C=()=>{let{clientWidth:e,clientHeight:r}=t;y.setSize(e,r),y.domElement.style.width=`100%`,y.domElement.style.height=`100%`,y.domElement.style.display=`block`;let i=b.image;if(n&&requestAnimationFrame(()=>y.render(g,_)),i?.width){let t=i.width/i.height,n=e/r;if(n>t){let e=t/n;x.uUvScale.value.set(1,e),x.uUvOffset.value.set(0,(1-e)/2)}else{let e=n/t;x.uUvScale.value.set(e,1),x.uUvOffset.value.set((1-e)/2,0)}}};C();let w=window.setInterval(()=>{b.image?.width&&(C(),window.clearInterval(w))},60),T=new ResizeObserver(C);T.observe(t);let E=new u,D=0,O=!0,k=()=>{if(!O){D=0;return}x.uTime.value=n?0:E.getElapsedTime(),y.render(g,_),D=n?0:requestAnimationFrame(k)},A=new IntersectionObserver(([e])=>{O=e.isIntersecting,O&&!D&&k()});return A.observe(t),k(),()=>{cancelAnimationFrame(D),A.disconnect(),window.clearInterval(w),T.disconnect(),b.dispose(),y.dispose(),t.removeChild(y.domElement)}},[]),(0,_.jsx)(`div`,{ref:e,className:`h-full w-full`})}export{v as default};