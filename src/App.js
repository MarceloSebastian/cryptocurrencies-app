import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import Form from './components/Form';
import image from './cryptocurrency.png';
import axios from 'axios';
import Quote from './components/Quote';
import Spinner from './components/Spinner';

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width:992px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`;

const Image = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`;

const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #fff;
  text-align: left;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color : #66a2fe;
    display: block;
  }

`

function App() {

  const [ coin, setCoin ] = useState('');
  const [ crypto, setCrypto ] = useState('');
  const [ result, setResult ] = useState({});
  const [ charging, setCharging ] = useState(false);

  useEffect(() => {

    const quoteCriptocurrency = async () => {
      if ( coin === '' ) return;

      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto}&tsyms=${coin}`;

      const result = await axios.get(url);

      setCharging(true);
      
      setTimeout(() => {
        setCharging(false);
        setResult(result.data.DISPLAY[crypto][coin])
      }, 3000)

    }

    quoteCriptocurrency();

  }, [coin, crypto])

  const component = ( charging ) ? <Spinner /> : <Quote result={result} />

  return (
    <Container>
      <div>
        <Image 
          src={image}
          alt='Cripto'
        />
      </div>
      <div>
        <Heading>Quote Cryptocurrency Instantly</Heading>
        <Form 
          setCoin={setCoin}
          setCrypto={setCrypto}
        />
        { component }
      </div>
    </Container>
  );
}

export default App;

