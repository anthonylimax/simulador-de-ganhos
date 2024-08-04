import app from "../config/firebase";
import { addDoc, collection, getDocs, getFirestore, deleteDoc, doc, updateDoc} from "firebase/firestore";
import { RawProduct } from "../interfaces/RawProduct";

export class ProductServices {
    static instance: ProductServices = new ProductServices();

    firestore = getFirestore(app);
    private constructor() {}

    static getInstance() {
        return this.instance;
    }
    async getAllProducts(): Promise<RawProduct[]> {
        try {
            const produtosRef = collection(this.firestore, 'produtos');
            const produtosSnapshot = await getDocs(produtosRef);
            const produtosData: any[] = produtosSnapshot.docs.map((doc) => ({
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
            await deleteDoc(doc(this.firestore, "produtos", id));
            console.log("Produto Removido com sucesso!");
            window.location.reload();
            return 0;
        } catch (error) {
            console.log("Erro ao remover o produto:", error);
            return 1;
        }
    }

    async addProductInTable(product: RawProduct) {
        try {
            await addDoc(collection(this.firestore,"produtos"), product);
            console.log("Produto adicionado com su  cesso!");
            return 0;
        } catch (error) {
            console.log("Erro ao adicionar o produto:", error);
            return 1;
        }
    }

    async editProductInTable(id: string, updatedProduct: RawProduct) {
        try {
            const productRef = doc(this.firestore, "produtos", id);
            await updateDoc(productRef, updatedProduct);
            console.log("Produto atualizado com sucesso!");
            return 0;
        } catch (error) {
            console.log("Erro ao atualizar o produto:", id, error);
            return 1;
        }
    }
}
