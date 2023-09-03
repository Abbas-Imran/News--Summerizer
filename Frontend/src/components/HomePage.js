import React, { useState } from "react";
import Navbar from "./Navbar";
import NewsTypeContainer from "./HomePageComponents/NewsTypeContainer";
import NewsContainer from "./NewsContainer";

function HomePage() {
  const [newsType, setNewsType] = useState("Home");
  let newsTypes = [
    "Home",
    "Business",
    "Entertainment",
    "General",
    "Technology",
    "Science",
    "Health",
    "Sports",
  ];

  const handleNewsType = (newsType) => {
    setNewsType(newsType);
  };

  return (
    <div>
      <Navbar />
      <NewsTypeContainer
        newsTypes={newsTypes}
        activeNewsType={newsType}
        handleNewsType={handleNewsType}
      />
      <NewsContainer activeNewsType= {newsType}/>
    </div>
  );
}

export default HomePage;
