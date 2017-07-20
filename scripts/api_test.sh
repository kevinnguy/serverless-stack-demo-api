#!/bin/sh

./node_modules/.bin/apig-test \
--username=$SERVERLESS_STACK_DEMO_USERNAME \
--password=$SERVERLESS_STACK_DEMO_PASSWORD \
--user-pool-id=$COGNITO_USER_POOL_ID \
--app-client-id=$COGNITO_APP_CLIENT_ID \
--cognito-region=$COGNITO_REGION \
--identity-pool-id=$IDENTITY_POOL_ID \
--invoke-url=$API_GATEWAY_URL \
--api-gateway-region=$API_GATEWAY_REGION \
--path-template='/prod/notes' \
--method='POST' \
--body='{"content":"hello world","attachment":"hello.jpg"}'