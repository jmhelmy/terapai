// src/app/soap-guide/[professionSlug]/[issueSlug]/page.tsx
'use client';

import React, { useState, useEffect, Suspense, lazy, ComponentType } from 'react';
import Link from 'next/link';
import { usePathname, notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header/Header';
import { Footer } from '@/components/layout/Footer';
// TWO dots (../../) because this file lives under:
// src/app/soap-guide/[professionSlug]/[issueSlug]/page.tsx
import styles from '../../SoapPage.module.css';
import { guideCategories, GuideCategory, Subtopic } from '../../data';

export default function IssueGuidePage(props: any) {
  const { professionSlug, issueSlug } = props.params as {
    professionSlug: string;
    issueSlug: string;
  };

  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const pathname = usePathname();

  // Build a lookup of lazy‐loaded issue components:
  const createIssueComponentMap = (): Record<string, Record<string, ComponentType<any>>> => {
    const components: Record<string, Record<string, ComponentType<any>>> = {};
    guideCategories.forEach((category) => {
      if (category.isGroup && category.subtopics) {
        components[category.slug] = {};
        category.subtopics.forEach((subtopic) => {
          const capFirst = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
          const componentNameParts = subtopic.slug.split('-').map(capFirst);
          const componentName = componentNameParts.join('') + 'Content';
          try {
            // TWO dots again to reach `src/app/soap-guide/_issue-content/...`
            components[category.slug][subtopic.slug] = lazy(() =>
              import(`../../_issue-content/${category.slug}/${componentName}`)
            );
          } catch {
            // If the import fails, leave that entry undefined.
          }
        });
      }
    });
    return components;
  };

  const IssueContentComponents = createIssueComponentMap();

  // Find the category and subtopic in your data
  const currentProfession = guideCategories.find(
    (cat) => cat.slug === professionSlug && cat.isGroup
  ) as GuideCategory | undefined;

  const currentIssue = currentProfession?.subtopics?.find(
    (sub) => sub.slug === issueSlug
  ) as Subtopic | undefined;

  // Lazy‐loaded component for the specific issue (if it exists)
  const IssueSpecificContent = IssueContentComponents[professionSlug]?.[issueSlug];

  useEffect(() => {
    if (currentProfession) {
      setExpandedGroups((prev) => ({ ...prev, [professionSlug]: true }));
    }
  }, [professionSlug, currentProfession]);

  const toggleGroup = (slug: string) => {
    setExpandedGroups((prev) => ({ ...prev, [slug]: !prev[slug] }));
  };

  if (!currentProfession || !currentIssue) {
    notFound();
    return null;
  }

  const currentActiveGroupSlug = professionSlug;
  const currentActiveSubSlug = `${professionSlug}/${issueSlug}`;

  return (
    <div className={styles.pageWrapper}>
      <Header />
      <div className={styles.mainLayout}>
        <aside className={styles.sidebar}>
          <h2 className={styles.sidebarTitle}>SOAP Note Guides</h2>
          <nav>
            <ul className={styles.navList}>
              {guideCategories.map((category) => (
                <li key={category.slug} className={styles.navItem}>
                  <Link
                    href={category.path}
                    className={`${styles.navLink} ${
                      currentActiveGroupSlug === category.slug &&
                      !currentActiveSubSlug.startsWith(category.slug + '/')
                        ? styles.navLinkActive
                        : ''
                    }`}
                    onClick={(e) => {
                      if (category.isGroup && category.subtopics?.length) {
                        e.preventDefault();
                        toggleGroup(category.slug);
                      }
                    }}
                  >
                    {category.name}
                    {category.isGroup && category.subtopics && (
                      <span
                        className={`${styles.arrow} ${
                          expandedGroups[category.slug] ? styles.arrowUp : ''
                        }`}
                      >
                        &#9662;
                      </span>
                    )}
                  </Link>
                  {category.isGroup && category.subtopics && (
                    <ul
                      className={`${styles.subNavList} ${
                        expandedGroups[category.slug]
                          ? styles.subNavListExpanded
                          : styles.subNavListCollapsed
                      }`}
                    >
                      {category.subtopics.map((subtopic) => (
                        <li key={subtopic.slug} className={styles.subNavItem}>
                          <Link
                            href={`${category.path}/${subtopic.slug}`}
                            className={`${styles.subNavLink} ${
                              currentActiveSubSlug ===
                              `${category.slug}/${subtopic.slug}`
                                ? styles.subNavLinkActive
                                : ''
                            }`}
                          >
                            {subtopic.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <main className={styles.contentArea}>
          <div className={styles.breadcrumbs}>
            <Link href="/soap-guide">SOAP Guides</Link> &gt;{' '}
            <Link href={currentProfession.path}>{currentProfession.name}</Link> &gt;{' '}
            <span>{currentIssue.name}</span>
          </div>

          <h1 className={styles.title}>{currentIssue.name}</h1>

          <Suspense fallback={<div className={styles.paragraph}>Loading example…</div>}>
            {IssueSpecificContent ? (
              <IssueSpecificContent />
            ) : (
              <p className={styles.paragraph}>
                Detailed example content for “{currentIssue.name}” in "{currentProfession.name}" is
                coming soon or could not be loaded.
              </p>
            )}
          </Suspense>
        </main>
      </div>
      <Footer />
    </div>
  );
}
