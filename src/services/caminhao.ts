import app from "../config/firebase";
import { Product } from "../interfaces/product";
import { Truck } from "../interfaces/truck";
import { addDoc, collection, getDocs, getFirestore, updateDoc, doc, getDoc } from "firebase/firestore";

export class CaminhaoService {
    static instance: CaminhaoService = new CaminhaoService();
    firestore = getFirestore(app);

    private constructor() {}

    static getInstance() {
        return this.instance;
    }

    async getAllTrucks(): Promise<Truck[]> {
        try {
            const truckRef = collection(this.firestore, 'caminhao');
            const truckSnapshot = await getDocs(truckRef);
            return truckSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })) as Truck[];
        } catch (error) {
            console.error("Erro ao obter os caminhões:", error);
            return [];
        }
    }

    async addNewTruck(truck: Truck) {
        try {
            console.log("Tentando adicionar caminhão:", truck);  // Log para depuração
            await addDoc(collection(this.firestore, "caminhao"), truck);
            console.log("Caminhão adicionado com sucesso!");
        } catch (error) {
            console.error("Erro ao adicionar caminhão:", error);
        }
    }

    async updateTruckProducts(truckId: string, products: { produto: Product, quantity: number }[]) {
        try {
            const truckRef = doc(this.firestore, "caminhao", truckId);
            await updateDoc(truckRef, { products });

            console.log("Produtos atualizados com sucesso no caminhão!");
        } catch (error) {
            console.error("Erro ao atualizar produtos no caminhão:", error);
        }
    }

    async removeProductFromTruck(truckId: string, productId: string) {
        try {
            const truckRef = doc(this.firestore, "caminhao", truckId);
            const truckSnapshot = await getDoc(truckRef);
            if (truckSnapshot.exists()) {
                const truckData = truckSnapshot.data() as Truck;
                const updatedProducts = truckData.products.filter(p => p.produto.id !== productId);
                await updateDoc(truckRef, { products: updatedProducts });
                console.log("Produto removido com sucesso do caminhão!");
            }
        } catch (error) {
            console.error("Erro ao remover produto do caminhão:", error);
        }
    }
}
