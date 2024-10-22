import { getCategoriesWithProducts } from "@/actions/categories";
import { getProductsWithCategory } from "@/actions/products";
import {ProductPageComponent} from "@/app/admin/products/page-component";

export default async function Products() {
    const categories = await getCategoriesWithProducts();
    const productsWithCategories = await getProductsWithCategory();
    return <ProductPageComponent 
    categories={categories}
    productsWithCategories = {productsWithCategories} />;
}