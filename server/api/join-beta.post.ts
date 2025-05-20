export default defineEventHandler(async (event) => {
  const { email } = await readBody(event)

  await supabase.from('beta_signups').insert({ email })
  setResponseStatus(event, 201, 'Created')

  return { message: 'Successfully signed up for beta' }
})
