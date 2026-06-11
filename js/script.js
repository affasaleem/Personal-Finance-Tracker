/* =============================================
   FinTrack — Main JavaScript (v2)
   script.js
   ============================================= */

$(document).ready(function () {

  /* ---- Page Loader ---- */
  setTimeout(function () {
    $('#page-loader').addClass('hide');
    setTimeout(function () { $('#page-loader').remove(); }, 600);
  }, 1500);

  /* ---- Navbar Scroll Effect ---- */
  $(window).on('scroll', function () {
    $(this).scrollTop() > 50
      ? $('.navbar').addClass('scrolled')
      : $('.navbar').removeClass('scrolled');
  });

  /* ---- Active Nav Link (auto-detect current page) ---- */
  (function setActiveNav() {
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    $('.navbar-nav .nav-link').each(function () {
      if ($(this).attr('href') === currentPage) { $(this).addClass('active'); }
    });
  })();

  /* ---- Smooth Scroll for anchor links ---- */
  $('a[href^="#"]').on('click', function (e) {
    var target = $(this.getAttribute('href'));
    if (target.length) {
      e.preventDefault();
      $('html, body').animate({ scrollTop: target.offset().top - 80 }, 700, 'swing');
    }
  });

  /* ---- Ripple Effect on Buttons ---- */
  $(document).on('click', '.ripple', function (e) {
    var $btn   = $(this);
    var offset = $btn.offset();
    var x      = e.pageX - offset.left;
    var y      = e.pageY - offset.top;
    var size   = Math.max($btn.outerWidth(), $btn.outerHeight());
    var $ripple = $('<span class="ripple-effect"></span>').css({
      width: size, height: size,
      top: y - size / 2, left: x - size / 2
    });
    $btn.append($ripple);
    setTimeout(function () { $ripple.remove(); }, 700);
  });

  /* ---- Counter Animation ---- */
  function animateCounter($el) {
    var target    = parseInt($el.data('target'), 10);
    var prefix    = $el.data('prefix') || '';
    var suffix    = $el.data('suffix') || '';
    var decimals  = $el.data('decimals') || 0;
    var start     = 0;
    var increment = target / (2000 / 16);
    var timer = setInterval(function () {
      start += increment;
      if (start >= target) { start = target; clearInterval(timer); }
      $el.text(prefix + parseFloat(start).toFixed(decimals) + suffix);
    }, 16);
  }

  if ('IntersectionObserver' in window) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var $el = $(entry.target);
          if (!$el.data('counted')) { $el.data('counted', true); animateCounter($el); }
        }
      });
    }, { threshold: 0.5 });
    $('.count-value').each(function () { counterObserver.observe(this); });
  } else {
    $('.count-value').each(function () { animateCounter($(this)); });
  }

  /* ---- AOS Init ---- */
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 60 });
  }

  /* ---- Tooltip Init ---- */
  [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    .map(function (el) { return new bootstrap.Tooltip(el); });

  /* ---- Toast Notification ---- */
  window.showToast = function (message, type) {
    type = type || 'success';
    var bgMap   = { success: 'var(--accent)', error: 'var(--danger)', warning: 'var(--warning)', info: 'var(--primary)' };
    var iconMap = { success: 'bi-check-circle-fill', error: 'bi-x-circle-fill', warning: 'bi-exclamation-triangle-fill', info: 'bi-info-circle-fill' };
    var id = 'toast-' + Date.now();
    var $toast = $('<div class="position-fixed bottom-0 end-0 p-3" style="z-index:9999">' +
      '<div id="' + id + '" class="toast align-items-center text-white border-0" role="alert" ' +
      'style="background:' + bgMap[type] + ';border-radius:12px;min-width:280px">' +
      '<div class="d-flex"><div class="toast-body d-flex align-items-center gap-2">' +
      '<i class="bi ' + iconMap[type] + '"></i>' + message +
      '</div><button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>' +
      '</div></div></div>');
    $('body').append($toast);
    var toast = new bootstrap.Toast($('#' + id)[0], { delay: 3500 });
    toast.show();
    $('#' + id).on('hidden.bs.toast', function () { $toast.remove(); });
  };

  /* ---- Newsletter Form ---- */
  $('#newsletter-form').on('submit', function (e) {
    e.preventDefault();
    var email = $(this).find('input[type="email"]').val();
    if (email) {
      showToast('🎉 Subscribed! Welcome to FinTrack.', 'success');
      $(this).find('input[type="email"]').val('');
    }
  });

  /* ---- Mobile Sidebar Toggle (dashboard pages) ---- */
  $('#sidebar-toggle').on('click', function () {
    $('.sidebar').toggleClass('open');
    $('.sidebar-overlay').toggleClass('show');
  });
  $('.sidebar-overlay').on('click', function () {
    $('.sidebar').removeClass('open');
    $(this).removeClass('show');
  });

  /* ---- Pricing Toggle (Monthly / Yearly) ---- */
  $('#pricing-toggle').on('change', function () {
    var isYearly = $(this).is(':checked');
    $('.price-monthly').toggle(!isYearly);
    $('.price-yearly').toggle(isYearly);
    if (isYearly) { showToast('💰 Save up to 40% with yearly billing!', 'info'); }
  });

  /* ---- Back to Top ---- */
  $(window).on('scroll', function () {
    $(this).scrollTop() > 400 ? $('#back-to-top').fadeIn(300) : $('#back-to-top').fadeOut(300);
  });
  $('#back-to-top').on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 600);
  });


  /* =============================================
     AUTH MODAL SYSTEM — Login & Create Account
     ============================================= */

  /* ---- Switch: Register → Login ---- */
  $(document).on('click', '.open-login-modal', function (e) {
    e.preventDefault();
    var reg = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
    if (reg) reg.hide();
    setTimeout(function () {
      new bootstrap.Modal(document.getElementById('loginModal')).show();
    }, 280);
  });

  /* ---- Switch: Login → Register ---- */
  $(document).on('click', '.open-register-modal', function (e) {
    e.preventDefault();
    var login = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
    if (login) login.hide();
    setTimeout(function () {
      new bootstrap.Modal(document.getElementById('registerModal')).show();
    }, 280);
  });

  /* ---- Reset Login Modal on close ---- */
  $('#loginModal').on('hidden.bs.modal', function () {
    var form = $(this).find('form')[0];
    if (form) form.reset();
    $(this).find('.auth-input').removeClass('is-valid is-invalid');
    $(this).find('.auth-feedback').html('').removeClass('valid invalid');
    $('.login-success').hide();
    $('.login-form-wrapper').show();
  });

  /* ---- Reset Register Modal on close ---- */
  $('#registerModal').on('hidden.bs.modal', function () {
    var form = $(this).find('form')[0];
    if (form) form.reset();
    $(this).find('.auth-input').removeClass('is-valid is-invalid');
    $(this).find('.auth-feedback').html('').removeClass('valid invalid');
    $('.register-success').hide();
    $('.register-form-wrapper').show();
    updateStrengthBar('');
  });

  /* ---- Password Visibility Toggle ---- */
  $(document).on('click', '.toggle-password', function () {
    var $input = $(this).closest('.auth-input-wrapper').find('.auth-input');
    $input.attr('type', $input.attr('type') === 'text' ? 'password' : 'text');
    $(this).toggleClass('bi-eye bi-eye-slash');
  });

  /* ---- Validation Helpers ---- */
  function setValid($input, $fb, msg) {
    $input.removeClass('is-invalid').addClass('is-valid');
    $fb.removeClass('invalid').addClass('valid auth-feedback')
      .html('<i class="bi bi-check-circle-fill"></i> ' + msg);
  }
  function setInvalid($input, $fb, msg) {
    $input.removeClass('is-valid').addClass('is-invalid');
    $fb.removeClass('valid').addClass('invalid auth-feedback')
      .html('<i class="bi bi-exclamation-circle-fill"></i> ' + msg);
  }
  function clearState($input, $fb) {
    $input.removeClass('is-valid is-invalid');
    $fb.removeClass('valid invalid').html('');
  }

  /* ---- Password Strength Meter ---- */
  function updateStrengthBar(password) {
    var $segs  = $('#reg-password').closest('.auth-form-group').find('.strength-segment');
    var $label = $('#reg-password').closest('.auth-form-group').find('.password-strength-label');
    if (!$segs.length) return;
    $segs.removeClass('weak fair strong');
    $label.removeClass('psl-weak psl-fair psl-strong').text('');
    if (!password) return;

    var score = 0;
    if (password.length >= 8)             score++;
    if (/[A-Z]/.test(password))           score++;
    if (/[0-9]/.test(password))           score++;
    if (/[^A-Za-z0-9]/.test(password))   score++;

    if (score <= 1) {
      $segs.eq(0).addClass('weak');
      $label.addClass('psl-weak').text('Weak — add uppercase, numbers & symbols');
    } else if (score <= 2) {
      $segs.eq(0).add($segs.eq(1)).addClass('fair');
      $label.addClass('psl-fair').text('Fair — getting better!');
    } else if (score <= 3) {
      $segs.eq(0).add($segs.eq(1)).add($segs.eq(2)).addClass('strong');
      $label.addClass('psl-strong').text('Good password');
    } else {
      $segs.addClass('strong');
      $label.addClass('psl-strong').text('Strong password 💪');
    }
  }

  /* ---- LOGIN: Real-time validation ---- */
  $('#login-identifier').on('input', function () {
    var val = $(this).val().trim(), $fb = $('#login-identifier-fb');
    if (!val) return clearState($(this), $fb);
    val.length >= 3 ? setValid($(this), $fb, 'Looks good') : setInvalid($(this), $fb, 'At least 3 characters required');
  });
  $('#login-password').on('input', function () {
    var val = $(this).val(), $fb = $('#login-password-fb');
    if (!val) return clearState($(this), $fb);
    val.length >= 6 ? setValid($(this), $fb, 'OK') : setInvalid($(this), $fb, 'At least 6 characters required');
  });

  /* ---- LOGIN: Form submit ---- */
  $('#login-form').on('submit', function (e) {
    e.preventDefault();
    var id  = $('#login-identifier').val().trim();
    var pwd = $('#login-password').val();
    var ok  = true;
    if (!id  || id.length  < 3) { setInvalid($('#login-identifier'), $('#login-identifier-fb'), 'Enter your email or username'); ok = false; }
    if (!pwd || pwd.length < 6) { setInvalid($('#login-password'),   $('#login-password-fb'),   'Enter your password');          ok = false; }
    if (!ok) return;

    var $btn = $(this).find('.btn-auth-submit');
    $btn.prop('disabled', true).html('<span class="spinner-border spinner-border-sm me-2"></span>Signing in…');
    setTimeout(function () {
      $btn.prop('disabled', false).html('<i class="bi bi-box-arrow-in-right"></i> Login');
      $('.login-form-wrapper').hide();
      $('.login-success').show();
      showToast('🎉 Welcome back! Redirecting to dashboard…', 'success');
      setTimeout(function () {
        var m = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
        if (m) m.hide();
        window.location.href = 'dashboard.html';
      }, 2200);
    }, 1600);
  });

  /* ---- REGISTER: Real-time validation ---- */
  $('#reg-fullname').on('input', function () {
    var val = $(this).val().trim(), $fb = $('#reg-fullname-fb');
    if (!val) return clearState($(this), $fb);
    val.split(' ').filter(function (p) { return p.length > 0; }).length >= 2 && val.length >= 4
      ? setValid($(this), $fb, 'Full name looks great')
      : setInvalid($(this), $fb, 'Enter your first and last name');
  });
  $('#reg-email').on('input', function () {
    var val = $(this).val().trim(), $fb = $('#reg-email-fb');
    if (!val) return clearState($(this), $fb);
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
      ? setValid($(this), $fb, 'Valid email address')
      : setInvalid($(this), $fb, 'Enter a valid email (e.g. you@example.com)');
  });
  $('#reg-username').on('input', function () {
    var val = $(this).val().trim(), $fb = $('#reg-username-fb');
    if (!val) return clearState($(this), $fb);
    /^[a-zA-Z0-9_]{3,20}$/.test(val)
      ? setValid($(this), $fb, 'Username available!')
      : setInvalid($(this), $fb, '3–20 chars, letters/numbers/underscore only');
  });
  $('#reg-password').on('input', function () {
    var val = $(this).val(), $fb = $('#reg-password-fb');
    updateStrengthBar(val);
    if (!val) return clearState($(this), $fb);
    val.length >= 8 ? setValid($(this), $fb, 'Good length') : setInvalid($(this), $fb, 'At least 8 characters required');
    if ($('#reg-confirm').val()) $('#reg-confirm').trigger('input');
  });
  $('#reg-confirm').on('input', function () {
    var val = $(this).val(), pass = $('#reg-password').val(), $fb = $('#reg-confirm-fb');
    if (!val) return clearState($(this), $fb);
    val === pass ? setValid($(this), $fb, 'Passwords match!') : setInvalid($(this), $fb, 'Passwords do not match');
  });
  $('#reg-country').on('change', function () {
    var $fb = $('#reg-country-fb');
    $(this).val() ? setValid($(this), $fb, 'Country selected') : clearState($(this), $fb);
  });
  $('#reg-currency').on('change', function () {
    var $fb = $('#reg-currency-fb');
    $(this).val() ? setValid($(this), $fb, 'Currency selected') : clearState($(this), $fb);
  });
  $('#reg-terms').on('change', function () {
    if ($(this).is(':checked')) $('#reg-terms-fb').html('').removeClass('valid invalid');
  });

  /* ---- REGISTER: Form submit ---- */
  $('#register-form').on('submit', function (e) {
    e.preventDefault();
    var ok = true;

    [
      { id: '#reg-fullname', fb: '#reg-fullname-fb', msg: 'Enter your full name (first & last)' },
      { id: '#reg-email',    fb: '#reg-email-fb',    msg: 'Enter a valid email address'         },
      { id: '#reg-username', fb: '#reg-username-fb', msg: 'Choose a valid username'              },
      { id: '#reg-password', fb: '#reg-password-fb', msg: 'Password must be 8+ characters'      },
      { id: '#reg-confirm',  fb: '#reg-confirm-fb',  msg: 'Passwords do not match'               }
    ].forEach(function (f) {
      if (!$(f.id).hasClass('is-valid')) { setInvalid($(f.id), $(f.fb), f.msg); ok = false; }
    });

    if (!$('#reg-country').val())  { setInvalid($('#reg-country'),  $('#reg-country-fb'),  'Select your country');  ok = false; }
    if (!$('#reg-currency').val()) { setInvalid($('#reg-currency'), $('#reg-currency-fb'), 'Select a currency');    ok = false; }
    if (!$('#reg-terms').is(':checked')) {
      $('#reg-terms-fb').html('<i class="bi bi-exclamation-circle-fill"></i> You must agree to the Terms & Conditions')
        .removeClass('valid').addClass('invalid auth-feedback');
      ok = false;
    }
    if (!ok) return;

    var $btn = $(this).find('.btn-auth-submit');
    $btn.prop('disabled', true).html('<span class="spinner-border spinner-border-sm me-2"></span>Creating account…');
    setTimeout(function () {
      $btn.prop('disabled', false).html('<i class="bi bi-person-plus-fill"></i> Create My Account');
      $('.register-form-wrapper').hide();
      $('.register-success').show();
      showToast('🎉 Account created! Welcome to FinTrack!', 'success');
    }, 1800);
  });

}); // end document.ready

