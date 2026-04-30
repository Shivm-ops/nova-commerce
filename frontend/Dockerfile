FROM node:20-slim

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

# Expose the port Vite will run on
EXPOSE 3000

# Run in dev mode but accessible to the container network
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]
