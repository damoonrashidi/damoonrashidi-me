import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { PostService } from "@/blog/post.service.ts";
import { Header } from "@/components/header.tsx";

interface PostStatistic {
	slug: string;
	snippet: string;
	imageUrl?: string;
	read_count: number;
	referrals: Record<string, Array<{ count: number; path: string }>>;
}

function formatReadCount(count: number): string {
	const formatter = Intl.NumberFormat("en-us");
	return formatter.format(count).replace(",", "_");
}

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

			const referrals: Record<
				string,
				Array<{ count: number; path: string }>
			> = {};
			for await (const ref of refs) {
				const url = new URL(String(ref.key[ref.key.length - 1]));
				if (!referrals[url.host]) {
					referrals[url.host] = [];
				}
				referrals[url.host].push({
					count: Number(ref.value),
					path: url.pathname,
				});

				referrals[url.host].sort((a, b) => b.count - a.count);
			}

			summary.referrals = referrals;

			data.push(summary);
		}

		return ctx.render(data);
	},
};

const Rows = ({
	host,
	paths,
}: { host: string; paths: Array<{ count: number; path: string }> }) => {
	if (paths.length === 1) {
		return (
			<tr>
				<td>
					<a href={`https://${host}`}>{host}</a>
				</td>
				<td className="text-highlight text-right">{paths[0].count}</td>
			</tr>
		);
	}

	return (
		<>
			<tr>
				<td>{host}</td>
				<td>{""}</td>
			</tr>
			{paths.map(({ path, count }) => (
				<tr>
					<td>
						<a
							href={`https://${host}${path}`}
							className="ml-4 pl-2 border-l-2 border-dotted border-subtle inline-block"
						>
							{path}
						</a>
					</td>
					<td className="text-right text-highlight">{count}</td>
				</tr>
			))}
		</>
	);
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
					{formatReadCount(statistic.read_count)}
				</span>
			</h2>
			<p className="text-subtle">{statistic.snippet}</p>
			<table
				cellPadding={0}
				cellSpacing={0}
				className="border-collapse border-spacing-0 border-none text-sm w-[100%]"
			>
				{Object.entries(statistic.referrals).map(([host, paths]) => (
					<Rows host={host} paths={paths} />
				))}
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
						{formatReadCount(
							data.reduce((sum, { read_count }) => sum + read_count, 0),
						)}
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
