<script lang="ts">
  import client from '../sanity-client'
  import { onMount, onDestroy } from 'svelte'

  const { _id, _type } = $props()

  let section = $state(client.getSectionImage(_id))

  let root: HTMLDivElement;
  let visible = $state(false);

  function setupObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          visible = true; // Stop observing once the class is applied
        } else {
          visible = false;
        }
      });
  }, {
      threshold: 0.1
    });

    if (root) {
      observer.observe(root);
    }

    return () => {
      observer.disconnect();
    };
  }

</script>

{#await section}
  <p>Loading...</p>
{:then section}
  <div
    class="row justify-content-center"
    bind:this={root}
    use:setupObserver
  >
    <img class="hidden col-12 col-lg-6" src={section.imageUrl} alt={section.title} class:unhidden={visible} />
  </div>

  {#if root}
    {console.log(root)}
  {/if}
{/await}

<style>
  img {
    transition: opacity 0.5s ease-in-out;
  }
  .hidden {
    opacity: 0;
  }

  .unhidden {
    opacity: 1;
  }
</style>
