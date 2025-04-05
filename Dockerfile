# Stage 1: Build Angular app
FROM node:18 AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build -- --configuration production
RUN ls -R /app/dist/alumni-frontend

# Stage 2: Serve with Nginx
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist/alumni-frontend /usr/share/nginx/html

# ✅ List contents right before Nginx runs
RUN echo "==== FINAL FILE STRUCTURE ====" && ls -l /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
