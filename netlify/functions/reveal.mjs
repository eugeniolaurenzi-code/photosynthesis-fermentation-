const REVEAL_AT = Date.parse('2026-10-30T22:00:00+01:00');
export default async function handler() {
  const headers = { 'content-type':'application/json; charset=utf-8', 'cache-control':'no-store, max-age=0', 'x-robots-tag':'noindex, nofollow' };
  // Never send the location to the browser before the server-side deadline.
  if (Date.now() < REVEAL_AT) return new Response(JSON.stringify({ revealed:false }), {headers});
  const address = Netlify.env.get('LOCATION_ADDRESS') || 'SECRET WINE CELLAR';
  const mapsUrl = Netlify.env.get('LOCATION_MAPS_URL') || '';
  if (!/^https:\/\/(www\.)?(google\.[^/]+\/maps|maps\.app\.goo\.gl|maps\.google\.[^/]+|goo\.gl\/maps)/i.test(mapsUrl)) {
    return new Response(JSON.stringify({ revealed:false, awaitingConfiguration:true }), {headers});
  }
  return new Response(JSON.stringify({ revealed:true, address, mapsUrl }), {headers});
}
export const config = { path: '/.netlify/functions/reveal' };
