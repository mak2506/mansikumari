const heroImages = [
  'img/hero_ai_3d_sphere.png',
  'img/hero_abstract_code_wave.png'
];

const heroOverlay = document.querySelector('.overlay-image');
const heroFeatured3d = document.getElementById('heroFeatured3d');
let imgIndex = 0;

function rotateHeroBackground() {
  const nextImg = heroImages[imgIndex];

  if (heroOverlay) {
    heroOverlay.style.opacity = '0.05';
    setTimeout(() => {
      heroOverlay.style.backgroundImage = `url(${nextImg})`;
      heroOverlay.style.opacity = '0.35';
    }, 500);
  }

  if (heroFeatured3d) {
    heroFeatured3d.style.opacity = '0.2';
    setTimeout(() => {
      heroFeatured3d.src = nextImg;
      heroFeatured3d.style.opacity = '1';
    }, 500);
  }

  imgIndex = (imgIndex + 1) % heroImages.length;
}

if (heroOverlay || heroFeatured3d) {
  rotateHeroBackground();
  setInterval(rotateHeroBackground, 8000);
}
