<script lang="ts">
  import { camelToKebab, resolveComponent } from '../utils'
  import client from '../sanity-client'
  import Menu from '../components/Menu.svelte'
  import DropVideo from '../components/DropVideo.svelte'
  import { Hamburger } from 'svelte-hamburgers'
  import { globalState } from '../state.svelte';

  let page = $state(client.getPage('/'))

  const sections = import.meta.glob('../sections/*.svelte')

  const toggleMenu = () => {
    globalState.menuIsOpen = !globalState.menuIsOpen
  }
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
  <Menu open={globalState.menuIsOpen} {toggleMenu} />
  <DropVideo />
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

<style>
</style> 