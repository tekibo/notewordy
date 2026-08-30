#!/usr/bin/env bash
set -e

# NoteWordy 1-Line Linux Installer
# Usage: curl -fsSL https://raw.githubusercontent.com/tekibo/notewordy/main/scripts/install.sh | bash

REPO="tekibo/notewordy"
TARBALL_NAME="linux-x64-NoteWordy-Setup.tar.gz"
DOWNLOAD_URL="https://github.com/${REPO}/releases/latest/download/${TARBALL_NAME}"

echo "=========================================="
echo "      Installing NoteWordy on Linux       "
echo "=========================================="

# Ensure required commands are available
for cmd in tar mktemp; do
    if ! command -v "$cmd" >/dev/null 2>&1; then
        echo "Error: Required command '$cmd' is not installed."
        exit 1
    fi
done

# Create temporary directory
TMP_DIR=$(mktemp -d /tmp/notewordy-install-XXXXXX)
trap 'rm -rf "$TMP_DIR"' EXIT

echo "--> Downloading latest release..."
if command -v curl >/dev/null 2>&1; then
    curl -fsSL "$DOWNLOAD_URL" -o "${TMP_DIR}/${TARBALL_NAME}"
elif command -v wget >/dev/null 2>&1; then
    wget -q "$DOWNLOAD_URL" -O "${TMP_DIR}/${TARBALL_NAME}"
else
    echo "Error: Neither curl nor wget is available to download files."
    exit 1
fi

echo "--> Extracting installer..."
tar -xzf "${TMP_DIR}/${TARBALL_NAME}" -C "$TMP_DIR"

if [ ! -f "${TMP_DIR}/installer" ]; then
    echo "Error: Installer binary not found in archive."
    exit 1
fi

chmod +x "${TMP_DIR}/installer"

echo "--> Running NoteWordy installer..."
"${TMP_DIR}/installer"

echo ""
echo "=========================================="
echo " NoteWordy was installed successfully!"
echo " Launch it from your application menu."
echo "=========================================="
