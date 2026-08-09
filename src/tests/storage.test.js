import { describe, it, expect, beforeEach, vi } from 'vitest';
import { loadAppState, saveAppState, addSubject, addAssignment, deleteSubject, deleteAssignment, updateAssignment } from '../storage.js';

const storageKey = 'assignment_dashboard_v1';

describe('storage module', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('loads empty state when storage is empty', () => {
    expect(loadAppState()).toEqual({ subjects: [], assignments: [] });
  });

  it('persists and loads state through localStorage', () => {
    const state = { subjects: [], assignments: [] };
    saveAppState(state);
    expect(loadAppState()).toEqual(state);
  });

  it('adds and removes a subject and related assignments', () => {
    const state = { subjects: [], assignments: [] };
    const subject = addSubject(state, { name: 'Math', color: '#123456' });
    addAssignment(state, { title: 'Homework', description: 'Do it', due_datetime: '2026-08-20T12:00:00', subject_id: subject.id, completed_flag: false });
    expect(state.subjects.length).toBe(1);
    expect(state.assignments.length).toBe(1);
    deleteSubject(state, subject.id);
    expect(state.subjects.length).toBe(0);
    expect(state.assignments.length).toBe(0);
  });

  it('can update an assignment', () => {
    const state = { subjects: [], assignments: [] };
    const subject = addSubject(state, { name: 'Physics', color: '#abcdef' });
    const assignment = addAssignment(state, { title: 'Lab', description: '', due_datetime: '2026-09-01T12:00:00', subject_id: subject.id, completed_flag: false });
    const updated = updateAssignment(state, assignment.id, { title: 'Lab Report', completed_flag: true });
    expect(updated.title).toBe('Lab Report');
    expect(updated.completed_flag).toBe(true);
  });

  it('deletes assignments independently', () => {
    const state = { subjects: [], assignments: [] };
    const subject = addSubject(state, { name: 'Chemistry', color: '#ff0000' });
    const assignment = addAssignment(state, { title: 'Read', description: '', due_datetime: '2026-09-01T12:00:00', subject_id: subject.id, completed_flag: false });
    deleteAssignment(state, assignment.id);
    expect(state.assignments.length).toBe(0);
    expect(state.subjects.length).toBe(1);
  });
});
