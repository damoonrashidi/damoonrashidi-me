import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { PostService } from "@/blog/post.service.ts";
import { Header } from "@/components/header.tsx";

interface PostStatistic {
	slug: string;
	snippet: string;
	imageUrl?: string;
	read_count: number;
	referrals: Record<string, number>;
}

const formatter = Intl.NumberFormat("en-us");

export const handler: Handlers = {
	async GET(_, ctx) {
		const data: PostStatistic[] = [];

		const kv = await Deno.openKv();
		const posts = await PostService.getPosts();

		for (const post of posts) {
			const readCount = await kv.get(["posts", post.slug, "read_count"]);
			const summary: PostStatistic = {
				slug: post.slug,
				snippet: post.snippet,
				imageUrl: post.ogImageUrl,
				read_count: Number(readCount.value),
				referrals: {},
			};

			const refs = kv.list({ prefix: ["posts", post.slug, "referrals"] });
			for await (const ref of refs) {
				const referral = String(ref.key[ref.key.length - 1]);
				summary.referrals = {
					...summary.referrals,
					[referral]: Number(ref.value),
				};
			}
			data.push(summary);
		}

		return ctx.render(data);
	},
};

const StatSummary = ({ statistic }: { statistic: PostStatistic }) => {
	return (
		<section
			key={statistic.slug}
			className="py-12 font-code border-b-4 border-bgLight last:border-0"
		>
			<h2 className="text-lg">
				{statistic.slug}:{" "}
				<span className="text-highlight">
					{formatter.format(statistic.read_count).replace(",", "_")}
				</span>
			</h2>
			<p className="text-subtle">{statistic.snippet}</p>
			<table className="border-collapse border-spacing-0 border-none text-sm w-[100%]">
				{Object.entries(statistic.referrals)
					.sort(([, a], [, b]) => b - a)
					.map(([ref, count]) => {
						const url = new URL(ref);
						return (
							<tr>
								<td>
									{url.hostname}
									{url.pathname}
								</td>
								<td className="pl-8 text-highlight">
									{formatter.format(count).replace(",", "_")}
								</td>
							</tr>
						);
					})}
			</table>
		</section>
	);
};

export default function StatsPage({ data }: PageProps<PostStatistic[]>) {
	return (
		<>
			<Head>
				<title>Article stats</title>
			</Head>
			<Header />
			<main className="max-w-prose m-auto px-12 sm:px-8 font-code">
				<h1>Article Stats</h1>
				<p>
					There have been{" "}
					<span className="text-highlight">
						{data.reduce((sum, { read_count }) => sum + read_count, 0)}
					</span>{" "}
					visits in total.
				</p>
				{data.map((stat) => (
					<StatSummary key={stat.slug} statistic={stat} />
				))}
			</main>
		</>
	);
}
