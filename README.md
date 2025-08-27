# PNK Loggins Park 100 - Property Listing

A modern, responsive property listing website for PNK Loggins Park 100 warehouse facility.

## Features

- Responsive design with mobile-first approach
- Interactive media gallery with scroll arrows
- Technical specifications display
- Google Maps integration
- Modern UI with Tailwind CSS

## Deployment

### Railway Deployment

This project is configured for easy deployment to Railway using Docker.

1. **Connect to Railway:**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login to Railway
   railway login
   
   # Deploy
   railway up
   ```

2. **Manual Deployment:**
   - Push your code to GitHub
   - Connect your GitHub repository to Railway
   - Railway will automatically detect the Dockerfile and deploy

### Local Development

To run locally with Docker:

```bash
# Build the Docker image
docker build -t pnk-loggins .

# Run the container
docker run -p 8080:80 pnk-loggins
```

Then visit `http://localhost:8080`

## Project Structure

```
├── index.html          # Main landing page
├── design.html         # Property detail page
├── loggins-100.html    # Alternative property page
├── Dockerfile          # Docker configuration
├── nginx.conf          # Nginx server configuration
├── railway.json        # Railway deployment configuration
└── README.md           # This file
```

## Technologies Used

- HTML5
- Tailwind CSS
- Font Awesome Icons
- Google Maps API
- Nginx (for serving)
- Docker (for containerization)

## Environment Variables

No environment variables are required for basic functionality. If you need to configure Google Maps API key or other services, you can add them through Railway's environment variable settings.