# Use the official Node.js 20.11.1 image as the base image
FROM node:20.11.1

# Create and set the working directory in the container
WORKDIR /app

# Copy the application files to the container
COPY . .

# Install the dependencies in the container
RUN npm install

# Expose the port that the app listens on
EXPOSE 3000

# Install pm2
RUN npm install -g pm2

# Start the application
CMD ["pm2", "start", 'index.js']