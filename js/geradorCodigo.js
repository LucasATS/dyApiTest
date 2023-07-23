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
//         mode: "cors",
//         body: JSON.stringify(dados),
//     });

//     console.log(response);
// }

const gerarCodigoJSFetch = (data) => {
    const { url, method = 'GET', headers = {}, mode = '', body } = data;

    if (url === null) return '';

    let newMode = '';
    if (mode !== '' && mode !== undefined && mode !== null) newMode = `mode: "${mode}",\n\t`;

    let newBody = '';
    if (method !== 'GET' && method !== 'HEAD') newBody = `body: ${body},\n\t`;


    return `fetch('${url}', {
    method: '${method}',
    headers: ${headers},
    ${newMode}${newBody}
})
    .then(resp => resp.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error(error);
    });`;
};


const gerarCodigoJSAxios = (data) => {
    const { url, method = 'GET', headers = {}, mode = '', body } = data;

    if (url === null) return '';

    let newMode = '';
    if (mode !== '' && mode !== undefined && mode !== null) newMode = `mode: "${mode}",\n\t`;

    let newBody = '';
    if (method !== 'GET' && method !== 'HEAD') newBody = `data: ${body},\n\t`;


    return `const axios = require('axios');
  
  const config = {
    url: '${url}',
    method: '${method}',
    headers: ${headers},
    ${newMode}${newBody}
  };
  
  axios(config)
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });`;
};


const gerarCodigoPythonRequests = (data) => {
    const { url, method = 'GET', headers = {}, mode = '', body } = data;

    if (url === null) return '';

    let newHeaders = '';
    for (const key in JSON.parse(headers)) {
        console.log(key);
        newHeaders += `'${key}': '${JSON.parse(headers)[key]}',`;
    }

    let newBody = '', newJsonData = '';
    if (method !== 'GET' && method !== 'HEAD') {
        newBody = `data = ${body}`;
        newJsonData = `, json=data`;
    }

    let newMode = '';
    if (mode !== '' && mode !== undefined && mode !== null) {
        newMode = `, allow_redirects=${mode === 'no-cors' ? 'False' : 'True'}`;
    }

    return `import requests
  
url = '${url}'
method = '${method}'
headers = { ${newHeaders} }
  
${newBody}
response = requests.request(url=url, method=method, headers=headers${newMode}${newJsonData})
  
if response.status_code == 200:
    print(response.json())
else:
    print('Error:', response.text)`;
};

// import requests

// url = 'https://httpbin.org/post'
// method = 'POST'
// headers = { 'Content-Type': 'application/json', 'auth': 'your_auth_token_here' }  # Substitua 'your_auth_token_here' pelo token de autenticação, se necessário.

// data = {"msg": "oi"}  # Os dados a serem enviados no corpo da solicitação.

// response = requests.request(url=url, method=method, headers=headers, json=data)

// if response.status_code == 200:
//     print(response.json())
// else:
//     print('Error:', response.text)


