const images = [
  'img/17499637241338tgmfvs9.webp',
  'img/1749963622957bx6tog4d.webp'
];

const overlayImage = document.querySelector('.overlay-image');
let indexH = 0;

function updateBackground() {
  // Set image and fade in
  overlayImage.style.backgroundImage = `url(${images[indexH]})`;
  overlayImage.style.opacity = 1;

  // Fade out after transition (2 sec later)
  setTimeout(() => {
    overlayImage.style.opacity = 0;
  }, 6500); // matches transition duration

  indexH = (indexH + 1) % images.length;
}

// Initial background
updateBackground();

// Change every 5 seconds
setInterval(updateBackground, 8000);
