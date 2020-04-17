<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src=".github/logo.png" width="300px" />
</h1>

<h2 align="center">
  Fastfeet API
</h2>

<p align="center">
  <a href="https://github.com/rafaelhgc/rocketseat-gostack-fastfeet-web">
    Fastfeet Web
  </a>
  &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="https://github.com/rafaelhgc/rocketseat-gostack-fastfeet-mobile">
    Fastfeet Mobile
  </a>
</p>

<h3>🛠 Pré-requisitos</h3>
<p>
  A aplicação depende da instalação dos seguintes itens:
</p>

<ul>
  <li>Postgres Server</li>
  <li>Redis Server</li>
</ul>

<h3>💽 Instalação</h3>

```sh
# Clone o repositório para sua maquina
$ git clone git@github.com:rafaelhgc/rocketseat-gostack-fastfeet-api.git fastfeet-api

# Instale as dependências do projeto
$ cd fastfeet-api
$ yarn
```

<h3>📑 Variáveis de Ambiente</h3>

<p>
  Certifique-se de preencher o arquivo <strong>.env-sample</strong> com as informações pertinentes ao seu ambiente. Após preenchido, renomeio o arquivo para <strong>.env</strong>
</p>

```txt
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USER= // mailtrap user
MAIL_PASS= // mailtrap pass
REDIS_HOST=localhost
REDIS_PORT=6379
SECRET_KEY=ushallnotpass
EXPIRES_IN=7d
APP_URL=http://localhost:3333
PORT=3333
DATABASE_HOST= // redis host
DATABASE_USERNAME= // postgres user
DATABASE_PASSWORD= // postgres password
DATABASE_DATABASE= // postgres database
```

<h3>🎲 Gerando estrutura e dados inicias</h3>

<h3>🛑 Atenção</h3>

A aplicação possuí restrições de horário para coleta. Essas restrições podem ser alteradas no seed `20200213005120-restrictions.js`

```sh
$ yarn sequelize-cli db:migrate
$ yarn sequelize-cli db:seed:all
```

<h3>🚀 Iniciando a aplicação</h3>

```sh
# Inicie a aplicação
$ yarn start:dev

# Inicie a fila de processamento de e-mails
$ yarn start:queue
```
