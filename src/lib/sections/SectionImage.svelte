<script lang="ts">
  import client from '../sanity-client'

  const { _id, _type } = $props()

  let section = $state(client.getSectionImage(_id))
</script>

{#await section}
  <p>Loading...</p>
{:then section}

  <div class="section-image">
    <img src={section.imageUrl} alt={section.title} />
  </div>
{/await}

<style>
  .section-image {
    text-align: center;

    img {
      width: 700px;
      height: auto;
    }
  }
</style>
