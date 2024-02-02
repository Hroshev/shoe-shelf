$(document).ready(function () {
  $(".btn_feedback").on("click", function () {
      $(".body_modal_new_feedback").css("display", "flex");
      return false;
  });

  $(".body_modal_new_feedback button").on("click", function () {
      $(".body_modal_new_feedback").css("display", "none");
      $(".body_modal_good_feedback").css("display", "flex");
      return false;
  });

  $(".body_modal_new_feedback .close").on("click", function () {
      $(".body_modal_new_feedback").css("display", "none");
      return false;
  });

  $(".body_modal_good_feedback .close").on("click", function () {
      $(".body_modal_good_feedback").css("display", "none");
      return false;
  });

  /* timer */

  function update() {
      var Now = new Date(),
          Finish = new Date();
      Finish.setHours(23);
      Finish.setMinutes(59);
      Finish.setSeconds(59);
      if (
          Now.getHours() === 23 &&
          Now.getMinutes() === 59 &&
          Now.getSeconds === 59
      ) {
          Finish.setDate(Finish.getDate() + 1);
      }
      var sec = Math.floor((Finish.getTime() - Now.getTime()) / 1000);
      var hrs = Math.floor(sec / 3600);
      sec -= hrs * 3600;
      var min = Math.floor(sec / 60);
      sec -= min * 60;
      $(".header_top_timer .hours").html(pad(hrs));
      $(".header_top_timer .minutes").html(pad(min));
      $(".header_top_timer .seconds").html(pad(sec));
      setTimeout(update, 200);
  }
  function pad(s) {
      s = ("00" + s).substr(-2);
      return "<span>" + s[0] + "</span><span>" + s[1] + "</span>";
  }
  update();

  var swiper = new Swiper(".offer_bottom", {
      pagination: {
          el: ".swiper-pagination",
          clickable: true,
          renderBullet: function (index, className) {
              return (
                  '<span class="' + className + '">' + (index + 1) + "</span>"
              );
          },
      },
  });

  $(".input-file input[type=file]").on("change", function () {
      let file = this.files[0];
      $(this).closest(".input-file").find(".input-file-text").html(file.name);
  });

  var $page = $("html, body");
  $('a[href*="#"]').click(function () {
      $page.animate(
          {
              scrollTop: $($.attr(this, "href")).offset().top,
          },
          400
      );
      return false;
  });
});

let lastScrollTop = 0;
document.addEventListener("scroll", function (e) {
  const st = window.scrollY;
  if (st > 160) {
      if (st > lastScrollTop) {
          document.querySelector("header").classList.remove("active");
      } else {
          document.querySelector("header").classList.add("active");
      }
      lastScrollTop = st;
  }
});

const btnUp = {
  el: document.querySelector(".btn-up"),
  scrolling: false,
  show() {
      if (
          this.el.classList.contains("btn-up_hide") &&
          !this.el.classList.contains("btn-up_hiding")
      ) {
          this.el.classList.remove("btn-up_hide");
          this.el.classList.add("btn-up_hiding");
          window.setTimeout(() => {
              this.el.classList.remove("btn-up_hiding");
          }, 300);
      }
  },
  hide() {
      if (
          !this.el.classList.contains("btn-up_hide") &&
          !this.el.classList.contains("btn-up_hiding")
      ) {
          this.el.classList.add("btn-up_hiding");
          window.setTimeout(() => {
              this.el.classList.add("btn-up_hide");
              this.el.classList.remove("btn-up_hiding");
          }, 300);
      }
  },
  addEventListener() {
      // при прокрутке окна (window)
      window.addEventListener("scroll", () => {
          const scrollY =
              window.scrollY || document.documentElement.scrollTop;
          if (this.scrolling && scrollY > 0) {
              return;
          }
          this.scrolling = false;
          // если пользователь прокрутил страницу более чем на 200px
          if (scrollY > 400) {
              // сделаем кнопку .btn-up видимой
              this.show();
          } else {
              // иначе скроем кнопку .btn-up
              this.hide();
          }
      });
      // при нажатии на кнопку .btn-up
      document.querySelector(".btn-up").onclick = () => {
          this.scrolling = true;
          this.hide();
          // переместиться в верхнюю часть страницы
          window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
          });
      };
  },
};

btnUp.addEventListener();

// work with price
const priceOld = document.querySelector(".js-price-old");
const priceNew = document.querySelector(".js-price-new");
const result = document.querySelector(".js-sale-result");

result.innerHTML = `${
  Number(priceOld.textContent) - Number(priceNew.textContent)
} грн`;

// work with menu
document.addEventListener("DOMContentLoaded", function () {
  var links = document.querySelectorAll(".header_bottom_tabs a");
  var sections = document.querySelectorAll(".section");

  function isElementInViewport(el) {
      var rect = el.getBoundingClientRect();
      return rect.top <= 50 && rect.bottom >= 50;
  }

  function updateActiveLink() {
      var found = false;

      sections.forEach(function (section, index) {
          if (!found && isElementInViewport(section)) {
              links.forEach(function (link) {
                  link.classList.remove("active");
              });

              links[index].classList.add("active");
              found = true;
          }
      });
  }

  updateActiveLink();

  window.addEventListener("scroll", updateActiveLink);
});
