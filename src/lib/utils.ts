export function camelToKebab(str: string) {
  // Handle edge cases
  if (!str) return '';
  
  return str
    // Add hyphen before any uppercase letter that follows lowercase
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    // Add hyphen before any uppercase letter that follows uppercase and comes before lowercase
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    // Convert the entire string to lowercase
    .toLowerCase();
}

export async function resolveComponent(type: string, sections: any) {
  try {
    const path = `../sections/${type.charAt(0).toUpperCase() + type.slice(1)}.svelte`

    if (path in sections) {
      const module = await sections[path]()

      return module.default
    }
    console.error(`No component found at path: ${path}`)
    return null
  } catch (e) {
    console.error(`Failed to load component for type: ${type}`, e)
    return null
  }
}
