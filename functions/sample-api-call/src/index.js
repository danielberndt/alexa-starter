const Alexa = require("alexa-sdk");
const axios = require("axios");

const TOKEN = process.env.HERMES_TOKEN;

const getHermesInstance = () =>
  axios.create({
    baseURL: "https://api-tracking.hermesworld.com/SISYRestAPIWebApp/V1/sisy-rs/",
  });

const getLatestState = id =>
  getHermesInstance()
    .get("GetLastStatebyIDs", {params: {token: TOKEN, id, lng: "de"}})
    .then(({data}) => {
      console.log(data);
      return data.status && data.status[0];
    });

const handlers = {
  LaunchRequest: function() {
    this.emit("GetState", "Moin!");
  },
  GetState: function(intro) {
    getLatestState("[PAKETID]").then(
      status => {
        this.emit(":tell", `${intro} Dein Status ist ${status}!`);
      },
      error => {
        console.error(error);
        this.emit(":tell", `Fehler: ${error.message} ${TOKEN}`);
      }
    );
  },
  "AMAZON.HelpIntent": function() {
    const helpText = "Frage mich nach dem Wochentag oder ob heute beispielsweise Montag ist";
    this.emit("GetState", helpText);
  },
  "AMAZON.CancelIntent": function() {
    this.emit(":tell", "Na gut.");
  },
  "AMAZON.StopIntent": function() {
    this.emit(":tell", "Auf wiedersehen");
  },
  Unhandled: function() {
    this.emit("GetState", "Das habe ich nicht verstanden.");
  },
};

exports.handler = function(event, context) {
  const alexa = Alexa.handler(event, context);
  alexa.APP_ID = undefined; // replace with APP_ID from developer.amazon.com
  alexa.registerHandlers(handlers);
  alexa.execute();
};
