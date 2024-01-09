export const extractUsernameFromEmail = (email: string) => {
  return email.split('@')[0]
}
