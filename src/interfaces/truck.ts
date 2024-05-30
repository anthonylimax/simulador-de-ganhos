import { Product } from "./product"

export type Truck = {
    id?: string,
    title: string,
    truckWeightMax: number,
    truckSpaceMax: number,
    products: {
        quantity: number,
        produto: Product,
    }[],
    operationCoust: number,
}


