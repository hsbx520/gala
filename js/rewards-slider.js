export function initRewardsSlider() {
    // Tombstone: Previous rewards slider logic
    
    const rewardsSlider = document.querySelector('.invite-rewards-cards');
    const rewardsCards = document.querySelectorAll('.invite-reward-card');
    let currentSlide = 0;

    function autoSlideRewards() {
        currentSlide = (currentSlide + 1) % rewardsCards.length;
        const cardWidth = rewardsCards[0].offsetWidth;
        const gap = parseInt(window.getComputedStyle(rewardsSlider).gap);
        rewardsSlider.style.transform = `translateX(-${(cardWidth + gap) * currentSlide}px)`;
    }

    // Start auto-sliding every 7 seconds
    let autoSlideInterval = setInterval(autoSlideRewards, 7000);

    // Ensure continuous looping
    rewardsSlider.addEventListener('transitionend', () => {
        if (currentSlide === rewardsCards.length) {
            rewardsSlider.style.transition = 'none';
            currentSlide = 0;
            rewardsSlider.style.transform = 'translateX(0)';
            
            // Trigger a reflow
            rewardsSlider.offsetHeight;
            
            // Restore transition
            rewardsSlider.style.transition = 'transform 0.5s ease';
        }
    });

    // Pause auto-sliding on hover
    rewardsSlider.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });

    rewardsSlider.addEventListener('mouseleave', () => {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(autoSlideRewards, 7000);
    });

    // Responsive resize handling
    window.addEventListener('resize', () => {
        const cardWidth = rewardsCards[0].offsetWidth;
        const gap = parseInt(window.getComputedStyle(rewardsSlider).gap);
        rewardsSlider.style.transform = `translateX(-${(cardWidth + gap) * currentSlide}px)`;
    });
}