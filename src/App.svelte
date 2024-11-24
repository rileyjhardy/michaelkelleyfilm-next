<script lang="ts">
  import { Router, Link, Route } from "svelte-routing";
  import Home from './lib/pages/Home.svelte'
  import Video from './lib/pages/Video.svelte'


</script>

<Router>
  <Route path="/:slug" let:params>
    <Video slug={params.slug} />
  </Route>
  <Route path="/">
    <Home />
  </Route>
</Router>
