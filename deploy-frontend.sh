#!/bin/bash

# === CONFIGURATION ===
AWS_REGION="ap-south-1"
ECR_REPOSITORY="alumni-frontend"
ECS_CLUSTER="alumni-cluster"
ECS_SERVICE="alumni-frontend-service"
IMAGE_TAG=$(git rev-parse --short HEAD)
CONTAINER_NAME="alumni-frontend"

# === LOGIN TO AWS ===
echo "Logging into AWS ECR..."
aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin "$(aws sts get-caller-identity --query Account --output text).dkr.ecr.$AWS_REGION.amazonaws.com"

# === BUILD DOCKER IMAGE ===
echo "Building Docker image: $ECR_REPOSITORY:$IMAGE_TAG"
docker build -t $ECR_REPOSITORY:$IMAGE_TAG ./alumni-frontend

# === TAG AND PUSH TO ECR ===
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
ECR_URI="$ACCOUNT_ID.dkr.ecr.$AWS_REGION.amazonaws.com/$ECR_REPOSITORY"

echo "Tagging and pushing image to ECR: $ECR_URI:$IMAGE_TAG"
docker tag $ECR_REPOSITORY:$IMAGE_TAG $ECR_URI:$IMAGE_TAG
docker push $ECR_URI:$IMAGE_TAG

# === UPDATE ECS SERVICE ===
echo "Updating ECS service to use new image..."
aws ecs update-service \
  --cluster $ECS_CLUSTER \
  --service $ECS_SERVICE \
  --force-new-deployment \
  --region $AWS_REGION

echo "✅ Deployment complete: $ECR_URI:$IMAGE_TAG"
