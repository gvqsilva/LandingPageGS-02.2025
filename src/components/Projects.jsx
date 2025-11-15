import React, { useState } from 'react';
import styled from 'styled-components';
import { FaGithub, FaGlobe } from 'react-icons/fa';

const ProjectsSection = styled.section`
  padding: 6rem 2rem;
  text-align: center;
  background: #0d0d0d;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.6);
`;

const Heading = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 3rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 600;
  background: linear-gradient(90deg, #00df9a, #00ffcc);
  -webkit-background-clip: text;
  color: transparent;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  margin-top: 2rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CenterButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2.5rem;
`;

const ShowMoreButton = styled.button`
  background: linear-gradient(90deg, #00df9a, #00ffcc);
  color: #222;
  font-size: 1.2rem;
  font-weight: 600;
  border: none;
  border-radius: 30px;
  padding: 0.8rem 2.5rem;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.18);
  transition: background 0.2s, transform 0.2s;
  margin-bottom: 1rem;

  &:hover {
    background: linear-gradient(90deg, #00ffcc, #00df9a);
    transform: scale(1.05);
  }
`;

const CardLink = styled.a`
  text-decoration: none;
  position: relative;
  display: block;
  border-radius: 12px;
  overflow: hidden;
`;

const Card = styled.div`
  background-color: #2a2a2a;
  padding: 0;
  border-radius: 12px;
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  position: relative;
  z-index: 1;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3);
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 130px;
  object-fit: cover;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`;

const CardContent = styled.div`
  padding: 1.2rem 1rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1.8rem;
  color: #00df9a;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const ProjectDesc = styled.p`
  color: #ccc;
  font-size: 1rem;
  line-height: 1.6;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(13, 13, 13, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  z-index: 2;

  ${CardLink}:hover & {
    opacity: 1;
  }
`;

const GithubIcon = styled(FaGithub)`
  color: #00df9a;
  font-size: 3rem;
  transition: transform 0.3s ease;

  ${CardLink}:hover & {
    transform: scale(1.2);
  }
`;

const WebIcon = styled(FaGlobe)`
  color: #00df9a;
  font-size: 3rem;
  transition: transform 0.3s ease;

  ${CardLink}:hover & {
    transform: scale(1.2);
  }
`;

const mainProjects = [
  {
    link: "#",
    alt: "Agile Methodology",
    title: "Agile Methodology",
    desc: "Sistema com ESP32 e sensores que envia dados ao FIWARE. Dashboard em Python permite visualização e análise com controle via Postman.",
    icon: <GithubIcon />,
  },
  {
    link: "#",
    alt: "Data Science",
    title: "Data Science",
    desc: "Projeto criado para consultar de fichas de treino e ver a suplementação, acabou virando um diário de atleta, para ajudar a monitorar atividades esportivas.",
    icon: <GithubIcon />,
  },
  {
    link: "#",
    alt: "DDD - Java",
    title: "DDD - Java",
    desc: "Plataforma completa sobre automobilismo com categorias, notícias, equipes e pilotos. Interface moderna, intuitiva e responsiva.",
    icon: <WebIcon />,
  },
];

const extraProjects = [
  {
    link: "#",
    alt: "Database",
    title: "Database",
    desc: "Site pessoal com design responsivo, animações e integração com redes sociais.",
    icon: <GithubIcon />,
  },
  {
    link: "#",
    alt: "Dynamic Programming",
    title: "Dynamic Programming",
    desc: "Aplicativo para monitoramento de consumo sustentável e dicas ecológicas.",
    icon: <GithubIcon />,
  },
  {
    link: "#",
    alt: "Network Architect",
    title: "Network Architect",
    desc: "Ferramenta para controle de gastos, metas e relatórios financeiros.",
    icon: <GithubIcon />,
  },
  {
    link: "#",
    alt: "AR/VR Modelling",
    title: "AR/VR Modelling",
    desc: "Ferramenta para controle de gastos, metas e relatórios financeiros.",
    icon: <GithubIcon />,
  },
];

function Projects() {
  const [showAll, setShowAll] = useState(false);

  const projectsToShow = showAll ? [...mainProjects, ...extraProjects] : mainProjects;

  return (
    <ProjectsSection id="projeto">
      <Heading>Projetos Realizados:</Heading>
      <ProjectsGrid>
        {projectsToShow.map((proj, idx) => (
          <CardLink href={proj.link} target="_blank" rel="noopener noreferrer" key={proj.title}>
            <Card>
              <CardContent>
                <ProjectTitle>{proj.title}</ProjectTitle>
                <ProjectDesc>{proj.desc}</ProjectDesc>
              </CardContent>
              <Overlay>{proj.icon}</Overlay>
            </Card>
          </CardLink>
        ))}
      </ProjectsGrid>
      <CenterButtonContainer>
        {!showAll ? (
          <ShowMoreButton onClick={() => setShowAll(true)}>
            Ver mais
          </ShowMoreButton>
        ) : (
          <ShowMoreButton onClick={() => setShowAll(false)}>
            Ver menos
          </ShowMoreButton>
        )}
      </CenterButtonContainer>
    </ProjectsSection>
  );
}

export default Projects;
