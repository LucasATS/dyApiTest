const formatarJson = (txt) => {
    let texto = txt;

    if (!texto || texto.trim() === '' || texto === null) return '';

    try {
        texto = texto.replace(/([{,]\s*)([A-Za-z0-9_\-]+)\s*:/g, (match, p1, p2) => {
            return p1 + '"' + p2.trim() + '":';
        });

        texto = texto.replace(/:\s*('([^']*)'|"([^"]*)")/g, (match, p1, p2, p3) => {
            const valor = p2 !== undefined ? p2 : p3;
            return ': "' + valor.trim() + '"';
        });

        texto = texto.replace(/,\s*([\n\r]+\s*)*}$/g, '}');

        const objeto = JSON.parse(texto);

        return objeto;
    } catch (error) {
        alertaErro(mensagensAlerta.erroDeSintex);
        console.error(mensagensAlerta.erroDeSintex, error);
        throw error;
    }
};