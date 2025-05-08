// Refactored modal creation functions

export function initModals() {
    // Tombstone: Previous modal creation logic

    const checkInvitesBtn = document.querySelector('.check-invites-btn');
    const claimAirdropBtn = document.querySelector('.claim-airdrop-btn');

    // Check if buttons exist before adding listeners
    if (checkInvitesBtn) {
        checkInvitesBtn.addEventListener('click', createInviteCountModal);
    }

    if (claimAirdropBtn) {
        claimAirdropBtn.textContent = 'Claim My Airdrop'; // Update button text
        claimAirdropBtn.addEventListener('click', createAirdropClaimModal);
    }
}

function createInviteCountModal() {
    // Updated message content slightly for clarity
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
    modal.classList.add('site-modal-overlay'); // Add a class for potential external CSS
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(11, 12, 61, 0.9); /* Keep dark overlay */
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    `;

    const modalContent = document.createElement('div');
    // Applying styles consistent with the website's dark theme
    modalContent.classList.add('site-modal-content'); // Add a class
    modalContent.style.cssText = `
        background-color: #1A2C5B; /* Dark blue background from sections */
        color: #D3D3D3; /* Light grey text color */
        padding: 30px;
        border-radius: 20px;
        text-align: center;
        max-width: 500px;
        width: 90%;
        border: 2px solid #E0173F; /* Red border from sections */
        box-shadow: 0 8px 16px rgba(0,0,0,0.5); /* Add some shadow */
    `;

    // Create elements for title, message, and button
    const titleElement = document.createElement('h2');
    titleElement.textContent = title;
    // Applying styles consistent with the website's titles/accents
    titleElement.style.cssText = `
        font-weight: bold;
        color: #FFD700; /* Gold color for titles */
        font-size: 24px;
        margin-bottom: 20px;
        text-transform: uppercase; /* Consistent with other titles */
        font-family: 'Montserrat', sans-serif; /* Consistent font */
    `;

    const messageElement = document.createElement('p');
    messageElement.innerHTML = message; // Use innerHTML to allow <br>
    // Applying styles consistent with the website's text
    messageElement.style.cssText = `
        font-weight: normal; /* Regular font weight */
        color: #D3D3D3; /* Light grey color */
        font-size: 16px;
        line-height: 1.6;
        margin-bottom: 20px; /* Add margin before the button */
        font-family: 'Open Sans', sans-serif; /* Consistent font */
    `;

    const closeBtn = document.createElement('button');
    closeBtn.classList.add('site-modal-close-btn'); // Add a class
    closeBtn.textContent = 'CLOSE';
    closeBtn.style.cssText = `
        background-color: #E0173F; /* Red background, consistent with other buttons */
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 10px;
        margin-top: 0; /* Remove margin from button itself, spacing is handled by p margin-bottom */
        cursor: pointer;
        font-weight: bold;
        text-transform: uppercase; /* Consistent with other buttons */
        transition: background-color 0.3s ease;
    `;
     closeBtn.addEventListener('mouseenter', (e) => {
        e.target.style.backgroundColor = '#C0122E'; // Darker red on hover
    });
     closeBtn.addEventListener('mouseleave', (e) => {
        e.target.style.backgroundColor = '#E0173F'; // Original red
    });


    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    // Append elements to modal content
    modalContent.appendChild(titleElement);
    modalContent.appendChild(messageElement);
    modalContent.appendChild(closeBtn);


    modal.appendChild(modalContent);
    return modal;
}