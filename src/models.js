export function validateSubject(subject) {
  return typeof subject.name === 'string' && subject.name.trim().length > 0 && typeof subject.color === 'string' && subject.color.trim().length > 0;
}

export function validateAssignment(assignment) {
  return (
    typeof assignment.title === 'string' && assignment.title.trim().length > 0 &&
    typeof assignment.due_datetime === 'string' && isValidISODate(assignment.due_datetime) &&
    typeof assignment.subject_id !== 'undefined' &&
    typeof assignment.completed_flag === 'boolean'
  );
}

export function isValidISODate(value) {
  if (typeof value !== 'string') return false;
  const date = new Date(value);
  return !Number.isNaN(date.getTime()) && value.includes('T');
}

export function getAssignmentStatus(assignment, now = new Date()) {
  const due = new Date(assignment.due_datetime);
  const diffMs = due.getTime() - now.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (assignment.completed_flag) {
    return { status: 'completed', label: '완료', badge: 'completed' };
  }

  if (diffMs < 0) {
    return { status: 'overdue', label: `연체 ${Math.abs(diffDays)}일`, badge: 'overdue' };
  }

  if (diffDays <= 3) {
    return { status: 'warning', label: `D-${diffDays}`, badge: 'warning' };
  }

  return { status: 'active', label: `D-${diffDays}`, badge: 'active' };
}

export function sortAssignments(assignments, now = new Date()) {
  return [...assignments].sort((a, b) => {
    if (a.completed_flag !== b.completed_flag) {
      return a.completed_flag ? 1 : -1;
    }

    const aDue = new Date(a.due_datetime).getTime();
    const bDue = new Date(b.due_datetime).getTime();

    const aOverdue = aDue < now.getTime();
    const bOverdue = bDue < now.getTime();

    if (aOverdue !== bOverdue) {
      return aOverdue ? -1 : 1;
    }

    return aDue - bDue;
  });
}

export function groupAssignmentsByStatus(assignments) {
  return assignments.reduce(
    (acc, assignment) => {
      if (assignment.completed_flag) {
        acc.completed.push(assignment);
      } else if (new Date(assignment.due_datetime) < new Date()) {
        acc.overdue.push(assignment);
      } else if (new Date(assignment.due_datetime).getTime() - new Date().getTime() <= 3 * 24 * 60 * 60 * 1000) {
        acc.warning.push(assignment);
      } else {
        acc.active.push(assignment);
      }
      return acc;
    },
    { overdue: [], warning: [], active: [], completed: [] }
  );
}

export function calculateCompletionRate(assignments) {
  if (assignments.length === 0) return 0;
  const completed = assignments.filter((it) => it.completed_flag).length;
  return Math.round((completed / assignments.length) * 100);
}
