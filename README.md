# Terminal Meow Alerter 🐱

A VS Code extension that plays a "Meow" sound whenever a terminal command fails (Exit Code != 0).

## Features

- **Audio Alerts**: Hear a meow instantly when a command errors out.
- **Mute Toggle**: Click the "Terminal Meow" button in the Status Bar to silence alerts.
- **DevOps Friendly**: Perfect for monitoring long-running AWS or Argo CD tasks.

## Requirements

- Windows (uses PowerShell `SoundPlayer` to play audio).
- VS Code Shell Integration enabled (default in recent versions).

## Extension Settings

This extension contributes the following commands:

* `madebypapa.toggleMute`: Toggles the audio alert on/off.