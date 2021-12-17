export const configuration = () => {
  return {
    environment: process.env.NODE_ENV,
    port: parseInt(process.env.PORT, 10) || 3000,
    db_url: process.env.DB_URL,
    cors_origins: process.env.CORS_ORIGINS
  }
}
