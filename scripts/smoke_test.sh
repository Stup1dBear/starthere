#!/usr/bin/env bash

set -euo pipefail

WEB_URL="${WEB_URL:-}"
API_BASE_URL="${API_BASE_URL:-}"
SMOKE_TEST_MODE="${SMOKE_TEST_MODE:-basic}"
SMOKE_TEST_EMAIL="${SMOKE_TEST_EMAIL:-}"
SMOKE_TEST_PASSWORD="${SMOKE_TEST_PASSWORD:-}"

if [[ -z "${WEB_URL}" || -z "${API_BASE_URL}" ]]; then
  echo "WEB_URL and API_BASE_URL are required"
  exit 1
fi

if [[ "${SMOKE_TEST_MODE}" != "basic" && "${SMOKE_TEST_MODE}" != "deep" ]]; then
  echo "SMOKE_TEST_MODE must be either 'basic' or 'deep'"
  exit 1
fi

TMP_DIR="$(mktemp -d)"
trap 'rm -rf "${TMP_DIR}"' EXIT

request() {
  local method="$1"
  local url="$2"
  local body_file="$3"
  local data="${4-}"

  if [[ "$#" -ge 4 ]]; then
    shift 4
  else
    shift 3
  fi

  local http_code
  if [[ -n "${data}" ]]; then
    http_code="$(curl -sS -o "${body_file}" -w "%{http_code}" -X "${method}" "${url}" "$@" -H "Content-Type: application/json" --data "${data}")"
  else
    http_code="$(curl -sS -o "${body_file}" -w "%{http_code}" -X "${method}" "${url}" "$@")"
  fi

  echo "${http_code}"
}

assert_status() {
  local expected="$1"
  local actual="$2"
  local context="$3"

  if [[ "${actual}" != "${expected}" ]]; then
    echo "Smoke test failed: ${context} returned HTTP ${actual}, expected ${expected}"
    exit 1
  fi
}

assert_json_success() {
  local body_file="$1"
  local context="$2"

  python3 - "$body_file" "$context" <<'PY'
import json
import sys

body_file, context = sys.argv[1], sys.argv[2]
with open(body_file, "r", encoding="utf-8") as f:
    data = json.load(f)

if data.get("success") is not True:
    raise SystemExit(f"Smoke test failed: {context} response.success != true")
PY
}

json_field() {
  local body_file="$1"
  local field_path="$2"

  python3 - "$body_file" "$field_path" <<'PY'
import json
import sys

body_file, field_path = sys.argv[1], sys.argv[2]
with open(body_file, "r", encoding="utf-8") as f:
    data = json.load(f)

value = data
for part in field_path.split("."):
    value = value[part]

print(value)
PY
}

echo "==> Basic smoke checks"

web_body="${TMP_DIR}/web.json"
web_status="$(request GET "${WEB_URL}/" "${web_body}")"
assert_status "200" "${web_status}" "web root"

health_body="${TMP_DIR}/health.json"
health_status="$(request GET "${API_BASE_URL}/health" "${health_body}")"
assert_status "200" "${health_status}" "API health"
assert_json_success "${health_body}" "API health"

echo "Basic smoke checks passed"

if [[ "${SMOKE_TEST_MODE}" == "basic" ]]; then
  echo "Deep smoke checks skipped: running in basic mode"
  exit 0
fi

if [[ -z "${SMOKE_TEST_EMAIL}" || -z "${SMOKE_TEST_PASSWORD}" ]]; then
  echo "Deep smoke checks require SMOKE_TEST_EMAIL and SMOKE_TEST_PASSWORD"
  exit 1
fi

echo "==> Deep smoke checks"

login_body="${TMP_DIR}/login.json"
login_payload="$(printf '{"email":"%s","password":"%s"}' "${SMOKE_TEST_EMAIL}" "${SMOKE_TEST_PASSWORD}")"
login_status="$(request POST "${API_BASE_URL}/auth/login" "${login_body}" "${login_payload}")"
assert_status "200" "${login_status}" "auth login"
assert_json_success "${login_body}" "auth login"

token="$(json_field "${login_body}" "data.token")"

me_body="${TMP_DIR}/me.json"
me_status="$(request GET "${API_BASE_URL}/auth/me" "${me_body}" "" -H "Authorization: Bearer ${token}")"
assert_status "200" "${me_status}" "auth me"
assert_json_success "${me_body}" "auth me"

goal_title="staging-smoke-$(date +%s)"
goal_body="${TMP_DIR}/goal-create.json"
goal_payload="$(printf '{"title":"%s","description":"staging smoke test","color":"#90caf9","milestone_titles":["validate auth flow"]}' "${goal_title}")"
goal_status="$(request POST "${API_BASE_URL}/goals" "${goal_body}" "${goal_payload}" -H "Authorization: Bearer ${token}")"
assert_status "200" "${goal_status}" "goal create"
assert_json_success "${goal_body}" "goal create"

goal_id="$(json_field "${goal_body}" "data.id")"

goals_body="${TMP_DIR}/goals-list.json"
goals_status="$(request GET "${API_BASE_URL}/goals" "${goals_body}" "" -H "Authorization: Bearer ${token}")"
assert_status "200" "${goals_status}" "goal list"
assert_json_success "${goals_body}" "goal list"

delete_body="${TMP_DIR}/goal-delete.json"
delete_status="$(request DELETE "${API_BASE_URL}/goals/${goal_id}" "${delete_body}" "" -H "Authorization: Bearer ${token}")"
assert_status "200" "${delete_status}" "goal delete"
assert_json_success "${delete_body}" "goal delete"

echo "Deep smoke checks passed"
