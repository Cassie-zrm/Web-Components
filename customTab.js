class customTab extends HTMLElement {
  constructor() {
    super()
    this.swichTabs = this.swichTabs.bind(this)
    this.attachShadow({
      mode: "open",
    })
  }

  connectedCallback() {
    this.render()
    this.shadowRoot
      .querySelector(".tabs")
      .addEventListener("click", this.swichTabs)
  }
  swichTabs(e) {
    if (e.target.matches("[slot='tab']")) {
      let activeTab = this.tabs.find((tab) => tab.classList.contains("active"))
      let activePanel = this.panels.find((panel) =>
        panel.classList.contains("active")
      )
      if (activeTab && activePanel) {
        activeTab.classList.remove("active")
        activePanel.classList.remove("active")
      }
      activeTab = e.target
      activeTab.classList.add("active")
      let tabId = activeTab.id.split("-")[1]
      activePanel = this.panels.find((panel) => panel.id === `panel-${tabId}`)
      activePanel.classList.add("active")
    }
  }
  render() {
    this.shadowRoot.innerHTML = `
      <div class="tabs">
        <slot name="tab">默认标题</slot>
      </div>
      <div class="panels">
        <slot name="panel">默认内容</slot>
      </div>
      <style>
        ::slotted([slot="panel"]) {
          display: none;
        }
        ::slotted(.active) {
          display: block;
        }
        ::slotted([slot="tab"].active) {
          color: #9861ff;
          outline: 3px solid #9861ff;
        }
      </style>
    `
    this.tabs = this.shadowRoot
      .querySelector("slot[name='tab']")
      .assignedElements({ flatten: true })
    // console.log(this.tabs)
    this.panels = this.shadowRoot
      .querySelector("slot[name='panel']")
      .assignedElements({ flatten: true })
    // console.log(this.panels)
    if (this.tabs.length !== this.panels.length) {
      throw new Error("tab和panel数量不一样")
    }

    for (let i = 0; i < this.tabs.length; i++) {
      let id = Math.random().toString(36).substring(2, 10)
      this.tabs[i].id = "button-" + id
      this.panels[i].id = "panel-" + id
      if (i === 0) {
        this.tabs[i].classList.add("active")
        this.panels[i].classList.add("active")
      }
    }
  }
}
customElements.define("custom-tab", customTab)
export default customTab
