import { splitByCase, upperFirst } from 'scule'
import type { NavItem, ParsedContent } from '@nuxt/content/dist/runtime/types'
import type { NavigationTree } from '#ui-pro/types'

const navMap = {
  'title': 'label',
  '_path': 'to'
}

export function mapContentNavigation (navigation: NavItem[], rootNavigation?: NavItem[]): NavigationTree[] {
  return navigation.map((navLink) => {
    const link = {} as NavigationTree
    for (const key in navLink) {
      if (key === 'children') {
        link.children = navLink.children?.length ? mapContentNavigation(navLink.children, rootNavigation) : undefined
        continue
      }
      if (navLink[key]) {
        // @ts-ignore
        link[navMap[key] || key] = navLink[key]
      }
    }
    return link
  })
}

export function findPageHeadline (page: ParsedContent): string {
  return page._dir?.title ? page._dir.title : splitByCase(page._dir).map(p => upperFirst(p)).join(' ')
}

export function findPageBreadcrumb (navigation?: NavItem[], page?: ParsedContent | undefined | null): NavItem[] {
  if (!navigation || !page) {
    return []
  }

  return navigation.reduce((breadcrumb: NavItem[], link: NavItem) => {
    if (page._path?.startsWith(link._path)) {
      if (link.children) {
        breadcrumb.push(link)
        breadcrumb.push(...findPageBreadcrumb(link.children, page))
      }
    }
    return breadcrumb
  }, [])
}
