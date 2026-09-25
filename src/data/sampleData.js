export const s12Stages = [
  { code: 'S1', name: 'Sovereignty', summary: 'God establishes authority and order.' },
  { code: 'S2', name: 'Sin', summary: 'Human rebellion introduces disorder and death.' },
  { code: 'S3', name: 'Seed', summary: 'Promise and lineage move the story forward.' },
  { code: 'S4', name: 'Separation', summary: 'God distinguishes a covenant people.' },
  { code: 'S5', name: 'Statutes', summary: 'Law orders covenant life.' },
  { code: 'S6', name: 'Scattering', summary: 'Disobedience brings judgment and dispersion.' },
  { code: 'S7', name: 'Servitude', summary: 'Captivity and oppression shape the covenant story.' },
  { code: 'S8', name: 'Sovereign Rule', summary: 'God rules over kings, nations, and redemption.' },
  { code: 'S9', name: 'Signs', summary: 'Prophetic signs identify promised fulfillment.' },
  { code: 'S10', name: 'Sacrifice', summary: 'Atonement and priestly themes point toward redemption.' },
  { code: 'S11', name: 'Savior', summary: 'Messianic fulfillment and deliverance come into focus.' },
  { code: 'S12', name: 'Salvation', summary: 'Restoration, judgment, and kingdom hope culminate the story.' },
];

export const scriptures = {
  'John 1:1': {
    id: 'nt-john-1-1', canon: 'NT', book: 'John', chapter: 1, verse: 1,
    text: 'In the beginning was the Word, and the Word was with God, and the Word was God.',
    s12: 'S11', subjects: ['Identity of Christ'],
  },
  'Isaiah 44:6': {
    id: 'ot-isaiah-44-6', canon: 'OT', book: 'Isaiah', chapter: 44, verse: 6,
    text: 'Thus saith the LORD the King of Israel, and his redeemer the LORD of hosts; I am the first, and I am the last; and beside me there is no God.',
    s12: 'S8', subjects: ['Identity of God'],
  },
  'Hebrews 1:8': {
    id: 'nt-hebrews-1-8', canon: 'NT', book: 'Hebrews', chapter: 1, verse: 8,
    text: 'But unto the Son he saith, Thy throne, O God, is for ever and ever: a sceptre of righteousness is the sceptre of thy kingdom.',
    s12: 'S11', subjects: ['Identity of Christ'],
  },
  'John 8:58': {
    id: 'nt-john-8-58', canon: 'NT', book: 'John', chapter: 8, verse: 58,
    text: 'Jesus said unto them, Verily, verily, I say unto you, Before Abraham was, I am.',
    s12: 'S11', subjects: ['Identity of Christ'],
  },
  'Genesis 49:10': {
    id: 'ot-genesis-49-10', canon: 'OT', book: 'Genesis', chapter: 49, verse: 10,
    text: 'The sceptre shall not depart from Judah, nor a lawgiver from between his feet, until Shiloh come...',
    s12: 'S3', subjects: ['Messianic Promise'],
  },
  'Baruch 4:1': {
    id: 'apoc-baruch-4-1', canon: 'Apocrypha', book: 'Baruch', chapter: 4, verse: 1,
    text: 'This is the book of the commandments of God, and the law that endureth for ever...',
    s12: 'S5', subjects: ['Law and Wisdom'], temporary: true,
  },
};

export const curatedPrecepts = [
  { id: 'p1', source: 'John 1:1', target: 'Isaiah 44:6', title: 'First and last', explanation: 'Compare divine identity language.', provenance: 'curated', subjectIds: ['identity-of-christ','identity-of-god'], chainId: 'identity-chain', sequence: 1 },
  { id: 'p2', source: 'Isaiah 44:6', target: 'Hebrews 1:8', title: 'Son addressed as God', explanation: 'Continue the identity comparison.', provenance: 'curated', subjectIds: ['identity-of-christ'], chainId: 'identity-chain', sequence: 2 },
  { id: 'p3', source: 'Hebrews 1:8', target: 'John 8:58', title: 'Identity claim', explanation: 'Follow the chain into Christological identity language.', provenance: 'curated', subjectIds: ['identity-of-christ'], chainId: 'identity-chain', sequence: 3 },
  { id: 'p4', source: 'Genesis 49:10', target: 'John 1:1', title: 'Promise to fulfillment', explanation: 'Connect messianic promise to New Testament fulfillment.', provenance: 'curated', subjectIds: ['messianic-promise'], chainId: 'messiah-chain', sequence: 1 },
];

export const subjects = [
  { id: 'identity-of-christ', name: 'Identity of Christ', aliases: ['Christology', 'Who is Christ'], summary: 'A structured subject study connecting passages used to examine the identity and role of Christ.', anchors: ['John 1:1'], chainIds: ['identity-chain'], related: ['identity-of-god'] },
  { id: 'identity-of-god', name: 'Identity of God', aliases: ['One God'], summary: 'Passages concerning divine identity, sovereignty, and titles.', anchors: ['Isaiah 44:6'], chainIds: ['identity-chain'], related: ['identity-of-christ'] },
  { id: 'messianic-promise', name: 'Messianic Promise', aliases: ['Messiah', 'Shiloh'], summary: 'Promises and prophetic passages associated with the coming Messiah.', anchors: ['Genesis 49:10'], chainIds: ['messiah-chain'], related: ['identity-of-christ'] },
  { id: 'law-and-wisdom', name: 'Law and Wisdom', aliases: ['Commandments'], summary: 'Law, wisdom, and covenant instruction across the biblical corpus.', anchors: ['Baruch 4:1'], chainIds: [], related: [] },
];

export const chains = [
  { id: 'identity-chain', title: 'Identity of Christ — Core Chain', anchor: 'John 1:1', nodes: ['John 1:1','Isaiah 44:6','Hebrews 1:8','John 8:58'], provenance: 'curated' },
  { id: 'messiah-chain', title: 'Messianic Promise — Core Chain', anchor: 'Genesis 49:10', nodes: ['Genesis 49:10','John 1:1'], provenance: 'curated' },
];

export const demoUser = { id: 'u-demo', name: 'Scripture Builder', email: 'reader@example.com', role: 'user' };
export const demoAdmin = { id: 'u-admin', name: 'Content Admin', email: 'admin@example.com', role: 'admin' };
