# Banking Dashboard Developer Test
O objetivo desse desafio era implementar a integracao com a API `https://mock-ica.aquarela.win/api` e criar um dashboard banking para administradores seguindo os requisitos fornecidos

## Solução
Eu resolvi limitar o escopo da soluçãoo, dado que eu tive pouco tempo disponivel essa semana, de forma que eu pudesse entregar algo funcional e que atingisse os requirementos definidos.
Para isso, resolvi focar no desenvolvimento do Frontend, utilizando a API provida como Client API (ICA bank API), ao inves de Service API como acredito que deveriamos implementar, se o Backend fosse implementado.

### Solucao ideal
Idealmente, eu implementaria uma camada de Client API, onde o meu Frontend falaria com meu Backend. Meu Backend por usa vez (Client API), utilizaria a API do ICA bank. Assim eu conseguiria facilmente implementar endpoints não disponiveis no ICA bank, por exemplo: GET /accounts (retorna lista de todas as contas, o que hoje nao esta disponivel na API do ICA). Isso seria possivel se minha Client API armazenasse no meu banco de dados os IDs das contas criadas. Assim, a logica do GET /accounts seria iterar pela lista de IDs, chamando a API do ICA bank atraves de GET /account/id, para buscar todos os detalhes das contas, antes de retornar para o Frontend uma unica resposta, que seria um array de contas e seus detalhes.

### Minha implementação
1. Como eu nao implementei o Backend, eu utilizei o POST /auth/login para autenticar como se o cliente fosse o usuario, ao inves do meu Backend. Isso nao é ideal, pois esse login deveria autenticar o meu Backend com a API do ICA bank. E o clientID nao é um funcionario do banco, mas o servico cliente (meu Backend).
Eu implementei assim para demonstra a integracao da API com a tela de login e o gerenciamento do JWT, onde uma vez criado, eu o armazeno no localStorage e o utilizo para as proximas requisicoes, garantindo que as chamadas para a API do ICA bank estejam autenticadas. Similarmente como fariamos se eu tivesse implementado uma API para logar o funcionario.

2. Como descrito na Solução ideal, eu nao implementei a camada que armazenaria os IDs das contas criados. Para isso, utilizei o localStorage como simulador do meu banco de dados, armazenando nele o ID de cada conta criada. Assim, eu consigo iterar pela lista de IDs e buscar os detalhes das contas quando inicializar o componente do dashboard.

## Como testar

Pre requisitos:
1. Clone esse repositorio
2. Instale as dependencias: `npm i`
3. Inicialize o projeto: `npm start`
4. Access o app na URL: `http://localhost:3000`
5. Importe a collection do postman disponivel no folder `/postman`
Passo a passo:
1. No postman crie um tenant - voce soh precisa fazer isso uma vez
2. Na aplicacao, faca o login utilizando o clientId e clientSecret como se fossem as credenciais do funcionario do banco (solucao temporaria para simular o login)
3. Na aplicacao, crie pelo menos duas contas - para que voce consiga ver as contas e seus detalhes
4. No postman, faca uma transferencia entre uma conta e outra utilizando a requisicao do postman - isso simula uma transferencia de valores de uma conta a outra realizada pelo cliente do banco
5. Na aplicacao, click em transacoes, voce podera ver a lsita das operacoes realizadas.
## Consideracoes
Em uma proxima iteracao, eu focaria em implementar o Backend, desacoplando a API do ICA bank do nosso Frontend.
Muito obrigado pela oportinidade de participar desse processo seletivo e compartilhar esse desafio comigo. Foi muito divertido implementar essa primeira parte, e apesar de ter muito coisa para ainda ser implementada, eu espero que voces tambem gostem.

Por favor me contate se tiverem alguma duvida.

Obrigado!