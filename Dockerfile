# ---------- Build Stage ----------
FROM node:20-alpine AS builder

WORKDIR /app

# Accept build argument
ARG VITE_API_URL

# Set env for Vite build
ENV VITE_API_URL=$VITE_API_URL

COPY package*.json ./
RUN npm ci

COPY . .

# Build with correct API URL
RUN npm run build


# ---------- Production Stage ----------
FROM node:20-alpine

WORKDIR /app

RUN npm install -g serve

# Copy built files
COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]