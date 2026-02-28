# File Uploader

## Title and Description

File Uploader is a full-stack web application for uploading, organizing, and downloading files. It was built as a portfolio project to practice authentication, file handling, and relational data modeling with Node.js, Express, and Prisma.

[Watch the video overview](https://youtu.be/oMoipJQL1wk)

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Setup Instructions](#setup-instructions)

## Features

- User sign-up, sign-in, and sign-out with session-based authentication.
- Personal drive view for each authenticated user.
- Create, rename, view, and delete folders.
- Upload files to the root drive or to a specific folder.
- Rename files and move files between folders.
- Download files from the drive.
- Delete files and automatically remove related records when folders are deleted.

## Tech Stack

| Tool                      | Purpose                                                     |
| ------------------------- | ----------------------------------------------------------- |
| Node.js                   | JavaScript runtime for the server                           |
| Express                   | Web framework for routing and middleware                    |
| EJS                       | Server-side templating for views                            |
| Prisma                    | ORM for PostgreSQL                                          |
| PostgreSQL                | Relational database for users, folders, files, and sessions |
| Passport + passport-local | Local Strategy (username/password authentication)           |
| express-session           | Session management                                          |
| Multer                    | Multipart file upload handling                              |
| bcrypt                    | Password hashing                                            |
| express-validator         | Request input validation                                    |
| date-fns                  | Date formatting utilities                                   |
| oat                       | UI library for styling and components                       |
| Font Awesome              | Icon library                                                |

## Screenshots

![Screenshot 1](public/screenshots/screenshot-1.png)
![Screenshot 2](public/screenshots/screenshot-2.png)
![Screenshot 3](public/screenshots/screenshot-3.png)
![Screenshot 4](public/screenshots/screenshot-4.png)
![Screenshot 5](public/screenshots/screenshot-5.png)
![Screenshot 6](public/screenshots/screenshot-6.png)
![Screenshot 7](public/screenshots/screenshot-7.png)

## Setup Instructions

1. Clone the repository and move into the project folder:

   ```bash
   git clone git@github.com:Jackan04/file-uploader.git
   cd file-uploader
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root:

   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/file_uploader"
   SESSION_SECRET="your-session-secret"
   PORT=3000
   ```

   Replace `USER` with your actual computer username (for example, `jacob`) and replace `your-session-secret` with a secure string.

4. Ensure your local PostgreSQL server is running and that a database named `file_uploader` exists before running migrations.

   Helpful resources:
   - [Installing PostgreSQL](https://www.theodinproject.com/lessons/nodejs-installing-postgresql)
   - [Using PostgreSQL](https://www.theodinproject.com/lessons/nodejs-using-postgresql)

5. Run Prisma migrations:

   ```bash
   npx prisma migrate dev
   ```

6. Start the server:

   ```bash
   node app.js
   ```

7. Open the app in your browser:

   ```
   http://localhost:3000
   ```
