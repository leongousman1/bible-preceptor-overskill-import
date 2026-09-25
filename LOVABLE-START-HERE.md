# Bible Preceptor — Lovable Split-Test Recovery Directive

## Purpose

This branch is the **Lovable challenger** in a controlled split test against the existing OverSkill-derived Bible Preceptor implementation on `main`.

The imported application gives Lovable a working artifact, but not all of the process and product-governance context that informed the control implementation. This file restores that missing context before Lovable is allowed to build further.

The goal is not to make Lovable imitate OverSkill's backend. The goal is to give Lovable the same product truth and governing development discipline, then let Lovable demonstrate its own strongest implementation.

---

# 1. Split-Test Rule

The existing OverSkill implementation is the **control**.

This branch is the **challenger**.

Do not alter the control. Do not treat OverSkill's technical implementation as automatically authoritative for Lovable.

Lovable is being evaluated on:

1. product comprehension
2. instruction adherence
3. UX quality
4. architecture quality
5. implementation robustness
6. security
7. maintainability
8. speed
9. founder workload
10. unnecessary external dependencies
11. cost efficiency
12. fidelity to the approved MVP

Lovable should solve the same founder-defined product problem using its strongest native capabilities.

---

# 2. Founder / Builder Boundary

The founder controls the **WHAT** and the governing **HOW**.

The founder controls:

- what Bible Preceptor is
- who it serves
- why it exists
- MVP scope
- domain terminology
- Bible-study methodology
- Scripture/precept semantics
- S12 semantics
- Subject semantics
- Study Trail behavior
- Return-to-Origin behavior
- curated versus personal content rules
- privacy expectations
- security outcomes
- information architecture
- UX intent
- development sequence
- approval gates

Lovable controls ordinary implementation decisions such as:

- internal component architecture
- database implementation
- state management
- APIs
- query design
- migrations
- indexes
- testing implementation
- deployment mechanics
- routine security implementation
- refactoring

Do not ask the founder to make ordinary senior-engineering decisions.

Do not allow implementation convenience to redefine the product.

---

# 3. Software Secrets Development Doctrine

This project follows the adopted **Software Secrets** discipline.

The governing rule is:

# DESIGN FIRST. PROGRAM LAST.

The development sequence is:

**Why → User Structure → Mind Map → Page Inventory → Wireframes → Visual Design → Programming → Hardening → Launch → Iteration**

Do not jump from ZIP analysis directly into production implementation merely because code generation makes that easy.

Substantial work in the early stages already exists in the control artifact and founder project context. Recover it rather than restarting discovery unnecessarily.

For the current branch, implementation is gated until the Recovery Report in Section 16 is produced and approved.

---

# 4. Product Definition

Bible Preceptor is not primarily a generic Bible-reading app.

It is a:

# CONTEXTUAL SCRIPTURE-TO-SCRIPTURE STUDY SYSTEM

Its core study loop is:

**Scripture → Context → Precept → Scripture → Additional Precepts → Subjects**

while maintaining an independent study-navigation system so the user does not lose the original passage, the active subject, or larger biblical context.

The product north star is:

> The user can move deeply through Scripture without losing the original passage, the subject being studied, or the larger biblical context.

---

# 5. Core Product Engines

## A. Bible Reader

Scripture is the primary study surface.

The user must be able to:

- navigate books
- navigate chapters
- select verses/passages
- view Scripture
- see available precepts
- see relevant subjects
- see S12 context
- create notes
- create bookmarks
- create personal precepts

Scripture is the visual anchor. Supporting systems must not overwhelm it.

---

## B. Precept Engine

A precept is a structured **directional Scripture-to-Scripture relationship**.

It is not merely:

- a note
- a tag
- a generic cross-reference

Conceptually:

**SOURCE SCRIPTURE → PRECEPT → TARGET SCRIPTURE**

A precept may include:

- source passage
- target passage
- title
- explanation
- subject association
- chain membership
- chain order
- provenance

### Curated Precepts

Shared system knowledge maintained by authorized administrators.

### Personal Precepts

Private user-created Scripture relationships.

Personal precepts:

- belong only to their owner
- must not silently alter curated content
- must remain visually distinguishable from curated content
- should participate naturally in study navigation

Do not collapse curated and personal provenance merely because a shared storage model is convenient.

---

## C. Study Trail Engine

Browser history is not sufficient.

Maintain separate concepts for:

### Origin
Where the study began.

### Current Location
Where the reader currently is.

### Trail
The ordered study path that led there.

The application must support:

**Back One Step**

and

**Return to Origin**

without destroying study context.

Example:

**John 1:1 → Genesis 1:1 → Psalm 33:6 → Hebrews 1:2**

The user must be able to navigate backward and ultimately return to John 1:1.

This is a defining product capability.

A reusable Precept Chain is not the same object as a user's temporary Study Trail.

---

## D. Subject Engine

Subjects are structured thematic or doctrinal entry points into Scripture.

Examples may include:

- Trinity
- Christmas
- Sabbath
- Israel
- Salvation
- Marriage
- Law

A subject can include:

- canonical name
- aliases
- summary
- anchor Scripture
- relevant Scriptures
- precept chains
- related subjects

A Subject is not merely a tag.

The user should be able to enter a subject and quickly begin the relevant Scripture/precept chain.

---

## E. S12 Context Engine

S12 answers:

> Where am I in the biblical story?

S12 context should remain available throughout Scripture study without overpowering the Bible text.

S12 context follows the **current passage** and must not overwrite the Study Trail origin.

Only approved mappings may be shown.

If no approved mapping exists, show an explicit unmapped state.

Never invent theological mappings.

---

# 6. Search

The intended unified search experience eventually spans:

- Scripture
- subjects
- subject aliases
- curated precepts
- precept chains
- user notes
- personal precepts
- useful bookmark metadata

Search results must be typed and must obey the same ownership/visibility rules as direct reads.

Private user data must remain owner-scoped.

---

# 7. Private Study System

Private user capabilities include:

- notes
- bookmarks
- personal precepts

These should feel like extensions of Bible study rather than disconnected mini-applications.

Private data must never leak across users.

---

# 8. Admin System

Administrative functionality eventually manages shared curated content such as:

- subjects
- aliases
- curated precepts
- precept chains
- Scripture relationships
- S12 mappings

Admin mutations require privileged backend/platform authorization.

Do not rely on hidden UI controls alone.

Data integrity should eventually prevent:

- broken Scripture references
- malformed chains
- invalid ordering
- unauthorized modification
- unintended provenance changes

Do not overbuild the admin system during the split-test recovery phase.

---

# 9. Scripture Corpus Boundary

The required direction is:

**KJV + Apocrypha**

However, the exact production corpus/provider, rights basis, book inventory/order, structured import format, normalization rules, and stable identifier scheme remain an owner-approval gate.

Temporary/sample Scripture data may be used for prototyping.

Do not represent temporary demo Scripture as the final production corpus.

Do not silently make a permanent Scripture-provider decision.

---

# 10. Security Outcomes

Security is an engineering responsibility.

The founder should not need to manually assemble a collection of third-party security products.

Eventually the application must enforce:

- authenticated identity
- private-data ownership
- server/backend authorization
- protected administrative operations
- private notes
- private personal precepts
- private bookmarks
- secure sessions
- safe validation
- safe handling of secrets
- appropriate destructive-action safeguards
- no cross-user search leakage

Hiding a control in the UI is not authorization.

---

# 11. Native-First Infrastructure Rule

When implementation begins, prefer native or managed Lovable capabilities when they can robustly satisfy the requirement.

Do not require external services merely because they are common.

Do not automatically ask the founder to connect:

- Supabase
- a separate database service
- OAuth vendors
- third-party authentication
- external hosting
- separate security products
- miscellaneous APIs

If an external dependency is genuinely necessary, first explain:

1. why it is required
2. why the native option is insufficient
3. expected cost
4. vendor lock-in implications
5. viable alternatives

Then wait for founder approval.

---

# 12. Database / Data-Model Principle

Do not treat any previously suggested sample schema as an approved final schema.

When production implementation is authorized, design the data model to preserve the product semantics.

Favor:

- stable canonical Scripture identities
- relational integrity
- explicit relationships
- enforceable ownership
- ordered chain membership
- clear provenance
- migrations
- referential integrity

Avoid:

- arbitrary display strings used as permanent identity
- arrays used as pseudo-relational tables when real relationships are required
- duplicated domain truth
- convenience structures that weaken integrity

Do not build the production data model during the recovery phase.

---

# 13. MVP Boundary

The MVP must prove the central loop:

# Scripture → Context → Precept → Scripture → Trail → Return

Everything in MVP should support that loop.

Do not add functionality merely because generation is inexpensive.

Do not independently add:

- AI doctrinal reasoning/tutor
- social feeds
- community features
- public publishing
- debate rooms
- church/ministry management
- LMS/course platform
- marketplace features
- gamification
- collaboration systems
- unrelated integrations
- generic Bible-app feature creep

unless explicitly approved.

---

# 14. Imported Prototype Boundary

The current repository is an executable product-shape prototype and control artifact.

It represents important behavior, routes, states, and distinctions, but it is **not permission to freeze every technical implementation choice**.

Preserve product truth such as:

- Scripture identity as structured/stable data
- directional Precepts
- curated vs personal provenance
- Precept Chain vs Study Trail distinction
- structured Subjects
- S12 following current passage
- private owner-scoped data
- typed search visibility rules
- privileged admin mutation rules

Lovable may later choose a different implementation if it preserves the approved behavior and passes acceptance criteria.

---

# 15. Previous Lovable Assumptions Must Be Reclassified

Lovable previously proposed implementation choices including:

- Lovable Cloud
- Postgres
- a specific relational schema
- authentication implementation
- RLS policies
- Tailwind/shadcn
- a rebuild sequence

These were proposals, not automatically founder-approved requirements.

Separate every decision into one of these categories:

1. **Product requirement**
2. **Approved constraint**
3. **Current prototype behavior**
4. **Lovable implementation proposal**
5. **Unknown / requires clarification**

Do not promote category 4 into category 1 without approval.

---

# 16. Required Product + Process Recovery Report

Before any new build work, produce a report with exactly these sections:

## A. Product Thesis

Explain Bible Preceptor in your own words in no more than 3 paragraphs.

## B. Core Product Invariants

Identify the requirements that must survive any implementation, paying particular attention to:

- Scripture
- Precepts
- Study Trail
- Origin
- Subjects
- S12
- curated content
- personal content
- ownership/privacy

## C. Software Secrets Status

Classify each stage as:

**Completed / Substantially Completed / Partial / Not Started / Unknown**

Stages:

1. Why
2. User Structure
3. Mind Map
4. Page Inventory
5. Wireframes
6. Designer Qualification
7. Visual Page Design
8. Programming
9. Hardening
10. Launch

Explain each classification briefly.

## D. ZIP / Repository Assessment

Classify what you discovered into:

### Preserve
### Improve
### Reconsider
### Defer

Important: **Reconsider does not mean permission to change it.**

## E. Previous Assumptions

Identify every significant technical or product assumption from the earlier Lovable analysis that was not directly established by founder requirements or the imported repository.

Include at least:

- database
- authentication
- hosting
- schema
- state architecture
- UI framework
- security implementation

## F. Lovable-Native Implementation Strategy

Without building anything, explain how Lovable could implement the product using its strongest native capabilities while minimizing unnecessary external accounts and founder setup work.

Distinguish:

- native capabilities
- optional external dependencies
- dependencies that would truly require approval

## G. Split-Test Plan

Propose the smallest fair test that allows the founder to compare Lovable against the existing OverSkill control before spending materially more money.

The test should compare at least:

- product fidelity
- UX
- implementation quality
- security burden
- external dependencies
- founder intervention
- cost/credits
- maintainability

---

# 17. Recovery-Phase Stop Gate

After producing the Product + Process Recovery Report:

# STOP.

Do not:

- start coding
- create or migrate database tables
- provision a backend
- configure authentication
- redesign pages
- connect external services
- set up hosting
- create production APIs
- expand MVP scope

Wait for founder approval of the recovered operating model.

---

# 18. Later Split-Test Sequence

If the Recovery Report is approved, the intended test proceeds in rounds:

## Round 1 — Comprehension
Can Lovable accurately recover the product and process?

## Round 2 — Design
Can Lovable produce a superior Study Workspace while preserving the product invariants?

## Round 3 — Vertical-Slice Implementation
Can Lovable implement one approved end-to-end study flow with minimal external setup?

Representative vertical slice:

**Identity → Open Scripture → See S12 → Follow Precept → Study Trail → Return to Origin → Create Note → Save/Resume**

## Round 4 — Comparison
Compare Lovable against the control on fidelity, UX, architecture, security, maintainability, cost, speed, and founder workload.

Only after passing these gates should Lovable be authorized to rebuild the broader application.

---

# 19. Golden Rule

# Never allow implementation convenience to redefine the product.

When in doubt, preserve the founder-approved product semantics and surface the decision instead of silently changing them.
