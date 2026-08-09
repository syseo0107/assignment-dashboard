# Data Model: assignment-dashboard

## Entities

### Subject
- **id**: 문자열 또는 숫자
- **name**: 문자열
- **color**: 문자열(색상 코드)

### Assignment
- **id**: 문자열 또는 숫자
- **subject_id**: Subject id와 연결된 값
- **title**: 문자열
- **description**: 문자열(선택 사항)
- **due_datetime**: ISO 형식 날짜/시간 문자열
- **completed_flag**: 불리언
- **created_at**: ISO 형식 날짜/시간 문자열
- **updated_at**: ISO 형식 날짜/시간 문자열

## Relationships
- `Assignment.subject_id`는 `Subject.id`를 참조한다.
- 하나의 Subject는 여러 Assignment를 가질 수 있다.

## Validation Rules
- Subject.name은 빈 문자열이 아니어야 한다.
- Assignment.title은 빈 문자열이 아니어야 한다.
- Assignment.due_datetime는 유효한 날짜/시간이어야 한다.
- completed_flag는 boolean 형태여야 한다.

## State Transitions
- 과제 생성: `completed_flag`는 기본적으로 `false`.
- 과제 완료: `completed_flag`가 `true`로 전환되고, 목록 하단으로 이동.
- 과제 삭제: 관련 Assignment가 제거된다.
- 과제 수정: title, description, due_datetime, subject_id를 변경할 수 있다.
