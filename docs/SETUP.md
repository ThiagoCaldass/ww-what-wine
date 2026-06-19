# Guia de Setup do Projeto

## Pré-requisitos

Instale antes de começar:
- Node.js 20+ (https://nodejs.org)
- PostgreSQL 14+ (https://www.postgresql.org)
- Git (https://git-scm.com)
- VS Code ou editor de sua escolha

## 1. Configurar Repositório Git (Local + GitHub)

### Local

```bash
cd /Users/thiagocaldas/Documents/Claude/Projetos\ Code/WW\ -\ What\ Wine
git init
git config user.name "Your Name"
git config user.email "your.email@example.com"
```

### GitHub (Preparação para Deploy Gratuito)

```bash
# 1. Criar repositório público em https://github.com/new
#    Nome: ww-what-wine
#    Público
#    NÃO inicializar com README

# 2. Conectar repo local ao GitHub
cd /Users/thiagocaldas/Documents/Claude/Projetos\ Code/WW\ -\ What\ Wine
git remote add origin https://github.com/seu-usuario/ww-what-wine.git
git branch -M main
git push -u origin main
```

**Por quê GitHub?** Vercel e Railway fazem deploy automático via GitHub (git push = deploy)

## 2. Setup Backend

```bash
# Criar pasta backend
mkdir backend
cd backend

# Inicializar Node project
npm init -y

# Instalar dependências
npm install express cors dotenv pg
npm install -D typescript ts-node @types/express @types/node

# Criar tsconfig.json
npx tsc --init
```

**package.json scripts:**
```json
{
  "scripts": {
    "dev": "ts-node src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  }
}
```

## 3. Setup Frontend

```bash
# Voltar para pasta raiz
cd ..

# Criar Next.js project
npx create-next-app@latest frontend --typescript --tailwind --no-git

# Instalar dependências adicionais
cd frontend
npm install axios zustand
```

## 4. Setup Database

```bash
# Conectar ao PostgreSQL
psql -U postgres

# Dentro do psql:
CREATE DATABASE ww_what_wine;
CREATE USER ww_user WITH PASSWORD 'secure_password';
ALTER ROLE ww_user SET client_encoding TO 'utf8';
ALTER ROLE ww_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE ww_user SET default_transaction_deferrable TO on;
ALTER ROLE ww_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE ww_what_wine TO ww_user;
\q
```

**Verificar conexão:**
```bash
psql -U ww_user -d ww_what_wine -h localhost
```

## 5. Executar Migrações Iniciais

```bash
# Criar arquivo de migração
touch backend/src/db/migrations/001_initial_schema.sql

# Executar migração (usar psql ou script Node)
psql -U ww_user -d ww_what_wine -f backend/src/db/migrations/001_initial_schema.sql
```

**Conteúdo de 001_initial_schema.sql:**
```sql
-- Criar tabelas básicas

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  name VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE wines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  producer VARCHAR(255),
  country VARCHAR(100),
  wine_type VARCHAR(50),
  price DECIMAL(10, 2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_wines_country ON wines(country);
```

## 6. Variáveis de Ambiente

**backend/.env**
```
DATABASE_URL=postgresql://ww_user:secure_password@localhost:5432/ww_what_wine
BACKEND_PORT=3001
NODE_ENV=development
JWT_SECRET=your_super_secret_key_change_in_production
```

**frontend/.env.local**
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 7. Primeiro Servidor Rodando

**Backend:**
```bash
cd backend
npm run dev
# Deve aparecer: "Server running on port 3001"
```

**Frontend (nova aba):**
```bash
cd frontend
npm run dev
# Deve aparecer: "✓ Ready in XXXms"
# Acesse: http://localhost:3000
```

## 8. Estrutura de Pastas - Criar

```bash
# Backend
mkdir -p backend/src/{routes,controllers,services,db,middleware,types,utils}

# Frontend já vem com estrutura, mas adicione:
mkdir -p frontend/lib frontend/types
```

## 9. Commit Inicial

```bash
git add .
git commit -m "Initial project structure and setup"
git log --oneline  # Verificar
```

## 10. Próximo: Criar Primeira Rota

Depois de confirmar que tudo está rodando:

1. Criar rota `/api/wines` que retorna array vazio
2. Fazer UI que chama essa rota
3. Adicionar dados mockados
4. Testar fluxo completo

---

## Troubleshooting

### PostgreSQL connection refused
```bash
# Verificar se postgres está rodando
brew services list  # macOS
# ou
systemctl status postgresql  # Linux
```

### Port 3001/3000 em uso
```bash
# Encontrar processo
lsof -i :3001
# Matar processo
kill -9 <PID>
```

### npm ERR! ERESOLVE
```bash
# Usar legacy peer deps
npm install --legacy-peer-deps
```

---

## 11. Preparar para Deploy Online Gratuito

**Quando o MVP estiver pronto (Fase 1), faça:**

```bash
# Fazer último commit local
git add .
git commit -m "MVP Phase 1 ready for deployment"

# Push para GitHub
git push origin main

# Depois, siga: docs/DEPLOYMENT.md
```

Este passo conecta sua aplicação à hospedagem gratuita (Vercel + Railway).

---

## Checklist de Conclusão

- [ ] Node.js 20+ instalado
- [ ] PostgreSQL rodando
- [ ] Repositório Git inicializado (local + GitHub)
- [ ] Backend npm init feito
- [ ] Frontend Next.js criado
- [ ] Database criado e conectado
- [ ] .env files configurados
- [ ] `npm run dev` funciona (backend)
- [ ] `npm run dev` funciona (frontend)
- [ ] Commit inicial feito
- [ ] GitHub repo criado e conectado

Quando tudo estiver ✅, notifique para começarmos a primeira feature!

**Depois de Fase 1 pronta:** Siga `docs/DEPLOYMENT.md` para hospedar online gratuitamente.
