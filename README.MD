<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src=".github/logo.png" width="300px" />
</h1>

<h2 align="center">
  Fastfeet API
</h2>

<p align="center">
  <a href="#rocket-sobre-o-desafio">
    Fastfeet Web
  </a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#layout">
    Fastfeet Mobile
  </a>
</p>

<h3>Pré-requisitos</h3>
<p>
Para rodar a aplicação localmente os seguintes pré-requisitos devem ser atendidos:
</p>

<ul>
  <li>Banco de dados Postgres</li>
  <li>Banco de dados Redis</li>
</ul>

<h3>Instalação</h3>

```sh
# Clone o repositório para sua maquina

$ git clone git@github.com:rafaelhgc/rocketseat-gostack-fastfeet-api.git fastfeet-api

# Instale as dependências do projeto

$ cd fastfeet-api
$ yarn
```

<h3>Variáveis de Ambiente</h3>

<p>
  Certifique se preencher o arquivo <strong>.env-sample</strong> com as informações pertinentes ao seu ambiente. Após preenchido o arquivo de ser renomeado para <strong>.env</strong>
</p>

<h3>Iniciando a aplicação</h3>

```sh
# Inicie a aplicação
$ yarn start:dev

# Inicie a fila de processamento de e-mails
$ yarn start:queue
```
