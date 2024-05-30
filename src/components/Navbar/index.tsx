import { Link } from "react-router-dom"
import { colors } from "../../styles/global_styles"
import { Nav, Links } from "./navbar"


export default function Navbar(){
    return(
        <Nav>
            <img src="https://arquivos.mercos.com/media/logomarca/301137/a69b9d90-95e5-11ea-9e72-0242ac120009.png" alt="" />
            <Links>
                <Link style={location.pathname === "/gerenciamento" ? {color: colors.primary} : {}} to={"/gerenciamento"}>Gerenciamento</Link>
                <Link style={location.pathname.includes("/combinacoes") ? {color: colors.primary} : {}} to={"/combinacoes"}>Simulação</Link>
                <Link style={location.pathname === "/register" ? {color: colors.primary} : {}} to={"/register"}>Formulário</Link>
            </Links>
        </Nav>
    )
}