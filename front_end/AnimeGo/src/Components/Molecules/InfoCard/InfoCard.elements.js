import styled from "styled-components";

export const InfoCardContainer = styled.div`
  width: 28%;
  border: 1px solid blue;
  border-radius: 15px;
  padding: 10px;
  background-color: #575555;
  max-height: 400px; /* Adjust this value to your preference */
  overflow-y: auto; /* Enables vertical scrolling if content exceeds max-height */
`;

export const InfoCardImage = styled.div`
  img {
    border: 0px;
    outline: 0px;
   
  }
`;

export const InfoCardStuff = styled.section`
    button {
        background-color: #242424;
        border: red;
        color: white;
        font-size: 18px;
        font-weight: bold;
        width: 100%;
        border: 0px;
        padding: 5px;
        border-radius: 5px;
      
}

button:hover {
        color: orange;
        cursor: pointer;
    }


`