import { useEffect, useState } from "react";
import { Button } from "../../Pages/Register/register";
import { Truck } from "../../interfaces/truck";
import { CellContent } from "../../styles/global_styles";
import { CellBody } from "./cell";
import { calculatePrice as Calc } from "../../services/calculate_price";
import { useNavigate } from "react-router-dom";
import { formatadorDeMilharesComRegex } from "../../services/formater";
import { CaminhaoService } from "../../services/caminhao";

export default function Cell({ truck }: { truck: Truck }) {
    const [volumn, setVolumn] = useState(0);
    const [weigth, setWeigth] = useState(0);
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const navigate = useNavigate();
    
    useEffect(()=>{
        calculateWeigth();
        calculateLength();
        calculateTotalPrice();
        calculateVolumn();
    })
    
    useEffect(() => {
        calculateWeigth();
        calculateLength();
        calculateTotalPrice();
        calculateVolumn();
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
            totalPrice += Calc(product.produto,truck.profit ,quantity, truck.operationCoust) * product.quantity;
            
        });

        setPrice(totalPrice);
    };

    const calculateVolumn = () => {
        let totalVolumn = 0;
        truck!.products.forEach(product => {
                totalVolumn += product.produto.width * product.produto.height * product.produto.length * product.quantity;

            });
        setVolumn(totalVolumn);
    };

    return (
        <CellBody onDoubleClick={() => navigate("/caminhao", {state: {products: truck.products, truck: truck} })}>
            <CellContent>{truck.title}</CellContent>
            <CellContent>{formatadorDeMilharesComRegex(weigth)}</CellContent>
            <CellContent>{formatadorDeMilharesComRegex(volumn)}</CellContent>
            <CellContent>{truck.truckSpaceMax}</CellContent>
            <CellContent>{truck.truckWeightMax}</CellContent>
            <CellContent>{quantity}</CellContent>
            <CellContent>{formatadorDeMilharesComRegex(price)}</CellContent>
            <CellContent>
                <Button bgcolor="red" onClick={()=>{ if(truck.id)CaminhaoService.getInstance().removeTruckInTable(truck.id) }} color="white">Excluir</Button>
            </CellContent>
        </CellBody>
    );
}
