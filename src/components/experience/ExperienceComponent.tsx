import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Position } from "@/data/profile";

const panelClass =
	"border-hairline rounded-2xl border bg-gradient-to-bl from-[#0f151d] via-[#161f2b] to-[#0f151d] px-5 py-6 md:px-7";

export default function Experience({
	experience,
	education,
}: {
	experience: Position[];
	education: Position[];
}) {
	return (
		<Tabs defaultValue="experience" className="w-[90%] md:w-[640px] lg:w-2/3">
			<TabsList className="w-full">
				<TabsTrigger value="experience">Experience</TabsTrigger>
				<TabsTrigger value="education">Education</TabsTrigger>
			</TabsList>

			<TabsContent value="experience" className={panelClass}>
				{experience.map((position, i) => (
					<PositionItem
						key={position.title + position.dateRange}
						position={position}
						isLast={i === experience.length - 1}
					/>
				))}
			</TabsContent>

			<TabsContent value="education" className={panelClass}>
				{education.map((position, i) => (
					<PositionItem
						key={position.title + position.dateRange}
						position={position}
						isLast={i === education.length - 1}
					/>
				))}
			</TabsContent>
		</Tabs>
	);
}

function PositionItem({
	position,
	isLast,
}: {
	position: Position;
	isLast: boolean;
}) {
	const {
		title,
		institution,
		dateRange,
		location,
		summary,
		highlights = [],
	} = position;

	return (
		<div className="flex flex-row items-start gap-4">
			{/* Timeline rail */}
			<div className="flex flex-col items-center justify-start gap-2 self-stretch pt-2">
				<div className="bg-accent ring-accent/20 h-2 w-2 shrink-0 rounded-full ring-4" />
				{!isLast && <div className="bg-hairline w-px flex-grow" />}
			</div>

			<div className={isLast ? "" : "pb-7"}>
				<h3 className="text-lg font-bold">{title}</h3>

				<div className="mt-1 flex flex-col items-start justify-start gap-1">
					{institution && (
						<div className="text-accent text-sm font-medium">
							{institution}
						</div>
					)}

					<div className="text-muted-foreground mb-2 flex flex-row flex-wrap items-center justify-start gap-x-4 gap-y-1 font-mono text-xs">
						<span className="flex flex-row items-center gap-1.5">
							<CalendarIcon /> {dateRange}
						</span>
						<span className="flex flex-row items-center gap-1.5">
							<LocationIcon /> {location}
						</span>
					</div>

					{summary && (
						<p className="text-muted-foreground text-sm">
							{summary}
						</p>
					)}

					{highlights.length > 0 && (
						<ul className="text-muted-foreground mt-1 flex list-outside list-disc flex-col gap-1.5 pl-4 text-sm leading-relaxed">
							{highlights.map((highlight, i) => (
								<li key={i}>{highlight}</li>
							))}
						</ul>
					)}
				</div>
			</div>
		</div>
	);
}

function LocationIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			className="size-3.5 shrink-0"
			aria-hidden="true"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
			/>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
			/>
		</svg>
	);
}

function CalendarIcon() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth={1.5}
			stroke="currentColor"
			className="size-3.5 shrink-0"
			aria-hidden="true"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
			/>
		</svg>
	);
}
