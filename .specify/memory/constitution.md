# assignment-dashboard Constitution
<!--
Sync Impact Report
Version change: 0.1.0 -> 0.2.0
Modified placeholders:
 - Version bumped to 0.2.0 due to addition of a new principle
 - Added principle: Spec-First Discipline
Added sections: none
Removed sections: none
Follow-up TODOs: none
-->

## Core Principles

### Student-First UX
All user-facing features MUST prioritize clarity, accessibility, and responsiveness.
- Accessibility: UI and APIs MUST meet WCAG AA where applicable.
- Feedback: user actions MUST provide immediate, clear success/error feedback.
- Mobile-first: layouts MUST be responsive and functionally equivalent on small screens.

Rationale: The project serves learners and educators — usability and accessibility
are essential to delivering equitable outcomes.

### Test-First Development
Tests MUST be created or updated before feature implementation.
- Unit tests for business logic are REQUIRED.
- Integration tests for observable user flows (submission, grading, notifications) are REQUIRED.
- CI pipelines MUST block merges when new tests fail or coverage drops on touched code.

Rationale: Ensures regressions are prevented and design decisions remain verifiable.

### Spec-First Discipline
스펙 문서(spec.md)에는 What과 Why만 기술하고, 기술 선택이나 구현 방법(How)은
`plan.md` 이후 단계에서만 다룹니다. 스펙에는 특정 프레임워크나 라이브러리 이름이
등장하면 안 됩니다.

Rationale: Spec-First 접근은 설계 합의와 요구사항 명료화를 우선하며,
구현 선택이 스펙을 제약하지 않도록 보장합니다.

### Privacy & Security (NON-NEGOTIABLE)
Handling of user data MUST follow data minimization and least-privilege principles.
- PII must be stored only when necessary and encrypted at rest and in transit.
- Authentication and authorization controls MUST be enforced for all sensitive endpoints.
- Security issues MUST be reported and triaged according to the project's incident policy.

Rationale: The system processes student data; safeguarding privacy is mandatory.

### Observability & Error Handling
Application components MUST emit structured logs, metrics, and expose health checks.
- Errors MUST include enough context to diagnose failures without leaking secrets.
- Alerting thresholds for key flows (ingestion, grading, background jobs) MUST be defined.

Rationale: Fast detection and clear diagnostics reduce downtime and support burden.

### Simplicity & Maintainability
Code and architecture choices MUST favor simplicity, small surface area, and clear
ownership.
- Avoid premature optimization; prefer readable code and well-scoped modules.
- External dependencies MUST be justified and recorded in the dependency policy.

Rationale: Easier maintenance and onboarding for educators and contributors.

## Additional Constraints
- Dependency management: every third-party dependency MUST have an explicit entry in
	the project's dependency manifest and a declared license approved by maintainers.
- Data retention: default retention for exported/archived student data MUST be specified
	in the project data policy and enforced by automated cleanup jobs.
- Accessibility and privacy compliance reviews SHOULD be performed for major UI changes.

## Development Workflow
- Pull requests MUST include a clear description, related issue reference, and test
	coverage for the change.
- Code review: at least one approving review from a repository maintainer is REQUIRED
	for merges to `main` (or the branch protection target).
- CI gates: linting, tests, and basic security scans MUST pass before merge.
- Releases: follow semantic versioning for the constitution and release notes MUST
	document user-facing or governance changes.

## Governance
This constitution defines governance for design, development, and release practices.

Amendment procedure:
- Proposals to amend the constitution MUST be submitted as a documented PR referencing
	the governance rationale and migration steps.
- Amendments require at least two maintainer approvals and a public comment period of
	7 calendar days before merge unless an emergency is declared.

Versioning policy:
- `MAJOR` increment: backward-incompatible governance changes (principle removal or
	redefinition).
- `MINOR` increment: addition of new principles or materially expanded sections.
- `PATCH` increment: clarifications, wording fixes, and non-semantic refinements.

Compliance expectations:
- All PRs and releases MUST reference this constitution and include a short checklist
	confirming compliance with relevant principles.
- Periodic reviews (quarterly) SHOULD be scheduled to ensure the constitution still
	reflects project needs.

**Version**: 0.2.0 | **Ratified**: 2026-08-09 | **Last Amended**: 2026-08-09
