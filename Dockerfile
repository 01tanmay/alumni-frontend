# Stage 1: Build the Angular app
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build -- --configuration production

# 🔍 DEBUG: Show actual file structure
RUN echo "===== LISTING /app =====" && ls -R /app
RUN echo "===== LISTING /app/dist =====" && ls -R /app/dist

# Stage 2: Serve with Nginx
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

# ❓ Try this if build ends up nested under /app/alumni-frontend
COPY --from=builder /app/alumni-frontend/dist/alumni-frontend /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
