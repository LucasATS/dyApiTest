const submit = async (data) => {
    const { url = '',
        method = '',
        headers = '',
        mode = '',
        body = '',
        arquivo = { titulo: null, arquivo: null } } = data;

    try {
        let options = {
            method: method,
            headers: JSON.parse(JSON.stringify(formatarJson(headers))),
        };


        const formData = new FormData();
        if (arquivo?.arquivo) {
            formData.append(arquivo?.titulo, arquivo?.arquivo);
        }


        if (headers.length <= 3) delete options.headers;


        if (mode !== '' && mode !== null) options.mode = mode;


        if (method === 'GET' || method === 'HEAD') {
            delete options.body;
        } else {
            const objBody = formatarJson(body);

            for (const [chave, valor] of Object.entries(objBody))
                formData.append(chave, valor);

            options.body = formData;
        }

        console.log(options);

        const response = await fetch(url, options);

        return response;
    } catch (error) {
        console.error('Erro 😣', error);
        return { status: -1 }
    }
}