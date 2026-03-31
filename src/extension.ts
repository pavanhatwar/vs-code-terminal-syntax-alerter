import * as vscode from 'vscode';
import { exec } from 'child_process';

let statusBarItem: vscode.StatusBarItem;
let isMuted = false;

export function activate(context: vscode.ExtensionContext) {
    console.log('Terminal Alerter: Monitoring for Errors...');

    // 1. MUTE TOGGLE
    const muteCommand = vscode.commands.registerCommand('madebypapa.toggleMute', () => {
        isMuted = !isMuted;
        updateStatusBarItem();
        vscode.window.showInformationMessage(isMuted ? "Terminal Meow Muted" : "Terminal Meow Active");
    });

    // 2. STATUS BAR UI
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBarItem.command = 'madebypapa.toggleMute';
    context.subscriptions.push(statusBarItem);
    updateStatusBarItem();
    statusBarItem.show();

    // 3. TERMINAL EXIT LISTENER
    // This is the "magic" part for terminal errors
    const terminalListener = vscode.window.onDidEndTerminalShellExecution((event) => {
        if (isMuted) { return; }

        // exitCode !== 0 means the command FAILED (e.g., build error, git error, typo)
        if (event.exitCode !== undefined && event.exitCode !== 0) {
            console.log(`Command Failed: ${event.execution.commandLine} (Code: ${event.exitCode})`);
            playMeow(context);
        }
    });

    context.subscriptions.push(muteCommand, terminalListener);
}

function updateStatusBarItem() {
    if (isMuted) {
        statusBarItem.text = `$(mute) Terminal Silent`;
        statusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.errorBackground');
    } else {
        statusBarItem.text = `$(megaphone) Terminal Meow`;
        statusBarItem.backgroundColor = undefined;
    }
}

function playMeow(context: vscode.ExtensionContext) {
    const soundPath = vscode.Uri.joinPath(context.extensionUri, 'media', 'meow_ghop.wav').fsPath;
    const command = `powershell -c "(New-Object Media.SoundPlayer '${soundPath}').PlaySync()"`;
    
    exec(command, (err) => {
        if (err) {
            console.error('Audio Error:', err);
        }
    });
}

export function deactivate() {}