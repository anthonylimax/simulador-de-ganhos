import app from "../config/firebase";
import { Truck } from "../interfaces/truck";
import { addDoc, collection, getDocs, getFirestore, deleteDoc, doc, updateDoc } from "firebase/firestore";

export class CaminhaoService {
    static instance: CaminhaoService = new CaminhaoService();

    firestore = getFirestore(app);
    private constructor() {}
    
    static getInstance() {
        return this.instance;
    }

    async getAllProducts(): Promise<Truck[]> {
        try {
            const produtosRef = collection(this.firestore, 'caminhao');
            const produtosSnapshot = await getDocs(produtosRef);
            let produtosData: any[] = produtosSnapshot.docs.map( (doc) => ({
                ...doc.data(),
                id: doc.id
            }));
            return produtosData;
        } catch (error) {
            console.log("Erro ao obter os produtos:", error);
            return [];
        }
    }

    async removeProductInTable(id: string) {
        try {
            await deleteDoc(doc(this.firestore, "caminhao", id));
            console.log("Produto Removido com sucesso!");
            window.location.reload();
            return 0;
        } catch (error) {
            console.log("Erro ao remover o produto:", error);
            return 1;
        }
    }

    async addNewTruck(truck: Truck) {
        try {
            await addDoc(collection(this.firestore, "caminhao"), truck);
            console.log("Truck adicionado com sucesso!");
            return 0;
        } catch (error) {
            console.log("Erro ao adicionar o truck:", error);
            return 1;
        }
    }

    async updateTruck(id: string, updatedTruck: Truck) {
        try {
            const productRef = doc(this.firestore, "caminhao", id);
            await updateDoc(productRef, updatedTruck);
            console.log("Truck atualizado com sucesso!");
            location.reload();
            return 0;
        } catch (error) {
            console.log("Erro ao atualizar o caminhao:", id, error);
            return 1;
        }
    }
}


