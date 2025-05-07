// Refactored modal creation functions

export function initModals() {
    // Tombstone: Previous modal creation logic

    const checkInvitesBtn = document.querySelector('.check-invites-btn');
    const claimAirdropBtn = document.querySelector('.claim-airdrop-btn');

    checkInvitesBtn.addEventListener('click', createInviteCountModal);

    claimAirdropBtn.textContent = 'Claim My Airdrop'; // Update button text
    claimAirdropBtn.addEventListener('click', createAirdropClaimModal);
}

function createInviteCountModal() {
    const modal = createBaseModal(
        'Invite Count Unavailable',
        'Your successful invite count will be revealed on May 22nd when the event officially opens.<br>Please stay tuned and keep inviting friends until then!'
    );
    document.body.appendChild(modal);
}

function createAirdropClaimModal() {
    const modal = createBaseModal(
        'Airdrop Claim',
        '$TRUMPGALA tokens will be available for claiming on May 22nd. Stay tuned!'
    );
    document.body.appendChild(modal);
}

function createBaseModal(title, message) {
    const modal = document.createElement('div');
    modal.classList.add('invite-count-modal');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(11, 12, 61, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;

    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background-color: #1A2C5B;
        color: white;
        padding: 30px;
        border-radius: 20px;
        text-align: center;
        max-width: 500px;
        width: 90%;
    `;

    modalContent.innerHTML = `
        <h2>${title}</h2>
        <p>${message}</p>
        <button class="modal-close-btn">CLOSE</button>
    `;

    const closeBtn = modalContent.querySelector('.modal-close-btn');
    closeBtn.style.cssText = `
        background-color: #E0173F;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 10px;
        margin-top: 20px;
        cursor: pointer;
        font-weight: bold;
    `;

    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    modal.appendChild(modalContent);
    return modal;
}