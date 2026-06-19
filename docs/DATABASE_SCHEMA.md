# Schema do Banco de Dados

## Tabelas Principais

### `users`
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  name VARCHAR(255),
  subscription_active BOOLEAN DEFAULT false,
  subscription_start DATE,
  subscription_end DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### `wines`
Rótulos/vinhos na base de dados

```sql
CREATE TABLE wines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  producer VARCHAR(255),
  vintage INT,
  country VARCHAR(100),
  region VARCHAR(255),
  wine_type VARCHAR(50), -- 'tinto', 'branco', 'rosé', 'espumante'
  price DECIMAL(10, 2),
  currency VARCHAR(3) DEFAULT 'BRL',
  
  -- Características
  color VARCHAR(100), -- 'rubi profundo', 'púrpura', etc
  sweetness_level INT, -- 0-5: seco a doce
  tannin_level INT, -- 0-5
  acidity_level INT, -- 0-5
  alcohol_percentage DECIMAL(3, 1),
  
  -- Uvas (JSON ou relação)
  grapes TEXT[], -- array de nomes de uvas
  
  -- Notas de degustação
  tasting_notes TEXT,
  
  -- Metadados
  source_url VARCHAR(255),
  source_site VARCHAR(100), -- 'vivino', 'iWine', etc
  last_scraped TIMESTAMP,
  rating DECIMAL(3, 2), -- 0-5
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### `grapes` (Uvas)
Informações sobre tipos de uva

```sql
CREATE TABLE grapes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) UNIQUE NOT NULL,
  origin_country VARCHAR(100),
  color VARCHAR(50), -- 'vermelha', 'branca'
  typical_tannin_level INT, -- 0-5
  typical_sweetness INT, -- 0-5
  acidity_level INT, -- 0-5
  flavor_profile TEXT, -- descrição dos sabores típicos
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### `food_pairings`
Alimentos para acompanhar

```sql
CREATE TABLE food_pairings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) UNIQUE NOT NULL,
  category VARCHAR(100), -- 'carne', 'peixe', 'queijo', 'sobremesa'
  wine_type_ideal VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### `wine_pairings` (Relação N:N)
Associação entre vinhos e alimentos

```sql
CREATE TABLE wine_pairings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wine_id UUID REFERENCES wines(id) ON DELETE CASCADE,
  food_id UUID REFERENCES food_pairings(id) ON DELETE CASCADE,
  pairing_score INT, -- 0-5: quão bem combinam
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### `wine_grapes` (Relação N:N)
Associação entre vinhos e uvas

```sql
CREATE TABLE wine_grapes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wine_id UUID REFERENCES wines(id) ON DELETE CASCADE,
  grape_id UUID REFERENCES grapes(id) ON DELETE CASCADE,
  percentage INT, -- % da composição
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### `user_cellar` (Adega Virtual)
Vinhos salvos por usuário

```sql
CREATE TABLE user_cellar (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  wine_id UUID NOT NULL REFERENCES wines(id) ON DELETE CASCADE,
  rating INT, -- 0-5: avaliação do usuário
  notes TEXT,
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, wine_id)
);
```

### `regions` (Regiões Vinícolas)
```sql
CREATE TABLE regions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  country VARCHAR(100),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Índices Recomendados

```sql
CREATE INDEX idx_wines_country ON wines(country);
CREATE INDEX idx_wines_wine_type ON wines(wine_type);
CREATE INDEX idx_wines_price ON wines(price);
CREATE INDEX idx_wines_region ON wines(region);
CREATE INDEX idx_user_cellar_user_id ON user_cellar(user_id);
CREATE INDEX idx_wine_grapes_wine_id ON wine_grapes(wine_id);
CREATE INDEX idx_wine_pairings_wine_id ON wine_pairings(wine_id);
```
