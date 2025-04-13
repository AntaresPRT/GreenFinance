export interface AppConfig {
    apiUrl: string;
}

let config: AppConfig;

export async function loadConfig() {
    const response = await fetch('/config.json');
    config = await response.json();
}

export function getConfig(): AppConfig {
    if (!config) {
        throw new Error('Config not loaded');
    }
    return config;
}