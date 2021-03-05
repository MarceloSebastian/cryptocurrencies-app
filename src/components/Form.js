import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import useCoin from '../hooks/useCoin';
import useCryptocurrency from '../hooks/useCryptocurrency';
import axios from 'axios';
import Error from './Error';

const Button = styled.input`
  margin-top: 20px;
  font-weight: bold;
  font-size: 20px;
  padding: 10px;
  background-color: #66a2fe;
  border: none;
  width: 100%;
  border-radius: 10px;
  color: #fff;
  transition: background-color .3s ease;

  &:hover {
    background-color: #326ac0;
    cursor: pointer;
  }
`

const Form = ({ setCoin, setCrypto }) => {

  const [ listCrypto, setListCrypto ] = useState([]);
  const [ error, setError ] = useState(false);

  const COINS = [
    { code: 'USD', name: 'American Dollar'},
    { code: 'MXN', name: 'Mexican Peso'},
    { code: 'EUR', name: 'Euro'},
    { code: 'GBP', name: 'Pounds'}
  ]

  // Using useCoin
  const [ coin, SelectCoins ] = useCoin('Choose your Coin', '', COINS);

  // Using useCryptocurrency
  const [ cryptocurrency, SelectCrypto ] = useCryptocurrency('Choose your Cryptocurrency', '', listCrypto)

  // Calling the API
  useEffect(() => {
    const hitAPI = async () => {
      const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
      const result = await axios.get(url);

      setListCrypto(result.data.Data);
    }

    hitAPI();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();

    if(coin === '' || cryptocurrency === '') {
      return setError(true)
    }

    setError(false);
    setCoin(coin);
    setCrypto(cryptocurrency);
  }

  return ( 
    <form
      onSubmit={handleSubmit}
    >
      { error ? <Error message="All blanks are Required" /> : null }

      <SelectCoins />

      <SelectCrypto />

      <Button 
         type='submit'
         value='Calculate'
      />
    </form>
   );
}
 
export default Form;