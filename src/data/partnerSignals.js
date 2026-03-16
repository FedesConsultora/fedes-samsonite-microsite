const commercial = "/assets/signals/commercial.webp";
const digital = "/assets/signals/digital.webp";
const financial = "/assets/signals/financial.webp";
const identity = "/assets/signals/identity.webp";
const market = "/assets/signals/market.webp";
const org = "/assets/signals/org.webp";
const product = "/assets/signals/product.webp";

export const partnerSignals = [
    {
        title: "Incrementalidad real", title_en: "Real Incrementality",
        desc: "Diferenciar lo atribuible de lo verdaderamente incremental. Experimentos, medición de lift y decisiones basadas en evidencia.", desc_en: "Not just attribution: incremental. Experiments and lift logic.",
        image: digital
    },
    {
        title: "Revenue incremental", title_en: "Incremental Revenue",
        desc: "Crecimiento rentable, no sólo “mejores métricas”.", desc_en: "Profitable growth, not just 'better metrics'.",
        image: financial
    },
    {
        title: "Curvas marginales", title_en: "Marginal Curves",
        desc: "Identificar saturación y redistribuir presupuesto con respaldo analítico.", desc_en: "Detect saturation and reallocate budget with evidence.",
        image: market
    },
    {
        title: "POAS", title_en: "POAS",
        desc: "Profit on Ad Spend: evaluar la inversión considerando contribución real, fees, devoluciones y estructura de costos.", desc_en: "Profit on Ad Spend: contribution, fees, returns, reality.",
        image: product
    },
    {
        title: "MMM continuo", title_en: "Continuous MMM",
        desc: "Un modelo vivo: calibración permanente y aprendizaje constante, no un proyecto aislado.", desc_en: "Dynamic model: continuous recalibration and learning, not a one-off project.",
        image: commercial
    }
];
