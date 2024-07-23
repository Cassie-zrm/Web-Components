class customComponentA extends HTMLElement {
  constructor() {
    super()
    this.attachShadow({
      mode: "open",
    })
  }
  render() {
    const data = this.dataset
    this.template = document.createElement("template")
    this.template.innerHTML = `
      <img alt="avatar" src="${data.avatar}" class="testimonial__avatar" width="50" height="50">
      `
    this.styles = document.createElement("style")
    this.styles.innerHTML = `
        
      .testimonial__avatar {
        border-radius: 50%;
        margin-right: 20px;
      }
      `
    this.shadowRoot.appendChild(this.template.content)
    this.shadowRoot.appendChild(this.styles)
  }
  addBorder() {
    this.shadowRoot.querySelector("img").style.border = "3px solid red"
  }
  //生命周期
  connectedCallback() {
    this.render()
    const temp1 = this.getRootNode().getRootNode().host
    console.dir(temp1)
    temp1.changeBG()
  }
}

customElements.define("customer-a", customComponentA)
export default customComponentA
