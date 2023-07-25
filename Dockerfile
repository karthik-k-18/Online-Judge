# Use the official Node.js LTS (Long Term Support) image as the base image
FROM node:lts

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY server/package.json server/package-lock.json /app/

# Install Node.js dependencies
RUN npm install

# Copy all the application files to the container
COPY server/ .

# Expose the port on which your Node.js app is listening
# Replace 3000 with the actual port your Node.js app is using
EXPOSE 3000

# Set the command to run the Node.js application
CMD ["node", "app.js"]  # Replace "server.js" with your entry point file