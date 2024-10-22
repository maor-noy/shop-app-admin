import { getCategoriesWithProducts } from "@/actions/categories";
import CategoryPageComponent from "@/app/admin/categories/page-component";

export default async function Catgories() {
    const categories = await getCategoriesWithProducts();

    return <CategoryPageComponent categories={categories} />; 
}