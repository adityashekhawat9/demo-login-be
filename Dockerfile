# MUTLTI STAGE BUILD
# 1st stage 
FROM node:22-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
# 2nd stage
FROM node:22-alpine AS production
WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev
COPY --from=builder /app .
EXPOSE 3333
CMD ["node", "server.js"]