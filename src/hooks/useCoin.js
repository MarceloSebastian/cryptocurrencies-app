import { useState } from 'react';
import styled from '@emotion/styled';

const Label = styled.label`
  font-family: 'Bebas Neue', cursive;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 2.4rem;
  margin-top: 2rem;
  display: block;
`

const StyledSelect = styled.select`
  width: 100%;
  display: block;
  padding: 1rem;
  -webkit-appearance: none;
  border-radius: 10px;
  border: none;
  font-size: 1.2rem;
  outline: none;
`

const useCoin = (label, initialState, options) => {

  // state of our custom hook
  const [ state, setState ] = useState(initialState);

  const Select = () => (
    <>
      <Label>{label}</Label>
      <StyledSelect
        onChange={ e => setState(e.target.value) }
        value={state}
      >
        <option value="">-- Select --</option>
        { options.map( option => (
          <option key={option.code} value={option.code}>{option.name}</option>
        ))}
      </StyledSelect>
    </>
  );

  // Return state, interface and fn who modifique our state
  return [ state, Select, setState ]

}

export default useCoin; 