#!/bin/bash

BUCKET="leland-the-saint-bernard-site"
PROFILE="geoffberger"

aws s3 sync build s3://$BUCKET/build --profile $PROFILE
