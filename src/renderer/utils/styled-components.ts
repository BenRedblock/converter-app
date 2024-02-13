import { styled } from 'styled-components';

export const NavigationItem = styled.div`
  font-size: 20px;
  border: 1px solid black;
`;

export const BigButton = styled.button`
  color: #3c39cc;
  font-size: 1.5em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #2f319e;
  border-radius: 3px;
  display: block;

  &:hover {
    color: #4643e9;
    cursor: pointer;
  }
`;

export const ToolButton = styled.button`
  background-color: rgb(0, 0, 0, 0.2);
  border: 2px solid black;
  border-radius: 5px;
  width: 150px;
  height: 150px;

  &:hover {
    background-color: rgb(0, 0, 0, 0.8);
  }
`;

export const ButtomGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  grid-gap: 20px;
`;

export const Page = styled.div`
  padding: 50px;
`;

export const Container = styled.div`
  width: 70vw;
  margin: 0 auto;
`;

export const PrimaryButton = styled.button`
  font-size: 18px;
  color: blue;
  border: 3px solid blue;
  border-radius: 10px;
  padding: 10px 15px;
  background: rgba(0, 0, 0, 0.2);

  &:hover {
    background: rgba(0, 0, 255, 0.2);
  }

  &:active {
    background: rgba(0, 0, 255, 0.4);
  }
`;

export const SecondaryButton = styled.button`
  font-size: 18px;
  color: yellow;
  border: 3px solid yellow;
  border-radius: 10px;
  padding: 10px 15px;
  background: rgba(0, 0, 0, 0.2);

  &:hover {
    background: rgba(255, 255, 0, 0.2);
  }

  &:active {
    background: rgba(255, 255, 0, 0.4);
  }
`;

export const SuccessButton = styled.button`
  font-size: 18px;
  color: green;
  border: 3px solid green;
  border-radius: 10px;
  padding: 10px 15px;
  background: rgba(0, 0, 0, 0.2);

  &:hover {
    background: rgba(0, 128, 0, 0.2);
  }

  &:active {
    background: rgba(0, 128, 0, 0.4);
  }
`;

export const ErrorButton = styled.button`
  font-size: 18px;
  color: red;
  border: 3px solid red;
  border-radius: 10px;
  padding: 10px 15px;
  background: rgba(0, 0, 0, 0.2);

  &:hover {
    background: rgba(255, 0, 0, 0.2);
  }

  &:active {
    background: rgba(255, 0, 0, 0.4);
  }
`;

export const InputField = styled.input`
  margin: 5px;
  padding: 8px 8px;
  box-sizing: border-box;
  color: #fff;
  background-color: #272829;
  border-radius: 5px;
  border: 1px solid #3a3a3a;
  outline: none;
  width: 100%;
  transition: all 0.2s;
  :hover {
    border: 1px solid #414141;
    transition: all 0.2s;
  }
`;

export const Select = styled.select`
  outline: none;
  margin: 5px;
  width: 100%;
  padding: 10px;
  background-color: #2f3031;
  border-radius: 5px;
  border: 1px solid #3a3a3a;
  appearance: none;
  color: #fff;
  & > option {
    background-color: 2f3031;
    padding: 20px;
    margin: 20px;
  }
  :hover {
    border: 2px solid #414141;
    transition: all 0.2s;
  }
`;

export const HistoryBox = styled.div`
  min-width: 100%;
  border-radius: 5px;
  border: 1px solid #5c3cec;
  margin: 3px;
  padding: 5px;
`;
