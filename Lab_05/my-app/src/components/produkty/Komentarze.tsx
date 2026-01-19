import React, { useState, useEffect } from "react";
import Komentarz, { type CommentProps } from "./Komentarz";

const Komentarze: React.FC = () => {
  const [comments, setComments] = useState<CommentProps[]>([]);

  useEffect(() => {
    fetch("https://dummyjson.com/comments")
      .then((response) => response.json())
      .then((data) => {
        setComments(data.comments);
      })
      .catch((error) => console.error("Błąd pobierania danych:", error));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Zadanie 7.2: Komentarze z API</h2>

      {comments.length === 0 ? (
        <p>Ładowanie komentarzy...</p>
      ) : (
        <div>
          {comments.map((comment) => (
            <Komentarz
              key={comment.id}
              id={comment.id}
              body={comment.body}
              postId={comment.postId}
              likes={comment.likes}
              user={comment.user}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Komentarze;
