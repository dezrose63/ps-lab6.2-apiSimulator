import { NetworkError, DataError } from './errors';

export type Product = { id: number; name: string; price: number };
export type Review = { productId: number; rating: number; comment: string };
export type SalesReport = { totalSales: number; unitsSold: number; averagePrice: number };

const chance = (p:number) => Math.random() < p;
const delay = (ms:number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchProductCatalog = async (): Promise<Product[]> => {
    await delay(1000);
    if (chance(0.2)) throw new NetworkError("Failed to fetch product catalog");
    const products: Product[] = [
        { id: 1, name: "Laptop", price: 1200 },
        { id: 2, name: "Headphones", price: 200 },
        { id: 3, name: "Mechanical Keyboard", price: 150 },
        { id: 4, name: "USB-C Hub", price: 49 },
    ];
    if (chance(0.5)) throw new DataError("Product catalog contains invalid/misssing fields");
    return products;
};

export const fetchProductReviews = async (productId: number): Promise<Review[]> => {
    await delay(1500);
    if (chance(0.25)) throw new NetworkError(`Failed to fetch reviews for product ID ${productId}`);
    const mock: Record<number, Review[]> = {
        1: [ { productId: 1, rating: 5, comment: "Blazing fast. Worth it." },
             { productId: 1, rating: 4, comment: "Very good performance." } ],

        2: [ { productId: 2, rating: 3, comment: "Average sound quality." } ],

        3: [ { productId: 3, rating: 4, comment: "Great for typing." }, 
            { productId: 3, rating: 5, comment: "Loving the tactile feedback!" } ],

        4: [ { productId: 4, rating: 4, comment: "Very useful for my laptop." } ],
    };
    const reviews = mock[productId] ?? [];
    if (!Array.isArray(reviews)) throw new DataError(`Invalid reviews format for product ID ${productId}`);
    return reviews;
};

export const fetchSalesReport = async (): Promise<SalesReport> => {
    await delay(1000);
    if (chance(0.15)) throw new NetworkError("Failed to fetch sales report");
    const report: SalesReport = {
        totalSales: 125000,
        unitsSold: 350,
        averagePrice: parseFloat((125000 / 350).toFixed(2)),
    };
    if (!Number.isFinite(report.averagePrice) || chance(0.03)) {
        throw new DataError("Sales report contains invalid numeric fields");
    }
    return report;
};