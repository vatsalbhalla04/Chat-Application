const corsOptions = {
  origin: [
    "https://chat-application-six-iota.vercel.app",
  
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

const CHAT_TOKEN = "chat-token";

export { corsOptions, CHAT_TOKEN };
