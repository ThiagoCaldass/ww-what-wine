# Roadmap do Projeto

## MVP - Fase 1: Foundation (Semanas 1-3)

**Objetivo:** Estrutura base + pesquisa funcionando

- [ ] Configurar repositório e estrutura de pastas
- [ ] Setup backend (Express, PostgreSQL, migrations)
- [ ] Setup frontend (Next.js, TailwindCSS)
- [ ] Criar schema do banco de dados
- [ ] Autenticação básica (JWT)
- [ ] Criar API de pesquisa básica
- [ ] UI da pesquisa básica
- [ ] Dados mockados de vinhos (20-30 rótulos)
- [ ] Deploy inicial (vercel + railway)

**Entregáveis:**
- Usuário consegue fazer login
- Usuário faz pesquisa básica (tipo, secura, preço)
- Resultados aparecem em cards

---

## MVP - Fase 2: Search & Cellar (Semanas 4-5)

**Objetivo:** Pesquisa avançada + adega virtual

- [ ] Pesquisa avançada (país, uva, tanino, acidez)
- [ ] UI da pesquisa avançada com filtros
- [ ] Motor de busca otimizado
- [ ] Página de detalhes do vinho
- [ ] Adega virtual (CRUD favoritos)
- [ ] UI da adega virtual
- [ ] Expandir DB para 100+ vinhos

**Entregáveis:**
- Usuário usa pesquisa avançada com múltiplos filtros
- Usuário vê detalhe completo do vinho
- Usuário salva/remove da adega

---

## Fase 3: Dados & Scraping (Semanas 6-7)

**Objetivo:** Scraper funcional + 500+ rótulos

- [ ] Implementar scraper Vivino
- [ ] Implementar scraper iWine
- [ ] Parser de dados (limpeza, normalização)
- [ ] Testes de scraper
- [ ] Script de importação
- [ ] Populara BD com 500+ vinhos reais
- [ ] Validar qualidade dos dados

**Entregáveis:**
- DB com 500+ vinhos reais
- Scraper testado manualmente

---

## Fase 4: Polish & Launch (Semanas 8)

**Objetivo:** Pronto para vender

- [ ] Testes end-to-end
- [ ] Otimização de performance
- [ ] SEO (meta tags, structured data)
- [ ] Landing page + pricing page
- [ ] Integração com pagamento (Stripe/PagSeguro)
- [ ] Docs de deploye
- [ ] Beta testing com 10-20 usuários
- [ ] Bugfixes e melhorias
- [ ] Deploy em produção

**Entregáveis:**
- App rodando em produção
- Sistema de pagamento funcionando
- 10+ usuários beta testando

---

## Fase 5+: Features Avançadas (Post-Launch)

- [ ] Explorador de regiões/uvas com detalhes
- [ ] Tags customizadas na adega
- [ ] Notas privadas no rótulo
- [ ] Compartilhamento de lista de adega
- [ ] Recomendações baseadas em IA (após 500+ usuários)
- [ ] Sistema de reviews de usuários
- [ ] Newsletter com sugestões
- [ ] Mobile app (React Native)
- [ ] Integração com Wine.com, Sotheby's
- [ ] Histórico de degustação (taste journal)
- [ ] Eventos/provas de vinho

---

## Métricas de Sucesso (por fase)

### MVP (Fase 1-2)
- ✅ App funcionando
- ✅ Usuário consegue fazer 2 tipos de busca
- ✅ 50+ usuários testando

### Post-MVP (Fase 3-4)
- ✅ 500+ rótulos no DB
- ✅ <100ms resposta nas buscas
- ✅ 100+ usuários pagando
- ✅ Net Promoter Score > 40

### Scale (Fase 5+)
- ✅ 1000+ usuários ativos
- ✅ 50+ rótulos adicionados/mês via scraper
- ✅ Recomendações com accuracy > 70%
- ✅ Retention rate > 30% (30 dias)

---

## Stack Decidido

✅ Frontend: Next.js 14 + React + TailwindCSS + TypeScript
✅ Backend: Node.js 20 + Express + TypeScript
✅ Database: PostgreSQL (self-hosted ou cloud)
✅ Scraping: Puppeteer + Node.js
✅ Payment: Stripe (primeiro) / PagSeguro (depois)
✅ Deployment: Vercel (frontend) + Railway (backend)

---

## Próximos Passos Imediatos

1. **Hoje:**
   - Revisar esta estrutura
   - Fazer ajustes conforme necessário

2. **Amanhã:**
   - Criar repositório Git
   - Setup backend (node init, express, postgres)
   - Setup frontend (next create-app)

3. **Semana 1:**
   - Primeiro schema no banco
   - Primeira rota API funcionando
   - Primeira página Next.js
