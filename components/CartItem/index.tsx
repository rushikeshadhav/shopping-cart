import { useCart } from "@/context/CartContext";
import { ButtonVariant, CartItemType } from "@/types";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";
import Button from "../Button";

const CartItem = ({ cartItem }: { cartItem: CartItemType }) => {
  const { removeFromCart, updateCartItemQuantity } = useCart();
  const product = cartItem?.product;
  const quantity = cartItem?.quantity;

  const handleQuantityChange = (qty: number) => {
    const quantity = Number(qty);
    if (quantity >= 1) {
      updateCartItemQuantity(product.id, quantity);
    }
  };

  const handleRemoveClick = () => {
    removeFromCart(product.id);
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
      {product?.image ? (
        <Image src={product?.image} width={200} height={200} alt="image" />
      ) : null}
      <h2>{product.title}</h2>
      <div className="flex gap-4 items-center">
        <FontAwesomeIcon
          icon={faMinus}
          size="2xl"
          onClick={() => handleQuantityChange(quantity - 1)}
          className="cursor-pointer"
        />
        <h2>{quantity}</h2>
        <FontAwesomeIcon
          icon={faPlus}
          size="2xl"
          onClick={() => handleQuantityChange(quantity + 1)}
          className="cursor-pointer"
        />
      </div>
      <h2>${product?.price?.toFixed(2)}</h2>
      <Button
        onClick={handleRemoveClick}
        title="Remove Item"
        variant={ButtonVariant.PRIMARY}
        backgroundColor="grey"
      />
    </div>
  );
};

export default CartItem;
