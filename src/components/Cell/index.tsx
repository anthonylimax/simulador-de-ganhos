import { useState } from "react";
import { Button } from "../../Pages/Register/register";
import { Product } from "../../interfaces/product";
import { calculateMaxProducts } from "../../services/calculate_max";
import { ProductServices } from "../../services/product";
import { CellBody, CellContent } from "../../styles/global_styles";
import { Smocker } from "./cell";
import Modal from "../Modal";
import { calculatePrice } from "../../services/calculate_price";


export default function Cell({ product }: { product: Product }) {

    
    const productService = ProductServices.getInstance();
    const [canShowModal, setCanShowModal] = useState(false);
    const result = calculateMaxProducts(product);
    const finalPrice : number = calculatePrice(product, result, product.operationCoust);
     return (
    <CellBody>
        <CellContent>{product.name}</CellContent>
        <CellContent>{finalPrice.toFixed(2)}</CellContent>
        <CellContent>{product.weight}</CellContent>
        <CellContent>{product.height * product.length * product.width}</CellContent>
        <CellContent>{product.truckSpaceMax}</CellContent>
        <CellContent>{product.truckWeightMax}</CellContent>
        <CellContent>{result}</CellContent>
        <CellContent>{(result * finalPrice).toFixed(2) }</CellContent>
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