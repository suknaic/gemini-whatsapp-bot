# Bot WhatsApp - Inglês Concierge 🛎️ 

Este projeto é um bot para WhatsApp desenvolvido com a biblioteca [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js). Ele foi projetado para automatizar o processamento de arquivos PDF enviados em grupos específicos, analisando-os por meio de um serviço externo chamado **Gemini** e retornando os resultados ao usuário.

## 🚀 Funcionalidades

- **Processamento de Arquivos**: Detecta e processa arquivos PDF enviados em grupos.
- **Autorização de Usuários**: Apenas usuários autorizados podem enviar arquivos para análise.
- **Integração com o Serviço Gemini**: Encaminha os arquivos para análise e retorna os resultados.
- **Notificações Automatizadas**: Envia mensagens de confirmação e resultados diretamente para o administrador.

---

## 🛠️ Tecnologias Utilizadas

- **Node.js**: Plataforma de execução JavaScript.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **whatsapp-web.js**: Biblioteca para integração com o WhatsApp Web.
- **qrcode-terminal**: Gera QR Codes diretamente no terminal para autenticação.
- **dotenv**: Gerenciamento de variáveis de ambiente.

---

## 📂 Estrutura do Projeto

```plaintext
📦 ingles-concier
├── 📂 src
│   ├── server.ts         # Código principal do bot
│   └── service
│       └── gemini.ts     # Serviço de integração com o Gemini
├── .env                  # Configurações de variáveis de ambiente
├── [.env.exemplo]          # Exemplo de configuração do .env
├── [package.json]          # Configurações do projeto e dependências
├── [tsconfig.json]         # Configurações do TypeScript
└── [README.md]             # Documentação do projeto

```

## 🚀 Como Executar o Projeto

### Instalação de Dependências

Para instalar as dependências do projeto, utilize o comando abaixo:

```bash
bun install
```

### Execução

Para executar o bot, utilize o seguinte comando:

```bash
bun dev
```
Para Construir o bundle, utilize o seguinte comando:

```bash
bun build
```

### Informações Adicionais

Este projeto foi criado utilizando o comando `bun init` na versão 1.2.18 do [Bun](https://bun.sh), um runtime JavaScript rápido e completo.
