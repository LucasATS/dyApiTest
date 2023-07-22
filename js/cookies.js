const getCookie = (chave) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${chave}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

const setCookie = (chave, valor, exdays = 100) => {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = chave + "=" + valor + ";" + expires + ";path=/";
}