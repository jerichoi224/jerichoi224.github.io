/**
 * All editable site content lives here. Everything else is layout.
 *
 * Work and education are transcribed from your own résumé (the version last
 * committed to the repo, May 2024) — titles, dates, teams and project names all
 * come from there rather than from guesswork.
 *
 * Two things to check:
 *   • email — set to your public GitHub address, not the imagoworks one
 *   • the UVA teaching-assistant role is on the résumé but you didn't mention it
 *     when listing your history; delete that entry if you'd rather not list it
 */

export const profile = {
  name: 'Daniel Choi',
  portrait: '/portrait.webp',
  email: 'jerichoi224@gmail.com',

  links: [
    { label: 'GitHub', href: 'https://github.com/jerichoi224', icon: '/icons/github.svg' },
    { label: 'Instagram', href: 'https://instagram.com/dchoi_pic', icon: '/icons/instagram.svg' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/jerichoi224', icon: '/icons/linkedin.svg' },
  ],

  bio: [
    'I build software in Seoul. Currently at Imagoworks, working on AI-driven 3D dental tools for the browser — mostly the interactive 3D layer, in TypeScript, React and vtk.js.',
    'I was born in Pittsburgh and grew up moving between Northern Virginia and Seoul — close to half my life in each — so I work in English and Korean, and get by in Japanese. I studied computer science at the University of Virginia.',
  ],
  bioAside:
    'Outside of work: photography, coffee, and a long list of half-finished side projects. A few of the finished ones are written up here.',

  // Newest first, matching the order on your résumé (which sorts by end date, so
  // the teaching assistant role sits above the internships it overlapped with).
  career: [
    {
      years: '2023—',
      role: 'Software Engineer',
      org: 'Imagoworks · Seoul',
      logo: '/logos/imagoworks.svg',
      logoScale: 1.15, // longer wordmark than the others, so 65px * 1.15 -> 75px
      current: true,
      detail: {
        summary:
          'Building AI-driven 3D dental software for the web — Dentbird Crown and Dentbird Studio. Mostly the interactive 3D layer: components and features that let users manipulate and visualise dental structures, in TypeScript, React, vtk.js and C++.',
      },
    },
    {
      years: '2021—23',
      role: 'Software Engineer',
      org: 'Fasoo · Seoul',
      logo: '/logos/fasoo.png',
      detail: {
        summary:
          "Developed and maintained the Windows libraries behind Fasoo's enterprise DRM product, working close to the Windows API — including shell development — in C++ and C#.",
      },
    },
    {
      years: '2016—20',
      role: 'Teaching Assistant',
      org: 'University of Virginia',
      logo: '/logos/uva.svg',
      detail: {
        summary:
          'Teaching assistant for Digital Logic Design and Computer Architecture — sequential network design, instruction set architecture, and the hardware implementation of memory systems and virtual memory.',
      },
    },
    {
      years: '2019',
      role: 'Software Engineer Intern',
      org: 'Amazon · EMR team · Seattle',
      logo: '/logos/amazon.svg',
      detail: {
        summary:
          'Replaced a manual trouble-ticket workflow with an automated service that stitched together several internal Amazon APIs, taking the routine handling off the engineers responsible for the queue.',
      },
    },
    {
      years: '2018',
      role: 'Software Engineer Intern',
      org: 'Amazon · IAM team · Seattle',
      logo: '/logos/amazon.svg',
      detail: {
        summary:
          'Built an automated IAM policy scanning tool on top of Amazon Athena and S3, surfaced through a Ruby on Rails app — turning roughly a week of manual review into a few minutes.',
      },
    },
    {
      years: '2016',
      role: 'Software Engineer Intern',
      org: 'Fasoo · Seoul',
      logo: '/logos/fasoo.png',
      detail: {
        summary:
          'Worked with the team building Sparrow, a static program analysis tool. Static analysis needs a corpus of genuinely vulnerable code to test against, so I wrote a crawler that walked the CVE list and collected matching source snippets, categorised by vulnerability type.',
        projects: [{ name: 'CVE WebCrawler', href: '/posts/cve-web-crawler/' }],
      },
    },
  ],

  education: [
    { years: '2020', degree: 'MS, Computer Science', school: 'University of Virginia' },
    { years: '2019', degree: 'BA, Computer Science', school: 'University of Virginia' },
  ],
}

export const nav = [
  { label: 'About', href: '/about/' },
  { label: 'Posts', href: '/posts/' },
  { label: 'Apps', href: '/apps/' },
]
