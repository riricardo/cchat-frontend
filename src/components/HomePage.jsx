import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import MessageBubble from "./MessageBubble";
import { useState } from "react";
import SwipeableTab from "./SwipeableTab";

function TabContent({ children }) {
  return (
    <div className="tab-content bg-base-100 border-base-300 p-6 h-screen">
      {children}
    </div>
  );
}

export default function HomePage() {
  return (
    <SwipeableTab className="h-screen flex">
      <SwipeableTab.Tab
        header={
          <>
            <i className="fa-solid fa-comments mr-2"></i>
            Chat
          </>
        }
      >
        <>
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
        </>
      </SwipeableTab.Tab>

      <SwipeableTab.Tab
        header={
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4 me-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
              />
            </svg>
            Laugh
          </>
        }
      >
        <div>Tab Content</div>
      </SwipeableTab.Tab>

      <SwipeableTab.Tab
        header={
          <>
            <i className="fa-solid fa-gear mr-2"></i>
            Settings
          </>
        }
      >
        <>
          <button className="btn btn-warning" onClick={() => signOut(auth)}>
            Sign Out
          </button>
        </>
      </SwipeableTab.Tab>
    </SwipeableTab>
  );
}
