export function spCode() {
    return `
      let audio = input();
      let pointerDown = input();
      
      
      setMaxIterations(5);
      let s = getSpace();
      let r = getRayDirection();
      
      let n1 = noise(r * .84 +vec3(0, audio, vec3(0, audio, audio))*.5 );
      let n = noise(s*0.05 + vec3(0, 0, 0) + n1);
      
      metal(n*.5+.5);
      shine(n*.5+.5); 
      
      color(normal * .1 + vec3(2.7, 1.8, 1));
      color(normal * .1 + vec3(3, 1, 2.5));
      displace(mouse.x * 2, mouse.y * 2, 0);
      boxFrame(vec3(10), abs(n) * .1 + 3.04 );
      mixGeo(pointerDown);
      sphere(n * .5 + .8);
    `;
  }