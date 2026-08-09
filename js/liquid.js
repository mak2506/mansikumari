/* ==========================================
   REAL-TIME LIQUID WAVE & 3D ATOMIC WORLD ENGINE
   Interactive HTML5 Canvas Simulations
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {
  initBackgroundLiquidWaves();
  init3DAtomicGlobe();
});

/* ------------------------------------------
   1. Multi-Layer Real-Time Liquid Wave Flow
   ------------------------------------------ */
function initBackgroundLiquidWaves() {
  const canvas = document.getElementById("liquidWaveCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width = (canvas.width = canvas.parentElement.clientWidth || window.innerWidth);
  let height = (canvas.height = canvas.parentElement.clientHeight || window.innerHeight);

  window.addEventListener("resize", () => {
    if (!canvas.parentElement) return;
    width = canvas.width = canvas.parentElement.clientWidth || window.innerWidth;
    height = canvas.height = canvas.parentElement.clientHeight || window.innerHeight;
  });

  let mouseX = width / 2;
  let mouseY = height / 2;
  let targetMouseX = mouseX;
  let targetMouseY = mouseY;

  window.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    targetMouseX = e.clientX - rect.left;
    targetMouseY = e.clientY - rect.top;
  });

  const waves = [
    { amplitude: 35, frequency: 0.008, speed: 0.025, phase: 0, opacity: 0.15, offset: 0.45 },
    { amplitude: 25, frequency: 0.012, speed: 0.035, phase: 2, opacity: 0.22, offset: 0.52 },
    { amplitude: 45, frequency: 0.006, speed: 0.018, phase: 4, opacity: 0.18, offset: 0.60 },
    { amplitude: 20, frequency: 0.015, speed: 0.045, phase: 1, opacity: 0.30, offset: 0.68 },
  ];

  function animate() {
    ctx.clearRect(0, 0, width, height);

    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    const accentEnd = getComputedStyle(document.documentElement).getPropertyValue("--accent-end").trim() || "#00f0ff";
    const accentSec = getComputedStyle(document.documentElement).getPropertyValue("--accent-secondary").trim() || "#7000ff";

    waves.forEach((w, index) => {
      w.phase += w.speed;

      ctx.beginPath();
      ctx.moveTo(0, height);

      const basey = height * w.offset;

      for (let x = 0; x <= width; x += 4) {
        const dx = x - mouseX;
        const dist = Math.abs(dx);
        const mouseEffect = Math.max(0, (1 - dist / 350)) * Math.sin((x + mouseX) * 0.02) * 20;

        const y =
          basey +
          Math.sin(x * w.frequency + w.phase) * w.amplitude +
          Math.cos(x * (w.frequency * 0.5) + w.phase * 0.7) * (w.amplitude * 0.5) +
          mouseEffect;

        ctx.lineTo(x, y);
      }

      ctx.lineTo(width, height);
      ctx.closePath();

      const grad = ctx.createLinearGradient(0, basey - 50, width, height);
      if (index % 2 === 0) {
        grad.addColorStop(0, hexToRgba(accentEnd, w.opacity));
        grad.addColorStop(1, hexToRgba(accentSec, w.opacity * 0.3));
      } else {
        grad.addColorStop(0, hexToRgba(accentSec, w.opacity));
        grad.addColorStop(1, hexToRgba(accentEnd, w.opacity * 0.3));
      }

      ctx.fillStyle = grad;
      ctx.fill();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* ------------------------------------------
   2. Frameless 3D Interactive Atomic Tech Globe
   ------------------------------------------ */
function init3DAtomicGlobe() {
  const canvas = document.getElementById("heroAtomCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const size = 420;
  canvas.width = size;
  canvas.height = size;

  const centerX = size / 2;
  const centerY = size / 2;
  const globeRadius = 125;

  let angleY = 0;
  let angleX = 0.2;
  let mouseTiltX = 0;
  let mouseTiltY = 0;

  canvas.parentElement.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    mouseTiltX = nx * 0.5;
    mouseTiltY = ny * 0.5;
  });

  // Generate 3D Globe Grid Nodes
  const globeNodes = [];
  const lats = 10;
  const lons = 18;

  for (let i = 0; i <= lats; i++) {
    const latAngle = (i / lats) * Math.PI - Math.PI / 2;
    const y = Math.sin(latAngle) * globeRadius;
    const ringR = Math.cos(latAngle) * globeRadius;

    for (let j = 0; j < lons; j++) {
      const lonAngle = (j / lons) * Math.PI * 2;
      const x = Math.cos(lonAngle) * ringR;
      const z = Math.sin(lonAngle) * ringR;

      globeNodes.push({ x, y, z, latIndex: i, lonIndex: j });
    }
  }

  // Atomic Orbital Rings Configuration
  const atomicRings = [
    { tiltX: 1.1, tiltZ: 0.4, speed: 0.03, colorShift: 0 },
    { tiltX: -1.1, tiltZ: -0.5, speed: -0.025, colorShift: 1 },
    { tiltX: 0.2, tiltZ: 1.2, speed: 0.035, colorShift: 2 },
  ];

  let time = 0;

  function render3DAtom() {
    ctx.clearRect(0, 0, size, size);
    time += 0.015;

    // Smooth tilt interaction
    angleY += 0.008 + mouseTiltX * 0.02;
    angleX = 0.2 + mouseTiltY * 0.2;

    const accentEnd = getComputedStyle(document.documentElement).getPropertyValue("--accent-end").trim() || "#00f0ff";
    const accentSec = getComputedStyle(document.documentElement).getPropertyValue("--accent-secondary").trim() || "#7000ff";

    // 1. Draw Pulsing Quantum Core / Nucleus
    const pulseR = 24 + Math.sin(time * 3) * 3;
    const coreGrad = ctx.createRadialGradient(centerX, centerY, 2, centerX, centerY, pulseR * 2.2);
    coreGrad.addColorStop(0, "#ffffff");
    coreGrad.addColorStop(0.3, accentEnd);
    coreGrad.addColorStop(0.7, hexToRgba(accentSec, 0.6));
    coreGrad.addColorStop(1, "rgba(0,0,0,0)");

    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.arc(centerX, centerY, pulseR * 2.2, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = accentEnd;
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.arc(centerX, centerY, pulseR * 0.6, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // 2. Project & Draw Rotating 3D Wireframe Tech Globe Grid
    const projected = globeNodes.map((n) => {
      // 3D Y Rotation
      let x1 = n.x * Math.cos(angleY) - n.z * Math.sin(angleY);
      let z1 = n.x * Math.sin(angleY) + n.z * Math.cos(angleY);
      let y1 = n.y;

      // 3D X Rotation
      let y2 = y1 * Math.cos(angleX) - z1 * Math.sin(angleX);
      let z2 = y1 * Math.sin(angleX) + z1 * Math.cos(angleX);
      let x2 = x1;

      const perspective = 400 / (400 + z2);
      return {
        px: centerX + x2 * perspective,
        py: centerY + y2 * perspective,
        pz: z2,
        alpha: Math.max(0.1, (z2 + globeRadius) / (globeRadius * 2)),
      };
    });

    // Draw globe grid dots
    projected.forEach((p) => {
      if (p.pz > -globeRadius * 0.8) {
        ctx.beginPath();
        ctx.arc(p.px, p.py, p.pz > 0 ? 2 : 1.2, 0, Math.PI * 2);
        ctx.fillStyle = p.pz > 0 ? hexToRgba(accentEnd, p.alpha * 0.8) : hexToRgba(accentSec, p.alpha * 0.4);
        ctx.fill();
      }
    });

    // 3. Draw Atomic Orbital Rings & Electrons
    atomicRings.forEach((ring, idx) => {
      const ringRadius = globeRadius * 1.35;
      const ringPoints = 90;
      ctx.beginPath();

      let electronPos = null;

      for (let i = 0; i <= ringPoints; i++) {
        const theta = (i / ringPoints) * Math.PI * 2;
        
        let rx = Math.cos(theta) * ringRadius;
        let ry = Math.sin(theta) * ringRadius;
        let rz = 0;

        // Apply Ring Tilts
        let y1 = ry * Math.cos(ring.tiltX) - rz * Math.sin(ring.tiltX);
        let z1 = ry * Math.sin(ring.tiltX) + rz * Math.cos(ring.tiltX);
        let x1 = rx;

        let x2 = x1 * Math.cos(ring.tiltZ) - y1 * Math.sin(ring.tiltZ);
        let y2 = x1 * Math.sin(ring.tiltZ) + y1 * Math.cos(ring.tiltZ);
        let z2 = z1;

        // Apply Global Globe Rotation
        let x3 = x2 * Math.cos(angleY) - z2 * Math.sin(angleY);
        let z3 = x2 * Math.sin(angleY) + z2 * Math.cos(angleY);
        let y3 = y2;

        const pScale = 400 / (400 + z3);
        const sx = centerX + x3 * pScale;
        const sy = centerY + y3 * pScale;

        if (i === 0) ctx.moveTo(sx, sy);
        else ctx.lineTo(sx, sy);

        // Calculate Electron Position along ring
        const electronProgress = (time * ring.speed * 8 + idx * 2.1) % (Math.PI * 2);
        if (Math.abs(theta - electronProgress) < (Math.PI * 2) / ringPoints) {
          electronPos = { x: sx, y: sy, z: z3 };
        }
      }

      ctx.closePath();
      ctx.strokeStyle = idx % 2 === 0 ? hexToRgba(accentEnd, 0.45) : hexToRgba(accentSec, 0.45);
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Draw Glowing Orbiting Electron
      if (electronPos) {
        ctx.beginPath();
        ctx.arc(electronPos.x, electronPos.y, electronPos.z > 0 ? 6 : 4, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = accentEnd;
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    });

    requestAnimationFrame(render3DAtom);
  }

  render3DAtom();
}

// Utility: convert hex color to rgba string
function hexToRgba(hex, alpha = 1) {
  hex = hex.replace("#", "");
  if (hex.length === 3) {
    hex = hex.split("").map((c) => c + c).join("");
  }
  const r = parseInt(hex.substring(0, 2), 16) || 0;
  const g = parseInt(hex.substring(2, 4), 16) || 0;
  const b = parseInt(hex.substring(4, 6), 16) || 0;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
