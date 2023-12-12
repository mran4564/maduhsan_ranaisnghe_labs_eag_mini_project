import { render } from '@testing-library/react';

import Sidebar from './Sidebar.component';

describe('Sidebar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Sidebar sideBarTitle="Welcome" />);
    expect(baseElement).toBeTruthy();
  });
});
