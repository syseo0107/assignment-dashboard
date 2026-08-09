# Research: assignment-dashboard

## Decision: Storage 방식
- 선택: localStorage
- 이유: 과목 몇 개와 과제 수십 개 규모의 앱에는 localStorage가 단순하고 유지보수가 쉽다. 복잡한 저장소 인프라가 불필요하며, 웹 표준 우선과 `Simplicity & Maintainability` 원칙에 부합한다.
- 검토된 대안: IndexedDB, 파일 다운로드/업로드, 서버 동기화
- 트레이드오프: localStorage는 객체를 직접 저장할 수 없어 JSON 직렬화/역직렬화가 필요하고 동시성 제어가 제한적이다. 하지만 현재 데이터 규모에서는 단순성과 운영 비용 절감이 더 중요하며, 저장소 접근을 추상화하여 향후 IndexedDB로 전환할 수 있도록 설계한다.

## Decision: UI 구현 방식
- 선택: 표준 HTML/CSS/JavaScript 기반 컴포넌트
- 이유: 웹 표준 우선과 외부 의존성 최소화 헌법 원칙을 지키며, 브라우저 호환성과 접근성을 유지할 수 있다.
- 검토된 대안: React/Vue/Svelte 등 프레임워크
- 트레이드오프: 프레임워크는 개발 생산성과 상태 관리 측면에서 이점이 있으나, 외부 의존성 추가와 런타임 오버헤드가 발생한다. 작은 기능 범위에서는 표준 웹 기술이 더 적합하다.

## Decision: 테스트 도구
- 선택: Vitest + DOM 기반 테스트
- 이유: JavaScript ES2020+ 네이티브 ES 모듈 기반 코드를 테스트하기 적합하며, 개발 초기부터 테스트 우선 원칙을 지원한다.
- 검토된 대안: Jest, Playwright, Cypress
- 트레이드오프: Jest는 익숙하지만 브라우저 DOM 지원을 위한 설정이 더 복잡할 수 있다. Playwright/Cypress는 e2e 테스트에 강력하지만 초기 단계에서는 단위/통합 테스트만으로 충분하다.

## Decision: 언어/빌드 도구
- 선택: 브라우저 네이티브 ES 모듈을 사용하는 JavaScript (ES2020+)를 우선 적용
- 이유: localStorage 기반 단순 데이터 저장 모델과 일치하는 단순성 원칙을 유지하며, 빌드 도구 없이도 최신 브라우저에서 직접 실행 가능하다.
- 검토된 대안: TypeScript + 번들러 (`esbuild`, `tsc`)
- 트레이드오프: TypeScript와 번들러는 코드 안정성과 확장성을 향상시키지만 초기 개발 복잡도와 설정 비용을 높인다. 현재에는 기본 웹 플랫폼 우선 전략이 적합하며, 필요 시 미래에 도입 가능한 대안으로 남겨둔다.
