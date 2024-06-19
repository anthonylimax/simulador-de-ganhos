import { CellContent, Header } from "../../styles/global_styles";


export default function Cell() {

    return (
    <Header>
        <CellContent>NOME</CellContent>
        <CellContent>PREÇO UNITÁRIO</CellContent>
        <CellContent>PESO (kg)</CellContent>
        <CellContent>VOLUME (m³)</CellContent>
        <CellContent>VOLUME MAXIMO (CAMINHÃO)</CellContent>
        <CellContent>PESO MAXIMO (CAMINHÃO)</CellContent>
        <CellContent>QUANTIDADE MAXIMA</CellContent>
        <CellContent>VALOR TOTAL</CellContent>
    </Header>
    )
}