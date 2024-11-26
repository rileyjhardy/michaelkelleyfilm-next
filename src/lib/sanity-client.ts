import { createClient, type ClientConfig, type SanityClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export class SanityService {
  private client: SanityClient
  private builder: ReturnType<typeof imageUrlBuilder>

  constructor(config?: Partial<ClientConfig>) {
    this.client = createClient({
      projectId: '8fwxmm43',
      dataset: import.meta.env.VITE_SANITY_ENV || 'production',
      apiVersion: '2024-09-18',
      useCdn: true,
    })
    this.builder = imageUrlBuilder(this.client)
  }

  urlFor(source: SanityImageSource) {
    return this.builder.image(source)
  }

  async getPage(slug: string) {
    return this.client.fetch(`*[_type == "page" && slug.current == $slug][0] {
      ...,
      sections[]-> { _id, _type }
    }`, { slug })
  }

  async getSection(id: string) {
    return this.client.fetch(`*[_id == $id][0]`, { id })
  }

  async getSectionVideoHero(id: string) {
    return this.client.fetch(`*[_id == $id][0] {
      ...,
      "videoUrl": video.asset->url,
      "foregroundImageUrl": foregroundImage.asset->url
    }`, { id })
  }

  async getSectionProjectGallery(id: string) {
    return this.client.fetch(`*[_id == $id][0] {
      ...,
      projects[]-> {
        ...,
        "thumbnailUrl": thumbnail.asset->url
      }
    }`, { id })
  }

  async getSectionImage(id: string) {
    return this.client.fetch(`*[_id == $id][0] {
      ...,
      "imageUrl": image.asset->url
    }`, { id })
  }

  async getSectionContact(id: string) {
    return this.client.fetch(`*[_id == $id][0] {
      ...,
      contact->{
        ...,
        socialLinks[]->
      }
    }`, { id })
  }

  async getGlobalConfig() {
    return this.client.fetch(`*[_type == "globalConfig"][0] {
      ...,
      socialLinks[]->
    }`)
  }

  async getMenu() {
    return this.client.fetch(`*[_type == "menu"][0] {
      ...,
      items[]->
    }`)
  }

  async getProject(slug: string) {
    return this.client.fetch(`*[_type == "project" && slug.current == $slug][0]`, { slug })
  }

  // async getPosts() {
  //   return this.client.fetch(`*[_type == "post"] | order(publishedAt desc) {
  //     _id,
  //     title,
  //     slug,
  //     publishedAt,
  //     excerpt,
  //     mainImage,
  //     "categories": categories[]->title
  //   }`)
  // }

  // async getPost(slug: string) {
  //   return this.client.fetch(
  //     `*[_type == "post" && slug.current == $slug][0]{
  //       _id,
  //       title,
  //       slug,
  //       publishedAt,
  //       excerpt,
  //       mainImage,
  //       body,
  //       "categories": categories[]->title,
  //       "author": author->{name, image}
  //     }`,
  //     { slug }
  //   )
  // }

  // async getCategories() {
  //   return this.client.fetch(`*[_type == "category"] {
  //     _id,
  //     title,
  //     description
  //   }`)
  // }

  // async getPostsByCategory(category: string) {
  //   return this.client.fetch(
  //     `*[_type == "post" && $category in categories[]->title] | order(publishedAt desc) {
  //       _id,
  //       title,
  //       slug,
  //       publishedAt,
  //       excerpt,
  //       mainImage,
  //       "categories": categories[]->title
  //     }`,
  //     { category }
  //   )
  // }
}

// Create a singleton instance
export const sanityService = new SanityService()

// Export default instance for convenience
export default sanityService
