# Bible Preceptor — OverSkill Import Prototype v0.2

This public repository exists only to support OverSkill's public GitHub import/rebuild workflow. It is an **MVP-shaped executable prototype**, not the authoritative Bible Preceptor specification and not the original private repository.

## What OverSkill should infer from this app

Bible Preceptor is a Scripture-navigation and Bible-study system whose primary workspace is Scripture. The user should be able to move deeply through connected passages without losing the original passage, active subject, or larger S12 context.

### Foundational product engines

- Bible Reader
- Precept Engine
- Subject Engine
- S12 Context Engine

### Required supporting systems represented here

- Study Trail / Return-to-Origin
- Private notes
- Bookmarks
- Personal precepts
- Unified Search
- Account / settings
- Representative Admin content-management surfaces
- Loading/empty/unauthorized/not-found style patterns
- Responsive/mobile reuse

## Representative routes

- `/` — Study Workspace / Bible Reader
- `/subjects` — Subject Library
- `/subjects/:subjectId` — Subject Detail
- `/search` — Unified Search
- `/notes` — My Notes
- `/bookmarks` — Saved Scripture
- `/personal-precepts` — Personal Precepts
- `/s12` — S12 Overview / current context
- `/settings` — Account / Settings
- `/admin` — Curated-content administration

The Reader itself demonstrates the important first-class states that may not require separate routes: current Scripture, selected context, Precept Panel, S12 indicator, Study Trail, origin anchor, Back One, Return to Origin, private-note editing/autosave state, bookmark state, and personal-precept creation.

## Domain distinctions that must survive a native rebuild

- Scripture identity is structured/stable data, not only a display string.
- A Precept is a **directional Scripture-to-Scripture relationship**, not a note.
- Curated/system precepts and private personal precepts are different provenance/ownership classes.
- A reusable Precept Chain is not the same object as a user's temporary Study Trail.
- A Subject is a structured study entry point with anchor Scripture, associated chains/precepts, aliases, and related subjects—not merely a tag.
- S12 context follows the **current passage** and must not overwrite the Study Trail origin.
- Notes, bookmarks, and personal precepts are private owner-scoped data.
- Search results are typed and must obey the same ownership/visibility rules as direct reads.
- Admin mutations of curated content require privileged backend/platform authorization.

## First vertical slice represented

`Authenticate/identity -> Open Scripture -> See S12 -> Follow Precept -> Study Trail -> Return to Origin -> Create Note -> Autosave state -> Resume-ready domain structure`

The import prototype uses a demo identity rather than production authentication because OverSkill's native rebuild supplies its own login/database capabilities.

## Content boundary

The product requirement is **KJV + Apocrypha**, but the exact production corpus/provider remains an owner-approval gate. Scripture and study records in this public repository are temporary demonstration data only. They must not be represented as the final licensed/approved production corpus.

## Scope boundary

Do not infer these as MVP requirements: AI doctrinal reasoning/tutor, social/community features, marketplace, public publishing, debate rooms, ministry management, LMS/course platform, or other speculative adjacent features.

## Authority boundary

The private Bible Preceptor product/design repository and approved Figma remain the source of truth. This public repository is a safe, disposable executable representation intended to make OverSkill's import analyzer understand the shape and behavior of the approved MVP.
