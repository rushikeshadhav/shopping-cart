// components/Popup.tsx
"use client";
import { useEffect, useState } from "react";
import styles from "../../styles/Popup.module.css"; // Assuming you have a CSS module for styles

interface PopupProps {
  itemName: string;
}

const Popup: React.FC<PopupProps> = ({ itemName }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000); // Hide popup after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className={styles.popup}>
      <p>{itemName} has been added to your cart!</p>
    </div>
  );
};

export default Popup;
