addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

const author = {
  name: 'bidipeppercrap',
  email: 'bidipeppercrap@outlook.com',
  phone: '+62 852 5058 5135'
}
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  return new Response(JSON.stringify(author), {
    headers: { 'content-type': 'application/json' },
  })
}
