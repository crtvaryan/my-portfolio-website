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
                    <img src="https://placehold.co/400x400/FFE8D8/502200?text=Profile+Pic" alt="Profile Picture" className="rounded-full w-64 h-64 md:w-80 md:h-80 object-cover shadow-lg" />
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

const PortfolioCard = ({ videoSrc, poster, title, description, price, priceBg, priceColor, delay }) => (
    <AnimatedComponent animation="reveal-up" delay={delay}>
        <div className="bg-white rounded-xl shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 h-full flex flex-col">
            <video className="w-full aspect-video" controls poster={poster} src={videoSrc}>
                Your browser does not support the video tag.
            </video>
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
        { videoSrc: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4", poster: "https://placehold.co/600x400/FFE8D8/502200?text=Talking+Head", title: "Talking Head Videos", description: "Simple text + best for edu videos + color grading + sfx.", price: "Rs500/min", priceBg: 'var(--md-sys-color-primary-container)', priceColor: 'var(--md-sys-color-on-primary-container)' },
        { videoSrc: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", poster: "https://placehold.co/600x400/EFEBE9/2D160C?text=Motion+Graphics", title: "Motion Graphics", description: "Dynamic animations to bring your brand's story to life.", price: "$250/min", priceBg: 'var(--md-sys-color-secondary-container)', priceColor: 'var(--md-sys-color-on-secondary-container)' },
        { videoSrc: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", poster: "https://placehold.co/600x400/E6E6B4/1C1D02?text=CGI+Ads", title: "CGI Ads", description: "High-impact CGI for commercials that stand out.", price: "$500/min", priceBg: 'var(--md-sys-color-tertiary-container)', priceColor: 'var(--md-sys-color-on-tertiary-container)' },
        { videoSrc: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4", poster: "https://placehold.co/600x400/FFE8D8/502200?text=VFX", title: "VFX", description: "Seamless visual effects for a cinematic look.", price: "$400/min", priceBg: 'var(--md-sys-color-primary-container)', priceColor: 'var(--md-sys-color-on-primary-container)' },
        { videoSrc: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4", poster: "https://placehold.co/600x400/EFEBE9/2D160C?text=Shorts+%26+Reels", title: "Shorts and Reels", description: "Trendy, fast-paced edits for social media dominance.", price: "$100/min", priceBg: 'var(--md-sys-color-secondary-container)', priceColor: 'var(--md-sys-color-on-secondary-container)' },
        { videoSrc: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4", poster: "https://placehold.co/600x400/E6E6B4/1C1D02?text=Event+Coverage", title: "Event Coverage", description: "Capturing the energy and key moments of your events.", price: "$200/min", priceBg: 'var(--md-sys-color-tertiary-container)', priceColor: 'var(--md-sys-color-on-tertiary-container)' },
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
        "https://placehold.co/150x50/cccccc/333333?text=Prepfully",
        "https://placehold.co/150x50/cccccc/333333?text=Brand+B",
        "https://placehold.co/150x50/cccccc/333333?text=Brand+C",
        "https://placehold.co/150x50/cccccc/333333?text=Brand+D",
        "https://placehold.co/150x50/cccccc/333333?text=Brand+E",
        "https://placehold.co/150x50/cccccc/333333?text=Brand+F",
        "https://placehold.co/150x50/cccccc/333333?text=Brand+G",
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
        { quote: "The final video exceeded all our expectations. The editing was seamless, creative, and delivered right on schedule. An absolute professional!", avatar: "https://i.pravatar.cc/150?img=1", name: "Jane Doe", title: "Marketing Director, TechCorp" },
        { quote: "Incredible work on our promotional video. The motion graphics were stunning and perfectly captured our brand's energy. Highly recommended!", avatar: "https://i.pravatar.cc/150?img=2", name: "John Smith", title: "Founder, Creative Startup" },
        { quote: "The best video editor I've worked with. Fast, responsive, and incredibly talented. The reels for our social media have been a huge hit.", avatar: "https://i.pravatar.cc/150?img=3", name: "Sarah Lee", title: "Content Creator" },
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
            const response = await fetch('http://localhost:5000/api/contact', {
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
                               <a href="#" className="text-gray-500 hover:text-[#E1306C] transition-colors duration-300"><svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c-4.04.004-4.852.018-6.54.096C2.93 2.22 2.22 2.93 2.096 4.769c-.078 1.688-.092 2.5-.096 6.54s.018 4.852.096 6.54c.124 1.839.834 2.549 2.67 2.67 1.688.078 2.5.092 6.54.096s4.852-.018 6.54-.096c1.839-.121 2.549-.831 2.67-2.67.078-1.688-.092-2.5.096-6.54s-.018-4.852-.096-6.54C21.07 2.93 20.36 2.22 18.52 2.096 16.832 2.018 16.015 2 12.315 2zm0 1.802c4.002 0 4.74.016 6.41.094 1.456.068 2.036.29 2.426.68.39.39.612.97.68 2.426.078 1.67.094 2.408.094 6.41s-.016 4.74-.094 6.41c-.068 1.456-.29 2.036-.68 2.426-.39.39-.97.612-2.426.68-1.67.078-2.408.094-6.41.094s-4.74-.016-6.41-.094c-1.456-.068-2.036-.29-2.426-.68-.39-.39-.612-.97-.68-2.426-.078-1.67-.094-2.408-.094-6.41s.016-4.74.094-6.41c.068-1.456.29-2.036.68-2.426.39-.39.97-.612 2.426.68C7.575 3.818 8.313 3.802 12.315 3.802zM12 7.25a4.75 4.75 0 100 9.5 4.75 4.75 0 000-9.5zM12 15a3 3 0 110-6 3 3 0 010 6zm6.15-8.25a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z" clipRule="evenodd" /></svg></a>
                               <a href="#" className="text-gray-500 hover:text-[#FF0000] transition-colors duration-300"><svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M19.802 5.576a2.47 2.47 0 00-1.743-1.743C16.538 3.5 12 3.5 12 3.5s-4.538 0-6.059.333a2.47 2.47 0 00-1.743 1.743C3.867 7.114 3.5 9.562 3.5 12s.367 4.886 7.7 6.424a2.47 2.47 0 001.743 1.743C13.462 20.5 18 20.5 18 20.5s4.538 0 6.059-.333a2.47 2.47 0 001.743-1.743c.333-1.538.333-3.986.333-6.424s-.367-4.886-.7-6.424zM9.5 15.5V8.5l6.5 3.5-6.5 3.5z" clipRule="evenodd" /></svg></a>
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
                highlightRef.current.style.height = `${activeLink.offsetHeight}px`;
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
                    <a href="#hero" className="text-2xl font-bold" style={{ color: 'var(--md-sys-color-primary)' }}>
                        CRTV ARYAN.
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
                    <div className="md-hidden">
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
                .slider:hover .slide-track {
                    animation-play-state: paused;
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

