function initThreeJS() {
    const container = document.getElementById('threejs-bg');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particleCount = 1000;
    
    const posArray = new Float32Array(particleCount * 3);
    for(let i = 0; i < particleCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x3b82f6,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);
    
    camera.position.z = 3;
    
    // Animation
    function animate() {
        requestAnimationFrame(animate);
        
        particlesMesh.rotation.x += 0.0005;
        particlesMesh.rotation.y += 0.0005;
        
        renderer.render(scene, camera);
    }
    
    animate();
    
    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Initialize p5.js interactive elements
function initP5() {
    new p5((p) => {
        let canvas;
        let particles = [];
        
        p.setup = () => {
            canvas = p.createCanvas(p.windowWidth, p.windowHeight);
            canvas.position(0, 0);
            canvas.style('z-index', '-1');
            canvas.style('position', 'fixed');
            canvas.style('opacity', '0.1');
            
            for(let i = 0; i < 50; i++) {
                particles.push({
                    x: p.random(p.width),
                    y: p.random(p.height),
                    size: p.random(2, 5),
                    speedX: p.random(-1, 1),
                    speedY: p.random(-1, 1),
                    color: p.color(59, 130, 246, 100)
                });
            }
        };
        
        p.draw = () => {
            p.clear();
            
            for(let particle of particles) {
                p.fill(particle.color);
                p.noStroke();
                p.ellipse(particle.x, particle.y, particle.size);
                
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                
                if(particle.x < 0 || particle.x > p.width) particle.speedX *= -1;
                if(particle.y < 0 || particle.y > p.height) particle.speedY *= -1;
            }
        };
        
        p.windowResized = () => {
            p.resizeCanvas(p.windowWidth, p.windowHeight);
        };
    }, 'p5-interactive');
}



// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initThreeJS();
    initP5();
    initGlide();
    animateSkillBars();
    setupMobileMenu();
    setupSmoothScrolling();
    
    // Add scroll reveal animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('animate-fadeIn');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
});
