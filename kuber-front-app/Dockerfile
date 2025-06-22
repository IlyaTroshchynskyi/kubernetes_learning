# ------------------------
# Step 1: Build react app
# ------------------------

# Use node:latest as the builder image
FROM node:alpine3.20 AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and install app dependencies
COPY package.json .
RUN npm install

# Copy other project files and build
COPY . ./
RUN npm run build

# --------------------------------------
# Step 2: Set up nginx to serve the app
# --------------------------------------
# Use nginx:latest as the base image
FROM nginx:1.25-alpine

# Overwriting nginx config with our own config file
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

# Copy over the build created in the Step 1
COPY --from=builder /app/dist /usr/share/nginx/html

## Set the working directory
#WORKDIR /usr/share/nginx/html

# --- NEW STEPS ---
# Copy the entrypoint script
COPY ./entrypoint.sh /entrypoint.sh
# Make the script executable
RUN chmod +x /entrypoint.sh

# This tells the container to run our script when it starts.
# The script will then start nginx.
ENTRYPOINT ["/entrypoint.sh"]
