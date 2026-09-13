import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Java Development Trainee</h4>
                <h5>R3 Sys India Pvt. Ltd.</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Completed industry-oriented industrial training in Core Java, Advanced Java,
              JDBC, Servlets, and JSP. Built database-driven web applications with MySQL,
              implementing robust backend business logic, authentication, and CRUD functionalities.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Hackathon Runner-Up</h4>
                <h5>Inter-College Hackathon</h5>
              </div>
              <h3>2024</h3>
            </div>
            <p>
              Secured Runner-Up Position in an Inter-College Hackathon for developing
              an innovative full-stack software solution under competitive time constraints,
              applying high-performance software engineering best practices.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech in Computer Eng.</h4>
                <h5>R.C. Patel Institute of Tech</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Pursuing B.Tech (2023–2027) while maintaining a high CGPA of 8.48/10.
              Specializing in Data Structures & Algorithms, System Design, Operating Systems,
              Database Systems, and MERN & Java Full Stack development.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
