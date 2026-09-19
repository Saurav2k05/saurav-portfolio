import { useEffect, useRef, useState } from "react";
import "./styles/PhotoScene.css";
import { useLoading } from "../../context/LoadingProvider";
import { setProgress } from "../Loading";
import { setAllTimeline } from "../utils/GsapScroll";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PhotoScene = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { setLoading } = useLoading();
  const [imgSrc, setImgSrc] = useState("/images/profile.jpg");

  // Loading animation lifecycle
  useEffect(() => {
    const progress = setProgress((value) => setLoading(value));

    // Finish loading smoothly so initialFX triggers
    const timer = setTimeout(() => {
      progress.loaded().then(() => {
        // Initialize page animations (such as career timeline)
        setAllTimeline();
      });
    }, 800);

    return () => {
      clearTimeout(timer);
      progress.clear();
    };
  }, [setLoading]);

  // Smooth 3D Mouse Parallax Tilt & Glare Tracking
  useEffect(() => {
    let animId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    const lerpFactor = 0.08;

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      // Normalized between -1 and 1
      targetX = (e.clientX - centerX) / centerX;
      targetY = (e.clientY - centerY) / centerY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        targetX = (touch.clientX - centerX) / centerX;
        targetY = (touch.clientY - centerY) / centerY;
      }
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const updateTilt = () => {
      // Lerp for smooth fluid momentum
      currentX += (targetX - currentX) * lerpFactor;
      currentY += (targetY - currentY) * lerpFactor;

      if (cardRef.current) {
        const rotateX = -currentY * 18; // Max 18deg tilt X
        const rotateY = currentX * 22; // Max 22deg tilt Y
        const translateX = currentX * 14;
        const translateY = currentY * 12;

        cardRef.current.style.transform = `perspective(1100px) rotateX(${rotateX.toFixed(
          2
        )}deg) rotateY(${rotateY.toFixed(2)}deg) translate3d(${translateX.toFixed(
          1
        )}px, ${translateY.toFixed(1)}px, 0)`;
      }

      if (glareRef.current) {
        const glareX = (currentX + 1) * 50;
        const glareY = (currentY + 1) * 50;
        glareRef.current.style.background = `radial-gradient(circle at ${glareX.toFixed(
          1
        )}% ${glareY.toFixed(
          1
        )}%, rgba(255, 255, 255, 0.45) 0%, rgba(251, 141, 255, 0.15) 35%, transparent 65%)`;
      }

      animId = requestAnimationFrame(updateTilt);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);

    animId = requestAnimationFrame(updateTilt);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // GSAP ScrollTrigger Integration to float out gracefully as user scrolls
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(containerRef.current, {
        scrollTrigger: {
          trigger: ".landing-section",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
        y: -120,
        opacity: 0,
        scale: 0.9,
        ease: "power2.out",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="photo-scene-container" ref={containerRef}>
      <div className="photo-card-wrapper" ref={cardRef}>
        {/* Ambient Backlight Rim / Aura */}
        <div className="photo-aura-glow"></div>
        <div className="photo-orbit-ring"></div>

        {/* Continuous organic levitation */}
        <div className="photo-floating-inner">
          <div className="photo-card-glass">
            {/* Cyber scanline texture */}
            <div className="photo-scanline"></div>

            {/* Specular Interactive Glare */}
            <div className="photo-glare-overlay" ref={glareRef}></div>

            {/* Profile Image */}
            <img
              src={imgSrc}
              alt="Saurav Jamadar"
              className="photo-image-element"
              onError={() => {
                // If public/images/profile.jpg not yet cached, fallback
                if (imgSrc !== "/images/placeholder.webp") {
                  setImgSrc("/images/placeholder.webp");
                }
              }}
            />

            {/* 3D Depth Floating Status Badge */}
            <div className="photo-badge-container">
              <div className="photo-badge-left">
                <div className="photo-badge-dot"></div>
                <div>
                  <div className="photo-badge-name">Saurav Jamadar</div>
                  <div className="photo-badge-role">Full Stack Developer</div>
                </div>
              </div>
              <div className="photo-badge-tag">MERN &bull; Java</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoScene;
