'use server';

import slugify from 'slugify';
import { createClient } from '@/supabase/server';
import {
    ProductsWithCategoriesResponse,
    UpdateProductSchema,
} from '@/app/admin/products/product.types'
import { CreateProductSchemaServer } from '@/app/admin/products/schema';
import { CreateCategorySchemaServer } from '@/app/admin/categories/create-category.schema';

const supabase = createClient();

export const getProductWithCategory = async ()
:Promise<ProductsWithCategoriesResponse> => {
    const { data, error } = await supabase
        .from('product')
        .select(`
            *,
            category:categories(*)
        `)
        .returns<ProductsWithCategoriesResponse>();
    if (error) {
        throw new Error(`Error fetching products: ${error.message}`);
    }
    return data || [];
}

export const createProduct = async ({
    category,
    heroImage,
    images,
    maxQuantity,
    price,
    title,
}:CreateProductSchemaServer)=> {
    const slug = slugify(title, {
        lower: true,
    });
    const { data, error } = await supabase
        .from('product')
        .insert({
            category,
            heroImage,
            imagesUrl:images,
            maxQuantity,
            price,
            slug,
            title,
        });
    if (error) {
        throw new Error(`Error creating product: ${error.message}`);
    }
    return data;
};

export const updateProduct = async (
    {
        category,
        heroImage,
        imagesUrl,
        maxQuantity,
        price,
        slug,
        title,
    }:UpdateProductSchema
) => {
    const { data, error } = await supabase
        .from('product')
        .update({
            category,
            heroImage,
            imagesUrl,
            maxQuantity,
            price,
            slug,
            title,
        })
        .match({ slug });
    if (error) {
        throw new Error(`Error updating product: ${error.message}`);
    }
    return data;
};

export const deleteProduct = async (slug:string) => {
    const { error } = await supabase
        .from('product')
        .delete()
        .match({ slug });
    if (error) {
        throw new Error(`Error deleting product: ${error.message}`);
    }
}; 