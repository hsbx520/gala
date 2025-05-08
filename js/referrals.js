export function initReferrals() {
    // Tombstone: Previous referral logic consolidated here
    
    const walletInput = document.querySelector('.solana-wallet-input');
    const inviteLinkInput = document.querySelector('.invite-link');
    const generateLinkBtn = document.querySelector('.generate-link-btn');
    const copyLinkBtn = document.querySelector('.copy-link-btn');

    generateLinkBtn.addEventListener('click', () => {
        const walletAddress = walletInput.value.trim();
        const inviteLink = generateInviteLink(walletAddress);
        
        if (inviteLink) {
            inviteLinkInput.value = inviteLink;
            setupCopyLinkButton(copyLinkBtn, inviteLink);
        }
    });

    // Check for referral on page load
    checkReferralParam();
}

function validateSolanaAddress(address) {
    const solanaAddressRegex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
    return solanaAddressRegex.test(address);
}

function generateShortInviteCode(walletAddress) {
    let hash = 0;
    for (let i = 0; i < walletAddress.length; i++) {
        const char = walletAddress.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return Math.abs(hash).toString(36).substring(0, 6).toUpperCase();
}

function generateInviteLink(walletAddress) {
    if (!validateSolanaAddress(walletAddress)) {
        showErrorToast('Invalid Solana wallet address');
        return null;
    }

    const inviteCode = generateShortInviteCode(walletAddress);
    return `${window.location.origin}${window.location.pathname}?ref=${inviteCode}`;
}

function setupCopyLinkButton(copyLinkBtn, inviteLink) {
    copyLinkBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(inviteLink).then(() => {
            copyLinkBtn.textContent = 'Copied!';
            setTimeout(() => {
                copyLinkBtn.textContent = 'Copy Link';
            }, 2000);
        });
    });
}

function showErrorToast(message) {
    const errorToast = document.createElement('div');
    errorToast.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background-color: #E0173F;
        color: white;
        padding: 15px 30px;
        border-radius: 10px;
        z-index: 1000;
        text-align: center;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    `;
    errorToast.textContent = message;

    document.body.appendChild(errorToast);

    setTimeout(() => {
        document.body.removeChild(errorToast);
    }, 3000);
}

function checkReferralParam() {
    const urlParams = new URLSearchParams(window.location.search);
    const referralCode = urlParams.get('ref');

    if (referralCode) {
        const referralToast = document.createElement('div');
        referralToast.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: #1A2C5B;
            color: white;
            padding: 15px 30px;
            border-radius: 10px;
            z-index: 1000;
            text-align: center;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        `;
        referralToast.textContent = `You were referred by ${referralCode}`;

        document.body.appendChild(referralToast);

        setTimeout(() => {
            document.body.removeChild(referralToast);
        }, 3000);
    }
}