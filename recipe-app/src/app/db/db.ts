import { init, i, id, tx } from "@instantdb/core";

// ID for app: Lenovo-workshop-angular
const API_ID= '1c4cd50c-2e81-44b9-9c26-5f08d7916854';

// Optional: Declare your schema!
const schema = i.schema({
  entities: {
    recipes: i.entity({
      id: i.string(),
      name: i.string(),
      image: i.string(),
      difficulty: i.string(),
      prepTimeMinutes: i.number(),
    }),
  },
});

const db = init({ appId: API_ID, schema });

export { db, schema, id, tx };
