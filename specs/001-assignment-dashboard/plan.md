# Implementation Plan: assignment-dashboard

**Branch**: `001-assignment-dashboard` | **Date**: 2026-08-09 | **Spec**: /specs/001-assignment-dashboard/spec.md

**Input**: Feature specification from `/specs/001-assignment-dashboard/spec.md`

**Note**: 이 문서는 `/speckit-plan` 명령 결과로 작성되었습니다.

## Summary

대학생용 과제 마감 대시보드는 학생이 과목별 과제를 등록하고, 연체 과제와 마감 임박 과제를 우선적으로 확인하며, 완료율을 요약하는 기능을 제공한다. 이 기능은 웹 표준 우선, 외부 의존성 최소화, 테스트 우선의 헌법 원칙을 고려하여 표준 HTML/CSS/JavaScript 기반 클라이언트 앱으로 설계된다.

## Technical Context

**Language/Version**: TypeScript 5.x 또는 최신 ES 모듈 지원 브라우저 호환 JavaScript

**Primary Dependencies**: 표준 웹 플랫폼 API, 필요한 경우 경량 번들러 `esbuild` 또는 `tsc`만 사용

**Storage**: localStorage — 과목 몇 개와 과제 수십 개 규모에 충분한 단순 영구 저장. 저장소 접근을 추상화한 별도 모듈로 분리하여 향후 데이터가 커질 때 IndexedDB로 전환할 수 있도록 설계한다.

**Testing**: Vitest + DOM 기반 테스트 (JSDOM 또는 브라우저 호환 테스트 러너)

**Target Platform**: 최신 웹 브라우저(데스크톱/모바일), 오프라인 사용 가능 클라이언트 앱

**Project Type**: 프론트엔드 웹 애플리케이션

**Performance Goals**: 500개 과제 기준 2초 이내 렌더링, 사용자 상호작용 지연 100ms 이하

**Constraints**: 웹 표준 우선, 외부 의존성 최소화, 테스트 우선, 로컬 데이터 영구 유지

**Scale/Scope**: 개인 학생용 대시보드, 단일 사용자 로컬 저장 모델, 1화면 중심 UX

## Constitution Check

- **웹 표준 우선**: HTML/CSS/JavaScript 기반으로 구현하며, 접근성과 반응성을 유지하여 Student-First UX를 준수한다.
- **외부 의존성 최소화**: 핵심 로직은 브라우저 API로 구현하고, 추가 라이브러리 도입은 명확한 필요가 있을 때만 허용한다.
- **테스트 우선**: 상태 관리, 저장소 접근, 렌더링 로직에 대한 단위/통합 테스트를 계획 초기부터 포함한다.
- **데이터 저장 방식**: 과제 데이터 규모와 `Simplicity & Maintainability` 원칙을 고려하여 localStorage를 사용한다. 저장소 접근을 한 모듈로 분리해 향후 저장소를 IndexedDB로 전환할 수 있도록 한다.

이 계획은 헌법 원칙과 충돌하지 않으며, 필요 시 추가 위반 사유를 문서화한다.

## Project Structure

### Documentation (this feature)

```text
specs/001-assignment-dashboard/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
└── spec.md
```

### Source Code (proposal)

```text
src/
├── index.html
├── styles.css
├── main.ts
├── storage.ts
├── ui.ts
├── models.ts
└── tests/
    ├── storage.test.ts
    ├── ui.test.ts
    └── models.test.ts
```

**Structure Decision**: 단일 프론트엔드 프로젝트 구조를 채택하여 외부 백엔드 없이 클라이언트 로컬 저장을 중심으로 구현한다.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| 없음 | 헌법 원칙을 준수하며 단순한 웹 앱 구조로 충분함 | 다중 프로젝트 구조는 불필요함 |
