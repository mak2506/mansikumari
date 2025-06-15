  const images = [
    '../img/17499637241338tgmfvs9.webp',
    '../img/1749963622957bx6tog4d.webp'
  ];

  const heroSection = document.getElementById('heroSection');
  let indexH = 0;

  function updateBackground() {
    const image = `url(${images[indexH]})`;
    const gradient = `linear-gradient(110deg, #000000, var(--accent-start), var(--accent-end))`;

    heroSection.style.backgroundImage = `${image}, ${gradient}`;
    indexH = (indexH + 1) % images.length;
  }

  // Initial background
  updateBackground();

  // Change every 5 seconds
  setInterval(updateBackground, 5000);
