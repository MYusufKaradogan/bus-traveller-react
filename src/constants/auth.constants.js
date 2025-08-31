export const authConstants = {
    LOGIN_REQUEST: 'USERS_LOGIN_REQUEST',
    LOGIN_SUCCESS: 'USERS_LOGIN_SUCCESS',
    LOGIN_FAILURE: 'USERS_LOGIN_FAILURE',
    LOGOUT: 'USERS_LOGOUT',
    LOAD_MENU_ITEMS: 'LOAD_MENU_ITEMS',
    CLEAR_METADATA: 'CLEAR_METADATA',
    LOGIN_WITH_TOKEN: 'LOGIN_WITH_TOKEN',
    REFRESH: 'REFRESH',
};


export const membershipType = {
    0: "inventoryOwner", // (Reklam Alan Sahibi)
    1: "advertiser",     // Reklam Veren
    2: "admin",         // Admin
    9: "user"           // Admin
}

export const membershipTypeValue = {
    inventoryOwner: 0, // (Reklam Alan Sahibi)
    advertiser: 1,     // Reklam Veren
    admin: 2,          // Admin
    user: 9          // User
}
