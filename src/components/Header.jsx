import React, { useState } from 'react';
import styled from 'styled-components';
import { FiMenu, FiX, FiGithub, FiLinkedin } from 'react-icons/fi';

const Nav = styled.nav`
  padding: 1.5rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #0d0d0d;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.7);
`;

const Logo = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #00df9a;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;

  a {
    text-decoration: none;
    color: inherit;
  }

  &:hover {
    color: #00ffb3;
    transition: color 0.3s ease;
  }

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Menu = styled.ul`
  display: flex;
  gap: 2rem;
  list-style: none;
  align-items: center;

  li {
    color: #ccc;
    transition: all 0.3s ease-in-out;
    position: relative;

    &:hover {
      color: #00df9a;
      cursor: pointer;
    }

    &:after {
      content: '';
      position: absolute;
      width: 0%;
      height: 2px;
      background: #00df9a;
      left: 0;
      bottom: -4px;
      transition: width 0.3s ease-in-out;
    }

    &:hover:after {
      width: 100%;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #1a1a1a;
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 100%;
    padding-top: 5rem;
    z-index: 999;
    transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(100%)')};
    transition: transform 0.3s ease-in-out;
  }
`;

const MenuIcon = styled.div`
  display: none;
  font-size: 2rem;
  color: #00df9a;
  cursor: pointer;
  z-index: 1001;

  @media (max-width: 768px) {
    display: block;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;

  a {
    color: #00df9a;
    font-size: 1.5rem;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.2);
      color: #00ffb3;
    }
  }

  @media (max-width: 768px) {
    flex-direction: row;
    margin-top: 2rem;
  }
`;

const DesktopIcons = styled(SocialIcons)`
  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileIcons = styled(SocialIcons)`
  display: none;

  @media (max-width: 768px) {
    display: flex;
  }
`;

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <Nav>
      <Logo><a href="#inicio">NextGen</a></Logo>

      <MenuIcon onClick={() => setOpen(!open)}>
        {open ? <FiX /> : <FiMenu />}
      </MenuIcon>

      <Menu open={open}>
        <li onClick={() => {
          document.getElementById('sobre').scrollIntoView({ behavior: 'smooth' });
          setOpen(false);
        }}>Sobre</li>
        <li onClick={() => {
          document.getElementById('skill').scrollIntoView({ behavior: 'smooth' });
          setOpen(false);
        }}>Habilidades</li>
        <li onClick={() => {
          document.getElementById('projeto').scrollIntoView({ behavior: 'smooth' });
          setOpen(false);
        }}>Projetos</li>
        <li onClick={() => {
          document.getElementById('solucao').scrollIntoView({ behavior: 'smooth' });
          setOpen(false);
        }}>Solução</li>
        <li onClick={() => {
          document.getElementById('contato').scrollIntoView({ behavior: 'smooth' });
          setOpen(false);
        }}>Equipe</li>

        {/*
        <MobileIcons>
          <a href="https://github.com/gvqsilva" target="_blank" rel="noopener noreferrer"><FiGithub /></a>
          <a href="https://linkedin.com/in/gabriel-vasquez-queiroz-da-silva-634b47277/" target="_blank" rel="noopener noreferrer"><FiLinkedin /></a>
        </MobileIcons>
        */}
      </Menu>

      {/*
      <DesktopIcons>
        <a href="https://github.com/gvqsilva" target="_blank" rel="noopener noreferrer"><FiGithub /></a>
        <a href="https://linkedin.com/in/gabriel-vasquez-queiroz-da-silva-634b47277/" target="_blank" rel="noopener noreferrer"><FiLinkedin /></a>
      </DesktopIcons>
      */}
    </Nav>
  );
}

export default Header;
