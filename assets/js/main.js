document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.getElementById('nav-toggle');
  var header = document.getElementById('site-header');
  if (toggle && header) {
    toggle.addEventListener('click', function () {
      header.classList.toggle('nav-open');
    });
  }
});
