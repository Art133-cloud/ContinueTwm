"use client";
import { useState } from "react";
import styles from "./CreatePost.module.scss";
import PostProfileImg from "../../../public/assets/png/accountHeadImage.png";
import Image from "next/image";
import SecondUserAuthor from "../../../public/assets/png/AuthorFive.png";

type PostContent = {
  comment: string;
  imagesContent: JSX.Element[] | null;
  videoContent: JSX.Element[] | null;
  src: string;
  alt: string;
  userName: string;
  when: string;
};

interface CreatePostProps {
  onPostSubmit: (newPost: PostContent) => void;
}

export default function CreatePost({ onPostSubmit }: CreatePostProps) {
  const [selectedType, setSelectedType] = useState<'text' | 'image' | 'video' | 'feeling' | null>(null);
  const [postText, setPostText] = useState('');
  const [imageContent, setImageContent] = useState<File[]>([]); // Массив для нескольких изображений
  const [videoContent, setVideoContent] = useState<File[]>([]); // Массив для нескольких видео
  const [feeling, setFeeling] = useState<string | null>(null);
  const handlePostChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostText(e.target.value);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageContent([...imageContent, ...Array.from(e.target.files)]);
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setVideoContent([...videoContent, ...Array.from(e.target.files)]);
    }
  };

  const handleFeelingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFeeling(e.target.value);
  };

  const handlePostSubmit = () => {
    const newPost: PostContent = {
      comment: postText,
      imagesContent: imageContent.length > 0 ? imageContent.map(file => (
        <img key={file.name} src={URL.createObjectURL(file)} alt="uploaded" />
      )) : null,
      videoContent: videoContent.length > 0 ? videoContent.map(file => (
        <video key={file.name} src={URL.createObjectURL(file)} controls />
      )) : null,
      src: SecondUserAuthor.src,
      alt: "SecondUserAuthor",
      userName: "User", // Replace with actual user data
      when: "Just Now", // Replace with actual timestamp logic
    };

    onPostSubmit(newPost); // Pass the new post back to the parent
    resetForm(); // Reset the form after submission
  };

  const resetForm = () => {
    setPostText('');
    setImageContent([]);
    setVideoContent([]);
    setFeeling(null);
  };

  const isPostValid = () => {
    return postText.trim() !== '' || imageContent.length > 0 || videoContent.length > 0;
  };

  return (
    <div className={styles.createPost}>
      <div className={styles.header}>
        <Image src={PostProfileImg.src} alt="Profile" width={40} height={40} />
        <textarea
          value={postText}
          onChange={handlePostChange}
          placeholder="What's on your mind?"
        />
      </div>

      <div className={styles.buttons}>
        {/* Photo/Video Input */}
        <label htmlFor="image-upload" className={styles.button}>
          Photo/Video
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            multiple
            style={{ display: "none" }}
            onChange={handleImageUpload}
          />
        </label>

        {/* Live Video Input */}
        <label htmlFor="video-upload" className={styles.button}>
          Live Video
          <input
            id="video-upload"
            type="file"
            accept="video/*"
            multiple
            style={{ display: "none" }}
            onChange={handleVideoUpload}
          />
        </label>
      </div>
      <div className={styles.selectedMedia}>
        {imageContent.length > 0 && (
          <div className={styles.imagePreview}>
            {imageContent.map((file, index) => (
              <img key={index} src={URL.createObjectURL(file)} alt={`image-${index}`} />
            ))}
          </div>
        )}
        {videoContent.length > 0 && (
          <div className={styles.videoPreview}>
            {videoContent.map((file, index) => (
              <video key={index} src={URL.createObjectURL(file)} controls />
            ))}
          </div>
        )}
      </div>

      <div className={styles.buttons}>
        <button onClick={handlePostSubmit} disabled={!isPostValid()}>
          Post
        </button>
      </div>
    </div>
  );
}
