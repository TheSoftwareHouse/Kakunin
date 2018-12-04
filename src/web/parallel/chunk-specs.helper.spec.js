import { chunkSpecs } from './chunk-specs.helper';

const allSpecs = [
  '/Users/user/Kakunin/functional-tests/features/content/operations_on_stored_variables.feature',
  '/Users/user/Kakunin/functional-tests/features/content/validate_tabular_data.feature',
  '/Users/user/Kakunin/functional-tests/features/content/wait_for_element_dissapear.feature',
  '/Users/user/Kakunin/functional-tests/features/drag-and-drop/operations_on_elements.feature',
  '/Users/user/Kakunin/functional-tests/features/forms/fill_and_check_form.feature',
  '/Users/user/Kakunin/functional-tests/features/matchers/match_current_date.feature',
  '/Users/user/Kakunin/functional-tests/features/navigation/navigate_to_given_page.feature',
  '/Users/user/Kakunin/functional-tests/features/pages/verify_displayed_page.feature',
  '/Users/user/Kakunin/functional-tests/features/wait-for-elements/wait_for_form.feature',
  '/Users/user/Kakunin/functional-tests/features/wait-for-elements/wait_for_table.feature',
];

describe('Chunk specs', () => {
  it('returns all specs as one list as the pattern was not specified', () => {
    expect(chunkSpecs({}, allSpecs, 1, 1)).toEqual([
      ['/Users/user/Kakunin/functional-tests/features/content/operations_on_stored_variables.feature'],
      ['/Users/user/Kakunin/functional-tests/features/content/validate_tabular_data.feature'],
      ['/Users/user/Kakunin/functional-tests/features/content/wait_for_element_dissapear.feature'],
      ['/Users/user/Kakunin/functional-tests/features/drag-and-drop/operations_on_elements.feature'],
      ['/Users/user/Kakunin/functional-tests/features/forms/fill_and_check_form.feature'],
      ['/Users/user/Kakunin/functional-tests/features/matchers/match_current_date.feature'],
      ['/Users/user/Kakunin/functional-tests/features/navigation/navigate_to_given_page.feature'],
      ['/Users/user/Kakunin/functional-tests/features/pages/verify_displayed_page.feature'],
      ['/Users/user/Kakunin/functional-tests/features/wait-for-elements/wait_for_form.feature'],
      ['/Users/user/Kakunin/functional-tests/features/wait-for-elements/wait_for_table.feature'],
    ]);
  });

  it('returns chucked specs for one pattern', () => {
    expect(chunkSpecs({ pattern: 'features/content' }, allSpecs, 1, 1)).toEqual([
      [
        '/Users/user/Kakunin/functional-tests/features/content/operations_on_stored_variables.feature',
        '/Users/user/Kakunin/functional-tests/features/content/validate_tabular_data.feature',
        '/Users/user/Kakunin/functional-tests/features/content/wait_for_element_dissapear.feature',
      ],
    ]);
  });

  it('returns chucked specs by default because the pattern is boolean - true', () => {
    expect(chunkSpecs({ pattern: true }, allSpecs, 1, 1)).toEqual([
      ['/Users/user/Kakunin/functional-tests/features/content/operations_on_stored_variables.feature'],
      ['/Users/user/Kakunin/functional-tests/features/content/validate_tabular_data.feature'],
      ['/Users/user/Kakunin/functional-tests/features/content/wait_for_element_dissapear.feature'],
      ['/Users/user/Kakunin/functional-tests/features/drag-and-drop/operations_on_elements.feature'],
      ['/Users/user/Kakunin/functional-tests/features/forms/fill_and_check_form.feature'],
      ['/Users/user/Kakunin/functional-tests/features/matchers/match_current_date.feature'],
      ['/Users/user/Kakunin/functional-tests/features/navigation/navigate_to_given_page.feature'],
      ['/Users/user/Kakunin/functional-tests/features/pages/verify_displayed_page.feature'],
      ['/Users/user/Kakunin/functional-tests/features/wait-for-elements/wait_for_form.feature'],
      ['/Users/user/Kakunin/functional-tests/features/wait-for-elements/wait_for_table.feature'],
    ]);
  });

  it('returns chucked specs by default because the pattern is boolean - false', () => {
    expect(chunkSpecs({ pattern: false }, allSpecs, 1, 1)).toEqual([
      ['/Users/user/Kakunin/functional-tests/features/content/operations_on_stored_variables.feature'],
      ['/Users/user/Kakunin/functional-tests/features/content/validate_tabular_data.feature'],
      ['/Users/user/Kakunin/functional-tests/features/content/wait_for_element_dissapear.feature'],
      ['/Users/user/Kakunin/functional-tests/features/drag-and-drop/operations_on_elements.feature'],
      ['/Users/user/Kakunin/functional-tests/features/forms/fill_and_check_form.feature'],
      ['/Users/user/Kakunin/functional-tests/features/matchers/match_current_date.feature'],
      ['/Users/user/Kakunin/functional-tests/features/navigation/navigate_to_given_page.feature'],
      ['/Users/user/Kakunin/functional-tests/features/pages/verify_displayed_page.feature'],
      ['/Users/user/Kakunin/functional-tests/features/wait-for-elements/wait_for_form.feature'],
      ['/Users/user/Kakunin/functional-tests/features/wait-for-elements/wait_for_table.feature'],
    ]);
  });

  it('returns chunked specs by default as the pattern was not specified', () => {
    expect(chunkSpecs({}, allSpecs, 2, 2)).toEqual([
      [
        '/Users/user/Kakunin/functional-tests/features/content/operations_on_stored_variables.feature',
        '/Users/user/Kakunin/functional-tests/features/content/validate_tabular_data.feature',
      ],
      [
        '/Users/user/Kakunin/functional-tests/features/content/wait_for_element_dissapear.feature',
        '/Users/user/Kakunin/functional-tests/features/drag-and-drop/operations_on_elements.feature',
      ],
      [
        '/Users/user/Kakunin/functional-tests/features/forms/fill_and_check_form.feature',
        '/Users/user/Kakunin/functional-tests/features/matchers/match_current_date.feature',
      ],
      [
        '/Users/user/Kakunin/functional-tests/features/navigation/navigate_to_given_page.feature',
        '/Users/user/Kakunin/functional-tests/features/pages/verify_displayed_page.feature',
      ],
      [
        '/Users/user/Kakunin/functional-tests/features/wait-for-elements/wait_for_form.feature',
        '/Users/user/Kakunin/functional-tests/features/wait-for-elements/wait_for_table.feature',
      ],
    ]);
  });

  it('returns chunked specs by two pattern', () => {
    expect(chunkSpecs({ pattern: 'features/content,features/forms' }, allSpecs, 2, 2)).toEqual(
      expect.arrayContaining([
        [
          '/Users/user/Kakunin/functional-tests/features/content/operations_on_stored_variables.feature',
          '/Users/user/Kakunin/functional-tests/features/content/validate_tabular_data.feature',
          '/Users/user/Kakunin/functional-tests/features/content/wait_for_element_dissapear.feature',
        ],
        ['/Users/user/Kakunin/functional-tests/features/forms/fill_and_check_form.feature'],
      ])
    );
  });

  it('returns error as the number of instances is higher than given patterns', () => {
    expect(() => {
      chunkSpecs({ pattern: 'features/content' }, allSpecs, 4, 3);
    }).toThrow('Number of the specified patterns is different than number of instances!');
  });

  it('returns error as the number of instances is lower than given patterns', () => {
    expect(() => {
      chunkSpecs({ pattern: 'features/forms,features/navigation,features/wait-for-elements' }, allSpecs, 2, 2);
    }).toThrow('Number of the specified patterns is different than number of instances!');
  });
});
