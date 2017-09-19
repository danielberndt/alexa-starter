const Alexa = require("alexa-sdk");

const weekDays = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];

const handlers = {
  LaunchRequest: function() {
    this.emit("AwaitQuestion", "Moin!");
  },
  WhichWeekday: function() {
    const todayIndex = new Date().getDay() - 1;
    this.emit(":tell", `Heute ist  ${weekDays[todayIndex]}`);
  },
  ConfirmWeekday: function() {
    const day = this.event.request.intent.slots.day.value; // e.g. montag
    const askedIndex = weekDays.map(d => d.toLowerCase()).indexOf(day);
    const todayIndex = new Date().getDay() - 1;
    const answer =
      askedIndex === todayIndex
        ? `Ja, heute ist ${weekDays[todayIndex]}`
        : `Nein, heute ist ${weekDays[todayIndex]}`;
    this.emit(":tell", answer);
  },
  AwaitQuestion: function(intro) {
    this.emit(":ask", `${intro} Was möchtest du wissen?`);
  },
  "AMAZON.HelpIntent": function() {
    const helpText = "Frage mich nach dem Wochentag oder ob heute beispielsweise Montag ist";
    this.emit("AwaitQuestion", helpText);
  },
  "AMAZON.CancelIntent": function() {
    this.emit(":tell", "Na gut.");
  },
  "AMAZON.StopIntent": function() {
    this.emit(":tell", "Auf wiedersehen");
  },
  Unhandled: function() {
    this.emit("AwaitQuestion", "Das habe ich nicht verstanden.");
  },
};

exports.handler = function(event, context) {
  const alexa = Alexa.handler(event, context);
  alexa.APP_ID = undefined; // replace with APP_ID from developer.amazon.com
  alexa.registerHandlers(handlers);
  alexa.execute();
};
