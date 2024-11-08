import "./assets/styles/global.sass"

import React from "react";
import { createRoot } from "react-dom/client"

import { Provider } from "react-redux"
import { store } from "./store/store"

import { PrimeReactProvider } from "primereact/api";

import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";

import { MapLayout } from "./components/pages/MapLayout"
import { ErrorPage } from "./components/pages/ErrorPage";
import { SkyrimPage } from "./components/pages/SkyrimPage";
import { SolstheimPage } from "./components/pages/SolstheimPage";
import { SoulcairnPage } from "./components/pages/SoulcairnPage";
import { BlackreachPage } from "./components/pages/BlackreachPage";
import { SkuldafnPage } from "./components/pages/SkuldafnPage";
import { ForgottenvalePage } from "./components/pages/ForgottenvalePage";

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  //<React.StrictMode>
  <Provider store={store}>
    <PrimeReactProvider value={{ unstyled: false, ripple: true }}>
      <BrowserRouter>
        <Routes>
          <Route path="rfab-map/" element={<MapLayout />}>
            <Route index element={<SkyrimPage />} />
            <Route path="skyrim/" element={<SkyrimPage />} />
            <Route path="solstheim/" element={<SolstheimPage />} />
            <Route path="blackreach/" element={<BlackreachPage />} />
            <Route path="forgottenvale/" element={<ForgottenvalePage />} />
            <Route path="soulcairn/" element={<SoulcairnPage />} />
            <Route path="skuldafn/" element={<SkuldafnPage />} />
          </Route>

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </PrimeReactProvider>
  </Provider>
  //</React.StrictMode>
)