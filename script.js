/**
 * Two People, One Wavelength
 * Interactive, clean, mobile-first JavaScript.
 */

(function () {
  'use strict';

  // --- Configuration & State ---
  const state = {
    dodgeAttempts: 0,
    maxDodges: 4,
    dodgeActive: true,
    isMobile: window.matchMedia('(pointer: coarse)').matches,
    prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
  };

  const dodgePhrases = [
    "Wait, really? 👀",
    "One tiny reconsideration?",
    "The plot could be interesting.",
    "Okay, that's a bold choice.",
    "Fair enough! You can click now 😊"
  ];

  // --- DOM Elements ---
  const heroCta = document.getElementById('hero-cta');
  const crownToggleBtn = document.getElementById('crown-toggle-btn');
  const toastEl = document.getElementById('toast');

  // Invitation elements
  const invitationZone = document.getElementById('invitation-zone');
  const btnYes = document.getElementById('btn-yes');
  const btnNo = document.getElementById('btn-no');
  const dodgeTooltip = document.getElementById('dodge-tooltip');
  const invitationHint = document.getElementById('invitation-hint');

  // Modals
  const successModal = document.getElementById('success-modal');
  const gentleModal = document.getElementById('gentle-modal');
  const btnCopySummary = document.getElementById('btn-copy-summary');
  const btnReplay = document.getElementById('btn-replay-adventure');
  const btnBackToCats = document.getElementById('btn-back-to-cats');

  // Confetti Canvas
  const confettiCanvas = document.getElementById('confetti-canvas');
  let confettiCtx = confettiCanvas ? confettiCanvas.getContext('2d') : null;
  let confettiAnimationId = null;
  let confettiParticles = [];

  // --- Initialize ---
  function init() {
    setupPlayfulNoButton();
    setupModals();
    setupEasterEggs();
    setupImageFallbacks();
    setupGlobalClickSparkleEffect();
    window.addEventListener('resize', handleResize);
  }

  // --- Toast Notification Helper ---
  let toastTimer = null;
  function showToast(message, duration = 2800) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('show');
    }, duration);
  }

  // --- Global Click Sparkle Effect ---
  function setupGlobalClickSparkleEffect() {
    if (state.prefersReducedMotion) return;
    document.addEventListener('pointerdown', (e) => {
      // Don't spawn over interactive buttons or modals
      if (e.target.closest('button') || e.target.closest('a') || e.target.closest('.modal-card')) {
        return;
      }
      const sparkles = ['✨', '✦', '🌸', '💫'];
      const randomSparkle = sparkles[Math.floor(Math.random() * sparkles.length)];
      spawnFloatingSparkle(e.clientX, e.clientY, randomSparkle);
    });
  }

  function spawnFloatingSparkle(x, y, char = '✨') {
    if (state.prefersReducedMotion) return;
    const floater = document.createElement('div');
    floater.className = 'floating-sparkle-particle';
    floater.textContent = char;
    floater.style.left = `${x}px`;
    floater.style.top = `${y}px`;
    document.body.appendChild(floater);

    setTimeout(() => {
      if (floater.parentNode) {
        floater.parentNode.removeChild(floater);
      }
    }, 1000);
  }

  // --- Playful No Button Logic ---
  function setupPlayfulNoButton() {
    if (!btnNo || !invitationZone) return;

    // Desktop hover & proximity
    btnNo.addEventListener('mouseenter', () => {
      if (state.dodgeActive && state.dodgeAttempts < state.maxDodges) {
        handleDodgeAttempt();
      }
    });

    // Mobile touch
    btnNo.addEventListener('touchstart', (e) => {
      if (state.dodgeActive && state.dodgeAttempts < state.maxDodges) {
        e.preventDefault();
        handleDodgeAttempt();
      }
    }, { passive: false });

    // Click handler for No
    btnNo.addEventListener('click', (e) => {
      if (state.dodgeActive && state.dodgeAttempts < state.maxDodges) {
        e.preventDefault();
        handleDodgeAttempt();
        return;
      }
      openGentleModal();
    });

    // Keyboard support: when user tabs to "No", do not run away so it's accessible!
    btnNo.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openGentleModal();
      }
    });

    // Click handler for Yes
    if (btnYes) {
      btnYes.addEventListener('click', () => {
        openSuccessModal();
      });
    }
  }

  function handleDodgeAttempt() {
    state.dodgeAttempts++;

    // 1. Move No button within safe invitationZone boundaries
    dodgeNoButton();

    // 2. Grow Yes button slightly, but capped so it never blocks No
    growYesButton();

    // 3. Show playful tooltip text
    showDodgeTooltip();

    // 4. If max dodges reached, stop dodging and allow normal click
    if (state.dodgeAttempts >= state.maxDodges) {
      state.dodgeActive = false;
      resetNoButtonPosition();
      if (dodgeTooltip) {
        dodgeTooltip.textContent = "Fair enough! 😊";
        dodgeTooltip.classList.add('show');
      }
      if (invitationHint) {
        invitationHint.textContent = "Fair enough! You can click No if you truly want to 😊";
        invitationHint.style.color = "var(--text-primary)";
        invitationHint.style.fontWeight = "600";
      }
    }
  }

  function dodgeNoButton() {
    const zoneRect = invitationZone.getBoundingClientRect();
    const btnRect = btnNo.getBoundingClientRect();

    // Safe boundaries inside invitationZone
    const padding = 16;
    const maxX = (zoneRect.width / 2) - (btnRect.width / 2) - padding;
    const maxY = (zoneRect.height / 2) - (btnRect.height / 2) - padding;

    let randomX = (Math.random() * 2 - 1) * Math.max(maxX, 40);
    let randomY = (Math.random() * 2 - 1) * Math.max(maxY, 20);

    randomX = Math.max(-maxX, Math.min(maxX, randomX));
    randomY = Math.max(-maxY, Math.min(maxY, randomY));

    btnNo.style.transform = `translate(${randomX}px, ${randomY}px)`;
  }

  function resetNoButtonPosition() {
    btnNo.style.transform = 'translate(0, 0)';
  }

  function growYesButton() {
    if (!btnYes) return;
    // Scale starts at 1.0, increases by 0.07 per dodge, capped at 1.28
    const scale = Math.min(1.28, 1 + state.dodgeAttempts * 0.07);
    btnYes.style.transform = `scale(${scale})`;
  }

  function showDodgeTooltip() {
    if (!dodgeTooltip || !btnNo) return;
    const phraseIndex = Math.min(state.dodgeAttempts - 1, dodgePhrases.length - 1);
    dodgeTooltip.textContent = dodgePhrases[phraseIndex];
    dodgeTooltip.classList.add('show');

    const btnRect = btnNo.getBoundingClientRect();
    const zoneRect = invitationZone.getBoundingClientRect();

    const topOffset = (btnRect.top - zoneRect.top) - 34;
    const leftOffset = (btnRect.left - zoneRect.left) + (btnRect.width / 2);

    dodgeTooltip.style.top = `${topOffset}px`;
    dodgeTooltip.style.left = `${leftOffset}px`;
    dodgeTooltip.style.transform = `translateX(-50%)`;

    setTimeout(() => {
      if (state.dodgeActive) {
        dodgeTooltip.classList.remove('show');
      }
    }, 1800);
  }

  // --- Modals (Success & Gentle No) ---
  function setupModals() {
    // Copy confirmation in success modal
    if (btnCopySummary) {
      btnCopySummary.addEventListener('click', () => {
        const textToCopy = "Date unlocked: Approved by mutual good vibes! ✨ Looking forward to our hangout.";
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(textToCopy).then(() => {
            showToast("Copied confirmation text! 📋");
          }).catch(() => {
            showToast("Date officially unlocked! ✨");
          });
        } else {
          showToast("Date officially unlocked! ✨");
        }
      });
    }

    // Replay adventure
    if (btnReplay) {
      btnReplay.addEventListener('click', () => {
        closeModals();
        resetInvitation();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        showToast("Adventure replayed! ✨");
      });
    }

    // Back to website from Gentle No
    if (btnBackToCats) {
      btnBackToCats.addEventListener('click', () => {
        closeModals();
        resetInvitation();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Close modals on overlay click or Escape
    [successModal, gentleModal].forEach((modal) => {
      if (!modal) return;
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModals();
        }
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModals();
      }
    });
  }

  function openSuccessModal() {
    if (!successModal) return;
    successModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    startConfetti();
  }

  function openGentleModal() {
    if (!gentleModal) return;
    gentleModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModals() {
    if (successModal) successModal.classList.remove('active');
    if (gentleModal) gentleModal.classList.remove('active');
    document.body.style.overflow = '';
    stopConfetti();
  }

  function resetInvitation() {
    state.dodgeAttempts = 0;
    state.dodgeActive = true;
    resetNoButtonPosition();
    if (btnYes) btnYes.style.transform = 'scale(1)';
    if (dodgeTooltip) dodgeTooltip.classList.remove('show');
    if (invitationHint) {
      invitationHint.textContent = "No pressure, genuinely. But the option is on the table.";
      invitationHint.style.color = "var(--text-muted)";
      invitationHint.style.fontWeight = "normal";
    }
  }

  // --- Confetti Animation ---
  function startConfetti() {
    if (state.prefersReducedMotion || !confettiCanvas || !confettiCtx) return;

    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;

    const colors = ['#E26D82', '#8B7EC8', '#E5A62D', '#4FA882', '#FCEBEF', '#FEF7DE'];
    confettiParticles = [];

    const particleCount = state.isMobile ? 45 : 75;
    for (let i = 0; i < particleCount; i++) {
      confettiParticles.push({
        x: Math.random() * confettiCanvas.width,
        y: Math.random() * -confettiCanvas.height,
        size: Math.random() * 8 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: Math.random() * 2.8 + 2,
        speedX: (Math.random() - 0.5) * 2,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 5,
        isSparkle: Math.random() > 0.7
      });
    }

    renderConfetti();
  }

  function renderConfetti() {
    if (!confettiCtx || !confettiCanvas) return;
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    let activeCount = 0;
    for (let p of confettiParticles) {
      p.y += p.speedY;
      p.x += p.speedX;
      p.rotation += p.rotationSpeed;

      if (p.y < confettiCanvas.height) {
        activeCount++;
      }

      confettiCtx.save();
      confettiCtx.translate(p.x, p.y);
      confettiCtx.rotate((p.rotation * Math.PI) / 180);

      if (p.isSparkle) {
        confettiCtx.fillStyle = p.color;
        confettiCtx.font = `${p.size + 4}px sans-serif`;
        confettiCtx.fillText('✨', -p.size / 2, p.size / 2);
      } else {
        confettiCtx.fillStyle = p.color;
        confettiCtx.beginPath();
        confettiCtx.roundRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6, 3);
        confettiCtx.fill();
      }

      confettiCtx.restore();
    }

    if (activeCount > 0) {
      confettiAnimationId = requestAnimationFrame(renderConfetti);
    } else {
      stopConfetti();
    }
  }

  function stopConfetti() {
    if (confettiAnimationId) {
      cancelAnimationFrame(confettiAnimationId);
      confettiAnimationId = null;
    }
    if (confettiCtx && confettiCanvas) {
      confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    }
    confettiParticles = [];
  }

  // --- Easter Eggs ---
  function setupEasterEggs() {
    // Princess Day Royal Nod
    if (crownToggleBtn) {
      crownToggleBtn.addEventListener('click', () => {
        showToast("Official royal status acknowledged for the day 👑✨");
        spawnFloatingSparkle(window.innerWidth / 2, window.innerHeight / 2, '👑');
      });
    }
  }

  // --- Image Fallback Placeholder ---
  function setupImageFallbacks() {
    const images = document.querySelectorAll('img');
    images.forEach((img) => {
      img.addEventListener('error', () => {
        img.style.display = 'none';
        const parent = img.parentElement;
        if (parent && !parent.querySelector('.image-fallback-box')) {
          const fallback = document.createElement('div');
          fallback.className = 'image-fallback-box';
          fallback.style.cssText = `
            width: 100%;
            height: 100%;
            min-height: 180px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: #F6F1EC;
            color: #8A827D;
            font-size: 0.88rem;
            font-weight: 600;
            gap: 6px;
            padding: 18px;
            text-align: center;
          `;
          fallback.innerHTML = `
            <span style="font-size: 2rem;">✨</span>
            <span>[Good vibes loading]</span>
          `;
          parent.appendChild(fallback);
        }
      });
    });
  }

  function handleResize() {
    if (confettiCanvas && confettiAnimationId) {
      confettiCanvas.width = window.innerWidth;
      confettiCanvas.height = window.innerHeight;
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
