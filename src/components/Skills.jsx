import React from 'react';
import styled from 'styled-components';
import { LineChart, Line, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
const trendsData = [
  { year: '2020', IA: 20, Automação: 15, SoftSkills: 40 },
  { year: '2030', IA: 35, Automação: 30, SoftSkills: 52 },
  { year: '2040', IA: 50, Automação: 45, SoftSkills: 60 },
  { year: '2050', IA: 65, Automação: 60, SoftSkills: 70 },
];

const TrendsChartContainer = styled.section`
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 4px 18px rgba(0,0,0,0.12);
  padding: 2.5rem 2rem;
  margin: 3rem auto 0 auto;
  max-width: 700px;
`;


function Skills() {
  return (
    <>
      <h1 id="skill" style={{ fontSize: '2.8rem', fontWeight: 'bold', color: '#00df9a', textAlign: 'center', margin: '2rem 0 0.5rem 0' }}>
        Habilidades do Futuro
      </h1>
      <TrendsChartContainer>
        <div style={{ width: '100%', height: '300px' }}>
          <ResponsiveContainer>
            <LineChart data={trendsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" stroke="#222" />
              <YAxis stroke="#222" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="IA" stroke="#00df9a" strokeWidth={3} />
              <Line type="monotone" dataKey="Automação" stroke="#222" strokeWidth={2} />
              <Line type="monotone" dataKey="SoftSkills" stroke="#7f8c8d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </TrendsChartContainer>
    </>
  );
}

export default Skills;
