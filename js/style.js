const temaLight = {
    '--bg-color': '#f5f9fa',
    '--font-color1': '#101010',
    '--placeholder': '#777777',


    '--bg-color-logo': '#e2ebed',
    '--font-color-logo': '#000000',


    '--bg-input': '#fbfbfb',
    '--border-input': '#e2ebed',


    '--bg-button-color1': '#afeaff',
    '--bg-button-color1-click': '#79dbff',


    '--bg-scroll-track': '#f1f1f1',
    '--bg-scroll-thumb': '#afeaff',


    /* STATUS CODE */
    '--bg-status-log': '#f2ffff',
    '--border-status-log': '#ccd7d7',

    '--bg-status-ok': '#90ee90cc',
    '--border-status-ok': '#008000cc',

    '--bg-status-warning': '#ffff98cc',
    '--border-status-warning': '#b8870bcc',

    '--bg-status-error': '#f08080cc',
    '--border-status-error': '#8b0000cc',

    '--font-status': '#000000',
}


const temaDracula = {
    '--bg-color': '#282a36',
    '--font-color1': '#f8f8f2',
    '--placeholder': '#ddd',


    '--bg-color-logo': '#373b40',
    '--font-color-logo': '#f8f8f2',


    '--bg-input': '#373b40',
    '--border-input': '#202529',


    '--bg-button-color1': '#6272a4',
    '--bg-button-color1-click': '#8197bf',


    '--bg-scroll-track': '#282a36',
    '--bg-scroll-thumb': '#f8f8f2',


    /* STATUS CODE */
    '--bg-status-log': '#f2ffff',
    '--border-status-log': '#ccd7d7',

    '--bg-status-ok': '#62c462',
    '--border-status-ok': '#008000cc',

    '--bg-status-warning': '#f89406',
    '--border-status-warning': '#b8870bcc',

    '--bg-status-error': '#ee5f5b',
    '--border-status-error': '#8b0000cc',

    '--font-status': '#000000',
}


const setTema = (tema = temaLight) => {
    for (const chave in tema) {
        if (tema.hasOwnProperty(chave)) {
            const valor = tema[chave];
            document.documentElement.style.setProperty(chave, valor);
        }
    }
}


const temasTags = [
    { option: 'Light', tema: temaLight },
    { option: 'Dracula', tema: temaDracula },
]
const optionsSelectTema = () => {
    for (const i in temasTags) {
        const novoOption = document.createElement('option');
        novoOption.value = temasTags[i]?.option;
        novoOption.textContent = temasTags[i]?.option;
        document.getElementById('select-tema').appendChild(novoOption);
    }
    console.log(getCookie('tema'));
    document.getElementById('select-tema').value = getCookie('tema');
}


const handleSelectionTemaChange = () => {
    const valor = document.getElementById('select-tema').value;

    let option = null;
    foreachTemas(valor, (tema, myOption) => {
        setTema(tema);
        option = myOption;
    });
    
    console.log(option);
    setCookie('tema', option);
}


const foreachTemas = (valor, func = (tema, option) => { }) => {
    for (const i in temasTags) {
        if (temasTags[i]?.option === valor)
            func(temasTags[i]?.tema, temasTags[i]?.option);
    }
}


//CONTROLLER
const temaCookies = getCookie('tema');
if (temaCookies !== undefined || temaCookies !== null) {

    foreachTemas(temaCookies, (tema, _) => {
        setTema(tema);
    });

} else {
    setTema();
}