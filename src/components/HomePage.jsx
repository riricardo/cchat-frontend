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

/* BUBBLE CHAT
  <div className="flex flex-col h-full">
            <div className="flex flex-col overflow-y-auto">
              <MessageBubble
                profileImageUrl="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                userName="Obi-Wan Kenobi"
                date={new Date(2025, 11, 15, 12, 45, 0, 0)}
                text="You were the Chosen One!"
                isLoggedUser={false}
              />
              <MessageBubble
                profileImageUrl="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
                userName="Anakin"
                date={new Date(2025, 11, 15, 12, 46, 0, 0)}
                text="I hate you!"
                isLoggedUser={true}
              />
              <MessageBubble
                profileImageUrl="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
                userName="Anakin"
                date={new Date(2025, 11, 15, 12, 46, 0, 0)}
                text="I hate you!"
                isLoggedUser={true}
              />
              <MessageBubble
                profileImageUrl="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
                userName="Anakin"
                date={new Date(2025, 11, 15, 12, 46, 0, 0)}
                text="I hate you!"
                isLoggedUser={true}
              />
              <MessageBubble
                profileImageUrl="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
                userName="Anakin"
                date={new Date(2025, 11, 15, 12, 46, 0, 0)}
                text="I hate you!"
                isLoggedUser={true}
              />
              <MessageBubble
                profileImageUrl="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
                userName="Anakin"
                date={new Date(2025, 11, 15, 12, 46, 0, 0)}
                text="I hate you!"
                isLoggedUser={true}
              />
              <MessageBubble
                profileImageUrl="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                userName="Obi-Wan Kenobi"
                date={new Date(2025, 11, 15, 12, 45, 0, 0)}
                text="You were the Chosen One!"
                isLoggedUser={false}
              />{" "}
              <MessageBubble
                profileImageUrl="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                userName="Obi-Wan Kenobi"
                date={new Date(2025, 11, 15, 12, 45, 0, 0)}
                text="You were the Chosen One!"
                isLoggedUser={false}
              />
            </div>
            <MessageInput className="mt-auto" />
          </div> */
