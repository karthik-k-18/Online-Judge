# Use the official Node.js LTS (Long Term Support) image as the base image
FROM node:lts

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
#To provide necessary dependencies for your Node.js application.(child_process, express, fs)
COPY server/package.json server/package-lock.json /app/

# Install Node.js dependencies
RUN npm install

# Copying only fake entry point file to the container
COPY server/dockerApp.js .

# Expose the port on which your Node.js app is listening inside of a container
EXPOSE 8000

# Set the command to run the Node.js application
CMD ["node", "dockerApp.js"]  # Replace "server.js" with your entry point file