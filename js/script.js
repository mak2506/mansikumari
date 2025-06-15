function validateForm() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    alert("Please fill out all fields.");
    return false;
  }

  alert("Message sent! (Simulation)");
  return false; // Prevent actual submission
}


const colorPicker = document.getElementById("colorPicker");

// Load saved custom accent if exists
// const accentColorStart = localStorage.getItem("accentColorStart");
// const accentColorEnd = localStorage.getItem("accentColorEnd");
// if (accentColorStart && accentColorEnd) {
//   document.documentElement.style.setProperty('--accent-start', accentColorStart);
//   document.documentElement.style.setProperty('--accent-end', accentColorEnd);
//   colorPicker.value = savedAccent;
// }

colorPicker.addEventListener("input", () => {
  const color = colorPicker.value;
  document.documentElement.style.setProperty('--accent-start', darkenColor(color));
  document.documentElement.style.setProperty('--accent-end', color);
  const textColor = getSplitComplementaryColors(color);
  console.log(textColor);
  document.documentElement.style.setProperty('--accent-text-end', textColor);
  document.documentElement.style.setProperty('--accent-text-start', darkenColor(textColor));


  // localStorage.setItem("accentColorStart", darkenColor(color));
  // localStorage.setItem("accentColorEnd", color);
});

function darkenColor(hex, percent = 15) {
  // Remove "#" if present
  hex = hex.replace('#', '');

  // Parse the R, G, B components
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  // Decrease each component by the percent
  r = Math.max(0, Math.floor(r * (1 - percent / 100)));
  g = Math.max(0, Math.floor(g * (1 - percent / 100)));
  b = Math.max(0, Math.floor(b * (1 - percent / 100)));

  // Convert back to hex and return
  const toHex = (c) => c.toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

// function hexToHSL(hex) {
//   hex = hex.replace('#', '');
//   let r = parseInt(hex.slice(0, 2), 16) / 255;
//   let g = parseInt(hex.slice(2, 4), 16) / 255;
//   let b = parseInt(hex.slice(4, 6), 16) / 255;

//   let max = Math.max(r, g, b), min = Math.min(r, g, b);
//   let h, s, l = (max + min) / 2;

//   if (max === min) {
//     h = s = 0;
//   } else {
//     let d = max - min;
//     s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
//     switch (max) {
//       case r: h = ((g - b) / d + (g < b ? 6 : 0)); break;
//       case g: h = ((b - r) / d + 2); break;
//       case b: h = ((r - g) / d + 4); break;
//     }
//     h *= 60;
//   }

//   return { h, s: s * 100, l: l * 100 };
// }

// function hslToHex(h, s, l) {
//   s /= 100;
//   l /= 100;

//   let c = (1 - Math.abs(2 * l - 1)) * s;
//   let x = c * (1 - Math.abs((h / 60) % 2 - 1));
//   let m = l - c / 2;

//   let r, g, b;

//   if (h < 60) [r, g, b] = [c, x, 0];
//   else if (h < 120) [r, g, b] = [x, c, 0];
//   else if (h < 180) [r, g, b] = [0, c, x];
//   else if (h < 240) [r, g, b] = [0, x, c];
//   else if (h < 300) [r, g, b] = [x, 0, c];
//   else [r, g, b] = [c, 0, x];

//   const toHex = n => Math.round((n + m) * 255).toString(16).padStart(2, '0');
//   return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
// }

// function getComplementaryColor(hex) {
//   const hsl = hexToHSL(hex);
//   let compHue = (hsl.h + 180) % 360;

//   // Boost saturation and lightness a bit
//   let compSat = Math.min(100, hsl.s + 20);
//   let compLight = hsl.l < 30 ? 50 : hsl.l;

//   return hslToHex(compHue, compSat, compLight);
// }


function hexToHSL(hex) {
  hex = hex.replace('#', '');
  let r = parseInt(hex.substr(0,2),16) / 255;
  let g = parseInt(hex.substr(2,2),16) / 255;
  let b = parseInt(hex.substr(4,2),16) / 255;

  let max = Math.max(r,g,b), min = Math.min(r,g,b);
  let h, s, l = (max + min)/2;

  if(max === min){
    h = s = 0;
  } else {
    let d = max - min;
    s = l > 0.5 ? d / (2-max-min) : d / (max+min);
    switch(max){
      case r: h = (g-b)/d + (g < b ? 6 : 0); break;
      case g: h = (b-r)/d + 2; break;
      case b: h = (r-g)/d + 4; break;
    }
    h *= 60;
  }

  return { h, s: s * 100, l: l * 100 };
}

function hslToHex(h, s, l) {
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s;
  let x = c * (1 - Math.abs((h / 60) % 2 - 1));
  let m = l - c/2;
  let r, g, b;

  if (h < 60) [r,g,b] = [c,x,0];
  else if (h < 120) [r,g,b] = [x,c,0];
  else if (h < 180) [r,g,b] = [0,c,x];
  else if (h < 240) [r,g,b] = [0,x,c];
  else if (h < 300) [r,g,b] = [x,0,c];
  else [r,g,b] = [c,0,x];

  const toHex = (n) => Math.round((n+m)*255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function getSplitComplementaryColors(hex) {
  const hsl = hexToHSL(hex);
  const h1 = (hsl.h + 100) % 360;
  const h2 = (hsl.h + 200) % 360;

  return [
    hslToHex(h1, hsl.s, Math.min(80, hsl.l + 10)),
    hslToHex(h2, hsl.s, Math.min(80, hsl.l + 10))
  ];
}

const text = "Full Stack Developer • Software Engineer • Author • E-commerce Integrations";
  const target = document.getElementById("typed");
  let index = 0;

  function type() {
    if (index < text.length) {
      target.textContent += text.charAt(index);
      index++;
      setTimeout(type, 100); // Typing speed
    }
  }

type();

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const value = bar.getAttribute('data-progress');
        bar.style.width = value + '%';
        observer.unobserve(bar); // Animate only once
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.progress-bar').forEach(bar => {
    observer.observe(bar);
  });

