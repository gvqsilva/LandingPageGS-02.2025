import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  padding: 1rem 2rem;
  background-color: #111;
  text-align: center;
  color: #777;
`;

function Footer() {
  return <FooterContainer>© 2025 por NextGen. Todos os direitos reservados.</FooterContainer>;
}

export default Footer;