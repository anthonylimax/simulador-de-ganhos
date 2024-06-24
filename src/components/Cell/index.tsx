import { useState } from "react";
import { Button } from "../../Pages/Register/register";
import { Product } from "../../interfaces/product";
import { calculateMaxProducts } from "../../services/calculate_max";
import { ProductServices } from "../../services/product";
import { CellBody, CellContent } from "../../styles/global_styles";
import Modal from "../Modal";
import { calculatePrice } from "../../services/calculate_price";
import { formatadorDeMilharesComRegex } from "../../services/formater";


export default function Cell({ product }: { product: Product }) {

    
    const productService = ProductServices.getInstance();
    const [canShowModal, setCanShowModal] = useState(false);
    const result = calculateMaxProducts(product);
    const finalPrice : number = calculatePrice(product, product.profit, result, product.operationCoust);
     return (
    <CellBody>
        <CellContent>{product.name}</CellContent>
        <CellContent>{formatadorDeMilharesComRegex(finalPrice) }</CellContent>
        <CellContent>{formatadorDeMilharesComRegex(product.weight)}</CellContent>
        <CellContent>{formatadorDeMilharesComRegex((product.height * product.length * product.width))}</CellContent>
        <CellContent>{formatadorDeMilharesComRegex(product.truckSpaceMax)}</CellContent>
        <CellContent>{formatadorDeMilharesComRegex(product.truckWeightMax)}</CellContent>
        <CellContent>{formatadorDeMilharesComRegex(result)}</CellContent>
        <CellContent>{formatadorDeMilharesComRegex((result * finalPrice)) }</CellContent>
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