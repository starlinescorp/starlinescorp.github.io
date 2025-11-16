
const canvas = document.getElementById('stars');
    const ctx = canvas.getContext('2d');
    let w, h;

    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    let mouse = { x: null, y: null };
    window.addEventListener('mousemove', e => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    window.addEventListener('mouseout', () => {
      mouse.x = null;
      mouse.y = null;
    });

    class Star {
      constructor() {
        this.originalX = Math.random() * w;
        this.originalY = Math.random() * h;
        this.x = this.originalX;
        this.y = this.originalY;
        this.size = Math.random() * 1.5 + 0.5;
        this.vx = 0;
        this.vy = 0;
      }

      update() {
        const cx = w / 2, cy = h / 2;
        const dx = this.x - cx;
        const dy = this.y - cy;
        const distCenter = Math.hypot(dx, dy);
        const swirl = 0.00002;
        this.x += -Math.sin(Math.atan2(dy, dx)) * swirl * distCenter;
        this.y +=  Math.cos(Math.atan2(dy, dx)) * swirl * distCenter;


        if (mouse.x !== null && mouse.y !== null) {
          const dxm = this.x - mouse.x;
          const dym = this.y - mouse.y;
          const dist = Math.hypot(dxm, dym);
          const repelRadius = 120;
          if (dist < repelRadius) {
            const force = (repelRadius - dist) / repelRadius; // closer = stronger
            const angle = Math.atan2(dym, dxm);
            this.vx += Math.cos(angle) * force * 3;
            this.vy += Math.sin(angle) * force * 3;
          }
        }
        const homeDX = this.originalX - this.x;
        const homeDY = this.originalY - this.y;
        this.vx += homeDX * 0.002;
        this.vy += homeDY * 0.002;
        this.vx *= 0.9;
        this.vy *= 0.9;

        this.x += this.vx;
        this.y += this.vy;
      }

      draw() {
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const stars = [];
    const numStars = 500;
    for (let i = 0; i < numStars; i++) {
      stars.push(new Star());
    }

    function animate() {
      ctx.clearRect(0, 0, w, h);
      for (let s of stars) {
        s.update();
        s.draw();
      }
      requestAnimationFrame(animate);
    }

    animate();

document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('nav ul');
  
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
    
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
    
    document.addEventListener('click', function(event) {
      const isClickInsideNav = navMenu.contains(event.target);
      const isClickOnHamburger = hamburger.contains(event.target);
      
      if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  }
});

