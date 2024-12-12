"use client";
import { useState, useRef, useEffect } from "react";
import styles from "./Post.module.scss";
import Image from "next/image";
import MorePost from "./../morePost/MorePost";
import { JSX } from "react";
import LikeAndComment from "../likeAndComment/LikeAndComment";
interface PostProps {
  comment: string;
  imagesContent?: JSX.Element | null;
  src: string;
  alt: string;
  userName: string;
  when: string;
  videoContent?: JSX.Element | null;
}

export default function Post({
  videoContent,
  comment,
  imagesContent,
  src,
  alt,
  userName,
  when,
}: PostProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [firstPart, setFirstPart] = useState("");
  const [remainingPart, setRemainingPart] = useState("");
  const textRef = useRef<HTMLDivElement>(null);

  const fullText = comment;

  useEffect(() => {
    if (textRef.current) {
      const maxHeight = 75;

      textRef.current.textContent = fullText;

      const isOverflowing = textRef.current.scrollHeight > maxHeight;

      if (isOverflowing) {
        let tempText = fullText.split(" ");
        let displayedText = "";
        textRef.current.textContent = "";

        for (let word of tempText) {
          displayedText += `${word} `;
          textRef.current.textContent = displayedText;

          if (textRef.current.scrollHeight > maxHeight) {
            displayedText = displayedText.trimEnd();
            break;
          }
        }

        setFirstPart(displayedText);
        setRemainingPart(fullText.slice(displayedText.length).trim());
      } else {
        setFirstPart(fullText);
        setRemainingPart("");
      }
    }
  }, [fullText]);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.post}>
      <div className={styles.topPost}>
        <div className={styles.authorPost}>
          <Image src={src} alt={alt} width={45} height={45} />
          <div className={styles.info}>
            <h2>{userName}</h2>
            <p>{when}</p>
          </div>
        </div>
        <MorePost />
      </div>
      <div className={styles.contentPost}>
        {videoContent && <div className={styles.video}>{videoContent}</div>}

        <div ref={textRef} className={styles.hiddenText}>
          <p>{firstPart}</p>

          {isExpanded && (
            <span className={styles.secondPart}>{remainingPart}</span>
          )}

          {remainingPart && (
            <span onClick={handleToggle} className={styles.toggleButton}>
              {isExpanded ? "See Less" : "See More"}
            </span>
          )}
        </div>
        {imagesContent && <div className={styles.images}>{imagesContent}</div>}
      </div>
      <div className={styles.bottomPost}>
        <LikeAndComment />
      </div>
    </div>
  );
}
