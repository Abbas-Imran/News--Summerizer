const express = require("express");
require("dotenv").config();
const axios = require("axios");
const router = express.Router();
const newsModel = require("../models/News");
const asyncWrapper = require("../middleware/async");
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post(
  "/",
  asyncWrapper(async (req, res) => {
    const { url, title } = req.body;

    console.log(req.body);

    let news = await newsModel.findOne({ url: url });

    console.log(news);

    if (news) {
      return res.status(200).send({ response: news.text });
    }

    let prompt = `Summerize this news where title: ${title} url: ${url}`;

    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    });

    const text = chatCompletion.choices[0].message.content;
    news = new newsModel({ text: text, url: url });

    await news.save();

    res.json({ response: text });
  })
);
module.exports = router;
