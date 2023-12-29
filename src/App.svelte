<script>
  import { onMount } from "svelte";
  import { Router, Link, Route } from "svelte-routing";
  import Edit from "./components/Edit.svelte";
  import List from "./components/List.svelte";
  import Start from "./components/Start.svelte";
  import Search from "./components/Search.svelte";
  import Missing from "./components/Missing.svelte";
  import Playground from "./components/Playground.svelte";
  import Teaser from "./components/Teaser.svelte";
  import View from "./components/View.svelte";
  import { flattened } from "./data";
  import environment from "./environment";
  import { RDF } from "./namespaces";
  const auth = require("solid-auth-client");

  export let version;
  let loggedInStatus;

  let things = [];
  const doc = environment.getDocument("default");
  const schema = environment.getDocument("schema");
  doc.then((doc) => {
    things = doc
      .match(null, RDF.type)
      .filter((q) => q.subject.termType === "NamedNode")
      .toArray()
      .map((q) => q.subject);
  });

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js");
  }

  auth.trackSession((session) => {
    loggedInStatus = !!session;
    if (session) {
      console.log(`The user is ${session.webId}`);
    }
  });

  export let url = "";
</script>

<div>
  <div>
    {#await Promise.all([doc, schema])}
      <p>...waiting</p>
    {:then notused}
      <Router {url}>
        <Route redirect={loggedInStatus ? undefined : "/start"}>
          <List {things} {version} />
        </Route>
        <Route path="/start" let:router>
          <Start />
        </Route>
        <Route path="/edit/:id" let:router>
          <Edit thing={things[router.params.id]} />
        </Route>
        <Route path="/view/:id" let:router>
          <View thing={things[router.params.id]} />
        </Route>
        <Route path="/search" let:router>
          <Search />
        </Route>
        <Route path="/playground">
          <Playground />
        </Route>
        <Route fallback>
          <Missing />
        </Route>
      </Router>
    {:catch error}
      <p style="color: red">{error.message}</p>
    {/await}
  </div>
</div>
