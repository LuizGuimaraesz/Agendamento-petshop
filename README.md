# Agendamento Petshop

Aplicacao front-end para gerenciar agendamentos de um petshop. O projeto permite cadastrar, listar, filtrar por data e remover atendimentos, organizando os cards por periodo do dia.

## Funcionalidades

- Cadastro de agendamentos com tutor, pet, telefone, servico, data e horario.
- Exibicao dos agendamentos por data selecionada.
- Organizacao por periodo: manha, tarde e noite.
- Ordenacao dos cards por horario.
- Prevencao de conflito para dois agendamentos no mesmo dia e horario.
- Remocao imediata de agendamentos da lista.
- Modal responsivo para desktop, tablets e celulares.
- API fake local com `json-server`.

## Tecnologias

- HTML
- CSS
- JavaScript
- Webpack
- Babel
- Day.js
- JSON Server

## Como Rodar

Instale as dependencias:

```bash
npm install
```

Inicie a API fake:

```bash
npm run server
```

Em outro terminal, inicie o front-end:

```bash
npm start
```

O front-end roda em:

```text
http://localhost:3001
```

A API fake roda em:

```text
http://localhost:3000
```

## Scripts

```bash
npm run server
```

Inicia o `json-server`, observando o arquivo `server.json` na porta `3000`.

```bash
npm start
```

Inicia o servidor de desenvolvimento do Webpack.

```bash
npm run build
```

Gera a versao final do projeto na pasta `dist`.

## Estrutura

```text
src/
  assets/       imagens e icones
  scripts/      logica da aplicacao
  styles/       estilos globais, modal e agenda
index.html
server.json
webpack.config.js
```

## Observacoes

Para o cadastro funcionar corretamente, mantenha a API fake rodando com `npm run server` enquanto usa o front-end.
