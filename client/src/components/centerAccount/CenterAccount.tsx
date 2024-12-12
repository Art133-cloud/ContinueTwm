"use client";
import { useState, useRef } from "react";
import styles from "./CenterAccount.module.scss";
import Image from "next/image";
import ProfileBackground from "../../../public/assets/png/profileBackground.png";
import ProfileImg from "../../../public/assets/png/profileImg.png";
import CreatePost from "../createPost/CreatePost";
import Post from "../basic/post/Post";
import FirstImagePost from "../../../public/assets/png/postFirstImg.png";
import SecondImagePost from "../../../public/assets/png/postSecondImg.png";
import FirstUserAuthor from "../../../public/assets/png/firstUserRequest.png";
import SecondUserAuthor from "../../../public/assets/png/secondUserRequest.png";
import Video from "../video/Video";

export default function CenterAccount() {
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showAllImages, setShowAllImages] = useState(false);

  const [posts, setPosts] = useState<any[]>([]); // Define the posts state

  const toggleImages = () => {
    setShowAllImages((prev) => !prev);
  };

  const handleZoom = (src: string) => {
    setZoomedImage(src);
    setIsZoomed(true);
  };

  const closeZoom = () => {
    setIsZoomed(false);
    setZoomedImage(null);
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleNewPost = (newPost: any) => {
    setPosts([newPost, ...posts]); // Add the new post to the top of the posts array
  };

  const imagesPosts: { src: string; alt: string }[] = [
    { src: FirstImagePost.src, alt: "FirstImagePost" },
    { src: SecondImagePost.src, alt: "SecondImagePost" },
    { src: SecondImagePost.src, alt: "SecondImagePost" },
    { src: SecondImagePost.src, alt: "SecondImagePost" },
    { src: FirstImagePost.src, alt: "FirstImagePost" },
  ];

  interface PostsProps {
    comment: string;
    imagesContent: JSX.Element | null;
    videoContent: JSX.Element | null;
    src: string;
    alt: string;
    userName: string;
    when: string;
  }

  const postsData: PostsProps[] = [
    {
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus ",
      imagesContent: (
        <>
          {imagesPosts
            .slice(0, showAllImages ? imagesPosts.length : 2)
            .map((item, index) => (
              <Image
                key={index}
                src={item.src}
                alt={item.alt}
                width={201}
                height={134}
              />
            ))}
          <div onClick={openModal}>
            {!showAllImages && <p>+{imagesPosts.length - 2}</p>}
            {showAllImages && <p onClick={toggleImages}>Show less</p>}
          </div>
        </>
      ),
      videoContent: null,
      src: FirstUserAuthor.src,
      alt: "FirstUserAuthor",
      userName: "Surfiya Zakir",
      when: "3 hours ago",
    },
    {
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus ",
      imagesContent: null,
      videoContent: null,
      src: SecondUserAuthor.src,
      alt: "SecondUserAuthor",
      userName: "Goria Coast",
      when: "2 hours ago",
    },
    {
      comment:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus ",
      imagesContent: null,
      videoContent: <Video />,
      src: SecondUserAuthor.src,
      alt: "SecondUserAuthor",
      userName: "Goria Coast",
      when: "2 hours ago",
    },
  ];

  return (
    <div className={styles.contentCenterAccount}>
      <div className={styles.aboutProfile}>
        {isZoomed && (
          <div className={styles.zoomModal} onClick={closeZoom}>
            <img
              src={zoomedImage!}
              alt="Zoomed Image"
              className={styles.zoomedImg}
            />
          </div>
        )}
        <div className={styles.backgroundProfile}>
          <Image
            src={ProfileBackground.src}
            alt="ProfileBackground"
            width={900}
            height={216}
            onClick={() => handleZoom(ProfileBackground.src)}
          />
        </div>
        <div className={styles.profileImgAndInfo}>
          <Image
            src={ProfileImg.src}
            alt="ProfileImg"
            width={162}
            height={162}
            onClick={() => handleZoom(ProfileImg.src)}
          />
          <div className={styles.infoProfile}>
            <h2>Vinicius JR</h2>
            <p>vinijr@gmail.com</p>
            <p>São Gonçalo (Río de Janeiro, Brazil)</p>
          </div>
        </div>
      </div>
      <div className={styles.posts}>
        <CreatePost onPostSubmit={handleNewPost} />
        {postsData.concat(posts).map((item, index) => (
          <Post
            key={index}
            comment={item.comment}
            imagesContent={item.imagesContent}
            videoContent={item.videoContent}
            src={item.src}
            alt={item.alt}
            userName={item.userName}
            when={item.when}
          />
        ))}
      </div>

      {showModal && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            {imagesPosts.map((item, index) => (
              <Image
                key={index}
                src={item.src}
                alt={item.alt}
                width={200}
                height={200}
              />
            ))}
            <button
              className={styles.closeModalButton}
              onClick={(e) => {
                e.stopPropagation();
                closeModal();
              }}
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
