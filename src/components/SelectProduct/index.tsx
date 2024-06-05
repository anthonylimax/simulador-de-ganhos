import { useLayoutEffect, useState } from "react";
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
    const [errorMessage, setErrorMessage] = useState('');
    const finalPrice: number = calculatePrice(product, result, caminhao.operationCoust);
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
        const totalWeight = newState.products.reduce((acc, p) => acc + p.produto.weight * p.quantity, 0) + (product.weight * quantity);
        const totalVolume = newState.products.reduce((acc, p) => acc + (p.produto.height * p.produto.length * p.produto.width * p.quantity), 0) + (product.height * product.length * product.width * quantity);

        if (totalWeight > newState.truckWeightMax!) {
            setErrorMessage('Peso excedido');
            return;
        }

        if (totalVolume > newState.truckSpaceMax!) {
            setErrorMessage('Volume excedido');
            return;
        }

        if (existingProductIndex === -1) {
            newState.products.push({ produto: product, quantity: quantity });
        } else {
            newState.products[existingProductIndex] = { ...newState.products[existingProductIndex], quantity: newState.products[existingProductIndex].quantity + quantity };
        }

        if (caminhao.id) {
                await CaminhaoService.getInstance().updateTruckProducts(caminhao.id, newState.products);
                setErrorMessage('')
                window.location.reload();
        }
    };

    return (
        <CellBody>
            <CellContent>{product.name}</CellContent>
            <CellContent>{finalPrice.toFixed(2)}</CellContent>
            <CellContent>{product.weight}</CellContent>
            <CellContent>{(product.height * product.length * product.width).toFixed(2)}</CellContent>
            <CellContent>{product.truckSpaceMax}</CellContent>
            <CellContent>{product.truckWeightMax}</CellContent>
            <CellContent>{result}</CellContent>
            <CellContent>{(result * finalPrice).toFixed(2)}</CellContent>
            <CellContent>
                <input onChange={({ target }) => setQuantity(Number(target.value))} type="number" />
            </CellContent>
            <CellContent>
                <Button bgcolor="blue" onClick={handleAddProduct} color="white">Adicionar</Button>
            </CellContent>
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        </CellBody>
    );
}
