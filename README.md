# Quizzy - AI-powered Learning Platform

## Local Development with GitHub Actions

### Setting up a local runner

1. Go to your GitHub repository settings
2. Navigate to Actions > Runners
3. Click "New self-hosted runner"
4. Copy the runner token
5. Run the setup script:

```bash
cd .github/actions-runner
bash config.sh <your_repo_url> <runner_token>
```

### Environment Variables

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

For GitHub Actions, set these secrets in your repository:

- `VITE_OPENAI_API_KEY`
- `VITE_GROQ_API_KEY`
- `VITE_GROK_API_KEY`
- `VITE_ADMIN_PASSWORD`
- `VITE_PORT` (defaults to 3005 if not set)

### CI/CD Pipeline

The project uses three workflows:

1. **Main Pipeline** (`ci.yml`):
   - Runs on GitHub-hosted runners
   - Validates and builds the application
   - Triggered on push/PR to main/develop

2. **Local Pipeline** (`local.yml`):
   - Runs on self-hosted runner
   - Validates and builds locally
   - Triggered on push to feature branches
   - Can be manually triggered

3. **Deployment** (`deploy.yml`):
   - Runs on self-hosted runner
   - Builds and deploys the application using PM2
   - Triggered on push to main or manually
   - Serves the application on port 3005 (configurable via VITE_PORT)

### Local Deployment

The application is deployed using PM2 for process management. Available commands:

```bash
# Start the production server
npm run start

# Stop the server
npm run stop

# Restart the server
npm run restart

# Check server status
pm2 status quizzy

# View logs
pm2 logs quizzy
```

Access the application at `http://localhost:3005` after deployment.