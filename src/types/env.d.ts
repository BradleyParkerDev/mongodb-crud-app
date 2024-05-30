declare namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      // Add other environment variables here
      MONGODB_URI: string;
      MONGODB_DATABASE_NAME: string;

    }
  }
  