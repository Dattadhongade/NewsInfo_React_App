import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spiner from "./Spiner";
import InfiniteScroll from "react-infinite-scroll-component";

const Allnews = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Capitalize category
  const capitalFirstLatter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  // Set document title once
  useEffect(() => {
    document.title = `NewsInfo - ${capitalFirstLatter(props.category)}`;
  }, [props.category]);

  // Fetch news
  const fetchNews = async () => {
    try {
      props.setProgress(30);

      let url = `https://newsapi.org/v2/top-headlines?pageSize=${props.pageSize}&page=${page}&category=${props.category}&apiKey=${props.API_KEY}`;

      // let url = `https://gnews.io/api/v4/top-headlines?category=${props.category}&lang=en&max=10&page=${page}&apikey=cb4bc7db839ab3bdfd58ef32e9ccdb40`;
      // use image in place of urlTourlToImage o use gnews api

      setLoading(true);
      const response = await fetch(url);

      const parsedData = await response.json();
      props.setProgress(100);

      if (!parsedData.articles || parsedData.articles.length === 0) {
        setHasMore(false);
        setLoading(false);
        return;
      }

      const blockedDomains = [
        "manilatimes.net",
        "jsonline.com",
        "usatoday.com",
      ];

      const cleanedArticles = parsedData.articles.map((article) => {
        if (
          article.urlToImage &&
          blockedDomains.some((domain) => article.urlToImage.includes(domain))
        ) {
          return { ...article, urlToImage: null };
        }
        return article;
      });

      setArticles((prevArticles) => {
        const updated = [...prevArticles, ...cleanedArticles];
        setHasMore(cleanedArticles.length > 0);
        return updated;
      });

      setLoading(false);
      props.setProgress(100);
    } catch (error) {
      console.error("Error fetching news:", error);
      setLoading(false);
      setHasMore(false);
      props.setProgress(100);
    }
  };

  // Initial load + page change
  useEffect(() => {
    fetchNews();
  }, [page]);

  // Infinite scroll trigger
  const fetchMoreData = () => {
    if (!hasMore) return;
    setPage((prevPage) => prevPage + 1);
  };

  return (
    <>
      <h2 className="mb-2 mt-3 text-center">
        NewsInfo - Top {props.category?.toUpperCase()} Headlines
      </h2>

      {loading && articles.length === 0 && <Spiner />}

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={articles.length > 0 ? <Spiner /> : null}
        endMessage={
          <p className="text-center mt-4">
            <b>No more news to show</b>
          </p>
        }
      >
        <div className="container mt-4">
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {articles.map((element, index) => (
              <div className="col" key={index}>
                <NewsItem
                  title={element.title}
                  description={element.description}
                  imgUrl={element.urlToImage}
                  url={element.url}
                  date={element.publishedAt?.slice(0, 10)}
                />
              </div>
            ))}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
};

export default Allnews;
