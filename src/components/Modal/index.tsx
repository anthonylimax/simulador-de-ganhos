import { Dispatch, useEffect, useState } from "react";
import { Product } from "../../interfaces/product";
import { Smocker, Modal as ModalContainer } from "../Cell/cell";
import { Button, Field, Form, InputLabel, JoinField } from "./modal";
import { ProductServices } from "../../services/product";
import { RawProduct } from "../../interfaces/RawProduct";


export default function Modal({product, setModal} : {product : RawProduct, setModal : Dispatch<any>}){
    
    const productService = ProductServices.getInstance();
    
    const [data, setData]: [data: RawProduct, setData: any] = useState(product);
     const [validation, setValidation] = useState(true);
    
     useEffect(()=>{
        verificadorDeCampos();
     },[data])
     function verificadorDeCampos(): boolean {
        const keys: Array<keyof RawProduct> = Object.keys(data) as Array<keyof RawProduct>;
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
    function HandleClickSmocker(event : any){
        if(event.target.id === "smocker"){
            setModal(false)
        }
        
    }
    
    return(
        <Smocker onClick={HandleClickSmocker} id="smocker">
            <ModalContainer>
            <Form style={{flexDirection: "row", flexWrap:"wrap"}}>
                <JoinField>
                    <InputLabel>Nome do produto</InputLabel>
                    <Field value={data.name} onChange={({target})=> setData({...data, name: target.value})} type="text" />
                </JoinField>
                <JoinField>
                    <InputLabel>Preço de fabrica</InputLabel>
                    <Field value={data.factoryPrice} onChange={({target})=> setData({...data, factoryPrice: Number(target.value)})} type="number" />
                </JoinField>
                <JoinField>
                    <InputLabel>Peso</InputLabel>
                    <Field value={data.weight} onChange={({target})=> setData({...data, weight: Number(target.value)})} type="number" />
                </JoinField>
                <JoinField>
                    <InputLabel>Largura (m³)</InputLabel>
                    <Field value={data.width} onChange={({target})=> setData({...data, width: Number(target.value)})} type="number" />
                </JoinField>
                <JoinField>
                    <InputLabel>Altura (m³)</InputLabel>
                    <Field value={data.height} onChange={({target})=> setData({...data, height: Number(target.value)})} type="number" />
                </JoinField>
                <JoinField>
                    <InputLabel>Comprimento (m³)</InputLabel>
                    <Field value={data.length} onChange={({target})=> setData({...data, length: Number(target.value)})} type="number" />
                </JoinField>

                <Button type="button" disabled={validation} onClick={async ()=> {
                    if(data.id){
                        const result : Product = {
                            factoryPrice: data.factoryPrice,
                            height: data.height,
                            icms: data.icms,
                            ipi: data.ipi,
                            length: data.length,
                            name: data.name,
                            operationCoust: data.operationCoust,
                            profit: data.profit,
                            truckSpaceMax: data.truckSpaceMax,
                            truckWeightMax: data.truckWeightMax,
                            weight: data.weight,
                            width: data.width,
                            
                        };
                        await productService.editProductInTable(data.id, result);
                        location.reload();
                    }
                }} color="white" bgcolor="#486623">Confirmar</Button>


            </Form>
            </ModalContainer>
        </Smocker>
    )
}