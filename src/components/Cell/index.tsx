import { useState } from "react";
import { Button } from "../../Pages/Register/register";
import { ProductServices } from "../../services/product";
import { CellBody, CellContent } from "../../styles/global_styles";
import Modal from "../Modal";
import { formatadorDeMilharesComRegex } from "../../services/formater";
import { RawProduct } from "../../interfaces/RawProduct";


export default function Cell({ product }: { product: RawProduct }) {

    
    const productService = ProductServices.getInstance();
    const [canShowModal, setCanShowModal] = useState(false);
    const finalPrice : number = product.factoryPrice;
     return (
    <CellBody>
        <CellContent>{product.name}</CellContent>
        <CellContent>{formatadorDeMilharesComRegex(finalPrice) }</CellContent>
        <CellContent>{formatadorDeMilharesComRegex(product.weight)}</CellContent>
        <CellContent>{formatadorDeMilharesComRegex((product.height * product.length * product.width))}</CellContent>
        <CellContent>
            <Button bgcolor="red" onClick={()=> product.id && productService.removeProductInTable(product.id)} color="white">Excluir</Button>
        </CellContent>
        <CellContent>
            <Button bgcolor="blue" onClick={() => setCanShowModal(true)} color="white">Editar</Button>
        </CellContent>
        {
            canShowModal && 
            <Modal setModal={setCanShowModal} product={product} />
        }
    </CellBody>
    )
}