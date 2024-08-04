import { Dispatch, useEffect, useState } from "react";
import { Container, ContainerCells, Title } from "../../styles/global_styles";
import { Search } from "./management";
import { ProductServices } from "../../services/product";
import Cell from "../../components/Cell";
import Header from "../../components/Header";
import { RawProduct } from "../../interfaces/RawProduct";
export default function Management(){

    const [search, setSearch] = useState("");
    const [allProducts, setAllProducts] : [allProducts: RawProduct[], setAllProducts: Dispatch<any>] = useState([]);
    const products = ProductServices.getInstance();
    useEffect(()=>{
            products.getAllProducts().then((response)=>{
                setAllProducts(response);
            });
    }, [])

    return(
        <Container>
            <Title>Barra de pesquisa</Title>
            <Search onChange={({target}) => setSearch(target.value)} type="search" placeholder="Nome do produto"/>
            <ContainerCells>
                <Header />
                {
                    allProducts.map((product)=>{
                        if(product.name.toLowerCase().includes(search.toLowerCase())){
                            return <Cell product={product}></Cell>
                        }
                    })
                }
            </ContainerCells>
        </Container>
    )
}