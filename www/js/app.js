import { Capacitor } from '@capacitor/core';

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    console.log('App initialized');
    updateStatus('App initialized');
    
    // Check if running on native platform
    if (Capacitor.isNativePlatform()) {
        updateStatus('Running on native platform: ' + Capacitor.getPlatform());
        initializeLlamaCpp();
    } else {
        updateStatus('Running in web browser');
    }
});

// Initialize LlamaCpp plugin
async function initializeLlamaCpp() {
    try {
        // Dynamically import the plugin only when on native platform
        const { LlamaCpp } = await import('llama-cpp-capacitor');
        window.LlamaCpp = LlamaCpp;
        updateStatus('LlamaCpp plugin loaded successfully');
    } catch (error) {
        console.error('Failed to load LlamaCpp plugin:', error);
        updateStatus('Error loading LlamaCpp plugin: ' + error.message);
    }
}

// Button event handlers
document.getElementById('loadModel')?.addEventListener('click', async () => {
    updateStatus('Loading model...');
    appendOutput('Attempting to load LLaMA model...');
    
    try {
        if (window.LlamaCpp) {
            // Example model loading - adjust based on actual plugin API
            const result = await window.LlamaCpp.loadModel({
                modelPath: '/sdcard/Download/model.gguf', // Adjust path as needed
                contextSize: 2048,
                threads: 4
            });
            appendOutput('Model loaded: ' + JSON.stringify(result, null, 2));
            updateStatus('Model loaded successfully');
        } else {
            appendOutput('LlamaCpp plugin not available');
            updateStatus('Plugin not available');
        }
    } catch (error) {
        appendOutput('Error loading model: ' + error.message);
        updateStatus('Error: ' + error.message);
    }
});

document.getElementById('testInference')?.addEventListener('click', async () => {
    updateStatus('Running inference...');
    appendOutput('Starting inference test...');
    
    try {
        if (window.LlamaCpp) {
            // Example inference - adjust based on actual plugin API
            const result = await window.LlamaCpp.generate({
                prompt: "Hello, world! The capital of France is",
                maxTokens: 50,
                temperature: 0.7
            });
            appendOutput('Inference result: ' + JSON.stringify(result, null, 2));
            updateStatus('Inference completed');
        } else {
            appendOutput('LlamaCpp plugin not available');
            updateStatus('Plugin not available');
        }
    } catch (error) {
        appendOutput('Error during inference: ' + error.message);
        updateStatus('Error: ' + error.message);
    }
});

document.getElementById('clearOutput')?.addEventListener('click', () => {
    document.getElementById('output').textContent = 'Output cleared';
    updateStatus('Output cleared');
});

// Helper functions
function updateStatus(message) {
    const statusEl = document.getElementById('status');
    if (statusEl) {
        statusEl.textContent = `Status: ${message}`;
    }
}

function appendOutput(message) {
    const outputEl = document.getElementById('output');
    if (outputEl) {
        outputEl.textContent += `\n${new Date().toLocaleTimeString()}: ${message}`;
    }
}