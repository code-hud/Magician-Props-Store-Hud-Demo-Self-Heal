FROM node:18-alpine

WORKDIR /app

ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL

COPY package*.json ./

RUN npm install --legacy-peer-deps --prefer-offline --no-audit || npm install --legacy-peer-deps --no-audit

COPY . .

# Build with npm
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
