from node:20-alpine
workdir /app
copy package*.json ./
run npm ci
copy . .
run npm run build
expose 3000
cmd ["npm", "run", "start:prod"]