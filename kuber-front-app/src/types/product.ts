export type Product = {
    id: number;
    name: string;
    description: string | null;
    price: number;
    created_at: string;
    updated_at: string;
};

export type ProductCreate = {
    name: string;
    description: string | null;
    price: number;
};

export type ProductUpdate = {
    name?: string;
    description?: string | null;
    price?: number;
};
