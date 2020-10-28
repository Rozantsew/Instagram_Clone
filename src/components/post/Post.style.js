import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";

export const Post = styled.div`
  border-radius: 3px;
  width: 100%;
  background-color: #fff;
  border: 1px solid lightgray;
  margin-bottom: 20px;
  align-self: center;
  padding-bottom: 15px;
  @media (min-width: 600px) {
    max-width: 600px;
  }
`;

export const PostHeaderWrapper = styled.div`
  width: auto;
  display: flex;
  align-content: center;
  justify-content: flex-start;
  padding: 10px 0px;
  padding: 20px;
`;

export const StyledAvatar = styled(Avatar)`
  margin-right: 10px;
`;

export const UserName = styled.h3`
  align-self: center;
  text-align: left;
  margin: 10px;
`;

export const PostImage = styled.img`
  width: 100%;
  object-fit: contain;
  border-top: 1px solid lightgray;
  border-bottom: 1px solid lightgray;
`;

export const PostParagraph = styled.h4`
  font-weight: normal;
  align-self: center;
  padding: 20px;
`;

export const PostComment = styled.h4`
  font-weight: normal;
  align-self: center;
  padding: 4px;
  padding-left: 20px;
`;

export const UserNameBold = styled.span`
  margin-right: 10px;
  font-weight: bold;
`;

export const CommentForm = styled.form`
  width: 100;
  display: flex;
  margin: 10px;
`;

export const StyledInput = styled.input`
  flex: 1;
  border: none;
  border-top: 1px solid lightgray;
  padding: 10px;
`;

export const StyledButton = styled.button`
  flex: 0;
  border: none;
  border-top: 1px solid lightgray;
  color: #6082a3;
`;
