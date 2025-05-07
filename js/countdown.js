export function initCountdown() {
    const countdownDate = new Date('May 22, 2025 00:00:00').getTime();

    const countdownFunction = setInterval(() => {
        const now = new Date().getTime();
        const timeLeft = countdownDate - now;

        if (timeLeft < 0) {
            clearInterval(countdownFunction);
            handleCountdownExpired();
            return;
        }

        updateCountdownDisplay(timeLeft);
    }, 1000);
}

function calculateTimeRemaining(timeLeft) {
    return {
        days: Math.floor(timeLeft / (1000 * 60 * 60 * 24)),
        hours: Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((timeLeft % (1000 * 60)) / 1000)
    };
}

function updateCountdownDisplay(timeLeft) {
    const { days, hours, minutes, seconds } = calculateTimeRemaining(timeLeft);

    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

function handleCountdownExpired() {
    const countdownContainer = document.querySelector('.presale-countdown');
    countdownContainer.innerHTML = '<h2>Presale has started!</h2>';
}