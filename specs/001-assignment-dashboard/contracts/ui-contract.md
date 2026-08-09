# UI Contract: assignment-dashboard

## Dashboard 화면
- 완료율 요약 영역: 전체 과제 수, 완료 과제 수, 완료율 표시
- 과목 필터: 전체 및 개별 과목 선택 버튼
- 과제 목록: 연체 > 마감 임박 > 완료 순으로 정렬
- 각 과제 항목:
  - 완료 체크박스
  - 과목 색상 표시
  - 제목
  - D-Day 배지
  - 완료된 항목은 목록 하단에 표시

## 데이터 형태
- Subject: { id, name, color }
- Assignment: { id, subject_id, title, description, due_datetime, completed_flag }

## 상호작용
- 과목 필터 선택 시 해당 과제만 표시
- 완료 체크박스 선택 시 완료 상태 전환
- 과제 추가/수정/삭제 시 목록이 즉시 갱신
