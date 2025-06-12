// 等待整個頁面加載完成
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // 鼠標跟蹤元素
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorCircle = document.querySelector('.cursor-circle');
    const clickEffectContainer = document.querySelector('.click-effect-container');

    // 鼠標位置變量
    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let circleX = 0, circleY = 0;

    const dotSpeed = 0.95;
    const circleSpeed = 0.9;

    // 鼠標移動事件
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.opacity = '1';
        cursorCircle.style.opacity = '1';
    });

    // 鼠標離開文檔
    document.addEventListener('mouseleave', () => {
        cursorDot.style.opacity = '0';
        cursorCircle.style.opacity = '0';
    });

    // 動畫循環
    function animateCursor() {
        dotX += (mouseX - dotX) * dotSpeed;
        dotY += (mouseY - dotY) * dotSpeed;
        cursorDot.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`;

        circleX += (mouseX - circleX) * circleSpeed;
        circleY += (mouseY - circleY) * circleSpeed;
        cursorCircle.style.transform = `translate(${circleX}px, ${circleY}px) translate(-50%, -50%)`;

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // 可點擊元素交互
    const clickableElements = document.querySelectorAll(
        'a, button, input[type="submit"], input[type="button"], label, .section-content'
    );

    clickableElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('hovering');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('hovering');
        });
    });

    // 點擊效果
    document.addEventListener('mousedown', (e) => {
        const ripple = document.createElement('div');
        ripple.classList.add('click-ripple');
        clickEffectContainer.appendChild(ripple);

        ripple.style.left = `${e.clientX}px`;
        ripple.style.top = `${e.clientY}px`;
        ripple.style.width = `0px`;
        ripple.style.height = `0px`;

        setTimeout(() => {
            ripple.style.width = `20px`;
            ripple.style.height = `20px`;
        }, 0);

        ripple.addEventListener('animationend', () => {
            ripple.remove();
        });
    });

    // 滾動動畫
    const sections = document.querySelectorAll('.section-content');
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});