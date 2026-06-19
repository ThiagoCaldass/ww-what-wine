# Arquitetura do Projeto

## Visão Geral

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (Next.js/React)                 │
│  - Pesquisa Básica/Avançada                                 │
│  - Detalhes do Vinho                                        │
│  - Adega Virtual (Favoritos)                                │
│  - Explorador de Uvas/Regiões                               │
│  - Auth (Login/Signup)                                      │
└────────────────────┬────────────────────────────────────────┘
                     │ HTTP/REST
┌────────────────────▼────────────────────────────────────────┐
│                  BACKEND (Node.js/Express)                  │
│ ┌──────────────────────────────────────────────────────┐   │
│ │ API Routes:                                          │   │
│ │ - GET  /api/wines/search                             │   │
│ │ - GET  /api/wines/advanced-search                    │   │
│ │ - GET  /api/wines/:id                                │   │
│ │ - GET  /api/grapes                                   │   │
│ │ - GET  /api/regions                                  │   │
│ │ - GET  /api/cellar                                   │   │
│ │ - POST /api/cellar                                   │   │
│ │ - DELETE /api/cellar/:id                             │   │
│ │ - POST /api/auth/signup                              │   │
│ │ - POST /api/auth/login                               │   │
│ │ - POST /api/auth/logout                              │   │
│ └──────────────────────────────────────────────────────┘   │
│ ┌──────────────────────────────────────────────────────┐   │
│ │ Business Logic:                                      │   │
│ │ - Wine Search Engine                                 │   │
│ │ - Recommendation Algorithm                           │   │
│ │ - User Management                                    │   │
│ │ - Cellar Management                                  │   │
│ └──────────────────────────────────────────────────────┘   │
└────────────────────┬────────────────────────────────────────┘
                     │ SQL Queries
┌────────────────────▼────────────────────────────────────────┐
│              DATABASE (PostgreSQL)                          │
│ - Users, Wines, Grapes, Regions, Pairings, Cellar         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│              SCRAPER (Node.js + Puppeteer)                 │
│  - Extrai dados de sites de vinhos                         │
│  - Scheduled job (cron) - fase posterior                   │
│  - Atualiza DB com novos rótulos                           │
└─────────────────────────────────────────────────────────────┘
```

## Estrutura de Pastas Detalhada

```
ww-what-wine/
│
├── frontend/                     # Aplicação Next.js
│   ├── app/
│   │   ├── layout.tsx           # Layout principal
│   │   ├── page.tsx             # Home
│   │   ├── search/              # Pesquisa básica
│   │   │   └── page.tsx
│   │   ├── advanced-search/     # Pesquisa avançada
│   │   │   └── page.tsx
│   │   ├── wine/                # Detalhe do vinho
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   ├── cellar/              # Adega virtual
│   │   │   └── page.tsx
│   │   ├── auth/                # Autenticação
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   ├── signup/
│   │   │   │   └── page.tsx
│   │   │   └── callback/
│   │   │       └── route.ts
│   │   └── api/                 # API routes (client-side redirects)
│   │       └── (config for env)
│   │
│   ├── components/
│   │   ├── SearchForm.tsx       # Formulário de pesquisa básica
│   │   ├── AdvancedSearchForm.tsx
│   │   ├── WineCard.tsx         # Card do vinho
│   │   ├── WineDetail.tsx       # Detalhes do vinho
│   │   ├── CellarList.tsx       # Lista de adega
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── FilterPanel.tsx
│   │
│   ├── lib/
│   │   ├── api.ts              # Funções para chamar backend
│   │   ├── auth.ts             # Lógica de autenticação
│   │   └── types.ts            # Types/Interfaces
│   │
│   ├── styles/
│   │   └── globals.css
│   │
│   ├── public/
│   │   ├── images/
│   │   └── icons/
│   │
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.js
│   └── tailwind.config.js
│
├── backend/                     # Servidor Node.js/Express
│   ├── src/
│   │   ├── index.ts            # Entry point
│   │   │
│   │   ├── routes/
│   │   │   ├── wines.ts        # GET /api/wines/*
│   │   │   ├── auth.ts         # POST /api/auth/*
│   │   │   ├── cellar.ts       # GET/POST /api/cellar/*
│   │   │   ├── grapes.ts       # GET /api/grapes
│   │   │   └── regions.ts      # GET /api/regions
│   │   │
│   │   ├── controllers/
│   │   │   ├── wineController.ts
│   │   │   ├── authController.ts
│   │   │   ├── cellarController.ts
│   │   │   ├── grapeController.ts
│   │   │   └── regionController.ts
│   │   │
│   │   ├── services/
│   │   │   ├── wineService.ts     # Business logic
│   │   │   ├── authService.ts
│   │   │   ├── cellarService.ts
│   │   │   ├── searchEngine.ts    # Motor de busca
│   │   │   └── recommendationEngine.ts
│   │   │
│   │   ├── db/
│   │   │   ├── connection.ts   # Pool de conexão
│   │   │   ├── queries.ts      # Queries SQL reutilizáveis
│   │   │   └── migrations/     # Migrações SQL
│   │   │       ├── 001_initial_schema.sql
│   │   │       ├── 002_add_grapes.sql
│   │   │       └── ...
│   │   │
│   │   ├── middleware/
│   │   │   ├── auth.ts         # JWT middleware
│   │   │   ├── errorHandler.ts
│   │   │   └── validation.ts   # Validação de input
│   │   │
│   │   ├── types/
│   │   │   └── index.ts        # Type definitions
│   │   │
│   │   └── utils/
│   │       ├── logger.ts
│   │       └── helpers.ts
│   │
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
│
├── scraper/                     # Scripts de scraping
│   ├── src/
│   │   ├── index.ts
│   │   ├── scrapers/
│   │   │   ├── vivino.ts       # Scraper para Vivino
│   │   │   ├── iWine.ts        # Scraper para iWine
│   │   │   └── base.ts         # Classe base
│   │   ├── db/
│   │   │   └── connection.ts
│   │   └── utils/
│   │       └── parser.ts
│   │
│   ├── package.json
│   └── .env
│
├── docs/
│   ├── DATABASE_SCHEMA.md      # Schema PostgreSQL
│   ├── FEATURES.md             # Funcionalidades detalhadas
│   ├── ARCHITECTURE.md         # Este arquivo
│   ├── API.md                  # Documentação de API
│   ├── DEPLOYMENT.md           # Como fazer deploy
│   └── SCRAPING.md             # Documentação de scraping
│
├── README.md
├── .gitignore
└── .env.example
```

## Fluxo de Dados

### 1. Pesquisa Básica

```
User Input (UI)
    ↓
Frontend validates & creates filter object
    ↓
POST /api/wines/search?filters...
    ↓
Backend validateInput()
    ↓
searchEngine.basicSearch(filters)
    ↓
PostgreSQL query (wines table)
    ↓
Backend formats response
    ↓
Frontend renders WineCard list
```

### 2. Salvar Favorito

```
User clicks ❤️
    ↓
POST /api/cellar { wineId, rating, notes }
    ↓
Backend validates JWT
    ↓
cellarService.addWine(userId, wineId, data)
    ↓
INSERT INTO user_cellar
    ↓
Frontend updates UI (show success)
```

## Tecnologias por Camada

| Camada | Tecnologia | Razão |
|--------|-----------|-------|
| Frontend | Next.js 14 | SSR, SSG, bom para SEO |
| UI Framework | React + TailwindCSS | Moderno, rápido |
| Tipo Segurança | TypeScript | Type safety |
| Backend | Node.js + Express | Simples, rápido, JS full-stack |
| Database | PostgreSQL | Dados estruturados, relações complexas |
| ORM | pg (driver nativo) ou Knex | SQL puro é mais controle |
| Auth | JWT | Stateless, escalável |
| Scraping | Puppeteer | Browser automation |
| Validação | Zod ou Joi | Type-safe validation |
| Deployment | Vercel (frontend) + Railway (backend) | Grátis tier, fácil setup |

## Responsabilidades

- **Frontend:** UI/UX, validação de input client-side, caching local
- **Backend:** Lógica de negócio, validação server-side, auth, DB
- **DB:** Persistência, integridade referencial, índices
- **Scraper:** Coleta automática de dados de terceiros
