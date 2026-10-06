# Vibe

Vibe é uma aplicação mobile de interação social desenvolvida com React Native e TypeScript.

A plataforma permite que usuários criem contas, compartilhem publicações, interajam por meio de curtidas, pesquisem outros usuários, visualizem perfis e participem de grupos de conversa.

O projeto utiliza Firebase como backend, permitindo autenticação, armazenamento de dados e gerenciamento de arquivos em nuvem.

## Sobre o projeto

O Vibe foi desenvolvido com foco em desenvolvimento mobile, buscando combinar uma interface moderna e intuitiva com funcionalidades de interação entre usuários.

O projeto também foi criado para aplicar na prática conceitos de:

- Desenvolvimento de aplicações mobile
- TypeScript
- Navegação entre telas
- Autenticação e gerenciamento de sessão
- Integração com serviços em nuvem
- Banco de dados
- Armazenamento de arquivos
- Construção de interfaces responsivas

## Funcionalidades

- Cadastro e login de usuários
- Gerenciamento de perfil
- Atualização de nome e foto de perfil
- Criação e visualização de publicações
- Curtidas em publicações
- Pesquisa de usuários
- Visualização das publicações de outros usuários
- Criação de grupos
- Visualização de grupos
- Conversas em grupo
- Envio e recebimento de mensagens
- Navegação entre as principais áreas da aplicação

## Tecnologias

- React Native
- TypeScript
- React Navigation
- Firebase Authentication
- Firebase Firestore
- Firebase Storage
- AsyncStorage
- Styled Components
- React Native Vector Icons
- React Native Image Picker
- date-fns

## Arquitetura

O projeto possui uma estrutura organizada por responsabilidades, separando telas, componentes reutilizáveis, navegação, contexto de autenticação, serviços e tipagens.

```text
src/
├── assets/
├── components/
├── contexts/
├── pages/
├── routes/
├── services/
└── types/
```

## Identidade visual

O Vibe utiliza uma identidade visual minimalista, moderna e consistente.

Principais cores:

- Grafite: `#111827`
- Azul: `#2563EB`
- Fundo claro: `#F8FAFC`
- Branco: `#FFFFFF`

## Instalação

Clone o repositório:

```bash
git clone https://github.com/seu-usuario/vibe.git
```

Entre na pasta do projeto:

```bash
cd vibe
```

Instale as dependências:

```bash
npm install
```

Inicie o Metro:

```bash
npm start
```

Em outro terminal, execute o aplicativo:

```bash
npm run android
```

Para iOS:

```bash
npm run ios
```

## Firebase

O Vibe utiliza Firebase para os principais serviços de backend da aplicação:

- Firebase Authentication
- Cloud Firestore
- Firebase Storage

É necessário configurar o projeto Firebase e os arquivos de configuração nativos antes de executar todas as funcionalidades da aplicação.

## Objetivo

O Vibe tem como objetivo demonstrar a aplicação prática de conhecimentos em desenvolvimento mobile, desde a construção da interface e navegação até a integração com autenticação, banco de dados e armazenamento em nuvem.

O projeto também faz parte do meu portfólio como desenvolvedor mobile, demonstrando conhecimentos em React Native, TypeScript, Firebase e desenvolvimento de aplicações completas.

## Status

Projeto em desenvolvimento contínuo.

### Proximas tarefas

Config(mudar nome, senha e excluir conta)
Continuar Vibe
