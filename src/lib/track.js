export function track(eventName, params = {}) {
    // Si mañana meten GA4 / GTM, ya tienen un único lugar para disparar eventos.
    // Evita tener "gtag()" regado por todo el código como migas de pan.
    if (typeof window === "undefined") return;

    if (window.dataLayer && Array.isArray(window.dataLayer)) {
        window.dataLayer.push({ event: eventName, ...params });
        return;
    }

    if (import.meta.env.DEV) {
        // Solo en dev: log amigable
        // eslint-disable-next-line no-console
        console.log(`[track] ${eventName}`, params);
    }
}
