# 🏆 Gestionnaire de Tournoi de Football PRO

**Version:** 2.0 (Refactorisée)  
**Status:** ✅ Production Ready

## 🎯 À Propos

Un gestionnaire de tournoi de football **professionnel** et **flexible** pour créer des tournois personnalisés avec :
- 📋 Phase de groupes avec calendrier Round-Robin
- 🎯 Élimination directe (8, 16, 32 équipes...)
- 🥉 Petite finale et matchs de classement
- 💾 Sauvegarde automatique
- 📊 Classements intelligents (points, différence, H2H)

### Caractéristiques

✅ Configurable à 100%
- Nombre d'équipes: 2-64
- Nombre de groupes: 1-16
- Format phase finale: 2, 4, 8, 16, 32...

✅ Robuste
- Validation complète des données
- Appairage garantissant pas de poule au 1er tour
- Gestion des tirs au but et matchs nuls

✅ Performance
- Architecture modulaire
- Rendu DOM optimisé
- Stockage local avec export/import JSON

✅ Design
- Interface moderne et responsive
- Dégradé or/noir professionnel
- Mobile-friendly

---

## 🚀 Démarrage Rapide

### Option 1: Directement depuis GitHub
```bash
git clone https://github.com/jrldt2025-cloud/tournament-manager-pro.git
cd tournament-manager-pro
open index.html  # Ou double-cliquez sur le fichier
```

### Option 2: Utiliser avec un serveur local (recommandé)
```bash
# Python 3
python -m http.server 8000

# Node.js
npx http-server

# PHP
php -S localhost:8000
```

Puis ouvrez http://localhost:8000

---

## 📖 Utilisation

### Étape 1: Configuration
1. Entrez le nom du tournoi
2. Définissez le nombre d'équipes (ex: 16)
3. Choisissez le nombre de groupes (ex: 4)
4. Sélectionnez le format de phase finale (ex: Quarts de finale = 8 équipes)
5. Cliquez **"Saisir les Équipes & Logos"**

### Étape 2: Saisie des Équipes
1. Pour chaque équipe:
   - Entrez le nom
   - Optionnel: Uploadez un logo
   - Vérifiez le groupe attribué
2. Cliquez **"Lancer le Tournoi"**

### Étape 3: Phase de Groupes
1. Les matchs sont générés automatiquement (Round-Robin)
2. Saisissez les scores au fur et à mesure
3. Le classement se met à jour automatiquement
4. Vérifiez le classement des 3e places
5. Cliquez **"Générer Phase Finale"** quand prêt

### Étape 4: Phase Finale
1. Les matchs de phase finale sont créés
2. Les appairages garantissent: **pas d'équipes du même groupe au 1er tour** ✅
3. Entrez les scores
4. Gestion automatique des tirs au but en cas de match nul
5. La petite finale se peuple automatiquement

### Étape 5: Matchs de Classement
- Automatiquement générés pour les non-qualifiés
- Structures 5-8 si quarts de finale

---

## 🏗️ Architecture

### Modulaire & Évolutive

```
tournament-manager-pro/
├── index.html                    # Shell HTML
├── css/
│   └── styles.css               # Design complet
├── js/
│   ├── main.js                  # Initialisation
│   ├── core/
│   │   ├── Team.js              # Modèle équipe
│   │   ├── Group.js             # Gestion poule
│   │   └── Bracket.js           # Élimination (À créer)
│   ├── services/
│   │   ├── ValidationService.js # Validation données
│   │   ├── StorageService.js    # Persistance
│   │   └── AlgorithmService.js  # Algorithmes tournoi
│   ├── ui/
│   │   ├── ConfigUI.js          # Onglet configuration
│   │   ├── GroupsUI.js          # Onglet groupes
│   │   ├── BracketUI.js         # Onglet élimination
│   │   └── PlacementUI.js       # Onglet classement
│   └── utils/
│       └── helpers.js           # Utilitaires
├── tests/                       # Tests unitaires (À ajouter)
└── docs/
    ├── AMÉLIORATIONS.md         # Changements v2
    ├── ARCHITECTURE.md          # Schema technique
    └── API.md                   # Référence API
```

---

## 🔐 Données & Persistance

### Sauvegarde Automatique
Toutes les modifications sont sauvegardées en **localStorage** en temps réel.

### Export/Import
- **Exporter:** Télécharger l'état complet en JSON
- **Importer:** Charger un tournoi depuis un fichier JSON

### Exemple données
```json
{
  "config": {
    "tName": "Coupe du Monde 2026",
    "numTeams": 32,
    "numGroups": 8,
    "bracketFormat": 16
  },
  "teams": [
    {
      "id": 0,
      "name": "France",
      "logo": "...",
      "groupIdx": 0,
      "stats": { "pts": 9, "played": 3, "bp": 6, "bc": 1 }
    }
  ],
  "groups": [ ... ],
  "bracket": [ ... ]
}
```

---

## 🐛 Résolution de Problèmes

### "Les scores ne se sauvegardent pas"
- Vérifiez que localStorage est activé dans votre navigateur
- Essayez de vider le cache (Ctrl+Shift+Suppr)
- Exportez vos données comme backup

### "Deux équipes du même groupe se rencontrent au 1er tour"
- ❌ **BUG CORRIGÉ en v2.0** ✅
- L'algorithme AlgorithmService garantit maintenant l'absence de poule au 1er tour

### "L'interface est lente avec 64 équipes"
- Utilisez la **v2.0 refactorisée** pour un rendu optimisé
- Les événements sont délégués au lieu d'être inlinés

---

## 📊 Critères de Classement

### Poules (Round-Robin)
1. **Points** (3 = victoire, 1 = nul, 0 = défaite)
2. **Différence de buts** (buts pour - buts contre)
3. **Buts marqués** (buts pour)
4. **H2H** (confrontation directe - simplifié)

### 3e Places
Cl classement combiné de tous les 3e de chaque poule, avec même critères.

### Phase Finale
Élimination directe = un seul perdant par match.

---

## 🎨 Personnalisation

### Couleurs
Modifiez `:root` dans `css/styles.css` :
```css
:root {
  --gold: #f59e0b;
  --gold-glow: #fbbf24;
  --bg-dark: #020617;
  --panel-bg: rgba(15, 23, 42, 0.95);
}
```

### Logos
Uploadez des images PNG/JPG. Les logos sont encodés en base64 dans les données.

### Langues
Le code est actuellement en **français**. Pour l'anglais/autres langues, créez :
```javascript
// i18n/fr.js
const messages = { "team-name": "Nom de l'équipe" };
// i18n/en.js
const messages = { "team-name": "Team name" };
```

---

## 🧪 Tests

### Exécuter les tests (À ajouter)
```bash
npm test
```

Couverture cible: **85%+**

---

## 🤝 Contribuer

Les contributions sont bienvenues! 🎉

1. **Fork** le repo
2. Créez une branche (`git checkout -b feature/nouvelle-feature`)
3. **Committez** vos changements
4. **Pushez** vers la branche
5. Ouvrez une **Pull Request**

Consultez [CONTRIBUTING.md](CONTRIBUTING.md) pour les détails.

---

## 📝 License

MIT © 2026  
Utilisez librement pour vos projets personnels ou commerciaux.

---

## 📞 Support

- 🐛 **Bug Report:** [GitHub Issues](https://github.com/jrldt2025-cloud/tournament-manager-pro/issues)
- 💡 **Feature Request:** [Discussions](https://github.com/jrldt2025-cloud/tournament-manager-pro/discussions)
- 📧 **Email:** (contact à ajouter)

---

## 🗓️ Roadmap

- [ ] v2.1: Tests unitaires complets
- [ ] v2.2: Backend Node.js + MongoDB
- [ ] v2.3: API REST et WebSocket
- [ ] v2.4: Export PDF des feuilles de match
- [ ] v2.5: Authentification & multi-user
- [ ] v3.0: App mobile (React Native)

---

**Merci d'utiliser Tournament Manager Pro!** ⚽🏆
