<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://www.amorsaude.com.br/wp-content/themes/amorsaude/assets/images/amorsaude-logo.svg" width="200" alt="Nest Logo" /></a>
</p>

  <p align="center">Levar um atendimento médico e odontológico de qualidade e humanizado à população brasileira.</p>
<p align="center">
  <a href="" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
  <a href="" target="_blank"><img src="https://img.shields.io/badge/license-MIT-yellow" alt="Package License" /></a>
  <a href="" target="_blank"><img src="https://img.shields.io/badge/coverage-71%25-green5" alt="Coverage" /></a>
  <a href="" target="_blank"><img src="https://img.shields.io/badge/backers-1-red" alt="Backers on Open Collective" /></a>
</p>

## Descrição

Esse é o back-end desenvolvido para o teste prático da Amor Saúde.
</br>
A documentação se encontra no link: [Documentação Techamorsaude](https://documenter.getpostman.com/view/9868741/2s9YkgC4cN)

## Arquitetura

Para o desenvolvimento do projeto, foi utilizado a Clean Architeture na estruturação do projeto.
</br>
Serviços como Repositórios, Manipuladores de errors e estratégias de autenticação, foram desenvolvidos utilizando inversão de dependências para flexibilizar o sistema. O que promove a manutenabilidade.
</br>

**Imagem 1 - Diagrama de classes**

<img src="https://amor-saude.s3.amazonaws.com/Entities+class+diagram.jpg" alt="Diagrama de classes" />

<br/>

**Imagem 2 - Diagrama de Entidade e Relacionamento**

<img src="https://amor-saude.s3.amazonaws.com/Diagrama+de+entidade+e++relacionamentos.jpg" alt="Diagrama de entidades e relacionamentos" />

## Instalação

```bash
$ yarn install
```

## Rodar o app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Testes

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Mantenha contato

- Autor - [Daniel Braz](https://www.linkedin.com/in/dbrazl/)
