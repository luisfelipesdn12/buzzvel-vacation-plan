# buzzvel-vacation-plan

A web platform to manage holyday plans. Available now at [trip.luisf.dev](https://trip.luisf.dev/)

![Website Card](./public/website-card.png)

## 🧮 Features

- 📅 Manage your plans in a beautiful card view
- 🫂 Add participants to each trip
- 🆔 User register and login with authenticated routes 
- 🖼️ Retriave profile picture and display name from Gravatar
- 🌐 Deploy to the web on each Git update
- 🔗 Custom domain configuration
- 🛑 Careful errors handling with good UX
- 🚪 Protected API using session to get personal data
- 🔍 Testing in components and utils

## 🧑‍💻 Tech

- **Supabase** as Postgres databse and Auth Server
- **Next.js** for web development (React, Node.js, Typescript)
- **Vercel** for hosting and CI/CD
- **Shadcn** and **Tailwind** as for styling and components

## ↗️ Running

1. Install dependencies with `yarn`
2. Create a [Supabase](https://supabase.com/) project
3. Create a `.env` file based on `.env.example` with the project credentials
4. On the project dashboard or using the [Supabase](https://supabase.com/) CLI, run the `src/database/seed.sql` script
5. Start the project with `yarn dev`

## 🧱 Structure

- `src/app` - All the routes using App Router syntax from up to date Next.js
- `src/components` - The components used in a greater scope
- `src/components/ui` - Shadcn components installed individually
- `src/database` - Stores `seed.sql` to startup the SQL database
- `src/icons` - SVG components of illustrations
- `src/lib` - Utils and types

## 🖼️ Illustrations

- Pilot: https://designs.ai/graphicmaker/illustrations/Duotone_Cartoon_Set/85-pilot
- Camping: https://designs.ai/graphicmaker/illustrations/Duotone_Cartoon_Set/153-camping
