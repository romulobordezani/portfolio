import { bem } from './index';
import { css } from '@emotion/css';

const block = css`
  background-color: aquamarine;

  &__element {
    padding: 8px;
    border: 1px solid maroon;

    &--modifier {
      color: darkorchid;
    }
  }
`;

describe('bem() util', () => {
  it('should return element className', () => {
    expect(bem(block, 'element')).toBe('css-f4aijn__element');
  });

  it('should return element AND modifier classNames following BEM naming conventions', () => {
    expect(bem(block, 'element', 'modifier')).toBe(
      'css-f4aijn__element--modifier'
    );
  });
});
