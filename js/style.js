const temasTags = [
    { option: 'light', temaCod: 'highlight/styles/base16/google-light.min.css' },
    { option: 'dracula', temaCod: 'highlight/styles/base16/dracula.min.css' },
]


const setTema = (tema = temasTags[0]) => {
    try {
        document.getElementById('styleTema').href = `css/${tema?.option}.css`;
        document.getElementById('styleHighlight').href = tema?.temaCod;
    } catch (err) { console.error(err); }
}


const optionsSelectTema = () => {
    for (const i in temasTags) {
        const novoOption = document.createElement('option');
        novoOption.value = temasTags[i]?.option;
        novoOption.textContent = temasTags[i]?.option;
        document.getElementById('select-tema').appendChild(novoOption);
    }
    const tema = getCookie('tema');
    document.getElementById('select-tema').value = tema !== null ? tema : temasTags[0]?.option;
}


const handleSelectionTemaChange = () => {
    const valor = document.getElementById('select-tema').value;

    let option = null;
    foreachTemas(valor, (tema) => {
        setTema(tema);
        option = tema?.option;
    });
    setCookie('tema', option);
}


const foreachTemas = (valor, func = () => { }) => {
    temasTags.map(a => { if (a?.option === valor) func(a); });
}


//CONTROLLER
const temaCookies = getCookie('tema');
if (temaCookies !== undefined && temaCookies !== null) {

    foreachTemas(temaCookies, (tema) => {
        setTema(tema);
    });

} else setTema();
