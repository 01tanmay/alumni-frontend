# Stage 1: Build the Angular app
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build -- --configuration production

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

# ✅ Correct path to Angular output folder
COPY --from=builder /app/dist/alumni-frontend /usr/share/nginx/html

# Nginx config (optional but recommended)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
