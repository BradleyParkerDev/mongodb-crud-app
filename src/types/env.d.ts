declare namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      // Add other environment variables here
      MONGODB_URI: string;
      MONGODB_DATABASE_NAME: string;
      ACCESS_TOKEN_SECRET_KEY:string;
      REFRESH_TOKEN_SECRET_KEY:string;
    }
  }
  