const tagAbrirExemploCodigo = 'Abir exemplo de código';
const codigoExemploTags = {
    null: tagAbrirExemploCodigo,
    jsFetch: "Javascript fetch",
    jsAxios: "Javascript axios",
    pyRequest: "Python Requests",
}

const gerarCodigoExemplo = (nome, data) => {
    switch (codigoExemploTags[nome]) {
        case codigoExemploTags.jsFetch:
            return { codigo: gerarCodigoJSFetch(data), linguagem: 'javascript' };
            
            case codigoExemploTags.jsAxios:
                return { codigo: gerarCodigoJSAxios(data), linguagem: 'javascript' };
                
                case codigoExemploTags.pyRequest:
            return { codigo: gerarCodigoPythonRequests(data), linguagem: 'python' };

        default:
            return '';
    }
}


const gerarCodigoJSFetch = (data) => {
    const { url, method = 'GET', headers = {}, mode = '', body } = data;

    if (url === null) return '';

    let newMode = '';
    if (mode !== '' && mode !== undefined && mode !== null) newMode = `mode: "${mode}",\n\t`;

    let newBody = '';
    if (method !== 'GET' && method !== 'HEAD' && body !== "null") newBody = `body: ${body},\n\t`;


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
    if (method !== 'GET' && method !== 'HEAD' && body !== "null") newBody = `data: ${body},\n\t`;


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
    if (method !== 'GET' && method !== 'HEAD' && body !== "null") {
        newBody = `data = ${body}\n`;
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
  
${newBody}response = requests.request(url=url, method=method, headers=headers${newMode}${newJsonData})
  
if response.status_code == 200:
    print(response.json())
else:
    print('Error:', response.text)`;
};
