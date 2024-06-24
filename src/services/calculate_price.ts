import { Product } from "../interfaces/product";
    
export function calculatePrice(product : Partial<Product>, profit : number, result : number, operationCoust : number){
    if(product !== undefined && product.icms && product.ipi && product.factoryPrice && product.profit){
    const finalPrice : number = ((product.factoryPrice + (product.factoryPrice * (product.ipi/100))) + (product.factoryPrice + product.factoryPrice * (product.ipi/100)) * (product.icms/100)) + (operationCoust / result) +(profit / result);
    return finalPrice;
    }
    return 0;
}