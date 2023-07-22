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
        alertaErro(mensagensAlerta.erroLinkDecoder);
        console.error(mensagensAlerta.erroLinkDecoder, error);
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
                title: '<h5>Link copiada para a área de transferência 🥰</h5><h6>O site está passando por mudanças e, por esse motivo, algumas estruturas poderão ser alteradas ⚠️</h6>',
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
            alertaErro(mensagensAlerta.erroAoCopiar);
            console.log(mensagensAlerta.erroAoCopiar);
        });

}