// See: https://github.com/Shopify/polaris/blob/master/src/components/TextField/TextField.tsx

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Resizer from './Resizer';
import classNames from '../../utilities/classNames';
import { noop } from '../../utilities/constants';

const propTypes = {
  autoFocus: PropTypes.bool,
  bold: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  id: PropTypes.string,
  multiline: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  placeholderItalic: PropTypes.bool,
  prefix: PropTypes.string,
  readOnly: PropTypes.bool,
  resizable: PropTypes.bool,
  seamless: PropTypes.bool,
  size: PropTypes.string,
  success: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  suffix: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  warning: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};
const defaultProps = {
  autoFocus: false,
  bold: false,
  className: '',
  disabled: false,
  error: false,
  id: '',
  multiline: null,
  name: '',
  onBlur: noop,
  onChange: noop,
  onFocus: noop,
  placeholder: '',
  placeholderItalic: false,
  prefix: '',
  readOnly: false,
  resizable: false,
  seamless: false,
  size: 'md',
  success: false,
  suffix: '',
  type: 'text',
  value: '',
  warning: false,
};

class Input extends Component {
  constructor(props) {
    super();
    this.state = {
      height: null,
      value: props.value,
    };
  }

  handleOnChange(e) {
    const value = e.currentTarget.value;
    this.setState({ value });
    this.props.onChange(value);
  }

  handleExpandingResize(height) {
    this.setState({ height });
  }

  render() {
    const {
      autoFocus,
      bold,
      disabled,
      error,
      id,
      inputRef,
      multiline,
      name,
      onBlur,
      onFocus,
      placeholder,
      placeholderItalic,
      prefix,
      readOnly,
      resizable,
      seamless,
      size,
      success,
      suffix,
      type,
      warning,
      ...rest
    } = this.props;

    const { height, value } = this.state;

    const handleOnChange = this.handleOnChange.bind(this);
    const handleExpandingResize = this.handleExpandingResize.bind(this);

    const className = classNames(
      'c-Input',
      `c-Input--${size}`,
      bold && 'c-Input--bold',
      disabled && 'is-disabled',
      error && 'is-error',
      multiline && 'c-Input--multiline',
      readOnly && 'is-readonly',
      resizable && 'c-Input--resizable',
      seamless && 'c-Input--seamless',
      success && 'is-success',
      value && 'c-Input--has-value',
      warning && 'is-warning',
      this.props.className
    );

    const style = multiline && height ? { height } : null;

    const resizer =
      multiline != null
        ? <Resizer
            contents={value || placeholder}
            currentHeight={height}
            minimumLines={typeof multiline === 'number' ? multiline : 1}
            onResize={handleExpandingResize}
          />
        : null;

    const prefixMarkup = prefix
      ? <div className="c-Input__item c-Input__prefix">
          {prefix}
        </div>
      : null;

    const suffixMarkup = suffix
      ? <div className="c-Input__item c-Input__suffix">
          {suffix}
        </div>
      : null;

    const statefulHelperTextMarkup = () => {
      return [error, success, warning].map(state => {
        if (state && typeof state === 'string' && state.length) {
          return (
            <div className="c-Input__helper-label">
              {state}
            </div>
          );
        }
      });
    };

    const inputElement = React.createElement(multiline ? 'textarea' : 'input', {
      ...rest,
      autoFocus,
      disabled,
      id,
      name,
      onBlur,
      onFocus,
      placeholder,
      readOnly,
      style,
      type,
      value,
      className: 'c-Input__field',
      onChange: handleOnChange,
      ref: inputRef,
    });

    return (
      <div className="c-InputWrapper">
        <div className={className}>
          {prefixMarkup}
          {inputElement}
          {suffixMarkup}
          <div className="c-Input__backdrop" />
          {resizer}
        </div>
        {statefulHelperTextMarkup()}
      </div>
    );
  }
}

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
