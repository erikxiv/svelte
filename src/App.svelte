<script>
  export let version;
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js');
  }
  import '@material/mwc-list/mwc-list.js';
  import '@material/mwc-list/mwc-list-item.js';
  import '@material/mwc-icon';
  import '@material/mwc-icon-button';
  import '@material/mwc-top-app-bar';
</script>
<style>
mwc-top-app-bar {
  --mdc-theme-primary: white;
  --mdc-theme-on-primary: black;
}
html {
  box-sizing: border-box;
  font-size: 16px;
}

*, *:before, *:after {
  box-sizing: inherit;
}

body, h1, h2, h3, h4, h5, h6, p, ol, ul {
  margin: 0;
  padding: 0;
  font-weight: normal;
}

ol, ul {
  list-style: none;
}

img {
  max-width: 100%;
  height: auto;
}
</style>
<mwc-top-app-bar>
    <mwc-icon-button icon="menu" slot="navigationIcon"></mwc-icon-button>
    <div slot="title">All the things {version}</div>
    <mwc-icon-button icon="favorite" slot="actionItems"></mwc-icon-button>
    <div>
<mwc-list>
  <mwc-list-item twoline=1>
    <span>Item 0as</span>
    <span slot="secondary">asdf line</span>
  </mwc-list-item>
  <mwc-list-item twoline=1>
    <span>Item 1</span>
    <span slot="secondary">Secondary line</span>
  </mwc-list-item>
  <mwc-list-item twoline=1>
    <span>Item 3</span>
    <span slot="secondary">Secondary line</span>
  </mwc-list-item>
</mwc-list>
    </div>
</mwc-top-app-bar>
