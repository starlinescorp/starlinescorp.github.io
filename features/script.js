//if someone wants to change these it would be really cool
const planetsData = {
    mercury: {
        name: "Mercury",
        description: "Experience the ultimate thrill on our closest planetary neighbor! Mercury offers breathtaking sunrise and sunset views that last for months. Perfect for adventure seekers who want to witness the Sun's raw power up close. Our premium heat-shielded observation domes provide safe viewing of this scorching wonderland.",
        distance: "57.9 million km",
        period: "88 days",
        diameter: "4,879 km"
    },
    venus: {
        name: "Venus",
        description: "Welcome to the jewel of the morning sky! Float above Venus's stunning cloud layers in our luxurious sky-lounges. Experience the most dramatic atmospheric light shows in the solar system. Our state-of-the-art floating habitats offer unparalleled views of swirling golden clouds. A romantic getaway like no other!",
        distance: "108.2 million km",
        period: "225 days",
        diameter: "12,104 km"
    },
    earth: {
        name: "Earth",
        description: "The blue marble never looked so good from space! Our Earth orbital experience offers stunning views of continents, oceans, and weather systems. Watch sunrises every 90 minutes from our premium space station suites. Perfect for those who want to see home from a whole new perspective. Includes zero-gravity dining!",
        distance: "149.6 million km",
        period: "365 days",
        diameter: "12,742 km"
    },
    jupiter: {
        name: "Jupiter",
        description: "Witness the king of planets in all its glory! Tour the magnificent Great Red Spot—a storm larger than Earth itself. Visit our moon-hopping package to explore Europa's ice geysers and Io's volcanic landscapes. Jupiter tours include front-row seats to the most spectacular auroras in the solar system. An unforgettable family adventure!",
        distance: "778.5 million km",
        period: "12 years",
        diameter: "139,820 km"
    },
    saturn: {
        name: "Saturn",
        description: "The crowned jewel of space tourism! Get up close to the most spectacular rings in the solar system. Fly through the Cassini Division and witness billions of ice particles sparkling in the sunlight. Our exclusive ring-diving experiences and Titan surface tours make Saturn the honeymoon destination of the millennium!",
        distance: "1.4 billion km",
        period: "29 years",
        diameter: "116,460 km"
    },
    neptune: {
        name: "Neptune",
        description: "Journey to the edge of our solar system! Experience the deepest blue planet with winds faster than the speed of sound. Neptune's mysterious dark spots and diamond rain phenomena make this the ultimate destination for extreme explorers. Limited availability—book your once-in-a-lifetime adventure to the final frontier today!",
        distance: "4.5 billion km",
        period: "165 years",
        diameter: "49,244 km"
    }
};

let currentPlanetIndex = 0;
const planetOrder = ['mercury', 'venus', 'earth', 'jupiter', 'saturn', 'neptune'];

const ringContainer = document.getElementById('ringContainer');
const planetItems = document.querySelectorAll('.planet-item');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const planetNameEl = document.getElementById('planetName');
const planetDescEl = document.getElementById('planetDescription');
const planetDistanceEl = document.getElementById('planetDistance');
const planetPeriodEl = document.getElementById('planetPeriod');
const planetDiameterEl = document.getElementById('planetDiameter');

const RING_CONFIG = {
    radiusX: 300,
    radiusY: 80,
    centerX: 350,
    centerY: 200 
};

function init() {
    positionPlanets();
    updatePlanetDisplay();
    attachEventListeners();
    createStarfield();
}

function getPlanetPosition(index, offset = 0) {
    const totalPlanets = planetOrder.length;
    const angleStep = (Math.PI * 2) / totalPlanets;
    const angle = -Math.PI / 2 + (index + offset) * angleStep;
    
    const x = Math.cos(angle) * RING_CONFIG.radiusX;
    const z = Math.sin(angle) * RING_CONFIG.radiusY;
    
    const minScale = 0.5;
    const maxScale = 1.5;
    const normalizedZ = (-z / RING_CONFIG.radiusY + 1) / 2;
    const scale = minScale + (maxScale - minScale) * normalizedZ;
    
    const zIndex = Math.round(normalizedZ * 100) + 3;
    
    return {
        x: x + RING_CONFIG.centerX,
        y: RING_CONFIG.centerY,
        z: z,
        scale: scale,
        zIndex: zIndex,
        angle: angle
    };
}

function positionPlanets() {
    planetItems.forEach((item, index) => {
        const relativeIndex = (index - currentPlanetIndex + planetOrder.length) % planetOrder.length;
        const pos = getPlanetPosition(relativeIndex);
        
        const size = 120 * pos.scale;
        item.style.width = `${size}px`;
        item.style.height = `${size}px`;
        item.style.left = `${pos.x}px`;
        item.style.top = `${pos.y}px`;
        item.style.transform = `translate(-50%, -50%)`;
        item.style.zIndex = pos.zIndex;
        
        const brightness = 0.6 + (pos.scale - 0.4) * 0.6;
        item.style.opacity = brightness;
    });
}

function updatePlanetDisplay() {
    const currentPlanet = planetOrder[currentPlanetIndex];
    const planetData = planetsData[currentPlanet];
    
    const infoSection = document.getElementById('planetInfo');
    infoSection.style.opacity = '0';
    
    setTimeout(() => {
        planetNameEl.textContent = planetData.name;
        planetDescEl.textContent = planetData.description;
        planetDistanceEl.textContent = planetData.distance;
        planetPeriodEl.textContent = planetData.period;
        planetDiameterEl.textContent = planetData.diameter;
        document.getElementById('currentPlanetName').textContent = planetData.name;
        infoSection.style.opacity = '1';
    }, 300);
    
    planetItems.forEach(item => item.classList.remove('active'));
    const activePlanet = document.querySelector(`[data-planet="${currentPlanet}"]`);
    if (activePlanet) {
        activePlanet.classList.add('active');
    }
    
    positionPlanets();
}

function rotatePlanets(direction) {
    if (direction === 'next') {
        currentPlanetIndex = (currentPlanetIndex + 1) % planetOrder.length;
    } else {
        currentPlanetIndex = (currentPlanetIndex - 1 + planetOrder.length) % planetOrder.length;
    }
    
    updatePlanetDisplay();
}

function attachEventListeners() {
    prevBtn.addEventListener('click', () => rotatePlanets('prev'));
    nextBtn.addEventListener('click', () => rotatePlanets('next'));
    
    planetItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            const planetName = item.getAttribute('data-planet');
            currentPlanetIndex = planetOrder.indexOf(planetName);
            updatePlanetDisplay();
        });
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            rotatePlanets('prev');
        } else if (e.key === 'ArrowRight') {
            rotatePlanets('next');
        }
    });
    
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    window.addEventListener('resize', () => {
        const width = window.innerWidth;
        if (width <= 480) {
            RING_CONFIG.radiusX = 150;
            RING_CONFIG.radiusY = 50;
            RING_CONFIG.centerX = 175;
            RING_CONFIG.centerY = 150;
        } else if (width <= 768) {
            RING_CONFIG.radiusX = 220;
            RING_CONFIG.radiusY = 65;
            RING_CONFIG.centerX = 250;
            RING_CONFIG.centerY = 175;
        } else {
            RING_CONFIG.radiusX = 300;
            RING_CONFIG.radiusY = 80;
            RING_CONFIG.centerX = 350;
            RING_CONFIG.centerY = 200;
        }
        positionPlanets();
    });
    
    const width = window.innerWidth;
    if (width <= 480) {
        RING_CONFIG.radiusX = 150;
        RING_CONFIG.radiusY = 50;
        RING_CONFIG.centerX = 175;
        RING_CONFIG.centerY = 150;
    } else if (width <= 768) {
        RING_CONFIG.radiusX = 220;
        RING_CONFIG.radiusY = 65;
        RING_CONFIG.centerX = 250;
        RING_CONFIG.centerY = 175;
    }
}

function createStarfield() {
    const canvas = document.getElementById('stars');
    if (!canvas) return;
    
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
                    const force = (repelRadius - dist) / repelRadius;
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
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
