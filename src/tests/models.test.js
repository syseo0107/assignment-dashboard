import { describe, it, expect } from 'vitest';
import { isValidISODate, getAssignmentStatus, sortAssignments, calculateCompletionRate } from '../models.js';

describe('models', () => {
  it('validates ISO date input with exact format', () => {
    expect(isValidISODate('2026-08-10T12:00:00')).toBe(true);
    expect(isValidISODate('2026-08-10')).toBe(false);
  });

  it('computes completed status for finished assignments', () => {
    const assignment = { due_datetime: '2026-08-10T12:00:00', completed_flag: true };
    const result = getAssignmentStatus(assignment, new Date('2026-08-08T12:00:00'));
    expect(result.status).toBe('completed');
    expect(result.badge).toBe('completed');
  });

  it('computes overdue status when past due date', () => {
    const assignment = { due_datetime: '2026-08-07T12:00:00', completed_flag: false };
    const result = getAssignmentStatus(assignment, new Date('2026-08-08T12:00:00'));
    expect(result.status).toBe('overdue');
    expect(result.label).toContain('연체');
  });

  it('computes warning status for due within 3 days', () => {
    const assignment = { due_datetime: '2026-08-10T12:00:00', completed_flag: false };
    const result = getAssignmentStatus(assignment, new Date('2026-08-08T12:00:00'));
    expect(result.status).toBe('warning');
    expect(result.label).toBe('D-2');
  });

  it('computes calendar-day D-day across midnight boundaries', () => {
    const assignment = { due_datetime: '2026-08-10T00:00', completed_flag: false };
    const result = getAssignmentStatus(assignment, new Date('2026-08-09T23:59:00'));
    expect(result.status).toBe('warning');
    expect(result.label).toBe('D-1');
  });

  it('sorts assignments with overdue first then due date ascending and completed last', () => {
    const items = [
      { id: 'a', due_datetime: '2026-08-20T12:00:00', completed_flag: false },
      { id: 'b', due_datetime: '2026-08-08T12:00:00', completed_flag: false },
      { id: 'c', due_datetime: '2026-08-06T12:00:00', completed_flag: false },
      { id: 'd', due_datetime: '2026-08-12T12:00:00', completed_flag: true }
    ];
    const now = new Date('2026-08-09T12:00:00');
    const sorted = sortAssignments(items, now);
    expect(sorted[0].id).toBe('c');
    expect(sorted[1].id).toBe('b');
    expect(sorted[sorted.length - 1].id).toBe('d');
  });

  it('calculates completion rate accurately', () => {
    const items = [
      { completed_flag: true },
      { completed_flag: false },
      { completed_flag: true }
    ];
    expect(calculateCompletionRate(items)).toBe(67);
  });
});
