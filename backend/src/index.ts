import express from "express";
import cors from "cors" // npm install --save-dev @types/cors
import cookieParser from "cookie-parser" // npm install --save-dev @types/cookie-parser
import "dotenv/config";
import { APP_ORIGIN, ARCJET_KEY } from "./constants/env";
import { OK } from "./constants/http";
import catchError from "./utils/catchError";
import authRoutes from "./routes/auth.routes";
import errorHandler from "./utils/errorHandler";
import connectToMongoDB from "./config/db";
import passport from "passport" // npm install --save @types/passport-google-oauth20
import "./config/passport";
import arcjet, { detectBot, shield, tokenBucket } from "@arcjet/node";
import { isSpoofedBot } from "@arcjet/inspect";
import openaiRoutes from "./routes/openai.routes";

const app = express();

// allows express server to parse json request bodies.
app.use(express.json());

//  built-in middleware in Express that parses incoming form data and makes it available under req.body.
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    // allow only requests from this frontend orign
    origin: APP_ORIGIN,

    // Allow the frontend to send cookies, authorization headers, or any credentials when making a request.
    credentials: true,
}))


app.use(passport.initialize());

// which lets your backend read cookies sent by the client (like the browser).
app.use(cookieParser());

// app.get("/", catchError(
//     async (req, res, next) => {
//         res.status(OK).json({
//             status : "healthy"
//         })
//     }
// ))
// .use() is a method in express that actually registers the middleware and connects the routes together.
app.use("/auth", authRoutes);
app.use("/processUserInfo", openaiRoutes);

app.use(errorHandler);

const aj = arcjet({
  key: ARCJET_KEY,
  rules: [
    // Shield protects your app from common attacks e.g. SQL injection
    shield({ mode: "LIVE" }),
    // Create a bot detection rule
    detectBot({
      mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only
      // Block all bots except the following
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
        // Uncomment to allow these other common bot categories
        // See the full list at https://arcjet.com/bot-list
        //"CATEGORY:MONITOR", // Uptime monitoring services
        //"CATEGORY:PREVIEW", // Link previews e.g. Slack, Discord
      ],
    }),
    // Create a token bucket rate limit. Other algorithms are supported.
    tokenBucket({
      mode: "LIVE",
      // Tracked by IP address by default, but this can be customized
      // See https://docs.arcjet.com/fingerprints
      //characteristics: ["ip.src"],
      refillRate: 5, // Refill 5 tokens per interval
      interval: 3600, // Refill every hour
      capacity: 5, // Bucket capacity of 5 tokens
    }),
  ],
});

app.get("/", async (req, res) => {
  const decision = await aj.protect(req, { requested: 1 }); // Deduct 1 token from the bucket
  console.log("Arcjet decision", decision);

  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      res.writeHead(429, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Too Many Requests" }));
    } else if (decision.reason.isBot()) {
      res.writeHead(403, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "No bots allowed" }));
    } else {
      res.writeHead(403, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Forbidden" }));
    }
  } else if (decision.ip.isHosting()) {
    // Requests from hosting IPs are likely from bots, so they can usually be
    // blocked. However, consider your use case - if this is an API endpoint
    // then hosting IPs might be legitimate.
    // https://docs.arcjet.com/blueprints/vpn-proxy-detection
    res.writeHead(403, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Forbidden" }));
  } else if (decision.results.some(isSpoofedBot)) {
    // Paid Arcjet accounts include additional verification checks using IP data.
    // Verification isn't always possible, so we recommend checking the decision
    // separately.
    // https://docs.arcjet.com/bot-protection/reference#bot-verification
    res.writeHead(403, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Forbidden" }));
  } else {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Hello World" }));
  }
});



app.listen(3000, async() =>{
    console.log('Server is running on port 3000');  
    await connectToMongoDB();
});
