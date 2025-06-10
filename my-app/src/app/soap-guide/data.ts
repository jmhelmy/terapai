// src/app/soap-guide/data.ts
export interface Subtopic {
    name: string;
    slug: string; // Slug for the issue, e.g., "low-back-pain"
    // Optional: Add metaTitle, metaDescription for SEO for each issue page
  }
  
  export interface GuideCategory {
    name: string; // Display name, e.g., "Physical Therapy"
    slug: string; // URL slug, e.g., "physical-therapy"
    path: string; // Full path to the main category page, e.g., "/soap-guide/physical-therapy"
    isGroup: boolean; // True if it's a profession group with subtopics
    overviewComponent?: string; // Filename of the content component in _profession-content
    subtopics?: Subtopic[];
    // Optional: Add metaTitle, metaDescription for SEO for each profession page
  }
  
  export const guideCategories: GuideCategory[] = [
    // --- GENERAL GUIDES ---
    {
      name: "Introduction to SOAP Notes",
      slug: "introduction",
      isGroup: false,
      path: "/soap-guide",
    },
    {
      name: "How to Write Effective SOAP Notes",
      slug: "how-to-write",
      isGroup: false,
      path: "/soap-guide/how-to-write",
    },
    {
      name: "AI for SOAP Note Charting with Terapai",
      slug: "ai-soap-notes",
      isGroup: false,
      path: "/soap-guide/ai-soap-notes",
    },
  
    // --- PROFESSIONS (5 examples, 3 issues each) ---
    {
      name: "Physical Therapy",
      slug: "physical-therapy",
      isGroup: true,
      path: "/soap-guide/physical-therapy",
      overviewComponent: "PhysicalTherapyContent",
      subtopics: [
        { name: "Low Back Pain Example", slug: "low-back-pain" },
        { name: "Knee Sprain (ACL) Example", slug: "knee-sprain-acl" },
        { name: "Rotator Cuff Strain Example", slug: "rotator-cuff-strain" },
      ],
    },
    {
      name: "Occupational Therapy",
      slug: "occupational-therapy",
      isGroup: true,
      path: "/soap-guide/occupational-therapy",
      overviewComponent: "OccupationalTherapyContent",
      subtopics: [
        { name: "Stroke Rehab (ADL Focus) Example", slug: "stroke-rehab-adl" },
        { name: "Carpal Tunnel Syndrome Example", slug: "carpal-tunnel-syndrome" },
        { name: "Pediatric Fine Motor Skills Example", slug: "pediatric-fine-motor" },
      ],
    },
    {
      name: "Speech Language Pathology",
      slug: "speech-language-pathology",
      isGroup: true,
      path: "/soap-guide/speech-language-pathology",
      overviewComponent: "SpeechLanguagePathologyContent",
      subtopics: [
        { name: "Dysphagia (Swallowing Difficulty) Example", slug: "dysphagia" },
        { name: "Aphasia (Post-Stroke Communication) Example", slug: "aphasia-post-stroke" },
        { name: "Childhood Articulation Example", slug: "childhood-articulation" },
      ],
    },
    {
      name: "Psychotherapy & Counseling",
      slug: "psychotherapy",
      isGroup: true,
      path: "/soap-guide/psychotherapy",
      overviewComponent: "PsychotherapyContent",
      subtopics: [
        { name: "Major Depressive Disorder (MDD) Example", slug: "depression-mdd" },
        { name: "Generalized Anxiety Disorder (GAD) Example", slug: "anxiety-gad" },
        { name: "Substance Use Disorder (SUD) Example", slug: "substance-use-disorder" },
        { name: "Post-Traumatic Stress Disorder (PTSD) Example", slug: "ptsd" },
        { name: "Obsessive-Compulsive Disorder (OCD) Example", slug: "ocd" },
        { name: "Bipolar II Disorder (Depressive Episode) Example", slug: "bipolar-ii-depressive" },
        { name: "Grief Counseling Example", slug: "grief-counseling" },
        { name: "Couples Therapy (Communication) Example", slug: "couples-therapy-communication" },
        { name: "Adult ADHD (Coping Strategies) Example", slug: "adult-adhd-coping" },
        { name: "Panic Disorder with Agoraphobia Example", slug: "panic-disorder-agoraphobia" },
      ],
    },
    {
      name: "Veterinary Medicine",
      slug: "veterinary",
      isGroup: true,
      path: "/soap-guide/veterinary",
      overviewComponent: "VeterinaryContent",
      subtopics: [
        { name: "Canine Annual Wellness Exam Example", slug: "canine-wellness" },
        { name: "Feline Vomiting/Diarrhea Example", slug: "feline-gi-upset" },
        { name: "Equine Lameness Evaluation Example", slug: "equine-lameness" },
      ],
    },
    // TODO: Add other professions like Psychiatry, Clinical Social Worker, NP, PA here
    // with their 'overviewComponent' and 'subtopics'.
  ];