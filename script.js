const envelope = document.getElementById("envelopeWrapper");
const mainContent = document.getElementById("mainContent");
const mainIcons = document.querySelectorAll(".icon-card");
const detailSections = document.querySelectorAll(".detail-section");
const backButtons = document.querySelectorAll(".back-button");
const letterPreviewWrapper = document.getElementById("letterPreviewWrapper");
const previewClickText = document.querySelector(".preview-click-text");
const letterOpenImage = document.querySelector(".letter-open-image");
const imageModal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const modalClose = document.getElementById("imageModalClose");
const mainIconsSection = document.querySelector(".main-icons");
const backgroundMusic = document.getElementById("backgroundMusic");

function playBackgroundMusic() {
  if (!backgroundMusic) return;
  backgroundMusic.volume = 0.35;
  backgroundMusic.play().catch((error) => {
    console.warn("Background music playback blocked or unavailable:", error);
  });
}

function createConfetti(){

  const colors = [
    "#ffd700",
    "#ffffff",
    "#ffec8b",
    "#fff8dc",
    "#f5d76e"
  ];

  for(let i = 0; i < 150; i++){

    const confetti = document.createElement("div");

    confetti.classList.add("confetti");

    confetti.style.background =
      colors[Math.floor(Math.random() * colors.length)];

    /* random explosion directions */

    const x = (Math.random() - 0.5) * 1200;
    const y = (Math.random() - 0.5) * 900;

    confetti.style.setProperty("--x", `${x}px`);
    confetti.style.setProperty("--y", `${y}px`);

    /* random sizes */

    confetti.style.width =
      `${6 + Math.random() * 10}px`;

    confetti.style.height =
      `${10 + Math.random() * 14}px`;

    document.body.appendChild(confetti);

    setTimeout(() => {
      confetti.remove();
    }, 2000);
  }
}

envelope.addEventListener("click", () => {
  envelope.classList.add("open");
  playBackgroundMusic();

  setTimeout(() => {
    document.querySelector(".opening-screen").style.display = "none";
    mainContent.style.display = "block";
    initializeCakeCandles();
  }, 1500);
});

mainIcons.forEach((icon) => {
  icon.addEventListener("click", () => {
    const sectionName = icon.dataset.label;
    icon.classList.add("open");

    setTimeout(() => {
      icon.classList.remove("open");
      showSection(sectionName);
    }, 250);
  });
});

if (letterPreviewWrapper) {
  letterPreviewWrapper.addEventListener("click", () => {
    letterPreviewWrapper.classList.add("open");
    showSection("letterOpen");
  });
}

if (previewClickText) {
  previewClickText.addEventListener("click", () => {
    showSection("letterOpen");
  });
}

if (letterOpenImage && imageModal) {
  letterOpenImage.addEventListener("click", () => {
    if (modalImage) {
      modalImage.src = letterOpenImage.src;
    }
    imageModal.classList.add("open");
  });
}

if (modalClose && imageModal) {
  modalClose.addEventListener("click", () => {
    imageModal.classList.remove("open");
  });
}

if (imageModal) {
  imageModal.addEventListener("click", (event) => {
    if (event.target === imageModal) {
      imageModal.classList.remove("open");
    }
  });
}

backButtons.forEach((button) => {
  button.addEventListener("click", () => {
    hideAllSections();
    mainIconsSection.style.display = 'flex';
  });
});

function showSection(name) {
  mainIconsSection.style.display = "none";
  hideAllSections();

  const target = document.getElementById(`${name}Section`);
  if (target) {
    target.style.display = "flex";
  }
}

function hideAllSections() {
  detailSections.forEach((section) => {
    section.style.display = "none";
  });
}

// CAKE CANDLE FUNCTIONALITY
function initializeCakeCandles(){
  const topContainer = document.getElementById("cakeCandlesTop");
  const middleContainer = document.getElementById("cakeCandlesMiddle");
  const bottomContainer = document.getElementById("cakeCandlesBottom");

  if(!topContainer || !middleContainer || !bottomContainer) return;

  function createCandles(container, amount){
    for(let i=0;i<amount;i++){
      const candle = document.createElement("div");
      candle.classList.add("candle");

      const flame = document.createElement("div");
      flame.classList.add("flame");

      candle.appendChild(flame);
      container.appendChild(candle);
    }
  }

  createCandles(topContainer, 5);
  createCandles(middleContainer, 7);
  createCandles(bottomContainer, 9);
}

let blown = false;

function toggleCandles(){

  const flames = document.querySelectorAll(".flame");

  if(!blown){

    flames.forEach(f=>f.classList.add("off"));

    const message = document.getElementById("cakeMessage");
    if (message) {
      message.classList.add("show");
    }

    createCakeConfetti();

    blown = true;

  }else{

    flames.forEach(f=>f.classList.remove("off"));

    document.getElementById("message").classList.remove("show");

    blown = false;
  }
}

/* CAKE CONFETTI FUNCTION */

function createCakeConfetti(){

  const cake =
    document.querySelector(".cake");

  const rect =
    cake.getBoundingClientRect();

  /* cake center position */

  const originX =
    rect.left + rect.width / 2;

  const originY =
    rect.top + rect.height / 2;

  const colors = [
    "#FFD700",
    "#FFFFFF",
    "#FFF0A8",
    "#FFE066",
    "#FFF8DC"
  ];

  for(let i = 0; i < 180; i++){

    const confetti =
      document.createElement("div");

    confetti.classList.add("confetti");

    confetti.style.background =
      colors[Math.floor(Math.random()*colors.length)];

    /* START FROM CAKE */

    confetti.style.left =
      `${originX}px`;

    confetti.style.top =
      `${originY}px`;

    /* random spread */

    const x =
      (Math.random() - 0.5) * 1200;

    const y =
      (Math.random() - 0.5) * 900;

    confetti.style.setProperty(
      "--x",
      `${x}px`
    );

    confetti.style.setProperty(
      "--y",
      `${y}px`
    );

    /* random sizes */

    confetti.style.width =
      `${6 + Math.random()*10}px`;

    confetti.style.height =
      `${10 + Math.random()*16}px`;

    document.body.appendChild(confetti);

    setTimeout(()=>{
      confetti.remove();
    },2000);
  }
}

