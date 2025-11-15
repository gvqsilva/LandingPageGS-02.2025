import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Solution from './components/Solution';
import Contact from './components/Contact';
import Footer from './components/Footer';
import GlobalStyle from './styles/GlobalStyle';
import Skills from './components/Skills';
import ChatBot from './components/ChatBot';

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Solution />
      <Contact />
      <Footer />
      <ChatBot />
    </>
  );
}

export default App;