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

export default function CaminhaoSpecific(){
    const location = useLocation();
    const [data, setData] : [{produto: Product, quantity: number}[], any] = useState(location.state.products);
    const [showModal, setShowModal] = useState(false);
    const [allProducts, setAllProducts] : [Product[], any] = useState([]);

    useEffect(()=>{
        ProductServices.instance.getAllProducts().then((result) => setAllProducts(result));
        CaminhaoService.getInstance().getAllProducts().then(result => {
            setData(result.filter(x => x.id === location.state.truck.id)[0].products);
            
        })
    })

    function calculateNumber(){
        let number = 0;
        data.forEach((element) =>{
            number += element.quantity;
        })
        return number;
    }

    return(
        <Container>
            <ContainerCells>
                    <button onClick={()=> setShowModal(true)}>Adicionar mais produtos</button>
                        <ContainerCells>
                            <Header>
                            </Header>
                            {
                                data.map((product) =>{
                                    return <CellProductByTruck length={calculateNumber()} product={{...product.produto}} />
                                })
                            }
                        </ContainerCells>
            
            </ContainerCells>
            {
                showModal ? (
                    <Smocker>
                        <Modal style={{overflow: "hidden", width: "95vw"}}>
                            <div style={{display: 'flex', flexDirection:'column'}}>
                                <h2>Escolha os produtos a serem adicionados</h2>
                                <ContainerCells>
                                    <Header></Header>
                                    {
                                        allProducts.map((product)=>{
                                            return <SelectProduct product={product} caminhao={location.state.truck}></SelectProduct>
                                        })
                                    }
                                </ContainerCells>
                            </div>
                        </Modal>
                    </Smocker>
                ) : null
            }
        </Container>
    );
}