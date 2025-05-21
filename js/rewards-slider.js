export function initRewardsSlider() {
    const rewardsSlider = document.querySelector('.invite-rewards-cards');
    const rewardsCards = document.querySelectorAll('.invite-reward-card');
    let currentSlide = 0;

    // Create navigation container
    const navContainer = document.createElement('div');
    navContainer.classList.add('rewards-slider-nav');
    navContainer.innerHTML = `
        <button class="slider-prev-btn">&#10094;</button>
        <button class="slider-next-btn">&#10095;</button>
    `;
    rewardsSlider.parentElement.insertBefore(navContainer, rewardsSlider.nextSibling);

    const prevBtn = navContainer.querySelector('.slider-prev-btn');
    const nextBtn = navContainer.querySelector('.slider-next-btn');

    function updateSlide() {
        const cardWidth = rewardsCards[0].offsetWidth;
        const gap = parseInt(window.getComputedStyle(rewardsSlider).gap);
        rewardsSlider.style.transform = `translateX(-${(cardWidth + gap) * currentSlide}px)`;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % rewardsCards.length;
        updateSlide();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + rewardsCards.length) % rewardsCards.length;
        updateSlide();
    }

    // Auto-sliding logic
    let autoSlideInterval = setInterval(nextSlide, 7000);

    // Navigation button event listeners
    nextBtn.addEventListener('click', () => {
        clearInterval(autoSlideInterval);
        nextSlide();
        autoSlideInterval = setInterval(nextSlide, 7000);
    });

    prevBtn.addEventListener('click', () => {
        clearInterval(autoSlideInterval);
        prevSlide();
        autoSlideInterval = setInterval(nextSlide, 7000);
    });

    // Pause auto-sliding on hover
    rewardsSlider.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    rewardsSlider.addEventListener('mouseleave', () => {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(nextSlide, 7000);
    });

    // Responsive resize handling
    window.addEventListener('resize', updateSlide);
}