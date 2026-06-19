# Deployment - Hospedagem Gratuita Online

## Opção 1: Gratuita Recomendada (Melhor custo-benefício)

```
Frontend:  Vercel (gratuito)
Backend:   Railway (gratuito com créditos)
Database:  Railway PostgreSQL (gratuito com créditos)
```

### Por quê Railway?

- **Grátis:** $5/mês de créditos (suficiente para MVP)
- **Suporta:** Node.js + PostgreSQL + Redis
- **Deploy fácil:** Git push automático
- **Escalável:** Paga depois se crescer
- **Painel visual:** Logs, monitoramento, variáveis de env

---

## Setup Gratuito Passo-a-Passo

### 1️⃣ Frontend (Vercel)

**Vercel é a melhor opção para Next.js (feita pela mesma empresa).**

```bash
# Login com GitHub
# Ir para https://vercel.com

# Importar repositório GitHub
# Vercel detecta Next.js automaticamente
# Deploy em 1 clique

# Seu app fica em: https://seu-projeto.vercel.app
```

**Gratuitamente na Vercel:**
- ✅ Deployments ilimitados
- ✅ HTTPS automático
- ✅ CDN global
- ✅ Variáveis de ambiente
- ✅ Preview URLs para PRs
- ❌ Sem serverless functions serverless (se precisar, paga)

---

### 2️⃣ Backend (Railway)

**Railway hostedar Node.js + PostgreSQL**

#### Passo 1: Criar conta Railway

```bash
# https://railway.app
# Logar com GitHub
# Criar novo projeto
```

#### Passo 2: Adicionar PostgreSQL

1. No dashboard Railway, clique **"New"**
2. Selecione **"Database"** → **"PostgreSQL"**
3. Railway cria automáticamente e fornece `DATABASE_URL`

#### Passo 3: Adicionar Backend (Node.js)

1. Clique **"New"**
2. Selecione **"Deploy from GitHub"**
3. Selecione seu repositório
4. Configure:
   - **Root directory:** `backend`
   - **Environment:** Node.js
   - **Variáveis de ambiente:**
     ```
     DATABASE_URL=postgresql://... (copia do Railway)
     BACKEND_PORT=8000
     NODE_ENV=production
     JWT_SECRET=seu_secret_aqui
     ```

#### Passo 4: Deploy Automático

```bash
# Toda vez que fizer git push:
git push origin main

# Railway detecta mudanças e faz redeploy automático
# Seu backend fica em: https://seu-backend-randomid.railway.app
```

---

### 3️⃣ Conectar Frontend ao Backend

**frontend/.env.production**
```
NEXT_PUBLIC_API_URL=https://seu-backend-randomid.railway.app
```

**Deploy:**
```bash
git push origin main
# Vercel redeploya automaticamente
```

---

## Plano Gratuito - Limites

| Serviço | Limite | Observação |
|---------|--------|-----------|
| **Vercel** | Ilimitado | Build time limitado (100hrs/mês) |
| **Railway** | $5/mês créditos | Suficiente para MVP |
| **PostgreSQL** | 1GB gratuito | Pode crescer depois |

**Estimativa de uso (MVP):**
- 1GB DB = ~10.000 rótulos
- 512MB memória backend = OK para 100 usuários simultâneos
- Vercel sempre grátis (é o tier padrão)

---

## Migração para Pago (quando crescer)

Se o app explodir:

| Cenário | Ação |
|---------|------|
| >100 usuários | Adicionar créditos Railway ($10-50/mês) |
| >1GB database | Upgrade PostgreSQL (~$15/mês) |
| >1000 usuarios | Considerar VPS (DigitalOcean $5-6/mês) |

---

## Comparação com Outras Opções

### ❌ Heroku
- ~~Grátis até 2022~~
- Agora custa $7+/mês (não recomendo)

### ⚠️ Render
```
- Grátis: backend dorme após 15 min inatividade
- Ruim para app em produção
- Upgrade: $7/mês
```

### ⚠️ Replit
```
- Grátis: lento e com limitações
- Bom para prototipar, não para produção
```

### ✅ Railway (Recomendado)
```
- $5/mês créditos grátis
- Sem dormir
- Suporta tudo que precisa
- Mais rápido que Render
```

### ✅ fly.io (Alternativa)
```
- $3/mês créditos grátis
- Bom para backend
- Precisa de PostgreSQL em outro lugar
```

---

## Setup Completo - Resumo

```
1. Criar repo GitHub com backend/ + frontend/

2. Vercel:
   - Conectar repositório
   - Deploy automático (frontend pronto)
   
3. Railway:
   - Criar projeto
   - Adicionar PostgreSQL
   - Adicionar Node.js do GitHub
   - Configurar variáveis de env
   
4. Conectar:
   - Frontend lê NEXT_PUBLIC_API_URL (Railway)
   - Backend lê DATABASE_URL (Railway PostgreSQL)
   
5. Push & Pronto:
   - git push
   - Ambos redeploy automáticos
```

---

## Variáveis de Ambiente (Production)

**Railway - Settings → Variables**

```
DATABASE_URL=postgresql://user:pass@host:port/db
BACKEND_PORT=8000
NODE_ENV=production
JWT_SECRET=seu_super_secret_production_key_aqui
NEXT_PUBLIC_API_URL=https://seu-backend.railway.app
```

---

## Monitoramento (Gratuito)

- **Vercel:** Dashboard automático com logs
- **Railway:** Dashboard com logs em tempo real
- **PostgreSQL:** Railway fornece stats de uso

---

## Troubleshooting Deployment

### Backend não conecta com banco

```bash
# Verificar DATABASE_URL em Railway
# Copiar URL completa (incluindo senha)
# Configurar em Railway → Variables
```

### Frontend recebe erro CORS

```
# Backend (express):
const cors = require('cors');
app.use(cors({
  origin: 'https://seu-frontend.vercel.app',
  credentials: true
}));
```

### Build falha na Vercel

```bash
# Adicionar em frontend package.json:
{
  "scripts": {
    "build": "next build"
  }
}
```

### Variáveis de env não carregam

```bash
# Restart na Railway:
# Settings → Redeploy
# ou
# git push (força redeploy)
```

---

## Checklist Deployment Gratuito

- [ ] Criar conta GitHub (se não tiver)
- [ ] Criar conta Vercel (login com GitHub)
- [ ] Criar conta Railway (login com GitHub)
- [ ] Fazer push do código pro GitHub (branch main)
- [ ] Conectar Vercel ao repositório
- [ ] Criar PostgreSQL em Railway
- [ ] Criar Node.js em Railway
- [ ] Configurar variáveis de env Railway
- [ ] Testar API URL em frontend
- [ ] Fazer teste de ponta-a-ponta (pesquisa → resultado)

---

## URLs Finais (Exemplo)

```
Frontend: https://ww-what-wine.vercel.app
Backend:  https://ww-what-wine-prod.railway.app
Database: railway-internal (não acessa direto)
```

---

## Observações

- **Railway gratuito:** Suficiente para MVP + beta testing
- **Sem custo escondido:** Créditos $5/mês renovam, só paga se exceder
- **Escalável:** Se crescer, basta adicionar créditos ou migrar
- **Automático:** Git push = deploy automático (sem CLI commands)

Quando ficar grande e precisar escalar, migra para VPS (DigitalOcean, Linode, etc) por $5-10/mês.
