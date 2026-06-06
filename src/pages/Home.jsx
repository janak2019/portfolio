import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Portfolio from "../components/Portfolio";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Blog from "./Blog";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Portfolio />
      <Contact />
      <Blog />
      <Footer />
    </>
  );
}

export default Home;