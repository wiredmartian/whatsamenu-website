export enum PROVINCES {
    EASTERN_CAPE = "EASTERN_CAPE",
    FREE_STATE = "FREE_STATE",
    GAUTENG = "GAUTENG",
    KWAZULU_NATAL = "KWAZULU_NATAL",
    LIMPOPO = "LIMPOPO",
    MPUMALANGA = "MPUMALANGA",
    NORTHERN_CAPE = "NORTHERN_CAPE",
    NORTH_WEST = "NORTH_WEST",
    WESTERN_CAPE = "WESTERN_CAPE",
}

export const ProvincesMap: Record<PROVINCES, string> = {
    EASTERN_CAPE: "Eastern Cape",
    FREE_STATE: "Free State",
    GAUTENG: "Gauteng",
    KWAZULU_NATAL: "KwaZulu-Natal",
    LIMPOPO: "Limpopo",
    MPUMALANGA: "Mpumalanga",
    NORTHERN_CAPE: "Northern Cape",
    NORTH_WEST: "North West",
    WESTERN_CAPE: "Western Cape"
}

export enum ENTITY_TYPE {
    RESTAURANT = "RESTAURANT",
    MENUITEM = "MENUITEM",
    INGREDIENT = "INGREDIENT",
    ALLERGEN = "ALLERGEN",
    MENUGROUP = "MENUGROUP"
}
