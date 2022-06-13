import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
// import { deleteNews } from "../../redux/actions";
import Spinner from "../Spinner/Spinner";
import Error from "../Error/Error";
import NewsListItem from "../NewsListItem/NewsListItem";
import { createSelector } from "reselect";
// import { fetchNews } from "../../redux/actions";
import { fetchNews, deleteNews } from "./news_slice";

function NewsList() {
  const selectedFilteredNews = createSelector(
    (state) => state.news.news,
    (state) => state.filter.activeFilter,
    (news, activeFilter) => {
      if (activeFilter === "All") {
        return news;
      } else {
        return news.filter((s) => s.category === activeFilter);
      }
    }
  );

  const filteredNews = useSelector(selectedFilteredNews);
  const { newsLoadingStatus } = useSelector((state) => state.news);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNews());
    // eslint-disable-next-line
  }, []);

  const onDelete = (id) => {
    dispatch(deleteNews(id));
  };

  if (newsLoadingStatus === "loading") {
    return <Spinner />;
  } else if (newsLoadingStatus === "error") {
    return <Error />;
  }

  const renderNewsList = (arr) => {
    if (!arr.length) {
      return (
        <h4 className="text-center mt-5 text-white">News doesn't exist</h4>
      );
    }

    return arr
      .map(({ id, ...props }) => {
        return (
          <NewsListItem
            key={id}
            {...props}
            deleteNews={() => {
              onDelete(id);
            }}
          />
        );
      })
      .reverse();
  };

  const element = renderNewsList(filteredNews);

  return <ul className="content__view">{element}</ul>;
}

export default NewsList;
