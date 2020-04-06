import library_database from "./library_database.js";

const environment = process.env.NODE_ENV || "development";

const config = {
  server: {
    PORT: 3000
  },
  library_database: library_database[environment],
};


export default config;