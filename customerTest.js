import customComponentA from "./customerA.js"
import closeButton from "./closeButton.js"
class customComponent extends HTMLElement {
  static get observedAttributes() {
    return ["data-content", "data-name", "data-position", "data-avatar"]
  }
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
      <div class="testimonial">
        <close-button></close-button>
        <div class="testimonial__content">${data.content}</div>
        <div class="testimonial__footer">
          <customer-a
            data-avatar="https://cn.vitejs.dev/logo.svg"
            data-name="customer-a"
          ></customer-a>
          <div>
            <div class="testimonial__name">${data.name}</div>
            <div class="testimonial__role">${data.position}</div>
          </div>
        </div>
      </div>
    `
    this.styles = document.createElement("style")
    this.styles.innerHTML = `
      :host {
        display: block;
        all: inherit;
      }
      :host(.hide) {
        display: none;
      }
      .hide {
        display: none;
      }
      .show {
        display: block;
      }
      :host(.red) .testimonial {
        background-color: red;
        color: #fff;
      }
      :host([orange]) .testimonial {
        background-color: var(--orange);
        color: #fff;
      }
      .testimonial {
        padding: 20px;
        border-radius: 10px;
        position: relative;
        margin: 20px;
        font-family: Latb, serif;
        // background-color:#fff;
        border: 4px solid #ddd;
      }

      .testimonial__content {
        font-size: 18px;
        line-height: 1.5;
        margin-bottom: 20px;
        // font-family: serif;
        // color:inherit;
      }

      .testimonial__footer {
        display: flex;
        align-items: center;
      }

      .testimonial__avatar {
        border-radius: 50%;
        margin-right: 20px;
      }

      .testimonial__name {
        font-weight: bold;
        color: inherit;
        margin-bottom: 5px;
      }

      .testimonial__role {
        color: #888;
      }
    `
    this.shadowRoot.appendChild(this.template.content)
    this.shadowRoot.appendChild(this.styles)
  }

  //生命周期
  connectedCallback() {
    this.render()
    this.shadowRoot.querySelector("customer-a").addBorder()

    this.shadowRoot
      .querySelector("close-button")
      .addEventListener("click", (e) => {
        // this.getRootNode().getRootNode().getRootNode().host.close()
        // this.hide()
        window.dispatchEvent(
          new CustomEvent("deteleEvent", {
            detail: {
              id: "12",
            },
          })
        )
      })
    // document.addEventListener("click", (e) => {
    //   if (!e.composedPath().includes(this)) {
    //     this.hide()
    //   }
    // })
  }
  attributeChangedCallback(attr, oldValue, newValue) {
    console.log(attr, oldValue, newValue)
    if (oldValue && oldValue != newValue) {
      switch (attr) {
        case "data-content":
          this.shadowRoot.querySelector(".testimonial__content").textContent =
            newValue
          break
        case "data-name":
          this.shadowRoot.querySelector(".testimonial__name").textContent =
            newValue
          break
        case "data-position":
          this.shadowRoot.querySelector(".testimonial__role").textContent =
            newValue
          break
        case "data-avatar":
          this.shadowRoot.querySelector(".testimonial__avatar").src = newValue
          break
      }
    }
  }
  changeBG() {
    this.styles.background = "red"
  }
  hide() {
    console.log(1)
    this.classList.add("hide")
  }
  show() {
    this.classList.remove("hide")
  }
}

customElements.define("customer-test", customComponent)
export default customComponent
