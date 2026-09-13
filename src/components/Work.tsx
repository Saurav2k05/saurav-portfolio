import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Work = () => {
  useGSAP(() => {
    function calculateTranslateX() {
      const boxes = document.querySelectorAll<HTMLElement>(".work-box");
      const container = document.querySelector<HTMLElement>(".work-container");
      if (!boxes.length || !container) return 0;

      const firstBox = boxes[0];
      const boxWidth = firstBox.offsetWidth;
      const totalWidth = boxWidth * boxes.length;
      const parentWidth = container.offsetWidth;
      const rectLeft = container.getBoundingClientRect().left;
      const padding = (parseInt(window.getComputedStyle(firstBox).paddingLeft) || 80) / 2;

      return Math.max(0, totalWidth - (rectLeft + parentWidth) + padding + 150);
    }

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: () => `+=${calculateTranslateX()}`,
        scrub: 1,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: () => -calculateTranslateX(),
      ease: "none",
    });

    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);
  const projects = [
    {
      title: "AgriConnect",
      category: "Farmer Marketplace & Advisory",
      tools: "React.js, Node.js, Express.js, MongoDB, REST APIs",
      image: "/images/agriconnect.jpg",
      link: "https://github.com/Saurav2k05",
    },
    {
      title: "Project Sanction",
      category: "Java Full Stack Proposal System",
      tools: "Java, Servlets, JSP, MySQL, Role-Based Auth",
      image: "/images/sanction_dashboard.jpg",
      link: "https://github.com/Saurav2k05",
    },
    {
      title: "Enterprise Web App",
      category: "Java Backend & Database Platform",
      tools: "Core Java, JDBC, Servlets, MySQL, CRUD Systems",
      image: "/images/enterprise_portal.jpg",
      link: "https://github.com/Saurav2k05",
    },
    {
      title: "Hackathon Prototype",
      category: "Inter-College Runner-Up Solution",
      tools: "MERN Stack, Real-Time APIs, Modern UI/UX",
      image: "/images/hackathon_app.jpg",
      link: "https://github.com/Saurav2k05",
    },
  ];

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project, index) => (
            <div className="work-box" key={index}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>

                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.category}</p>
                  </div>
                </div>
                <h4>Tools and features</h4>
                <p>{project.tools}</p>
              </div>
              <WorkImage image={project.image} alt={project.title} link={project.link} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
