import { Product } from "../../interfaces/product";
import { calculateMaxProducts } from "../../services/calculate_max";
import { CellBody, CellContent, Header } from "../../styles/global_styles";


export default function Cell() {

    return (
    <Header>
        <CellContent>NOME</CellContent>
        <CellContent>PREÇO FINAL</CellContent>
        <CellContent>PESO</CellContent>
        <CellContent>VOLUME</CellContent>
        <CellContent>VOLUME MAXIMO (CAMINHÃO)</CellContent>
        <CellContent>PESO MAXIMO (CAMINHÃO)</CellContent>
        <CellContent>QUANTIDADE MAXIMA</CellContent>
        <CellContent>VALOR TOTAL</CellContent>
    </Header>
    )
}