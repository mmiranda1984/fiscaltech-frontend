# fiscaltech - frontend

Projeto frontend React desenvolvido para implementação de CRUD para teste na FiscalTech.

# Tecnologias utilizadas

  - React.js
  - Componentes Reactstrap (https://reactstrap.github.io/)
  - Componente "Select" do react-select (https://github.com/JedWatson/react-select)
  - Visual Studio Code como IDE de desenvolvimento


# Configuração 

  - Rodar o comando npm para instalar todas as dependências na pasta do projeto
```sh
npm install
```
  - Executar o projeto através do npm start
```sh
npm start
```
  - O servidor será iniciado na porta 3000 e poderá ser acessado com o endereço abaixo:
```sh
http://localhost:3000
```

### Importante
  - Existe uma rota criada no arquivo "App.js" que redireciona a página principal para a lista de veículos cadastrados.
  - Após a inclusão de um veículo, sua placa não pode mais ser alterada quando o usuário desejar editar o veículo.
  - O campo "Ultima Atualização" é preenchido automaticamente na inserção/edição de um veículo, portanto o campo fica desabilitado na tela inserção/edição.
  - A lista de opção de cores é uma lista de informações já pré-cadastradas no backend da aplicação.
  - Não terminei a implementação de inclusão de um veículo que já existe, para nesse caso exibir uma mensagem de alerta para o usuário, até por conta disso vocês verão que há um componente "Alert" na classe "VeiculoEdit.js" que não está sendo exibido nunca.
  - O botão de excluir apenas inativa o registro "Ativo = false", mas deixa o usuário continuar alterando as informações, se assim desejar.

### Considerações Finais
  - Os commits foram dados a partir de outra conta minha no github que se chama "naodeixesobrar" que é uma conta utilizada para desenvolvimento de um projeto pessoal.  A minha máquina já estava com as credenciais do git configuradas para esse perfil e eu só percebi ao dar push nos arquivos.
