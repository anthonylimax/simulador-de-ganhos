import { useLocation } from "react-router-dom";
import Header from "../../components/Header";
import { Product } from "../../interfaces/product";
import { Container, ContainerCells } from "../../styles/global_styles";
import { useEffect, useState } from "react";
import { Modal, Smocker } from "../../components/Cell/cell";
import { ProductServices } from "../../services/product";
import SelectProduct from "../../components/SelectProduct";
import CellProductByTruck from "../../components/CellProductByTruck";
import { CaminhaoService } from "../../services/caminhao";
import { Button } from "../Register/register";
import HeaderToSpecific from "../../components/headerToSpecific";

export default function CaminhaoSpecific() {
    const location = useLocation();
    const [data, setData] : [{produto: Product, quantity: number}[], any] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [allProducts, setAllProducts] : [Product[], any] = useState([]);
    const truckId = location.state.truck.id;
    const [operationCoust, setOperationCoust] = useState(0);
    const [truckSpaceMax, setTruckSpaceMax] = useState(0);
    const [truckWeightMax, setTruckWeightMax] = useState(0);
    useEffect(() => {
        ProductServices.instance.getAllProducts().then((result) => setAllProducts(result));
        CaminhaoService.getInstance().getAllTrucks().then(result => {
            const truck = result.find(x => x.id === truckId);
            setData(truck ? truck.products : []);
            setOperationCoust(truck ? truck.operationCoust : 0);
            setTruckSpaceMax(truck ? truck.truckSpaceMax : 0);
            setTruckWeightMax(truck ? truck.truckWeightMax : 0);
        });
    }, [location]);

    function calculateNumber() {
        let number = 0;
        data.forEach((element) => {
            number += element.quantity;
        });
        return number;
    }

    return (
        <Container>
            <ContainerCells>
                <Button bgcolor="blue" color="white" onClick={() => setShowModal(true)}>Adicionar mais produtos</Button>
                <ContainerCells>
                    <HeaderToSpecific />
                    {
                        data.map((product) => (
                                <CellProductByTruck length={calculateNumber()} operationCoust={operationCoust} product={{ ...product.produto }} truckId={truckId} setData={setData} data={data} quantity={product.quantity} truckWeightMax={truckWeightMax} truckSpaceMax={truckSpaceMax} />
                                
                        ))
                    }
                </ContainerCells>
            </ContainerCells>
            {
                showModal && (
                    <Smocker>
                        <Modal style={{overflow: "hidden", width: "95vw"}}>
                            
                            <div style={{display: 'flex', flexDirection:'column'}}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    flexDirection: 'row',
                                }}>
                                    <h2>Escolha os produtos a serem adicionados</h2>
                                    <h2 onClick={()=>{
                                        setShowModal(false)
                                    }} style={{fontSize: 50, cursor: 'pointer'}}>&times;</h2>
                                </div>
                                <ContainerCells>
                                    <Header />
                                    {
                                        allProducts.map((product) => (
                                            <SelectProduct key={product.id} product={product} caminhao={location.state.truck} />
                                        ))
                                    }
                                </ContainerCells>
                            </div>
                        </Modal>
                    </Smocker>
                )
            }
        </Container>
    );
}
