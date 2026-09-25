import React, { useMemo, useState } from 'react';

const scriptures = {
  'John 1:1': {
    text: 'In the beginning was the Word, and the Word was with God, and the Word was God.',
    s12: 'S11 — Savior',
    subject: 'Identity of Christ',
    precepts: [
      { target: 'Isaiah 44:6', label: 'One God / first and last', provenance: 'curated' },
      { target: 'Hebrews 1:8', label: 'The Son addressed as God', provenance: 'curated' },
    ],
  },
  'Isaiah 44:6': {
    text: 'Thus saith the LORD the King of Israel, and his redeemer the LORD of hosts; I am the first, and I am the last; and beside me there is no God.',
    s12: 'S8 — Sovereignty',
    subject: 'Identity of God',
    precepts: [
      { target: 'Hebrews 1:8', label: 'Compare with Son language', provenance: 'curated' },
    ],
  },
  'Hebrews 1:8': {
    text: 'But unto the Son he saith, Thy throne, O God, is for ever and ever...',
    s12: 'S11 — Savior',
    subject: 'Identity of Christ',
    precepts: [
      { target: 'John 8:58', label: 'Identity comparison', provenance: 'curated' },
    ],
  },
  'John 8:58': {
    text: 'Jesus said unto them, Verily, verily, I say unto you, Before Abraham was, I am.',
    s12: 'S11 — Savior',
    subject: 'Identity of Christ',
    precepts: [],
  },
};

export default function App() {
  const [origin, setOrigin] = useState('John 1:1');
  const [current, setCurrent] = useState('John 1:1');
  const [trail, setTrail] = useState(['John 1:1']);
  const [note, setNote] = useState('');
  const [savedNote, setSavedNote] = useState('');
  const [personalPrecepts, setPersonalPrecepts] = useState([]);
  const [newTarget, setNewTarget] = useState('John 8:58');

  const passage = scriptures[current];
  const allPrecepts = useMemo(() => [
    ...passage.precepts,
    ...personalPrecepts.filter((p) => p.source === current),
  ], [current, passage.precepts, personalPrecepts]);

  function followPrecept(target) {
    if (!scriptures[target]) return;
    setCurrent(target);
    setTrail((items) => [...items, target]);
  }

  function stepBack() {
    setTrail((items) => {
      if (items.length <= 1) return items;
      const next = items.slice(0, -1);
      setCurrent(next[next.length - 1]);
      return next;
    });
  }

  function returnToOrigin() {
    setCurrent(origin);
    setTrail([origin]);
  }

  function resetStudy() {
    setOrigin('John 1:1');
    setCurrent('John 1:1');
    setTrail(['John 1:1']);
  }

  function addPersonalPrecept() {
    if (!newTarget || !scriptures[newTarget]) return;
    setPersonalPrecepts((items) => [
      ...items,
      { source: current, target: newTarget, label: 'My personal precept', provenance: 'personal' },
    ]);
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div>
          <p className="eyebrow">Bible Preceptor</p>
          <h1>Study Scripture without losing your place.</h1>
        </div>

        <nav>
          <button className="nav-item active">Bible Reader</button>
          <button className="nav-item">Subjects</button>
          <button className="nav-item">Search</button>
          <button className="nav-item">Bookmarks</button>
          <button className="nav-item">Notes</button>
        </nav>

        <div className="study-summary">
          <span>Origin</span>
          <strong>{origin}</strong>
          <button onClick={resetStudy}>Reset demo study</button>
        </div>
      </aside>

      <main className="workspace">
        <header className="topbar">
          <div>
            <span className="muted">Current passage</span>
            <h2>{current}</h2>
          </div>
          <div className="top-actions">
            <button onClick={stepBack} disabled={trail.length <= 1}>Back one</button>
            <button className="primary" onClick={returnToOrigin}>Return to {origin}</button>
          </div>
        </header>

        <section className="study-grid">
          <article className="scripture-card">
            <div className="s12-chip">{passage.s12}</div>
            <p className="subject-label">Subject: {passage.subject}</p>
            <p className="scripture-text">{passage.text}</p>

            <div className="note-box">
              <label htmlFor="note">Personal note</label>
              <textarea
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Capture your study insight..."
              />
              <div className="note-actions">
                <span>{savedNote ? 'Saved locally for import prototype' : 'Unsaved'}</span>
                <button onClick={() => setSavedNote(note)}>Save note</button>
              </div>
            </div>
          </article>

          <aside className="precept-panel">
            <div className="panel-heading">
              <span className="muted">Precept Engine</span>
              <h3>Connected Scriptures</h3>
            </div>

            <div className="precept-list">
              {allPrecepts.length === 0 && <p className="empty">No precepts attached to this passage yet.</p>}
              {allPrecepts.map((precept, index) => (
                <button
                  key={`${precept.target}-${index}`}
                  className="precept-card"
                  onClick={() => followPrecept(precept.target)}
                >
                  <div>
                    <strong>{precept.target}</strong>
                    <span>{precept.label}</span>
                  </div>
                  <em>{precept.provenance === 'personal' ? 'My precept' : 'Curated'}</em>
                </button>
              ))}
            </div>

            <div className="add-precept">
              <h4>Add personal precept</h4>
              <select value={newTarget} onChange={(e) => setNewTarget(e.target.value)}>
                {Object.keys(scriptures).filter((ref) => ref !== current).map((ref) => (
                  <option key={ref} value={ref}>{ref}</option>
                ))}
              </select>
              <button onClick={addPersonalPrecept}>Link Scripture</button>
            </div>
          </aside>
        </section>

        <section className="trail-card">
          <div>
            <span className="muted">Study Trail</span>
            <h3>Your path</h3>
          </div>
          <div className="trail">
            {trail.map((ref, index) => (
              <React.Fragment key={`${ref}-${index}`}>
                {index > 0 && <span className="arrow">→</span>}
                <button onClick={() => setCurrent(ref)}>{ref}</button>
              </React.Fragment>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
