import styled from 'styled-components'

export const NavContainer = styled.nav`
    max-width: 750px;
    width: 100%;
    margin: 0;
    padding: 5px;
    display: flex; 
    align-items: center;// if you zoom in or out 
    justify-content: center;
    column-gap: 20px;
    font-size: 18px;
    border-radius: 10px 10px 80px 80px;
    background-color: #403f3f;

    a {
        color: orange;
        text-decoration: none;
    }

    a:hover {
        color: rgb(66, 135, 245);
        cursor: pointer;
    }
`