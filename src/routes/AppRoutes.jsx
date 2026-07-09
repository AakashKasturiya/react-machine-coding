import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { AccordionPage } from "../pages/AccordionPage";
import { ModalPage } from "../pages/ModalPage";
import { TabsPage } from "../pages/TabsPage";
import { ToastPage } from "../pages/ToastPage";
import { OtpPage } from "../pages/OtpPage";
import { MultiselectPage } from "../pages/MultiselectPage";
import { InfiniteScrollPage } from "../pages/InfiniteScrollPage";
import { AutoCompleteSearch } from "../components/AutocompleteSearch/AutocompleteSearchComponent";
import { DataTableComponent } from "../pages/DataTableComponent";

const Layout = () => {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <main className="mx-auto w-full">
        <Outlet />
      </main>
    </div>
  );
};

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
          <Route path="infinite-scroll" element={<InfiniteScrollPage/>} />
          <Route path="autocomplete-search" element={<AutoCompleteSearch/>}/>
          <Route path="data-table-component" element={<DataTableComponent/>} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
