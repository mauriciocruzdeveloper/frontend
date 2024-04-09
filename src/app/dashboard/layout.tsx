import { AplBreadCrumb } from "@/components/apl-breadcrumb/apl-breadcrumb";
import { AplSider } from "@/components/apl-sider/apl-sider";
import { Layout} from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";



export default function AplLayout({ children }: { children: React.ReactNode }) {
  console.log('$$$RENDERIZA AplLayout');

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <AplSider />
      <Layout>
        <Header style={{ padding: 0, background: 'white' }} />
        <Content style={{ margin: '0 16px' }}>
          <AplBreadCrumb />
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: 'white',
              borderRadius: 5,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Apollo ©{new Date().getFullYear()} Created by Argenia
        </Footer>
      </Layout>
    </Layout>
  );
}
