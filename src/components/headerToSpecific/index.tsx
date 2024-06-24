import { CellContent, Header } from "../../styles/global_styles";

export default function HeaderToSpecific() {
    return (
        <Header>
            <CellContent>Quantidade</CellContent>
            <CellContent>Nome do Produto</CellContent>
            <CellContent>Valor Unitário</CellContent>
            <CellContent>Peso Ocupado (Kg)</CellContent>
            <CellContent>Volume Ocupado (m³)</CellContent>
            <CellContent>Valor Total</CellContent>
            <CellContent>Peso Máximo (Caminhão)</CellContent>
            <CellContent>Volume Máximo (Caminhão)</CellContent>
            <CellContent>Ações</CellContent>
        </Header>
    );
}
