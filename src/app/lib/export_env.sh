#!/bin/sh
export STAGE="DEV"
export APP_URL="http://localhost:3000"
export APP_SECRET="dklöföldsa3939f99fd"
export AUTH_SECRET="${APP_SECRET}"
export NEXTAUTH_TRUST_HOST=true
export NEXTAUTH_URL="${APP_URL}"
export NEXT_TELEMETRY_DISABLED=1