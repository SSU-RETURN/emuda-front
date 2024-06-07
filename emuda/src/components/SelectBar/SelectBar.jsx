/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';

const textStyle = css`
  font-size: 15px;
`;
// 스타일드 컴포넌트 정의
const Tab = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  cursor: pointer;
  padding: 10px 20px;
  border-bottom: 3px solid ${(props) => (props.isActive ? '#007bff' : '#ccc')};
`;

const TabContainer = styled.div`
  display: flex;
  width: 90%;
`;

const SelectBar = ({ activeTab, setActiveTab }) => {
  return (
    <TabContainer>
      <Tab isActive={activeTab === 'day'} onClick={() => setActiveTab('day')}>
        <span css={textStyle}>날짜별 플레이리스트</span>
      </Tab>
      <Tab isActive={activeTab === 'emotion'} onClick={() => setActiveTab('emotion')}>
        <span css={textStyle}>감정별 플레이리스트</span>
      </Tab>
    </TabContainer>
  );
};

export default SelectBar;
