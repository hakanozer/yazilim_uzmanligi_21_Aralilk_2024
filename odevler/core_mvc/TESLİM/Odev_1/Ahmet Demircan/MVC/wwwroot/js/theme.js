(function() {
  const key = 'theme';
  const apply = t => document.documentElement.setAttribute('data-bs-theme', t);
  const setIcon = t => {
    const icon = document.getElementById('themeIcon');
    if (!icon) return;
    if (t === 'dark') {
      icon.classList.remove('bi-brightness-high');
      icon.classList.add('bi-moon-stars');
    } else {
      icon.classList.remove('bi-moon-stars');
      icon.classList.add('bi-brightness-high');
    }
  };

  const saved = localStorage.getItem(key) || 'light';
  apply(saved);
  document.addEventListener('DOMContentLoaded', function() {
    setIcon(saved);
    const btn = document.getElementById('themeToggleBtn');
    if (btn) {
      btn.addEventListener('click', function() {
        const current = document.documentElement.getAttribute('data-bs-theme') || 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        apply(next);
        setIcon(next);
        localStorage.setItem(key, next);
      });
    }
  });
})();