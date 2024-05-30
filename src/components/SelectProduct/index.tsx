import { useState } from "react";
import { Button } from "../../Pages/Register/register";
import { Product } from "../../interfaces/product";
import { calculateMaxProducts } from "../../services/calculate_max";
import { CellBody, CellContent } from "../../styles/global_styles";
import { calculatePrice } from "../../services/calculate_price";
import { Truck } from "../../interfaces/truck";
import { CaminhaoService } from "../../services/caminhao";


export default function SelectProduct({ product, caminhao }: { product: Product, caminhao: Truck }) {

    
    const result = calculateMaxProducts(product);
    const [quantity, setQuantity] = useState(0);
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
        <CellContent><input onChange={({target}) => setQuantity(Number(target.value))} type="number" /></CellContent>
        <CellContent>
            <Button bgcolor="blue" onClick={()=> {
                const newState = {...caminhao};
                if(newState.products.filter(x => x.produto.name === product.name).length === 0 ){
                    newState.products.push({produto: product, quantity: quantity});
                    console.log(newState)
                }
                else{
                    newState.products.filter(x => x.produto.name === product.name)[0].quantity = quantity;
                    console.log(newState)
                }
                if(caminhao.id) CaminhaoService.getInstance().updateTruck(caminhao.id, newState);
            }
            } color="white">Adicionar</Button>
        </CellContent>
    </CellBody>
    )
}