import { getCategoriesWithProducts } from "@/actions/categories";
import {ProductPageComponnnt} from "@/app/admin/products/page-component";

export default async function Products() {
    const categories = await getCategoriesWithProducts();
    return <ProductPageComponnnt categories={categories} />;
}