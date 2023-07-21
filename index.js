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
        headers: JSON.parse(JSON.stringify(formatarJson(headers))),
        // headers: JSON.parse(headers),
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


const statusCodeParaTexto = statusCode => {
    const statusCodes = {
        100: 'Continuar 🚀',
        101: 'Mudando Protocolos 🚀',
        102: 'Processamento 🚀',
        103: 'Dicas Antecipadas 🚀',

        200: 'OK 😃',
        201: 'Criado 🎉',
        202: 'Aceito 😊',
        203: 'Informações Não Autoritativas 😊',
        204: 'Sem Conteúdo 😐',
        205: 'Redefinir Conteúdo 😐',
        206: 'Conteúdo Parcial 😊',
        207: 'Status Multi 😊',
        208: 'Já Reportado 🎉',
        226: 'IM Usado 🎉',

        300: 'Múltipla Escolha 🧐',
        301: 'Movido Permanentemente 🏠',
        302: 'Encontrado 😃',
        303: 'Ver Outros 😊',
        304: 'Não Modificado 😐',
        305: 'Use Proxy 🧐',
        306: 'Proxy Switch 🧐',
        307: 'Redirecionamento Temporário 😊',
        308: 'Redirecionamento Permanente 🏠',

        400: 'Requisição Inválida 😕',
        401: 'Não Autorizado 😢',
        402: 'Pagamento Necessário 💸',
        403: 'Proibido 😡',
        404: 'Não Encontrado 😢',
        405: 'Método não Permitido 🧐',
        406: 'Não Aceitável 😕',
        407: 'Autenticação de Proxy Necessária 😢',
        408: 'Tempo de Requisição Esgotou 😕',
        409: 'Conflito 😡',
        410: 'Desaparecido 😢',
        411: 'Comprimento Necessário 😐',
        412: 'Pré-condição Falhada 😕',
        413: 'Entidade de Solicitação Muito Grande 😕',
        414: 'URI de Solicitação Muito Longa 😕',
        415: 'Tipo de Mídia Não Suportado 😕',
        416: 'Faixa Não Satisfatória 😕',
        417: 'Expectativa Falhada 😕',
        418: 'Eu sou um bule de chá ☕',
        421: 'Destino Não Encontrado 😢',
        422: 'Entidade Improcessável 😕',
        423: 'Fechado 😐',
        424: 'Falha de Dependência 😕',
        425: 'Coleção Não Ordenada 😐',
        426: 'Upgrade Necessário 😐',
        428: 'Pré-requisito Requerido 😕',
        429: 'Muitas Solicitações 😡',
        431: 'Campos de Cabeçalho de Solicitação Muito Grandes 😕',
        451: 'Indisponível por Motivos Legais 😡',

        500: 'Erro Interno do Servidor 😣',
        501: 'Não Implementado 🤔',
        502: 'Bad Gateway 😣',
        503: 'Serviço Indisponível 😣',
        504: 'Gateway Timeout 😣',
        505: 'Versão do HTTP Não Suportada 🤔',
        506: 'Variação Também Negocia 🤔',
        507: 'Armazenamento Insuficiente 😣',
        508: 'Loop Detectado 😣',
        510: 'Não Estendido 🤔',
        511: 'Autenticação de Rede Requerida 😢'
    };

    return statusCodes[statusCode] || 'Código de status não reconhecido 🤔';
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