window.addEventListener('load', function() {
  // Hide loader
  setTimeout(function() {
    document.querySelector(".loader").style.display = 'none';
    document.querySelector(".loadingtext").style.display = 'none';

    document.querySelector("#pdf-viewer").style.visibility = 'visible';
  }, 10000);
});