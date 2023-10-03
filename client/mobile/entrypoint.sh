#!/bin/sh

# Copy the APK to the shared volume
cp /app/android/app/build/outputs/apk/release/app-release.apk /shared_data/client.apk

# Keep the container running (replace this with whatever command you want to run)
tail -f /dev/null
