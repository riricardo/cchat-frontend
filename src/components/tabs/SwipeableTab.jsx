import { useSwipeable } from "react-swipeable";
import React, { useState } from "react";

export default function SwipeableTab({ children, className = "" }) {
  const tabs = React.Children.toArray(children);
  const [index, setIndex] = useState(0);

  const handlers = useSwipeable({
    onSwipedLeft: () => setIndex((i) => Math.min(i + 1, tabs.length - 1)),
    onSwipedRight: () => setIndex((i) => Math.max(i - 1, 0)),
    trackMouse: true,
  });

  return (
    <div className={className}>
      <div {...handlers} className="tabs tabs-lift w-full">
        {tabs.map((tab, i) => (
          <React.Fragment key={i}>
            {/* Header */}
            <div
              className={`tab ${i === index ? "tab-active" : ""}`}
              onClick={() => setIndex(i)}
            >
              {tab.props.header}
            </div>

            {/* Content */}
            <div
              className={`tab-content bg-base-100 border-base-300 w-full ${
                i === index ? "" : "hidden"
              }`}
            >
              {tab.props.children}
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

SwipeableTab.Tab = function Tab({ children }) {
  return <>{children}</>;
};
