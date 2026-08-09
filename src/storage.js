const STORAGE_KEY = 'assignment_dashboard_v1';

export function loadAppState() {
  try {
    const payload = localStorage.getItem(STORAGE_KEY);
    if (!payload) {
      return { subjects: [], assignments: [] };
    }
    const parsed = JSON.parse(payload);
    return {
      subjects: Array.isArray(parsed.subjects) ? parsed.subjects : [],
      assignments: Array.isArray(parsed.assignments) ? parsed.assignments : []
    };
  } catch (error) {
    console.error('Storage load failed', error);
    return { subjects: [], assignments: [] };
  }
}

export function saveAppState(state) {
  try {
    const payload = JSON.stringify({
      subjects: state.subjects,
      assignments: state.assignments
    });
    localStorage.setItem(STORAGE_KEY, payload);
    return true;
  } catch (error) {
    console.error('Storage save failed', error);
    return false;
  }
}

export function addSubject(state, subject) {
  const nextSubject = { ...subject, id: generateId() };
  state.subjects.push(nextSubject);
  saveAppState(state);
  return nextSubject;
}

export function updateSubject(state, subjectId, update) {
  const subject = state.subjects.find((it) => it.id === subjectId);
  if (!subject) return null;
  Object.assign(subject, update);
  saveAppState(state);
  return subject;
}

export function deleteSubject(state, subjectId) {
  state.subjects = state.subjects.filter((it) => it.id !== subjectId);
  state.assignments = state.assignments.filter((assignment) => assignment.subject_id !== subjectId);
  saveAppState(state);
}

export function addAssignment(state, assignment) {
  const nextAssignment = {
    ...assignment,
    id: generateId(),
    completed_flag: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  state.assignments.push(nextAssignment);
  saveAppState(state);
  return nextAssignment;
}

export function updateAssignment(state, assignmentId, update) {
  const assignment = state.assignments.find((it) => it.id === assignmentId);
  if (!assignment) return null;
  Object.assign(assignment, update, { updated_at: new Date().toISOString() });
  saveAppState(state);
  return assignment;
}

export function deleteAssignment(state, assignmentId) {
  state.assignments = state.assignments.filter((it) => it.id !== assignmentId);
  saveAppState(state);
}

function generateId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
