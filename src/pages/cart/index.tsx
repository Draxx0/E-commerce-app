import Layout from "@/layout/Layout";
import { IOrderItems } from "@/types/orderItem.type";
import { IOrders } from "@/types/orders.type";
import { IProduct } from "@/types/product.type";
import Image from "next/image";
import { useEffect, useState } from "react";

const CartPage = () => {
  const [order, setOrder] = useState<IOrders | null>(null);

  const getOrder = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`);
    const data = await response.json();
    setOrder(data[0]);
  };

  useEffect(() => {
    getOrder();
  }, []);

  const handleDeleteOrderItem = async (orderItem: IOrderItems) => {
    try {
      const orderItemResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/order-items/${orderItem.id}`,
        {
          method: "DELETE",
        }
      );
      await orderItemResponse.json();
      getOrder();
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeProductQuantity = async (
    e: React.ChangeEvent<HTMLInputElement>,
    orderItem: IOrderItems
  ) => {
    try {
      const orderItemResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/order-items/${orderItem.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...orderItem,
            quantity: e.target.value.toString(),
            product: orderItem.product.id,
          }),
        }
      );

      await orderItemResponse.json();
      getOrder();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout order={order}>
      <div className="cart">
        <h1 className="page-title">Panier</h1>

        <div className="row">
          {order?.orderItems.map((order) => (
            <div className="cart-item" key={order.id}>
              <div className="cart-item__image">
                <Image
                  src={order.product.image}
                  width={100}
                  height={100}
                  alt={order.product.title}
                />
              </div>
              <div className="cart-item__content">
                <h2 className="cart-item__title">{order.product.title}</h2>
                <p className="cart-item__price">
                  {" "}
                  Prix : {order.product.price} €
                </p>
                <p className="cart-item__price"> Quantité : {order.quantity}</p>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={order.quantity}
                  onChange={(e) => handleChangeProductQuantity(e, order)}
                />
              </div>

              <div className="card-item__action">
                <button
                  className="action-button-border"
                  onClick={() => handleDeleteOrderItem(order)}
                >
                  Supprimer {order.product.title}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart__total">
          <h2 className="cart__total-title">Total</h2>
          <p className="cart__total-price">{order?.totalPrice} €</p>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
