/*=============== SHOW & HIDE MENU ===============*/
const toggleMenu = (navId, toggleId) => {
    const nav = document.getElementById(navId);
    const toggle = document.getElementById(toggleId);

    toggle.addEventListener("click", () => {
        nav.classList.toggle("show-menu");
        toggle.classList.toggle("active");
    });
};
toggleMenu("nav-menu", "nav-toggle");

/*=============== REMOVE MENU WHEN CLICK LINK ===============*/
document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
        document.getElementById("nav-menu").classList.remove("show-menu");
        document.getElementById("nav-toggle").classList.remove("active");
    });
});

/*=============== ADD SHADOW HEADER ===============*/
const shadowHeader = () => {
  const header = document.getElementById('header');
  // أضف الكلاس إذا كان مقدار التمرير أكبر من 50
  if (window.scrollY >= 50) {
    header.classList.add('shadow-header');
  } else {
    header.classList.remove('shadow-header');
  }
};

window.addEventListener('scroll', shadowHeader);

/*=============== START VIDEO ===============*/
const cards = document.querySelectorAll(".project-card");

cards.forEach(card => {
  const video = card.querySelector(".project-video");

  card.addEventListener("mouseenter", () => {
    video.play();
  });

  card.addEventListener("mouseleave", () => {
    video.pause();
  });
});

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () =>{
  const scrollUp = document.getElementById('scroll-up')
  this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
                  : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById('theme-button');
const darkTheme = 'dark-theme';
const iconTheme = 'ri-sun-fill';

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme');
const selectedIcon = localStorage.getItem('selected-icon');

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light';
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'ri-moon-fill' : 'ri-sun-fill';

// We validate if the user previously chose a topic
if (selectedTheme) {
    // If validation is fulfilled, we add or remove the theme
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme);
    themeButton.classList[selectedIcon === 'ri-moon-fill' ? 'add' : 'remove'](iconTheme);
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)

    // Save the current theme and icon in localStorage
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
    const scrollDown = window.scrollY;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 58;
        const sectionId = current.getAttribute('id');
        const sectionClass = document.querySelector('.nav-menu a[href*=' + sectionId + ']');

        if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
            sectionClass.classList.add('active-link');
        } else {
            sectionClass.classList.remove('active-link');
        }
    });
};

window.addEventListener('scroll', scrollActive);

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
  origin: 'top',
  distance: '60px',
  duration: 2000,
  //reset: true, // Animation repeat
})

sr.reveal(`.home-title, .home-description, .home-subtitle`, {interval: 100})
sr.reveal(`.home-img`, {delay: 900})
sr.reveal(`.home-sci`, {origin: 'bottom', delay: 2100})

sr.reveal(`.service-card, .service-title, .service-description`, {interval: 100})

sr.reveal(`.about-image`, {origin: 'left'})
sr.reveal(`.about-data`, {origin: 'right', delay: 600})

sr.reveal(`.project-card`, {interval: 100})

sr.reveal(` .contact-subtitle, .contact-desciption`, {interval: 100})
sr.reveal(`.my-contact`, {origin: 'left', delay: 600})
sr.reveal(`.sci-contact`, {origin: 'bottom', delay: 900})

sr.reveal(`.text-form`, {origin: 'left', delay: 600})
sr.reveal(`.email`, {origin: 'left', delay: 700})
sr.reveal(`.subject`, {origin: 'left', delay: 800})
sr.reveal(`.cmntr`, {origin: 'left', delay: 900})
sr.reveal(`.send`, {origin: 'bottom', delay: 1100})

//=======Backend Of Contaact======//

emailjs.init("BiYM53GRPwsNtDuYj"); // ✅ ضع هنا المفتاح الصحيح

const form = document.getElementById("contact-form");

form.addEventListener("submit", function(event) {
  event.preventDefault();

  Swal.fire({
    title: 'Sending Message...',
    text: 'Please wait a moment.',
    background: '#EDE7C7',
    color: '#200E00',
    icon: 'info',
    showConfirmButton: false,
    allowOutsideClick: false,
    didOpen: () => Swal.showLoading(),
    customClass: {
      popup: 'rounded-2xl shadow-lg border border-[#00ff88]'
    }
  });

  const params = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    title: document.getElementById("subject").value,
    message: document.getElementById("message").value
  };

  emailjs.send("service_gsifmj9", "template_enoz5ra", params)
    .then(() => {
      Swal.fire({
        title: 'Message Sent Successfully! 🎉',
        text: 'Thank you for reaching out. I will respond soon!',
        icon: 'success',
        background: '#EDE7C7',
        color: '#200E00',
        confirmButtonColor: '#8B0101',
        customClass: {
          popup: 'rounded-2xl shadow-lg border border-[#00ff88]'
        }
      });
      form.reset();
    })
    .catch((error) => {
      console.error("Error:", error);
      Swal.fire({
        title: 'Sending Failed ❌',
        text: 'Something went wrong. Please try again later.',
        icon: 'error',
        background: '#EDE7C7',
        color: '#200E00',
        confirmButtonColor: '#8B0101',
        customClass: {
          popup: 'rounded-2xl shadow-lg border border-[#00ff88]'
        }
      });
    });
});