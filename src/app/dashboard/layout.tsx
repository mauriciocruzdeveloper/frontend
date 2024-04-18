import { AplBreadCrumb } from "@/components/apl-breadcrumb/apl-breadcrumb";
import AplNavLinks from "@/components/apl-sider/apl-nav-links";
import AplSideNav from "@/components/apl-sider/apl-sidenav";

export default function AplLayout({ children }: { children: React.ReactNode }) {
  console.log("$$$RENDERIZA AplLayout");

  return (
    <div className="h-screen bg-gray-300 flex flex-col md:flex-row p-2 content-center">
      <div className="p-2">
        <AplSideNav>
          <AplNavLinks />
        </AplSideNav>
      </div>
      <div className="flex flex-col p-2 h-full flex-1 mb-2">
        <header className="bg-white rounded-lg">
          <h1 style={{ margin: "16px" }}>Header</h1>
        </header>
        <div className="flex flex-col flex-1 mb-2">
          <AplBreadCrumb />
          <div className="rounded-lg p-2 bg-white flex-1">
            {children}
          </div>
        </div>
        <footer className="bg-white rounded-lg text-center py-3 align-bottom">
          Apollo ©{new Date().getFullYear()} Created by Argenia
        </footer>
      </div>
    </div>
  );
}
