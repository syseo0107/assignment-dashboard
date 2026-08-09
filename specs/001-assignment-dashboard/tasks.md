# Tasks: assignment-dashboard

**Input**: Design documents from `/specs/001-assignment-dashboard/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/ui-contract.md, quickstart.md

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: 초기 프로젝트 구조를 만든 뒤, 저장소 추상화와 도메인 모델을 정의하여 이후 사용자 스토리별 개발을 독립적으로 실행할 수 있도록 한다.

- [ ] T001 `src/index.html`, `src/styles.css`, `src/main.js`에 기본 HTML/CSS/JavaScript 골격 생성 (30분)
- [ ] T002 [P] `src/storage.js`에 localStorage 지속성 추상화와 JSON 직렬화 헬퍼 구현 (1시간)
- [ ] T003 [P] `src/models.js`에 Subject/Assignment 엔티티 정의, 검증 규칙, D-Day 유틸리티 구현 (1시간)
- [ ] T004 `src/ui.js`에 DOM 렌더 헬퍼와 공통 UI 컴포넌트 함수 작성 (1시간)
- [ ] T005 [P] `tests/`에 초기 테스트 스캐폴드 생성하고 `tests/setup.test.js`에 기본 로드/임포트 스모크 테스트 추가 (30분)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 모든 사용자 스토리에서 공통으로 사용하는 핵심 로직과 저장소, 렌더링 기반을 완성한다.

- [ ] T006 `src/models.js`에 Subject 및 Assignment 검증과 모델 유틸리티 구현 (1시간)
- [ ] T007 `src/models.js`에 연체, 마감 임박, 완료 과제 정렬 및 그룹화 유틸리티 구현 (1시간)
- [ ] T008 `src/storage.js`에 안정적인 기능 인터페이스로 localStorage 저장/로드/삭제 API 구현 (2시간)
- [ ] T009 `src/index.html`에 대시보드 골격과 렌더 컨테이너를 만들고 `src/ui.js`에 초기 렌더 로직 연결 (1시간)
- [ ] T010 `src/main.js`에 애플리케이션 부트스트랩 및 모듈 연결을 구현하여 상태 초기화 후 대시보드 렌더링 (1시간)
- [ ] T011 `tests/storage.test.js`와 `tests/models.test.js`에 저장소 API 및 모델 검증 기초 단위 테스트 추가 (1시간)

---

## Phase 3: User Story 1 - View Upcoming Assignments (Priority: P1) 🎯

**Goal**: 연체 과제를 최상단에 표시하고, 마감 임박 과제를 순서대로 렌더링하며, 완료된 과제를 목록 하단에 모아서 표시한다.

**Independent Test**: 여러 마감일을 가진 과제를 추가한 뒤, 대시보드가 연체 과제를 최상단에 표시하고 마감 임박 순으로 정렬하며, 완료된 과제를 별도 하단 그룹에 표시하는지 검증한다.

- [ ] T012 [US1] `tests/models.test.js`에 정렬 순서, 연체 그룹화, D-Day 계산 단위 테스트 추가 (1시간)
- [ ] T013 [US1] `src/ui.js`에 연체, 마감 임박, 완료 과제 섹션 렌더링 구현 (2시간)
- [ ] T014 [US1] `src/ui.js`에 D-Day 배지 표시 및 라벨 로직 구현 (1시간)
- [ ] T015 [US1] `src/main.js`에 정렬 로직과 대시보드 렌더링 연결을 구현하여 완료 과제가 하단에 표시되도록 보장 (1시간)

---

## Phase 4: User Story 2 - Add and Manage Subjects & Assignments (Priority: P1)

**Goal**: 과목을 생성/삭제하고 과목별로 과제를 추가하여 각 과제가 올바른 과목에 연결되도록 한다.

**Independent Test**: 과목을 생성하고 과제를 추가한 뒤, 과제가 해당 과목에 연결되고 과목 색상이 UI에 표시되는지 검증한다.

- [ ] T016 [US2] `src/ui.js`와 `src/index.html`에 과목 생성 및 삭제 UI 흐름 구현 (2시간)
- [ ] T017 [US2] `src/ui.js`, `src/main.js`, `src/storage.js`에 과제 생성/수정/삭제 흐름 구현 (2시간)
- [ ] T018 [US2] `src/storage.js`와 `src/main.js`에 과목 삭제 시 관련 과제 제거 정책 구현 (1시간)
- [ ] T019 [US2] `tests/storage.test.js`에 과목/과제 생성, 관계 무결성, 삭제 동작 지속성 테스트 추가 (1시간)

---

## Phase 5: User Story 3 - Alerts, Overdue, and Completion (Priority: P1)

**Goal**: 마감 3일 이내 과제를 경고 색상으로 강조하고, 연체 과제와 완료 상태를 명확히 표시한다.

**Independent Test**: 경고 대상 과제, 연체 과제, 완료 처리된 과제를 생성하여 각 상태가 올바르게 표시되는지 검증한다.

- [ ] T020 [US3] `src/styles.css`와 `src/ui.js`에 경고 및 연체 시각 상태 구현 (1시간)
- [ ] T021 [US3] `src/main.js`와 `src/storage.js`에 과제 완료 토글 및 완료 상태 지속성 구현 (1시간)
- [ ] T022 [US3] `tests/ui.test.js`에 완료 토글, 연체 상태, 경고 강조 UI 테스트 추가 (1시간)

---

## Phase 6: User Story 4 - Filtering and Summary (Priority: P2)

**Goal**: 과목별 필터를 제공하고 전체 완료율을 요약하여 사용자가 특정 과목에 집중할 수 있도록 한다.

**Independent Test**: 과목 필터를 적용하여 선택한 과목의 과제만 표시되고, 완료율이 전체/필터 모드에 따라 정확히 계산되는지 검증한다.

- [ ] T023 [US4] `src/ui.js`와 `src/main.js`에 과목 필터 컨트롤 및 필터 렌더링 구현 (1시간)
- [ ] T024 [US4] `src/ui.js`에 완료율 요약 계산 및 표시 구현 (1시간)
- [ ] T025 [US4] `tests/ui.test.js`에 과목 필터링 및 완료율 정확도 통합 테스트 추가 (1시간)

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: 전체 기능을 다듬고, 문서 및 유지보수성을 개선한다.

- [ ] T026 [P] `src/storage.js`와 `src/models.js`를 리팩터링하여 향후 IndexedDB 마이그레이션을 대비하고 localStorage 인터페이스 유지 (1시간)
- [ ] T027 [P] `specs/001-assignment-dashboard/quickstart.md`와 `specs/001-assignment-dashboard/research.md`를 업데이트하여 최종 구현 세부 정보를 반영 (30분)
- [ ] T028 [P] `src/index.html`을 새로 고침하여 브라우저 지속성을 검증하고 localStorage 데이터 유지 여부 확인 (30분)
- [ ] T029 [P] `src/styles.css`와 `src/ui.js`에 반응형 및 접근성 레이아웃 개선 추가 (1시간)
- [ ] T030 [P] `tests/ui.test.js`에 500개 과제 성능 검증 또는 수동 스모크 테스트 노트 추가 (1시간)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1: Setup**: 시작 가능.
- **Phase 2: Foundational**: Phase 1 완료 후 시작.
- **Phase 3-6: User Stories**: Phase 2 완료 후 시작.
- **Phase 7: Polish**: 모든 사용자 스토리 완료 후 시작.

### User Story Dependencies

- **US1**: Foundational 완료 후 독립적으로 구현 가능.
- **US2**: Foundational 완료 후 독립적으로 구현 가능.
- **US3**: Foundational 완료 후 독립적으로 구현 가능.
- **US4**: Foundational 완료 후 독립적으로 구현 가능.

### Parallel Opportunities

- `T002`, `T003`, `T005`는 병렬 실행 가능.
- `T006`과 `T008`은 모듈 경계가 명확하므로 병렬 실행을 검토할 수 있음.
- 사용자 스토리별 작업(`US1`~`US4`)은 Phase 2 완료 후 서로 다른 팀원이 병렬로 진행할 수 있음.
- `Phase 7`의 문서 및 검증 작업은 다른 스토리 개발과 병렬로 진행 가능.

### Implementation Strategy

- MVP는 `US1`, `US2`, `US3` 우선 구현하여 핵심 과제 정렬, 과목/과제 관리, 상태 표시를 완성한다.
- `US4`는 P2로 두 번째 파트에 배치하여 필터링 및 완료율 요약을 추가한다.
- 이후 `Phase 7`에서 유지보수성, 성능, 문서화를 다듬는다.
