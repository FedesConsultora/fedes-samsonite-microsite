import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const LandingGeneric = lazy(() => import("../pages/LandingGeneric"));
const LandingSamsonite = lazy(() => import("../pages/LandingSamsonite"));

function LoadingFallback() {
    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            color: "#64748b",
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
            fontSize: "14px",
            letterSpacing: "2px",
            textTransform: "uppercase"
        }}>
            Cargando…
        </div>
    );
}

export default function Router() {
    return (
        <BrowserRouter>
            <Suspense fallback={<LoadingFallback />}>
                <Routes>
                    <Route path="/" element={<LandingGeneric />} />
                    <Route path="/samsonite" element={<LandingSamsonite />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}
