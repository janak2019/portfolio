import React, { useState, useEffect } from "react";
import "./Home.css";
import ProfilePic from "../../../src/assets/PorfilePic.png";

const Home = () => {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 } // trigger when 60% of section is visible
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Navbar */}
      <header className="navbar">
        <div className="logo">Janak Acharya</div>
        <nav className="nav-links">
          <a
            href="/"
            className={activeSection === "home" ? "active" : ""}
          >
            Home
          </a>
          <a
            href="#about"
            className={activeSection === "about" ? "active" : ""}
          >
            About
          </a>
          <a
            href="#skills"
            className={activeSection === "skills" ? "active" : ""}
          >
            Skills
          </a>
          <a
            href="#portfolio"
            className={activeSection === "portfolio" ? "active" : ""}
          >
            Portfolio
          </a>
          <a
            href="#contact"
            className={activeSection === "contact" ? "active" : ""}
          >
            Contact
          </a>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <h1>Hi, I'm <span>Janak Acharya</span></h1>
        <p>Full Stack Developer | Designer | Learner</p>
        <a href="#contact" className="btn">Hire Me</a>
      </section>

      {/* About Section */}
      <section id="about" className="about container">
        <img src={ProfilePic} alt="Profile Picture" className="profile-pic"/>
        <div className="bio">
          <h2>About Me</h2>
          <p>I'm a passionate web developer with experience in HTML, CSS, JavaScript, React, and responsive design. I love creating clean and modern web interfaces.</p>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills container">
        <h2>Skills</h2>
        <div className="skill-list">
          <div className="skill">HTML</div>
          <div className="skill">CSS</div>
          <div className="skill">JavaScript</div>
          <div className="skill">React</div>
          <div className="skill">Node.js</div>
        </div>
      </section>

      {/* Portfolio Section */}
<section id="portfolio" className="portfolio container">
  <h2>Portfolio</h2>
  <div className="projects-grid">
    <div className="project">Project 1</div>
    <div className="project">Project 2</div>
    <div className="project">Project 3</div>
    <div className="project">Project 4</div>
   
  </div>
</section>

      {/* Contact Section */}
      <section id="contact" className="contact container">
        <h2>Contact Me</h2>
        <form>
          <input type="text" placeholder="Your Name" required/>
          <input type="email" placeholder="Your Email" required/>
          <textarea placeholder="Your Message" required></textarea>
          <button type="submit" className="btn">Send Message</button>
        </form>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Janak Acharya. All Rights Reserved.</p>
      </footer>
    </>
  );
};

export default Home;
