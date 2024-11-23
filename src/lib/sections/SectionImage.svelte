<script lang="ts">
  import client from '../sanity-client'

  const { _id, _type } = $props()

  let data = $state(client.getSectionImage(_id))
</script>

{#await data}
  <p>Loading...</p>
{:then data}

  <div class="section-image">
    <img src={data.imageUrl} alt={data.title} />
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
