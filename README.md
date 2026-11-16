# Ashwin's Tech Blog

A blog application built using **React, TypeScript, and Firebase**. Users can create accounts, publish articles, browse posts, and manage their own content.

## Live Demo

🌐 [Visit Ashwin's Tech Blog](https://ashwins-tech-blog.web.app)

## Features

- **User Authentication:** Register and log in using email and password or Google.
- **Blog Management:** Create, read, edit, and delete blog articles.
- **Article Ownership:** Users can modify or delete only their own articles.
- **Protected Routes:** Restrict dashboard and article management pages to authenticated users.
- **Public Blog:** Browse and read published articles.
- **Form Validation:** Validate article titles and content before publishing.
- **Notifications:** Display success and error messages using React Hot Toast and SweetAlert2.

## Technology Stack

- **Frontend:** React, TypeScript
- **Build Tool:** Vite
- **Routing:** React Router DOM
- **Authentication:** Firebase Authentication
- **Database:** Cloud Firestore
- **State Management:** Context API
- **Notifications:** React Hot Toast, SweetAlert2
- **Hosting:** Firebase Hosting

## Project Structure

```text
src/
├── auth/
│   └── AuthContext.tsx
├── components/
│   ├── GoogleSignInButton.tsx
│   ├── GuestRoute.tsx
│   ├── ProtectedRoute.tsx
│   └── navbar.tsx
├── layouts/
│   └── DashboardLayout.tsx
├── pages/
│   ├── AddBlog.tsx
│   ├── BlogDetails.tsx
│   ├── BlogList.tsx
│   ├── EditBlog.tsx
│   ├── Login.tsx
│   ├── NotFound.tsx
│   └── auth/
│       └── Signup.tsx
├── utils/
│   └── blogValidation.ts
├── App.tsx
├── firebase.ts
└── main.tsx
```

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

3. Configure your Firebase project in `src/firebase.ts` using your Firebase web app configuration.

4. Start the development server:

   ```bash
   npm run dev
   ```

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

## Deployment

The application is hosted using Firebase Hosting.

To deploy an updated version:

```bash
npm run build
firebase deploy --only hosting
```

## Author

**Ashwin Murali Nair**

[GitHub](https://github.com/ashwinmuralinair2002)

---

Built as part of my React and full-stack development learning journey.
