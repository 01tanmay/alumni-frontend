# Stage 1: Build the Angular app
FROM node:18 AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code and build the app
COPY . .
RUN npm run build -- --configuration production

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Clean default Nginx content
RUN rm -rf /usr/share/nginx/html/*

# ✅ Copy correct Angular output folder
COPY --from=builder /app/dist/alumni-frontend /usr/share/nginx/html

# ✅ OPTIONAL: Debug fallback in case Angular build is empty
RUN echo "<h1>Hello from ECS!</h1>" > /usr/share/nginx/html/debug.html

# ✅ Recommended Nginx config for Angular SPA routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
