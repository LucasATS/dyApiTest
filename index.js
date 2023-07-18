const lerLink = () => {
    var data = window.location.search;

    if (data === '') return null;

    if (data.startsWith("?")) {
        data = data.substring(1);
    }

    var decodedString = atob(data);

    try {
        return objeto = JSON.parse(decodedString);
    } catch (error) {
        console.error('Erro ao converter a string JSON:', error);
        return null;
    }
}


const gerarLink = async (dados) => {
    const jsonString = JSON.stringify(dados);

    let encoder = new TextEncoder();
    let dataBytes = encoder.encode(jsonString);

    let base64String = btoa(String.fromCharCode.apply(null, dataBytes));

    const novoLink = window.location.origin + '/?' + base64String;

    await navigator.clipboard.writeText(window.location.origin + '/?' + base64String)
        .then(() => {
            Swal.fire({
                title: 'Link copiada para a área de transferência!',
                showCancelButton: true,
                confirmButtonText: 'Redirecionar para link',
                cancelButtonText: `Permanecer aqui`,
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                  Swal.fire('Redirecionando..', '', 'success')
                  window.location.href = novoLink;
                }
              })
        })
        .catch(error => {
            alertaNaoFoiPossivelCompartilhar();
            console.log("Erro ao copiar para a área de transferência:");
        });

}

const submit = async ({
    url = '',
    method = '',
    headers = '',
    mode = '',
    body = '',
}) => {
    let options = {
        method: method,
        // headers: JSON.stringify(formatarJson(headers)),
        headers: JSON.parse(headers),
    };

    if (mode !== '') {
        if (mode !== null) {
            Object.assign(options, { mode }); //mode: mode
        }
    }

    if (method === 'GET' || method === 'HEAD') {
        delete options.body;
    } else {
        options.body = JSON.stringify(formatarJson(body));
    }

    const response = await fetch(url, options);

    console.log(response);
    return response;
}

const formatarJson = (txt) => {
    let texto = txt;

    if (texto === null || texto === '') {
        return '';
    }

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
        alertaNaoFoiPossivelConverterJson();
        console.error('Erro ao converter o body em objeto 🙁', error);
        throw error;
    }
};

const alertaUrlVazia = () => {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'A URL fornecida está esta vazia 🙁',
    });
}

const alertaNaoFoiPossivelConverterJson = () => {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Não foi possível converter o body em objeto 🙁',
    });
}

const alertaNaoFoiPossivelCompartilhar = () => {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Não foi possível copiar para a área de transferência 😢',
    });
}

// const submit = async ({
//     url = '',
//     method = '',
//     headers = '',
//     mode = '',
//     body = '',
// }) => {

//     const response = await fetch('http://localhost:3001/api/usuario/criar', {
//         method: "POST", // or 'PUT'
//         headers: { "Content-Type": "application/json" },
//         // mode: "*",
//         body: JSON.stringify(dados),
//     });

//     console.log(response);
// }