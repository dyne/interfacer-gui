import { useRouter } from "next/router";
import React, { ReactNode, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";

type layoutProps = {
  children: ReactNode;
};

const Layout: React.FunctionComponent<layoutProps> = (layoutProps: layoutProps) => {
  const { authenticated } = useAuth();
  const router = useRouter();

  // Closes sidebar automatically when route changes
  useEffect(() => {
    router.events.on("routeChangeComplete", () => {
      let drawer = document.getElementById("my-drawer");
      if (drawer) {
        (drawer as HTMLInputElement).checked = false;
      }
    });
  }, [router.events]);

  return (
    <>
      {authenticated ? (
        <div className="drawer">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <Topbar />
            <div className="bg-[#F3F3F1] max-w-full">{layoutProps?.children}</div>
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer" className="drawer-overlay" />
            <Sidebar />
          </div>
        </div>
      ) : (
        <div className="bg-[#F3F3F1] ">{layoutProps?.children}</div>
      )}
    </>
  );
};

export default Layout;
