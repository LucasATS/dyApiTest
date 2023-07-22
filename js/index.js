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