# Banking Dashboard Developer Test
O objetivo desse desafio era implementar a integração com a API `https://mock-ica.aquarela.win/api` e criar um dashboard banking para administradores, seguindo os requisitos fornecidos.

## Solução.
Eu resolvi limitar o escopo da solução, dado que eu tive pouco tempo disponível essa semana, de forma que eu pudesse entregar algo funcional e que atingisse os requisitos definidos.
Para isso, resolvi focar no desenvolvimento do Frontend, utilizando a API provida como Client API (ICA bank API), ao invés de Service API como acredito que deveríamos implementar, se o Backend fosse implementado.

### Solução ideal
Idealmente, eu implementaria uma camada de Client API, onde o meu Frontend falaria com meu Backend. Meu backend, por sua vez (Client API), utilizaria a API do ICA bank. Assim, eu conseguiria facilmente implementar endpoints não disponíveis no ICA bank, por exemplo: GET /accounts (retorna lista de todas as contas, o que hoje não está disponível na API do ICA). Isso seria possível se minha Client API armazenasse no meu banco de dados os IDs das contas criadas. Assim, a lógica do GET /accounts seria iterar pela lista de IDs, chamando a API do ICA bank através de GET /account/id, para buscar todos os detalhes das contas, antes de retornar para o Frontend uma única resposta, que seria um array de contas e seus detalhes.

### Minha implementação.
1. Como eu não implementei o Backend, eu utilizei o POST /auth/login para autenticar como se o cliente fosse o usuário, ao invés do meu Backend. Isso não é ideal, pois esse login deveria autenticar o meu Backend com a API do ICA bank. E o clientID não é um funcionário do banco, mas o serviço ao cliente (meu Backend).
Eu implementei assim para demonstrar a integração da API com a tela de login e o gerenciamento do JWT, onde uma vez criado, eu o armazeno no localStorage e o utilizo para as próximas requisições, garantindo que as chamadas para a API do ICA bank estejam autenticadas. Similarmente, como faríamos se eu tivesse implementado uma API para logar o funcionário?

2. Como descrito na Solução Ideal, eu não implementei a camada que armazenaria os IDs das contas criadas. Para isso, utilizei o localStorage como simulador do meu banco de dados, armazenando nele o ID de cada conta criada. Assim, eu consigo iterar pela lista de IDs e buscar os detalhes das contas quando inicializo o componente do dashboard.

## Como testar.

Pre requisitos:
1. Clone esse repositório.
2. Instale as dependências: `npm i`
3. Inicialize o projeto: `npm start`
4. Acesse o app na URL: `http://localhost:3000`
5. Importe a collection do Postman disponível no folder `/public`
Passo a passo:
1. No postman, crie um tenant - você só precisa fazer isso uma vez.
2. Na aplicação, faça o login utilizando o clientId e clientSecret como se fossem as credenciais do funcionário do banco (solução temporária para simular o login).
3. Na aplicação, crie pelo menos duas contas - para que você consiga ver as contas e seus detalhes.
4. No Postman, faça uma transferência entre uma conta e outra utilizando a requisição do Postman - isso simula uma transferência de valores de uma conta a outra realizada pelo cliente do banco.
5. Na aplicação, clique em transações, você poderá ver a lista das operações realizadas.
## Considerações.
Em uma próxima iterações, eu focaria em implementar o Backend, desacoplando a API do ICA bank do nosso Frontend.
Muito obrigado pela oportunidade de participar desse processo seletivo e compartilhar esse desafio comigo. Foi muito divertido implementar essa primeira parte, e apesar de ter muita coisa para ainda ser implementada, eu espero que vocês também gostem.

Por favor, me contate se tiverem alguma dúvida.

Obrigado!
