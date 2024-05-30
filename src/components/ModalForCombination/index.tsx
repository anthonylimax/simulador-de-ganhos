import { Product } from "../../interfaces/product";
import { ContainerCells } from "../../styles/global_styles";
import Cell from "../Cell";
import { Modal, Smocker } from "../Cell/cell";
import Header from "../Header";


export default function ModalForCombination({products} :{products : {produto: Product, quantity: number}[] }){
    return(
        <Smocker>
            <Modal style={{maxWidth: 2000, width: "80vw"}}>
                <ContainerCells>
                <button>Adicionar mais produtos</button>
                    <Header>
                    </Header>
                        {
                            products.map(({produto})=>{
                                return <Cell product={produto}></Cell>
                            })
                        }
                    
                </ContainerCells>
            </Modal>
        </Smocker>
    )
}