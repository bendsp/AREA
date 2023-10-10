#!/bin/sh

# import the config
/opt/keycloak/bin/kc.sh import --file /etc/keycloak/realm-import.json

# Start Keycloak in development mode
exec /opt/keycloak/bin/kc.sh start-dev