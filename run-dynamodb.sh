#!/bin/bash
docker run -v dynamo-db-data:/data -p 8000:8000 dwmkerr/dynamodb -dbPath /data -sharedDb

# shell: http://localhost:8000/shell/