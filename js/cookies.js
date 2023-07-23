const setCookie = (chave, valor, exdays = 100) => {
    const dataExpiracao = new Date();
    dataExpiracao.setTime(dataExpiracao.getTime() + (exdays * 24 * 60 * 60 * 1000));

    const cookie = `${chave}=${valor}; expires=${dataExpiracao.toUTCString()}; path=/`;
    document.cookie = cookie;

    // console.log('Cookie salvo:', cookie);
}


const getCookie = (chave) => {
    const cookies = document.cookie.split(';');

    for (const cookie of cookies) {
        const [nome, valor] = cookie.trim().split('=');

        if (nome === chave) {
            // console.log('Valor do cookie:', valor);
            return valor;
        }
    }

    // console.log('Cookie não encontrado.');
    return null;
}