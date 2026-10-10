#!/usr/bin/env bash
# Discovery-only probe for undocumented admin/KYC routes using your own admin JWT.
# Prompts for everything at runtime. Nothing is written to env or shell history.
# Sends OPTIONS then GET only. No POST/PUT, so existing routes are not mutated.

set -u
BASE="${BASE:-https://game-api.gambly.casino}"

# --- secure prompts ---
printf 'Admin JWT (input hidden): ' >&2
read -rs JWT; echo >&2
[ -n "$JWT" ] || { echo "no token entered, aborting" >&2; exit 1; }

printf 'User ID to target: ' >&2
read -r UID_
[ -n "$UID_" ] || { echo "no user id entered, aborting" >&2; exit 1; }

printf 'Base URL [%s]: ' "$BASE" >&2
read -r in_base
[ -n "${in_base:-}" ] && BASE="$in_base"

paths=(
  "/api/v1/kyc/${UID_}/status"
  "/api/v1/kyc/${UID_}"
  "/api/v1/kyc/status?userId=${UID_}"
  "/api/v1/kyc/approve"
  "/api/v1/kyc/reject"
  "/api/v1/kyc/admin/${UID_}"
  "/api/v1/admin/kyc/${UID_}"
  "/api/v1/admin/kyc/${UID_}/status"
  "/api/v1/admin/users/${UID_}/kyc"
  "/api/v1/user/${UID_}/kyc"
  "/api/v1/user/${UID_}/kyc/status"
  "/api/v1/kyc/verifications/${UID_}"
  "/api/v1/kyc/id/verify"
  "/api/v1/kyc/manual-review"
  "/api/v1/kyc/override"
)

echo >&2
printf '%-10s %-8s %s\n' "METHOD" "STATUS" "PATH"
for p in "${paths[@]}"; do
  for m in OPTIONS GET; do
    code=$(curl -s -o /dev/null -w '%{http_code}' -X "$m" \
      -H "Authorization: Bearer ${JWT}" \
      -H "Accept: application/json" \
      --max-time 8 \
      "${BASE}${p}")
    printf '%-10s %-8s %s\n' "$m" "$code" "$p"
  done
done

unset JWT
