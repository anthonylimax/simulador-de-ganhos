import { CellContent } from "../../styles/global_styles";
import { Header } from "./headerTruck";

export default function HeaderTruck() {

    return (
    <Header>
        <CellContent>NOME</CellContent>
        <CellContent>PESO OCUPADO</CellContent>
        <CellContent>VOLUME OCUPADO</CellContent>
        <CellContent>VOLUME MAXIMO</CellContent>
        <CellContent>PESO MAXIMO</CellContent>
        <CellContent>QUANTIDADE</CellContent>
        <CellContent>VALOR TOTAL</CellContent>
    </Header>
    )
}