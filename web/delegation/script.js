function onClicking() {
  var list = document.querySelectorAll('li a');

  Array.prototype.slice.call(list).forEach((item) => {
    item.addEventListener('click', (e) => {
      alert(e.target.innerHTML)
    });
  });
}

window.onload = onClicking
