import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: () =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			// heroImage intentionally omitted (no cover images)

			// Optional: signature “Field Manual” structure
			takeaway: z.string().optional(),
			keyPoints: z.array(z.string()).optional(),
			tags: z.array(z.string()).optional(),
		}),
});

export const collections = { blog };
