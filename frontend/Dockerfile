# Use a Node.js base image with the desired version
FROM node:latest

# Set the working directory inside the container
WORKDIR /app

# Copy local directories to the current local directory of our docker image (/app)
COPY . .

# Install node packages, install serve, build the app, and remove dependencies at the end
RUN npm install \
    && npm install -g serve \
    && npm run build \
    && rm -fr node_modules

EXPOSE 5173

# Start the app using serve command
CMD [ "serve", "-s", "dist" ]