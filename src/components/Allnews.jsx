import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spiner from "./Spiner";
import InfiniteScroll from "react-infinite-scroll-component";



export class Allnews extends Component {
  capitalFirstLatter = (string) =>
    string.charAt(0).toUpperCase() + string.slice(1);

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
      hasMore: true,
    };

    document.title = `NewsInfo - ${this.capitalFirstLatter(
      this.props.category
    )}`;
  }

  // Fetch news used try catch to dettect errors
  fetchNews = async () => {
    try {
      this.props.setProgress(10);
      let url = `https://newsapi.org/v2/top-headlines?pageSize=${this.props.pageSize}&page=${this.state.page}&category=${this.props.category}&apiKey=${this.props.API_KEY}`;

      // let url = `https://gnews.io/api/v4/top-headlines?category=${this.props.category}&lang=en&max=10&page=${this.state.page}&apikey=cb4bc7db839ab3bdfd58ef32e9ccdb40`;
      // use image in place of urlToImage o use gnews api

      // Fetch data from API
      let response = await fetch(url);
      this.props.setProgress(30);
      let parsedData = await response.json();
      this.props.setProgress(80);

      // If API returns no articles, stop infinite scroll
      if (!parsedData.articles || parsedData.articles.length === 0) {
        this.setState({
          loading: false,
          hasMore: false,
        });
        return;
      }

      // Domains that block image hotlinking showing console errors
      const blockedDomains = [
        "manilatimes.net",
        "jsonline.com",
        "usatoday.com",
      ];

      // Clean image URLs
      const cleanedArticles = parsedData.articles.map((article) => {
        if (
          article.urlToImage &&
          blockedDomains.some((domain) => article.urlToImage.includes(domain))
        ) {
          // Remove blocked image and show random image
          return { ...article, urlToImage: null };
        }
        return article;
      });

      this.setState((prevState) => ({
        articles: [...prevState.articles, ...cleanedArticles],
        totalResults: parsedData.totalResults,
        loading: false,
        hasMore:
          prevState.articles.length + cleanedArticles.length <
          parsedData.totalResults,
      }));
      this.props.setProgress(100);
    } catch (error) {
      console.error("Error fetching news:", error);
      this.setState({ loading: false, hasMore: false });
    }
  };

  componentDidMount() {
    this.setState({ loading: true }, this.fetchNews);
  }

  fetchMoreData = () => {
    if (this.state.loading || !this.state.hasMore) return;

    this.setState(
      (prevState) => ({
        page: prevState.page + 1,
        loading: true,
      }),
      this.fetchNews
    );
  };

  render() {
    return (
      <>
        <h2 className="mb-2 mt-3 text-center">
          NewsInfo - Top{" "}
          {this.props.category ? this.props.category.toUpperCase() : "All"}{" "}
          Headlines
        </h2>

        {this.state.loading && this.state.articles.length === 0 && <Spiner />}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.hasMore}
          loader={this.state.articles.length > 0 ? <Spiner /> : null}
          endMessage={
            <p className="text-center mt-4">
              <b>No more news to show</b>
            </p>
          }
        >
          <div className="container mt-4">
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {this.state.articles.map((element, index) => (
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
  }
}

export default Allnews;
