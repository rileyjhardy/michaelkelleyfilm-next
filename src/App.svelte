<script lang="ts">
  import { camelToKebab, resolveComponent } from './lib/utils'
  import client from './lib/sanity-client'
  import Menu from './lib/components/Menu.svelte'
  import DropVideo from './lib/components/DropVideo.svelte'
  import Video from './lib/components/Video.svelte'
  import { Hamburger } from 'svelte-hamburgers'
  import { globalState } from './lib/state.svelte';
  import { onMount } from 'svelte';

  let page = $state(client.getPage('/'))

  const sections = import.meta.glob('./lib/sections/*.svelte')

  const toggleMenu = () => {
    globalState.menuIsOpen = !globalState.menuIsOpen
  }

  onMount(() => {
    // if the pathname is more than just /, set videoMounted to true
    if (window.location.pathname !== '/') {
      globalState.mountedVideo = window.location.pathname.slice(1)
    }
  })
</script>

{#snippet sectionWrapper(section: any)}
  {#await resolveComponent(section._type, sections) then Component}
    {#if Component}
      <section id={camelToKebab(section._type)}>
        <Component {...section} />
      </section>
    {:else}
      <p>Component not found: {section._type}</p>
    {/if}
  {/await}
{/snippet}

<main>
  {#if globalState.mountedVideo.length > 0}
    <Video slug={globalState.mountedVideo} />
  {/if}

  <DropVideo />
  <Menu open={globalState.menuIsOpen} {toggleMenu} />
  <Hamburger type="spin" onclick={toggleMenu} />
  <div class="container">
    {#await page then page}
      {#each page.sections as section}
        {@render sectionWrapper(section)}
      {/each}
    {:catch error}
      <p>Error: {error}</p>
    {/await}
  </div>
</main>
