<script lang="ts">
  import { PortableText } from '@portabletext/svelte'
  import client from '../sanity-client'
  import { fadeInOnScroll } from '../actions/fadeInOnScroll'

  const { _id, _type } = $props()

  let section = $state(client.getSection(_id))
</script>
{#await section then section}
  <div class="block-text" use:fadeInOnScroll>
    <PortableText value={section.text} />
  </div>
{/await}

<style>
  .block-text {
    margin: 0 auto;

    @media (min-width: 992px) {
      max-width: 50%;
    }
  }
</style>