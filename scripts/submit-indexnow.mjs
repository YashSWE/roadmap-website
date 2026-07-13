const HOST = "roadmap.behumoury.com";
const KEY = "b1e4f9b8c7d6a5e4f3a2b1c0d9e8f7a6";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;

async function fetchSitemapUrls() {
  const res = await fetch(SITEMAP_URL);
  if (!res.ok) throw new Error("Failed to fetch sitemap: " + res.status);
  const xml = await res.text();
  const urls = [];
  const regex = /<loc>(.*?)<\/loc>/g;
  let match;
  while ((match = regex.exec(xml)) !== null) {
    urls.push(match[1]);
  }
  return urls;
}

async function submitToIndexNow(urls) {
  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls
  };

  console.log(`Submitting ${urls.length} URLs to IndexNow...`);
  
  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    console.log("Successfully submitted to IndexNow! Search engines like Bing will crawl these URLs shortly.");
  } else {
    console.error("Failed to submit to IndexNow:", res.status, await res.text());
  }
}

async function main() {
  try {
    const urls = await fetchSitemapUrls();
    if (urls.length === 0) {
      console.log("No URLs found in sitemap.");
      return;
    }
    await submitToIndexNow(urls);
  } catch (e) {
    console.error(e);
  }
}

main();
