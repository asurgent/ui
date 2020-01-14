import styled from 'styled-components';
import randomcolor from 'randomcolor';

export const Wrapper = styled.div`
  font-size: ${(prop) => prop.size};
  width: ${(prop) => prop.size};
  height: ${(prop) => prop.size};
  border-radius:  ${({ square }) => (square ? '3px' : '100%')};
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid;
  border-color: ${({ email }) => {
    const color = randomcolor({
      luminosity: 'light',
      hue: 'random',
      alpha: 1,
      format: 'rgba',
      seed: email,
    });

    return color;
  }};
  background: ${({ email }) => {
    const color = randomcolor({
      luminosity: 'light',
      hue: 'random',
      alpha: 0.5,
      format: 'rgba',
      seed: email,
    });

    return color;
  }};

  small {
    font-size: .4em;    
    text-transform: uppercase;
  }
`;

export const Picture = styled.img`
    display: ${({ imageExists }) => (imageExists ? 'block' : 'none')};
    width: 100%;
    height: 100%;
`;
