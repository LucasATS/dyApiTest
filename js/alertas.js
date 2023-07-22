const alertaErro = (msg) => {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: msg,
    });
}

const mensagensAlerta = {
    erroInesperado: 'Erro inesperado 👻',
    erroSemURL: 'A URL fornecida está esta vazia 🙁',
    erroAoCopiar: 'Não foi possível copiar para a área de transferência 😢',
    erroDeSintex: 'Erro de sintaxe JSON inválido 🙄',
    erroLinkDecoder: 'Erro ao entender o link 😤',
}