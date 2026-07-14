document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    lucide.createIcons();

    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // 2. Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const links = document.querySelectorAll('.nav-links li a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            if(navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // 3. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 100;
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('active');
                
                // Animate skill progress bars inside if it's the skills section
                if (el.id === 'keterampilan') {
                    const progressBars = el.querySelectorAll('.skill-progress');
                    progressBars.forEach(bar => {
                        const targetWidth = bar.getAttribute('data-width');
                        bar.style.width = targetWidth;
                    });
                }
            }
        });
    };
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load

    // 4. Navbar Glassmorphism Scroll Effect & Active Link Highlight
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('section, header');
    const navItems = document.querySelectorAll('.nav-links li a');

    window.addEventListener('scroll', () => {
        // Scrolled styling
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active section link highlight
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 250)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') === `#${current}`) {
                a.classList.add('active');
            }
        });
    });

    // 5. Typing Text Effect (Hero)
    const typingText = document.getElementById('typingText');
    const words = ["Web Developer", "Network Engineer", "Cyber Security Practitioner", "AI Integration Specialist"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    const typeEffect = () => {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingText.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 40; // Erase faster
        } else {
            typingText.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 80; // Normal typing speed
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingSpeed = 1500; // Pause at end of word
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause before typing next word
        }

        setTimeout(typeEffect, typingSpeed);
    };
    if (typingText) {
        setTimeout(typeEffect, 1000);
    }

    // 6. 3D Tilt Card Animation (Project Cards & Cyber Stats Card)
    const tiltCards = document.querySelectorAll('.project-card, .cyber-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position inside element
            const y = e.clientY - rect.top;  // y position inside element
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate angle (max 10 degrees tilt)
            const rotateX = ((centerY - y) / centerY) * 10;
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
            card.style.transition = 'transform 0.1s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
            card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
        });
    });

    // 7. EL PRESENTASI SIMULATOR LOGIC
    const terminalLog = document.getElementById('terminalLog');
    const gesturePadCanvas = document.getElementById('gesturePadCanvas');
    const padInstructions = document.getElementById('padInstructions');
    const ctx = gesturePadCanvas.getContext('2d');

    // Terminal Logging Helper
    const addLog = (text, type = 'info') => {
        const line = document.createElement('div');
        line.className = 'terminal-line';
        
        const timestamp = new Date().toLocaleTimeString();
        let prefix = `<span class="terminal-accent">[${timestamp}]</span> `;
        
        if (type === 'success') {
            line.innerHTML = `${prefix}<span style="color:#4af626;">[SUCCESS] ${text}</span>`;
        } else if (type === 'warning') {
            line.innerHTML = `${prefix}<span style="color:var(--accent-yellow);">[WARN] ${text}</span>`;
        } else if (type === 'action') {
            line.innerHTML = `${prefix}<span style="color:var(--accent-cyan);">[ACTION] ${text}</span>`;
        } else {
            line.innerHTML = `${prefix}${text}`;
        }
        
        terminalLog.appendChild(line);
        terminalLog.scrollTop = terminalLog.scrollHeight;
    };

    // Resize canvas to its element size
    const resizeCanvas = () => {
        const d = gesturePadCanvas.getBoundingClientRect();
        gesturePadCanvas.width = d.width;
        gesturePadCanvas.height = d.height;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Laser trail coordinates buffer
    let trails = [];
    let isDrawing = false;
    let startX = 0;
    
    // Draw Laser Trail in Gesture Pad
    const drawTrail = () => {
        ctx.fillStyle = 'rgba(14, 22, 40, 0.2)'; // Clear with slight fade for trail effect
        ctx.fillRect(0, 0, gesturePadCanvas.width, gesturePadCanvas.height);
        
        if (trails.length > 1) {
            ctx.beginPath();
            ctx.strokeStyle = '#ff0055';
            ctx.shadowBlur = 12;
            ctx.shadowColor = '#ff0055';
            ctx.lineWidth = 4;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            
            ctx.moveTo(trails[0].x, trails[0].y);
            for (let i = 1; i < trails.length; i++) {
                ctx.lineTo(trails[i].x, trails[i].y);
            }
            ctx.stroke();
            ctx.shadowBlur = 0; // Reset
        }
        
        // Age trails out
        if (trails.length > 0 && !isDrawing) {
            trails.shift();
        }
        requestAnimationFrame(drawTrail);
    };
    drawTrail();

    // Swipe and Draw Event Handlers
    gesturePadCanvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        padInstructions.style.opacity = '0.1';
        const rect = gesturePadCanvas.getBoundingClientRect();
        startX = e.clientX - rect.left;
        const currentY = e.clientY - rect.top;
        trails = [{ x: startX, y: currentY }];
        addLog(`Pointer Down inside Zone (X: ${Math.round(startX)}, Y: ${Math.round(currentY)})`);
    });

    gesturePadCanvas.addEventListener('mousemove', (e) => {
        if (!isDrawing) return;
        const rect = gesturePadCanvas.getBoundingClientRect();
        const currentX = e.clientX - rect.left;
        const currentY = e.clientY - rect.top;
        
        trails.push({ x: currentX, y: currentY });
        if (trails.length > 25) trails.shift(); // Limit path length
    });

    gesturePadCanvas.addEventListener('mouseup', (e) => {
        if (!isDrawing) return;
        isDrawing = false;
        padInstructions.style.opacity = '1';
        
        const rect = gesturePadCanvas.getBoundingClientRect();
        const endX = e.clientX - rect.left;
        const diffX = endX - startX;
        
        addLog(`Pointer Up. Delta X: ${Math.round(diffX)}`);
        
        // Detect Swipe Gestures (replicates Swipe Left/Right in el_gestur_v2)
        if (Math.abs(diffX) > 60) {
            if (diffX > 0) {
                // Swipe Right (Prev Slide)
                addLog('Gestur: Swipe Kanan (Slide Sebelumnya)', 'action');
                rotateProjectCards('prev');
            } else {
                // Swipe Left (Next Slide)
                addLog('Gestur: Swipe Kiri (Slide Berikutnya)', 'action');
                rotateProjectCards('next');
            }
        }
    });

    gesturePadCanvas.addEventListener('mouseleave', () => {
        isDrawing = false;
        padInstructions.style.opacity = '1';
    });

    // Touch Support for Mobile Gesture Pad
    gesturePadCanvas.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            isDrawing = true;
            padInstructions.style.opacity = '0.1';
            const rect = gesturePadCanvas.getBoundingClientRect();
            startX = e.touches[0].clientX - rect.left;
            const currentY = e.touches[0].clientY - rect.top;
            trails = [{ x: startX, y: currentY }];
        }
    });

    gesturePadCanvas.addEventListener('touchmove', (e) => {
        if (!isDrawing || e.touches.length !== 1) return;
        const rect = gesturePadCanvas.getBoundingClientRect();
        const currentX = e.touches[0].clientX - rect.left;
        const currentY = e.touches[0].clientY - rect.top;
        trails.push({ x: currentX, y: currentY });
        if (trails.length > 20) trails.shift();
    });

    gesturePadCanvas.addEventListener('touchend', (e) => {
        if (!isDrawing) return;
        isDrawing = false;
        padInstructions.style.opacity = '1';
        
        const rect = gesturePadCanvas.getBoundingClientRect();
        if (e.changedTouches.length === 1) {
            const endX = e.changedTouches[0].clientX - rect.left;
            const diffX = endX - startX;
            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    addLog('Gestur (Sentuh): Swipe Kanan', 'action');
                    rotateProjectCards('prev');
                } else {
                    addLog('Gestur (Sentuh): Swipe Kiri', 'action');
                    rotateProjectCards('next');
                }
            }
        }
    });

    // Rotate project cards animation (simulating slide control)
    const projectsGrid = document.getElementById('projectsGrid');
    const projectCards = document.querySelectorAll('.project-card');
    let currentActiveProject = 0;

    const rotateProjectCards = (direction) => {
        if (direction === 'next') {
            currentActiveProject = (currentActiveProject + 1) % projectCards.length;
        } else {
            currentActiveProject = (currentActiveProject - 1 + projectCards.length) % projectCards.length;
        }
        
        addLog(`Pindah ke proyek index: ${currentActiveProject} (${projectCards[currentActiveProject].querySelector('h3').textContent})`);
        
        // Highlight active card
        projectCards.forEach((card, idx) => {
            if (idx === currentActiveProject) {
                card.style.borderColor = 'var(--accent-yellow)';
                card.style.boxShadow = '0 0 25px var(--accent-yellow-glow)';
                card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            } else {
                card.style.borderColor = 'var(--border-color)';
                card.style.boxShadow = 'none';
            }
        });
    };

    // 8. INTERACTIVE SIMULATION EFFECTS (Voice Engine commands)
    const cmdButtons = document.querySelectorAll('.btn-command');
    const laserCursor = document.getElementById('laserCursor');
    const confettiCanvas = document.getElementById('confettiCanvas');
    const blackoutOverlay = document.getElementById('blackoutOverlay');
    const restoreBtn = document.getElementById('restoreBtn');
    const curtainLeft = document.getElementById('curtainLeft');
    const curtainRight = document.getElementById('curtainRight');

    // State parameters for laser mode & confetti
    let laserActive = false;
    let confettiActive = false;
    let particles = [];

    // Voice Command HUD Button Clicks
    cmdButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const cmd = btn.getAttribute('data-cmd');
            triggerVoiceCommand(cmd);
        });
    });

    const triggerVoiceCommand = (cmd) => {
        // Clear active command states from button styles
        cmdButtons.forEach(b => b.classList.remove('active-cmd'));
        const activeBtn = document.querySelector(`.btn-command[data-cmd="${cmd}"]`);
        if (activeBtn) activeBtn.classList.add('active-cmd');

        switch(cmd) {
            case 'pena':
                addLog('Transkripsi Suara: "aktifkan pena"', 'action');
                activateLaserPointer();
                break;
            case 'konfeti':
                addLog('Transkripsi Suara: "tampilkan konfeti"', 'action');
                triggerConfettiEffect();
                break;
            case 'hitam':
                addLog('Transkripsi Suara: "layar hitam"', 'action');
                triggerBlackout(true);
                break;
            case 'tirai':
                addLog('Transkripsi Suara: "buka tirai"', 'action');
                triggerCurtainEffect();
                break;
            case 'zoom':
                addLog('Transkripsi Suara: "zoom fit"', 'action');
                triggerZoomFit();
                break;
            case 'normal':
                addLog('Transkripsi Suara: "kembali normal"', 'action');
                resetAllEffects();
                break;
        }
    };

    // A. "aktifkan pena" -> Cyber Laser Cursor follows pointer
    const activateLaserPointer = () => {
        laserActive = true;
        laserCursor.style.display = 'block';
        addLog('Pointer Laser aktif. Gerakkan kursor ke seluruh layar! (Mati otomatis dalam 10s)', 'success');
        
        const moveLaser = (e) => {
            laserCursor.style.left = `${e.clientX}px`;
            laserCursor.style.top = `${e.clientY}px`;
        };
        window.addEventListener('mousemove', moveLaser);
        
        // Auto disable after 10 seconds
        setTimeout(() => {
            window.removeEventListener('mousemove', moveLaser);
            laserCursor.style.display = 'none';
            laserActive = false;
            const btn = document.querySelector('.btn-command[data-cmd="pena"]');
            if (btn) btn.classList.remove('active-cmd');
            addLog('Pointer Laser dinonaktifkan (timeout 10s).');
        }, 10000);
    };

    // B. "tampilkan konfeti" -> Particle animation
    const triggerConfettiEffect = () => {
        confettiCanvas.style.display = 'block';
        confettiActive = true;
        
        // Setup confetti canvas size
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
        
        particles = [];
        const colors = ['#00F0FF', '#FFD700', '#ff0055', '#39ff14', '#ffffff'];
        
        // Generate particles
        for (let i = 0; i < 120; i++) {
            particles.push({
                x: Math.random() * confettiCanvas.width,
                y: Math.random() * -confettiCanvas.height,
                size: Math.random() * 8 + 5,
                color: colors[Math.floor(Math.random() * colors.length)],
                speedY: Math.random() * 4 + 2,
                speedX: Math.random() * 2 - 1,
                rotation: Math.random() * 360,
                rotSpeed: Math.random() * 4 - 2
            });
        }
        
        addLog('Memicu ledakan partikel konfeti...', 'success');
        animateConfetti();
        
        setTimeout(() => {
            confettiActive = false;
            confettiCanvas.style.display = 'none';
            const btn = document.querySelector('.btn-command[data-cmd="konfeti"]');
            if (btn) btn.classList.remove('active-cmd');
            addLog('Animasi konfeti selesai.');
        }, 6000);
    };

    const animateConfetti = () => {
        if (!confettiActive) return;
        const cCtx = confettiCanvas.getContext('2d');
        cCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        
        particles.forEach(p => {
            p.y += p.speedY;
            p.x += p.speedX;
            p.rotation += p.rotSpeed;
            
            cCtx.save();
            cCtx.translate(p.x, p.y);
            cCtx.rotate((p.rotation * Math.PI) / 180);
            cCtx.fillStyle = p.color;
            cCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
            cCtx.restore();
            
            // Loop particles if they hit bottom before timeout
            if (p.y > confettiCanvas.height) {
                p.y = -20;
                p.x = Math.random() * confettiCanvas.width;
            }
        });
        
        requestAnimationFrame(animateConfetti);
    };

    // C. "layar hitam" -> Blackout overlay
    const triggerBlackout = (state) => {
        if (state) {
            blackoutOverlay.classList.add('active');
            addLog('Layar gelap diaktifkan. Klik tombol kembalikan untuk memulihkan.', 'warning');
        } else {
            blackoutOverlay.classList.remove('active');
            addLog('Layar dipulihkan kembali.', 'success');
            const btn = document.querySelector('.btn-command[data-cmd="hitam"]');
            if (btn) btn.classList.remove('active-cmd');
        }
    };
    restoreBtn.addEventListener('click', () => triggerBlackout(false));

    // D. "buka tirai" -> Sliding screen panels
    const triggerCurtainEffect = () => {
        curtainLeft.classList.add('active');
        curtainRight.classList.add('active');
        addLog('Menutup tirai sistem...', 'info');
        
        // Hold for 1.5 seconds, then slide away
        setTimeout(() => {
            addLog('Membuka tirai siber kembali...', 'success');
            curtainLeft.classList.remove('active');
            curtainRight.classList.remove('active');
            
            const btn = document.querySelector('.btn-command[data-cmd="tirai"]');
            if (btn) btn.classList.remove('active-cmd');
        }, 2200);
    };

    // E. "zoom fit" -> Springs active project cards to focus view
    const triggerZoomFit = () => {
        addLog('Memfokuskan layout proyek utama (Zoom Fit)...', 'success');
        projectsGrid.style.transform = 'scale(1.05)';
        projectsGrid.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'; // bouncy spring
        
        setTimeout(() => {
            projectsGrid.style.transform = 'scale(1)';
            const btn = document.querySelector('.btn-command[data-cmd="zoom"]');
            if (btn) btn.classList.remove('active-cmd');
            addLog('Fokus dikembalikan ke ukuran normal.');
        }, 2500);
    };

    // F. Reset all interactive effects
    const resetAllEffects = () => {
        laserActive = false;
        laserCursor.style.display = 'none';
        confettiActive = false;
        confettiCanvas.style.display = 'none';
        blackoutOverlay.classList.remove('active');
        curtainLeft.classList.remove('active');
        curtainRight.classList.remove('active');
        projectsGrid.style.transform = 'scale(1)';
        
        cmdButtons.forEach(b => b.classList.remove('active-cmd'));
        addLog('Seluruh simulator efek dan gestur berhasil di-reset!', 'success');
    };
});
