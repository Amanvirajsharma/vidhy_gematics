const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`

export const siteImages = {
  hero: [
    {
      src: u('photo-1541888946425-d81bb19240f5', 2400),
      alt: 'Construction site for engineering survey work',
    },
    {
      src: u('photo-1503387762-592deb58ef4e', 2400),
      alt: 'Building construction and site development',
    },
  ],
  about: {
    src: u('photo-1504307651254-35680f356dfd'),
    alt: 'Survey and construction crew on a project site',
  },
  promise: {
    src: u('photo-1504309092620-4d0ec726efa4'),
    alt: 'Engineer reviewing construction drawings on site',
  },
  services: [
    { src: u('photo-1590496793929-36417d3117de'), alt: 'Land surveying on a construction site' },
    { src: u('photo-1581091226825-a6a2a5aee158'), alt: '3D scanning and industrial measurement' },
    { src: u('photo-1487956382158-bb926046304a'), alt: 'As-built survey of a building' },
    { src: u('photo-1473968512647-3e447244af8f'), alt: 'Aerial drone mapping over a project' },
    { src: u('photo-1581092918056-0c4c3acd3789'), alt: 'Geotechnical investigation on site' },
    { src: u('photo-1558618666-fcd25c85cd64'), alt: 'Tunnel survey inside an underground corridor' },
  ],
  featured: [
    { src: u('photo-1503387762-592deb58ef4e'), alt: 'Land survey on a construction project' },
    { src: u('photo-1473968512647-3e447244af8f'), alt: 'Drone mapping a construction site' },
    { src: u('photo-1578575437130-527eed3abbec'), alt: 'Track survey along railway infrastructure' },
  ],
  cases: [
    { src: u('photo-1545558014-8692077e9b5c'), alt: 'Bridge and infrastructure survey' },
    { src: u('photo-1513828583688-c52646db42da'), alt: 'Highway construction mapping' },
    { src: u('photo-1515162816999-a0c47dc192f7'), alt: 'Road and urban development survey' },
  ],
  cta: {
    src: u('photo-1541888946425-d81bb19240f5', 2000),
    alt: '',
  },
}
