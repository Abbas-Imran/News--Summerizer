// import React, { useEffect, useState } from "react";

// function ChatComponent() {
//   const [response, setResponse] = useState(null);

//   const apiKey = "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"; // Assuming you've stored the API key in an environment variable

//   useEffect(() => {
//     const fetchData = async () => {
//       const requestOptions = {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer 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`,
//           "OpenAI-Organization": "org-xjEoMWfdEIdxTgCqoMDrWAFW",
//         },
//         body: JSON.stringify({
//           model: "gpt-3.5-turbo",
//           messages: [
//             {
//               role: "system",
//               content: "You are a helpful assistant.",
//             },
//             { role: "user", content: "Say this is a test!" },
//           ],
//           temperature: 0.7,
//         }),
//       };

//       try {
//         const response = await fetch(
//           "https://api.openai.com/v1/chat/completions",
//           requestOptions
//         );
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }

//         const data = await response.json();
//         setResponse(data.choices[0].message.content);
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h1>OpenAI Chat Response:</h1>
//       {response && <p>{response}</p>}
//     </div>
//   );
// }

// export default ChatComponent;
