// deno-fmt-ignore-file
// biome-ignore format: generated types do not need formatting
// prettier-ignore
import type { PathsForPages, GetConfigResponse } from 'waku/router';

// prettier-ignore
import type { getConfig as File_BlogsIdIndex_getConfig } from './pages/blogs/[id]/index';
// prettier-ignore
import type { getConfig as File_BlogsIndex_getConfig } from './pages/blogs/index';
// prettier-ignore
import type { getConfig as File_Index_getConfig } from './pages/index';

// prettier-ignore
type Page =
| ({ path: '/blogs/[id]' } & GetConfigResponse<typeof File_BlogsIdIndex_getConfig>)
| ({ path: '/blogs' } & GetConfigResponse<typeof File_BlogsIndex_getConfig>)
| ({ path: '/' } & GetConfigResponse<typeof File_Index_getConfig>);

// prettier-ignore
declare module 'waku/router' {
  interface RouteConfig {
    paths: PathsForPages<Page>;
  }
  interface CreatePagesConfig {
    pages: Page;
  }
}
