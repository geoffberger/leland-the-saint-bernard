#!/bin/bash

BUCKET="leland-the-saint-bernard-site"
PROFILE="geoffberger"

aws s3 sync build/public/assets s3://$BUCKET --profile $PROFILE
