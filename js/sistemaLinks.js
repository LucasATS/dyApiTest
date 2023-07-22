// async function compressToString(string, encoding = 'gzip') {
//     const byteArray = new TextEncoder().encode(string);
//     const cs = new CompressionStream(encoding);
//     const writer = cs.writable.getWriter();
//     writer.write(byteArray);
//     writer.close();

//     const compressedArrayBuffer = await new Response(cs.readable).arrayBuffer();
//     const compressedUint8Array = new Uint8Array(compressedArrayBuffer);

//     const textDecoder = new TextDecoder();
//     const compressedString = textDecoder.decode(compressedUint8Array);

//     return compressedString;
// }


// async function decompress(byteArray, encoding = 'gzip') {
//     const cs = new DecompressionStream(encoding);
//     const writer = cs.writable.getWriter();
//     writer.write(byteArray);
//     writer.close();
//     const arrayBuffer = await new Response(cs.readable).arrayBuffer();
//     return new TextDecoder().decode(arrayBuffer);
// }


const lerLink = async () => {
    try {
        const data = window.location.search.slice(1);
        if (!data) return null;

        const decompressedString = LZString.decompressFromBase64(decodeURIComponent(data));
        console.log(decompressedString);
        console.log(decompress(decompressedString));
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
        // alert('DEBUG: ON!')
        // const linkOrigin = './index.html'
        const link = `${linkOrigin}/?${urlFriendlyCode}`;
        modalRedirecionarLink(link);
    } catch (error) {
        modalErro(mensagens.erroAoGerarLink);
        console.error('Erro ao gerar o link:', error);
    }
};