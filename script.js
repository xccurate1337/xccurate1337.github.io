// Мобильное меню
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        mobileMenuToggle.innerHTML = mobileMenu.classList.contains('active')
            ? '<i class="fas fa-times"></i>'
            : '<i class="fas fa-bars"></i>';
    });

    // Закрытие меню при клике на ссылку
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // Закрытие меню при клике вне его
    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            mobileMenu.classList.remove('active');
            mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });
}

// Плавный скролл для всех якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Закрываем мобильное меню если открыто
            if (mobileMenu && mobileMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                if (mobileMenuToggle) {
                    mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }
            }

            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Определение и обновление текущего брейкпоинта
function getCurrentBreakpoint() {
    const width = window.innerWidth;

    if (width >= 1200) return 'xl';
    if (width >= 992) return 'lg';
    if (width >= 768) return 'md';
    if (width >= 576) return 'sm';
    if (width >= 460) return 'xs';
    if (width >= 414) return 'xxs';
    if (width >= 375) return 'iphone';
    return 'tiny';
}

function updateBreakpointIndicator() {
    const breakpoint = getCurrentBreakpoint();
    console.log(`Текущий брейкпоинт: ${breakpoint} (${window.innerWidth}px)`);

    // Можно добавить логику для разных брейкпоинтов
    switch(breakpoint) {
        case 'xl':
            // Десктоп XL
            break;
        case 'lg':
            // Десктоп
            break;
        case 'md':
            // Планшет
            break;
        case 'sm':
            // Большой телефон
            break;
        case 'xs':
            // Средний телефон
            break;
        case 'xxs':
            // Маленький телефон
            break;
        case 'iphone':
            // iPhone
            break;
        case 'tiny':
            // Очень маленький телефон
            break;
    }
}

// Запускаем при загрузке и изменении размера
window.addEventListener('load', updateBreakpointIndicator);
window.addEventListener('resize', updateBreakpointIndicator);

// Оптимизация для мобильных устройств
if ('ontouchstart' in window || navigator.maxTouchPoints) {
    document.body.classList.add('touch-device');

    // Улучшаем обработку касаний
    document.querySelectorAll('.btn, .filter-btn, .category-item').forEach(el => {
        el.style.webkitTapHighlightColor = 'transparent';
    });
}

// Ленивая загрузка изображений
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');

                if (src) {
                    img.src = src;
                    img.removeAttribute('data-src');
                }

                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px 0px',
        threshold: 0.1
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Предотвращение масштабирования на мобильных (опционально)
document.addEventListener('touchmove', function(e) {
    if (e.scale !== 1) {
        e.preventDefault();
    }
}, { passive: false });