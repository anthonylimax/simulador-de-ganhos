import { useLayoutEffect, useState } from "react";
import { Button } from "../../Pages/Register/register";
import { Product } from "../../interfaces/product";
import { calculateMaxProducts } from "../../services/calculate_max";
import { CellBody, CellContent } from "../../styles/global_styles";
import { calculatePrice } from "../../services/calculate_price";
import { Truck } from "../../interfaces/truck";
import { CaminhaoService } from "../../services/caminhao";
import { formatadorDeMilharesComRegex } from "../../services/formater";

export default function SelectProduct({ product, caminhao }: { product: Product, caminhao: Truck }) {
    const finalPrice: number = product.factoryPrice;
    const [currentTruck, setCurrentTruck] : [Truck | undefined, any] = useState(); 
    useLayoutEffect(()=>{
        CaminhaoService.getInstance().getAllTrucks().then((truck : Truck[]) => {
            const result = truck.filter(x => x.id === caminhao.id)[0];
            setCurrentTruck(result);

        })
    }, []);

    const handleAddProduct = async () => {
        const newState = { ...currentTruck, products: [...currentTruck!.products] };  // Copia profunda do estado do caminhão e dos produtos
        const existingProductIndex = newState.products.findIndex(x => x.produto.id === product.id);
        if (existingProductIndex === -1) {
            newState.products.push({ produto: product, quantity: 0 });
        }
        if (caminhao.id) {
                await CaminhaoService.getInstance().updateTruckProducts(caminhao.id, newState.products);
                location.reload()
        }
    };

    return (
        <CellBody>
            <CellContent>{product.name}</CellContent>
            <CellContent>{formatadorDeMilharesComRegex(finalPrice)}</CellContent>
            <CellContent>{product.weight}</CellContent>
            <CellContent>{(product.height * product.length * product.width).toFixed(2)}</CellContent>
            <CellContent>
                <Button bgcolor="blue" onClick={handleAddProduct} color="white">Adicionar</Button>
            </CellContent>
        </CellBody>
    );
}
