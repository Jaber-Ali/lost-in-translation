export const getStorage = key => {
    return localStorage.getItem(key);
}

export const removeItemStorage = (key) => {
    localStorage.removeItem(key)
}

export const setItemStorage = (key, val) => {
    localStorage.setItem(key, val);
}