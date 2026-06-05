# SprintManager

> 🚧 **Status:** Em desenvolvimento (Work In Progress) 🚧

O SprintManager é uma plataforma de gerenciamento individual de tasks e projetos, com o objetivo
de auxiliar na gestão de prioridades e status das atividades corporativas.

## 💻 Tecnologias

Este projeto é desenvolvido com as seguintes tecnologias:

**Frontend:**
* Html, CSS, JavaScript

**Backend:**
* API: NodeJS
* Database: MongoDB
* Tratamento de dados: Python

## roadmap Funcionalidades e Roadmap

O que já foi implementado e o que está planejado para o futuro:

- [x] Configuração inicial do repositório
- [x] Criação da API de Autenticação (Backend)
- [x] Tela de Login (Frontend)
- [x] Banco de Dados modelado
- [ ] Integração do Frontend com a API de Autenticação
- [ ] Criação do painel de controle (Dashboard)

## 🚀 Como Rodar Localmente

- git clone https://github.com/phrs-code/Gerenciador-de-atividades.git
- Instale as dependências com o comando: yarn add
- Digite no terminal: yarn dev

### Pré-requisitos
Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
* [Git](https://git-scm.com)
* [Node.js](https://nodejs.org/en/) (ou a linguagem que você usa)

### 📁 Estrutura do Projeto até o momento 🚧

O projeto está dividido em duas partes principais: `frontend` e `backend`.

meu-projeto/              # API em Node.js/Express
│   ├── src/
│   │   ├── controllers/    # Lógica de negócio e regras das rotas
|   |   └── config/         # Conexão com o banco de dados
│   │   ├── models/         # Modelagem do banco de dados
│   │   └── routes/         # Definição dos endpoints da API
|   |   └── middlewares/    # Autenticação
|   |   └── utils/          # HashProvider
│   ├── .env.example        # Exemplo das variáveis de ambiente do server
│   └── package.json
│
├── frontend/               
│   ├── css/
|   ├── js/
|   ├── Index.html
|   ├── Login.html