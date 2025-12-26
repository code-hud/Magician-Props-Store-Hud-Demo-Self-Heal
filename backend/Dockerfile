FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps --prefer-offline --no-audit || npm install --legacy-peer-deps --no-audit

COPY . .

RUN npm run build || true

EXPOSE 3001

CMD ["npm", "run", "start"]
