import styled from "styled-components";
import { colors } from "../../styles/global_styles";

export const Nav = styled.nav`
    height: 100px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    background-color: ${colors.second};
img{
    width: clamp(90px, 5vw, 150px);
}
`

export const Links = styled.article`
    display: flex;
    width: 40%;
    max-width: 500px;
    justify-content: space-between;
    a{
        font-size: clamp(16px, 1.2vw, 20px);
        text-decoration: none;
        cursor: pointer;
        &:hover{
            color: ${colors.primary};
        }
    }

`


