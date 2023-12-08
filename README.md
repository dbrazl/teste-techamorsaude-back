<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://www.amorsaude.com.br/wp-content/themes/amorsaude/assets/images/amorsaude-logo.svg" width="200" alt="Nest Logo" /></a>
</p>

  <p align="center">Levar um atendimento médico e odontológico de qualidade e humanizado à população brasileira.</p>
<p align="center">
  <a href="" target="_blank"><img src="https://img.shields.io/badge/node-v16.17.0+-blue" alt="NPM Version" /></a>
  <a href="" target="_blank"><img src="https://img.shields.io/badge/license-MIT-yellow" alt="Package License" /></a>
  <a href="" target="_blank"><img src="https://img.shields.io/badge/coverage-96%25-green5" alt="Coverage" /></a>
  <a href="" target="_blank"><img src="https://img.shields.io/badge/backers-1-red" alt="Backers on Open Collective" /></a>
</p>

## Descrição

Esse é o back-end desenvolvido para o teste prático da Amor Saúde.
</br>
A documentação se encontra no link: [Documentação Techamorsaude](https://documenter.getpostman.com/view/9868741/2s9YkgC4cN)
</br>
Os casos de usos também estão documentados. Acesse a documentação pelos arquivos .md na camada de use-cases de cada módulo.

## Arquitetura

Para o desenvolvimento do projeto, foi utilizado a Clean Architeture na estruturação do projeto.
</br>

**Imagem 1 - The Clean Architeture**

<p align="center">
  <img src="https://miro.medium.com/v2/resize:fit:4800/format:webp/0*iU9Ks05_GTtGh6zV.jpg" width="600" alt="Clean Architeture" />
  <p>Autor: Robert C. Martin</p>
</p>
</br>

Serviços como repositórios e manipuladores de errors, foram desenvolvidos utilizando inversão de dependências para flexibilizar o sistema. O que promove a manutenabilidade.

**Imagem 2 - Exemplo de inversão de dependências**
<p align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/8/8d/DIPLayersPattern.png" alt="Exemplo de inversão de dependências" />
  <p>Fonte: Wikipedia. Disponível em: https://pt.wikipedia.org/wiki/Princ%C3%ADpio_da_invers%C3%A3o_de_depend%C3%AAncia</p>
</p>
</br>

A arquitetura da solução foi desenhada utilizando diagramas da UML e o diagrama de entidadade e relacionamento, respeitando a opinião das tecnologias usadas e a Clean Architeture.

**Imagem 3 - Diagrama de classes**

<img src="https://amor-saude.s3.amazonaws.com/Diagrama+de+classes+v3.jpg" alt="Diagrama de classes" />
<p>Autor: Daniel Braz</p>
<br/>

**Imagem 4 - Diagrama de Entidade e Relacionamento**

<img src="https://amor-saude.s3.amazonaws.com/Diagrama+de+entidade+e++relacionamentos.jpg" alt="Diagrama de entidades e relacionamentos" />
<p>Autor: Daniel Braz</p>
</br>

Para a comunicação, foi escolhido o estilo de design de comunicação REST com transporte de pacotes de dados em formato JSON.

**Imagem 5 - Protocolo REST**

<p align="center">
  <img src="https://www.hostinger.com.br/tutoriais/wp-content/uploads/sites/12/2022/02/Rest-API.webp" width="600" alt="Protocolo REST" />
  <p>Fonte: Hostinger. Disponível em: https://www.hostinger.com.br/tutoriais/api-restful</p>
</p>
</br>

**Atenção:** Devido a correria do meu dia a dia, não foi implementado a entidade de especialidade médica e o relacionamento de muitos para muitos com os usuários.

## Tecnologias

O projeto foi desenvolvido com o framework NestJs. Para o banco de dados, com intuito de teste, foi utilizado o SQLite. Já a conexão e transações com o banco de dados, é feita pelo TypeORM.

<p align="center">
  <a href="https://nestjs.com/">
    <img src="https://camo.githubusercontent.com/5f54c0817521724a2deae8dedf0c280a589fd0aa9bffd7f19fa6254bb52e996a/68747470733a2f2f6e6573746a732e636f6d2f696d672f6c6f676f2d736d616c6c2e737667" width="70" alt="Nest.js logo">
  </a>
  &nbsp;
  &nbsp;
  &nbsp;
  <a href="https://www.sqlite.org/index.html">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/SQLite370.svg/1200px-SQLite370.svg.png" width="150" alt="SQLite logo">
  </a>
  &nbsp;
  &nbsp;
  &nbsp;
  <a href="https://typeorm.io/">
    <img src="https://raw.githubusercontent.com/typeorm/typeorm/master/resources/logo_big.png" width="150" alt="SQLite logo">
  </a>
</p>

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

Foram elaborado testes de unidade para todas as classes do projeto. Mas é necessário a criação de testes end to end.

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
