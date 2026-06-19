-- WW - What Wine? | Initial Schema
-- Phase 1: Basic tables for MVP

-- Users table
CREATE TABLE IF NOT EXISTS users (
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

-- Grapes (Uvas)
CREATE TABLE IF NOT EXISTS grapes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) UNIQUE NOT NULL,
  origin_country VARCHAR(100),
  color VARCHAR(50),
  typical_tannin_level INT,
  typical_sweetness INT,
  acidity_level INT,
  flavor_profile TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Regions (Regiões Vinícolas)
CREATE TABLE IF NOT EXISTS regions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  country VARCHAR(100),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Wines (Rótulos/Vinhos)
CREATE TABLE IF NOT EXISTS wines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  producer VARCHAR(255),
  vintage INT,
  country VARCHAR(100),
  region VARCHAR(255),
  wine_type VARCHAR(50),
  price DECIMAL(10, 2),
  currency VARCHAR(3) DEFAULT 'BRL',

  -- Características
  color VARCHAR(100),
  sweetness_level INT,
  tannin_level INT,
  acidity_level INT,
  alcohol_percentage DECIMAL(3, 1),

  -- Notas de degustação
  tasting_notes TEXT,

  -- Metadados
  source_url VARCHAR(255),
  source_site VARCHAR(100),
  last_scraped TIMESTAMP,
  rating DECIMAL(3, 2),

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Food Pairings (Alimentos)
CREATE TABLE IF NOT EXISTS food_pairings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) UNIQUE NOT NULL,
  category VARCHAR(100),
  wine_type_ideal VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Wine Pairings (Relação N:N entre Wines e Foods)
CREATE TABLE IF NOT EXISTS wine_pairings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wine_id UUID NOT NULL REFERENCES wines(id) ON DELETE CASCADE,
  food_id UUID NOT NULL REFERENCES food_pairings(id) ON DELETE CASCADE,
  pairing_score INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(wine_id, food_id)
);

-- Wine Grapes (Relação N:N entre Wines e Grapes)
CREATE TABLE IF NOT EXISTS wine_grapes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wine_id UUID NOT NULL REFERENCES wines(id) ON DELETE CASCADE,
  grape_id UUID NOT NULL REFERENCES grapes(id) ON DELETE CASCADE,
  percentage INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(wine_id, grape_id)
);

-- User Cellar (Adega Virtual)
CREATE TABLE IF NOT EXISTS user_cellar (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  wine_id UUID NOT NULL REFERENCES wines(id) ON DELETE CASCADE,
  rating INT,
  notes TEXT,
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, wine_id)
);

-- Índices para otimização de queries
CREATE INDEX IF NOT EXISTS idx_wines_country ON wines(country);
CREATE INDEX IF NOT EXISTS idx_wines_wine_type ON wines(wine_type);
CREATE INDEX IF NOT EXISTS idx_wines_price ON wines(price);
CREATE INDEX IF NOT EXISTS idx_wines_region ON wines(region);
CREATE INDEX IF NOT EXISTS idx_user_cellar_user_id ON user_cellar(user_id);
CREATE INDEX IF NOT EXISTS idx_wine_grapes_wine_id ON wine_grapes(wine_id);
CREATE INDEX IF NOT EXISTS idx_wine_pairings_wine_id ON wine_pairings(wine_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
