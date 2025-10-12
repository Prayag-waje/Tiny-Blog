
# Tiny-Blog

Simple full-stack tiny blog application (client + server) used for learning and small demos.

## What this repo contains

- `client/` — React frontend built with Vite.
- `server/` — Express.js backend that connects to MongoDB.

This project provides a minimal blog API and a lightweight React UI to create/read posts.

## Tech stack

- Frontend: React, Vite
- Backend: Node.js, Express, Mongoose
- Dev tooling: nodemon (server), vite (client)

## Folder layout

Root
 - client/
	 - src/ (React source)
	 - package.json (frontend scripts & deps)
 - server/
	 - index.js (Express server)
	 - package.json (backend scripts & deps)

## Prerequisites

- Node.js (v16+ recommended)
- npm
- A MongoDB database (local or Atlas). You need a connection string for the server.

## Environment variables

Create a `.env` file inside `server/` with at least:

MONGODB_URI=<your-mongodb-connection-string>
PORT=8080

Example `.env` (do not commit real credentials):

MONGODB_URI=mongodb+srv://user:password@cluster0.mongodb.net/tiny-blog?retryWrites=true&w=majority
PORT=8080

## Scripts and how to run (PowerShell)

Open two terminals (or tabs). First: run the server. Second: run the client.

Server (from repository root):

```powershell
cd .\server
npm install
# development with auto-reload
npm run dev

# or to run once
npm run start
```

Notes:
- Server `package.json` provides `dev` (nodemon) and `start` (node). The server exposes a health endpoint at `/health` and connects to MongoDB using `MONGODB_URI`.

Client (from repository root):

```powershell
cd .\client
npm install
npm run dev
```

Notes:
- The client is a Vite React app. Default dev server port is 5173 (Vite). Open the URL printed by Vite in the terminal (usually http://localhost:5173).

## Quick checks

- Health check (after server started):

```powershell
Invoke-RestMethod http://localhost:8080/health
```

Expected JSON:

{
	"succes": true,
	"message": "Server is running"
}

(Note: the server currently responds with the `succes` key as implemented in `server/index.js`.)

## Development notes & next steps

- Add API routes for posts (create, read, update, delete) in `server/` using Mongoose models.
- Build out React pages/components in `client/src/` to consume the API.
- Add basic authentication if you want protected routes for creating/editing posts.

## Contributing

Feel free to open issues or submit PRs. Keep changes small and focused.

## License

This repository does not include a license file. Add one if you plan to share publicly.

