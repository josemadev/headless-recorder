<template>
  <div class="tab results-tab">
    <div class="content">
      <pre v-if="code()" v-highlightjs="code()">
        <code class="javascript"></code>
      </pre>
      <pre v-else>
        <code>No code yet...</code>
      </pre>
    </div>
  </div>
</template>
<script>
export const TYPE = {
  PUPPETEER: 'puppeteer',
  PLAYWRIGHT: 'playwright'
}

export default {
  name: 'ResultsTab',
  props: {
    puppeteer: {
      type: String, 
      default: ''
    },
    playwright: {
      type: String, 
      default: ''
    },
    options: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      activeTab: TYPE.PUPPETEER,
      // tabs: [TYPE.PUPPETEER, TYPE.PLAYWRIGHT]
      tabs: [TYPE.PUPPETEER]
    }
  },
  mounted() {
    if (this.options && this.options.code && this.options.code.showPlaywrightFirst) {
      this.activeTab = TYPE.PLAYWRIGHT
      this.tabs = this.tabs.reverse()
    }
    this.$emit('update:tab', this.activeTab)
  },
  methods: {
    code() {
      return this.activeTab === TYPE.PUPPETEER ? this.puppeteer : this.playwright
    },
    changeTab(tab) {
      this.activeTab = tab
      this.$emit('update:tab', tab)
    }
  }
  }
</script>
<style lang="scss" scoped>
  @import "~styles/_variables.scss";

  .results-tab {
    .content {
      display:flex;
      flex-direction:column;
      height:100%;
      .generated-code {
        flex: 1;
        height:100%;
        overflow: auto;
        display: flex;
        flex-direction: column-reverse;
        max-height: $max-content-height;
      }

      pre {
        padding: 0 $spacer;
        font-size: 12px;
      }
      .code {
        font-family: Consolas, Monaco, monospace;
        padding: $spacer;
      }
    }
  }

  .tabs {
    display: flex;
    border-bottom: 1px solid $gray-lighter;
    &__action {
      padding: 12px 20px;
      border: 0;
      background: transparent;
      cursor: pointer;
      font-size: 14px;
      color: $gray-dark;
      outline: none;
      border-bottom: 4px solid transparent;
      text-transform: capitalize;
      display: flex;
      align-items: center;
      &--text {
        margin-left: 10px;
      }
      &.selected {
        border-bottom-color: $blue;
      }
    }
  }
</style>
