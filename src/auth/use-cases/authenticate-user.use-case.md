## Caso de uso - Autenticar usuário

Nesse caso de uso o cliente envia um formulário com as informações de login para conseguir acesso aos endpoints privados da aplicação.
</br>
Ao finalizar a requisição, espera-se um retorno com os dados não sensíveis de seu usuário e o bearer token para a validação nos endpoints privados.

[Documentação da API - Login](https://documenter.getpostman.com/view/9868741/2s9YkgC4cN#c6e743e0-879b-4ee6-8807-62909fa874af)

**Image 1 - Diagrama de caso de uso do cliente**

<img src="https://amor-saude.s3.amazonaws.com/Casos+de+uso+cliente.jpg" width="500" alt="Diagrama de caso de uso do cliente">


## Restrições

- O formulário enviado deve estar correto;
- O usuário deve existir;
- A senha deve estar correta.
