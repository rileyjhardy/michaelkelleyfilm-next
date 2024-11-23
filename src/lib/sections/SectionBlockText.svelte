<script lang="ts">
  import { PortableText } from '@portabletext/svelte'
  import client from '../sanity-client'

  const { _id, _type } = $props()

  let data = $state(client.getSection(_id))
</script>
{#await data}
  <p>Loading...</p>
{:then data}

<div class="block-text">
  <PortableText value={data.text} />
</div>

{/await}

<style>
  .block-text {
    max-width: 50%;
    margin: 0 auto;
  }
</style>