#!/usr/bin/env bash
set -euo pipefail

# Configuration
APP_ID="1419607"
PRIVATE_KEY_PATH="$(dirname "$0")/../hud-issuehelper.2026-02-11.private-key.pem"
REPO="code-hud/Magician-Props-Store-Hud-Demo-Self-Heal"

# --- Generate JWT from GitHub App credentials ---
now=$(date +%s)
iat=$((now - 60))
exp=$((now + 600))

header=$(printf '{"alg":"RS256","typ":"JWT"}' | openssl base64 -e -A | tr '+/' '-_' | tr -d '=')
payload=$(printf '{"iat":%d,"exp":%d,"iss":"%s"}' "$iat" "$exp" "$APP_ID" | openssl base64 -e -A | tr '+/' '-_' | tr -d '=')
signature=$(printf '%s.%s' "$header" "$payload" | openssl dgst -sha256 -sign "$PRIVATE_KEY_PATH" | openssl base64 -e -A | tr '+/' '-_' | tr -d '=')
JWT="${header}.${payload}.${signature}"

echo "Generated JWT for App ID $APP_ID"

# --- Get installation ID for the repo ---
INSTALLATION_ID=$(curl -s \
  -H "Authorization: Bearer $JWT" \
  -H "Accept: application/vnd.github+json" \
  "https://api.github.com/repos/${REPO}/installation" | python3 -c "import sys,json; print(json.load(sys.stdin)['id'])")

echo "Installation ID: $INSTALLATION_ID"

# --- Get installation access token ---
TOKEN=$(curl -s -X POST \
  -H "Authorization: Bearer $JWT" \
  -H "Accept: application/vnd.github+json" \
  "https://api.github.com/app/installations/${INSTALLATION_ID}/access_tokens" | python3 -c "import sys,json; print(json.load(sys.stdin)['token'])")

echo "Generated installation token"

# --- Parse arguments or use defaults ---
ISSUE_ID="${1:-HUD-5220}"
TITLE="${2:-POST /orders endpoints failed 3.54k times in 7d due to a faulty fraud handling mechanism}"
DESCRIPTION="${3:-The endpoint POST /orders failed 3.54k times in the last 7d with error Typerror- Cannot read properties of undefined (reading toUpperCase) thrown from OrdersService.processCheckout(sessionId, totalAmount, items). Only investigate this error and not other errors.}"
ERROR_COUNT="${4:-3540}"
TIME_RANGE="${5:-7d}"
ENDPOINT="${6:-POST /orders}"
ISSUE_LINK="${7:-}"
ENDPOINT_LINK="${8:-}"

# --- Build JSON payload ---
export ISSUE_ID TITLE DESCRIPTION ERROR_COUNT TIME_RANGE ENDPOINT ISSUE_LINK ENDPOINT_LINK TOKEN
PAYLOAD=$(python3 << 'PYEOF'
import json, os
print(json.dumps({
    "event_type": "hud-issue",
    "client_payload": {
        "issue_id": os.environ["ISSUE_ID"],
        "title": os.environ["TITLE"],
        "description": os.environ["DESCRIPTION"],
        "error_count": int(os.environ["ERROR_COUNT"]),
        "time_range": os.environ["TIME_RANGE"],
        "endpoint": os.environ["ENDPOINT"],
        "issue_link": os.environ["ISSUE_LINK"],
        "endpoint_link": os.environ["ENDPOINT_LINK"],
        "token": os.environ["TOKEN"]
    }
}))
PYEOF
)

# --- Trigger repository_dispatch ---
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer $TOKEN" \
  "https://api.github.com/repos/${REPO}/dispatches" \
  -d "$PAYLOAD")

if [ "$HTTP_STATUS" = "204" ]; then
  echo "Workflow triggered successfully!"
  echo "Check: https://github.com/${REPO}/actions"
else
  echo "Failed to trigger workflow (HTTP $HTTP_STATUS)"
  exit 1
fi
