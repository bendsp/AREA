#!/bin/sh

# Copy the APK to the shared volume
cp /usr/share/nginx/html/client.apk /shared_data/client.apk

# Keep the container running (replace this with whatever command you want to run)
tail -f /dev/null
