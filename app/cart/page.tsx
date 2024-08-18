"use client";
import Button from "@/components/Button";
import CartItem from "@/components/CartItem";
import Popup from "@/components/Popup";
import { useCart } from "@/context/CartContext";
import { ButtonVariant } from "@/types";
import { useState } from "react";

const CartPage: React.FC = () => {
  const { cartItems, cartTotal, setDiscount } = useCart();
  const [percentageDiscount, setPercentageDiscount] = useState<string>("");
  const [fixedDiscount, setFixedDiscount] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const applyPercentageDiscount = () => {
    const discountValue = parseFloat(percentageDiscount);
    if (!isNaN(discountValue) && discountValue >= 0 && discountValue <= 100) {
      setDiscount(discountValue); // Apply percentage discount
      setFixedDiscount(""); // Clear fixed discount
      setError(null); // Clear any previous error
    } else {
      setError("Please enter a valid percentage (0-100).");
    }
  };

  const applyFixedDiscount = () => {
    const discountValue = parseFloat(fixedDiscount);
    if (
      !isNaN(discountValue) &&
      discountValue >= 0 &&
      discountValue < cartTotal
    ) {
      const percentageEquivalent = (discountValue / cartTotal) * 100;
      setDiscount(percentageEquivalent); // Apply the fixed discount by converting it to a percentage
      setPercentageDiscount(""); // Clear percentage discount
      setError(null); // Clear any previous error
    } else {
      setError("Please enter a valid fixed discount amount.");
    }
  };

  const inputClasses =
    "h-full w-full border-solid py-2.5 border-b placeholder:text-black bg-transparent text-base font-regular font-openSans outline outline-0 transition-all focus:outline-0";
  return (
    <div className="flex flex-col justify-between px-4 md:px-12 lg:px-24 overflow-hidden py-4 md:py-12">
      <h2>Your Cart</h2>
      <div className="flex flex-col gap-4">
        {cartItems.length > 0 ? (
          cartItems?.map((item, id) => <CartItem cartItem={item} key={id} />)
        ) : (
          <div>Your cart is empty</div>
        )}
      </div>
      <div className="flex flex-col gap-5 w-fit pt-20">
        <h2 className="text-2xl">Apply discount</h2>
        <div>
          <div>
            <label>
              Percentage Discount:
              <div className="flex">
                <input
                  type="text"
                  value={percentageDiscount}
                  onChange={(e) => setPercentageDiscount(e.target.value)}
                  placeholder="Enter percentage"
                  className={inputClasses}
                />
                <Button
                  title="Apply"
                  backgroundColor="grey"
                  variant={ButtonVariant.PRIMARY}
                  onClick={applyPercentageDiscount}
                />
              </div>
            </label>
          </div>
          <div style={{ marginTop: "10px" }}>
            <label>
              Fixed Discount ($):
              <div className="flex">
                <input
                  type="text"
                  value={fixedDiscount}
                  onChange={(e) => setFixedDiscount(e.target.value)}
                  placeholder="Enter fixed amount"
                  className={inputClasses}
                />
                <Button
                  title="Apply"
                  backgroundColor="grey"
                  variant={ButtonVariant.PRIMARY}
                  onClick={applyFixedDiscount}
                />
              </div>
            </label>
          </div>
        </div>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <h2 className="text-2xl">Total: ${cartTotal.toFixed(2)}</h2>
        <Button
          variant={ButtonVariant.SECONDARY}
          backgroundColor="gray"
          onClick={() => alert("Checkout Successfull")}
          title="Checkout"
          disabled={cartItems.length == 0}
        />
      </div>
    </div>
  );
};
export default CartPage;
