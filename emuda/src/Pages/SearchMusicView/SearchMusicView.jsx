/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBarInEditMode from '../../components/AppBarInEditMode/AppBarInEditMode';
import Button from '../../components/Button/Button';
import '../../Fonts/Font.css';
import colors from '../../Colors/Colors';
import PlayListCell from '../../components/PlayListCell/PlayListCell';
import Magnifyingglass from '../../assets/magnifyingglass';
import axios from 'axios';
import { apiUrl } from '../../config/config';

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

const subContainerStyle = css`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  margin: 10px 22px;
`;

const searchContainerStyle = css`
  display: flex;
  align-items: center;
  background-color: white;
  border: 1px solid ${colors.mainBlue};
  border-radius: 7px;
  width: 100%;
  height: 38.71px;
  margin: 10px 0px 22px 0px;
`;

const iconStyle = css`
  margin-left: 10px;
  width: 20.29px;
  height: 18.71px;
`;

const inputStyle = css`
  border: none;
  outline: none;
  margin: 0px;
  padding: 0px 13px;
  width: auto;
  height: 12px;
  flex-grow: 1;
  font-family: 'Pretendard-Medium';
  font-size: 10px;
  color: ${colors.lighGray2};
`;

const recentSearchLabelBoxStyle = css`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const recentSearchLabelStyle = css`
  font-family: 'Pretendard-Medium';
  font-size: 10px;
`;

const clearSearchesButtonStyle = css`
  background-color: white;
  font-family: 'Pretendard-ExtraLight';
  font-size: 10px;
  padding: 0px;
  color: ${colors.lightGray03};
  border: none;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;

const recentSearchItemStyle = css`
  display: flex;
  width: 100%;
  justify-content: left;
  align-items: center;
  background-color: white;
  border-bottom: 1px solid ${colors.lightGray01};
  padding: 7px 10px;
  margin: 15px 0px;
  font-size: 14px;
  box-sizing: border-box;
`;
const searchResultIconStyle = css`
  width: 19.29px;
  height: 18.71px;
  margin-right: 13px;
  color: ${colors.lightGray03};
`;

const recentSearchTextStyle = css`
  width: 100%;
  height: 18.71px;
  color: black;
`;

const deleteButtonStyle = css`
  width: 10px;
  height: 9.78px;
  background-color: white;
  border: none;
  padding: 0px;
  margin: 0px 10px 11.46px 10px;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
`;

const recentSearchesStyle = css`
  width: 100%;
  margin-bottom: 10px;
`;

const activityListStyle = css`
  width: 100%;
  margin-bottom: 80px;
`;

const fixButtonBoxStyle = css`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 -1px 4px -1px ${colors.lightGray01};
`;

const SearchMusicView = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isComposing, setIsComposing] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedMusicData, setSelectedMusicData] = useState([]);

  useEffect(() => {
    const searches = JSON.parse(localStorage.getItem('recentSearches')) || [];
    setRecentSearches(searches);
  }, []);

  const fetchSearchResults = async (query) => {
    console.log(`Searching for: ${query}`);
    try {
      const response = await axios.get(`${apiUrl}/api/music/search`, {
        params: {
          keyword: query,
          page: 0,
        },
      });
      console.log('Response:', response.data);
      if (response.data.isSuccess) {
        const resultsWithId = response.data.result.map((item) => ({
          ...item,
          id: `${item.title}-${item.artist}`,
        }));
        setSearchResults(resultsWithId);
      } else {
        alert('Search failed');
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
      } else if (error.request) {
        console.error('Request data:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
    }
    setShowSearchResults(true);
  };

  const handleSearch = (inputValue) => {
    if (!recentSearches.includes(inputValue)) {
      const updatedSearches = [inputValue, ...recentSearches].slice(0, 15);
      setRecentSearches(updatedSearches);
      localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    }
    fetchSearchResults(inputValue);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !isComposing) {
      event.preventDefault();
      if (searchTerm.trim() !== '') {
        handleSearch(searchTerm);
      }
    }
  };

  const handleComposition = (event) => {
    if (event.type === 'compositionend') {
      setIsComposing(false);
    } else {
      setIsComposing(true);
    }
  };

  const clearRecentSearches = () => {
    localStorage.removeItem('recentSearches');
    setRecentSearches([]);
  };

  const handleDeleteSearch = (index) => {
    const updatedSearches = recentSearches.filter((_, idx) => idx !== index);
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
    if (updatedSearches.length === 0) setShowSearchResults(false);
  };

  const handleSearchSelect = (search) => {
    setSearchTerm(search);
    fetchSearchResults(search);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value === '') {
      setShowSearchResults(false);
    }
  };

  const handleCheckboxChange = (id) => {
    const selectedMusic = searchResults.find((data) => data.id === id);
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((item) => item !== id));
      setSelectedMusicData(selectedMusicData.filter((music) => music.id !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
      setSelectedMusicData([...selectedMusicData, selectedMusic]);
    }
  };

  const handleNext = async () => {
    try {
      const selectedMusic = selectedMusicData.map((music) => ({
        id: music.id,
        artist: music.artist,
        title: music.title,
        pictureKey: music.pictureKey,
      }));

      const response = await axios.post(`${apiUrl}/api/music/save`, {
        musics: selectedMusic,
      });
      console.log(response.data.result);
      if (response.status === 201) {
        navigate('/write', { state: { selectedMusic: response.data.result } });
      } else {
        alert('Error saving selected music');
      }
    } catch (error) {
      console.error('Error saving selected music:', error);
    }
  };

  return (
    <Container>
      <AppBarInEditMode />
      <div css={subContainerStyle}>
        <div css={searchContainerStyle}>
          <div css={iconStyle}>
            <Magnifyingglass
              width="20.29px"
              height="18.71px"
              fillColor="#3D96FF"
              strokeColor="#3D96FF"
            />
          </div>
          <input
            type="text"
            placeholder="원하는 노래를 검색해보세요."
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onCompositionStart={handleComposition}
            onCompositionEnd={handleComposition}
            css={inputStyle}
          />
        </div>

        {!showSearchResults && (
          <div css={recentSearchesStyle}>
            <div css={recentSearchLabelBoxStyle}>
              <span css={recentSearchLabelStyle}>
                {recentSearches.length > 0 ? '최근 검색어' : '최근 검색어가 없습니다'}
              </span>
              {recentSearches.length > 0 && (
                <button onClick={clearRecentSearches} css={clearSearchesButtonStyle}>
                  전체 삭제
                </button>
              )}
            </div>
            {recentSearches.map((search, index) => (
              <div
                key={index}
                css={recentSearchItemStyle}
                onClick={() => handleSearchSelect(search)}
              >
                <div css={searchResultIconStyle}>
                  <Magnifyingglass
                    width="19.29px"
                    height="18.71px"
                    fillColor={colors.lightGray03}
                    strokeColor={colors.lightGray03}
                  />
                </div>
                <span css={recentSearchTextStyle}>{search}</span>
                <button
                  css={deleteButtonStyle}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteSearch(index);
                  }}
                >
                  <i className="fa-solid fa-x" style={{ color: colors.lightGray03 }}></i>
                </button>
              </div>
            ))}
          </div>
        )}

        {showSearchResults && (
          <div css={activityListStyle}>
            {searchResults.map((result) => (
              <PlayListCell
                key={result.id}
                image={result.pictureKey}
                title={result.title}
                artist={result.artist}
                type={'select'}
                isChecked={selectedItems.includes(result.id)}
                onCheckChange={() => handleCheckboxChange(result.id)}
              />
            ))}
          </div>
        )}
      </div>
      <div css={fixButtonBoxStyle}>
        <Button text={`선택 완료 (${selectedItems.length})`} onClick={handleNext} />
      </div>
    </Container>
  );
};

export default SearchMusicView;
