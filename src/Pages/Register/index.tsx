import { Container, Title } from "../../styles/global_styles";
import { Button, Field, Form, InputLabel, JoinField } from "./register";
import { useEffect, useState } from "react";
import { ProductServices } from "../../services/product";
import { RawProduct } from "../../interfaces/RawProduct";

export default function Register() {
    const product = ProductServices.getInstance();
    const [data, setData]: [data: RawProduct, setData: any] = useState({
        factoryPrice: -1, height: -1, length: -1,
        weight: -1,name: "", width: -1
    });
    const [validation, setValidation] = useState(true);

    useEffect(() => {
        verificadorDeCampos();
    }, [data]);

    function verificadorDeCampos(): boolean {
        const keys: Array<keyof RawProduct> = Object.keys(data) as Array<keyof RawProduct>;
        const copyData = { ...data };
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
                    <Field onChange={({ target }) => setData({ ...data, name: target.value })} type="text" />
                </JoinField>
                <JoinField>
                    <InputLabel>Preço de fabrica (R$)</InputLabel>
                    <Field onChange={({ target }) => setData({ ...data, factoryPrice: Number(target.value) })} type="number" />
                </JoinField>
                <JoinField>
                    <InputLabel>Peso (Kg)</InputLabel>
                    <Field onChange={({ target }) => setData({ ...data, weight: Number(target.value) })} type="number" />
                </JoinField>
                <JoinField>
                    <InputLabel>Largura (m)</InputLabel>
                    <Field onChange={({ target }) => setData({ ...data, width: Number(target.value) })} type="number" />
                </JoinField>
                <JoinField>
                    <InputLabel>Altura (m)</InputLabel>
                    <Field onChange={({ target }) => setData({ ...data, height: Number(target.value) })} type="number" />
                </JoinField>
                <JoinField>
                    <InputLabel>Comprimento (m)</InputLabel>
                    <Field onChange={({ target }) => setData({ ...data, length: Number(target.value) })} type="number" />
                </JoinField>

                <Button type="button" disabled={validation} onClick={async () => {
                    await product.addProductInTable(data);
                    window.location.href = "/"
                }} color="white" bgcolor="#486623">Confirmar</Button>
            </Form>
        </Container>
    )
}
