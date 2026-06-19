# WW - What Wine? | Documentação Geral

## 📋 O Que É

**WW - What Wine?** é um app para ajudar usuários a escolher vinhos personalizados.

- 🔍 Pesquisa básica (tipo, secura, preço)
- 🔎 Pesquisa avançada (país, uva, tanino, acidez)
- 💾 Adega virtual (favoritos)
- 📊 Especificações detalhadas (uvas, regiões)

**Preço:** R$ 19,90 (assinatura)

---

## 📁 Estrutura de Documentação

| Documento | Conteúdo |
|-----------|----------|
| [README.md](./README.md) | Visão geral rápida |
| [PROJETO.md](./PROJETO.md) | Este arquivo (índice) |
| [docs/SETUP.md](./docs/SETUP.md) | **👈 COMECE AQUI** - Setup inicial |
| [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) | Arquitetura técnica completa |
| [docs/DATABASE_SCHEMA.md](./docs/DATABASE_SCHEMA.md) | Schema PostgreSQL |
| [docs/FEATURES.md](./docs/FEATURES.md) | Funcionalidades detalhadas |
| [docs/ROADMAP.md](./docs/ROADMAP.md) | Roadmap de fases e timeline |
| [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md) | **Hospedagem gratuita online** (Vercel + Railway) |

---

## 🚀 Começando (5 minutos)

1. **Leia** [docs/SETUP.md](./docs/SETUP.md)
2. **Execute** os comandos passo-a-passo
3. **Confirme** que backend + frontend rodando
4. **Notifique** quando pronto para primeira feature

---

## 📊 Arquitetura Rápida

```
Frontend (Next.js)
    ↓↑
Backend (Node.js + Express)
    ↓↑
Database (PostgreSQL)
    ↓
Scraper (Puppeteer)
```

**Stack:**
- Frontend: Next.js 14 + React + TypeScript + TailwindCSS
- Backend: Node.js + Express + TypeScript
- Database: PostgreSQL
- Scraping: Puppeteer
- Deploy: Vercel + Railway

---

## 📅 Fases do Projeto

### MVP Fase 1 (Semanas 1-2): Foundation
- Setup backend/frontend
- Autenticação básica
- Pesquisa básica funcional
- 20-30 vinhos mockados

### MVP Fase 2 (Semanas 3-4): Pesquisa + Adega
- Pesquisa avançada
- Adega virtual (favoritos)
- 100+ vinhos no DB

### Fase 3 (Semanas 5-6): Scraping Real
- Scraper Vivino + iWine
- 500+ vinhos reais
- Validação de dados

### Fase 4 (Semana 7): Polish & Launch
- Testes
- Pagamento (Stripe)
- Deploy produção
- Beta testing

**Total:** ~8 semanas até launch

---

## 💾 Banco de Dados

Principais tabelas:
- `users` - Usuários e assinatura
- `wines` - Rótulos/vinhos
- `grapes` - Informações sobre uvas
- `regions` - Regiões vinícolas
- `user_cellar` - Adega virtual (favoritos)
- `wine_pairings` - Alimento x Vinho

Ver detalhes em [docs/DATABASE_SCHEMA.md](./docs/DATABASE_SCHEMA.md)

---

## 🎯 Funcionalidades Principais

### Pesquisa Básica
- Tipo: tinto | branco | rosé | espumante
- Secura: slider 0-5
- Preço: slider
- Alimento: opcional

### Pesquisa Avançada
- Todos os campos da básica +
- País: multi-select
- Região: select
- Uva(s): multi-select
- Nível de tanino/acidez: slider
- Rating mínimo: slider

### Adega Virtual
- Salvar vinho
- Avaliar (0-5 ⭐)
- Notas pessoais
- Organizar/filtrar

### Detalhes do Vinho
- Especificações completas
- Notas de degustação
- Uvas usadas (%)
- Alimentos que combinam
- Rating comunidade
- Preço

---

## 🔗 Rotas API Principais

```
# Autenticação
POST   /api/auth/signup
POST   /api/auth/login
POST   /api/auth/logout

# Pesquisa
GET    /api/wines/search?filters...        # Pesquisa básica
GET    /api/wines/advanced-search?filters  # Pesquisa avançada
GET    /api/wines/:id                      # Detalhes

# Adega Virtual
GET    /api/cellar                         # Listar
POST   /api/cellar                         # Adicionar
DELETE /api/cellar/:id                     # Remover

# Informações
GET    /api/grapes                         # Uvas
GET    /api/regions                        # Regiões
```

Ver detalhes em [docs/FEATURES.md](./docs/FEATURES.md)

---

## 📊 Modelo de Dados - Exemplo

```json
{
  "id": "550e8400-e29b-41d4-a716-446655440000",
  "name": "Carmenere Premium",
  "producer": "Viña Santa Rita",
  "country": "Chile",
  "region": "Maipo Valley",
  "vintage": 2020,
  "wine_type": "tinto",
  "price": 89.90,
  "currency": "BRL",
  "rating": 4.5,
  "tasting_notes": "Frutas vermelhas escuras, tanino estruturado...",
  "alcohol_percentage": 14.5,
  "tannin_level": 4,
  "acidity_level": 3,
  "sweetness_level": 1,
  "grapes": [
    { "name": "Carmenere", "percentage": 100 }
  ],
  "pairings": [
    { "name": "Carne Vermelha", "score": 5 },
    { "name": "Queijo Duro", "score": 4 }
  ]
}
```

---

## 🛠️ Decisões Técnicas

| Aspecto | Escolha | Por quê |
|---------|---------|--------|
| Frontend | Next.js | SSR, SSG, fácil deploy Vercel |
| Backend | Express | Simples, rápido, comunidade grande |
| Database | PostgreSQL | Relações complexas, JSONB para dados flexíveis |
| Scraping | Puppeteer | Browser automation confiável |
| Auth | JWT | Stateless, escalável |
| Deploy | Vercel + Railway | **100% grátis** com $5/mês créditos Railway |
| Tipo | SaaS (R$ 19,90/mês) | Receita recorrente, modelo sustentável |

---

## 🚨 Riscos & Mitigações

| Risco | Mitigation |
|-------|-----------|
| Dados desatualizados | Scraper automático atualiza 1x/semana |
| Muitos scrapes (ban) | Usar APIs oficiais quando possível + delays entre requests |
| Competição (Vivino) | Foco em UX local, comunidade brasileira |
| Segurança (PII) | JWT, HTTPS, OWASP Top 10, rate limiting |
| Performance (lentidão) | Índices DB, caching, CDN (Vercel) |

---

## 📞 Contato & Suporte

- **Email:** thiagocaldas12345@gmail.com
- **Documentação:** Este repositório
- **Issues:** GitHub issues (quando criado repo)

---

## ✅ Checklist Hoje

- [ ] Ler esta documentação completa
- [ ] Ler [docs/SETUP.md](./docs/SETUP.md)
- [ ] Ter Node.js 20+ + PostgreSQL instalados
- [ ] Executar setup até "npm run dev" funionar
- [ ] Notificar quando backend + frontend rodando

---

## 📝 Notas

- **Não comece com AI/ML complex** - V1 é regras + filtros simples
- **Comece com dados mockados** - Scraper vem depois
- **MVP primeiro** - Lança em 4 semanas, melhora depois
- **Foco em UX** - Melhor que Vivino em simplicidade

---

**Versão:** 1.0  
**Data:** 2026-06-18  
**Status:** 🟡 Planejamento (pronto para Dev)
