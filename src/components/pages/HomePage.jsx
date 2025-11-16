import SwipeableTab from "../tabs/SwipeableTab";
import SettingsTab, { SettingsTabHeader } from "../tabs/SettingsTab";
import AddChatTab, { AddChatTabHeader } from "../tabs/AddChatTab";
import ChatTab, { ChatTabHeader } from "../tabs/ChatsTab";

export default function HomePage() {
  return (
    <SwipeableTab className="h-screen flex">
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
