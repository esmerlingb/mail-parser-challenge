const DEFAULT_PORT = '3000'

export default (): Record<string, any> => ({
  port: parseInt(process.env.PORT ?? DEFAULT_PORT, 10),
  isProduction: process.env.NODE_ENV === 'production'
})
