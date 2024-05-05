# Stage 1: Build
FROM node AS build

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . .

# Build the application
RUN npm run build

# Stage 2: Production image
FROM node:alpine

WORKDIR /app

COPY --from=build /app/dist ./dist

ENV PORT=5000 \
    DB_HOST=mongodb+srv://firasmosbehi:firas@cluster0.br9usu1.mongodb.net/commerce \
    JWT_SECRET=secret

EXPOSE 5000

CMD ["node", "dist/main.js"]
