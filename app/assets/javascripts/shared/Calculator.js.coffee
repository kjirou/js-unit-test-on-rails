class Calculator
  constructor: ->
    @_result = 0

  getResult: ->
    @_result

  add: (value) ->
    @_result += value

window.Calculator = Calculator
