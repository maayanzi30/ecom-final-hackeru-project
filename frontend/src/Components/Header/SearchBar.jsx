import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import styles from "../../styles/searchBar.module.css";

const SearchBar = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  const triggerSearch = () => {
    if (isSearch) {
      setIsSearch(false);
    } else {
      setIsSearch(true);
    }
  };
  const searchHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
      setKeyword(" ");
    } else {
      navigate("/");
    }
  };

  return (
    <div className={styles.wrapSearchComponent}>
      <div className={styles.searchTrigger} onClick={triggerSearch}>
        <BsSearch size="26" />
      </div>
      {isSearch && (
        <form onSubmit={searchHandler} className={styles.searchForm}>
          <div className={styles.userBox}>
            <input
              type="text"
              id="searchField"
              name="q"
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search Products..."
              className={styles.inputField}
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default SearchBar;
