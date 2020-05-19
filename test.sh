#!/bin/bash

set -x

# ROTATE OUT client ID and client secret
ACCESS_TOKEN=$(curl -v https://access.xapix.io/oauth2/token -F client_id\=3tSStBF7ykV59bsSjRCtLUM1 -F client_secret\=1wL1u5PrwJEQNQoZCeBqerS3 -F grant_type\=client_credentials | jq -r .access_token)

echo $ACCESS_TOKEN

# curl \
#     -H "Content-Type: application/json" \
#     -H "Authorization: Bearer ${ACCESS_TOKEN}" \
#     -X POST \
#     --data '{"state":"","latitude":"+40.6700","longitude":"-73.9400"}' \
#     'https://api.xapix.dev/covid-19/pois/risk-level-by-geopos'

curl \
    --header 'Content-Type: application/json' \
    --header "Authorization: Bearer ${ACCESS_TOKEN}" \
    --request GET \
    'https://api.xapix.dev/covid-19/pois/riskv5?latitude=+40.73&longitude=-74.00'
