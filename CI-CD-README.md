# CI/CD and Docker Setup

## Overview

This project uses GitHub Actions for CI/CD and Docker for containerization. The frontend is built with React/Vite, and the backend is a Spring Boot application containerized with Docker.

## Local Development

### Prerequisites

- Node.js 20.x
- Docker and Docker Compose
- Git

### Running Locally

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`

### Running with Docker

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

## CI/CD Pipeline

The CI/CD pipeline consists of the following stages:

1. **Build and Test**: Triggered on push to main/master/develop branches or pull requests
   - Installs dependencies
   - Runs linting
   - Executes tests
   - Builds the application

2. **Docker Build and Push**: Triggered on push to main/master branches
   - Builds Docker images
   - Pushes images to Docker Hub

3. **Deployment**: Triggered after successful Docker build and push
   - Deploys the application to the production server

## Required Secrets

The following secrets need to be configured in GitHub:

- `DOCKER_HUB_USERNAME`: Your Docker Hub username
- `DOCKER_HUB_TOKEN`: Your Docker Hub access token
- `DEPLOY_HOST`: The hostname/IP of your deployment server
- `DEPLOY_USER`: The SSH username for your deployment server
- `DEPLOY_KEY`: The SSH private key for authentication

## Environment Variables

See `.env.example` for required environment variables.