import { useEffect, useState } from "react";
import { Container, ContainerCells } from "../../styles/global_styles";
import { CaminhaoService } from "./../../services/caminhao"
import { Truck } from "../../interfaces/truck";
import Cell from "../../components/CellTruck";
import { Button, Field, Form, InputLabel, JoinField } from "../Register/register";
import { Modal, Smocker } from "../../components/Cell/cell";
import { Header } from "../../components/HeaderTruck/headerTruck";
import HeaderTruck from "../../components/HeaderTruck";

export default function Simulacao() {
    const [data, setData]: [Truck[], any] = useState([]);
    const [createNewTruck, setCreateNewTruck] = useState<Truck>({operationCoust: 0, products: [], title: "", truckWeightMax: 0, truckSpaceMax: 0});
    const [click, setClick] = useState(false);
    const service: CaminhaoService = CaminhaoService.getInstance();
    
    useEffect(() => {
        service.getAllTrucks().then((result: Truck[]) => {
            setData(result);
        }).catch(() => {
            console.log("erro")
        })
    }, [])

    return (
        <Container>
            <h2>Combinações</h2>
            <h3>Aqui você pode fazer seus caminhões e adicionar os produtos que desejar!</h3>
            <Button onClick={() => setClick(true)} color="white" bgcolor="blue" style={{ fontWeight: "bold", marginTop: 50 }}>Adicionar nova combinação</Button>
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
                                        <InputLabel>Nome da combinação:</InputLabel>
                                        <Field onChange={({ target }) => setCreateNewTruck({...createNewTruck, title: target.value})} type="text" />
                                    </JoinField>
                                    <JoinField>
                                        <InputLabel>Peso máximo do caminhão:</InputLabel>
                                        <Field onChange={({ target }) => setCreateNewTruck({...createNewTruck, truckWeightMax: Number(target.value)})} type="text" />
                                    </JoinField>
                                    <JoinField>
                                        <InputLabel>Custo Operacional:</InputLabel>
                                        <Field onChange={({ target }) => setCreateNewTruck({...createNewTruck, operationCoust: Number(target.value)})} type="text" />
                                    </JoinField>
                                    <JoinField>
                                        <InputLabel>Volume Máximo:</InputLabel>
                                        <Field onChange={({ target }) => setCreateNewTruck({...createNewTruck, truckSpaceMax: Number(target.value)})} type="text" />
                                    </JoinField>
                                    <div>
                                        <Button onClick={()=>CaminhaoService.getInstance().addNewTruck(createNewTruck)} color="white" bgcolor="green">Confirmar</Button>
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
