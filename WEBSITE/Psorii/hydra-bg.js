const hydra = new Hydra({
    canvas: document.getElementById('hydra-canvas'),
    detectAudio: false,
    enableStreamCapture: false,
    autoLoop: true,
    makeGlobal: true
  });
  
  const hydraCanvas = document.getElementById('hydra-canvas');
  hydraCanvas.style.backgroundColor = 'black';
  hydraCanvas.style.position = 'fixed';
  hydraCanvas.style.top = '0';
  hydraCanvas.style.left = '0';
  hydraCanvas.style.width = '100vw';
  hydraCanvas.style.height = '100vh';
  hydraCanvas.style.zIndex = '-1';
  hydraCanvas.style.opacity = '1';
  hydraCanvas.style.transition = 'opacity 0.5s ease';
  
  function resizeHydra() {
    hydra.setResolution(window.innerWidth, window.innerHeight);
  }
  resizeHydra();
  window.addEventListener('resize', resizeHydra);
  
  let mouseX = 0.5;
  let mouseY = 0.5;
  let activityLevel = 1;
  
  // 把要偵測的元素列出來
  const hoverTargets = [
    document.querySelector('h1 a'), // title
    ...document.querySelectorAll('nav ul li a') // nav links
  ];
  
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX / window.innerWidth;
    mouseY = e.clientY / window.innerHeight;
  
    const cursorX = e.clientX;
    const cursorY = e.clientY;
  
    let minDist = Infinity;
  
    // 計算滑鼠距離所有目標元素的最小距離
    hoverTargets.forEach(el => {
      const rect = el.getBoundingClientRect();
      const dx = Math.max(rect.left - cursorX, cursorX - rect.right, 0);
      const dy = Math.max(rect.top - cursorY, cursorY - rect.bottom, 0);
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < minDist) minDist = dist;
    });
  
    const maxDist = 20; // 在這個距離內開始收斂
    activityLevel = Math.min(1, minDist / maxDist);
  });
  
  voronoi(8, 1)
    .mult(
      osc(10, 0.1, () => Math.sin(time) * 3)
        .saturate(3)
        .kaleid(200)
    )
    .modulate(o0, 0.5)
    .add(o0, 0.8)
    .scrollX(() => (mouseX - 0.75) * 0.015 * activityLevel)
    .scrollY(() => (mouseY - 0.75) * 0.015 * activityLevel)
    .scale(() => 0.99 + mouseX * 0.01 * activityLevel)
    .modulate(voronoi(8,1), 0.008 * activityLevel)
    .luma(0.3)
    .out();
  
  speed = 0.2
  
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      hydra.stop();
    } else {
      hydra.start();
    }
  });
  