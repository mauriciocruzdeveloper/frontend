'use client';

import { usePathname } from "next/navigation";

export async function AplBreadCrumb() {
  console.log('$$$RENDERIZA AplBreadCrumb');
  const path = usePathname();

  const pathArray = path?.split('/')?.filter((path) => path !== '');
  return (
    <div style={{ margin: "16px 0" }}>
      {pathArray?.map((path) => '/' + path)}
    </div>
  );
}
