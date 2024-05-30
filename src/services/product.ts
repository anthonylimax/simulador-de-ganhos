import app from "../config/firebase";
import { Product } from "../interfaces/product";
import { addDoc, collection, getDocs, getFirestore, deleteDoc, doc, updateDoc} from "firebase/firestore";

export class ProductServices {
    static instance: ProductServices = new ProductServices();

    firestore = getFirestore(app);
    private constructor() {}

    static getInstance() {
        return this.instance;
    }
    async getAllProducts(): Promise<Product[]> {
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

    async addProductInTable(product: Product) {
        try {
            await addDoc(collection(this.firestore, "produtos"), product);
            console.log("Produto adicionado com sucesso!");
            return 0;
        } catch (error) {
            console.log("Erro ao adicionar o produto:", error);
            return 1;
        }
    }

    async editProductInTable(id: string, updatedProduct: Product) {
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
