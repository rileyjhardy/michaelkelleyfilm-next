<script lang="ts">
  import { PortableText } from '@portabletext/svelte'
  import client from '../sanity-client'

  const { _id, _type } = $props()

  // const query = `*[_id == '${_id}'][0]`
  let data = $state(client.getSection(_id))
</script>
{#await data}
  <p>Loading...</p>
{:then data}

  <h1>{data.title}</h1>
  <PortableText value={data.text} />

{/await}
