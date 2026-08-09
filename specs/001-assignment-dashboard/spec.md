# Feature Specification: assignment-dashboard

**Feature Branch**: `###-assignment-dashboard`

**Created**: 2026-08-09

**Status**: Draft

**Input**: User description: "대학생용 과제 마감 대시보드. 사용자는 과목(과목명, 색상)을 등록하고, 각 과목에 과제(제목, 설명, 마감일시)를 추가할 수 있다. 대시보드에는 모든 과제가 마감일 순으로 정렬되어 표시되고, 각 과제에 D-Day가 계산되어 보인다. 마감 3일 이내 과제는 경고 색상, 마감이 지난 과제는 연체 표시된다. 과제를 완료 처리하면 목록에서 구분되어 보이고, 과목별로 필터링할 수 있다. 완료율(전체 대비 완료 과제 비율)이 요약 영역에 표시된다. 앱을 껐다 켜도 데이터가 유지된다."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - View Upcoming Assignments (Priority: P1)

학생으로서, 나는 연체된 과제가 최상단에 표시되고 그 다음 마감 임박 순으로 과제가 정렬되며, 완료된 과제는 목록 하단에 모아서 표시되기를 원한다.

**Why this priority**: 핵심 가치 — 중요한 연체 과제와 긴급 과제를 먼저 확인하고 완료 과제는 별도로 관리할 수 있다.

**Independent Test**: 서로 다른 마감일을 가진 여러 과제를 과목별로 추가하고, 대시보드가 연체 과제를 최상단에 표시한 뒤 마감 임박 과제 순으로 정렬하고, 완료된 과제를 목록 하단에 모아서 표시하는지 확인한다.

**Acceptance Scenarios**:

1. **Given** the user has assignments across subjects, **When** they open the dashboard, **Then** overdue assignments appear first, followed by near-due assignments ordered by due date.
2. **Given** current datetime is X, **When** an assignment is due at Y, **Then** the D-Day displayed equals floor(days between X and Y) with clear indication for same-day due.

---

### User Story 2 - Add and Manage Subjects & Assignments (Priority: P1)

학생으로서, 나는 과목(이름 + 색상)을 생성하고 각 과목 아래에 과제를 추가하여 코스별로 작업을 정리할 수 있기를 원한다.

**Why this priority**: 대시보드의 기본 데이터 모델이기 때문이다.

**Independent Test**: 과목을 생성하고 과제를 추가하여, 과제가 해당 과목에 연결되고 과목 색상이 UI 요약에 표시되는지 확인한다.

**Acceptance Scenarios**:

1. **Given** the user creates a subject with a name and color, **When** they add an assignment under that subject, **Then** the assignment references that subject and the UI shows the subject color.
2. **Given** a subject exists, **When** the user deletes the subject, **Then** either its assignments are deleted or reassigned according to documented project policy (see Assumptions).

---

### User Story 3 - Alerts, Overdue, and Completion (Priority: P1)

학생으로서, 나는 마감 임박 과제가 강조되고 연체 과제가 표시되며 과제를 완료 처리하여 진행 상태를 추적할 수 있기를 원한다.

**Why this priority**: 긴급 및 연체 과제를 쉽게 확인하면 마감일 누락을 예방할 수 있다.

**Independent Test**: 마감일이 3일 이내인 과제와 이미 지난 과제를 생성하여, 경고/연체 시각 효과가 올바르게 표시되고 완료 처리 시 항목이 구분되는지 확인한다.

**Acceptance Scenarios**:

1. **Given** an assignment due within 3 calendar days, **When** displayed, **Then** it is highlighted with a warning color.
2. **Given** an assignment past its due datetime, **When** displayed, **Then** it is marked as overdue.
3. **Given** an assignment marked complete, **When** viewing the dashboard, **Then** completed assignments are visually distinct and excluded from the default "active" list.

---

### User Story 4 - Filtering and Summary (Priority: P2)

학생으로서, 나는 과목별로 과제를 필터링하고 전체 완료율을 확인하여 특정 과목에 집중하고 진행 상황을 추적할 수 있기를 원한다.

**Why this priority**: 과목 중심 학습과 진행 상황 추적에 유용하다.

**Independent Test**: 필터 컨트롤을 사용하여 과목을 선택하고, 해당 과목의 과제만 표시되며 완료율이 필터 모드 또는 전체 모드에 따라 올바르게 반영되는지 확인한다.

**Acceptance Scenarios**:

1. **Given** multiple subjects, **When** the user filters by a subject, **Then** only assignments for that subject are shown.
2. **Given** there are N assignments and M completed, **When** viewing the summary, **Then** completion rate equals (M/N) displayed as a percentage with reasonable rounding.

---

### Edge Cases

- Multiple assignments share identical due datetimes: order within same-day groups can be stable but does not rely on unspecified tiebreakers.
- Timezone handling: dates provided by the user must be unambiguous (see Assumptions).
- Large volumes: dashboard should remain usable with hundreds of assignments (performance targets in Success Criteria).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: 시스템은 사용자가 이름과 색상을 가진 과목을 생성, 수정, 삭제할 수 있어야 한다.
- **FR-002**: 시스템은 사용자가 제목, 설명(선택 사항), 마감일/시간을 가진 과제를 생성, 수정, 삭제하고 각 과제를 과목과 연결할 수 있어야 한다.
- **FR-003**: 대시보드 뷰는 연체 과제를 최상단에 표시하고, 그 다음으로 마감 임박 순(가장 이른 마감부터)으로 정렬하여 표시해야 한다.
- **FR-004**: 각 과제 표시에는 남은 일수 또는 연체 일수를 보여주는 D-Day 표시기가 포함되어야 한다.
- **FR-005**: 마감일/시간이 3일 이내인 과제는 경고 상태로 시각적으로 강조되어야 한다.
- **FR-006**: 마감일/시간이 지난 과제는 연체로 명확히 표시되어야 한다.
- **FR-007**: 사용자는 과제를 완료 처리할 수 있어야 하며, 완료된 과제는 시각적으로 구분되고 목록 하단에 모아서 표시되어야 한다.
- **FR-008**: 사용자는 과목별로 과제 목록을 필터링할 수 있어야 한다.
- **FR-009**: 시스템은 전체 대비 완료 과제 비율을 퍼센트로 표시하는 요약 영역을 제공해야 한다.
- **FR-010**: 과제 및 과목 데이터는 앱 재시작 후에도 유지되어야 한다.

## Key Entities *(include if feature involves data)*

- **Subject**: { id, name, color }
- **Assignment**: { id, subject_id, title, description, due_datetime, completed_flag }

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 사용자가 최대 500개의 과제를 가진 대시보드를 열 때, UI가 2초 이내에 정렬된 목록을 렌더링해야 한다.
- **SC-002**: 예시 과제의 D-Day 값은 대표 날짜에 대해 100% 일치하는 기대 일수와 일치해야 한다.
- **SC-003**: 마감일이 3일 이내인 모든 과제는 강조 표시되어야 하며, 검증을 위해 샘플 세트를 생성하고 100% 자격 요건 항목이 강조되는지 확인한다.
- **SC-004**: 연체된 과제는 명확히 표시되어야 하며, 검증을 위해 과거 마감 항목을 생성하고 100% 연체 항목이 표시되는지 확인한다.
- **SC-005**: 완료율 계산은 샘플 데이터셋에서 0.1% 이내의 정확도를 가져야 한다.
- **SC-006**: 앱 재시작 후 생성된 과목과 과제가 100% 유지되어야 한다 (지속성 검증).

## Assumptions

- 사용자가 입력한 날짜/시간은 ISO 형식에 준하며 시간대 정보를 포함한다고 가정하며, UI는 사용자의 로컬 시간대에 맞게 날짜를 해석하고 표시한다.
- 데이터 보존, 백업, 동기화 정책은 v1 스펙에서 앱 재시작 후 데이터 유지 요구사항을 넘어서는 범위로 간주된다.
- 과목 삭제 정책: 과목을 삭제하면 해당 과제가 삭제되며, 마이그레이션 또는 이전은 향후 요구사항으로 별도 정의된다.
- 본 제품은 데스크톱 및 모바일 뷰포트 레이아웃을 지원하나, 정확한 시각적 디자인 및 접근성 감사 단계는 계획 단계에서 다룬다.

