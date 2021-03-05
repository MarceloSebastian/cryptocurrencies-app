import styled from '@emotion/styled'

const ResultDiv = styled.div`
  color: #fff;
  font-family: Arial, Helvetica, sans-serif;
`;

const Paragraph = styled.p`
  font-size: 18px;

  span {
    font-weight: bold;
  }
`;

const Price = styled.p`
  font-size: 30px;

  span {
    font-weight: bold;
  }
`;

const Quote = ({ result }) => {
  
  if ( Object.keys(result).length === 0) return null;
  console.log(result);

  return ( 
    <ResultDiv>
      <Price>Current Price: <span>{result.PRICE}</span></Price>
      <Paragraph>Higest Price of The Day: <span>{result.HIGHDAY}</span></Paragraph>
      <Paragraph>Lowest Price of The Day: <span>{result.LOWDAY}</span></Paragraph>
      <Paragraph>Variation Last 24 Hous: <span>{result.CHANGEPCT24HOUR}</span></Paragraph>
      <Paragraph>Last Update: <span>{result.LASTUPDATE}</span></Paragraph>
    </ResultDiv>
   );
}
 
export default Quote;