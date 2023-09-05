import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import NewsCard from "./NewsCard";

function NewsContainer(props) {
  const [news, setNews] = useState();
  const [loading, setLoading] = useState(true);
  const [newsType, setNewsType] = useState(
    props.activeNewsType.toLowerCase() === "home"
      ? ""
      : props.activeNewsType.toLowerCase()
  );

  useEffect(() => {
    setNewsType(
      props.activeNewsType.toLowerCase() === "home"
        ? ""
        : props.activeNewsType.toLowerCase()
    );
    console.log("news", newsType);
  }, [props.activeNewsType]);
  useEffect(() => {
    const apiKey = "b18f015c940e45c08c66947316450af6";
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&category=${newsType}&apiKey=${apiKey}`;
    console.log(apiUrl);
    setLoading(true);
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setNews(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was a problem fetching the data:", error);
        setLoading(true);
      });
  }, [newsType]);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <Container sx={{ padding: "50px 0" }}>
      <Grid container spacing={8}>
        {!loading &&
          news.articles.map((eachNews, index) => {
            // {NewsData.articles.map((eachNews, index) => {
            if (eachNews.title && eachNews.urlToImage) {
              return <NewsCard index={index} eachNews={eachNews} />;
            }
          })}
      </Grid>
    </Container>
  );
}

export default NewsContainer;
