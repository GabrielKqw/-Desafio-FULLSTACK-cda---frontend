import styled from 'styled-components';

export const Initial = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #111;
  color: #fff;
`;

export const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: #222;
`;

export const IconConfig = styled.div`
  display: flex;
  align-items: center;

  p {
    margin: 0;
    font-size: 24px;
    color: #f39c12; /* Cor da Rockstar */
  }

  img {
    margin-left: 10px;
  }
`;

export const Logins = styled.div`
  display: flex;
  align-items: center;

  p {
    margin: 0;
    cursor: pointer;
    color: #3498db; /* Cor de destaque */
    &:hover {
      color: #2980b9;
    }
  }
`;

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;

  .text1 {
    font-size: 32px;
    margin-bottom: 20px;
  }

  .text2 {
    font-size: 24px;
    margin-bottom: 20px;
  }

  .text3 {
    font-size: 18px;
  }
`;

export const PrimaryFooter = styled.div`
  display: flex;
  justify-content: space-around;
  background-color: #222;
  padding: 20px;
`;

export const DivFooter = styled.div`
  h5 {
    margin: 0 0 10px;
    color: #f39c12; /* Cor da Rockstar */
  }

  p {
    margin: 0;
    color: #bbb;
  }
`;

export const SecondaryFooter = styled.div`
  text-align: center;
  padding: 10px;
  background-color: #111;
  font-size: 14px;
  color: #777;
`;
