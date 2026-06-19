# WW - What Wine?

Seu assistente inteligente para escolher o vinho perfeito.

## Visão Geral

App que ajuda usuários a descobrir e escolher vinhos baseado em preferências pessoais. Com dois modos de busca (básica e avançada), uma "adega virtual" para favoritos e especificações detalhadas de rótulos.

**Preço:** R$ 19,90 (assinatura)

## Estrutura do Projeto

```
ww-what-wine/
├── frontend/              # Next.js + React
├── backend/               # Node.js + Express + PostgreSQL
├── scraper/               # Scripts de coleta de dados
├── docs/                  # Documentação
└── .env.example           # Variáveis de ambiente
```

## Roadmap MVP

1. **Fase 1:** Estrutura base + pesquisa básica
2. **Fase 2:** Pesquisa avançada + banco de vinhos
3. **Fase 3:** Adega virtual (favoritos)
4. **Fase 4:** Scraping automático + atualização de dados

## Stack Recomendado

- **Frontend:** Next.js 14 + React + TailwindCSS + TypeScript
- **Backend:** Node.js + Express + TypeScript
- **DB:** PostgreSQL
- **Scraping:** Puppeteer + Node.js
- **Auth:** JWT (simples) ou Next-Auth
