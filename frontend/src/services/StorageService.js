function store(key, any) {
    localStorage[key] = JSON.stringify(any);
}

function load(key) {
    var str = localStorage[key] || 'null';
    return JSON.parse(str);
}
// added for logging out
function remove(key) {
    localStorage.removeItem(key);
}

export const storageService = {
    store,
    load,
    remove
}