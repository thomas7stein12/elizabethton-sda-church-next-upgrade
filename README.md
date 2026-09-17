# Elizabethton SDA Church Website

**Live Site:** [elizabethton-sda-church-next-upgrad.vercel.app](https://elizabethton-sda-church-next-upgrad.vercel.app/)

A modern, responsive church website built with **Next.js, React, TypeScript, Tailwind CSS, and Supabase**.

This project was developed for **Elizabethton SDA Church** to replace an older static website with a more modern, maintainable platform that provides church information, upcoming events, photo galleries, contact information, and an authenticated administrative area for managing content.

Rather than simply recreating the original site, I rebuilt the application as a full-stack Next.js project with a backend powered by Supabase.

---

## ✨ Features

* 📱 **Responsive Design** for desktop, tablet, and mobile
* 📅 **Dynamic Event Calendar** powered by Supabase
* 🔐 **Admin Authentication** for protected administrative functionality
* 🖼️ **Image Gallery** backed by Supabase Storage
* 🔍 **Interactive Image Viewer** for browsing church photos
* 🏠 **Church Information & About Pages**
* 📍 **Visit Us / Contact Information**
* 🎨 **Custom Church Branding** based on the organization's existing visual identity
* ⚡ **Next.js App Router** for modern application architecture
* ☁️ **Vercel Deployment** for production hosting

---

## 🛠️ Tech Stack

### Frontend

* **Next.js** — React framework and application architecture
* **React** — Component-based UI
* **TypeScript** — Type-safe development
* **Tailwind CSS** — Responsive styling and reusable UI patterns
* **React Icons** — UI icons

### Backend & Data

* **Supabase** — Backend services and database
* **PostgreSQL** — Relational event and application data
* **Supabase Auth** — Administrative authentication
* **Supabase Storage** — Church gallery image storage

### Development & Deployment

* **Git / GitHub** — Version control
* **VS Code** — Development environment
* **NPM** — Package management
* **Vercel** — Production deployment

---

## 🏗️ Application Architecture

The project uses Next.js for the frontend and application layer while Supabase provides the backend services.

```text
                    ┌─────────────────────┐
                    │       Visitor       │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      Next.js UI     │
                    │ React + Tailwind CSS │
                    └──────────┬──────────┘
                               │
                ┌──────────────┼──────────────┐
                │              │              │
                ▼              ▼              ▼
          ┌──────────┐   ┌──────────┐   ┌──────────┐
          │ Supabase │   │ Supabase │   │ Supabase │
          │ Database │   │   Auth   │   │ Storage  │
          └──────────┘   └──────────┘   └──────────┘
               │              │              │
               ▼              ▼              ▼
            Events        Admin Access    Gallery
```

This architecture allows church staff to manage dynamic content without requiring changes to the site's source code.

---

## 📅 Dynamic Event Management

One of the main full-stack features is the church's event system.

Events are stored in **Supabase PostgreSQL** instead of being hard-coded into the frontend.

The application supports church activities such as:

* Worship services
* Meetings
* Prayer events
* Fellowship
* Outreach events

The project also supports recurring events so repeating church activities can be represented without manually creating every individual occurrence.

This makes the calendar easier to maintain as the church's schedule changes.

---

## 🔐 Administrative Dashboard

The website includes an authenticated administrative area for managing protected content.

Administrative functionality is separated from the public-facing website using **Supabase Authentication**.

This allows authorized users to manage site content while keeping administrative functionality inaccessible to normal visitors.

---

## 🖼️ Gallery & Image Storage

The church gallery uses **Supabase Storage** rather than storing image files directly in the application.

The gallery includes:

* Cloud-based image storage
* Dynamic image loading
* Responsive gallery layouts
* Interactive image viewing
* Administrative control over uploaded images

Using Supabase Storage keeps the application separate from the actual image files and provides a scalable way to manage the church's growing collection of photos.

---

## 🎨 Design & User Experience

The website was rebuilt around the church's existing branding and visual identity.

The design uses:

* Deep green
* Gold
* Neutral gray tones
* Responsive layouts
* Clear navigation
* Accessible typography
* Mobile-friendly interactions

The goal was to maintain the identity of the existing organization while giving the site a cleaner and more modern user experience.

---

## 📁 Project Structure

```text
src/
├── app/
│   ├── about/
│   ├── calendar/
│   ├── contact/
│   ├── pictures/
│   ├── visit-us/
│   ├── admin/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
│
├── components/
│   ├── Navbar
│   ├── Footer
│   ├── Event components
│   ├── Gallery components
│   ├── Modal components
│   └── ...
│
├── lib/
│   ├── Supabase configuration
│   └── application helpers
│
└── ...
```

> Folder names may change as the project evolves, but the application is organized around reusable UI components, route-based pages, backend utilities, and centralized data access.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/thomas7stein12/elizabethton-sda-church-next-upgrade.git
cd elizabethton-sda-church-next-upgrade
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file and add the required Supabase configuration:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

### 5. Create a production build

```bash
npm run build
```

---

## 🗄️ Supabase Setup

The application requires a Supabase project with the appropriate database, authentication, and storage configuration.

The backend is used for:

**Database**

* Church events
* Recurring event information
* Other dynamic content

**Authentication**

* Administrative login
* Protected admin functionality

**Storage**

* Church gallery images

Environment variables should be kept in `.env.local` during local development and configured through the deployment platform for production.

---

## 🎯 Project Goals

The primary goal of this project was to transform a basic static church website into a **maintainable full-stack application**.

The project provided practical experience with:

* Next.js App Router
* React component architecture
* TypeScript
* Tailwind CSS
* PostgreSQL
* Supabase
* Authentication
* Cloud storage
* CRUD-style data management
* Responsive design
* Production deployment
* Building software for a real organization

---

## 🌐 Live Website

**Elizabethton SDA Church**
https://elizabethton-sda-church-next-upgrad.vercel.app/

---

## 👨‍💻 Developer

**Thomas Stein**

Full-Stack Web Developer

* 🌐 [Portfolio](https://thomas-portfolio-next.vercel.app/)
* 💻 [GitHub](https://github.com/thomas7stein12)
* 💼 [LinkedIn](https://www.linkedin.com/in/thomas-stein-a0b9b4437/)
* ✉️ [Email](mailto:thomas7stein12@gmail.com)

---

### Built with Next.js, React, TypeScript, Tailwind CSS, Supabase, and PostgreSQL.
