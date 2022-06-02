const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { user } = require("../controller/login");
const httpModule = require("../util/http");
const http = httpModule();
const User = require("../model/user");

const config = {
  google: {
    clientId: "651816047225-1us03r4vchvce7h51t0c49f4u0ip7ubm.apps.googleusercontent.com",
    clientSecret: "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",
    redirectUri: "http://localhost:3000/callback",
    tokenEndpoint: "https://oauth2.googleapis.com/token",
  },
  // facebook: {
  //   clientId: "",
  //   clientSecret: "",
  //   redirectUri: "",
  //   tokenEndpoint: "",
  // },
  // github: {
  //   clientId: "",
  //   clientSecret: "",
  //   redirectUri: "",
  //   tokenEndpoint: "",
  // },
};

router.post("/login", async (req, res) => {
  const payload = req.body;
  if (!payload) return res.status(400).send("Nice try");

  const code = payload.code;
  const provider = payload.provider;
  if (!code || !provider) return res.status(400).send("Nice try");
  if (Object.keys(config).includes("provider")) return res.status(400).send("Nice try");

  const configProvider = config[provider];
  const link = configProvider.tokenEndpoint;

  // our own http module
  const response = await http.post(link, {
    code: code,
    client_id: configProvider.clientId,
    client_secret: configProvider.clientSecret,
    redirect_uri: configProvider.redirectUri,
    grant_type: "authorization_code",
  });

  if (!response) return res.status(500).send("google error");
  if (response.status !== 200) return res.status(400).send("Nice try");

  const decoded = jwt.decode(response.data.id_token);
  if (!decoded) return res.status(500).send("Provider error");

  // find user if exists
  const key = `providers.${provider}`;
  const user = await User.findOneAndUpdate(
    { [key]: decoded.sub },
    {
      providers: {
        [provider]: decoded.sub,
      },
    },
    {
      new: true,
      upsert: true,
    }
  );

  const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1h" });
  res.status(200).json(token);
});

/* tutorial */
router.post("/", user);
/* tutorial */

module.exports = router;

/*
"https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=651816047225-1us03r4vchvce7h51t0c49f4u0ip7ubm.apps.googleusercontent.com&redirect_uri=http://localhost:3000/callback&scope=openid%20email&prompt=select_account"
*/