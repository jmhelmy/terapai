// src/components/layout/Header/navigationData.ts
export interface NavItem {
    href: string;
    label: string;
    comingSoon?: boolean;
  }
  
  export const solutionsDropdownItems: NavItem[] = [
    { href: '/solutions/ai-notes', label: 'AI-Assisted Notes' },
    { href: '/solutions/session-insights', label: 'Session Insights' },
    { href: '/solutions/emr-integration', label: 'EMR Integration', comingSoon: true },
  ];
  
  export const navItems: NavItem[] = [
    { href: '/pricing', label: 'Pricing' },
    { href: '/soap-guide', label: 'SOAP Guide' },
    { href: '/blog', label: 'Blog' },
  ];
  
  export const companyDropdownItems: NavItem[] = [
    { href: '/about', label: 'About Us' },
    { href: '/faq', label: 'FAQ' },
    { href: '/about/security', label: 'Security' },
    { href: '/legal/privacy', label: 'Privacy Policy' },
  ];