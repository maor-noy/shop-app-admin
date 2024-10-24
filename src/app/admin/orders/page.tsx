import {getOrderWithProducts} from "@/actions/orders";
import PageComponent from "@/app/admin/orders/page-component";
const Orders = async () => {
    const ordersWithProducts = await getOrderWithProducts();
    if(!ordersWithProducts) return <div className="text-center font-bold text 2xl">
        No orders found
    </div>;
    return <PageComponent ordersWithProducts={ordersWithProducts} />;
};

export default Orders;