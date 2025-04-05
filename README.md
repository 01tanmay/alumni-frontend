
After every commit to master branch GitHub Actions will:
Build your Angular app
Dockerize it with the commit hash
Push to ECR ✅
Register new task revision with the new image
Deploy that to your ECS Fargate service
