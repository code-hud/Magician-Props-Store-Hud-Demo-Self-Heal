FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps --prefer-offline --no-audit || npm install --legacy-peer-deps --no-audit

COPY . .

# Build with npm
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
