import { defineConfig } from "cypress";

export default defineConfig({
    e2e: {
        baseUrl: 'http://localhost:3000',
        viewportWidth: 1280,
        viewportHeight: 720,
        video: false,
        screenshotOnRunFailure: true,
        setupNodeEvents(on, config) {
            // e2e tesztelési események konfigurációja
            return config;
        },
    },
});
