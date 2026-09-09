/**
 * Small self-contained pages and tools.
 *
 * Each one lives as plain static files in `public/apps/<slug>/`, so it is
 * served verbatim and never touched by the build — no framework, no bundling,
 * no schema. Drop a folder with an index.html in there, add a row here, done.
 *
 * `thumbnail` is optional — a screenshot, shown beside the entry on /apps/.
 * Save it at roughly 2x its rendered width under public/images/apps/.
 */
export const apps = [
  {
    name: 'Calendar house puzzle',
    href: '/apps/calendar-puzzle/',
    year: '2026',
    description:
      'Solver for the daily calendar puzzle — place every piece so only today’s month and date stay uncovered.',
    // 2x asset; rendered at 108px wide. Screenshot of a solved board.
    thumbnail: '/images/apps/calendar-puzzle.png',
  },
]
