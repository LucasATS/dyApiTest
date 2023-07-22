const lerLink = () => {
    try {
        const data = window.location.search.slice(1);
        if (!data) return null;

        const decompressedString = LZString.decompressFromBase64(decodeURIComponent(data));
        return JSON.parse(decompressedString);
    } catch (error) {
        modalErro(mensagens.erroLinkDecoder);
        console.error('Erro ao interpretar o link:', error);
        return null;
    }
};


const gerarLink = async (dados) => {
    try {
        const jsonString = JSON.stringify(dados);
        const compressedString = LZString.compressToBase64(jsonString);
        const urlFriendlyCode = encodeURIComponent(compressedString);

        const linkOrigin = window.location.origin;
        let link = `${linkOrigin}/?${urlFriendlyCode}`;

        // LOCAL
        if (linkOrigin === 'file://')
            link = `./index.html?${urlFriendlyCode}`;

        modalRedirecionarLink(link);
    } catch (error) {
        modalErro(mensagens.erroAoGerarLink);
        console.error('Erro ao gerar o link:', error);
    }
};