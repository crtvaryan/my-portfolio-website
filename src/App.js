import React, { useState, useEffect, useRef } from 'react';

// --- Custom Hook for Intersection Observer ---
const useIntersectionObserver = (options) => {
    const [entry, setEntry] = useState(null);
    const [node, setNode] = useState(null);

    const observer = useRef(null);

    useEffect(() => {
        if (observer.current) observer.current.disconnect();

        observer.current = new window.IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setEntry(entry);
                if (node && observer.current) {
                    observer.current.unobserve(node);
                }
            }
        }, options);

        const { current: currentObserver } = observer;
        if (node) currentObserver.observe(node);

        return () => {
            if (currentObserver) {
                currentObserver.disconnect();
            }
        };
    }, [node, options]);

    return [setNode, entry];
};

// --- Animated Component Wrapper ---
const AnimatedComponent = ({ children, animation, delay = '0s', className = '' }) => {
    const [ref, entry] = useIntersectionObserver({ threshold: 0.1 });
    const isVisible = !!entry;

    return (
        <div
            ref={ref}
            className={`animate-on-scroll ${animation} ${isVisible ? 'is-visible' : ''} ${className}`}
            style={{ transitionDelay: delay }}
        >
            {children}
        </div>
    );
};

// --- Section Components ---
const Hero = () => (
    <section id="hero" className="min-h-screen flex items-center justify-center overflow-hidden">
        <div className="container mx-auto px-6 text-center">
            <div className="max-w-4xl mx-auto">
                <AnimatedComponent animation="reveal-up">
                    <img
                        src="/logo.png"
                        alt="Video Editing Portfolio Logo"
                        className="mx-auto mb-6 w-full max-w-lg"
                    />
                </AnimatedComponent>
                <AnimatedComponent animation="reveal-up" delay="0.2s">
                    <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                        Transforming raw footage into compelling stories that captivate and engage.
                    </p>
                </AnimatedComponent>
                <AnimatedComponent animation="reveal-up" delay="0.4s">
                    <a href="#portfolio" className="hero-button">
                        View My Work
                    </a>
                </AnimatedComponent>
            </div>
        </div>
    </section>
);

const About = () => (
     <section id="about" className="py-20 overflow-hidden">
        <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-5 gap-12 items-center">
                <AnimatedComponent animation="slide-in-left" className="md:col-span-2 flex justify-center">
                    {/* UPDATED IMAGE SOURCE BELOW */}
                    <img src="/profile-photo.jpg" alt="Aryan, Video Editor" className="rounded-full w-64 h-64 md:w-80 md:h-80 object-cover shadow-lg" />
                </AnimatedComponent>
                <AnimatedComponent animation="slide-in-right" delay="0.2s" className="md:col-span-3">
                    <h2 className="text-3xl font-bold mb-4" style={{ color: 'var(--md-sys-color-on-secondary-container)' }}>About Me</h2>
                    <p className="text-gray-600 mb-6">
                        Hey, I’m Aryan — a passionate video editor blending creativity with storytelling. From cinematic match cuts and morph transitions to dreamcore aesthetics and VFX-heavy edits, I craft visuals that leave a lasting impact. Whether it’s a reel, short film, or full-blown commercial, I bring ideas to life with precision, emotion, and a love for pushing visual boundaries.
                    </p>
                    <div className="mt-8">
                        <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--md-sys-color-on-tertiary-container)' }}>Why You Should Hire Me:</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start"><span className="material-icons-outlined mr-3" style={{ color: 'var(--md-sys-color-tertiary)' }}>rocket_launch</span><div><strong className="block">Super fast delivery</strong><span className="text-gray-500">Meeting your deadlines without compromising quality.</span></div></li>
                            <li className="flex items-start"><span className="material-icons-outlined mr-3" style={{ color: 'var(--md-sys-color-tertiary)' }}>sentiment_very_satisfied</span><div><strong className="block">100% client satisfaction</strong><span className="text-gray-500">Your happiness is my top priority.</span></div></li>
                            <li className="flex items-start"><span className="material-icons-outlined mr-3" style={{ color: 'var(--md-sys-color-tertiary)' }}>sell</span><div><strong className="block">Affordable pricing</strong><span className="text-gray-500">Professional editing that fits your budget.</span></div></li>
                            <li className="flex items-start"><span className="material-icons-outlined mr-3" style={{ color: 'var(--md-sys-color-tertiary)' }}>rate_review</span><div><strong className="block">Open to feedback and revisions</strong><span className="text-gray-500">Collaborative process to achieve the perfect result.</span></div></li>
                            <li className="flex items-start"><span className="material-icons-outlined mr-3" style={{ color: 'var(--md-sys-color-tertiary)' }}>movie</span><div><strong className="block">Expert in motion graphics, VFX, reels</strong><span className="text-gray-500">Bringing dynamic and engaging visuals to your projects.</span></div></li>
                        </ul>
                    </div>
                </AnimatedComponent>
            </div>
        </div>
    </section>
);

const PortfolioCard = ({ videoSrc, title, description, price, priceBg, priceColor, delay }) => (
    <AnimatedComponent animation="reveal-up" delay={delay}>
        <div className="bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 h-full flex flex-col">
            <div className="w-full aspect-video">
                <iframe
                    className="w-full h-full"
                    src={videoSrc}
                    title={title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen>
                </iframe>
            </div>
            <div className="p-6 flex-grow flex flex-col">
                <h3 className="font-bold text-xl mb-2">{title}</h3>
                <p className="text-gray-600 mb-4 flex-grow">{description}</p>
                <div className="inline-block self-start rounded-full px-3 py-1 text-sm font-semibold" style={{ backgroundColor: priceBg, color: priceColor }}>
                    {price}
                </div>
            </div>
        </div>
    </AnimatedComponent>
);

const Portfolio = () => {
    const portfolioItems = [
        {
            videoSrc: "https://www.youtube.com/embed/oVtkuXaXRgQ",
            poster: "https://placehold.co/600x400/FFE8D8/502200?text=Educational+Video",
            title: "🎓 Course & Educational Videos",
            description: "Clean, structured, and engaging edits for online courses and training content.",
            price: "💰 Starting at ₹700/min",
            priceBg: 'var(--md-sys-color-primary-container)',
            priceColor: 'var(--md-sys-color-on-primary-container)'
        },
        {
            videoSrc: "https://www.youtube.com/embed/KHfhsyyjuOc", // FIXED: Converted from /shorts/ link
            poster: "https://placehold.co/600x400/EFEBE9/2D160C?text=3D+Animation",
            title: "🎬 3D Animation (Blender)",
            description: "High-quality 3D visuals and animations to bring concepts and stories to life.",
            price: "💰 Starting at ₹5,000/min",
            priceBg: 'var(--md-sys-color-secondary-container)',
            priceColor: 'var(--md-sys-color-on-secondary-container)'
        },
        {
            videoSrc: "https://www.youtube.com/embed/a0FQMUEgDPs", // FIXED: Converted from /shorts/ link
            poster: "https://placehold.co/600x400/E6E6B4/1C1D02?text=VFX+Editing",
            title: "✨ VFX Editing",
            description: "Seamless effects, compositing, and creative visuals for cinematic impact.",
            price: "💰 Starting at ₹4,000/min",
            priceBg: 'var(--md-sys-color-tertiary-container)',
            priceColor: 'var(--md-sys-color-on-tertiary-container)'
        },
        {
            videoSrc: "https://www.youtube.com/embed/60HHK5iqkJk",
            poster: "https://placehold.co/600x400/FFE8D8/502200?text=Shorts+%26+Reels",
            title: "📱 Shorts & Reels Editing",
            description: "Trendy, fast-paced edits optimized for Instagram, YouTube, and TikTok.",
            price: "💰 Starting at ₹2000/90sec",
            priceBg: 'var(--md-sys-color-primary-container)',
            priceColor: 'var(--md-sys-color-on-primary-container)'
        },
        {
            videoSrc: "https://www.youtube.com/embed/CrKoWJ3mDHI", // FIXED: Removed invalid angle brackets <>
            poster: "https://placehold.co/600x400/EFEBE9/2D160C?text=Event+Promos",
            title: "🎤 Event Promotional Videos",
            description: "Highlight reels, promos, and aftermovies that capture the energy of your event.",
            price: "💰 Starting at ₹2,000/min",
            priceBg: 'var(--md-sys-color-secondary-container)',
            priceColor: 'var(--md-sys-color-on-secondary-container)'
        },
        {
            videoSrc: "https://www.youtube.com/embed/placeholder_video_id", // Using a placeholder for the empty link
            poster: "https://placehold.co/600x400/E6E6B4/1C1D02?text=Motion+Graphics",
            title: "🎨 Motion Graphics",
            description: "Eye-catching titles, explainer animations, and graphic-driven content.",
            price: "💰 Starting at ₹2000/min",
            priceBg: 'var(--md-sys-color-tertiary-container)',
            priceColor: 'var(--md-sys-color-on-tertiary-container)'
        },
    ];

    return (
        <section id="portfolio" className="py-20 overflow-hidden">
            <div className="container mx-auto px-6">
                <AnimatedComponent animation="reveal-up">
                    <h2 className="text-3xl font-bold text-center mb-12" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>Portfolio Showcase</h2>
                </AnimatedComponent>
                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {portfolioItems.map((item, index) => (
                        <PortfolioCard key={index} {...item} delay={`${index * 0.1}s`} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const Brands = () => {
    const brandLogos = [
        "/brands/Prepfully.png",
        "/brands/digi.png",
        "/brands/ana.svg",
        "/brands/teztech.png",
        "/brands/rego.png",
        "/brands/Ecell.png",
    ];
    const loopedLogos = [...brandLogos, ...brandLogos];

    return (
        <section id="brands" className="py-20 overflow-hidden">
            <div className="container mx-auto px-6">
                <AnimatedComponent animation="reveal-up">
                    <h2 className="text-3xl font-bold text-center mb-12" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>Trusted by Leading Brands</h2>
                </AnimatedComponent>
                <AnimatedComponent animation="reveal-up" delay="0.2s">
                    <div className="slider relative w-full h-32 overflow-hidden before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-24 before:bg-gradient-to-r before:from-[#fffbfa] before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-24 after:bg-gradient-to-l after:from-[#fffbfa] after:to-transparent">
                        <div className="slide-track">
                            {loopedLogos.map((logo, index) => (
                                <div key={index} className="slide flex items-center justify-center p-8">
                                    <img src={logo} alt={`Brand Logo ${index + 1}`} className="h-12 w-auto grayscale hover:grayscale-0 transition-all duration-300" />
                                </div>
                            ))}
                        </div>
                    </div>
                </AnimatedComponent>
            </div>
        </section>
    );
};

const TestimonialCard = ({ quote, avatar, name, title, delay }) => (
    <AnimatedComponent animation="reveal-up" delay={delay}>
        <div className="p-8 rounded-xl h-full" style={{ backgroundColor: 'var(--md-sys-color-surface-variant)' }}>
            <p className="text-lg italic mb-6" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>"{quote}"</p>
            <div className="flex items-center">
                <img className="w-12 h-12 rounded-full mr-4" src={avatar} alt={`Avatar of ${name}`} />
                <div>
                    <p className="font-bold">{name}</p>
                    <p className="text-sm" style={{ color: 'var(--md-sys-color-outline)' }}>{title}</p>
                </div>
            </div>
        </div>
    </AnimatedComponent>
);

const Testimonials = () => {
    const testimonialsData = [
        { quote: "He made our teaching course videos with great professionalism, was super patient with revisions, really cared about the content quality, and always delivered on time. Honestly, one of the best experiences working with someone.", avatar: "/avatars/prepfully.jpg", name: "Shubham Jadav", title: "Product Manager, Prepfully" },
        { quote: "Incredible work on our promotional video. The motion graphics were stunning and perfectly captured our brand's energy. Highly recommended!", avatar: "/avatars/digimain.jpg", name: "Ankit Dhiman", title: "Founder, Digi Maintainer" },
        { quote: "He worked on our videos with full professionalism. Even when the video wasn’t ready, he always told the real reason and gave a clear new date. The best part I liked was his honesty and commitment really great to work with.", avatar: "/avatars/anatech.jpg", name: "Shubhas Sahu", title: "Founder, AnaTech" },
    ];

    return (
        <section id="testimonials" className="py-20 overflow-hidden">
            <div className="container mx-auto px-6">
                <AnimatedComponent animation="reveal-up">
                    <h2 className="text-3xl font-bold text-center mb-12" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>What My Clients Say</h2>
                </AnimatedComponent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonialsData.map((testimonial, index) => (
                        <TestimonialCard key={index} {...testimonial} delay={`${index * 0.2}s`} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const Contact = () => {
    const [status, setStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Sending...');
        const { name, email, message } = e.target.elements;

        try {
            const backendUrl = 'https://aryan-portfolio-server.onrender.com/api/contact';

            const response = await fetch(backendUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name.value,
                    email: email.value,
                    message: message.value,
                }),
            });
            
            const result = await response.text();
            setStatus(result);

            if (response.ok) {
                e.target.reset();
            }
        } catch (error) {
            console.error("Fetch error:", error);
            setStatus('Something went wrong. Please try again.');
        }
    };

    return (
        <section id="contact" className="py-20 overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                         <AnimatedComponent animation="reveal-up">
                            <h2 className="text-3xl font-bold" style={{ color: 'var(--md-sys-color-on-secondary-container)' }}>Get In Touch</h2>
                        </AnimatedComponent>
                        <AnimatedComponent animation="reveal-up" delay="0.1s">
                            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Have a project in mind? I'd love to hear from you. Let's discuss how I can help bring your vision to life.</p>
                        </AnimatedComponent>
                </div>
                <div className="grid md:grid-cols-2 gap-12 items-start">
                    <AnimatedComponent animation="slide-in-left">
                        <div className="space-y-8">
                                 <div className="flex items-start">
                                      <span className="material-icons-outlined text-3xl p-3 rounded-full" style={{backgroundColor: 'var(--md-sys-color-primary-container)', color: 'var(--md-sys-color-on-primary-container)'}}>email</span>
                                      <div className="ml-4">
                                          <h3 className="text-lg font-semibold">Email</h3>
                                          <p className="text-gray-600">My main inbox for all inquiries.</p>
                                          <a href="mailto:rajaryangupta1445@gmail.com" className="text-[var(--md-sys-color-primary)] font-semibold hover:underline">rajaryangupta1445@gmail.com</a>
                                      </div>
                                 </div>
                                 <div className="flex items-start">
                                      <span className="material-icons-outlined text-3xl p-3 rounded-full" style={{backgroundColor: 'var(--md-sys-color-primary-container)', color: 'var(--md-sys-color-on-primary-container)'}}>phone</span>
                                      <div className="ml-4">
                                          <h3 className="text-lg font-semibold">Phone</h3>
                                          <p className="text-gray-600">Available for calls 24/7</p>
                                          <a href="tel:+917909001445" className="text-[var(--md-sys-color-primary)] font-semibold hover:underline">+91 7909001445</a>
                                      </div>
                                 </div>
                        </div>
                        <div className="mt-12">
                            <h3 className="text-lg font-semibold mb-4">Follow Me</h3>
                            <div className="flex space-x-4">
                                <a href="https://www.instagram.com/raj_aryan_03?igsh=MTZraGs3Z2lmN3BuaA==" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-500 hover:text-[#E1306C] transition-colors duration-300">
                                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.585-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.585-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.585.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.058 1.644-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.059 1.689.073 4.948.073s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.073-4.948-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.441 1.441 1.441 1.441-.645 1.441-1.441-.645-1.44-1.441-1.44z"/>
                                    </svg>
                                </a>
                                <a href="https://www.linkedin.com/in/crtvaryan65" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-gray-500 hover:text-[#0A66C2] transition-colors duration-300">
                                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </AnimatedComponent>
                    <AnimatedComponent animation="slide-in-right" delay="0.2s">
                        <form onSubmit={handleSubmit} className="space-y-6 p-8 rounded-xl bg-white/50 shadow-lg backdrop-blur-sm border border-gray-200/50">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input type="text" id="name" name="name" required className="mt-1 block w-full px-4 py-2 bg-white/80 border border-gray-300 rounded-md shadow-sm focus:ring-[var(--md-sys-color-primary)] focus:border-[var(--md-sys-color-primary)]" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input type="email" id="email" name="email" required className="mt-1 block w-full px-4 py-2 bg-white/80 border border-gray-300 rounded-md shadow-sm focus:ring-[var(--md-sys-color-primary)] focus:border-[var(--md-sys-color-primary)]" />
                            </div>
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                                <textarea id="message" name="message" rows="4" required className="mt-1 block w-full px-4 py-2 bg-white/80 border border-gray-300 rounded-md shadow-sm focus:ring-[var(--md-sys-color-primary)] focus:border-[var(--md-sys-color-primary)]"></textarea>
                            </div>
                            <div>
                                <button type="submit" className="w-full hero-button">Send Message</button>
                            </div>
                            {status && <p className="text-center mt-4">{status}</p>}
                        </form>
                    </AnimatedComponent>
                </div>
            </div>
        </section>
    );
};


const Footer = () => (
    <footer className="bg-[var(--md-sys-color-surface-variant)]">
        <div className="container mx-auto px-6 py-4 text-center" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>
            <p>&copy; {new Date().getFullYear()} My Video Editing Portfolio. All Rights Reserved.</p>
        </div>
    </footer>
);

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');
    const navRef = useRef(null);
    const highlightRef = useRef(null);

    const navLinks = [
        { href: '#about', label: 'About Me', section: 'about' },
        { href: '#portfolio', label: 'Portfolio', section: 'portfolio' },
        { href: '#brands', label: 'Brands', section: 'brands' },
        { href: '#testimonials', label: 'Testimonials', section: 'testimonials' },
        { href: '#contact', label: 'Contact', section: 'contact' },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-50% 0px -50% 0px' }
        );

        const sections = document.querySelectorAll('section[id]');
        sections.forEach((section) => observer.observe(section));

        return () => sections.forEach((section) => {
            if (section) {
                observer.unobserve(section)
            }
        });
    }, []);

    useEffect(() => {
        const updateHighlight = () => {
            const activeLink = navRef.current?.querySelector('.nav-link.active');
            if (activeLink && highlightRef.current) {
                highlightRef.current.style.width = `${activeLink.offsetWidth}px`;
                highlightRef.current.style.height = `${activeLink.offsetHeight}py`;
                highlightRef.current.style.left = `${activeLink.offsetLeft}px`;
                highlightRef.current.style.opacity = '1';
            } else if (highlightRef.current) {
                highlightRef.current.style.opacity = '0';
            }
        };
        updateHighlight();
        window.addEventListener('resize', updateHighlight);
        return () => window.removeEventListener('resize', updateHighlight);
    }, [activeSection]);

    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <header id="home" className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
            <nav className="container mx-auto px-6 py-3">
                <div className="flex justify-between items-center">
                    <a href="#hero">
                        <img src="/logo.png" alt="CRTV ARYAN Logo" className="h-10 w-auto" />
                    </a>
                    <div id="desktop-nav-links" ref={navRef} className="hidden md:flex space-x-2 items-center relative">
                        <span id="nav-highlight" ref={highlightRef}></span>
                        {navLinks.map((link) => (
                            <a
                                key={link.section}
                                href={link.href}
                                data-section={link.section}
                                className={`nav-link px-4 py-2 rounded-full transition-colors duration-300 ${activeSection === link.section ? 'active' : ''}`}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                    <div className="md:hidden">
                        <button id="menu-btn" className="text-gray-600 focus:outline-none" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            <span className="material-icons-outlined">{isMenuOpen ? 'close' : 'menu'}</span>
                        </button>
                    </div>
                </div>
                <div id="mobile-menu" className={`${isMenuOpen ? 'block' : 'hidden'} md:hidden mt-4`}>
                    {navLinks.map((link) => (
                        <a
                            key={link.section}
                            href={link.href}
                            data-section={link.section}
                            onClick={handleLinkClick}
                            className="nav-link block py-2 px-4 text-sm text-gray-600 hover:bg-[var(--md-sys-color-primary-container)] rounded"
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            </nav>
        </header>
    );
};

// --- Main App Component ---
const App = () => {
    return (
        <div className="text-gray-800">
            <style>{`
                html {
                    scroll-behavior: smooth;
                }
                body {
                    font-family: 'Inter', sans-serif;
                    background: radial-gradient(ellipse at 50% -50%, #FFE8D8, #fffbfa);
                    overflow-x: hidden;
                }
                :root {
                    --md-sys-color-primary: #F97316;
                    --md-sys-color-on-primary: #FFFFFF;
                    --md-sys-color-primary-container: #FFE8D8;
                    --md-sys-color-on-primary-container: #502200;
                    --md-sys-color-secondary: #795548;
                    --md-sys-color-on-secondary: #FFFFFF;
                    --md-sys-color-secondary-container: #EFEBE9;
                    --md-sys-color-on-secondary-container: #2D160C;
                    --md-sys-color-tertiary: #60623B;
                    --md-sys-color-on-tertiary: #FFFFFF;
                    --md-sys-color-tertiary-container: #E6E6B4;
                    --md-sys-color-on-tertiary-container: #1C1D02;
                    --md-sys-color-surface-variant: #F3EFEF;
                    --md-sys-color-on-surface-variant: #4F4539;
                    --md-sys-color-outline: #817567;
                }
                .animate-on-scroll {
                    opacity: 0;
                    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
                }
                .animate-on-scroll.is-visible {
                    opacity: 1;
                    transform: none;
                }
                .reveal-up { transform: translateY(40px); }
                .reveal-up.is-visible { transform: translateY(0); }
                .slide-in-left { transform: translateX(-50px); }
                .slide-in-left.is-visible { transform: translateX(0); }
                .slide-in-right { transform: translateX(50px); }
                .slide-in-right.is-visible { transform: translateX(0); }
                .hero-button {
                    position: relative;
                    overflow: hidden;
                    display: inline-block;
                    padding: 1rem 2rem;
                    border-radius: 9999px;
                    font-weight: 600;
                    border: 2px solid var(--md-sys-color-primary);
                    color: var(--md-sys-color-primary);
                    transition: color 0.4s ease-in-out;
                    z-index: 1;
                    text-decoration: none;
                }
                .hero-button::before {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 0;
                    background-color: var(--md-sys-color-primary);
                    transition: height 0.4s ease-in-out;
                    z-index: -1;
                }
                .hero-button:hover {
                    color: var(--md-sys-color-on-primary);
                }
                .hero-button:hover::before {
                    height: 100%;
                }
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(calc(-250px * 7))}
                }
                .slider .slide-track {
                    animation: scroll 40s linear infinite;
                    display: flex;
                    width: calc(250px * 14);
                }
                .slider .slide {
                    width: 250px;
                }
                ::-webkit-scrollbar { width: 8px; }
                ::-webkit-scrollbar-track { background: #fffbfa; }
                ::-webkit-scrollbar-thumb {
                    background: var(--md-sys-color-primary-container);
                    border-radius: 10px;
                }
                ::-webkit-scrollbar-thumb:hover { background: var(--md-sys-color-primary); }
                .nav-link.active { color: var(--md-sys-color-on-primary); }
                #nav-highlight {
                    position: absolute;
                    background-color: var(--md-sys-color-primary);
                    border-radius: 9999px;
                    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
                    z-index: -1;
                }
            `}</style>
            <Header />
            <main>
                <Hero />
                <About />
                <Portfolio />
                <Brands />
                <Testimonials />
                <Contact />
            </main>
            <Footer />
        </div>
    );
};

export default App;

