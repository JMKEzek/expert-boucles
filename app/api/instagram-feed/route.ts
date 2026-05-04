import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

interface InstagramGraphPost {
  id: string;
  caption?: string;
  media_url?: string;
  permalink?: string;
  media_type?: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  thumbnail_url?: string;
}

export interface InstagramPost {
  id: string;
  image: string;
  url?: string;
  caption?: string;
}

export interface InstagramFeedResponse {
  posts: InstagramPost[];
}

interface CacheData {
  data: InstagramFeedResponse;
  timestamp: number;
}

const EMPTY_FEED: InstagramFeedResponse = {
  posts: [],
};

const CACHE_DIR = path.join(process.cwd(), '.cache');
const CACHE_FILE = path.join(CACHE_DIR, 'instagram-feed.json');
const CACHE_DURATION = 21600000;
const GRAPH_API_VERSION = 'v19.0';

async function readCache(options: { allowExpired?: boolean } = {}): Promise<InstagramFeedResponse | null> {
  try {
    const content = await fs.readFile(CACHE_FILE, 'utf-8');
    const cached: CacheData = JSON.parse(content);
    const age = Date.now() - cached.timestamp;

    if (age < CACHE_DURATION) {
      console.log(`[Cache] Instagram feed cache hit (${Math.round(age / 1000 / 60)}m)`);
      return cached.data;
    }

    if (options.allowExpired) {
      console.log(`[Cache] Using expired Instagram feed cache (${Math.round(age / 1000 / 60)}m)`);
      return cached.data;
    }

    console.log('[Cache] Instagram feed cache expired');
    return null;
  } catch {
    return null;
  }
}

async function writeCache(data: InstagramFeedResponse): Promise<void> {
  try {
    await fs.mkdir(CACHE_DIR, { recursive: true });
    const cacheData: CacheData = {
      data,
      timestamp: Date.now(),
    };
    await fs.writeFile(CACHE_FILE, JSON.stringify(cacheData, null, 2));
    console.log('[Cache] Instagram feed saved');
  } catch (error) {
    console.error('[Cache] Instagram feed save error:', error);
  }
}

function jsonFeed(data: InstagramFeedResponse, source: string, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: {
      'Cache-Control': 'public, s-maxage=21600, stale-while-revalidate=86400',
      'X-Cache-Source': source,
    },
  });
}

async function jsonWithFallbackCache(source: string, status = 200) {
  const fallbackCache = await readCache({ allowExpired: true });

  if (fallbackCache) {
    return jsonFeed(fallbackCache, 'fallback-cache');
  }

  return jsonFeed(EMPTY_FEED, source, status);
}

export async function GET() {
  try {
    const cachedFeed = await readCache();

    if (cachedFeed) {
      return jsonFeed(cachedFeed, 'file-cache');
    }

    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    const businessAccountId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;

    if (!accessToken || !businessAccountId) {
      console.warn('[API] Missing Instagram configuration');
      return jsonWithFallbackCache('missing-config');
    }

    const url = new URL(`https://graph.facebook.com/${GRAPH_API_VERSION}/${businessAccountId}/media`);
    url.searchParams.append(
      'fields',
      'id,caption,media_url,permalink,media_type,thumbnail_url,timestamp'
    );
    url.searchParams.append('limit', '12');
    url.searchParams.append('access_token', accessToken);

    const response = await fetch(url.toString());

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('[API] Instagram Graph API HTTP error:', errorData);
      return jsonWithFallbackCache('instagram-api-error', 502);
    }

    const data = await response.json();
    const posts: InstagramPost[] = (data.data || [])
      .map((post: InstagramGraphPost) => ({
        id: post.id,
        image: post.thumbnail_url || post.media_url || '',
        url: post.permalink,
        caption: post.caption,
      }))
      .filter((post: InstagramPost) => post.image.length > 0);

    const responseData: InstagramFeedResponse = {
      posts,
    };

    await writeCache(responseData);
    return jsonFeed(responseData, 'instagram-api');
  } catch (error) {
    console.error('[API] Instagram feed API error:', error);
    return jsonWithFallbackCache('server-error', 500);
  }
}
