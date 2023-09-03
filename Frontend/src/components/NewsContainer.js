import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import NewsCard from "./HomePageComponents/NewsCard";

function NewsContainer(props) {
  const [news, setNews] = useState();
  const [loading, setLoading] = useState(true);
  const [newsType, setNewsType] = useState(
    props.activeNewsType.toLowerCase() === "home"
      ? ""
      : props.activeNewsType.toLowerCase()
  );

  // const NewsData = {
  //   status: "ok",
  //   totalResults: 68,
  //   articles: [
  //     {
  //       source: {
  //         id: null,
  //         name: null,
  //       },
  //       author: null,
  //       title: null,
  //       description: null,
  //       url: null,
  //       urlToImage: null,
  //       publishedAt: null,
  //       content: null,
  //     },
  //     {
  //       source: {
  //         id: null,
  //         name: "CNBC",
  //       },
  //       author: "Jordan Novet",
  //       title:
  //         "Salesforce shares pop on earnings beat and optimistic forecast - CNBC",
  //       description:
  //         "Salesforce saw gains in all five product categories, and CEO Marc Benioff sees more growth from artificial intelligence capabilities",
  //       url: "https://www.cnbc.com/2023/08/30/salesforce-shares-pop-on-earnings-beat-and-optimistic-forecast.html",
  //       urlToImage:
  //         "https://image.cnbcfm.com/api/v1/image/107293390-1693331975338-gettyimages-1537850408-kd_16258_uoqihol5.jpeg?v=1693427028&w=1920&h=1080",
  //       publishedAt: "2023-08-30T20:23:48Z",
  //       content:
  //         "Salesforce shares jumped 6% in extended trading on Wednesday after the cloud software company announced quarterly results and guidance that surpassed Wall Street's expectations.\r\nHere's how the compa… [+2047 chars]",
  //     },
  //     {
  //       source: {
  //         id: "the-wall-street-journal",
  //         name: "The Wall Street Journal",
  //       },
  //       author: "Rebecca Elliott, Dave Michaels",
  //       title:
  //         "DOJ, SEC Investigate Tesla Over Secret Glass House Project - WSJ - The Wall Street Journal",
  //       description:
  //         "Federal prosecutors are seeking information about benefits paid to Elon Musk",
  //       url: "https://www.wsj.com/business/autos/tesla-elon-musk-glass-house-doj-sec-investigation-c723166b",
  //       urlToImage: "https://images.wsj.net/im-844743/social",
  //       publishedAt: "2023-08-30T19:51:00Z",
  //       content: null,
  //     },
  //     {
  //       source: {
  //         id: null,
  //         name: "Barron's",
  //       },
  //       author: "Karishma Vanjani",
  //       title:
  //         "Google Doubles Down on AI at Cloud Next. Wall Street Is Upbeat. - Barron's",
  //       description:
  //         "The company said at a conference it uses to highlight its technology that it is expanding its Vertex AI and Duet AI systems.",
  //       url: "https://www.barrons.com/articles/ai-google-cloud-technology-63085f43",
  //       urlToImage: "https://images.barrons.com/im-79139529/social",
  //       publishedAt: "2023-08-30T19:23:00Z",
  //       content: null,
  //     },
  //     {
  //       source: {
  //         id: "the-hill",
  //         name: "The Hill",
  //       },
  //       author: "The Hill",
  //       title:
  //         "Sam Bankman-Fried attorneys say they are ‘unable to adequately prepare’ for trial - The Hill",
  //       description: null,
  //       url: "https://thehill.com/regulation/court-battles/4179484-sam-bankman-fried-attorneys-say-they-are-unable-to-adequately-prepare-for-trial/",
  //       urlToImage: null,
  //       publishedAt: "2023-08-30T18:53:00Z",
  //       content: null,
  //     },
  //     {
  //       source: {
  //         id: "cnn",
  //         name: "CNN",
  //       },
  //       author: "Tami Luhby",
  //       title:
  //         "Millions of salaried workers would get overtime pay under Biden administration proposal - CNN",
  //       description:
  //         "Some 3.6 million salaried workers would newly qualify for overtime pay under a proposed rule unveiled by the US Department of Labor on Wednesday. It would guarantee overtime pay of at least time-and-a-half for most salaried workers earning less than $1,059 a …",
  //       url: "https://www.cnn.com/2023/08/30/politics/overtime-pay-salaried-workers-biden/index.html",
  //       urlToImage:
  //         "https://media.cnn.com/api/v1/images/stellar/prod/230830123322-overtime-salaried-workers.jpg?c=16x9&q=w_800,c_fill",
  //       publishedAt: "2023-08-30T18:52:00Z",
  //       content:
  //         "Some 3.6 million salaried workers would newly qualify for overtime pay under a proposed rule unveiled by the US Department of Labor on Wednesday. It would guarantee overtime pay of at least time-and-… [+2794 chars]",
  //     },
  //     {
  //       source: {
  //         id: null,
  //         name: "YouTube",
  //       },
  //       author: null,
  //       title:
  //         "U.S. job growth slowed sharply to 177,000 in August, below expectations, ADP says - CNBC Television",
  //       description:
  //         "CNBC’s Steve Liesman and ADP chief economist Nela Richardson join 'Squawk Box' to discuss August ADP payrolls data, which slowed more than expected for the m...",
  //       url: "https://www.youtube.com/watch?v=dwgDnfi8Uhs",
  //       urlToImage: "https://i.ytimg.com/vi/dwgDnfi8Uhs/maxresdefault.jpg",
  //       publishedAt: "2023-08-30T18:51:20Z",
  //       content: null,
  //     },
  //     {
  //       source: {
  //         id: null,
  //         name: "Yahoo Entertainment",
  //       },
  //       author: "David Hollerith",
  //       title:
  //         "Grayscale CEO predicts a crypto environment 'we haven’t seen before' after legal win - Yahoo Finance",
  //       description:
  //         'Michael Sonnenshein called his firm\'s courtroom victory over the SEC "overwhelming" in an interview with Yahoo Finance.',
  //       url: "https://finance.yahoo.com/news/grayscale-ceo-predicts-a-crypto-environment-we-havent-seen-before-after-legal-win-184421302.html",
  //       urlToImage:
  //         "https://s.yimg.com/ny/api/res/1.2/g68RXxPM_9Ybt0s_xQ_hWQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD04MDA-/https://s.yimg.com/os/creatr-uploaded-images/2023-03/8f7f2370-bc6b-11ed-bf7f-88934de9c5f8",
  //       publishedAt: "2023-08-30T18:44:21Z",
  //       content:
  //         'Grayscale Investments CEO Michael Sonnenshein predicted that the stage is now set for "an environment around crypto that we havent seen before" after what he called an "overwhelming victory" this wee… [+5158 chars]',
  //     },
  //     {
  //       source: {
  //         id: null,
  //         name: null,
  //       },
  //       author: null,
  //       title: null,
  //       description: null,
  //       url: null,
  //       urlToImage: null,
  //       publishedAt: null,
  //       content: null,
  //     },
  //     {
  //       source: {
  //         id: "usa-today",
  //         name: "USA Today",
  //       },
  //       author: "USA TODAY",
  //       title:
  //         "Burger King lawsuit alleges Whoppers are smaller than advertised - USA TODAY",
  //       description: null,
  //       url: "https://www.usatoday.com/story/money/food/2023/08/30/burger-king-class-action-lawsuit/70717589007/",
  //       urlToImage: null,
  //       publishedAt: "2023-08-30T18:15:31Z",
  //       content: null,
  //     },
  //     {
  //       source: {
  //         id: null,
  //         name: "SFGate",
  //       },
  //       author: "SFGATE",
  //       title:
  //         "Amazon CEO tells remote workers it's 'not going to work out' - SFGATE",
  //       description: null,
  //       url: "https://www.sfgate.com/tech/article/amazon-ceo-return-to-office-policy-18338528.php",
  //       urlToImage: null,
  //       publishedAt: "2023-08-30T18:09:34Z",
  //       content: null,
  //     },
  //     {
  //       source: {
  //         id: null,
  //         name: "Consumerfinance.gov",
  //       },
  //       author: "https://www.facebook.com/CFPB",
  //       title:
  //         "Consumer advisory: Take action when home insurance is cancelled or costs surge - Consumer Financial Protection Bureau",
  //       description:
  //         "Homeowners insurance might get more expensive, or not be renewed at all. Mortgage borrowers can take steps to find more affordable options.",
  //       url: "https://www.consumerfinance.gov/about-us/newsroom/consumer-advisory-take-action-when-home-insurance-is-cancelled-or-costs-surge/",
  //       urlToImage:
  //         "https://s3.amazonaws.com/files.consumerfinance.gov/f/images/cfpb_disasters-protection.png.original.png",
  //       publishedAt: "2023-08-30T17:55:33Z",
  //       content:
  //         "A notice from your insurer dropping your home insurance policy can feel like your largest investment is at risk. Unexpected jumps in the cost of your coverage can put a strain on your budget. And, pr… [+4531 chars]",
  //     },
  //     {
  //       source: {
  //         id: null,
  //         name: "KFOX El Paso",
  //       },
  //       author: "Erika Esquivel",
  //       title:
  //         "Circle K offers discount of 30 cents off fuel in El Paso on Thursday - KFOX El Paso",
  //       description:
  //         "Circle K is offering customers the opportunity to save ahead of Labor Day.",
  //       url: "https://kfoxtv.com/news/local/circle-offers-discount-of-30-cents-off-fuel-in-el-paso-on-thursday",
  //       urlToImage:
  //         "https://kfoxtv.com/resources/media/a4857ddb-df43-45d9-8716-80c5692afb14-large16x9_Copyof_DSC5478_1836.jpg",
  //       publishedAt: "2023-08-30T17:40:03Z",
  //       content: null,
  //     },
  //     {
  //       source: {
  //         id: null,
  //         name: "Investor's Business Daily",
  //       },
  //       author: "Investor's Business Daily",
  //       title:
  //         "Stock Of The Day: Visa Breaks Out For Third Time In 2023 - Investor's Business Daily",
  //       description: null,
  //       url: "https://www.investors.com/research/ibd-stock-of-the-day/visa-stock-breaks-out-for-third-time-this-year/",
  //       urlToImage: null,
  //       publishedAt: "2023-08-30T17:38:00Z",
  //       content: null,
  //     },
  //     {
  //       source: {
  //         id: null,
  //         name: "KTLA Los Angeles",
  //       },
  //       author: "Marc Sternfield",
  //       title:
  //         "This is how much you need to earn to live comfortably in California - KTLA Los Angeles",
  //       description:
  //         "It’s not exactly breaking news that California is among the most expensive states in the nation when it comes to home prices, rent, gasoline, utilities, and, well, most things. Now, a new survey outlines how much someone needs to earn as a “living wage” to li…",
  //       url: "https://ktla.com/news/california/this-is-how-much-you-need-to-earn-to-live-comfortably-in-california/",
  //       urlToImage:
  //         "https://ktla.com/wp-content/uploads/sites/4/2023/07/GettyImages-845028274.jpg?w=1280",
  //       publishedAt: "2023-08-30T17:26:50Z",
  //       content:
  //         "Its not exactly breaking news that California is among the most expensive states in the nation when it comes to home prices, rent, gasoline, utilities, and, well, most things.\r\nNow, a new survey outl… [+4067 chars]",
  //     },
  //     {
  //       source: {
  //         id: "cnn",
  //         name: "CNN",
  //       },
  //       author: "Gregory Wallace",
  //       title:
  //         "American Airlines flight attendants vote to authorize a strike - CNN",
  //       description:
  //         "The latest aviation employees to vote in favor of a strike are American Airlines flight attendants.",
  //       url: "https://www.cnn.com/2023/08/30/business/american-airlines-flight-attendant-strike-authorization/index.html",
  //       urlToImage:
  //         "https://media.cnn.com/api/v1/images/stellar/prod/230828120233-american-airlines-plane-072023.jpg?c=16x9&q=w_800,c_fill",
  //       publishedAt: "2023-08-30T17:11:00Z",
  //       content:
  //         "The latest aviation employees to vote in favor of a strike are American Airlines flight attendants. \r\nThe union representing them, the Association of Professional Flight Attendants, reported a 99.47%… [+1230 chars]",
  //     },
  //     {
  //       source: {
  //         id: null,
  //         name: "CNBC",
  //       },
  //       author: "Megan Sauer",
  //       title:
  //         "28-year-old's side hustle makes up to $113,500 per year—and it only costs $50 to start - CNBC",
  //       description:
  //         "Carter Osborne started editing college admission essays to help pay for grad school in 2017. Now, his side hustle makes up to six figures per year and nearly doubles his income.",
  //       url: "https://www.cnbc.com/2023/08/30/millennials-side-hustle-makes-six-figures-per-yearand-costs-almost-nothing-to-start.html",
  //       urlToImage:
  //         "https://image.cnbcfm.com/api/v1/image/107293851-1693406206397-IMG-6110_2.jpg?v=1693413532&w=1920&h=1080",
  //       publishedAt: "2023-08-30T16:38:52Z",
  //       content:
  //         "This story is part of CNBC Make It's Six-Figure Side Hustle series, where people with lucrative side hustles break down the routines and habits they've used to make money on top of their full-time jo… [+5851 chars]",
  //     },
  //     {
  //       source: {
  //         id: null,
  //         name: null,
  //       },
  //       author: null,
  //       title: null,
  //       description: null,
  //       url: null,
  //       urlToImage: null,
  //       publishedAt: null,
  //       content: null,
  //     },
  //     {
  //       source: {
  //         id: null,
  //         name: "KSL.com",
  //       },
  //       author: ", KSL.com",
  //       title:
  //         "Kum & Go's Utah locations to be rebranded as Maverik gas stations - KSLTV",
  //       description:
  //         "Maverik announced it completed its acquisition of Midwestern chain Kum & Go and will rebrand its Utah and Intermountain West locations as Maveriks.",
  //       url: "https://www.ksl.com/article/50719484/kum--gos-utah-locations-to-be-rebranded-as-maverik-gas-stations",
  //       urlToImage:
  //         "https://ksltv.com/wp-content/uploads/2023/08/29452364.jpeg",
  //       publishedAt: "2023-08-30T15:52:24Z",
  //       content:
  //         "SALT LAKE CITY The Maverik gas station chain announced Tuesday that it completed its acquisition of Midwestern chain Kum &amp; Go and will rebrand its Utah and Intermountain West locations as Maverik… [+2687 chars]",
  //     },
  //     {
  //       source: {
  //         id: "the-washington-post",
  //         name: "The Washington Post",
  //       },
  //       author: "Jeremy Barr",
  //       title:
  //         "CNN hires Mark Thompson as new chief executive, replacing Chris Licht - The Washington Post",
  //       description:
  //         "The former chief executive of the New York Times replaces Chris Licht, who was fired in the spring.",
  //       url: "https://www.washingtonpost.com/media/2023/08/30/mark-thompson-cnn-new-ceo/",
  //       urlToImage:
  //         "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/JFH4KFX6JMN6UG5L7KUEFAUP2Y.JPG&w=1440",
  //       publishedAt: "2023-08-30T15:32:00Z",
  //       content:
  //         "Comment on this story\r\nComment\r\nMark Thompson, the former chief executive of the New York Times, has been selected as the next leader of CNN, parent company Warner Bros. Discovery announced Wednesday… [+6579 chars]",
  //     },
  //   ],
  // };

  console.log("Hello world");

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
