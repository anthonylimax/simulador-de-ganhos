import { Container, Title } from "../../styles/global_styles";
import { Button, Field, Form, InputLabel, JoinField } from "./register";
import { useEffect, useState } from "react";
import { Product } from "../../interfaces/product";
import { ProductServices } from "../../services/product";

export default function Register() {
    
    
    const product = ProductServices.getInstance();
    
    const [data, setData]: [data: Product, setData: any] = useState({ factoryPrice: -1, height: -1, icms: -1, ipi: -1, length: -1, weight: -1, profit: -1, name: "", width: -1, truckSpaceMax: -1, truckWeightMax: -1, operationCoust: -1
     });
     const [validation, setValidation] = useState(true);
    
     useEffect(()=>{
        verificadorDeCampos();
     },[data])


     function verificadorDeCampos(): boolean {
        const keys: Array<keyof Product> = Object.keys(data) as Array<keyof Product>;
        const copyData = { ...data };
        console.log("here");
        console.log(validation);
      
        for (let i = 0; i < keys.length; i++) {
          if (copyData[keys[i]] == -1 || copyData[keys[i]] == "") {
            setValidation(true);
            return true;
          }
        }
      
        setValidation(false);
        return false;
      }

    return (
        <Container>
            <Title>Registrar novo produto</Title>

            <Form>
                <JoinField>
                    <InputLabel>Nome do produto</InputLabel>
                    <Field onChange={({target})=> setData({...data, name: target.value})} type="text" />
                </JoinField>
                <JoinField>
                    <InputLabel>Preço de fabrica</InputLabel>
                    <Field onChange={({target})=> setData({...data, factoryPrice: Number(target.value)})} type="number" />
                </JoinField>
                <JoinField>
                    <InputLabel>IPI</InputLabel>
                    <Field onChange={({target})=> setData({...data, ipi: Number(target.value)})} type="number" />
                </JoinField>
                <JoinField>
                    <InputLabel>ICMS</InputLabel>
                    <Field onChange={({target})=> setData({...data, icms: Number(target.value)})} type="number" />
                </JoinField>
                <JoinField>
                    <InputLabel>Peso</InputLabel>
                    <Field onChange={({target})=> setData({...data, weight: Number(target.value)})} type="number" />
                </JoinField>
                <JoinField>
                    <InputLabel>Lucro desejado</InputLabel>
                    <Field onChange={({target})=> setData({...data, profit: Number(target.value)})} type="number" />
                </JoinField>
                <JoinField>
                    <InputLabel>Peso Máximo do Caminhão (kg)</InputLabel>
                    <Field onChange={({target})=> setData({...data, truckWeightMax: Number(target.value)})} type="number" />
                </JoinField>
                <JoinField>
                    <InputLabel>Volume Máximo do Caminhão (m³)</InputLabel>
                    <Field onChange={({target})=> setData({...data, truckSpaceMax: Number(target.value)})} type="number" />
                </JoinField>
                <JoinField>
                    <InputLabel>Largura (m³)</InputLabel>
                    <Field onChange={({target})=> setData({...data, width: Number(target.value)})} type="number" />
                </JoinField>
                <JoinField>
                    <InputLabel>Altura (m³)</InputLabel>
                    <Field onChange={({target})=> setData({...data, height: Number(target.value)})} type="number" />
                </JoinField>
                <JoinField>
                    <InputLabel>Comprimento (m³)</InputLabel>
                    <Field onChange={({target})=> setData({...data, length: Number(target.value)})} type="number" />
                </JoinField>
                <JoinField>
                    <InputLabel>Custo operacional</InputLabel>
                    <Field onChange={({target})=> setData({...data, operationCoust: Number(target.value)})} type="number" />
                </JoinField>

                <Button type="button" disabled={validation} onClick={async ()=> {
                    await product.addProductInTable(data);
                    window.location.href = "/gerenciamento"
                }} color="white" bgcolor="#486623">Confirmar</Button>


            </Form>
        </Container>
    )
}