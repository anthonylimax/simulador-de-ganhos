import Navbar from "./components/Navbar";


export default function Layout({children} : {children: any}){
    return(
        <div>
            <Navbar />
            {children}
        </div>

    )    
}