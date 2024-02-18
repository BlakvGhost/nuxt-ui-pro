import type { Link as ULink, Avatar, Badge, Command } from '#ui/types'

export interface Link extends ULink {
  label: string
  class?: string
  click?: Function
}

export interface AsideLink extends Link {
  icon?: string
  iconClass?: string
}

export interface HeaderPopoverLink extends Link {
  description?: string
  icon?: string
  iconClass?: string
}

export interface HeaderLink extends Link {
  children?: HeaderPopoverLink[]
}

export interface FooterLink extends Link {
}

export interface PageLink extends Link {
  icon?: string
  iconClass?: string
  avatar?: Avatar
  avatarClass?: string
}

export interface NavigationLink extends Link {
  icon?: string
  iconClass?: string
  badge?: string | Badge
}

export interface NavigationTree extends NavigationLink {
  disabled?: boolean
  children?: NavigationTree[]
}

export interface NavigationGroup {
  type?: 'link' | 'accordion'
  defaultOpen?: boolean
  children: NavigationTree[]
}

export interface DocsSearchLink extends Link, Omit<Command, 'id'> {
}
