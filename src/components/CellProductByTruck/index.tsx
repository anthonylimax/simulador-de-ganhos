
import { Button } from "../../Pages/Register/register";
import { Product } from "../../interfaces/product";
import { calculateMaxProducts } from "../../services/calculate_max";
import { CellBody, CellContent } from "../../styles/global_styles";
import { calculatePrice } from "../../services/calculate_price";
import { formatadorDeMilharesComRegex } from "../../services/formater";
import { CaminhaoService } from "../../services/caminhao";


export default function CellProductByTruck({ product, length, truckId, setData, data, operationCoust, quantity, truckSpaceMax, truckWeightMax}: { product: Product, length: number, truckId: string, setData: any, data: any[],operationCoust: number, quantity: number, truckWeightMax: number, truckSpaceMax: number}) {

    const result = calculateMaxProducts(product);
    const finalPrice : number = calculatePrice(product, length, operationCoust);
    
    function handleRemoveProduct(productId: string) {

        if (truckId && productId) {
            CaminhaoService.getInstance().removeProductFromTruck(truckId, productId).then(() => {
                setData(data.filter(product => product.produto.id !== productId));
                
            });
        } else {
            console.error("truckId or productId is undefined");
        }
    }

    
     return (
    <CellBody>
        <CellContent>{quantity}</CellContent>
        <CellContent>{product.name}</CellContent>
        <CellContent>{formatadorDeMilharesComRegex(finalPrice)}</CellContent>
        <CellContent>{formatadorDeMilharesComRegex((product.weight * quantity))}</CellContent>
        <CellContent>{product.height * product.length * product.width * quantity}</CellContent>
        <CellContent>{formatadorDeMilharesComRegex(finalPrice * quantity)}</CellContent>
        <CellContent>{truckWeightMax}</CellContent>
        <CellContent>{truckSpaceMax}</CellContent>
        <CellContent><Button bgcolor="red" color="white" onClick={() => handleRemoveProduct(product.id!)}>Remover</Button></CellContent>
    </CellBody>
    )
}