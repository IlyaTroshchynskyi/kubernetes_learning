#!/bin/sh
# exit on error
set -e

# Define the path to the main index.html file
INDEX_FILE=/usr/share/nginx/html/index.html

echo "Starting substitution on $INDEX_FILE"

# Use envsubst to replace placeholders with environment variable values.
# We create a temporary file and then replace the original to avoid issues.
envsubst '${VITE_DESCRIPTION}' < "$INDEX_FILE" > "$INDEX_FILE.tmp" && mv "$INDEX_FILE.tmp" "$INDEX_FILE"
envsubst '${VITE_BASE_URL}' < "$INDEX_FILE" > "$INDEX_FILE.tmp" && mv "$INDEX_FILE.tmp" "$INDEX_FILE"
envsubst '${VITE_ENV}' < "$INDEX_FILE" > "$INDEX_FILE.tmp" && mv "$INDEX_FILE.tmp" "$INDEX_FILE"

echo "Substitution complete. Starting Nginx..."

# Start Nginx in the foreground
exec nginx -g 'daemon off;'