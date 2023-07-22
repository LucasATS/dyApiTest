const modalErro = (msg) => {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: msg,
    });
}



const modalRedirecionarLink = async (link) => {
    await navigator.clipboard.writeText(link)
        .then(() => {
            Swal.fire({
                title: '<h5>Link copiada para a área de transferência 🥰</h5><h6>O site está passando por mudanças e, por esse motivo, algumas estruturas poderão ser alteradas ⚠️</h6>',
                showCancelButton: true,
                confirmButtonText: 'Redirecionar para link',
                cancelButtonText: `Permanecer aqui`,
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire('Redirecionando..', '', 'success')
                    window.location.href = link;
                }
            })
        })
        .catch(error => {
            modalErro(mensagens.erroAoCopiar);
            console.log(mensagens.erroAoCopiar, error);
        });
}


const mensagens = {
    erroInesperado: 'Ocorreu um erro inesperado. 👻',
    erroSemURL: 'O campo URL está vazio. 🙁',
    erroAoCopiar: 'Desculpe, não foi possível copiar para a área de transferência. 😢',
    erroDeSintex: 'Parece que há um erro de sintaxe no JSON fornecido. 😨',
    erroLinkDecoder: 'Desculpe, não conseguimos interpretar o link corretamente. 😤',
    erroAoGerarLink: ' Houve um problema ao gerar o link. 😒'
}

