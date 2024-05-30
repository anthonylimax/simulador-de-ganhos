import styled from "styled-components";
import { colors } from "../../styles/global_styles";



export const Header = styled.div`

display: grid;
    margin-top: 30px;
    border-bottom: 1px solid black;
    grid-template-columns: repeat(9, 1fr);
    height: 80px;
    background-color: ${colors.primary};
    color: white;
    width: clamp(1600px, 90vw, 1920px);
`