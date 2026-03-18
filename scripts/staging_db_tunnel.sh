#!/usr/bin/env bash

set -euo pipefail

ACTION="${1:-}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
CONFIG_FILE="${STAGING_DB_TUNNEL_CONFIG:-${REPO_ROOT}/.staging-db-tunnel.local}"

if [[ -f "${CONFIG_FILE}" ]]; then
  # shellcheck disable=SC1090
  source "${CONFIG_FILE}"
fi

BASTION_HOST="${STAGING_DB_BASTION_HOST:-}"
DB_HOST="${STAGING_DB_HOST:-}"
DB_PORT="${STAGING_DB_PORT:-3306}"
LOCAL_PORT="${STAGING_DB_LOCAL_PORT:-13306}"
CONTROL_SOCKET="${STAGING_DB_CONTROL_SOCKET:-/tmp/starthere-staging-db-tunnel.sock}"

usage() {
  cat <<EOF
Usage: $0 <open|close|status>

Defaults:
  bastion host : ${BASTION_HOST}
  db host      : ${DB_HOST}
  db port      : ${DB_PORT}
  local port   : ${LOCAL_PORT}
  control sock : ${CONTROL_SOCKET}

Configuration:
  1. Copy .staging-db-tunnel.example to .staging-db-tunnel.local
  2. Fill in STAGING_DB_BASTION_HOST and STAGING_DB_HOST
  3. Or export env vars before running this script
EOF
}

require_ssh() {
  if ! command -v ssh >/dev/null 2>&1; then
    echo "ssh is required"
    exit 1
  fi
}

require_config() {
  if [[ -z "${BASTION_HOST}" || -z "${DB_HOST}" ]]; then
    echo "STAGING_DB_BASTION_HOST and STAGING_DB_HOST are required"
    echo "Create ${CONFIG_FILE} from .staging-db-tunnel.example or export the env vars before running."
    exit 1
  fi
}

is_open() {
  ssh -S "${CONTROL_SOCKET}" -O check "${BASTION_HOST}" >/dev/null 2>&1
}

open_tunnel() {
  if is_open; then
    echo "Staging DB tunnel is already open on 127.0.0.1:${LOCAL_PORT}"
    exit 0
  fi

  ssh -fnNT \
    -M \
    -S "${CONTROL_SOCKET}" \
    -L "${LOCAL_PORT}:${DB_HOST}:${DB_PORT}" \
    "${BASTION_HOST}"

  echo "Opened staging DB tunnel"
  echo "  local endpoint : 127.0.0.1:${LOCAL_PORT}"
  echo "  remote target  : ${DB_HOST}:${DB_PORT} via ${BASTION_HOST}"
}

close_tunnel() {
  if ! is_open; then
    echo "Staging DB tunnel is not open"
    exit 0
  fi

  ssh -S "${CONTROL_SOCKET}" -O exit "${BASTION_HOST}" >/dev/null
  echo "Closed staging DB tunnel"
}

status_tunnel() {
  if is_open; then
    echo "Staging DB tunnel is open"
    echo "  local endpoint : 127.0.0.1:${LOCAL_PORT}"
    echo "  remote target  : ${DB_HOST}:${DB_PORT} via ${BASTION_HOST}"
  else
    echo "Staging DB tunnel is closed"
    exit 1
  fi
}

require_ssh
require_config

case "${ACTION}" in
  open)
    open_tunnel
    ;;
  close)
    close_tunnel
    ;;
  status)
    status_tunnel
    ;;
  *)
    usage
    exit 1
    ;;
esac
