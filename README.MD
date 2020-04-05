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
  A aplicação depende a instalação dos seguintes itens:
</p>

<ul>
  <li>Postgres Server</li>
  <li>Redis Server</li>
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
  Certifique-se de preencher o arquivo <strong>.env-sample</strong> com as informações pertinentes ao seu ambiente. Após preenchido, renomeio o arquivo para <strong>.env</strong>
</p>

<h3>Iniciando a aplicação</h3>

```sh
# Inicie a aplicação
$ yarn start:dev

# Inicie a fila de processamento de e-mails
$ yarn start:queue
```
