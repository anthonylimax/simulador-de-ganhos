import styled from "styled-components";

export const Field = styled.input`
    border: none;
    outline: none;
    border-bottom: 1px solid black;
    padding: 5px;
    font-size: 20px;
    width: 100%;
`

export const JoinField = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
`

export const Form = styled.div`
    display: flex;
    width: 35%;
    min-width: 300px;
    flex-direction: column;
    align-items: center;
    padding-top: 40px;
    gap: 30px;
`

export const Button = styled.button<{bgcolor : string}>`
    padding: 10px 20px;
    font-size: 20px;
    background-color: ${props => props.bgcolor};
    color: ${props => props.color};
    border: none;
    border-radius: 15px;
    outline: none;

    
`

export const InputLabel = styled.label`
    color: #000000E0;
    align-self: flex-start;
`


