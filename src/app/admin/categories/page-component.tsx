'use client';

import { FC, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { PlusCircle } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { CategoryTableRow } from '@/components/category';
import {
  createCategorySchema,
  CreateCategorySchema,
} from '@/app/admin/categories/create-category.schema';
import { CategoriesWithProductsResponse } from '@/app/admin/categories/categories.types';
import { CategoryForm } from '@/app/admin/categories/category-form';

type props = {
    categories: CategoriesWithProductsResponse;
}

const CategoriesPageComponent: FC<props> = ({ categories }) => {
    const [IsCreateCategoryModalOpen, setIsCreateCategoryModalOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState<CreateCategorySchema | null>(null);
    const form = useForm<CreateCategorySchema>({
        resolver: zodResolver(createCategorySchema),
        defaultValues: {
            name: '',
            image: undefined,
        },
    });
    const submitCategoryHandler: SubmitHandler<CreateCategorySchema> = async (data) => {
        console.log(data);
    };
    return <main className='grid flex-1 item-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
        <div className='flex items-center my-10'>
            <div className='ml-auto flex item-center gap-2'>
                <Dialog open={IsCreateCategoryModalOpen} onOpenChange={()=>
                    setIsCreateCategoryModalOpen(!IsCreateCategoryModalOpen)}
                    >
                    <DialogTrigger asChild>
                        <Button size='sm' className='h-8 gap-1' onClick={() => { 
                            setCurrentCategory(null);
                            setIsCreateCategoryModalOpen(true)
                            }}>
                                <PlusCircle className='h-3.5 w-3.5'/>
                                <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
                                    Add Category
                                </span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                Create Category
                            </DialogTitle>
                        </DialogHeader>
                        <CategoryForm form={form} onSubmit={submitCategoryHandler} defaultValues={currentCategory}/>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
        </main>
}

export default CategoriesPageComponent;