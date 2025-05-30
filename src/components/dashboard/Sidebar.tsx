import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import sidebarData from "../data/sidebarData";

interface SidebarProps {
  collapsed: boolean;
  toggled: boolean;
  onBackdropClick: () => void;
}

interface SidebarMenuItem {
  label: string;
  icon?: React.ReactNode;
  children?: SidebarMenuItem[];
  to?: string;
}

const AppSidebar: React.FC<SidebarProps> = ({
  collapsed,
  toggled,
  onBackdropClick,
}) => {
  const location = useLocation();

  const renderMenuItems = (items: SidebarMenuItem[]) =>
    items.map((item) =>
      item.children ? (
        <SubMenu
          key={`submenu-${item.label}`}
          label={item.label}
          icon={item.icon}
        >
          {renderMenuItems(item.children)}
        </SubMenu>
      ) : (
        <MenuItem
          key={item.label}
          icon={item.icon}
          component={item.to ? <Link to={item.to} /> : undefined}
          className={location.pathname === item.to ? "active-menu" : ""}
        >
          {item.label}
        </MenuItem>
      )
    );

  return (
    <Sidebar
      collapsed={collapsed}
      toggled={toggled}
      onBackdropClick={onBackdropClick}
      width="250px"
      collapsedWidth="80px"
      backgroundColor="white"
      transitionDuration={800}
      breakPoint="md"
    >
      <div className="flex items-center justify-center py-6">
        <img
          src={collapsed ? "/Annapurna-logo-small.png" : "/Annapurna-logo.png"}
          alt="Logo"
          className="h-10 cursor-pointer"
        />
      </div>
      <Menu
        renderExpandIcon={({ open }) =>
          open ? <ChevronUp size={16} /> : <ChevronDown size={16} />
        }
      >
        {renderMenuItems(sidebarData)}
      </Menu>
    </Sidebar>
  );
};

export default AppSidebar;
