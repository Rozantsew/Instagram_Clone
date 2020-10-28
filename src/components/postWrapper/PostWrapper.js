import styled from "styled-components";

export const PostWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  max-width: 980px;
  margin: auto;
  padding: 20px;
  flex-wrap: wrap;
`;

export const PostLeftWrapper = styled.div`
  justify-content: center;
  width: 100%;
  @media (min-width: 600px) {
    width: 60%;
  }
`;

export const PostRightWrapper = styled.div`
  justify-content: center;
  width: 100%;
  @media (min-width: 600px) {
    width: 35%;
  }
`;

export const GridContainter = styled.div`
  justify-content: center;
`;
