import { ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface TabItem {
  value: string;
  label: string;
  content: ReactNode;
}

interface TabComponentProps {
  tabs: TabItem[];
  defaultValue?: string;
  activeTab: string;
  onTabChange: (value: string) => void;
  className?: string;
}

export function TabComponent({ 
  tabs, 
  activeTab, 
  onTabChange, 
  className = "" 
}: TabComponentProps) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className={`w-full ${className}`}>
      <TabsList className="grid w-full max-w-sm md:max-w-md" style={{ gridTemplateColumns: `repeat(${tabs.length}, 1fr)` }}>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} className="text-xs md:text-sm px-2 md:px-4">
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="space-y-4 md:space-y-6">
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
}