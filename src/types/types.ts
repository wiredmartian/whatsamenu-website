import { PROVINCES } from "@/types/enums"

export type Menu = {
    menuId: string
    name: string
    summary: string
    restaurantId: string
    menuGroups: MenuGroup[]
    updated: string | Date
    created: string | Date
}

export type MenuGroup = {
    menuId: string
    menuGroupId: string
    name: string
    summary: string
    items: MenuItem[] | null
    updated: string | Date
    created: string | Date
}

export type MenuItem = {
    menuItemId: string
    menuId: string
    menuGroupId: number
    name: string
    summary: string
    description: string
    imageUrl: string
    price: number
    ingredients: MenuItemIngredient[] | null
    updated: string | Date
    created: string | Date
}

export type MenuItemIngredient = {
    ingredientId: string
    menuItemId: string
    name: string
    imageUrl: string
}

export type MenuItemAllergen = {
    allergenId: string
    menuItemId: string
    name: string
    summary: string
}

export type Restaurant = {
    restaurantId: string
    alias?: string
    name: string
    summary: string
    distance: string | number
    imageUrl: string | null
    address: Address
    updated: string | Date
    created: string | Date
}

export type Address = {
    addressId: string
    line1: string
    line2: string
    city: string
    state: PROVINCES
    country: string
    latitude: number
    longitude: number
}

// coordinates
export type GeoCoordinates = {
    latitude: number
    longitude: number
}

export type SignUpUserRequest = {
    email: string
    password: string
    confirmPassword?: string
}

export type SignInUserRequest = SignUpUserRequest

// Wikipedia query response
export type WikipediaQueryResponse = {
    query: {
        pages: Array<WikipediaPage>
    }
}
type WikipediaPage = {
    title: string
    missing?: boolean
    thumbnail: { source: string }
    terms: WikipediaTerms
}

type WikipediaTerms = {
    alias: string[]
    label: string[]
    description: string[]
}

// Errors
export type HttpResponseError = {
    error: string
}

// Menu enquiry types

export type ConversationInput = {
    prompt: Prompt
    reply?: Reply
}
export type Prompt = {
    message: string
    userId: string
    menuId: string
    status: "Sending" | "Sent" | "Failed, try again"
}

export type Reply = {
    text: string
    typing: boolean
}

export type GPTDataChunk = {
    id: string
    object: string
    created: number
    model: string
    choices: {
        delta: {
            content?: string
            role?: string
        }
        index: number
        finish_reason: string | null
    }[]
}

// API keys types

export type APIKey = {
    keyAlias: string
    name: string
    status: "ENABLED" | "DISABLED"
    userId: string
    created: string
    updated: string
}
