# Build Stage
FROM node:18-alpine as builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build -- --configuration production --project alumni-frontend

# Serve Stage
FROM nginx:alpine
COPY --from=builder /app/dist/alumni-frontend /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
