/* ============================================================
   DOC'S MOBILE SERVICES — main.js
   Handles: mobile nav, contact form submission (Web3Forms)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ----------------------------------------------------------
     MOBILE NAV TOGGLE
  ---------------------------------------------------------- */
  const toggle   = document.getElementById('nav-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('open');
      mobileNav.classList.toggle('open');
    });

    // Close on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('open');
        mobileNav.classList.remove('open');
      });
    });
  }

  /* ----------------------------------------------------------
     ACTIVE NAV LINK
  ---------------------------------------------------------- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ----------------------------------------------------------
     CONTACT FORM — Web3Forms submission
     Replace ACCESS_KEY_HERE with client's Web3Forms key
  ---------------------------------------------------------- */
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitBtn  = contactForm.querySelector('.form-submit');
      const successMsg = document.getElementById('form-success');

      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      const formData = new FormData(contactForm);

      try {
        const res = await fetch('https://formspree.io/f/xvzvnzej', {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });

        if (res.ok) {
          contactForm.reset();
          if (successMsg) successMsg.style.display = 'block';
          submitBtn.textContent = 'Sent ✓';
        } else {
          submitBtn.textContent = 'Error — try calling us';
          submitBtn.disabled = false;
        }
      } catch (err) {
        submitBtn.textContent = 'Error — try calling us';
        submitBtn.disabled = false;
        console.error('Form error:', err);
      }
    });
  }

});
