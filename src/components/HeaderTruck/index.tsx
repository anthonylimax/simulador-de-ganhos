import { CellContent } from "../../styles/global_styles";
import { Header } from "./headerTruck";

export default function HeaderTruck() {

    return (
    <Header>
        <CellContent>NOME</CellContent>
        <CellContent>PESO OCUPADO (Kg)</CellContent>
        <CellContent>VOLUME OCUPADO (m³)</CellContent>
        <CellContent>VOLUME MAXIMO (m³)</CellContent>
        <CellContent>PESO MAXIMO (Kg)</CellContent>
        <CellContent>QUANTIDADE</CellContent>
        <CellContent>VALOR TOTAL (R$)</CellContent>
    </Header>
    )
}