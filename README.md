# API REST - Alunos

API REST para gerenciamento de alunos, desenvolvida com **Node.js, TypeScript e Express.js**, utilizando operações CRUD, validação de dados e métodos HTTP.

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white" />
</p>

## Funcionalidades

- Cadastro de alunos.
- Listagem de todos os alunos.
- Busca de alunos por ID.
- Substituição completa dos dados.
- Atualização parcial dos dados.
- Remoção de alunos.
- Validação de dados de entrada.
- Tratamento de erros e status HTTP.

## Estrutura do Aluno

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | number | Identificador gerado pelo servidor |
| `nome` | string | Nome do aluno |
| `curso` | string | Curso do aluno |
| `matricula` | string | matrícula |
| `ano` | number | Ano de ingresso na instituição |
| `ativo` | boolean | Situação do aluno (padrão: `true`) |

## Tecnologias utilizadas

- **Node.js:** ambiente de execução JavaScript.
- **TypeScript:** tipagem estática e segurança de tipos.
- **Express.js:** criação do servidor e gerenciamento de rotas.
- **Postman:** testes e validação dos endpoints.
- **HTTP e JSON:** comunicação entre cliente e servidor.

---

## Instalação e configuração

### 1. Inicializar o projeto

Crie uma pasta para o projeto, abra-a no VS Code e execute:

```bash
npm init -y
```

### 2. Instalar as dependências

Instale o Express:

```bash
npm install express
```

Instale as dependências de desenvolvimento:

```bash
npm install --save-dev typescript tsx @types/node @types/express
```

### 3. Configurar o TypeScript

Inicialize o TypeScript:

```bash
npx tsc --init
```

Configure o arquivo `tsconfig.json` de acordo com a estrutura do projeto.

### 4. Configurar os scripts

Adicione ao `package.json`:

```json
"scripts": {
  "dev": "tsx watch src/servidor.ts",
  "build": "tsc",
  "start": "node dist/servidor.js"
}
```

---

## Executando o projeto

Inicie o servidor em modo de desenvolvimento:

```bash
npm run dev
```

A API estará disponível em:

```text
http://localhost:3000
```

Para compilar o projeto:

```bash
npm run build
```

Para executar a versão compilada:

```bash
npm start
```

---

## Endpoints

| Método | Endpoint | Descrição |
|---|---|---|
| `GET` | `/alunos` | Lista todos os alunos |
| `GET` | `/alunos/:id` | Busca aluno por ID |
| `POST` | `/alunos` | Cadastra um aluno |
| `PUT` | `/alunos/:id` | Substitui os dados do aluno |
| `PATCH` | `/alunos/:id` | Atualiza parcialmente o aluno |
| `DELETE` | `/alunos/:id` | Remove um aluno |

---

## Testando com Postman

### 1. Iniciar o servidor

No terminal do VS Code, execute:

```bash
npm run dev
```

Mantenha o servidor em execução durante os testes.

### 2. Configurar o Environment

1. Abra o Postman.
2. Acesse **Environments** e crie um ambiente chamado `Local`.
3. Adicione a variável `base_url`.
4. Defina seu valor como:

```text
http://localhost:3000
```

5. Salve e selecione o ambiente `Local`.

### 3. Criar uma Collection

1. Acesse **Collections**.
2. Clique em **New Collection**.
3. Nomeie como `API REST - Alunos`.
4. Crie as requisições correspondentes aos endpoints.

### 4. Realizar as requisições

Utilize `{{base_url}}` no início de todas as URLs.

Exemplo de cadastro:

**Método:** `POST`

**URL:** `{{base_url}}/alunos`

Acesse **Body → raw → JSON** e insira:

```json
{
  "nome": "Ana Silva",
  "curso": "Sistemas para Internet",
  "matricula": 2026001,
  "ano": 2026
}
```

Clique em **Send** para enviar a requisição.

Para os demais métodos:

- **GET:** consulta os alunos cadastrados.
- **PUT:** substitui todos os dados de um aluno.
- **PATCH:** altera apenas os campos informados.
- **DELETE:** remove um aluno pelo ID.

### 5. Verificar as respostas

Após cada requisição, confira:

- Status HTTP.
- Corpo da resposta em JSON.
- Dados retornados pelo servidor.
- Mensagens de erro, quando houver.

---

## Objetivo

Projeto desenvolvido com o objetivo de consolidar conhecimentos em desenvolvimento back-end, incluindo arquitetura REST, operações CRUD, métodos HTTP, tipagem com TypeScript, validação de dados e criação de APIs com Express.js.
