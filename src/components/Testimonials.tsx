import { getPayload } from "payload";
import config from "@/payload/payload.config";
import TestimonialsClient, { type Review } from "./TestimonialsClient";

export const revalidate = 300;

// Shown if the Testimonials collection is empty or the DB is unreachable.
const FALLBACK: Review[] = [
  { name: "Meera Krishnan", rating: 5, text: "Kanaa products truly remind me of homemade food. The flavours feel authentic, comforting, and full of freshness." },
  { name: "Arjun Sathyamurthy", rating: 5, text: "The soup mixes are perfect for busy days. Quick to make, healthy, and incredibly satisfying." },
  { name: "Priya Nandakumar", rating: 5, text: "I love how Kanaa combines traditional taste with modern convenience. It feels like home in every meal." },
];

async function loadTestimonials(): Promise<Review[]> {
  try {
    const payload = await getPayload({ config });
    const { docs } = await payload.find({
      collection: "testimonials",
      where: { approved: { equals: true } },
      sort: "order",
      limit: 20,
    });
    if (!docs.length) return FALLBACK;
    return docs.map((d) => ({
      name: String(d.name ?? ""),
      rating: Number(d.rating ?? 5),
      text: String(d.text ?? ""),
    }));
  } catch {
    return FALLBACK;
  }
}

export default async function Testimonials() {
  const reviews = await loadTestimonials();
  return <TestimonialsClient reviews={reviews} />;
}
