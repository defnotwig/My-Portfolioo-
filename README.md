# Gabriel Ludwig Rivera — Portfolio

Premium MERN-based personal website inspired by [bryllim.com](https://bryllim.com/) but uniquely branded for Gabriel Ludwig Rivera. Light-only theme, glassmorphism, shadcn/ui components, smooth animations, and a mock AI concierge chat widget.

## Tech Stack
- **Frontend:** React + Vite, Tailwind CSS, shadcn/ui, Framer Motion, Axios
- **Backend:** Node.js, Express.js, Mongoose, MongoDB
- **Styling & Animations:** Tailwind CSS, tailwindcss-animate, glass UI cards, smooth scroll
- **Extras:** SEO metadata, OG image, mobile sheet navigation, chat widget with mock AI endpoint

## Project Structure
```
My Portfolio/
  server/        # Express API, Mongo models, seed data
  client/        # React frontend with shadcn/ui component library
```

## Backend Setup (`server`)
```bash
cd server
cp .env.example .env              # update MONGO_URI and CLIENT_ORIGIN if needed
npm install
npm run dev                       # nodemon + Express on http://localhost:5501
```

### API Routes
- `GET /api/about`
- `GET /api/experience`
- `GET /api/projects`
- `GET /api/certifications`
- `GET /api/recommendations`
- `POST /api/chat` (AI reply via OpenAI if `OPENAI_API_KEY` is set, otherwise mock)

## Frontend Setup (`client`)
```bash
cd client
npm install
npm run dev                       # Vite dev server on http://localhost:3501
```

### Environment
Frontend uses `VITE_API_URL` (defaults to `http://localhost:5501`). `.env` is already set to point at the backend.

For AI chat, set `OPENAI_API_KEY` in `server/.env`. Without it, the chat widget falls back to canned responses.

## Production Builds
```bash
cd client && npm run build        # outputs to client/dist
cd server && npm run start        # ensures Express uses compiled assets if deployed separately
```

## Features
- Hero, About, Experience timeline, Tech Stack, Projects, Recommendations, Certifications, Social Links
- Mobile sheet navigation & floating chat sheet
- Framer Motion entrance animations
- Lazy-loaded project thumbnails
- SEO meta tags + OG preview (`client/public/og-image.svg`)

## Credits
Design direction inspired by [bryllim.com](https://bryllim.com/). All content tailored for Gabriel Ludwig Rivera.

