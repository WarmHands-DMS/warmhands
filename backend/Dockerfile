# Use the official Node.js Alpine image
FROM node:20.11.1-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json /app/

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . .

# Generate the Prisma Client after copying the application code
RUN npx prisma generate

# Expose the port your application will run on
EXPOSE 8800

# Start the application
CMD ["npm", "run", "dev"]
