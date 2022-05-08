export type Menu = {
    menuId: string;
    name: string;
    summary: string;
    restaurantId: string;
    menuGroups: MenuGroup[]
}

export type MenuGroup = {
    menuId: string;
    menuGroupId: string;
    name: string;
    summary: string;
    items: MenuItem[] | null
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
    ingredients: [];
    updated: string | Date;
    created: string | Date;
}