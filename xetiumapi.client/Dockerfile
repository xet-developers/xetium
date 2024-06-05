FROM node:21
WORKDIR /app
COPY xetiumapi.client/package*.json ./
RUN npm install
COPY xetiumapi.client .
EXPOSE 5173
CMD ["npm", "run", "dev"]