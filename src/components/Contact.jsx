import React from 'react';
import styled from 'styled-components';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const TeamSection = styled.section`
  padding: 5rem 2rem;
  background-color: #121212;
  text-align: center;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.7);
  animation: fadeIn 1.5s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Heading = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #00df9a;
`;

const TeamGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2.5rem;
  justify-content: center;
  margin-top: 2rem;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 2rem;
    align-items: center;
  }
`;

const MemberCard = styled.div`
  background: #181818;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.18);
  padding: 2rem 2.5rem;
  min-width: 240px;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MemberName = styled.h3`
  color: #00df9a;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const MemberRole = styled.p`
  color: #ccc;
  font-size: 1.1rem;
  margin-bottom: 1.2rem;
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.2rem;
  flex-wrap: wrap;
`;

const SocialLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #ccc;
  font-size: 1.2rem;
  text-decoration: none;
  transition: color 0.3s, transform 0.3s;

  &:hover {
    color: #00df9a;
    transform: scale(1.05);
  }
`;

const teamMembers = [
  {
    name: 'Gabriel Vasquez',
    role: 'Engenheiro de Software',
    linkedin: 'https://www.linkedin.com/in/gabriel-vasquez-queiroz-da-silva-634b47277/',
    github: 'https://github.com/gvqsilva',
  },
  {
    name: 'Augusto Mendonça',
    role: 'Engenheiro de Software',
    linkedin: 'https://www.linkedin.com/in/augusto-mendon%C3%A7a-3740ab2b0/',
    github: 'https://github.com/gutomend',
  },
  {
    name: 'Gustavo Oliveira',
    role: 'Engenheiro de Software',
    linkedin: 'https://www.linkedin.com/in/gustavo-oliveira-a372a4308/',
    github: 'https://github.com/Gusta346',
  },
];

function Contact() {
  return (
    <TeamSection id='equipe'>
      <Heading>Equipe</Heading>
      <TeamGrid>
        {teamMembers.map((member) => (
          <MemberCard key={member.name}>
            <MemberName>{member.name}</MemberName>
            <MemberRole>{member.role}</MemberRole>
            <SocialLinks>
              <SocialLink href={member.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin size={22} />
                Linkedin
              </SocialLink>
              <SocialLink href={member.github} target="_blank" rel="noopener noreferrer">
                <FaGithub size={22} />
                GitHub
              </SocialLink>
            </SocialLinks>
          </MemberCard>
        ))}
      </TeamGrid>
    </TeamSection>
  );
}

export default Contact;
