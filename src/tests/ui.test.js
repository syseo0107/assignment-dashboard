import { describe, it, expect, beforeEach, vi } from 'vitest';
import { JSDOM } from 'jsdom';

const domHtml = `<!DOCTYPE html><html lang="ko"><body>
  <form id="subject-form"><input name="subjectId"><input name="subjectName"><input name="subjectColor"></form>
  <form id="assignment-form"><input name="assignmentId"><input name="assignmentTitle"><textarea name="assignmentDescription"></textarea><input name="assignmentDue"><select name="assignmentSubject"></select></form>
  <div id="subject-list"></div>
  <div id="assignment-list"></div>
  <div id="subject-filter"></div>
  <div id="summary-panel"></div>
</body></html>`;

let dom;
let ui;

beforeEach(async () => {
  vi.resetModules();
  dom = new JSDOM(domHtml, { url: 'http://localhost/', runScripts: 'dangerously', resources: 'usable' });
  global.document = dom.window.document;
  global.window = dom.window;
  global.localStorage = dom.window.localStorage;
  ui = await import('../ui.js');
});

describe('ui integration', () => {
  it('renders subject filter and summary metrics', () => {
    const state = {
      subjects: [{ id: '1', name: 'Math', color: '#ff0000' }],
      assignments: [{ id: 'a', title: 'Homework', description: 'desc', due_datetime: '2026-08-20T12:00:00', subject_id: '1', completed_flag: false }]
    };

    ui.renderSubjectControls(state, '', { onFilterChange: () => {}, onDeleteSubject: () => {} });
    ui.renderSummary(state, '');
    ui.renderAssignments(state, '', { onToggleComplete: () => {}, onEditAssignment: () => {}, onDeleteAssignment: () => {} });

    expect(document.getElementById('subject-list').children.length).toBe(1);
    expect(document.getElementById('assignment-list').children.length).toBe(1);
    expect(document.getElementById('summary-panel').textContent).toContain('전체 과제');
  });

  it('marks the active subject filter button with aria-pressed', () => {
    const state = { subjects: [{ id: '1', name: 'Math', color: '#ff0000' }] };
    ui.renderSubjectControls(state, '1', { onFilterChange: () => {}, onDeleteSubject: () => {} });

    const button = document.querySelector('#subject-filter button[data-filter="1"]');
    expect(button).not.toBeNull();
    expect(button.getAttribute('aria-pressed')).toBe('true');
  });

  it('preserves datetime-local input values when submitting assignments', () => {
    const assignmentSubject = document.querySelector('select[name="assignmentSubject"]');
    const option = document.createElement('option');
    option.value = '1';
    option.textContent = 'Math';
    assignmentSubject.appendChild(option);
    assignmentSubject.value = '1';

    document.querySelector('input[name="assignmentTitle"]').value = 'Late night task';
    document.querySelector('textarea[name="assignmentDescription"]').value = 'Finish by tomorrow';
    document.querySelector('input[name="assignmentDue"]').value = '2026-08-10T23:59';

    let captured = null;
    ui.bindAssignmentForm((assignment) => {
      captured = assignment;
    });

    document.getElementById('assignment-form').dispatchEvent(new dom.window.Event('submit'));

    expect(captured).not.toBeNull();
    expect(captured.due_datetime).toBe('2026-08-10T23:59');
  });

  it('updates assignment completed state through handler', () => {
    const state = {
      subjects: [{ id: '1', name: 'Math', color: '#ff0000' }],
      assignments: [{ id: 'a', title: 'Homework', description: 'desc', due_datetime: '2026-08-20T12:00:00', subject_id: '1', completed_flag: false }]
    };

    ui.renderAssignments(state, '', {
      onToggleComplete: (assignmentId, completed) => {
        expect(assignmentId).toBe('a');
        expect(completed).toBe(true);
      },
      onEditAssignment: () => {},
      onDeleteAssignment: () => {}
    });

    const checkbox = document.querySelector('input[type="checkbox"]');
    expect(checkbox).not.toBeNull();
    checkbox.checked = true;
    checkbox.dispatchEvent(new dom.window.Event('change'));
  });
});
