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
      <div className={cx("w-full", className)} role="tablist">
        <div
          className="relative flex flex-nowrap list-none overflow-x-auto"
          style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}>
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
    active: "text-brand-green border-brand-green",
    inactive: "text-brand-green/40 border-transparent",
  },
  secondary: {
    active: "text-brand-on-green border-brand-accent",
    inactive: "text-brand-on-green/50 border-transparent",
  },
};

const TabItem = ({ value, children, schema = "primary" }: TabItemProps) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error("TabItem must be used within a Tabs component");

  const { activeTab, setActiveTab } = context;
  const isActive = activeTab === value;
  const schemaColors = COLOR_SCHEMA[schema];

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      onClick={() => {
        setActiveTab(value);
      }}
      className={cx(
        "px-4 py-3 text-label text-xs min-w-16 min-h-[44px] whitespace-nowrap",
        "cursor-pointer border-b-[3px] text-center focus-brand transition-colors duration-200",
        isActive ? schemaColors.active : schemaColors.inactive
      )}>
      {children}
    </button>
  );
};

interface TabPanelProps
  extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  value: string | number;
  tab: string;
  children: ReactNode;
}

const TabPanel = ({ value, tab, children, ...props }: TabPanelProps) => {
  if (value !== tab) return null;
  return (
    <div role="tabpanel" {...props}>
      {children}
    </div>
  );
};

Tabs.Item = TabItem;
Tabs.Panel = TabPanel;

export default Tabs;
