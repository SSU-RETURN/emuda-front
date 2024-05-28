/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import AppBarInEditMode from '../../components/AppBarInEditMode/AppBarInEditMode';
import '../../Fonts/Font.css';
import colors from '../../Colors/Colors';

const Container = ({ children }) => {
  return <div css={containerStyle}>{children}</div>;
};

const containerStyle = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  margin: 0px;
`;
const fixTopBoxStyle = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 63px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EditMemberInfoView = () => {
  return (
    <Container>
      <div css={fixTopBoxStyle}>
        <AppBarInEditMode text="회원정보 수정" />
      </div>
    </Container>
  );
};

export default EditMemberInfoView;
