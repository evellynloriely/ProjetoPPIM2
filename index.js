import express from 'express';
import path from 'path';

const porta = 2000;
const host = '0.0.0.0';

var listaUsuarios = [];

function CadastroUsuario(requisicao, resposta) {
    
    const usuario = {
        nome: requisicao.query.nome,
        email: requisicao.query.email,
        assunto: requisicao.query.assunto,
        mensagem: requisicao.query.sms,
    }

    listaUsuarios.push(usuario);
    let conteudoResposta = `
    <!DOCTYPE html>
    <head>
        <meta charset="UTF-8">
        <title>Menu do sistema</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstra@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    </head>
    <body>
        <h1>Usuário cadastrados</h1>
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Assunto</th>
                    <th>Mensagem</th>
                </tr>
            </thead>
            <tbody> `;

    for (const usuario of listaUsuarios) {
        conteudoResposta += `
                    <tr>
                        <td>${usuario.nome}</td>
                        <td>${usuario.email}</td>
                        <td>${usuario.assunto}</td>
                        <td>${usuario.sms}</td>
                    <tr>
                `;
    }

    conteudoResposta+=`
            </tbody>
        </table>
        <a class="btn btn-primary" href="/" role="button">Voltar ao menu</a>
        <a class="btn btn-primary" href="/cadastro.html" role="button">Continuar cadastrando</a>
    </body>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
        crossorigin="anonymous"></script>

    </html>`;
    resposta.end(conteudoResposta);
}

const app = express();
app.use(express.static(path.join(process.cwd(),'paginas')));

app.get('/', (requisicao, resposta) => {
    resposta.end(`
        <!DOCTYPE html>
            <head>
                <meta charset="UTF-8">
                <title>Cadastro</title>
            </head>
            <body>
                <h1>Bem Vindo</h1>
                <ul>
                    <li><a href="/cadastro.html">Cadastrar Usuário</a></li>
                </ul>
            </body>
        </html>
    `);
})
app.use(express.static('./paginas'));
app.get('/cadastro', CadastroUsuario);

app.listen(porta, host, () => {
    console.log(`Servidor executando na url http://${host}:${porta}`);
});