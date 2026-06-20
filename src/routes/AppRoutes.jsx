import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import { AccordionPage } from "../pages/AccordionPage";
import { ModalPage } from "../pages/ModalPage";
import { TabsPage } from "../pages/TabsPage";
import { ToastPage } from "../pages/ToastPage";
import { OtpPage } from "../pages/OtpPage";
import { MultiselectPage } from "../pages/MultiselectPage";

const Layout = () => {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <main className="mx-auto w-full">
        <Outlet />
      </main>
    </div>
  );
};

const HomePage = () => (
  <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
    <h2 className="text-2xl font-semibold text-slate-900">Welcome</h2>
    <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
      Use the navigation links above to switch between the accordion demo and the modal demo. This layout uses React Router with an Outlet so child views render inside the shared page shell.
    </p>
  </section>
);

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="accordion" element={<AccordionPage />} />
          <Route path="modal" element={<ModalPage />} />
          <Route path="tabs" element={<TabsPage/>} />
          <Route path="toast" element={<ToastPage/>} />
          <Route path="otp" element={<OtpPage/>} />
          <Route path="multi-select" element={<MultiselectPage/>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
