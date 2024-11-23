<script lang="ts">
  import { camelToKebab, resolveComponent } from './lib/utils'
  import client from './lib/sanity-client'
  import Menu from './lib/components/Menu.svelte'
  import { Hamburger } from 'svelte-hamburgers'
  import { globalState } from './lib/state.svelte';

  let data = $state(client.getPage('/'))

  const sections = import.meta.glob('./lib/sections/*.svelte')

  const toggleMenu = () => {
    globalState.menuIsOpen = !globalState.menuIsOpen
  }
</script>

{#snippet sectionWrapper(section: any)}
  {#await resolveComponent(section._type, sections)}
    <p>Loading component...</p>
  {:then Component}
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
  <Hamburger type="spin" onclick={toggleMenu} />
  <div class="container">
    {#await data}
      <p>Loading...</p>
  {:then data}
    {#each data.sections as section}
      {@render sectionWrapper(section)}
    {/each}
  {:catch error}
      <p>Error: {error}</p>
    {/await}
  </div>
</main>

<style>
</style>
