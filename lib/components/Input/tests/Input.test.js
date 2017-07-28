'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _ = require('..');

var _2 = _interopRequireDefault(_);

var _Resizer = require('../Resizer');

var _Resizer2 = _interopRequireDefault(_Resizer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('ClassName', function () {
  test('Has default className', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_2.default, null));
    var input = wrapper.find('.c-Input');
    var field = wrapper.find('.c-InputField');
    var backdrop = wrapper.find('.c-InputBackdrop');

    expect(input.exists()).toBeTruthy();
    expect(field.exists()).toBeTruthy();
    expect(backdrop.exists()).toBeTruthy();
  });

  test('Accepts custom className', function () {
    var className = 'milk-was-a-bad-choice';
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { className: className }));
    var o = wrapper.find('.' + className);

    expect(o.exists()).toBeTruthy();
  });
});

describe('Autofocus', function () {
  test('Does not autoFocus by default', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, null));
    var input = wrapper.find('input');

    expect(input.prop('autoFocus')).toBeFalsy();
  });

  test('Autofocuses if specified', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { autoFocus: true }));
    var input = wrapper.find('input');

    expect(input.prop('autoFocus')).toBeTruthy();
  });
});

describe('Events', function () {
  test('Can trigger onBlur callback', function () {
    var spy = jest.fn();
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_2.default, { onBlur: spy }));
    var input = wrapper.find('input');

    input.simulate('blur');

    expect(spy).toHaveBeenCalled();
  });

  test('Can trigger onClick callback', function () {
    var spy = jest.fn();
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_2.default, { onClick: spy }));
    var input = wrapper.find('input');

    input.simulate('click');

    expect(spy).toHaveBeenCalled();
  });

  test('Can trigger onFocus callback', function () {
    var spy = jest.fn();
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_2.default, { onFocus: spy }));
    var input = wrapper.find('input');

    input.simulate('focus');

    expect(spy).toHaveBeenCalled();
  });

  test('onChange callback passes selected value', function () {
    var spy = jest.fn();
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_2.default, { onChange: spy }));
    var input = wrapper.find('input');
    var value = 'Champ Kind';

    input.node.value = value;
    input.simulate('change');

    expect(spy).toHaveBeenCalledWith(value);
  });
});

describe('Multiline', function () {
  test('Default selector is an input', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, null));
    var o = wrapper.find('.c-InputField');

    expect(o.node.type).toBe('input');
  });

  test('Selector becomes a textarea if multiline is defined', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { multiline: true }));
    var o = wrapper.find('.c-InputField');

    expect(o.node.type).toBe('textarea');
  });

  test('Accepts number argument', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_2.default, { multiline: 5 }));
    var o = wrapper.find('.c-InputField');

    expect(o.node.type).toBe('textarea');
  });

  test('Adds Resizer component if multiline is defined', function () {
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_2.default, { multiline: true }));

    expect(wrapper.find(_Resizer2.default).exists()).toBeTruthy();
  });

  test('Applies resizable styles if specified', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { multiline: true, resizable: true }));
    var o = wrapper.find('.c-Input');

    expect(o.prop('className')).toContain('is-resizable');
  });
});

describe('Prefix/Suffix', function () {
  test('Adds prefix if defined', function () {
    var text = 'Prefix';
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_2.default, { prefix: text }));

    expect(wrapper.find('.c-Input__prefix').text()).toBe(text);
  });

  test('Adds suffix if defined', function () {
    var text = 'Prefix';
    var wrapper = (0, _enzyme.mount)(_react2.default.createElement(_2.default, { suffix: text }));

    expect(wrapper.find('.c-Input__suffix').text()).toBe(text);
  });
});

describe('Styles', function () {
  test('Applies seamless styles if specified', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { seamless: true }));
    var o = wrapper.find('.c-Input');

    expect(o.prop('className')).toContain('is-seamless');
  });

  test('Applies sizing styles if specified', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { size: 'sm' }));
    var o = wrapper.find('.c-InputField');

    expect(o.prop('className')).toContain('is-sm');
  });
});

describe('States', function () {
  test('Applies disabled styles if specified', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { disabled: true }));
    var o = wrapper.find('.c-Input');
    var input = wrapper.find('input');

    expect(o.prop('className')).toContain('is-disabled');
    expect(input.prop('disabled')).toBeTruthy();
  });

  test('Applies readOnly styles if specified', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { readOnly: true }));
    var o = wrapper.find('.c-Input');
    var input = wrapper.find('input');

    expect(o.prop('className')).toContain('is-readonly');
    expect(input.prop('readOnly')).toBeTruthy();
  });

  test('Applies error styles if specified', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { error: true }));
    var o = wrapper.find('.c-Input');

    expect(o.prop('className')).toContain('is-error');
  });

  test('Applies success styles if specified', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { success: true }));
    var o = wrapper.find('.c-Input');

    expect(o.prop('className')).toContain('is-success');
  });

  test('Applies warning styles if specified', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { warning: true }));
    var o = wrapper.find('.c-Input');

    expect(o.prop('className')).toContain('is-warning');
  });
});

describe('Stateful helper label', function () {
  test('Renders stateful helper label if error is a string', function () {
    var wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_2.default, { error: 'Error' }));
    var helperLabel = wrapper.find('.c-InputHelperLabel');

    expect(helperLabel.exists()).toBeTruthy();
    expect(helperLabel.text()).toBe('Error');
  });
});