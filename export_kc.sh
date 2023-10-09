#!/bin/bash

# Define the service name
# Replace 'keycloak' with the service name used in docker-compose.yml if different
SERVICE_NAME=keycloak

# Replace 'your_realm_name' with your actual realm name
REALM_NAME=AREA

# Replace '/to/path/config-file.json' with the desired export path inside the container
EXPORT_PATH=/home/config-file.json

# Get the container ID for the running Keycloak service
CONTAINER_ID=$(docker ps --filter "name=$SERVICE_NAME" --format "{{.ID}}")

# Check if a container ID was found
if [ -z "$CONTAINER_ID" ]; then
  echo "Error: No container found for service $SERVICE_NAME"
  exit 1
fi

# Export Keycloak configuration to JSON
docker exec -it $CONTAINER_ID /opt/keycloak/bin/kc.sh export --users realm_file --file $EXPORT_PATH

# Copy the exported file to the host
# Using '.' to specify the current directory as the destination on the host
# docker cp $CONTAINER_ID:$EXPORT_PATH .
