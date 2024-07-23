class closeButton extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({
      mode: "open",
    })
  }
  connectedCallback() {
    this.template = document.createElement("template")

    this.template.innerHTML = `
      <button type="button" class="btn-close">x</button>
    `
    this.styles = document.createElement("style")
    this.styles.innerHTML = `
      .btn-close {
        position: absolute;
        right: 10px;
        top: 10px;
        width: 20px;
        display: block;
        height: 20px;
      }
    `
    this.shadowRoot.appendChild(this.styles)
    this.shadowRoot.appendChild(this.template.content)
    window.addEventListener("deteleEvent", (e) => {
      console.log(e.detail.id)
      this.shadowRoot.querySelector(".btn-close").textContent = e.detail.id
    })
  }
}
customElements.define("close-button", closeButton)
export default closeButton
