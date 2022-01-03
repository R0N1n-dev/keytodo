const { Keystone } = require("@keystonejs/keystone");
const { Text } = require("@keystonejs/fields");
const { GraphQLApp } = require("@keystonejs/app-graphql");
const { AdminUIApp } = require("@keystonejs/app-admin-ui");
const { NuxtApp } = require("@keystonejs/app-nuxt");

const { MongooseAdapter: Adapter } = require("@keystonejs/adapter-mongoose");
const PROJECT_NAME = "keynuxtRonin";
const adapterConfig = {
  mongoUri: process.env.MONGO_URI || "mongodb://localhost:27017/KNRTodo",
}; //'mongodb+srv://ronin:harshn355@cluster0.ej1tv.mongodb.net/keynuxtRonin?retryWrites=true&w=majority' };

const keystone = new Keystone({
  adapter: new Adapter(adapterConfig),
  port: process.env.PORT || 3000,
  cookie: {
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24 * 30,
    sameSite: false,
  },
  cookieSecret: process.env.COOKIE_SECRET || "secret",
});

keystone.createList("Todo", {
  schemaDoc: "A list of things which need to be done",
  fields: {
    name: { type: Text, schemaDoc: "This is the thing you need to do" },
  },
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({ name: PROJECT_NAME }),
    new NuxtApp({
      srcDir: "src",
      buildDir: "dist",
    }),
  ],
};
