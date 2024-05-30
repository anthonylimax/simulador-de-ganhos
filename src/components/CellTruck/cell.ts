import styled from "styled-components";
import { colors } from "../../styles/global_styles";

export const Modal = styled.div`
background-color: white;
    display: flex;
    padding: 20px;
    width: 900px;
    border-radius: 12px;
    height: 800px;
    overflow: hidden;

`
export const Smocker = styled.div`

    display: flex;
    background-color: #00000090;
    backdrop-filter: blur(3px);
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    align-items: center;
    justify-content: center;

`


export const CellBody = styled.div`
    display: grid;
    border-bottom: 1px solid black;
    grid-template-columns: repeat(9, 1fr);
    height: 80px;
    background-color: ${colors.second};
    color: black;
    width: clamp(1600px, 90vw,  1920px);
`