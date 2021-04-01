import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Vue Admin Template'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} | ${title}`.toUpperCase()
  }
  return `${title}`
}
