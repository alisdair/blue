import React, { PureComponent as Component } from 'react'
import PropTypes from 'prop-types'
import Backdrop from '../Input/Backdrop'
import HelpText from '../HelpText'
import Label from '../Label'
import classNames from '../../utilities/classNames'
import { noop } from '../../utilities/other'
import { standardSizeTypes, stateTypes } from '../../constants/propTypes'

export const optionType = PropTypes.oneOfType([
  PropTypes.shape({
    disabled: PropTypes.bool,
    label: PropTypes.string,
    value: PropTypes.string
  }),
  PropTypes.string
])

export const optionsType = PropTypes.arrayOf(optionType)

export const groupType = PropTypes.shape({
  label: PropTypes.string,
  value: optionsType
})

export const propTypes = {
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  helpText: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.oneOfType([
    groupType,
    optionType,
    optionsType,
    PropTypes.array,
    PropTypes.string
  ]),
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  prefix: PropTypes.string,
  size: standardSizeTypes,
  state: stateTypes,
  value: PropTypes.string
}

const defaultProps = {
  autoFocus: false,
  disabled: false,
  onBlur: noop,
  onChange: noop,
  onFocus: noop,
  options: [],
  value: ''
}

const PLACEHOLDER_VALUE = '__placeholder__'

class Select extends Component {
  constructor (props) {
    super()
    this.state = {
      placeholder: props.placeholder,
      value: props.value
    }
  }

  handleOnChange (e) {
    const value = e.currentTarget.value
    this.props.onChange(value)

    this.setState({
      placeholder: false,
      value
    })
  }

  hasPlaceholder () {
    return this.state.value === '' && this.state.placeholder
  }

  render () {
    const {
      className,
      disabled,
      helpText,
      id,
      label,
      onChange,
      options,
      placeholder,
      prefix,
      seamless,
      size,
      state,
      success,
      value,
      ...rest
    } = this.props

    const hasPlaceholder = this.hasPlaceholder()

    const componentClassName = classNames(
      'c-Select',
      disabled && 'is-disabled',
      hasPlaceholder && 'has-placeholder',
      seamless && 'is-seamless',
      state && `is-${state}`,
      className
    )

    const fieldClassName = classNames('c-InputField', size && `is-${size}`)

    const renderOptions = option => {
      // HTML <optgroup> only allows for single level nesting
      const hasOptions =
        option.hasOwnProperty('value') && Array.isArray(option.value)
      // Group
      if (hasOptions) {
        const label = option.label
        // Recursion!
        return (
          <optgroup label={label} key={label}>
            {option.value.map(renderOptions)}
          </optgroup>
        )
      }
      // Option
      if (typeof option === 'string') {
        return (
          <option key={option} value={option}>
            {option}
          </option>
        )
      } else {
        return (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        )
      }
    }

    const optionsMarkup = Array.isArray(options) ? options.map(renderOptions) : renderOptions(options)

    const placeholderMarkup = hasPlaceholder
      ? <option
        label={this.state.placeholder}
        value={PLACEHOLDER_VALUE}
        disabled
        hidden
        />
      : null

    const labelMarkup = label
      ? <Label for={id}>{label}</Label>
      : null

    const prefixMarkup = prefix
      ? <div className='c-Select__item c-Select__prefix'>
        {prefix}
      </div>
      : null

    const helpTextMarkup = helpText
      ? <HelpText state={state}>
        {helpText}
      </HelpText>
      : null

    const selectedValue = hasPlaceholder ? PLACEHOLDER_VALUE : this.state.value

    return (
      <div className='c-InputWrapper'>
        {labelMarkup}
        <div className={componentClassName}>
          {prefixMarkup}
          <select
            className={fieldClassName}
            disabled={disabled}
            id={id}
            onChange={e => this.handleOnChange(e)}
            value={selectedValue}
            {...rest}
          >
            {placeholderMarkup}
            {optionsMarkup}
          </select>
          <div className='c-SelectIcon' />
          <Backdrop disabled={disabled} state={state} />
        </div>
        {helpTextMarkup}
      </div>
    )
  }
}

Select.propTypes = propTypes
Select.defaultProps = defaultProps

export default Select
