export type Menu = {
    menuId: string;
    name: string;
    summary: string;
    restaurantId: string;
    menuGroups: MenuGroup[]
    updated: string | Date;
    created: string | Date;
}

export type MenuGroup = {
    menuId: string;
    menuGroupId: string;
    name: string;
    summary: string;
    items: MenuItem[] | null
    updated: string | Date;
    created: string | Date;
}

export type MenuItem = {
    menuItemId: string;
    menuId: string;
    menuGroupId: string;
    name: string;
    summary: string;
    description: string;
    imageUrl: string;
    price: number;
    ingredients: MenuItemIngredient[] | null;
    updated: string | Date;
    created: string | Date;
}

export type MenuItemIngredient = {
    ingredientId: string;
    menuItemId: string;
    name: string;
    imageUrl: string;
}

export type MenuItemAllergen = {
    allergenId: string;
    menuItemId: string;
    name: string;
    summary: string;
}

