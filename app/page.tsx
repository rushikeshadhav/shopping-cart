"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getProducts } from "@/lib/services";
import { ButtonVariant, Product } from "@/types";
import { useCart } from "@/context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Button from "@/components/Button";
import Popup from "@/components/Popup";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);
  const [showPopup, setShowPopup] = useState<Boolean>(false);

  const { cartCount, addToCart } = useCart();

  const handleAddToCartClick = (product: Product) => {
    setShowPopup(true);
    addToCart(product);
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-4 md:px-12 lg:px-24 overflow-hidden md:py-12 py-4">
      <div>
        <div className="flex justify-between pb-4 md:pb-8">
          <h1>Product Listing</h1>
          <Link href="/cart" className="flex items-center gap-2">
            <FontAwesomeIcon icon={faCartShopping} size="2xl" />
            <div>{cartCount}</div>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {products?.map((product) => (
            <div
              key={product.id}
              className="flex flex-col items-start gap-4 justify-between"
            >
              {showPopup ? <Popup itemName="Product" /> : null}
              {product?.image ? (
                <div className="w-80 h-80 overflow-hidden">
                  <Image
                    src={product?.image}
                    width={300}
                    height={300}
                    alt="image"
                  />
                </div>
              ) : null}
              <div className="flex flex-col gap-2">
                <h2>{product.title}</h2>
                <p>
                  <strong>Price:</strong> ${product?.price?.toFixed(2)}
                </p>
                <p>
                  <strong>In Stock:</strong> {product.rating.count}
                </p>
              </div>
              <Button
                variant={ButtonVariant.PRIMARY}
                backgroundColor="gray"
                onClick={() => handleAddToCartClick(product)}
                title="Add to Cart"
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
