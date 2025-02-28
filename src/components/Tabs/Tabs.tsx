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
  className?: string;
  activeClassName?: string;
}

const TabItem = ({
  value,
  children,
  activeClassName,
  className,
}: TabItemProps) => {
  const context = useContext(TabsContext);
  if (!context) throw new Error("TabItem must be used within a Tabs component");

  const { activeTab, setActiveTab } = context;
  const isActive = activeTab === value;

  return (
    <div
      onClick={() => {
        setActiveTab(value);
      }}
      className={cx(
        "px-4 py-2 text-sm transition-all ease-in-out min-w-16 break-keep whitespace-nowrap",
        "cursor-pointer border-b-4 border-transparent text-gray-400 text-center",
        { "border-b-4 border-primary-main text-primary-main": isActive },
        ...(className ? [className] : []),
        ...(isActive && activeClassName ? [activeClassName] : [])
      )}>
      {children}
    </div>
  );
};

interface TabPanelProps {
  value: string | number;
  tab: string;
  children: ReactNode;
}

const TabPanel = ({ value, tab, children }: TabPanelProps) => {
  if (value !== tab) return null;
  return <div className="font-light">{children}</div>;
};

Tabs.Item = TabItem;
Tabs.Panel = TabPanel;

export default Tabs;
