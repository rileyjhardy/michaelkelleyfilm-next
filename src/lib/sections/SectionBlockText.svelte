<script lang="ts">
  import { PortableText } from '@portabletext/svelte'
  import client from '../sanity-client'

  const { _id, _type } = $props()

  let section = $state(client.getSection(_id))
</script>
{#await section}
  <p>Loading...</p>
{:then section}

<div class="block-text">
  <PortableText value={section.text} />
</div>

{/await}

<style>
  .block-text {
    max-width: 50%;
    margin: 0 auto;
  }
</style>