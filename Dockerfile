# Stage 1: Build the Angular app
FROM node:18 AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy all source code
COPY . .

# Build Angular app for production
RUN npm run build -- --configuration production

# 🔍 Debug: List built files to verify Angular output
RUN ls -R /app/dist/alumni-frontend

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Clean default Nginx content
RUN rm -rf /usr/share/nginx/html/*

# ✅ Copy Angular output to Nginx root
COPY --from=builder /app/dist/alumni-frontend /usr/share/nginx/html

# Copy SPA-compatible Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
