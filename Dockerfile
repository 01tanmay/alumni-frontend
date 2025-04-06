# Stage 1: Build Angular app
FROM node:18 AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build -- --configuration production

# Stage 2: Serve with Nginx
FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*

# ✅ Copy the right folder that contains index.html
COPY --from=builder /app/dist/alumni-frontend/browser /usr/share/nginx/html

# Optional: debug listing
RUN echo "== NGINX HTML DIR ==" && ls -lh /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
