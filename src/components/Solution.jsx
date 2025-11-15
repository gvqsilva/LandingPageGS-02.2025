import React from 'react';
import styled from 'styled-components';

const AboutSection = styled.section`
  padding: 5rem 2rem;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(0, 223, 154, 0.15), rgba(44, 44, 44, 0.85));
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);

  &:before {
    content: '';
    position: absolute;
    top: -20%;
    left: -20%;
    width: 140%;
    height: 140%;
    background: radial-gradient(circle at 30% 30%, rgba(0, 223, 154, 0.3), transparent 70%);
    animation: pulse 8s infinite ease-in-out;
    z-index: 0;
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      opacity: 0.5;
    }
    50% {
      transform: scale(1.2);
      opacity: 0.2;
    }
  }

  @media (max-width: 900px) {
    padding: 4rem 1.5rem;
  }
`;

const FlexContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 3rem;
  margin-top: 2rem;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 2rem;
  }

  @media (max-width: 600px) {
    gap: 1rem;
    margin-top: 1rem;
  }
`;

const TextContainer = styled.div`
  flex: 1.2;
  text-align: left;
  min-width: 0;

  @media (max-width: 900px) {
    width: 100%;
    text-align: left;
  }

  @media (max-width: 600px) {
    font-size: 0.98rem;
    padding: 0;
  }
`;

const VideoContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 260px;
  background: rgba(0,223,154,0.07);
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.12);
  min-width: 0;

  @media (max-width: 900px) {
    width: 100%;
    min-height: 180px;
    margin-top: 0.5rem;
  }

  @media (max-width: 600px) {
    min-height: 120px;
    font-size: 1rem;
    padding: 0.5rem;
  }
`;

const Heading = styled.h2`
  font-size: 3rem;
  margin-bottom: 2rem;
  color: #fff;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-weight: 600;
  background: linear-gradient(90deg, #00df9a, #00ffcc);
  -webkit-background-clip: text;
  color: transparent;
  opacity: 0;
  animation: fadeIn 1.5s ease-out forwards;

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(-20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const Text = styled.p`
  max-width: 700px;
  margin: 0 auto;
  color: #ddd;
  font-size: 1.2rem;
  line-height: 1.8;
  font-weight: 400;
  opacity: 0;
  animation: fadeInText 1.8s ease-out forwards;
  animation-delay: 0.5s;

  @keyframes fadeInText {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

function Solution() {
  return (
    <AboutSection id="solucao">
      <Heading>A Solução</Heading>
      <FlexContainer>
        <TextContainer>
          <Text>
            GymFlowGS é uma plataforma de bem-estar corporativo que utiliza IA para ajudar colaboradores a cuidarem da saúde no dia a dia. O app oferece mini-treinos, lembretes inteligentes, monitoramento de atividades físicas, gestão de suplementação e um chat interativo que personaliza recomendações.
          </Text>
          <br/>
          <Text>
            De forma simples e acessível, o GymFlowGS melhora o bem-estar, aumenta a produtividade e prepara empresas para um ambiente de trabalho mais saudável e sustentável.
          </Text>
        </TextContainer>
        <VideoContainer>
          <video
            src="/1114.mp4"
            controls
            style={{ width: '100%', maxWidth: '150px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.12)' }}
            poster=""
          >
            Seu navegador não suporta vídeo.
          </video>
        </VideoContainer>
      </FlexContainer>
    </AboutSection>
  );
}

export default Solution;
