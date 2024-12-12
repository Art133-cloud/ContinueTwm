"use client"
import { useState } from "react";
import styles from "./Notifications.module.scss";
import Image from "next/image";
import FirstUser from "../../../public/assets/png/firstUserRequest.png";

export default function NotificationsBlock() {
  interface ItemProps {
    id: number;
    icon: string;
    avatar: JSX.Element;
    background: string;
    text: string;
    isSelected?: boolean;
    isUnread?: boolean;
    isBlocked?: boolean;
  }

  let currentId = 0;

  const generateItems = (items: Omit<ItemProps, "id" | "isUnread" | "isBlocked">[]): ItemProps[] => {
    return items.map((item) => ({
      ...item,
      id: ++currentId,
      isUnread: true,
      isBlocked: false,
    }));
  };

  const initialItems = generateItems([
        {
      icon: styles.onlineIcon,
      avatar: (
        <Image src={FirstUser.src} alt="FirstUser" width={35} height={35} />
      ),
      background: "#e8f1fa",
      text: "Hurin Seary",
    },
    {
      icon: styles.onlineIcon,
      avatar: (
        <Image src={FirstUser.src} alt="FirstUser" width={35} height={35} />
      ),
      background: "#fff",
      text: "Victor Exrixon",
    },
    {
      icon: styles.onlineIcon,
      avatar: (
        <Image src={FirstUser.src} alt="FirstUser" width={35} height={35} />
      ),
      background: "#fff",
      text: "Victor Exrixon",
    },
    {
      icon: styles.onlineIcon,
      avatar: (
        <Image src={FirstUser.src} alt="FirstUser" width={35} height={35} />
      ),
      background: "#fff",
      text: "Victor Exrixon",
    },
    {
      icon: styles.onlineIcon,
      avatar: (
        <Image src={FirstUser.src} alt="FirstUser" width={35} height={35} />
      ),
      background: "#fff",
      text: "Victor Exrixon",
    },
    {
      icon: styles.onlineIcon,
      avatar: (
        <Image src={FirstUser.src} alt="FirstUser" width={35} height={35} />
      ),
      background: "#fff",
      text: "Victor Exrixon",
    },
    {
      icon: styles.onlineIcon,
      avatar: (
        <Image src={FirstUser.src} alt="FirstUser" width={35} height={35} />
      ),
      background: "#fff",
      text: "Victor Exrixon",
    },
    {
      icon: styles.onlineIcon,
      avatar: (
        <Image src={FirstUser.src} alt="FirstUser" width={35} height={35} />
      ),
      background: "#fff",
      text: "Victor Exrixon",
    },
    {
      icon: styles.blackIcon,
      avatar: (
        <Image src={FirstUser.src} alt="FirstUser" width={35} height={35} />
      ),
      background: "#fff",
      text: "Victor Exrixon",
    },
    {
      icon: styles.oflineIcon,
      avatar: (
        <div className={styles.avatarWithSymbol}        >
          <p>V</p>
        </div>
      ),
      background: "#fff",
      text: "Victor Exrixon",
    },
    {
      icon: styles.onlineIcon,
      avatar: (
        <Image src={FirstUser.src} alt="FirstUser" width={35} height={35} />
      ),
      background: "#fff",
      text: "Victor Exrixon",
    },
    {
      icon: styles.onlineIcon,
      avatar: (
        <Image src={FirstUser.src} alt="FirstUser" width={35} height={35} />
      ),
      background: "#fff",
      text: "Victor Exrixon",
    },
    {
      icon: styles.onlineIcon,
      avatar: (
        <Image src={FirstUser.src} alt="FirstUser" width={35} height={35} />
      ),
      background: "#fff",
      text: "Victor Exrixon",
    },
    {
      icon: styles.onlineIcon,
      avatar: (
        <Image src={FirstUser.src} alt="FirstUser" width={35} height={35} />
      ),
      background: "#fff",
      text: "Victor Exrixon",
    },
    {
      icon: styles.onlineIcon,
      avatar: (
        <div className={styles.avatarWithSymbol}        >
          <p>V</p>
        </div>
      ),
      background: "#fff",
      text: "Victor Exrixon",
    },
    {
      icon: styles.onlineIcon,
      avatar: (
        <Image src={FirstUser.src} alt="FirstUser" width={35} height={35} />
      ),
      background: "#fff",
      text: "Victor Exrixon",
    },
    {
      icon: styles.onlineIcon,
      avatar: (
        <div className={styles.avatarWithSymbol}        >
          <p>V</p>
        </div>
      ),
      background: "#fff",
      text: "Victor Exrixon",
    },
  ]);

  const [items, setItems] = useState(initialItems);

  const resetSelection = () => {
    setItems((prevItems) =>
      prevItems.map((item) => ({ ...item, isSelected: false }))
    );
  };

  const toggleSelect = (id: number) => {
    setItems((prevItems) => {
      const selectedItem = prevItems.find((item) => item.id === id);
      if (selectedItem) {
        return prevItems.map((item) =>
          item.id === id
            ? { ...item, isSelected: !item.isSelected }
            : { ...item, isSelected: false }
        );
      }
      return prevItems;
    });
  };

  const toggleUnread = () => {
    setItems((prevItems) => {
      const selectedItem = prevItems.find((item) => item.isSelected);
      if (selectedItem && !selectedItem.isBlocked) {
        return prevItems.map((item) =>
          item.id === selectedItem.id
            ? { ...item, isUnread: !item.isUnread }
            : item
        );
      }
      return prevItems;
    });
  };

  const toggleBlock = () => {
    setItems((prevItems) => {
      const selectedItem = prevItems.find((item) => item.isSelected);
      if (selectedItem) {
        return prevItems.map((item) =>
          item.id === selectedItem.id
            ? { ...item, isBlocked: !item.isBlocked }
            : item
        );
      }
      return prevItems;
    });
  };

  const removeSelected = () => {
    setItems((prevItems) => prevItems.filter((item) => !item.isSelected));
  };

  const hasSelectedItems = items.some((item) => item.isSelected);

  return (
    <div className={styles.parentNotificationsBlock}>
      {hasSelectedItems && (
        <div className={styles.topActions}>
          <button onClick={removeSelected} className={styles.deleteButton}>
            Удалить
          </button>
          {items.some((item) => item.isSelected && !item.isBlocked) && (
            <button onClick={toggleUnread} className={styles.unreadButton}>
              {items.some((item) => item.isSelected && item.isUnread)
                ? "Отметить как прочитанное"
                : "Отметить как непрочитанное"}
            </button>
          )}
          <button onClick={toggleBlock} className={styles.blockButton}>
            {items.some((item) => item.isSelected && item.isBlocked)
              ? "Разблокировать"
              : "Заблокировать"}
          </button>
        </div>
      )}
      <div
        className={styles.contentNotificationsBlock}
        style={{
          maxHeight: hasSelectedItems ? "676px" : "776px", // Change max-height based on selection
        }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            className={`${styles.itemNotification} ${
              item.isSelected ? styles.selected : ""
            } ${item.isUnread ? styles.unread : ""} ${
              item.isBlocked ? styles.blocked : ""
            }`}
            style={{ background: item.background }}
          >
            <div className={styles.firstBlockNotifications}>
              <div
                className={styles.checkBox}
                onClick={() => toggleSelect(item.id)}
                style={{
                  pointerEvents: item.isBlocked ? "auto" : "auto",
                }}
              >
                {item.isSelected && <div className={styles.checkMark}></div>}
              </div>
              <div className={item.icon}></div>
              {item.avatar}
              <h4>{item.text}</h4>
            </div>
            <div className={styles.secondBlockNotifications}>
              <h2>Mobile Apps Redesign</h2>
              <p>
                Hey Cak, Could you free now? Can you look and read the brief first
                before...
              </p>
            </div>
            <div className={styles.thirdBlockNotifications}>
              <p>12:48PM</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
