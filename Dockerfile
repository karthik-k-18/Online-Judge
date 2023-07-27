# Use the official Node.js LTS (Long Term Support) image as the base image
FROM node:lts

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY server/package.json server/package-lock.json /app/

# Install Node.js dependencies
RUN npm install

# Install GCC for C and C++ support
RUN apt-get update && apt-get install -y gcc g++

# Install Python for Python support
RUN apt-get install -y python3

# Copy all your server contents to the app directory
COPY server/ .

# Expose the port on which your Node.js app is listening inside the container
EXPOSE 8000

# Set the command to run the Node.js application
CMD ["node", "app.js"]
