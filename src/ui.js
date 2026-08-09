import { getAssignmentStatus, sortAssignments, calculateCompletionRate, validateSubject, validateAssignment } from './models.js';

const elements = {
  subjectForm: document.getElementById('subject-form'),
  assignmentForm: document.getElementById('assignment-form'),
  subjectList: document.getElementById('subject-list'),
  subjectSelect: document.querySelector('select[name="assignmentSubject"]'),
  assignmentList: document.getElementById('assignment-list'),
  subjectFilter: document.getElementById('subject-filter'),
  summaryPanel: document.getElementById('summary-panel'),
  assignmentTitle: document.querySelector('input[name="assignmentTitle"]'),
  assignmentDescription: document.querySelector('textarea[name="assignmentDescription"]'),
  assignmentDue: document.querySelector('input[name="assignmentDue"]'),
  assignmentSubject: document.querySelector('select[name="assignmentSubject"]')
};

export function renderSubjectControls(state, selectedSubjectId, handlers) {
  const subjects = state.subjects;
  elements.subjectList.innerHTML = '';
  elements.subjectSelect.innerHTML = '<option value="" disabled selected>과목 선택</option>';

  subjects.forEach((subject) => {
    const card = document.createElement('div');
    card.className = 'subject-card';
    card.innerHTML = `
      <strong><span aria-hidden="true" style="display:inline-block;width:12px;height:12px;border-radius:999px;background:${subject.color};"></span>${escapeHtml(subject.name)}</strong>
      <div class="assignment-meta">
        <span>${escapeHtml(subject.color)}</span>
        <button type="button" data-subject-id="${subject.id}" class="subject-delete">삭제</button>
      </div>
    `;

    elements.subjectList.appendChild(card);

    const option = document.createElement('option');
    option.value = subject.id;
    option.textContent = subject.name;
    option.style.color = subject.color;
    elements.subjectSelect.appendChild(option);
  });

  renderSubjectFilter(state, selectedSubjectId, handlers.onFilterChange);
  bindSubjectDelete(handlers.onDeleteSubject);
}

export function renderSubjectFilter(state, selectedSubjectId, onFilterChange) {
  elements.subjectFilter.innerHTML = '';
  const allButton = createFilterButton('전체', '', selectedSubjectId === '');
  allButton.addEventListener('click', () => onFilterChange(''));
  elements.subjectFilter.appendChild(allButton);

  state.subjects.forEach((subject) => {
    const button = createFilterButton(subject.name, subject.id, selectedSubjectId === subject.id);
    button.addEventListener('click', () => onFilterChange(subject.id));
    elements.subjectFilter.appendChild(button);
  });
}

function createFilterButton(label, value, active) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = `filter-button${active ? ' active' : ''}`;
  button.textContent = label;
  button.dataset.filter = value;
  return button;
}

export function renderSummary(state, activeFilter) {
  const assignments = filterAssignments(state.assignments, activeFilter);
  const completionRate = calculateCompletionRate(assignments);
  const total = assignments.length;
  const completed = assignments.filter((it) => it.completed_flag).length;

  elements.summaryPanel.innerHTML = `
    <div class="summary-item"><span>전체 과제</span><strong>${total}</strong></div>
    <div class="summary-item"><span>완료 과제</span><strong>${completed}</strong></div>
    <div class="summary-item"><span>완료율</span><strong>${completionRate}%</strong></div>
  `;
}

export function renderAssignments(state, activeFilter, handlers) {
  elements.assignmentList.innerHTML = '';

  const assignments = filterAssignments(state.assignments, activeFilter);
  const sorted = sortAssignments(assignments);

  sorted.forEach((assignment) => {
    const subject = state.subjects.find((it) => it.id === assignment.subject_id) || { name: '알 수 없음', color: '#64748b' };
    const { status, label, badge } = getAssignmentStatus(assignment);

    const card = document.createElement('article');
    card.className = `assignment-card${assignment.completed_flag ? ' completed' : ''}`;
    card.innerHTML = `
      <div class="assignment-header">
        <h3 class="assignment-title">${escapeHtml(assignment.title)}</h3>
        <label class="status-pill" style="border-color:${subject.color}; color:${subject.color};">
          <input type="checkbox" data-assignment-id="${assignment.id}" ${assignment.completed_flag ? 'checked' : ''} /> 완료
        </label>
      </div>
      <div class="assignment-meta">
        <span style="color:${subject.color};">● ${escapeHtml(subject.name)}</span>
        <span class="badge badge--${badge}">${escapeHtml(label)}</span>
      </div>
      <p class="assignment-description">${escapeHtml(assignment.description || '')}</p>
      <div class="assignment-actions">
        <button type="button" data-edit-id="${assignment.id}">수정</button>
        <button type="button" data-delete-id="${assignment.id}" class="delete">삭제</button>
      </div>
    `;

    elements.assignmentList.appendChild(card);
  });

  bindAssignmentActions(handlers);
}

export function bindSubjectForm(onSubmit) {
  elements.subjectForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(elements.subjectForm);
    onSubmit({
      id: formData.get('subjectId'),
      name: formData.get('subjectName')?.toString().trim(),
      color: formData.get('subjectColor')?.toString().trim()
    });
  });
}

export function bindAssignmentForm(onSubmit) {
  elements.assignmentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(elements.assignmentForm);
    onSubmit({
      id: formData.get('assignmentId'),
      title: formData.get('assignmentTitle')?.toString().trim(),
      description: formData.get('assignmentDescription')?.toString().trim(),
      due_datetime: formData.get('assignmentDue') ? new Date(formData.get('assignmentDue').toString()).toISOString() : '',
      subject_id: formData.get('assignmentSubject')?.toString().trim(),
      completed_flag: false
    });
  });
}

export function fillSubjectOptions(state) {
  elements.subjectSelect.innerHTML = '<option value="" disabled selected>과목 선택</option>';
  state.subjects.forEach((subject) => {
    const option = document.createElement('option');
    option.value = subject.id;
    option.textContent = subject.name;
    elements.subjectSelect.appendChild(option);
  });
}

export function setAssignmentFormValues(assignment) {
  elements.assignmentForm.querySelector('input[name="assignmentId"]').value = assignment.id;
  elements.assignmentTitle.value = assignment.title;
  elements.assignmentDescription.value = assignment.description || '';
  elements.assignmentDue.value = assignment.due_datetime ? assignment.due_datetime.slice(0, 16) : '';
  elements.assignmentSubject.value = assignment.subject_id;
}

export function resetForms() {
  elements.subjectForm.reset();
  elements.assignmentForm.reset();
  elements.assignmentForm.querySelector('input[name="assignmentId"]').value = '';
}

export function showValidationError(message) {
  alert(message);
}

function bindSubjectDelete(onDelete) {
  const buttons = elements.subjectList.querySelectorAll('.subject-delete');
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      onDelete(button.dataset.subjectId);
    });
  });
}

function bindAssignmentActions(handlers) {
  elements.assignmentList.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      handlers.onToggleComplete(checkbox.dataset.assignmentId, checkbox.checked);
    });
  });

  elements.assignmentList.querySelectorAll('button[data-edit-id]').forEach((button) => {
    button.addEventListener('click', () => {
      handlers.onEditAssignment(button.dataset.editId);
    });
  });

  elements.assignmentList.querySelectorAll('button[data-delete-id]').forEach((button) => {
    button.addEventListener('click', () => {
      handlers.onDeleteAssignment(button.dataset.deleteId);
    });
  });
}

function filterAssignments(assignments, activeFilter) {
  if (!activeFilter) return assignments;
  return assignments.filter((assignment) => assignment.subject_id === activeFilter);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function validateSubjectForm(subject) {
  return validateSubject(subject);
}

export function validateAssignmentForm(assignment) {
  return validateAssignment(assignment);
}
