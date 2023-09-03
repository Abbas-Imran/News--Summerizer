import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function NewsTypeContainer(props) {
  const  {activeNewsType, handleNewsType, newsTypes} = props;

  return (
    <div>
      <Box sx={{display: "flex", justifyContent:"Center", gap:"1rem", flexWrap:"wrap", padding:"10px 0"}}>
        {props.newsTypes.map((newsType, index) => {
          return (
            <Button
            key={index}
              variant="text"
              onClick={() => handleNewsType(newsType)}
              sx={{
                color: "#333",
                fontWeight: "500",
                backgroundColor:
                  activeNewsType === newsType ? "#FFECEE !important" : "transparent",
                  color: activeNewsType === newsType ? "#F7625E" : "inherit",
                  borderRadius:"20px"
              }}
            >
              {newsType}
            </Button>
          );
        })}
      </Box>
    </div>
  );
}

export default NewsTypeContainer;