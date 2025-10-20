#!/bin/bash
set -e

echo "🚀 Déploiement en cours..."

cd /home/dev/DataForge

# Récupération du code
echo "📦 Pull du dernier code..."
git fetch origin main
git reset --hard origin/main

# Build et redémarrage des conteneurs
echo "🐳 Reconstruction des images..."
docker compose build --no-cache

echo "🔁 Redémarrage des conteneurs..."
docker compose up -d

echo "✅ Déploiement terminé avec succès !"
