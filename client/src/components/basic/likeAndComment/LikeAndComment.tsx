"use client"
import { useState,useEffect } from "react";
import styles from "./LikeAndComment.module.scss";
import Like from "../../../../public/assets/svg/Like";
import Heart from "../../../../public/assets/svg/Heart";
import Comment from "../../../../public/assets/svg/Comment";
import Share from "../../../../public/assets/svg/Share";
import CommentSection from "../../comments/Comments";

export default function LikeAndComment() {
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [comments, setComments] = useState<any[]>([]);
  const [isMobileView, setIsMobileView] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: "Check this out!",
      text: "This is a great post I want to share with you.",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        console.log("Shared successfully!");
      } else {
        alert("Sharing not supported on this device/browser.");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 341);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const blocks = [
    {
      blockClassName: styles.heartBlock,
      iconClassName: styles.heart,
      icon: <Heart />,
      text: "2.8K Like",
    },
    {
      blockClassName: styles.commentBlock,
      iconClassName: styles.comment,
      icon: <Comment />,
      text: isMobileView
        ? `${comments.length}`
        : `${comments.length} Comment`,
      onClick: () => setIsCommentOpen((prev) => !prev),
    },
  ];

  return (
    <div className={styles.likeAndComment}>
      <div className={styles.leftContent}>
        <div className={styles.like}>
          <Like />
        </div>
        {blocks.map((item, index) => (
          <div key={index} className={item.blockClassName} onClick={item.onClick}>
            <div className={item.iconClassName}>{item.icon}</div>
            <p>{item.text}</p>
          </div>
        ))}
      </div>

      <CommentSection
        isOpen={isCommentOpen}
        setIsOpen={setIsCommentOpen}
        comments={comments}
        setComments={setComments}
      />

      <div className={styles.share} onClick={handleShare} style={{cursor:"pointer"}}>
        <Share />
        <p>Share</p>
      </div>
    </div>
  );
}
