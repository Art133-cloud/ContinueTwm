"use client";
import { useState, useEffect } from "react";
import styles from "./HamburgerAccount.module.scss";
import Link from "next/link";
import Image from "next/image";
import MyFavoriteOrganizations from "../../../public/assets/svg/MyFavoriteOrganizations";
import Posts from "../../../public/assets/svg/Posts";
import AccountHeadImage from "../../../public/assets/png/accountHeadImage.png";
import ContactIcon from "../../../public/assets/svg/ContactIcon";
import NotificationIcon from "../../../public/assets/svg/NotificationIcon";
import MessagesIcon from "../../../public/assets/svg/MessagesIcon";
import SettingsIcon from "../../../public/assets/svg/SettingsIcon";
import FavoritesIcon from "../../../public/assets/svg/FavoritesIcon";
import FriendRequestIcon from "../../../public/assets/svg/FriendRequestIcon";
import User from "../../../public/assets/png/firstUserRequest.png";
import BasicConfirmButton from "../basic/basicConfirmButton/BasicConfirmButton";
import BasicDeleteButton from "../basic/basicDeleteButton/BasicDeleteButton";
interface Users {
  image: string;
  alt: string;
  userName: string;
  icon: JSX.Element;
}

interface Pages {
  groupText: string;
  userName: string;
  className: string;
  icon: JSX.Element;
}

interface Groups {
  groupText: string;
  userName: string;
  className: string;
  icon: JSX.Element;
}

const users: Users[] = [
  {
    image: User.src,
    alt: "User",
    userName: "Hurin Seary",
    icon: (
      <div className={styles.iconOnline}>
      </div>
    ),
  },
];

const pages: Pages[] = [
  {
    groupText: "UD",
    userName: "Armany Seary",
    className: styles.firstGroup,
    icon: <div className={styles.iconOnline}></div>,
  },
];

const groups: Groups[] = [
  {
    groupText: "UD",
    userName: "Studio Express",
    className: styles.firstGroup,
    icon: (
      <div className={styles.lastOnline}>
        <p>2 min</p>
      </div>
    ),
  },
];

const LinksHead: { href: string; icon: JSX.Element; text: string; isContacts?: Boolean; isFavorites?: Boolean; isFriendRequest?: Boolean }[] = [
  { href: "/notifications", icon: <NotificationIcon />, text: "Notifications" },
  { href: "/account", icon: <MessagesIcon />, text: "Messages" },
  { href: "/account", icon: <SettingsIcon />, text: "Settings" },
  { href: "/account", icon: <ContactIcon />, text: "Contacts", isContacts: true },
  { href: "/account", icon: <FavoritesIcon />, text: "Favorites", isFavorites: true },
  { href: "/account", icon: <FriendRequestIcon />, text: "Friend Request", isFriendRequest: true },
];

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isContactsOpen, setIsContactsOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isFriendRequestOpen, setIsFriendRequestOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState<"users" | "pages" | "groups">("users");

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    if (isOpen) {
      window.scrollTo(0, 0);
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const toggleContacts = () => setIsContactsOpen((prev) => !prev);
  const closeContacts = () => setIsContactsOpen(false);
  const toggleFavorites = () => setIsFavoritesOpen((prev) => !prev);
  const closeFavorites = () => setIsFavoritesOpen(false);
  const toggleFriendRequest = () => setIsFriendRequestOpen((prev) => !prev);
  const closeFriendRequest = () => setIsFriendRequestOpen(false);

  const switchSection = (section: "users" | "pages" | "groups") => setCurrentSection(section);

  const getCurrentData = () => {
    switch (currentSection) {
      case "pages":
        return pages;
      case "groups":
        return groups;
      default:
        return users;
    }
  };

  const btns: { click: () => void; text: string }[] = [
    { click: () => switchSection("users"), text: " Users" },
    { click: () => switchSection("groups"), text: "Groups" },
    { click: () => switchSection("pages"), text: "Pages" },
  ];

  const itemFavorite: { icon: JSX.Element; text: string }[] = [
    { icon: <MyFavoriteOrganizations />, text: "My favorite Organizations" },
    { icon: <Posts />, text: "My Posts" },
  ];
  interface FriendRequest {
    author: string,
    alt: string,
    authorName: string,
    when: string
  }
  const itemFriendRequest: FriendRequest[] = [
    {
      author: User.src,
      alt: "User",
      authorName: "Anthony Daugloi",
      when: "12 mutual friends"
    },
    {
      author: User.src,
      alt: "User",
      authorName: "Anthony Daugloi",
      when: "12 mutual friends"
    },
    {
      author: User.src,
      alt: "User",
      authorName: "Anthony Daugloi",
      when: "12 mutual friends"
    },
    {
      author: User.src,
      alt: "User",
      authorName: "Anthony Daugloi",
      when: "12 mutual friends"
    },
    {
      author: User.src,
      alt: "User",
      authorName: "Anthony Daugloi",
      when: "12 mutual friends"
    },
    {
      author: User.src,
      alt: "User",
      authorName: "Anthony Daugloi",
      when: "12 mutual friends"
    },
    {
      author: User.src,
      alt: "User",
      authorName: "Anthony Daugloi",
      when: "12 mutual friends"
    },
  ]
  return (
    <div style={{ position: "relative" }}>
      <button className={`${styles.hamburgerButton} ${isOpen ? styles.open : ""}`} onClick={() => setIsOpen((prev) => !prev)}>
        {Array.from({ length: 3 }).map((_, i) => (
          <span key={i} className={styles.hamburgerLine}></span>
        ))}
      </button>
      <div className={`${styles.menu} ${isOpen ? styles.open : ""}`}>
        <ul className={styles.ul}>
          {LinksHead.map(({ href, icon, text, isContacts, isFavorites, isFriendRequest }, index) => (
            <li
              key={index}
              onClick={
                isContacts
                  ? toggleContacts
                  : isFavorites
                  ? toggleFavorites
                  : isFriendRequest
                  ? toggleFriendRequest
                  : undefined
              }
            >
              <Link href={href}>
                {icon}
                <p>{text}</p>
              </Link>
            </li>
          ))}

          {isContactsOpen && (
            <div className={styles.contactsList}>
              <button className={styles.closeButton} onClick={closeContacts}>
                <p>X</p>
              </button>
              <div className={styles.sectionButtons}>
                {btns.map((item, index) => (
                  <button key={index} onClick={item.click}>
                    <p>{item.text}</p>
                  </button>
                ))}
              </div>
              <div className={styles.users}>
                {getCurrentData().map((item, index) => {
                  if ('image' in item) {
                    return (
                      <div className={styles.contact} key={index}>
                        <div className={styles.userAndName}>
                          <Image src={item.image} alt={item.alt} width={35} height={35} />
                          <h4>{item.userName}</h4>
                        </div>
                        {item.icon}
                      </div>
                    );
                  } else {
                    return (
                      <div className={styles.contact} key={index}>
                        <div className={styles.userAndName}>
                          <div className={`${styles.groupAvatar} ${item.className}`}>
                            <p>{item.groupText}</p>
                          </div>
                          <h4>{item.userName}</h4>
                        </div>
                        {item.icon}
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          )}

          {isFavoritesOpen && (
            <div className={styles.favoritesList}>
              <button className={styles.closeButton} onClick={closeFavorites}>
                <p>X</p>
              </button>
              <div className={styles.itemsFavoritesList}>
                {itemFavorite.map((item, index) => (
                  <div key={index} className={styles.itemFavorite}>
                    {item.icon}
                    <h4>{item.text}</h4>
                  </div>
                ))}
              </div>
            </div>
          )}

          {isFriendRequestOpen && (
            <div className={styles.friendRequestList}>
              <button className={styles.closeButton} onClick={closeFriendRequest}>
                <p>X</p>
              </button>
              <div className={styles.itemsFriendRequest}>
                {itemFriendRequest.map((item: any,index: number) => {
                  return (
                    <div className={styles.itemFriendRequest} key={index}>
                      <div className={styles.topItem}>
                        <Image 
                          src={item.author}
                          alt={item.alt}
                          width={35}
                          height={35}
                        />
                        <div className={styles.userNameAndWhen}>
                            <h3>{item.authorName}</h3>
                            <p>{item.when}</p>
                        </div>
                      </div>
                      <div className={styles.buttons}>
                        <BasicConfirmButton/>
                        <BasicDeleteButton />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          <li>
            <Link href="/account">
              <Image src={AccountHeadImage} alt="Profile" width={35} height={35} />
              <p>Profile</p>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HamburgerMenu;
