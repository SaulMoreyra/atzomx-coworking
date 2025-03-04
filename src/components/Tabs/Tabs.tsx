import React, { createContext, useContext, type ReactNode } from "react";
import cx from "classnames";

interface TabsContextType {
  activeTab: string | number;
  setActiveTab: (id: string | number) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

interface TabsProps {
  children: ReactNode;
  tab: string | number;
  onChange: (id: string | number) => void;
  className?: string;
}

const Tabs = ({ children, tab, onChange, className }: TabsProps) => {
  return (
    <TabsContext.Provider value={{ activeTab: tab, setActiveTab: onChange }}>
      <div className={cx("w-full", className)}>
        <div
          className="relative flex flex-nowrap list-none overflow-x-scroll"
          style={{
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
          }}>
          {children}
        </div>
      </div>
    </TabsContext.Provider>
  );
};

interface TabItemProps {
  value: string | number;
  children: ReactNode;
  schema?: "primary" | "secondary";
}

const COLOR_SCHEMA = {
  primary: {
    active: "text-primary-main border-primary-main",
    inactive: "text-gray-400 border-white",
  },
  secondary: {
    active: "text-white border-white",
    inactive: "text-gray-300 border-primary-main",
  },
};

const TabItem = ({ value, children, schema = "primary" }: TabItemProps) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error("TabItem must be used within a Tabs component");

  const { activeTab, setActiveTab } = context;
  const isActive = activeTab === value;
  const schemaColors = COLOR_SCHEMA[schema];

  return (
    <div
      onClick={() => {
        setActiveTab(value);
      }}
      className={cx(
        "px-4 py-2 text-sm min-w-16 break-keep whitespace-nowrap",
        "cursor-pointer border-b-4 text-center",
        isActive ? schemaColors.active : schemaColors.inactive
      )}>
      {children}
    </div>
  );
};

interface TabPanelProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  value: string | number;
  tab: string;
  children: ReactNode;
}

const TabPanel = ({ value, tab, children, ...props }: TabPanelProps) => {
  if (value !== tab) return null;
  return (
    <div className="font-light" {...props}>
      {children}
    </div>
  );
};

Tabs.Item = TabItem;
Tabs.Panel = TabPanel;

export default Tabs;
