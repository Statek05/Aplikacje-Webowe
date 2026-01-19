import React, { useState } from "react";

export interface User {
  id: number;
  username: string;
  fullName: string;
}

export interface CommentProps {
  id: number;
  body: string;
  postId: number;
  likes: number;
  user: User;
}

const Komentarz: React.FC<CommentProps> = ({ id, body, likes, user }) => {
  const [likeCount, setLikeCount] = useState<number>(likes);

  const handleLike = () => {
    setLikeCount(likeCount + 1);
  };

  const handleDislike = () => {
    setLikeCount(likeCount - 1);
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "15px",
        margin: "10px 0",
        backgroundColor: "#f9f9f9",
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <div style={{ fontWeight: "bold", color: "#333" }}>
          @{user.username}
        </div>
        <div style={{ marginLeft: "10px", fontSize: "12px", color: "#777" }}>
          (ID: {id})
        </div>
      </div>

      <p style={{ fontStyle: "italic", color: "#555" }}>"{body}"</p>

      <div
        style={{
          marginTop: "10px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <button
          onClick={handleLike}
          style={{ cursor: "pointer", color: "green" }}
        >
          👍
        </button>
        <button
          onClick={handleDislike}
          style={{ cursor: "pointer", color: "red" }}
        >
          👎
        </button>
        <span style={{ fontWeight: "bold" }}>Likes: {likeCount}</span>
      </div>
    </div>
  );
};

export default Komentarz;
