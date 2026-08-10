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
    const nombreInput = document.getElementById('form-nombre');
    const emailInput = document.getElementById('form-email');
    const telefonoInput = document.getElementById('form-telefono');
    const regionInput = document.getElementById('form-region');
    const mensajeInput = document.getElementById('form-mensaje');
    const errorEls = form.querySelectorAll('.form__error');
    const submitBtn = form.querySelector('[data-form-submit]');
    const statusEl = form.querySelector('[data-form-status]');

    function validateEmail(value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    function validateRequired(value, label) {
      const err = value.trim() ? '' : 'Ingresa ' + label;
      return err;
    }

    function setFieldError(input, errorEl, msg) {
      if (errorEl) errorEl.textContent = msg || '';
      if (input) {
        input.classList.toggle('error', !!msg);
        input.classList.remove('valid');
      }
    }

    function setFieldSuccess(input, errorEl) {
      setFieldError(input, errorEl, '');
      if (input) input.classList.add('valid');
    }

    nombreInput.addEventListener('blur', function () {
      const msg = validateRequired(nombreInput.value, 'tu nombre');
      setFieldError(nombreInput, nombreInput.parentElement.querySelector('.form__error'), msg);
    });

    emailInput.addEventListener('input', function () {
      const val = emailInput.value.trim();
      if (val === '') {
        setFieldError(emailInput, emailInput.parentElement.querySelector('.form__error'), '');
        return;
      }
      setFieldError(emailInput, emailInput.parentElement.querySelector('.form__error'), validateEmail(val) ? '' : 'Ingresa un correo válido');
      if (validateEmail(val)) setFieldSuccess(emailInput, emailInput.parentElement.querySelector('.form__error'));
    });

    emailInput.addEventListener('blur', function () {
      const msg = validateRequired(emailInput.value, 'tu correo');
      if (msg) {
        setFieldError(emailInput, emailInput.parentElement.querySelector('.form__error'), msg);
        return;
      }
      if (!validateEmail(emailInput.value.trim())) {
        setFieldError(emailInput, emailInput.parentElement.querySelector('.form__error'), 'Ingresa un correo válido');
      }
    });

    telefonoInput.addEventListener('blur', function () {
      const val = telefonoInput.value.trim();
      if (val === '') {
        setFieldError(telefonoInput, telefonoInput.parentElement.querySelector('.form__error'), '');
        return;
      }
      const msg = /^[+\d][\d\s()-]{6,20}$/.test(val) ? '' : 'Ingresa un teléfono válido';
      setFieldError(telefonoInput, telefonoInput.parentElement.querySelector('.form__error'), msg);
    });

    regionInput.addEventListener('blur', function () {
      const msg = validateRequired(regionInput.value, 'tu región');
      setFieldError(regionInput, regionInput.parentElement.querySelector('.form__error'), msg);
    });

    mensajeInput.addEventListener('blur', function () {
      const msg = validateRequired(mensajeInput.value, 'tu mensaje');
      setFieldError(mensajeInput, mensajeInput.parentElement.querySelector('.form__error'), msg);
    });

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      let valid = true;
      const nombre = nombreInput.value.trim();
      const email = emailInput.value.trim();
      const telefono = telefonoInput.value.trim();
      const region = regionInput.value.trim();
      const mensaje = mensajeInput.value.trim();

      const nombreErr = validateRequired(nombre, 'tu nombre');
      setFieldError(nombreInput, nombreInput.parentElement.querySelector('.form__error'), nombreErr);
      if (nombreErr) valid = false;

      const emailErr = validateRequired(email, 'tu correo');
      setFieldError(emailInput, emailInput.parentElement.querySelector('.form__error'), emailErr);
      if (!emailErr) {
        if (!validateEmail(email)) {
          setFieldError(emailInput, emailInput.parentElement.querySelector('.form__error'), 'Ingresa un correo válido');
          valid = false;
        }
      }

      const telefonoErr = telefono ? ( /^[+\d][\d\s()-]{6,20}$/.test(telefono) ? '' : 'Ingresa un teléfono válido' ) : '';
      setFieldError(telefonoInput, telefonoInput.parentElement.querySelector('.form__error'), telefonoErr);
      if (telefonoErr) valid = false;

      const regionErr = validateRequired(region, 'tu región');
      setFieldError(regionInput, regionInput.parentElement.querySelector('.form__error'), regionErr);
      if (regionErr) valid = false;

      const mensajeErr = validateRequired(mensaje, 'tu mensaje');
      setFieldError(mensajeInput, mensajeInput.parentElement.querySelector('.form__error'), mensajeErr);
      if (mensajeErr) valid = false;

      if (!valid) return;

      const statusEl = document.querySelector('[data-form-status]');
      submitBtn.classList.add('loading');
      submitBtn.disabled = true;
      statusEl.textContent = '';
      statusEl.className = 'form__status';

      const payload = {
        nombre: nombre,
        email: email,
        telefono: telefono || '',
        region: region,
        mensaje: mensaje,
        source: 'australma-web'
      };

      try {
        const endpoint = (typeof AUSTRALMA_FORM_ENDPOINT !== 'undefined' && AUSTRALMA_FORM_ENDPOINT) || '/api/leads';
        const resp = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (!resp.ok) throw new Error('Error en el servidor');

        statusEl.textContent = '¡Gracias por contactar a Australma! Hemos recibido tu mensaje y nos pondremos en contacto contigo a la brevedad.';
        statusEl.className = 'form__status success';
        form.reset();
        form.querySelectorAll('.valid').forEach(function (el) { el.classList.remove('valid'); });
      } catch (_err) {
        statusEl.textContent = 'Ocurrió un error. Intenta de nuevo más tarde.';
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
