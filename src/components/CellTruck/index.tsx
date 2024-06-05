import { useEffect, useState } from "react";
import { Button } from "../../Pages/Register/register";
import { Truck } from "../../interfaces/truck";
import { CellContent } from "../../styles/global_styles";
import { CellBody } from "./cell";
import { calculatePrice as Calc } from "../../services/calculate_price";
import { useNavigate } from "react-router-dom";
import { CaminhaoService } from "../../services/caminhao";
import { formatadorDeMilharesComRegex } from "../../services/formater";

export default function Cell({ truck }: { truck: Truck }) {
    const [volumn, setVolumn] = useState(0);
    const [weigth, setWeigth] = useState(0);
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        calculateWeigth();
        calculateLength();
        calculateTotalPrice();
        calculateVolumn();
        console.log(truck)
    }, [truck]);

    const calculateWeigth = () => {
        let totalWeight = 0;
        truck.products.forEach(product => {
                totalWeight += product.produto.weight * product.quantity;
        });
        setWeigth(totalWeight);
    };

    const calculateLength = () => {
        let totalQuantity = 0;
        truck.products.forEach(product => {
            totalQuantity += product.quantity;
        });
        setQuantity(totalQuantity);
    };

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        truck.products.forEach(product => {
            totalPrice += Calc(product.produto, truck.products.length, truck.operationCoust);
        });
        setPrice(totalPrice);
    };

    const calculateVolumn = () => {
        let totalVolumn = 0;
        truck!.products.forEach(product => {
                totalVolumn += product!.produto!.weight * product!.produto!.height * product!.produto!.length;
        });
        setVolumn(totalVolumn);
    };

    return (
        <CellBody onDoubleClick={() => navigate("/caminhao", {state: {products: truck.products, truck: truck} })}>
            <CellContent>{truck.title}</CellContent>
            <CellContent>{weigth}</CellContent>
            <CellContent>{volumn}</CellContent>
            <CellContent>{truck.truckSpaceMax}</CellContent>
            <CellContent>{truck.truckWeightMax}</CellContent>
            <CellContent>{quantity}</CellContent>
            <CellContent>{formatadorDeMilharesComRegex(price * quantity)}</CellContent>
            <CellContent>
                <Button bgcolor="red" onClick={() => {}} color="white">Excluir</Button>
            </CellContent>
        </CellBody>
    );
}
