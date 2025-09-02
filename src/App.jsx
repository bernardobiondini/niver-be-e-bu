import { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import axios from "axios";

// === Global Styles ===
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Comic Sans MS', cursive, sans-serif;
    background: #000;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    max-width: 100vw;
  }
`;

// === Containers ===
const Wrapper = styled.div`
  padding: 2rem;
  text-align: center;
`;

const HeroContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

const HeroImage = styled.img`
  width: 100%;
  border-radius: 12px;
`;

const HeroTitle = styled.h1`
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  color: #ffd700;
  font-size: 3rem;
  text-align: center;

  /* Garantindo visibilidade */
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.9);
  -webkit-text-stroke: 1px #000;
  padding: 0.5rem 1rem;
`;

const Title = styled.h1`
  color: #ffd700;
  font-size: 3.5rem;
  z-index: 1;
`;

const Description = styled.p`
  color: #fff;
  font-size: 1.5rem;
  text-align: center;
  margin: 2rem auto;
  width: 50rem;
  max-width: 90vw;
`;

const Details = styled.div`
  color: #888;
  padding: 1rem;
  font-size: 0.8rem;
  margin: 2rem auto;
`;

const Button = styled.button`
  background: #ffd700;
  color: #000;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border-radius: 12px;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    background: #ffea00;
  }
`;

const SecondaryButton = styled(Button)`
  background: transparent;
  color: #fff;
  border: 2px solid #ffd700;
  &:hover {
    background: #ffd700;
    color: #000;
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  @media (min-width: 500px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Card = styled.div`
  border: 2px solid #ffd700;
  border-radius: 12px;
  padding: 1rem;
  background: #111;
`;

const CardTitle = styled.h2`
  color: #ffd700;
  margin-bottom: 1rem;
`;

const CardPrice = styled.h2`
  color: #fff;
  margin-bottom: 1rem;
`;

const Counter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  button {
    background: #ffd700;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    border-radius: 8px;
    font-weight: bold;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 2rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  border: none;
  width: 100%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const App = () => {
  const [step, setStep] = useState(1);

  const [ingressos, setIngressos] = useState({
    comida: 0,
    comidaBebida: 0,
  });

  const handleAdd = (type) => {
    setIngressos((prev) => ({ ...prev, [type]: prev[type] + 1 }));
  };

  const handleRemove = (type) => {
    setIngressos((prev) => ({
      ...prev,
      [type]: prev[type] > 0 ? prev[type] - 1 : 0,
    }));
  };

  const pixKey = "31971252570";
  const [copied, setCopied] = useState(false);

  const submitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Array.from(formData.entries());

    let index = 0;
    for (const [key, value] of inputs) {
      if (!value) continue;

      const tipo = index < ingressos.comida ? 1 : 2;

      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbyW-xywoSltbG8YiHRMkqn65iKRgXYLDzrv_WnxVNw-_rRSSaJUpH2Ct6CNwNY8jtEH/exec",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify({
              nome: value,
              tipo: tipo,
            }),
          }
        );
        const result = await response.json();
        console.log("Sucesso:", result);
      } catch (err) {
        console.error("Erro ao enviar:", err);
      }

      index++;
    }

    setStep(4);
  };

  const handleCopyPix = async () => {
    try {
      await navigator.clipboard.writeText(pixKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      setCopied(false);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        {step === 1 && (
          <>
            <HeroContainer>
              <HeroImage src="BeBu.png" alt="Aniversário" />
              <HeroTitle>Aniversário Bu & Be</HeroTitle>
            </HeroContainer>
            <Description>
              Todo ano nós comemoramos nosso aniversário com as pessoas que mais
              amamos. Esse ano não seria diferente, e você é nosso convidado
              especial! Venha celebrar com a gente em uma festa cheia de
              alegria, comida deliciosa e muita diversão. Sua presença tornará
              esse dia ainda mais especial! <br />
            </Description>
            <Description style={{ color: "#888" }}>
              27/09/2025 as 16h | Rua Antônio Paulino de Castro 623, Pampulha
            </Description>
            <Button onClick={() => setStep(2)}>Confirmar presença</Button>
          </>
        )}

        {step === 2 && (
          <>
            <Title>Escolha seu ingresso</Title>
            <Description>
              Esse ano estamos pedindo uma colaboração para ajudar nos custos da
              festa. Teremos muita comida e bebida e para melhor atender a todos
              criamos duas opções para ficar mais em conta para quem não for
              beber:
            </Description>
            <Details>
              Ambas opções incluem pizzas de sabores variados, refrigerante e
              outras bebidas não alcoólicas.
            </Details>
            <CardGrid>
              <Card>
                <CardTitle>Não alcoólicos por favor!</CardTitle>
                <CardPrice>R$ 35,00</CardPrice>
                <Counter>
                  <button
                    style={{ fontSize: 24 }}
                    onClick={() => handleRemove("comida")}
                  >
                    -
                  </button>
                  <span style={{ fontSize: 24 }}>{ingressos.comida}</span>
                  <button
                    style={{ fontSize: 24 }}
                    onClick={() => handleAdd("comida")}
                  >
                    +
                  </button>
                </Counter>
              </Card>
              <Card>
                <CardTitle>Total flex</CardTitle>
                <CardPrice>R$ 45,00</CardPrice>
                <Counter>
                  <button
                    style={{ fontSize: 24 }}
                    onClick={() => handleRemove("comidaBebida")}
                  >
                    -
                  </button>
                  <span style={{ fontSize: 24 }}>{ingressos.comidaBebida}</span>
                  <button
                    style={{ fontSize: 24 }}
                    onClick={() => handleAdd("comidaBebida")}
                  >
                    +
                  </button>
                </Counter>
              </Card>
            </CardGrid>
            <ButtonGroup>
              <SecondaryButton onClick={() => setStep(1)}>
                Voltar
              </SecondaryButton>
              <Button style={{ marginLeft: "1rem" }} onClick={() => setStep(3)}>
                Continuar
              </Button>
            </ButtonGroup>
          </>
        )}

        {step === 3 && (
          <>
            <Title>Informe os nomes</Title>
            <Form id="form" onSubmit={(e) => submitForm(e)}>
              {Array.from(
                { length: ingressos.comida + ingressos.comidaBebida },
                (_, i) => (
                  <Input
                    name={`convidado_${i}`}
                    key={i}
                    placeholder={`Nome do convidado ${i + 1}`}
                  />
                )
              )}
              <ButtonGroup>
                <SecondaryButton type="button" onClick={() => setStep(2)}>
                  Voltar
                </SecondaryButton>
                <Button type="submit">Confirmar Presença</Button>
              </ButtonGroup>
            </Form>
          </>
        )}

        {step === 4 && (
          <>
            <Title>Obrigado!</Title>
            <Description>
              Sua presença é muito importante para nós. Te esperamos lá! Estamos
              ansiosos para celebrar juntos!
            </Description>
            <Description>
              Envie o pix para o Be (ou chame um dos dois filhos da ... Lilian e
              do JB no WhatsApp)
            </Description>
            <Description>
              Chave: <b>{pixKey}</b>
              <Button
                style={{
                  marginLeft: "1rem",
                  padding: "0.5rem 1rem",
                  fontSize: "1rem",
                }}
                onClick={handleCopyPix}
                type="button"
              >
                {copied ? "Copiado!" : "Copiar chave"}
              </Button>
            </Description>
            <Description style={{ color: "#888" }}>
              27/09/2025 as 16h <br />
              Rua Antônio Paulino de Castro 623, Pampulha
            </Description>
          </>
        )}
      </Wrapper>
    </>
  );
};

export default App;
