# Gestion des Courriers - Mail Management System

A comprehensive mail management system for tracking, processing, and archiving official correspondence. This application provides a user-friendly interface for managing mail workflows, with notifications for important events and comprehensive tracking capabilities.

## Features

- **User Authentication**: Secure login system with role-based access control
- **Dashboard**: Visual overview of mail statistics and recent activities
- **Mail Management**: Create, view, edit, and archive mail items
- **Real-time Notifications**: Server-Sent Events (SSE) based notification system
- **User Management**: Admin interface for managing system users
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **UI Components**: Shadcn UI, Radix UI, Tailwind CSS
- **State Management**: React Context API
- **Routing**: React Router v6
- **API Communication**: Axios
- **Real-time Updates**: EventSource/SSE
- **Form Handling**: React Hook Form, Zod validation
- **Styling**: Tailwind CSS with animations

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend API server running (default: http://10.7.35.44:8081)

## Installation

1. Clone the repository
   ```bash
   git clone <repository-url>
   cd Gestion_des_courriers-P01UserManagement
   npm install
   npm run dev
   npm run build
   npm run lint
   npm run preview

