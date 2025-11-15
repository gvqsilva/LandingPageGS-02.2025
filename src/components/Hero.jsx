import React from 'react';
import styled, { keyframes } from 'styled-components';
import Notebook from '/problem-work.jpg'; // ajuste o caminho se necessário

const HeroContainer = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5rem 10%;
  min-height: 100vh;
  background-color: #c9c9c9ff;
  color: #050505ff;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
  }
`;

const TextArea = styled.div`
  flex: 1;
`;

const Hello = styled.p`
  color: #079d6eff;
  font-weight: bold;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
`;

const Title = styled.h1`
  font-size: 2.65rem;
  margin: 0;
  font-weight: 750;
  color: #000000ff;
`;

const SubTitle = styled.h2`
  font-size: 1.1rem;
  font-weight: 400;
  color: #000000ff;
  margin-top: 1rem;
`;

const Button = styled.a`
  display: inline-block;
  margin-top: 2rem;
  padding: 0.75rem 2rem;
  border: 2px solid #00df9a;
  color: #00df9a;
  text-decoration: none;
  font-weight: 600;
  transition: 0.3s ease;

  &:hover {
    background-color: #00df9a;
    color: #000;
  }
`;

const ImageArea = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  position: relative;
`;

const moveImage = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-15px);
  }
  100% {
    transform: translateY(0);
  }
`;

const Circle = styled.div`
  background-color: #00df9a;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 0;

  @media (max-width: 768px) {
    width: 300px;
    height: 300px;
  }
`;

const Image = styled.img`
  max-width: 90%; /* Aumentado o tamanho da imagem */
  height: auto;
  z-index: 1;
  animation: ${moveImage} 2s ease-in-out infinite; /* Animação de movimento */
  border-radius: 150px;
`;

function Hero() {
  return (
    <HeroContainer>
      <TextArea>
        <Hello>Global Solution 02.2025</Hello>
        <Title>Transformando o Trabalho com Tecnologia</Title>
        <SubTitle>Soluções inteligentes para empresas e pessoas no novo mundo profissional.</SubTitle>
      </TextArea>

      <ImageArea>
        <Circle>
          <Image src={Notebook} alt="notebook com tecnologia" />
        </Circle>
      </ImageArea>
    </HeroContainer>
  );
}

export default Hero;
