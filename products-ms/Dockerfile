# Stage 1: Build
FROM node AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci --production

COPY . .

# Build the application
RUN npm run build

# Stage 2: Production image
FROM node:alpine

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json

ENV PORT=5000 \
    DB_HOST=mongodb+srv://firasmosbehi:firas@cluster0.br9usu1.mongodb.net/commerce \
    JWT_SECRET=secret

EXPOSE 5000

CMD ["node", "dist/main.js"]
