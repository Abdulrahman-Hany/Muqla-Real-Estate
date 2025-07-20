document.addEventListener("DOMContentLoaded", function () {
  const scrollBtn = document.getElementById("scroll-indicator");
  if (scrollBtn) {
    scrollBtn.addEventListener("click", function () {
      window.scrollBy({
        top: window.innerHeight,
        left: 0,
        behavior: "smooth",
      });
    });
  }

  const navbar = document.querySelector(".nav-sticky");
  if (navbar) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 50) {
        navbar.classList.add("bg-[#33383b]", "py-1", "shadow-md");
        navbar.classList.remove("py-4");
      } else {
        navbar.classList.remove("bg-[#33383b]", "py-1", "shadow-md");
        navbar.classList.add("py-4");
      }
    });
  }

  const toggleBtn = document.getElementById("menuToggleBtn");
  const menu = document.getElementById("mainMenu");
  if (toggleBtn && menu) {
    toggleBtn.addEventListener("click", () => {
      menu.classList.toggle("hidden");
    });
  }
});

// Counter section (outside DOMContentLoaded لإنك غالبًا مش حاططها في الصفحة دي)
const counters = document.querySelectorAll(".counter");

if (counters.length > 0) {
  const startCounting = (counter) => {
    const target = +counter.getAttribute("data-target");
    let count = 0;

    const updateCounter = () => {
      const increment = target / 100;
      if (count < target) {
        count += increment;
        counter.textContent = `+ ${Math.ceil(count)}`;
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = `+ ${target}`;
      }
    };

    updateCounter();
  };

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          startCounting(counter);
          observer.unobserve(counter);
        }
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach((counter) => {
    observer.observe(counter);
  });
}

// Form interaction
const form = document.querySelector("form");
const phoneInput = document.getElementById("phone");
const floatingLabel = document.querySelector(".floating-label");

if (form && phoneInput) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const phoneValue = phoneInput.value.trim();

    if (phoneValue) {
      alert("تم الاشتراك بنجاح! سيتم التواصل معك قريباً.");
      phoneInput.value = "";
    } else {
      alert("يرجى إدخال رقم الهاتف");
      phoneInput.focus();
    }
  });

  if (floatingLabel) {
    phoneInput.addEventListener("focus", function () {
      floatingLabel.style.color = "#78716c";
    });

    phoneInput.addEventListener("blur", function () {
      floatingLabel.style.color = "#a3a3a3";
    });
  }
}