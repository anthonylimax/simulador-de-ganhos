
import { Button } from "../../Pages/Register/register";
import { Product } from "../../interfaces/product";
import { CellBody, CellContent, InputQuantity } from "../../styles/global_styles";
import { calculatePrice } from "../../services/calculate_price";
import { formatadorDeMilharesComRegex } from "../../services/formater";
import { CaminhaoService } from "../../services/caminhao";
import { useEffect, useState } from "react";


export default function CellProductByTruck({product, length, truckId, setData, data, operationCoust, quantity, truckSpaceMax, truckWeightMax, profit}: { product: Product, length: number, truckId: string, setData: any, data: any[],operationCoust: number, quantity: number, truckWeightMax: number, truckSpaceMax: number, profit: number}) {



    const [finalPrice, setFinalPrice] = useState(() => calculatePrice(product, profit, length, operationCoust)); 
    const [exceedsLimit, setExceedsLimit] = useState(false);
    function handleRemoveProduct(productId: string) {
        if (truckId && productId) {
            CaminhaoService.getInstance().removeProductFromTruck(truckId, productId).then(() => {
                setData(data.filter(product => product.produto.id !== productId));
            });
        } else {
            console.error("truckId or productId is undefined");
        }
    }

    useEffect(()=>{
        CaminhaoService.getInstance().updateTruckProducts(truckId, data);
        setFinalPrice(calculatePrice(product, profit, length, operationCoust))
    }, [data])


    function handleChange(event : any){
        console.log(event)
            const _value = Number(event.target.value);
            const a = data.findIndex((_) => _.produto.id === product.id);
            const newData = [...data];
            newData[a].quantity = _value;
            setData(newData);
            const totalSpace = _value * product.height * product.width * product.length;
            const totalWeight = _value * product.weight;
            console.log(totalSpace)
            if(totalWeight/truckWeightMax * 100 > 100 || totalSpace/truckSpaceMax * 100 > 100) setExceedsLimit(true)
            else setExceedsLimit(false)
    }
    
     return (
    <CellBody style={
        exceedsLimit ? {
        backgroundColor: "#99000030"
    } : {}}>
        <CellContent> <InputQuantity value={quantity} onChange={handleChange} type="number"></InputQuantity> </CellContent>
        <CellContent>{product.name}</CellContent>
        <CellContent>{quantity > 0 ? formatadorDeMilharesComRegex(finalPrice) : 0}</CellContent>
        <CellContent>{formatadorDeMilharesComRegex(quantity * product.weight)}</CellContent>
        <CellContent>{formatadorDeMilharesComRegex(product.height * product.length * product.width * quantity)}</CellContent>
        <CellContent>{formatadorDeMilharesComRegex(finalPrice * quantity)}</CellContent>
        <CellContent>{truckWeightMax}</CellContent>
        <CellContent>{truckSpaceMax}</CellContent>
        <CellContent><Button bgcolor="red" color="white" onClick={() => handleRemoveProduct(product.id!)}>Remover</Button></CellContent>
    </CellBody>
    )
}