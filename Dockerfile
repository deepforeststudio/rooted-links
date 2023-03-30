# Use the official Node.js 16 image as the base image
FROM node:18

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the app code to the container
COPY . .

# Build the app
RUN npm run build

# Expose the port used by the app
EXPOSE 9000

# Start the app
CMD ["npm", "run", "serve"]
