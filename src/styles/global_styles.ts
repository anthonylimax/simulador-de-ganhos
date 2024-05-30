import styled from "styled-components";

export const colors = {
    primary: "#de1d1d",
    second: "#F5F5F5"
}


export const Container = styled.section`
    padding: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const CellContent = styled.span`
    width: 100%;
    text-align: center;
    height: 100%;
    display: flex;
    font-size: 20px;
    align-items: center;
    justify-content: center;

`

export const Title = styled.span`
    font-size: clamp(16px, 3vw, 26px);  
    color: black;
`

export const ContainerCells = styled.div`
    width: 90vw;
    overflow: auto;

`

export const CellBody = styled.div`
    display: grid;
    border-bottom: 1px solid black;
    grid-template-columns: repeat(10, 1fr);
    height: 80px;
    background-color: ${colors.second};
    color: black;
    width: clamp(1600px, 90vw,  1920px);


`
export const Header = styled.div`
    display: grid;
    margin-top: 30px;
    border-bottom: 1px solid black;
    grid-template-columns: repeat(10, 1fr);
    height: 80px;
    background-color: ${colors.primary};
    color: white;
    width: clamp(1600px, 90vw, 1920px);
`