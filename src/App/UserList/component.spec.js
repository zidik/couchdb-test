import React from 'react';
import { shallow, mount, render } from 'enzyme';

import { NewUserListItem } from './component';

describe('NewUserListItem', () => {
  it('should render correctly', () => {
    const component = shallow(<NewUserListItem handleNewUser={() => {}} />);

    expect(component).toMatchSnapshot();
  });

  it('contains text "Add new user"', () => {
    const component = render(<NewUserListItem handleNewUser={() => {}} />);
    expect(component.text()).toContain('Add new user');
  });

  it('should call "handleNewUser" when clicked', () => {
    const clickFn = jest.fn();
    const component = mount(<NewUserListItem handleNewUser={clickFn} />);
    component.find('.item').simulate('click');
    expect(clickFn).toHaveBeenCalled();
  });
});
