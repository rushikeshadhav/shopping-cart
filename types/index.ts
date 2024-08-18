import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

export interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    rating: {
        rate: number
        count: number
    };
    image: string;
}
export enum ButtonVariant {
    OUTLINE = 'OUTLINE',
    LINK = 'LINK',
    PRIMARY = 'PRIMARY',
    SECONDARY = 'SECONDARY',
    DISABLED = 'DISABLED',
}


export enum ButtonSize {
    SMALL = 'small',
    MEDIUM = 'medium',
    LARGE = 'large',
}
export interface ButtonType {
    variant: ButtonVariant;
    onClick: () => void;
    title: string;
    iconPosition?: 'left' | 'right';
    size?: ButtonSize;
    backgroundColor?: string;
    color?: string;
    icon?: IconDefinition;
    disabled?: boolean;
}
export enum IconPoistion {
    RIGHT = 'right',
    LEFT = 'left',
}
export type CartItemType = {
    product: Product;
    quantity: number;
};
