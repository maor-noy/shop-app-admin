'use client';

import { Table } from '@/components/ui/table';
import { format } from "date-fns";
import { OrdersWithProducts } from "./types";
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { updateOrderStatus } from '@/actions/orders';

const statusOptions = ['Pending', 'Shiped', 'InTransit', 'Completed']

type Props = {
    ordersWithProducts: OrdersWithProducts;
};

type OrderedProducts = {
    order_id: number;
    product: number & {
        category: number;
        created_at: string;
        heroImage: string;
        id: number;
        imagesUrl: string[];
        maxQuantity: number;
        price: number;
        slug: string;
        title: string;
    };
}[];
export default function PageComponent({ordersWithProducts}: Props) {
    const [selectedProduct, setSelectedProduct] = useState<OrderedProducts>([]);

    const openProductsModal = (products: OrderedProducts) => () => {
        setSelectedProduct(products);
    };
    const OrderedProducts = ordersWithProducts.flatMap((order) => order.order_items.map((item) => ({
        order_id: order.id,
        product: item.product,
    })));

    const handleStatusChange = async (orderId:number, status:string) =>{
        await updateOrderStatus(orderId, status);
    };
    return <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Orders Managment Dashboard</h1>
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Order Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>User</TableHead>
                    <TableHead>Slug</TableHead>
                    <TableHead>Total Price</TableHead>
                    <TableHead>Produts</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {ordersWithProducts.map((order) => (
                    <TableRow key={order.id}>
                        <TableCell>{order.id}</TableCell>
                        <TableCell>{format(new Date(order.created_at), 'dd MMM, yyyy')}</TableCell>
                        <TableCell>
                            <Select onValueChange={(value) => handleStatusChange(order.id, value)} defaultValue={order.status}>
                                <SelectTrigger className='w-[120px]'>
                                    <SelectValue>{order.status}</SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        statusOptions.map(status => (
                                            <SelectItem key={status} value={status}>
                                                {status}
                                            </SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                        </TableCell>
                        <TableCell>{order.description || 'No description'}</TableCell>
                        {/* @ts-ignore */}
                        <TableCell>{order.user.email}</TableCell>
                        <TableCell>{order.slug}</TableCell>
                        <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
                        <TableCell>
                            {order.order_items.length} product
                            {order.order_items.length > 1 ? 's' : ''}
                        </TableCell>
                        <TableCell>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant='outline' size='sm' onClick={
                                        openProductsModal(OrderedProducts
                                            .filter(item=>item.order_id === order.id))}>
                                        View Products
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Order Products</DialogTitle>
                                    </DialogHeader>
                                    <div className="mt-4">
                                        {selectedProduct.map(({ product }, index) => (
                                            <div key={index} className="mr-2 mb-2 flex items-center space-x-2">
                                                <Image
                                                    src={product.heroImage}
                                                    alt={product.title}
                                                    className="w-16 h-16 object-cover rounded"
                                                    width={64}
                                                    height={64}
                                                />

                                                <div className="flex flex-col">
                                                    <span className="font-semibold">{product.title}</span>
                                                    <span className="text-gray-600">${product.price.toFixed(2)}</span>
                                                    <span className="text-sm text-gray-500">
                                                    Available Quantity: {product.maxQuantity}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>;
}