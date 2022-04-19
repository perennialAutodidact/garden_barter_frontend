import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'

export const AuthForm = (props) => {
  return (
    <div>AuthForm</div>
  )
}

AuthForm.propTypes = {
  second: PropTypes.third
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(AuthForm)