import { ChangeEvent, useEffect, useState } from "react";
import { Container, ContainerCells } from "../../styles/global_styles";
import { CaminhaoService } from "./../../services/caminhao"
import { Truck } from "../../interfaces/truck";
import Cell from "../../components/CellTruck";
import { Button, Field, Form, InputLabel, JoinField } from "../Register/register";
import { Modal, Smocker } from "../../components/Cell/cell";
import HeaderTruck from "../../components/HeaderTruck";

export default function Simulacao() {
    const [data, setData]: [Truck[], any] = useState([]);
    const [createNewTruck, setCreateNewTruck] = useState<Truck>({operationCoust: 0,  profit: 0, products: [], title: "", truckWeightMax: 0, truckSpaceMax: 0});
    const [click, setClick] = useState(false);
    const service: CaminhaoService = CaminhaoService.getInstance();
    
    useEffect(() => {
        service.getAllTrucks().then((result: Truck[]) => {
            setData(result);
        }).catch(() => {
            console.log("erro")
        })
    }, [])

    function handleInputs(event : ChangeEvent<HTMLInputElement>){
        
        setCreateNewTruck({...createNewTruck, [event.target.name]: event.target.value})
    }

    return (
        <Container>
            <h2>Caminhões</h2>
            <h3>Aqui você pode fazer seus caminhões e adicionar os produtos que desejar!</h3>
            <Button onClick={() => setClick(true)} color="white" bgcolor="blue" style={{ fontWeight: "bold", marginTop: 50 }}>Adicionar novo Caminhão</Button>
            <ContainerCells>
                <HeaderTruck></HeaderTruck>
                {
                    data.map((element, key) => {
                        return <Cell key={key} truck={element} />
                    })

                }
            </ContainerCells>
            {
                click && (
                    <Smocker>
                        <Modal>
                            <Form style={{ flexDirection: "column", width: "100%",alignItems:"center",justifyContent: "center" }}>
                                <div style={{width: "300px", display:"flex",flexDirection: "column",alignItems:"center", height:"100%" ,justifyContent: "space-around"}}>
                                    <JoinField>
                                        <InputLabel>Nome:</InputLabel>
                                        <Field name="title" onChange={handleInputs} type="text" />
                                    </JoinField>
                                    <JoinField>
                                        <InputLabel>Peso máximo do caminhão (Kg):</InputLabel>
                                        <Field name="truckWeightMax" onChange={handleInputs} type="text" />
                                    </JoinField>
                                    <JoinField>
                                        <InputLabel>Custo Operacional + frete (R$):</InputLabel>
                                        <Field name="operationCoust" onChange={handleInputs} type="text" />
                                    </JoinField>
                                    <JoinField>
                                        <InputLabel>Volume Máximo (m³):</InputLabel>
                                        <Field name="truckSpaceMax" onChange={handleInputs} type="text" />
                                    </JoinField>
                                    <JoinField>
                                        <InputLabel>Lucro Total desejado (R$):</InputLabel>
                                        <Field name="profit" onChange={handleInputs} type="text" />
                                    </JoinField>
                                    <div>
                                        <Button onClick={()=>{
                                            CaminhaoService.getInstance().addNewTruck(createNewTruck)
                                        }} color="white" bgcolor="green">Confirmar</Button>
                                        <Button onClick={() => setClick(false)} bgcolor="red" color="white">Cancelar</Button>
                                    </div>
                                </div>
                            </Form>
                        </Modal>
                    </Smocker>
                )
            }
        </Container >
    )
}
