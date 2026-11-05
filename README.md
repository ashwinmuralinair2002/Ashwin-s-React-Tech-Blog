# Ashwin's Tech Blog

A full-stack blog application built with **React, TypeScript, and Firebase**. Users can create an account, publish articles, read posts, and manage their own content.

## Live Demo

🌐 **[Visit Ashwin's Tech Blog](https://ashwins-tech-blog.web.app)**

## Features

- **Authentication:** Sign up and log in using email/password or Google.
- **Account linking:** Link Google sign-in to an existing email/password account with the same email, preserving the Firebase user identity.
- **Blog operations:** Create, read, edit, and delete text-based blog posts.
- **Ownership controls:** Users can edit or delete only their own articles. Other users can view published articles.
- **Protected routes:** Restrict authenticated pages using React Router and Context API.
- **Form validation:** Validate article titles and content before publishing.
- **Notifications:** Display feedback using React Hot Toast and SweetAlert2.

## Tech Stack

- **Frontend:** React, TypeScript, Vite
- **Routing:** React Router DOM
- **Authentication:** Firebase Authentication
- **Database:** Cloud Firestore
- **Notifications:** React Hot Toast, SweetAlert2
- **Hosting:** Firebase Hosting

## Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/ashwinmuralinair2002/Ashwin-s-React-Tech-Blog.git
   cd Ashwin-s-React-Tech-Blog
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the project root and add your Firebase web app configuration:

   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

   Use your own Firebase project configuration. Do not commit your local `.env.local` file.

4. Start the development server:

   ```bash
   npm run dev
   ```

## Production Build

Create an optimized production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Deployment

This project is deployed using Firebase Hosting. To publish an updated build:

```bash
npm run build
firebase deploy --only hosting
```

---

Built as a React project as part of my learning journey with the MERN stack.
