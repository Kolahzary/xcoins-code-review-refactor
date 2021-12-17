export const configuration = () => {
  return {
    environment: process.env.NODE_ENV,
    port: parseInt(process.env.PORT, 10) || 3000,
    mongo_uri: process.env.MONGO_URI,
    cors_origins: process.env.CORS_ORIGINS
  }
}
