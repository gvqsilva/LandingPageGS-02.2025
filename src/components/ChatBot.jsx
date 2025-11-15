import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FiMessageSquare, FiSend, FiX, FiMic } from 'react-icons/fi';
import { motion } from 'framer-motion';

/* =========================
   Styled components (visual do segundo código)
   ========================= */
const ChatBotButton = styled.button`
  position: fixed;
  bottom: 32px;
  right: 32px;
  background: #00df9a;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  box-shadow: 0 4px 16px rgba(0,0,0,0.18);
  cursor: pointer;
  z-index: 9999;
  transition: background 0.2s;
  &:hover { background: #00ffb3; }
`;

const ChatWindow = styled.div`
  position: fixed;
  bottom: 100px;
  right: 32px;
  width: 320px;
  max-width: 95vw;
  background: #181818;
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.25);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ChatHeader = styled.div`
  background: #00df9a;
  color: #222;
  padding: 0.75rem 1rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

const HeaderLeft = styled.div`
  display:flex;
  align-items:center;
  gap:0.6rem;
`;

const ChatBody = styled.div`
  flex: 1;
  padding: 1rem;
  background: #181818;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  max-height: 300px;
`;

const ChatInputArea = styled.form`
  display: flex;
  padding: 0.7rem 1rem;
  background: #222;
  gap: 0.6rem;
  align-items:center;
`;

const ChatInput = styled.input`
  flex: 1;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  background: #333;
  color: #fff;
`;

const IconButton = styled.button`
  background: transparent;
  border: none;
  color: #fff;
  cursor: pointer;
  display:flex;
  align-items:center;
  justify-content:center;
  padding: 0.25rem;
`;

const SendButton = styled.button`
  background: #00df9a;
  color: #222;
  border: none;
  border-radius: 8px;
  padding: 0.45rem 0.9rem;
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  &:hover { background: #00ffb3; }
`;

const MessageBubble = styled.div`
  align-self: ${({ fromUser }) => (fromUser ? 'flex-end' : 'flex-start')};
  background: ${({ fromUser }) => (fromUser ? '#00df9a' : '#222')};
  color: ${({ fromUser }) => (fromUser ? '#222' : '#fff')};
  padding: 0.6rem 1rem;
  border-radius: 12px;
  max-width: 80%;
  font-size: 0.95rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.10);
`;

/* Avatar wrapper (small) */
const AvatarWrapper = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 999px;
  display:flex;
  align-items:center;
  justify-content:center;
`;

/* =========================
   Fixed responses (fallback)
   ========================= */
const fixedResponses = [
  {
    keywords: ['oi', 'olá', 'hello', 'bom dia', 'boa tarde', 'boa noite'],
    response: 'Olá! Como posso ajudar você hoje?'
  },
  {
    keywords: ['projeto', 'projetos'],
    response: 'Você pode ver meus projetos na seção "Projetos" ou acessar meu GitHub!'
  },
  {
    keywords: ['equipe'],
    response: 'Você pode me encontrar no LinkedIn ou GitHub, ou ver a equipe na seção correspondente.'
  },
  {
    keywords: ['solução', 'gymflow'],
    response:
      'A solução GymFlowGS é uma plataforma de bem-estar corporativo que utiliza inteligência artificial para ajudar colaboradores a cuidarem da saúde no dia a dia. O aplicativo oferece mini-treinos, lembretes inteligentes, monitoramento de atividades físicas, gestão de suplementação e um chat interativo que personaliza recomendações. De forma simples e acessível, o GymFlowGS melhora o bem-estar, aumenta a produtividade e prepara empresas para um ambiente de trabalho mais saudável e sustentável.'
  },
  {
    keywords: ['obrigado', 'valeu', 'thanks'],
    response: 'De nada! Se precisar de mais alguma coisa, é só perguntar.'
  },
];

function getBotResponse(message) {
  const msg = message.toLowerCase();
  for (const item of fixedResponses) {
    if (item.keywords.some(k => msg.includes(k))) {
      return item.response;
    }
  }
  return null;
}

/* =========================
   Componente principal
   ========================= */
export default function ChatBot() {
  const [open, setOpen] = useState(false);

  // messages format: { from: 'bot'|'user', text: string }
  const [messages, setMessages] = useState([
      { 
        from: 'bot', 
        text: 'Olá! Sou o Sync, sua conexão com o amanhã.' 
      },
      { 
        from: 'bot', 
        text: '• Veja o trabalho em 2020, 2030, 2040 ou 2050' 
      },
      { 
        from: 'bot', 
        text: '• Digite "solução" para ver sobre o GymFlow' 
      },
      { 
        from: 'bot', 
        text: '• Veja sobre Projetos e Equipe' 
      },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  // Sync conversation control
  const [lastFollowUp, setLastFollowUp] = useState(null);
  const [awaitingResponse, setAwaitingResponse] = useState(null); // "yesno" | "year" | null

  const chatBodyRef = useRef(null);
  const recognitionRef = useRef(null);

  /* -------------------------
     SpeechRecognition setup
     ------------------------- */
  useEffect(() => {
    const win = typeof window !== 'undefined' ? window : null;
    if (!win) return;
    const Rec = win.webkitSpeechRecognition || win.SpeechRecognition || null;
    if (!Rec) return;
    const rec = new Rec();
    rec.continuous = false;
    rec.lang = 'pt-BR';
    rec.interimResults = false;
    rec.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      handleSend(null, transcript);
    };
    rec.onend = () => setListening(false);
    recognitionRef.current = rec;
    // cleanup
    return () => {
      try {
        rec.onresult = null;
        rec.onend = null;
      } catch (e) {}
    };
  }, []);

  /* -------------------------
     TTS speak
     ------------------------- */
  function speak(text) {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        const utter = new SpeechSynthesisUtterance(text);
        utter.lang = 'pt-BR';
        utter.rate = 1.5;
        setSpeaking(true);
        utter.onend = () => setSpeaking(false);
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utter);
      } catch (e) {
        // ignore
      }
    }
  }

  /* -------------------------
     Start listening
     ------------------------- */
  function startListening() {
    const rec = recognitionRef.current;
    if (!rec) return;
    setListening(true);
    try {
      rec.start();
    } catch (e) {
      // some browsers throw if start called twice
      setListening(false);
    }
  }

  /* -------------------------
     Handle send / Sync logic
     ------------------------- */
  function handleSend(e, overrideText) {
    if (e && e.preventDefault) e.preventDefault();
    const raw = (overrideText ?? input).trim();
    if (!raw) return;
    const textLower = raw.toLowerCase();
    const userMsg = { from: 'user', text: raw };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      // first check fixedResponses fallback
      const fixed = getBotResponse(raw);
      if (fixed && awaitingResponse == null && /^(?!.*\b20|2030|2040|2050\b).*$/i.test(raw)) {
        // If it's a simple keyword question and not part of Sync flow, reply with fixed response
        setMessages((m) => [...m, { from: 'bot', text: fixed }]);
        speak(fixed);
        return;
      }

      // Sync flow handling (yes/no and year selection)
      let replyText = '';
      let newFollowUp = null;

      if (awaitingResponse === 'yesno') {
        if (textLower.startsWith('sim') || textLower.startsWith('s')) {
          switch (lastFollowUp) {
            case '2020':
              replyText =
                'Profissões ligadas à adaptação digital, como analistas de dados e TI, se destacaram.';
              break;
            case '2030':
              replyText =
                'Profissões híbridas que combinam humanos e IA, como mentores digitais e analistas de automação, serão tendência.';
              break;
            case '2040':
              replyText =
                'Habilidades como programação e empatia vão ser essenciais para trabalhar com robôs e IA.';
              break;
            case '2050':
              replyText =
                'A liderança ética, criatividade e inteligência emocional dominarão o mercado.';
              break;
            default:
              replyText =
                'Ótimo! Posso detalhar mais.';
          }
          // Após explicar, sugere o menu novamente
          replyText += '\n\nVeja outros anos: 2020, 2030, 2040 ou 2050;';
          replyText += '\nou digite "equipe", "projetos" ou "solução" para saber mais sobre esses tópicos.';
          setAwaitingResponse('year');
        } else if (textLower.startsWith('nao') || textLower.startsWith('n')) {
          replyText =
            'Tudo bem! Podemos explorar outro ano ou tema sobre o projeto.';
          setAwaitingResponse('year');
        } else {
          replyText = 'Ops! Por favor, digite "sim" ou "não" para continuar.';
          setMessages((m) => [...m, { from: 'bot', text: replyText }]);
          speak(replyText);
          return;
        }
        newFollowUp = null;
      } else if (awaitingResponse === 'year') {
        if (!['2020', '2030', '2040', '2050'].some((y) => textLower.includes(y))) {
          // Permite que o usuário pergunte sobre equipe, projetos ou solução a qualquer momento
          if (textLower.includes('equipe')) {
            replyText = 'Você pode nos encontrar no LinkedIn ou GitHub, ou ver a equipe na seção correspondente.';
            setMessages((m) => [...m, { from: 'bot', text: replyText }]);
            speak(replyText);
            return;
          }
          if (textLower.includes('projeto')) {
            replyText = 'Veja nossos projetos na seção "Projetos" e clique no card para mais detalhes.';
            setMessages((m) => [...m, { from: 'bot', text: replyText }]);
            speak(replyText);
            return;
          }
          if (textLower.includes('menu')) {
            replyText = 'Digite um ano: 2020, 2030, 2040 ou 2050, para saber do futuro ou digite "equipe", "projetos" ou "solução" para saber mais sobre esses tópicos.';
            setMessages((m) => [...m, { from: 'bot', text: replyText }]);
            speak(replyText);
            return;
          }
          if (textLower.includes('obrigado') || textLower.includes('valeu') || textLower.includes('thanks')) {
            replyText = 'De nada! Se precisar de mais alguma coisa, é só perguntar.';
            setMessages((m) => [...m, { from: 'bot', text: replyText }]);
            speak(replyText);
            return;
          }
          if (textLower.includes('oi') || textLower.includes('olá') || textLower.includes('hello') || textLower.includes('bom dia') || textLower.includes('boa tarde') || textLower.includes('boa noite')) {
            replyText = 'Olá! Como posso ajudar você hoje?';
            setMessages((m) => [...m, { from: 'bot', text: replyText }]);
            speak(replyText);
            return;
          }
          if (textLower.includes('solução') || textLower.includes('solucao') || textLower.includes('gymflow')) {
            replyText = 'A solução GymFlowGS é uma plataforma de bem-estar corporativo que utiliza inteligência artificial para ajudar colaboradores a cuidarem da saúde no dia a dia. O aplicativo oferece mini-treinos, lembretes inteligentes, monitoramento de atividades físicas, gestão de suplementação e um chat interativo que personaliza recomendações. De forma simples e acessível, o GymFlowGS melhora o bem-estar, aumenta a produtividade e prepara empresas para um ambiente de trabalho mais saudável e sustentável..';
            setMessages((m) => [...m, { from: 'bot', text: replyText }]);
            speak(replyText);
            return;
          }
          replyText =
            'Ops! Por favor, escolha um ano válido: 2020, 2030, 2040 ou 2050.\nOu digite "equipe", "projetos" ou "solução" para saber mais sobre esses tópicos.';
          setMessages((m) => [...m, { from: 'bot', text: replyText }]);
          speak(replyText);
          return;
        }
      }

      // If no reply chosen above, detect years and start the next step
      if (!replyText) {
        if (textLower.includes('2020')) {
          replyText =
            'Em 2020, o foco estava na adaptação digital e início da automação. Quer saber quais profissões se destacaram nesse ano? (sim/não)';
          newFollowUp = '2020';
          setAwaitingResponse('yesno');
        } else if (textLower.includes('2030')) {
          replyText =
            'Em 2030, a IA vai se tornar essencial em praticamente todas as profissões. Quer exemplos de profissões híbridas desse período? (sim/não)';
          newFollowUp = '2030';
          setAwaitingResponse('yesno');
        } else if (textLower.includes('2040')) {
          replyText =
            'Em 2040, profissões híbridas dominarão o mercado, unindo humanos e máquinas. Quer saber quais habilidades serão mais valorizadas? (sim/não)';
          newFollowUp = '2040';
          setAwaitingResponse('yesno');
        } else if (textLower.includes('2050')) {
          replyText =
            'Em 2050, a empatia e a ética serão as habilidades mais valorizadas. Deseja algumas dicas de como se preparar para isso? (sim/não)';
          newFollowUp = '2050';
          setAwaitingResponse('yesno');
        } else {
          // fallback: generic answer (also allow fixedResponses fallback)
          const fallback = getBotResponse(raw);
          replyText =
            fallback ||
            'Interessante! O futuro do trabalho exige aprendizado contínuo e adaptação. Qual tema você deseja explorar.';
          setAwaitingResponse('year');
        }
      }

      setMessages((m) => [...m, { from: 'bot', text: replyText }]);
      speak(replyText);
      setLastFollowUp(newFollowUp);
    }, 700);
  }

  /* -------------------------
     Auto scroll when messages change
     ------------------------- */
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight + 100;
    }
  }, [messages, typing, open]);

  /* -------------------------
     Auri Avatar (uses framer-motion)
     ------------------------- */
  const AuriAvatar = () => (
    <motion.div
      style={{
        width: 36,
        height: 36,
        borderRadius: 999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at 30% 30%, #9bd3f9, #6b9dfc, #3445b4)',
        boxShadow: speaking ? '0 0 10px #00ffff' : undefined,
      }}
      animate={{
        boxShadow: speaking
          ? ['0 0 8px #00ffff', '0 0 20px #00bfff', '0 0 8px #00ffff']
          : '0 0 6px rgba(0,0,0,0.0)',
      }}
      transition={{ repeat: Infinity, duration: 1.8 }}
    >
      {/* eyes */}
      <motion.div
        style={{ display: 'flex', gap: 4, position: 'absolute', top: 10 }}
        animate={{ opacity: speaking ? [1, 0.2, 1] : [1] }}
        transition={{ repeat: Infinity, duration: 2.6 }}
      >
        <div style={{ width: 6, height: 6, borderRadius: 99, background: '#8ef', boxShadow: '0 0 6px #00ffff' }} />
        <div style={{ width: 6, height: 6, borderRadius: 99, background: '#8ef', boxShadow: '0 0 6px #00ffff' }} />
      </motion.div>
      {/* mouth bar */}
      <motion.div
        style={{ position: 'absolute', bottom: 8, width: 16, height: 4, borderRadius: 3, background: '#00c9ff' }}
        animate={{ scaleX: speaking ? [1, 1.8, 1] : 1, opacity: speaking ? [1, 0.5, 1] : 0.9 }}
        transition={{ repeat: Infinity, duration: 0.7 }}
      />
    </motion.div>
  );

  return (
    <>
      <ChatBotButton onClick={() => setOpen((o) => !o)} title="Abrir chat bot">
        {open ? <FiX /> : <FiMessageSquare />}
      </ChatBotButton>

      {open && (
        <ChatWindow role="dialog" aria-label="Chatbot">
          <ChatHeader>
            <HeaderLeft>
              <AvatarWrapper>
                <AuriAvatar />
              </AvatarWrapper>
              <div style={{ fontSize: '0.95rem', color: '#111' }}>
                Sync — Mentor do Futuro
              </div>
            </HeaderLeft>
            <span style={{ cursor: 'pointer' }} onClick={() => setOpen(false)}><FiX /></span>
          </ChatHeader>

          <ChatBody ref={chatBodyRef}>
            {messages.map((msg, idx) => (
              <MessageBubble key={idx} fromUser={msg.from === 'user'}>
                {msg.text}
              </MessageBubble>
            ))}

            {typing && (
              <div style={{ color: '#bfbfbf', fontSize: 12 }}>Sync está digitando...</div>
            )}
          </ChatBody>

          <ChatInputArea onSubmit={handleSend}>
            <ChatInput
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua mensagem..."
              aria-label="Mensagem"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  handleSend(e);
                }
              }}
            />
            <IconButton
              type="button"
              onClick={startListening}
              title={listening ? 'Ouvindo...' : 'Gravar mensagem'}
              aria-pressed={listening}
            >
              <FiMic style={{ color: listening ? '#00ffb3' : '#fff' }} />
            </IconButton>
            <SendButton type="submit" aria-label="Enviar">
              <FiSend />
            </SendButton>
          </ChatInputArea>
        </ChatWindow>
      )}
    </>
  );
}
