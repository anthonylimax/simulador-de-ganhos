import { Product } from "../interfaces/product";

export function calculateMaxProducts(product: Product) : number{
    const volumn = product.height * product.length * product.width;
    const quantityBySpace = (product.truckSpaceMax/volumn).toFixed(0);
    const quantityByWeight = (product.truckWeightMax/product.weight).toFixed(0);
    const max = quantityBySpace >= quantityByWeight ? quantityByWeight : quantityBySpace;
    return Number(max);
}