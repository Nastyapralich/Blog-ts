import React, { FC, useContext } from "react";
import Tab from "./tab/tab";
import classNames from "classnames";

import styles from "./tabsList.module.scss";
import { TabsListType, TabsTypes, Theme } from "../../@types";
import { useThemeContext } from "../../context/theme/context";

type TabsListProps = {
  tabsList: TabsListType;
  activeTab: TabsTypes;
  onTabClick: (tab: TabsTypes) => () => void;
};

const TabsList: FC<TabsListProps> = ({ tabsList, activeTab, onTabClick }) => {

  const {themeValue} = useThemeContext()

  return (
    <div className={classNames(styles.tabsContainer, {[styles.darkTabsContainer] : themeValue === Theme.Dark})}>
      {tabsList.map(({ key, title, disabled }) => (
        <Tab
          key={key}
          title={title}
          onClick={onTabClick(key)} //() => (tab) => setTab(tab)
          active={activeTab === key}
          disabled={disabled}
        />
      ))}
    </div>
  );
};

export default TabsList;