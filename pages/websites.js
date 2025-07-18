import { useState } from 'react';
import Head from 'next/head';

const websites = [
  {
    name: 'MarkDown WYSIWYG',
    url: 'https://tridentforu.com/MD_WYSIWYG/',
    description: 'Visual MarkDown editor and viewer',
    image: '/image/md.png',
    tags: ['AI', 'Docs'],
  },
  {
    name: 'YAML WYSIWYG',
    url: 'https://tridentforu.com/YAML_WYSIWYG/',
    description: 'Visual YAML editor and viewer.',
    image: '/image/yaml.png',
    tags: ['YAML', 'Editor', 'WYSIWYG'],
  },
  {
    name: 'JSON WYSIWYG',
    url: 'https://tridentforu.com/JSON_WYSIWYG/',
    description: 'Visual JSON editor and viewer.',
    image: '/image/json.png',
    tags: ['JSON', 'Editor', 'WYSIWYG'],
  },
  {
    name: 'XML WYSIWYG',
    url: 'https://tridentforu.com/XML_WYSIWYG/',
    description: 'Visual XML editor and viewer.',
    image: '/image/xml.png',
    tags: ['XML', 'Editor', 'WYSIWYG'],
  },
  {
    name: 'ChordKit',
    url: 'https://tridentforu.com/ChordKit/',
    description: 'Chord progression and music theory toolkit.',
    image: '/image/chordkit.png',
    tags: ['Music', 'Chord', 'Toolkit'],
  },
  {
    name: 'SchemaForge',
    url: 'https://tridentforu.com/SchemaForge/',
    description: 'WYSIWYG SQL DB editor.',
    image: '/image/schemaforge.png',
    tags: ['SQL', 'Database', 'Editor', 'WYSIWYG'],
  },
  {
    name: 'OmniCloud',
    url: 'https://omnicloud.sh/',
    description: 'A PAAS to abstract and orchestrate one or more IAASs. Deploy your cloud native applications without the hassle. Zero configuration required, maximum performance.',
    image: '/image/omnicloud.png',
    tags: ['Cloud', 'PAAS', 'IAAS', 'Deployment', 'Orchestration'],
  },
  {
    name: 'Horizon',
    url: 'https://horizon.farbeyond.dev/',
    description: 'Horizon provides a scalable and customizable server software development framework solution for multiplayer games and managing real-time communication between players and a limitless number of game servers or Hosts.',
    image: '/image/horizon.png',
    tags: ['Games', 'Server', 'Framework', 'Multiplayer', 'Realtime'],
  },
  {
    name: 'Echo',
    url: 'https://tridentforu.com/Echo/',
    description: 'A web app to echo mic and system audio.',
    image: '/image/echo.png',
    tags: ['Audio', 'WebApp', 'Echo', 'Mic', 'System'],
  },
  {
    name: 'GRNA',
    url: 'https://tridentforu.com/GRNA/',
    description: 'The web app for GitHub Release Notes Aggregator.',
    image: '/image/grna.png',
    tags: ['GitHub', 'Release Notes', 'Aggregator', 'WebApp'],
  },
  {
    name: 'Blog-Pages',
    url: 'https://tridentforu.com/Blog-Pages',
    description: 'A Next.JS-Based Github pages blog.',
    image: '/image/blogpages.png',
    tags: ['Blog', 'Next.js', 'GitHub Pages', 'WebApp'],
  },
  {
    name: 'CSS Site',
    url: 'https://tridentforu.com/css_site',
    description: 'An entire functional webpage made with a single HTML tag and CSS.',
    image: '/image/csssite.png',
    tags: ['CSS', 'HTML', 'Webpage', 'Minimal'],
  },
  {
    name: 'tridentforu.com',
    url: 'https://tridentforu.com/',
    description: 'This website (You know you want to try it)',
    image: '/image/tridentforu.png',
    tags: ['Fun', 'Homepage', 'tridentforu'],
  },
];

export default function WebsitesGallery() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  const filtered = websites.filter(site =>
    site.name.toLowerCase().includes(search.toLowerCase()) ||
    site.description.toLowerCase().includes(search.toLowerCase()) ||
    site.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-black text-gray-100 pb-20">
      <Head>
        <title>Website Gallery</title>
      </Head>
      <div className="max-w-5xl mx-auto px-4 pt-12">
        <h1 className="text-3xl font-bold text-blue-400 mb-6">AMOLED Website Gallery</h1>
        <input
          type="text"
          placeholder="Search websites..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full mb-8 px-4 py-2 rounded-lg bg-gray-900 text-gray-100 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filtered.map(site => (
            <div
              key={site.url}
              className="bg-gray-950 rounded-xl shadow-lg hover:shadow-blue-400/30 transition cursor-pointer border border-gray-800 flex flex-col items-center p-4"
              onClick={() => setSelected(site)}
            >
              <img src={site.image} alt={site.name} className="w-20 h-20 object-contain mb-4 rounded-lg bg-gray-900" />
              <h2 className="text-lg font-semibold text-blue-300 mb-2">{site.name}</h2>
              <p className="text-gray-400 text-sm mb-2 text-center">{site.description}</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {site.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 bg-blue-900 text-blue-300 rounded text-xs">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm">
          <div
            className="bg-gray-950 rounded-2xl shadow-2xl border border-blue-400 w-full max-w-[calc(100vw-80px)] max-h-[calc(100vh-80px)] mx-4 p-0 relative flex flex-col items-center"
            style={{ minHeight: 'calc(100vh - 80px)', minWidth: 'calc(100vw - 80px)' }}
          >
            <button
              className="absolute top-6 right-8 text-gray-400 hover:text-blue-400 text-3xl"
              onClick={() => setSelected(null)}
              aria-label="Close"
            >&#10005;</button>
            <div className="w-full flex flex-col md:flex-row items-center justify-between px-10 pt-10 pb-2">
              <div>
                <h2 className="text-3xl font-bold text-blue-300 mb-2">{selected.name}</h2>
                <p className="text-gray-400 mb-2 text-left text-lg max-w-2xl">{selected.description}</p>
              </div>
              <button
                className="px-6 py-2 bg-blue-400 text-black font-semibold rounded-lg shadow hover:bg-blue-500 transition self-end mt-4 md:mt-0"
                style={{ position: 'absolute', bottom: '40px', right: '40px', zIndex: 10 }}
                onClick={() => window.open(selected.url, '_blank')}
              >Open in New Tab</button>
            </div>
            <div className="w-full flex-1 flex items-center justify-center">
              <div className="w-full h-full bg-black rounded-lg overflow-hidden border border-gray-800" style={{ minHeight: 'calc(100vh - 220px)', padding: 0 }}>
                <iframe
                  src={selected.url}
                  title={selected.name}
                  className="w-full h-full border-none bg-black"
                  sandbox="allow-scripts allow-same-origin allow-popups"
                  style={{ minHeight: 'calc(100vh - 220px)', padding: 0, margin: 0 }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
