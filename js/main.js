(function () {
  'use strict';

  /* ======================
     Mobile Menu
     ====================== */
  const menuBtn = document.querySelector('[data-menu-btn]');
  const menu = document.querySelector('[data-menu]');

  if (menuBtn && menu) {
    function toggleMenu(force) {
      const isOpen = force !== undefined ? force : menuBtn.getAttribute('aria-expanded') === 'false';
      menuBtn.setAttribute('aria-expanded', String(isOpen));
      menu.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    menuBtn.addEventListener('click', function () {
      toggleMenu();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') {
        toggleMenu(false);
        menuBtn.focus();
      }
    });

    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggleMenu(false);
      });
    });
  }

  /* ======================
     Formulario
     ====================== */
  const form = document.getElementById('form-notificacion');
  if (form) {
    const emailInput = document.getElementById('form-email');
    const errorEl = form.querySelector('.form__error');
    const submitBtn = form.querySelector('[data-form-submit]');
    const statusEl = form.querySelector('[data-form-status]');

    function validateEmail(value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    function showError(msg) {
      errorEl.textContent = msg;
      emailInput.classList.toggle('error', !!msg);
      emailInput.classList.remove('valid');
    }

    function showSuccess() {
      showError('');
      emailInput.classList.remove('error');
      emailInput.classList.add('valid');
    }

    emailInput.addEventListener('input', function () {
      const val = emailInput.value.trim();
      if (val === '') {
        showError('');
        return;
      }
      if (validateEmail(val)) {
        showSuccess();
      } else {
        showError('Ingresa un correo válido');
      }
    });

    emailInput.addEventListener('blur', function () {
      const val = emailInput.value.trim();
      if (val !== '' && !validateEmail(val)) {
        showError('Ingresa un correo válido');
      }
    });

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      const email = emailInput.value.trim();

      if (!validateEmail(email)) {
        showError('Ingresa un correo válido');
        emailInput.focus();
        return;
      }

      showError('');
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;
      statusEl.textContent = '';
      statusEl.className = 'form__status';

      try {
        const resp = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: email }),
        });

        if (!resp.ok) throw new Error('Error en el servidor');

        statusEl.textContent = '¡Gracias! Te avisaremos cuando lancemos.';
        statusEl.className = 'form__status success';
        form.reset();
        emailInput.classList.remove('valid');
      } catch (_err) {
        statusEl.textContent = 'Ocurrió un error. Intenta de nuevo.';
        statusEl.className = 'form__status error';
      } finally {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
      }
    });
  }

  /* ======================
     Año en footer
     ====================== */
  var yearEl = document.querySelector('[data-year]');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
