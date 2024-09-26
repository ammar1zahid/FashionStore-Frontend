import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { fetchComments, addComment } from "../redux/apiCalls"; // Import Redux API call functions
import { RootState } from "../redux/store"; 
import { IComment } from "../redux/commentRedux"; 


const Container = styled.div`
  margin: 40px 0;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const PostCommentSection = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const UserImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
`;

const UserName = styled.span`
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

const CommentForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  min-height: 100px;
  margin-bottom: 10px;
  resize: none;
`;

const SubmitButton = styled.button`
  padding: 10px;
  background-color: teal;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #006666;
  }
`;

const CommentList = styled.ul`
  list-style: none;
  padding: 0;
`;

const CommentItem = styled.li`
  margin: 10px 0;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

const CommentContent = styled.div`
  flex: 1;
  margin-right: 10px;
`;

const CommentAuthor = styled.h4`
  margin: 0;
  font-size: 18px;
  color: #007bff;
`;

const CommentText = styled.p`
  margin: 5px 0 0;
  font-size: 16px;
  color: #555;
`;

const TimeAgo = styled.span`
  font-size: 14px;
  color: #888;
`;

// const currentUser = {
//   userId: "66d002734cfd3a630ba1632f", 
//   name: "Alice Johnson",
//   img: "https://cdn-icons-png.flaticon.com/512/149/149071.png", 
// };

interface CommentSectionProps {
  productId: string;
}

interface CurrentUser{
  _id?:string,
  username?: string,
  img?:string
}

//  interface ICommentNew {
//   _id: string;
//   userId: {
//     _id: string;
//     username: string;
//     img: string;
//   };
//   productId: string;
//   comment: string;
//   createdAt: string;
// }


const CommentSection: React.FC<CommentSectionProps> = ({ productId }) => {
  const [comment, setComment] = useState<string>("");

  const dispatch = useDispatch();

  const currentUser: CurrentUser | null = useSelector((state: RootState) => state.user.currentUser);


  // Fetch comments from the Redux state with proper default fallback
  const { comments = [], isFetching, error } = useSelector(
    (state: RootState) => state.comments
  );

  // Fetch comments when the component mounts
  useEffect(() => {
    fetchComments(productId, dispatch); // Fetch comments for the given product
  }, [productId, dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (comment) {
      const newComment: IComment = {
        userId: currentUser?._id,
        productId,
        comment,
      };
      addComment(newComment, dispatch); // Add comment via Redux action
      setComment(""); // Clear input field
    }
  };

  return (
    <Container>
      <PostCommentSection>
        <UserInfo>
          <UserImage src={currentUser?.img} alt={currentUser?.username} />
          <UserName>{currentUser?.username}</UserName>
        </UserInfo>
        <CommentForm onSubmit={handleSubmit}>
          <TextArea
            placeholder="Your Comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
          <SubmitButton type="submit">Submit Comment</SubmitButton>
        </CommentForm>
      </PostCommentSection>

      <CommentList>
        {isFetching ? (
          <p>Loading comments...</p>
        ) : error ? (
          <p>Error loading comments</p>
        ) : comments.length === 0 ? (
          <p>No comments yet. Be the first to comment!</p>
        ) : (
          comments.map((c: IComment) => (
            <CommentItem key={c._id}>
              <UserImage
                  src={c.userId?.img || "https://default-image.png"}
                  alt= "img"
              />
              <CommentContent>
                <CommentAuthor>{c.userId?.username || "Unknown User"}</CommentAuthor> 
                <CommentText>{c.comment}</CommentText>
              </CommentContent>
              {/* <TimeAgo>  <Moment fromNow>{c.createdAt}</Moment></TimeAgo> */}
              <TimeAgo>  {c.createdAt}</TimeAgo>
            </CommentItem>
          ))
        )}
      </CommentList>
    </Container>
  );
};

export default CommentSection;
