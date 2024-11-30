# Supabase Database Schema

Ce dossier contient les migrations et la structure de la base de données Supabase pour WalletVision.

## Structure

- `migrations/` : Contient les fichiers SQL de migration numérotés
  - `001_initial_schema.sql` : Schéma initial avec les tables wallets et wallet_assets

## Tables Principales

### `wallets`
- Stocke les informations des portefeuilles des utilisateurs
- Champs : id, name, user_id, description, total_value, currency, is_public, created_at, updated_at

### `wallet_assets`
- Stocke les actifs contenus dans chaque portefeuille
- Champs : id, wallet_id, asset_id, asset_symbol, asset_name, asset_type, asset_provider, quantity, purchase_price, current_price, value, last_updated, created_at

## Sécurité

- Row Level Security (RLS) activé sur toutes les tables
- Politiques d'accès basées sur l'utilisateur authentifié
- Contraintes de validation sur les champs importants

## Indexes

- `wallets_user_id_idx` : Pour les recherches par user_id
- `wallet_assets_wallet_id_idx` : Pour les recherches par wallet_id
- `wallet_assets_asset_symbol_idx` : Pour les recherches par symbole d'actif
