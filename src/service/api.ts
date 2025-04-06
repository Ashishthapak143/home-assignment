export const fetchCategories = async () => {
    try {
        const response = await fetch(`https://dummyjson.com/products/categories/`);
        const result = await response.json();
        return result
    } catch {
        throw new Error('Something wrong');
    }
};

export const fetchProducts = async (slug: string) => {
    try {
        const response = await fetch(`https://dummyjson.com/products/category/${slug}`);
        const result = await response.json();
        return result.products
    } catch {
        throw new Error('Something wrong');
    }
};