FROM node:14 as build-stage

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
COPY jsconfig.json ./
COPY vite.config.js ./
COPY yarn.lock ./
COPY .browserslistrc ./
COPY .editorconfig ./
COPY .eslintrc.js ./
COPY ad ./
COPY public ./
COPY src ./
COPY index.html ./

RUN npm install --legacy-peer-deps
RUN npm install -g http-server
COPY . .
RUN npm run build

COPY server.cert /etc/ssl/certificate.crt
COPY server.key /etc/ssl/private.key

EXPOSE 3000

CMD [ "http-server", "-p 3000", "dist" ]