/**
 * Site-wide metadata. Everything user-facing here is in Dutch, because it
 * ends up on the page; the keys and comments stay English like the rest of
 * the tooling.
 */
export default {
  title: 'Avonturen in AI-Land',
  description:
    'Mijn blog over AI, (hoger) onderwijs en de combinatie daarvan.',
  // No trailing slash: templates add one. This is a GitHub user-pages repo,
  // so the site serves from the domain root and needs no path prefix.
  url: 'https://lars-derichter.github.io',
  lang: 'nl-BE',
  author: {
    name: 'Lars De Richter',
    email: 'lars.derichter@gmail.com',
  },
  nav: [
    { url: '/blog/', label: 'Blog' },
    { url: '/over-mij/', label: 'Over mij' },
    { url: '/over-deze-site/', label: 'Over deze site' },
  ],
};
