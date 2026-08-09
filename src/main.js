import * as storage from './storage.js';
import * as ui from './ui.js';

const state = storage.loadAppState();
let activeFilter = '';

function refresh() {
  ui.renderSubjectControls(state, activeFilter, {
    onFilterChange: handleFilterChange,
    onDeleteSubject: handleDeleteSubject
  });
  ui.fillSubjectOptions(state);
  ui.renderSummary(state, activeFilter);
  ui.renderAssignments(state, activeFilter, {
    onToggleComplete: handleToggleComplete,
    onEditAssignment: handleEditAssignment,
    onDeleteAssignment: handleDeleteAssignment
  });
}

function handleFilterChange(subjectId) {
  activeFilter = subjectId;
  refresh();
}

function handleAddOrUpdateSubject(subject) {
  if (!ui.validateSubjectForm(subject)) {
    return ui.showValidationError('과목 이름과 색상을 모두 입력해주세요.');
  }

  if (subject.id) {
    storage.updateSubject(state, subject.id, { name: subject.name, color: subject.color });
  } else {
    storage.addSubject(state, subject);
  }

  ui.resetForms();
  refresh();
}

function handleDeleteSubject(subjectId) {
  storage.deleteSubject(state, subjectId);
  if (activeFilter === subjectId) {
    activeFilter = '';
  }
  refresh();
}

function handleAddOrUpdateAssignment(assignment) {
  if (!ui.validateAssignmentForm(assignment)) {
    return ui.showValidationError('과제 제목, 마감일시, 과목을 올바르게 입력해주세요.');
  }

  if (assignment.id) {
    storage.updateAssignment(state, assignment.id, {
      title: assignment.title,
      description: assignment.description,
      due_datetime: assignment.due_datetime,
      subject_id: assignment.subject_id
    });
  } else {
    storage.addAssignment(state, assignment);
  }

  ui.resetForms();
  refresh();
}

function handleToggleComplete(assignmentId, completed) {
  storage.updateAssignment(state, assignmentId, { completed_flag: completed });
  refresh();
}

function handleEditAssignment(assignmentId) {
  const assignment = state.assignments.find((it) => it.id === assignmentId);
  if (!assignment) return;
  ui.setAssignmentFormValues(assignment);
}

function handleDeleteAssignment(assignmentId) {
  storage.deleteAssignment(state, assignmentId);
  refresh();
}

ui.bindSubjectForm(handleAddOrUpdateSubject);
ui.bindAssignmentForm(handleAddOrUpdateAssignment);
refresh();
