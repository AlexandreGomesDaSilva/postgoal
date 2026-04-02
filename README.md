# PostGoal

Application de suivi de matchs de foot 5v5.

## Stack
- **Client** : React 18 + Vite + React Router DOM + SCSS
- **Server** : Node.js + Express + MongoDB (Mongoose)

## Lancer le projet

### Client
```bash
cd client
npm install
npm run dev
```

### Server
```bash
cd server
npm install
# Copier .env.example en .env et remplir les valeurs
cp .env.example .env
npm run dev
```

## Structure
- `client/` — Application React
- `server/` — API REST Express