/*
   NumberStepper custom web element. 
   Copyright (c) 2020 Oliver Lau <oliver@ersatzworld.net>
 */
export default class NumberStepper extends HTMLElement {
  constructor() {
      super()
      const h = this.getAttribute('height')
      const shadow = this.attachShadow({mode: 'closed'})
      this.changeEvent = new CustomEvent('change', {
        bubbles: true,
        cancelable: false,
        composed: true
      })
      this.boundOnChange = function () {
        this.dispatchEvent(this.changeEvent)
      }.bind(this)
      this.boundOnStepUp = function () {
        this.input.stepUp()
        this.dispatchEvent(this.changeEvent)
      }.bind(this)
      this.boundOnStepDown = function () {
        this.input.stepDown()
        this.dispatchEvent(this.changeEvent)
      }.bind(this)
      const span = document.createElement('span')
      span.className = 'stepper'
      span.style.height = h
      this.downButton = document.createElement('button')
      this.input = document.createElement('input')
      this.input.type = 'number'
      this.input.min = this.getAttribute('min') | 0
      this.input.max = this.getAttribute('max') | 0
      this.input.step = this.getAttribute('step') || 1
      this.input.value = this.getAttribute('value') | 0
      this.input.style.width = this.getAttribute('innerwidth')
      this.input.style.height = h
      this.downButton.innerHTML = '&minus;'
      this.downButton.title = `decrease by ${this.input.step}`
      this.downButton.style.width = h
      this.downButton.style.height = h
      this.downButton.className = 'left'
      this.upButton = document.createElement('button')
      this.upButton.innerHTML = '&plus;'
      this.upButton.title = `increase by ${this.input.step}`
      this.upButton.style.width = h
      this.upButton.style.height = h
      this.upButton.className = 'right'
      const style = document.createElement('style')
      style.textContent = `
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: inherit;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
span {
  display: inline-block;
  border: none;
  background-color: transparent;
  white-space: nowrap;
}
input[type="number"] {
  -moz-appearance: textfield;
  appearance: none;
  height: auto;
}
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
}
input {
  text-align: right;
  border: none;
  border-radius: 0;
  overflow: hidden;
  font-size: 150%;
  padding-right: 0.5em;
  background-color: #eee;
}
button {
  text-align: center;
  border: none;
  font-size: 150%;
  font-weight: bold;
  background-color: #999;
  padding: 0;
}
button.left {
  border-radius: 50% 0 0 50%;
}
button.right {
  border-radius: 0 50% 50% 0;
}
button:active {
  background-color: #eee;
}`
    span.appendChild(this.downButton)
    span.appendChild(this.input)
    span.appendChild(this.upButton)
    shadow.appendChild(style)
    shadow.appendChild(span)
  }
  get value() {
    return this.input.value
  }
  set value(v) {
    this.input.value = Math.max(+this.input.min, Math.min(v, +this.input.max))
  }
  set max(v) {
    this.input.max = v
    this.input.value = Math.min(+this.input.value, v)
  }
  get max() {
    return this.input.max
  }
  set step(v) {
    this.input.step = Math.max(v, 0)
  }
  get step() {
    return this.input.step
  }
  connectedCallback() {
    this.input.addEventListener('change', this.boundOnChange)
    this.upButton.addEventListener('click', this.boundOnStepUp)
    this.downButton.addEventListener('click', this.boundOnStepDown)
  }
  disconnectedCallback() {
    this.input.removeEventListener('change', this.boundOnChange)
    this.upButton.removeEventListener('click', this.boundOnStepUp)
    this.downButton.removeEventListener('click', this.boundOnStepDown)
  }
}
