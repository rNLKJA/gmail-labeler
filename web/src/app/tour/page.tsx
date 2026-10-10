import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Product Tour',
  description: 'Walkthrough of key features and workflows in Gmail Labeler',
};

const workflows = [
  {
    id: 1,
    title: 'Explore the Taxonomy',
    video: '/showcase/workflow-1-taxonomy.mp4',
    poster: '/showcase/workflow-1-taxonomy-poster.jpg',
    duration: '~23s',
    steps: [
      'Navigate to the Provider Taxonomy page',
      'Browse 20+ provider types with descriptions',
      'Search where a domain lands (e.g., "github.com")',
      'See example rules for each provider type',
    ],
  },
  {
    id: 2,
    title: 'Dry-Run Simulator',
    video: '/showcase/workflow-2-simulator.mp4',
    poster: '/showcase/workflow-2-simulator-poster.jpg',
    duration: '~20s',
    steps: [
      'Open the Dry-Run Simulator',
      'Load sample inbox data (100 threads)',
      'Watch threads get classified in real-time',
      'Review label distribution and action log',
    ],
  },
  {
    id: 3,
    title: 'Privacy and Governance',
    video: '/showcase/workflow-3-governance.mp4',
    poster: '/showcase/workflow-3-governance-poster.jpg',
    duration: '~33s',
    steps: [
      'Read the Privacy Impact Assessment',
      'Explore governance and failure modes',
      'Review Architecture Decision Records',
      'See transparent decision-making process',
    ],
  },
];

const screenshots = [
  { src: '/showcase/desktop-Home.png', alt: 'Landing page with feature overview', caption: 'Landing page' },
  { src: '/showcase/desktop-Taxonomy.png', alt: 'Provider taxonomy browser', caption: 'Provider taxonomy' },
  { src: '/showcase/desktop-Simulator.png', alt: 'Dry-run simulator interface', caption: 'Dry-run simulator' },
  { src: '/showcase/desktop-Governance.png', alt: 'Governance dashboard', caption: 'Governance' },
  { src: '/showcase/desktop-Methods.png', alt: 'Methods and decision records', caption: 'Methods & DRs' },
  { src: '/showcase/mobile-Home.png', alt: 'Mobile landing page', caption: 'Mobile view' },
];

export default function TourPage() {
  return (
    <main className="container mx-auto px-4 py-8 max-w-5xl">
      <h1 className="text-4xl font-bold mb-4">Product Tour</h1>
      <p className="text-lg text-muted-foreground mb-12">
        Watch these walkthroughs to see Gmail Labeler&apos;s key features and workflows in action.
      </p>

      <section className="space-y-16 mb-16">
        {workflows.map((workflow) => (
          <article key={workflow.id} className="space-y-4">
            <div className="flex items-baseline gap-3">
              <h2 className="text-2xl font-semibold">
                {workflow.id}. {workflow.title}
              </h2>
              <span className="text-sm text-muted-foreground">{workflow.duration}</span>
            </div>

            <div className="rounded-lg overflow-hidden border bg-card shadow-sm">
              <video
                controls
                muted
                playsInline
                preload="metadata"
                className="w-full"
                aria-label={`${workflow.title} walkthrough video`}
              >
                <source src={workflow.video} type="video/mp4" />
                <p>Your browser does not support the video tag.</p>
              </video>
            </div>

            <div className="bg-muted/50 rounded-lg p-6">
              <h3 className="font-medium mb-3">Steps</h3>
              <ol className="space-y-2 list-decimal list-inside text-muted-foreground">
                {workflow.steps.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ol>
            </div>
          </article>
        ))}
      </section>

      <section className="space-y-6">
        <h2 className="text-3xl font-semibold">Screenshots</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {screenshots.map((screenshot, idx) => (
            <figure key={idx} className="space-y-2">
              <div className="rounded-lg overflow-hidden border bg-card shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={screenshot.src}
                alt={screenshot.alt}
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
              <figcaption className="text-sm text-muted-foreground text-center">
                {screenshot.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mt-16 p-6 rounded-lg bg-muted/50">
        <h2 className="text-xl font-semibold mb-3">Accessibility</h2>
        <p className="text-muted-foreground">
          All videos include on-screen captions showing each step. Screenshots are provided with
          descriptive alt text. For detailed feature descriptions, visit the{' '}
          <a href="/methods" className="underline hover:text-foreground">
            Methods
          </a>{' '}
          page or explore the interactive{' '}
          <a href="/taxonomy" className="underline hover:text-foreground">
            Taxonomy
          </a>
          .
        </p>
      </section>
    </main>
  );
}
