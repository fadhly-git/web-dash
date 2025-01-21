if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function () {
    if (document.querySelectorAll(".overflow-auto")[0]) {
      var elements = document.querySelectorAll(".overflow-auto");
      elements.forEach((element) => {
        new PerfectScrollbar(element);
      });
    }
    if (document.querySelectorAll(".overflow-y-auto")[0]) {
      var elements = document.querySelectorAll(".overflow-y-auto");
      elements.forEach((element) => {
        new PerfectScrollbar(element);
      });
    }
    if (document.querySelectorAll(".overflow-x-auto")[0]) {
      var elements = document.querySelectorAll(".overflow-x-auto");
      elements.forEach((element) => {
        new PerfectScrollbar(element);
      });
    }
  });
}