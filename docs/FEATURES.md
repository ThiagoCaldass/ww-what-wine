# Funcionalidades Detalhadas

## 1. Pesquisa Básica

**Campos obrigatórios:**
- Tipo de vinho: `tinto | branco | rosé | espumante`
- Nível de secura: `muito | médio | nada` (slider 0-5)
- Faixa de preço: slider (R$ 0 - R$ 500+)

**Opcional:**
- Alimento para acompanhar (select com categorias)

**Lógica de busca:**
```javascript
GET /api/wines/search?
  wineType=tinto
  &sweetnessLevel=2-3
  &priceMin=50
  &priceMax=150
  &foodPairing=carne_vermelha (opcional)
```

**Retorno:**
```json
{
  "results": [
    {
      "id": "uuid",
      "name": "Carmenere Premium",
      "producer": "Viña Santa Rita",
      "country": "Chile",
      "price": 89.90,
      "rating": 4.5,
      "image": "url",
      "shortDescription": "Vinho encorpado com notas de frutas vermelhas"
    }
  ],
  "total": 45,
  "filters_applied": {
    "wineType": "tinto",
    "priceRange": "50-150",
    "sweetnessLevel": "médio"
  }
}
```

---

## 2. Pesquisa Avançada

**Campos obrigatórios:**
- Tipo de vinho: `tinto | branco | rosé | espumante`

**Campos opcionais:**
- País: autocomplete select
- Região: select (dependente do país)
- Uva(s): multi-select
- Nível de tanino: slider 0-5
- Nível de acidez: slider 0-5
- Nível de secura: slider 0-5
- Coloração: select (p/ tintos: rubi profundo, púrpura, etc)
- Alimento para acompanhar: multi-select
- Faixa de preço: slider
- Rating mínimo: slider 0-5

**Query API:**
```javascript
GET /api/wines/advanced-search?
  wineType=tinto
  &countries=Chile,Argentina
  &grapes=Cabernet%20Sauvignon,Malbec
  &tannin=3-4
  &acidity=2-3
  &price=50-200
  &minRating=4.0
  &foodPairings=carne_vermelha,queijo
```

---

## 3. Adega Virtual (User Cellar)

Permite salvar e organizar vinhos preferidos.

**Funcionalidades:**
- ➕ Adicionar vinho à adega
- ⭐ Avaliar vinho (0-5 estrelas)
- 💬 Adicionar notas pessoais
- 🗑️ Remover da adega
- 🔄 Ordenar por: data adicionado, rating, preço
- 🏷️ Tags customizadas (opcional - fase 2)

**Endpoint:**
```javascript
POST /api/cellar
  { wineId, rating, notes }

GET /api/cellar?userId=xxx&sort=rating&order=desc

DELETE /api/cellar/:cellarId
```

---

## 4. Página de Detalhes do Vinho

Clicando em um vinho, mostra:

```
┌─────────────────────────────────────┐
│ Nome | Produtor | País | Vintage   │
├─────────────────────────────────────┤
│ Imagem                              │
├─────────────────────────────────────┤
│ Preço: R$ 89,90                     │
│ Rating: ⭐⭐⭐⭐⭐ (4.5/5)            │
├─────────────────────────────────────┤
│ CARACTERÍSTICAS:                    │
│ • Tipo: Tinto Seco                  │
│ • Tanino: ████░ (4/5)               │
│ • Acidez: ███░░ (3/5)               │
│ • Corpo: Encorpado                  │
│ • Álcool: 14.5%                     │
├─────────────────────────────────────┤
│ UVAS:                               │
│ • Cabernet Sauvignon (70%)          │
│ • Malbec (30%)                      │
├─────────────────────────────────────┤
│ NOTAS DE DEGUSTAÇÃO:               │
│ Frutas vermelhas escuras, especiarias│
│ tanino estruturado...               │
├─────────────────────────────────────┤
│ ACOMPANHAMENTOS IDEAIS:             │
│ 🥩 Carne Vermelha                   │
│ 🧀 Queijos Duros                    │
├─────────────────────────────────────┤
│ [❤️ Salvar na Adega] [Compartilhar] │
└─────────────────────────────────────┘
```

---

## 5. Explorador de Uvas

Página informativa sobre uvas (opcional - fase 2+)

```
GET /api/grapes?type=vermelha
```

Mostra:
- Nome e origem
- Características típicas (tanino, acidez, etc)
- Exemplos de vinhos feitos com essa uva
- Regiões onde é cultivada

---

## 6. Explorador de Regiões

Página informativa sobre regiões vinícolas

```
GET /api/regions?country=Chile
```

Mostra:
- Mapa da região
- Descrição
- Principais uvas
- Vinhos populares da região

---

## 7. Scraping & Atualização de Dados

**Fontes planejadas:**
- Vivino
- iWine
- Wine Spectator
- Decanter
- RateBeer/BeerAdvocate (para futuro)

**Frequência:**
- Atualização manual (início)
- Cron automático (weekly/monthly) - fase posterior

**Dados capturados:**
- Nome, produtor, vintage
- Preço (múltiplas moedas)
- Rating
- Notas de degustação
- Características
- Imagem
