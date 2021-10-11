import { supabase } from './utils/supabase'

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
  const { pathname } = new URL(request.url)

  if (pathname.startsWith('/wake-supabase')) {
    return await wakeSupabase()
  }

  return new Response(JSON.stringify(author), {
    headers: { 'content-type': 'application/json' },
  })
}

async function wakeSupabase() {
  let { data: posts, error } = await supabase
  .from('posts')
  .select('id')

  if(error) return new Response(JSON.stringify(error), { headers: { 'content-type': 'application/json' } })

  return new Response(JSON.stringify(posts), { headers: { 'content-type': 'application/json' } })
}

addEventListener('scheduled', event => {
  event.waitUntil(
    handleSchedule(event.scheduledTime)
  )
})

async function handleSchedule(scheduledDate) {
  let { data: posts, error } = await supabase
  .from('posts')
  .select('id')

  if(error) return console.log(error)

  console.log('Running: ' + scheduledDate)
  console.log(posts)
}