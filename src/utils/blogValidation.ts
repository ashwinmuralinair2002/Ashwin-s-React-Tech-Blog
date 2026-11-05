const letterPattern = /\p{L}/u

export function validateBlogText(value: string, label: string, min: number, max: number) {
  const trimmed = value.trim()
  if (!trimmed) return `${label} is required.`
  if (trimmed.length < min) return `${label} must be at least ${min} characters.`
  if (trimmed.length > max) return `${label} must be no more than ${max} characters.`
  if (!letterPattern.test(trimmed)) return `${label} must contain at least one letter.`
  return ''
}
