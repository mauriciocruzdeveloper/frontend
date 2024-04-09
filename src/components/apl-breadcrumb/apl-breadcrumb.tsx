import { headers } from "next/headers";

export async function AplBreadCrumb() {
  console.log('$$$RENDERIZA AplBreadCrumb');
  const headersList = headers();
  const domain = headersList.get('host') || "";
  const fullUrl = headersList.get('referer') || "";

  const pathArray = fullUrl?.split('/').slice(3);

  console.log('!!!pathArray', pathArray)
  console.log('!domain', domain);
  console.log('!!!fullUrl', fullUrl);
  console.log('!!!headersList', headersList.get(''));

  return (
    <div style={{ margin: "16px 0" }}>
      {pathArray?.map((path) => '/' + path)}
    </div>
  );
}
