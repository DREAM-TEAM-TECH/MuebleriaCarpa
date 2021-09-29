export interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    color: string;
    material: string;
    stock: number;
    description: string; 
    uploadDate: Date;
}

export interface Category {
    id: string;
    nameCategory: string;
    descCategory: string;
}