# Rezerva_Frontend

Welcome to the Rezerva_Frontend repository! This repository contains the frontend codebase for the Rezerva Restaurant Table Booking Web Application.
## Table of Contents

- [Introduction](#introduction)
- [Project Setup](#project-setup)
- [Available Scripts](#available-scripts)
- [Dependencies](#dependencies)

![image](https://github.com/hanani8/Rezerva_Frontend/assets/31515421/72361717-7026-44ff-b173-b65c73332e18)
![image](https://github.com/hanani8/Rezerva_Frontend/assets/31515421/fc15f0b6-c181-4a67-b7d1-9e11b80218f4)
![image](https://github.com/hanani8/Rezerva_Frontend/assets/31515421/6fa5e16e-7469-43ed-b66d-7cf6e0fac801)
![image](https://github.com/hanani8/Rezerva_Frontend/assets/31515421/7ee92375-916d-481b-8e16-6afb243a4742)



## Introduction

Rezerva_Frontend is the frontend component of the Rezerva project, which provides users with a seamless interface to  make reservations, and manage their dining experience. It is built using Svelte and Tailwind CSS, and it integrates with the Rezerva backend via API calls.

## Project Setup

To set up the Rezerva_Frontend project, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/your-username/Rezerva_Frontend.git
   ```

2. Navigate to the project directory:

   ```bash
   cd Rezerva_Frontend
   ```

3. Install the project dependencies:

   ```bash
   npm install
   ```

4. Configure the API endpoint in the project:

   Open the `.env` file and set the `VITE_API_BASE_URL` variable to the URL of your Rezerva backend API:

   ```env
   VITE_API_BASE_URL=http://your-rezerva-api-url.com
   ```

5. Start the development server:

   ```bash
   npm run dev
   ```

   This will launch the development server, and you can access the application in your browser at `http://localhost:3000`.

## Available Scripts

In the project directory, you can run the following scripts:

- `npm run dev`: Starts the development server. You can view the app in your browser at `http://localhost:3000`.

- `npm run build`: Builds the app for production. The output will be in the `build` directory.

- `npm run preview`: Serves the built app locally for preview.

## Dependencies

Rezerva_Frontend relies on several dependencies, including:

- `@sveltejs/kit`: The SvelteKit framework for building web applications.

- `axios`: A popular HTTP client for making API requests.

- `tailwindcss`: A utility-first CSS framework for styling the application.

- `vite`: A fast and minimalist build tool that serves as the development server.

You can find more details about these dependencies in the `package.json` file.

---
