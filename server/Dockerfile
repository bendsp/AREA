# Use the official Node.js image as a parent image
FROM node:latest

# Set the working directory in the container to /usr/src/app
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (or yarn.lock if using yarn) to the container
COPY package*.json ./

# Install the project's dependencies inside the container
RUN npm install

# Copy the rest of the application to the container
COPY . .

# Run the Nest.js build command
RUN npx nest build

# Make the container listen on port 8080
EXPOSE 8080

# Specify the command to run when the container starts
CMD [ "npm", "run", "start:prod" ]
