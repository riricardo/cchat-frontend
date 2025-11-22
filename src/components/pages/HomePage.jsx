import SwipeableTab from "../tabs/SwipeableTab";
import SettingsTab, { SettingsTabHeader } from "../tabs/SettingsTab";
import AddChatTab, { AddChatTabHeader } from "../tabs/AddChatTab";
import ChatTab, { ChatTabHeader } from "../tabs/ChatsTab";
import { useTabContext } from "../context/TabProvider";

export default function HomePage() {
  const { index, setIndex } = useTabContext();

  return (
    <SwipeableTab className="h-screen flex" index={index} setIndex={setIndex}>
      <SwipeableTab.Tab header={<ChatTabHeader />}>
        <ChatTab />
      </SwipeableTab.Tab>

      <SwipeableTab.Tab header={<AddChatTabHeader />}>
        <AddChatTab />
      </SwipeableTab.Tab>

      <SwipeableTab.Tab header={<SettingsTabHeader />}>
        <SettingsTab />
      </SwipeableTab.Tab>
    </SwipeableTab>
  );
}
