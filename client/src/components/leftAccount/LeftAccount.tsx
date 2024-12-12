"use client"
import { useState, useEffect } from "react";
import styles from "./LeftAccount.module.scss";
import MyFavoriteOrganizations from "../../../public/assets/svg/MyFavoriteOrganizations";
import Posts from "../../../public/assets/svg/Posts";
import { JSX } from "react";
import Image from "next/image";
import FirstUserRequest from "../../../public/assets/png/firstUserRequest.png";
import SecondUserRequest from "../../../public/assets/png/secondUserRequest.png";
import ThirdUserRequest from "../../../public/assets/png/thirdUserRequest.png";
import LastApplyUser from "../../../public/assets/png/lastUserApply.png"
import BasicConfirmButton from "../basic/basicConfirmButton/BasicConfirmButton";
import BasicDeleteButton from "../basic/basicDeleteButton/BasicDeleteButton";
import SuggestGroupImg from "../../../public/assets/png/suggestGroupImg.png"

export default function LeftAccount() {
  const [isFixed, setIsFixed] = useState(false);
  const [topPosition, setTopPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsFixed(true);
        setTopPosition(20);
      } else {
        setIsFixed(false);
        setTopPosition(0); 
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const userContentItem: { icon: JSX.Element; text: string }[] = [
    {
      icon: <MyFavoriteOrganizations />,
      text: "My favorite Organizations",
    },
    {
      icon: <Posts />,
      text: "My Posts",
    },
  ];
  const user: { src: string; alt: string; name: string; friends: string }[] = [
    {
      src: FirstUserRequest.src,
      alt: "FirstUserRequest",
      name: "Anthony Daugloi",
      friends: "12 mutual friends",
    },
    {
      src: SecondUserRequest.src,
      alt: "SecondUserRequest",
      name: "Mohannad Zitoun",
      friends: "12 mutual friends",
    },
    {
      src: ThirdUserRequest.src,
      alt: "ThirdUserRequest",
      name: "Mohannad Zitoun",
      friends: "12 mutual friends",
    },
  ];
  const applyUsers: {src: string,alt:string}[] = [
    {
      src: FirstUserRequest.src,
      alt: "FirstUserRequest"
    },
    {
      src: SecondUserRequest.src,
      alt: "FirstUserRequest"
    },
    {
      src: ThirdUserRequest.src,
      alt: "FirstUserRequest"
    },
    {
      src: LastApplyUser.src,
      alt: "LastApplyUser"
    },
  ]
  return (
    <div className={styles.parentLeftAccount}>
      <div className={styles.contentLeftAccount}
        style={{
          top: `${topPosition}px`,
          position: isFixed ? "fixed" : "relative",
        }}

      >
        <div className={styles.userContent}>
          {userContentItem.map((item: any, index: number) => {
            return (
              <div key={index} className={styles.userContentItem}>
                {item.icon}
                <p>{item.text}</p>
              </div>
            );
          })}
        </div>
        <div className={styles.userRequest}>
          <div className={styles.titleRequest}>
            <h2>Friend Request</h2>
            <p>See all</p>
          </div>
          <div className={styles.usersBlock}>
            {user.map((item: any, index: number) => {
              return (
                <div className={styles.user} key={index}>
                  <div className={styles.userInfo}>
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={45}
                      height={45}
                    />
                    <div className={styles.aboutUser}>
                      <h2>{item.name}</h2>
                      <p>{item.friends}</p>
                    </div>
                  </div>
                  <div className={styles.btnsUser}>
                    <BasicConfirmButton />
                    <BasicDeleteButton />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.suggestGroup}>
          <div className={styles.titleRequest}>
            <h2>Suggest Group</h2>
            <p>See all</p>
          </div>
          <div className={styles.contentSuggestGroup}>
            <div className={styles.suggestGroupBigImage}>
              <Image 
                src={SuggestGroupImg.src}
                alt="SuggestGroupImg"
                width={234}
                height={175}
              />
            </div>
            <div className={styles.applyUsers}>
              {applyUsers.map((item:any,index: number) => {
                return <Image
                  key={index} 
                  src={item.src}
                  alt={item.alt}
                  width={35}
                  height={35}
                />
              })}
              <div className={styles.more}>
                <p>+2</p>
              </div>
              <h4>Member Apply</h4>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
