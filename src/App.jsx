import React, { useMemo, useState } from 'react';
import { NavLink, Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { chains, curatedPrecepts, demoAdmin, demoUser, s12Stages, scriptures, subjects } from './data/sampleData.js';

const nav = [
  ['/', 'Bible Reader'], ['/subjects', 'Subjects'], ['/search', 'Search'], ['/notes', 'Notes'], ['/bookmarks', 'Bookmarks'], ['/personal-precepts', 'Personal Precepts'], ['/s12', 'S12'], ['/settings', 'Settings'], ['/admin', 'Admin']
];

function useStudyState() {
  const [origin, setOrigin] = useState('John 1:1');
  const [current, setCurrent] = useState('John 1:1');
  const [trail, setTrail] = useState([{ ref: 'John 1:1', cause: 'study-start' }]);
  const [notes, setNotes] = useState([{ id: 'n1', userId: demoUser.id, passage: 'Genesis 49:10', body: 'Follow the promise through the messianic chain.' }]);
  const [bookmarks, setBookmarks] = useState(['John 1:1']);
  const [personalPrecepts, setPersonalPrecepts] = useState([]);

  const openPassage = (ref, cause = 'direct', preserveOrigin = true) => {
    if (!scriptures[ref]) return;
    if (!preserveOrigin) setOrigin(ref);
    setCurrent(ref);
    setTrail((items) => preserveOrigin ? [...items, { ref, cause }] : [{ ref, cause: 'study-start' }]);
  };
  const returnToOrigin = () => { setCurrent(origin); setTrail([{ ref: origin, cause: 'return-origin' }]); };
  const backOne = () => setTrail((items) => {
    if (items.length <= 1) return items;
    const next = items.slice(0, -1); setCurrent(next[next.length - 1].ref); return next;
  });
  return { origin, current, trail, notes, setNotes, bookmarks, setBookmarks, personalPrecepts, setPersonalPrecepts, openPassage, returnToOrigin, backOne };
}

function AppShell({ study, role, setRole }) {
  const location = useLocation();
  const passage = scriptures[study.current];
  return <div className="app-shell">
    <aside className="sidebar">
      <div>
        <p className="eyebrow">Bible Preceptor</p>
        <h1>Study Scripture without losing your place.</h1>
        <p className="sidebar-copy">Scripture → Precepts → Subjects → Context → Return</p>
      </div>
      <nav>{nav.map(([to,label]) => <NavLink key={to} to={to} className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>{label}</NavLink>)}</nav>
      <div className="study-summary">
        <span>Active study origin</span><strong>{study.origin}</strong>
        <span>Current passage</span><strong>{study.current}</strong>
        <button onClick={study.returnToOrigin}>Return to origin</button>
      </div>
    </aside>
    <main className="workspace">
      <header className="topbar">
        <div><span className="muted">{location.pathname === '/' ? 'Scripture workspace' : 'Bible Preceptor MVP'}</span><h2>{location.pathname === '/' ? study.current : pageTitle(location.pathname)}</h2></div>
        <div className="top-actions">
          <div className="s12-mini">{passage?.s12 || 'Unmapped'} · {s12Stages.find(s => s.code === passage?.s12)?.name || 'S12 unavailable'}</div>
          <button onClick={() => setRole(role === 'admin' ? 'user' : 'admin')}>{role === 'admin' ? 'Admin mode' : 'Reader mode'}</button>
        </div>
      </header>
      <Routes>
        <Route path="/" element={<ReaderPage study={study} />} />
        <Route path="/subjects" element={<SubjectsPage study={study} />} />
        <Route path="/subjects/:subjectId" element={<SubjectDetailPage study={study} />} />
        <Route path="/search" element={<SearchPage study={study} />} />
        <Route path="/notes" element={<NotesPage study={study} />} />
        <Route path="/bookmarks" element={<BookmarksPage study={study} />} />
        <Route path="/personal-precepts" element={<PersonalPreceptsPage study={study} />} />
        <Route path="/s12" element={<S12Page study={study} />} />
        <Route path="/settings" element={<SettingsPage role={role} />} />
        <Route path="/admin" element={<AdminPage role={role} />} />
      </Routes>
    </main>
  </div>;
}

function pageTitle(path) {
  if (path.startsWith('/subjects/')) return 'Subject Detail';
  return ({'/subjects':'Subject Library','/search':'Unified Search','/notes':'My Notes','/bookmarks':'Bookmarks','/personal-precepts':'Personal Precepts','/s12':'S12 Context','/settings':'Account & Settings','/admin':'Admin Content'})[path] || 'Bible Preceptor';
}

function ReaderPage({ study }) {
  const passage = scriptures[study.current];
  const stage = s12Stages.find(s => s.code === passage.s12);
  const [draft, setDraft] = useState(study.notes.find(n => n.passage === study.current)?.body || '');
  const [saveState, setSaveState] = useState('Saved');
  const [newTarget, setNewTarget] = useState(Object.keys(scriptures).find(ref => ref !== study.current) || '');
  const precepts = useMemo(() => [...curatedPrecepts.filter(p => p.source === study.current), ...study.personalPrecepts.filter(p => p.source === study.current)], [study.current, study.personalPrecepts]);

  const saveNote = () => {
    setSaveState('Saving…');
    const existing = study.notes.find(n => n.passage === study.current);
    study.setNotes(items => existing ? items.map(n => n.id === existing.id ? {...n, body: draft} : n) : [...items,{id:`n-${Date.now()}`,userId:demoUser.id,passage:study.current,body:draft}]);
    setTimeout(() => setSaveState('Saved'), 250);
  };
  const addPrecept = () => {
    if (!newTarget) return;
    study.setPersonalPrecepts(items => [...items,{id:`up-${Date.now()}`,source:study.current,target:newTarget,title:'My personal precept',explanation:'Private user-created relationship',provenance:'personal',ownerUserId:demoUser.id}]);
  };
  const toggleBookmark = () => study.setBookmarks(items => items.includes(study.current) ? items.filter(x => x !== study.current) : [...items,study.current]);

  return <>
    <section className="origin-bar"><span>Origin <strong>{study.origin}</strong></span><span>Trail steps <strong>{study.trail.length}</strong></span><button onClick={study.backOne} disabled={study.trail.length <= 1}>Back one</button><button className="primary" onClick={study.returnToOrigin}>Return to {study.origin}</button></section>
    <section className="study-grid">
      <article className="scripture-card">
        <div className="reader-toolbar"><div><div className="s12-chip">{passage.s12} — {stage?.name}</div><p className="subject-label">{passage.subjects.join(' · ')}</p></div><button onClick={toggleBookmark}>{study.bookmarks.includes(study.current) ? '★ Bookmarked' : '☆ Bookmark'}</button></div>
        <p className="scripture-text">{passage.text}</p>
        {passage.temporary && <div className="warning">Temporary demonstration Scripture data — not the approved production corpus.</div>}
        <div className="context-strip"><strong>Where am I in the story?</strong><span>{stage?.summary || 'No S12 mapping available.'}</span></div>
        <div className="note-box"><div className="section-row"><label htmlFor="note">Private note</label><span className="save-state">{saveState}</span></div><textarea id="note" value={draft} onChange={e => {setDraft(e.target.value);setSaveState('Unsaved');}} onBlur={saveNote} placeholder="Capture your study insight…"/><small>Prototype autosaves on blur; production storage must be owner-scoped.</small></div>
      </article>
      <aside className="precept-panel">
        <span className="muted">Precept Engine</span><h3>Connected Scriptures</h3>
        <div className="precept-list">{precepts.length === 0 && <EmptyState title="No precepts yet" text="Add a private relationship or continue reading."/>}{precepts.map(p => <button key={p.id} className="precept-card" onClick={() => study.openPassage(p.target, `precept:${p.id}`, true)}><div><strong>{p.target}</strong><span>{p.title}</span></div><em className={p.provenance}>{p.provenance === 'personal' ? 'My precept' : 'Curated'}</em></button>)}</div>
        <div className="add-precept"><h4>Add personal precept</h4><select value={newTarget} onChange={e=>setNewTarget(e.target.value)}>{Object.keys(scriptures).filter(r=>r!==study.current).map(r=><option key={r}>{r}</option>)}</select><button onClick={addPrecept}>Link Scripture privately</button></div>
      </aside>
    </section>
    <Trail study={study}/>
  </>;
}

function Trail({ study }) { return <section className="trail-card"><div className="section-row"><div><span className="muted">Study Trail</span><h3>Origin and meaningful navigation</h3></div><span className="pill">Independent from browser history</span></div><div className="trail">{study.trail.map((step,i)=><React.Fragment key={`${step.ref}-${i}`}>{i>0&&<span className="arrow">→</span>}<button onClick={()=>study.openPassage(step.ref,'trail-jump',true)} title={step.cause}>{step.ref}</button></React.Fragment>)}</div></section> }

function SubjectsPage({ study }) {
  const navigate = useNavigate();
  return <section className="page-card"><div className="page-heading"><div><span className="muted">Subject Engine</span><h3>Enter study through a doctrine, theme, or debate topic</h3></div><input className="search-input" placeholder="Search subjects or aliases…"/></div><div className="card-grid">{subjects.map(s=><article className="content-card" key={s.id}><span className="pill">{s.anchors[0]}</span><h3>{s.name}</h3><p>{s.summary}</p><small>Aliases: {s.aliases.join(', ')}</small><div className="card-actions"><button onClick={()=>navigate(`/subjects/${s.id}`)}>Open subject</button><button className="primary" onClick={()=>{study.openPassage(s.anchors[0],'subject-start',false);navigate('/');}}>Start at anchor</button></div></article>)}</div></section>;
}

function SubjectDetailPage({ study }) {
  const { subjectId } = useParams(); const navigate = useNavigate(); const subject = subjects.find(s=>s.id===subjectId);
  if (!subject) return <NotFoundState/>;
  const relatedChains = chains.filter(c=>subject.chainIds.includes(c.id));
  return <section className="page-card"><button onClick={()=>navigate('/subjects')}>← Subject library</button><div className="detail-hero"><span className="muted">Structured subject entry point</span><h2>{subject.name}</h2><p>{subject.summary}</p><div className="chip-row">{subject.anchors.map(a=><span className="pill" key={a}>Anchor · {a}</span>)}</div></div><div className="two-column"><div><h3>Associated chains</h3>{relatedChains.map(c=><div className="list-row" key={c.id}><div><strong>{c.title}</strong><span>{c.nodes.join(' → ')}</span></div><button onClick={()=>{study.openPassage(c.anchor,'subject-chain',true);navigate('/');}}>Open in Reader</button></div>)}</div><div><h3>Related subjects</h3>{subject.related.map(id=>{const s=subjects.find(x=>x.id===id);return <button className="link-card" key={id} onClick={()=>navigate(`/subjects/${id}`)}>{s?.name}</button>})}</div></div></section>;
}

function SearchPage({ study }) {
  const navigate=useNavigate(); const [query,setQuery]=useState('John 1:1');
  const q=query.toLowerCase();
  const results = [
    ...Object.entries(scriptures).filter(([ref,p])=>ref.toLowerCase().includes(q)||p.text.toLowerCase().includes(q)).map(([ref,p])=>({type:'Scripture',title:ref,subtitle:p.text,action:()=>{study.openPassage(ref,'search-result',true);navigate('/');}})),
    ...subjects.filter(s=>s.name.toLowerCase().includes(q)||s.aliases.some(a=>a.toLowerCase().includes(q))).map(s=>({type:'Subject',title:s.name,subtitle:s.summary,action:()=>navigate(`/subjects/${s.id}`)})),
    ...curatedPrecepts.filter(p=>(p.title+p.explanation).toLowerCase().includes(q)).map(p=>({type:'Precept',title:`${p.source} → ${p.target}`,subtitle:p.title,action:()=>{study.openPassage(p.source,'search-precept',true);navigate('/');}})),
    ...study.notes.filter(n=>n.body.toLowerCase().includes(q)).map(n=>({type:'Private note',title:n.passage,subtitle:n.body,action:()=>{study.openPassage(n.passage,'search-note',true);navigate('/');}})),
  ];
  return <section className="page-card"><div className="page-heading"><div><span className="muted">Unified Search</span><h3>Scripture, subjects, precepts, and your private notes</h3></div></div><input className="search-input large" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Try John 1:1, Messiah, or a note phrase"/><div className="result-list">{results.length===0?<EmptyState title="No matching results" text="No Scripture, subject, precept, or authorized personal-content match was found."/>:results.map((r,i)=><button className="search-result" key={`${r.type}-${i}`} onClick={r.action}><span className="result-type">{r.type}</span><div><strong>{r.title}</strong><p>{r.subtitle}</p></div></button>)}</div></section>;
}

function NotesPage({ study }) { const navigate=useNavigate(); return <section className="page-card"><div className="page-heading"><div><span className="muted">Private study data</span><h3>My Notes</h3></div><span className="privacy-badge">Owner-scoped</span></div>{study.notes.length===0?<EmptyState title="No notes yet" text="Create a note from the Bible Reader."/>:<div className="result-list">{study.notes.map(n=><div className="list-row" key={n.id}><div><strong>{n.passage}</strong><span>{n.body}</span></div><div className="card-actions"><button onClick={()=>{study.openPassage(n.passage,'note-open',true);navigate('/');}}>Open</button><button onClick={()=>study.setNotes(items=>items.filter(x=>x.id!==n.id))}>Delete</button></div></div>)}</div>}</section> }

function BookmarksPage({ study }) { const navigate=useNavigate(); return <section className="page-card"><div className="page-heading"><div><span className="muted">Saved Scripture locations</span><h3>Bookmarks</h3></div></div>{study.bookmarks.map(ref=><div className="list-row" key={ref}><div><strong>{ref}</strong><span>{scriptures[ref]?.text}</span></div><div className="card-actions"><button onClick={()=>{study.openPassage(ref,'bookmark-open',true);navigate('/');}}>Open</button><button onClick={()=>study.setBookmarks(items=>items.filter(x=>x!==ref))}>Remove</button></div></div>)}</section> }

function PersonalPreceptsPage({ study }) { const navigate=useNavigate(); return <section className="page-card"><div className="page-heading"><div><span className="muted">Private structured relationships</span><h3>Personal Precepts</h3></div><span className="privacy-badge">Not curated content</span></div>{study.personalPrecepts.length===0?<EmptyState title="No personal precepts yet" text="Create one from the Reader without changing curated/system content."/>:study.personalPrecepts.map(p=><div className="list-row" key={p.id}><div><strong>{p.source} → {p.target}</strong><span>{p.title}</span></div><div className="card-actions"><button onClick={()=>{study.openPassage(p.source,'personal-precept-open',true);navigate('/');}}>Open</button><button onClick={()=>study.setPersonalPrecepts(items=>items.filter(x=>x.id!==p.id))}>Delete</button></div></div>)}</section> }

function S12Page({ study }) { const current=scriptures[study.current]; return <section className="page-card"><div className="page-heading"><div><span className="muted">S12 Context Engine</span><h3>Where am I in the biblical story?</h3></div><span className="pill">Current · {current.s12}</span></div><div className="s12-grid">{s12Stages.map(stage=><article className={`s12-stage ${current.s12===stage.code?'current':''}`} key={stage.code}><strong>{stage.code} · {stage.name}</strong><p>{stage.summary}</p>{current.s12===stage.code&&<span className="pill">Current passage mapping</span>}</article>)}</div><div className="warning neutral">S12 mappings in MVP are curated records. Unmapped passages must show an unavailable state rather than an AI-generated mapping.</div></section> }

function SettingsPage({ role }) { return <section className="page-card"><div className="page-heading"><div><span className="muted">Account</span><h3>Settings</h3></div></div><div className="settings-grid"><label>Display name<input value={role==='admin'?demoAdmin.name:demoUser.name} readOnly/></label><label>Email<input value={role==='admin'?demoAdmin.email:demoUser.email} readOnly/></label><label>Role<input value={role} readOnly/></label><label>Bible corpus<input value="KJV + Apocrypha — production provider approval pending" readOnly/></label></div></section> }

function AdminPage({ role }) {
  if(role!=='admin') return <UnauthorizedState/>;
  const modules=['Curated Precepts','Precept Chains','Subjects','S12 Stages','S12 Mappings','Content Integrity'];
  return <section className="page-card"><div className="page-heading"><div><span className="muted">Admin area</span><h3>Curated Content Management</h3></div><span className="privacy-badge">Privileged role</span></div><div className="admin-grid">{modules.map(m=><article className="content-card" key={m}><h3>{m}</h3><p>Representative MVP admin surface for creating, editing, archiving, ordering, mapping, and validating curated content.</p><button>Open {m}</button></article>)}</div><div className="integrity-panel"><strong>Content integrity</strong><span>0 broken demo references · 0 orphaned demo mappings</span><small>Production implementation must enforce privileged mutations on the backend/platform, not only in this UI.</small></div></section>;
}

function EmptyState({title,text}) { return <div className="state-card"><strong>{title}</strong><span>{text}</span></div> }
function UnauthorizedState() { return <div className="state-card warning"><strong>Unauthorized</strong><span>This area requires the Admin role. Switch to Admin mode only to inspect the prototype state.</span></div> }
function NotFoundState() { return <div className="state-card"><strong>Not found</strong><span>The requested content does not exist or has been deactivated.</span></div> }

export default function App() {
  const study=useStudyState(); const [role,setRole]=useState('user');
  return <AppShell study={study} role={role} setRole={setRole}/>;
}
