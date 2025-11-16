import SwipeableTab from "./SwipeableTab";
import SettingsTab, { SettingsTabHeader } from "./SettingsTab";
import AddChatTab, { AddChatTabHeader } from "./AddChatTab";
import ChatTab, { ChatTabHeader } from "./ChatsTab";

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

/* <div className="flex flex-col">
          <label className="input w-full">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </g>
            </svg>
            <input type="search" className="grow" placeholder="Search" />
          </label>
        </div> */
