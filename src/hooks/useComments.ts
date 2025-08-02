
import { useEffect, useState } from "react";

export const useComments = (characterId: string | null) => {
  const [comments, setComments] = useState<string[]>([]);

  useEffect(() => {
    if (characterId) {
      const stored = localStorage.getItem(`comments-${characterId}`);
      setComments(stored ? JSON.parse(stored) : []);
    }
  }, [characterId]);

  const addComment = (comment: string) => {
    const updated = [...comments, comment];
    setComments(updated);
    localStorage.setItem(`comments-${characterId}`, JSON.stringify(updated));
  };

  return { comments, addComment };
};
