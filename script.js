/**
 * Mujtaba Alam Portfolio - Redeveloped Client Script
 */

// Global State
const state = {
    mouseX: 0,
    mouseY: 0,
    windowHalfX: window.innerWidth / 2,
    windowHalfY: window.innerHeight / 2
};

// Simulated IDE Data Stream
const ideFiles = {
    'profile.json': `{
  <span class="token-property">"developer"</span>: <span class="token-string">"Mujtaba Alam"</span>,
  <span class="token-property">"origins"</span>: <span class="token-string">"Kashmir, India"</span>,
  <span class="token-property">"role"</span>: <span class="token-string">"Full-Stack Web Architect"</span>,
  <span class="token-property">"corePhilosophy"</span>: <span class="token-string">"Code. Create. Innovate."</span>,
  <span class="token-property">"activeBuilds"</span>: [
    <span class="token-string">"MD Code / Single Code Workspace"</span>,
    <span class="token-string">"ArticleGlobe Publishing Grid"</span>,
    <span class="token-string">"HSS Larnoo Portal"</span>
  ]
}`,
    'philosophy.js': `<span class="token-keyword">const</span> developer = {
  name: <span class="token-string">'Mujtaba Alam'</span>,
  passion: <span class="token-string">'Transforming code blocks into fluid interfaces'</span>,
  approach: () => {
    <span class="token-keyword">return</span> <span class="token-string">'Form follows function, powered by performant design'</span>;
  }
};

<span class="token-comment">// Run execution cycle</span>
console.log(developer.approach());`
};

// Document Lifecycle Setup
document.addEventListener('DOMContentLoaded', () => {
    init3DConstellation();
    initIDE();
    initMobileNavigation();
    initActiveNavScroll();
    init3DTilt();
    initContactForm();
    animateCounters();
});

// Three.js Interactive Star Mesh Background
let scene, camera, renderer, group;

function init3DConstellation() {
    const container = document.getElementById('canvas-container');
    if (!container) return;

    scene = new THREE.Scene();
    
    camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 1, 1000);
    camera.position.z = 150;

    group = new THREE.Group();
    scene.add(group);

    // Distribution Coordinates
    const particleCount = 100;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const baseColor = new THREE.Color('#00f0ff');
    const targetColor = new THREE.Color('#8b5cf6');

    for (let i = 0; i < particleCount; i++) {
        // Spherical distribution mapping
        const x = Math.random() * 200 - 100;
        const y = Math.random() * 200 - 100;
        const z = Math.random() * 200 - 100;

        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;

        // Custom Gradient Mixes
        const mixRatio = Math.random();
        const blended = baseColor.clone().lerp(targetColor, mixRatio);
        colors[i * 3] = blended.r;
        colors[i * 3 + 1] = blended.g;
        colors[i * 3 + 2] = blended.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Spatial Node Matrix material attributes
    const material = new THREE.PointsMaterial({
        size: 2.5,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    });

    const particles = new THREE.Points(geometry, material);
    group.add(particles);

    // Connect Node Neighbors
    const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x8b5cf6,
        transparent: true,
        opacity: 0.12
    });

    const linePoints = [];
    for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
            const dx = positions[i * 3] - positions[j * 3];
            const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
            const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
            const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (distance < 45) {
                linePoints.push(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
                linePoints.push(positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]);
            }
        }
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePoints, 3));
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    group.add(lines);

    // WebGL Renderer pipeline options
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Dynamic Listeners
    document.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onWindowResize);
    
    animate3D();
}

function onMouseMove(event) {
    state.mouseX = (event.clientX - state.windowHalfX) * 0.08;
    state.mouseY = (event.clientY - state.windowHalfY) * 0.08;
}

function onWindowResize() {
    const container = document.getElementById('canvas-container');
    if (!container) return;
    state.windowHalfX = window.innerWidth / 2;
    state.windowHalfY = window.innerHeight / 2;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
}

function animate3D() {
    requestAnimationFrame(animate3D);

    group.rotation.x += 0.0008;
    group.rotation.y += 0.0005;

    // Smooth inertia tracking camera positioning
    camera.position.x += (state.mouseX - camera.position.x) * 0.05;
    camera.position.y += (-state.mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}

// Interactive Code Sandbox Mock Controller
function initIDE() {
    const contentBox = document.getElementById('ide-content');
    const tabs = document.querySelectorAll('.ide-tab');
    if (!contentBox || tabs.length === 0) return;

    // Initial load state
    contentBox.innerHTML = ideFiles['profile.json'];

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            const fileKey = tab.getAttribute('data-file');
            if (ideFiles[fileKey]) {
                contentBox.style.opacity = '0';
                setTimeout(() => {
                    contentBox.innerHTML = ideFiles[fileKey];
                    contentBox.style.opacity = '1';
                }, 150);
            }
        });
    });
}

// Navigation & Screen Responsive Interfaces
function initMobileNavigation() {
    const toggle = document.querySelector('.mobile-toggle');
    const menu = document.querySelector('.nav-menu');
    const links = document.querySelectorAll('.nav-link');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', () => {
        toggle.classList.toggle('active');
        menu.classList.toggle('open');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            toggle.classList.remove('active');
            menu.classList.remove('open');
        });
    });
}

// Active Scroll Highlight Tracking
function initActiveNavScroll() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        let current = '';
        
        // Sticky Header transform threshold
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        sections.forEach(sec => {
            const sectionTop = sec.offsetTop;
            const sectionHeight = sec.clientHeight;
            if (pageYOffset >= (sectionTop - 250)) {
                current = sec.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// 3D Card Tilt Math Calculations (Vanilla JS)
function init3DTilt() {
    const cards = document.querySelectorAll('.tilt-card');
    
    // Check if the device is touch-based before binding mouse trackers
    const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    if (isTouch) return;

    cards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            // Percentage boundaries
            const widthOffset = rect.width / 2;
            const heightOffset = rect.height / 2;
            
            const rotateX = (heightOffset - mouseY) / 12; // Modulate intensity
            const rotateY = (mouseX - widthOffset) / 12;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });
    });
}

// Simulated Form Processing and Toast Popups
function initContactForm() {
    const form = document.getElementById('portfolio-form');
    if (!form) return;

    form.addEventListener('submit', event => {
        event.preventDefault();
        
        const submitBtn = form.querySelector('.submit-btn');
        const oldHtml = submitBtn.innerHTML;
        
        // Visual processing animation feedback
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-circle-notch fa-spin"></i>`;

        setTimeout(() => {
            showToast("Message processed successfully! Let's talk soon.");
            form.reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML = oldHtml;
        }, 1200);
    });
}

function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');
    if (!toast || !toastMsg) return;

    toastMsg.innerText = message;
    toast.classList.remove('toast-hidden');

    setTimeout(() => {
        toast.classList.add('toast-hidden');
    }, 4000);
}

// Stat Metric Animation Transitions
function animateCounters() {
    const counters = document.querySelectorAll('.stat-num');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-val'), 10);
                let current = 0;
                const step = target / 50; 
                
                const update = () => {
                    current += step;
                    if (current < target) {
                        counter.innerText = Math.ceil(current);
                        setTimeout(update, 20);
                    } else {
                        counter.innerText = target;
                    }
                };
                
                update();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(c => observer.observe(c));
}