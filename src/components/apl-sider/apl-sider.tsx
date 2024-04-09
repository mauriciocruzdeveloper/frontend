'use client'

import { PencilIcon } from "@heroicons/react/24/outline";
import { Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import { useRouter } from "next/navigation";
import { useState } from "react";

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('Option 2', '2', <PencilIcon className="w-5" />),
  getItem('Mosos', 'moso', <PencilIcon className="w-5" />),
  getItem('User', 'sub1', <PencilIcon className="w-5" />, [
    getItem('Tom', '3'),
    getItem('Bill', '4'),
    getItem('Alex', '5'),
  ]),
  getItem('Team', 'sub2', <PencilIcon className="w-5" />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
  getItem('Files', '9', <PencilIcon className="w-5" />),
];

export function AplSider() {
  console.log('$$$RENDERIZA AplSider');
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const handleMenuOnClick = (item: MenuItem) => {
    if(!item) return;
    router.push(`/dashboard/${item.key}`);
  }

    return(
    <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          items={items}
          onClick={handleMenuOnClick}
        />
      </Sider>
    );
}