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

export type Restaurant = {
    restaurantId: string;
    name: string;
    summary: string;
    distance: string | number;
    imageUrl: string | null;
    address: Address;
    updated: string | Date;
    created: string | Date;
}

export type Address = {
    addressId: string;
    line1: string;
    line2: string;
    city: string;
    state: string;
    country: string;
    latitude: number;
    longitude: number;
}


// create and update models
export type SignUpUserRequest = {
    email: string;
    password: string;
}
export type SignInUserRequest = SignUpUserRequest


// restaurant create models

export type AddRestaurantRequest = {
    name: string;
    summary: string;

    // address
    line1: string;
    line2: string;
    city: string;
    state: string;
    country: string;
    latitude: number;
    longitude: number;
}

// Wikipedia query response
export type WikipediaQueryResponse = {
    query: {
        pages: Array<WikipediaPage>
    };
}
type WikipediaPage = {
    title: string;
    missing?: boolean;
    thumbnail: {source: string};
    terms: WikipediaTerms
}

type WikipediaTerms = {
    alias: string[];
    label: string[];
    description: string[];
}

export const DISAMBIGUATION_PAGE = "Wikimedia disambiguation page"