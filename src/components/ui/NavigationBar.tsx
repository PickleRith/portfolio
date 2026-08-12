import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { Cross as HamburgerCross } from "hamburger-react";
import { useEffect, useRef, useState } from "react";

type NavItem = {
	label: string;
	link: string;
};

export const HoverNavigation = ({ items }: { items: NavItem[] }) => {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
	const [activeIndex, setActiveIndex] = useState<number | null>(0);
	const [menuOpen, setMenuOpen] = useState(false);
	const hamburgerRef = useRef<HTMLDivElement>(null);
	const menuRef = useRef<HTMLDivElement>(null);

	// Highlight whichever section currently occupies the most of the viewport.
	useEffect(() => {
		const sectionElements = items.map((item) => {
			const id = new URL(item.link, window.location.origin).hash.replace(
				"#",
				"",
			);
			return id ? document.getElementById(id) : null;
		});

		const visibility = new Map<Element, number>();

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) =>
					visibility.set(entry.target, entry.intersectionRatio),
				);

				let maxRatio = 0;
				let maxIdx = -1;

				sectionElements.forEach((el, idx) => {
					if (!el) return;
					const ratio = visibility.get(el) ?? 0;
					if (ratio > maxRatio) {
						maxRatio = ratio;
						maxIdx = idx;
					}
				});

				if (maxIdx !== -1 && maxRatio > 0) setActiveIndex(maxIdx);
			},
			{
				rootMargin: "-20% 0px -50% 0px",
				threshold: [0, 0.25, 0.5, 0.75, 1],
			},
		);

		sectionElements.forEach((el) => el && observer.observe(el));
		return () => observer.disconnect();
	}, [items]);

	// Close the mobile menu on an outside click.
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				menuOpen &&
				hamburgerRef.current &&
				menuRef.current &&
				!hamburgerRef.current.contains(event.target as Node) &&
				!menuRef.current.contains(event.target as Node)
			) {
				setMenuOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () =>
			document.removeEventListener("mousedown", handleClickOutside);
	}, [menuOpen]);

	const displayIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;

	return (
		<>
			{/* Desktop */}
			<div className="border-hairline bg-secondary/60 fixed top-5 left-1/2 z-30 hidden -translate-x-1/2 items-center justify-center rounded-full border px-2 py-2 shadow-lg shadow-black/40 backdrop-blur-md md:flex">
				<nav aria-label="Primary">
					<ul className="flex flex-row items-center justify-center">
						{items.map((item, idx) => (
							<li key={item.link}>
								<a
									href={item.link}
									aria-current={
										activeIndex === idx ? "true" : undefined
									}
									className="group relative block h-fit px-5 py-2 text-sm font-medium"
									onMouseEnter={() => setHoveredIndex(idx)}
									onMouseLeave={() => setHoveredIndex(null)}
								>
									<AnimatePresence>
										{displayIndex === idx && (
											<motion.span
												className="bg-accent/15 ring-accent/40 absolute inset-0 z-10 block h-full w-full rounded-full ring-1"
												layoutId="navHighlight"
												initial={{ opacity: 0 }}
												animate={{
													opacity: 1,
													transition: {
														duration: 0.15,
													},
												}}
												exit={{
													opacity: 0,
													transition: {
														duration: 0.15,
														delay: 0.2,
													},
												}}
											/>
										)}
									</AnimatePresence>
									<NavBarLink
										className={
											displayIndex === idx
												? "text-accent"
												: "text-muted-foreground group-hover:text-primary"
										}
									>
										{item.label}
									</NavBarLink>
								</a>
							</li>
						))}
					</ul>
				</nav>
			</div>

			{/* Mobile trigger */}
			<div className="border-hairline bg-secondary/60 fixed top-5 left-1/2 z-50 flex w-[90%] -translate-x-1/2 items-center justify-between rounded-full border pr-2 pl-5 backdrop-blur-xl md:hidden">
				<span className="text-muted-foreground font-mono text-sm">
					RG
				</span>
				<div
					ref={hamburgerRef}
					className="flex [&>div_div]:bg-white!"
				>
					<HamburgerCross
						toggle={setMenuOpen}
						toggled={menuOpen}
						size={20}
						label="Toggle navigation menu"
					/>
				</div>
			</div>

			{/* Mobile menu */}
			<AnimatePresence>
				{menuOpen && (
					<motion.div
						ref={menuRef}
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.95 }}
						transition={{ duration: 0.2 }}
						className="border-hairline bg-secondary/80 fixed top-24 left-1/2 z-40 w-[90%] -translate-x-1/2 rounded-2xl border py-2 backdrop-blur-xl md:hidden"
					>
						<nav aria-label="Mobile">
							<ul className="flex flex-col gap-1">
								{items.map((item, idx) => (
									<motion.li
										key={item.link}
										initial={{ opacity: 0, y: -12 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{
											delay: idx * 0.06,
											duration: 0.25,
										}}
										className="px-3"
									>
										<a
											href={item.link}
											className="hover:bg-accent/10 block rounded-lg px-4 py-3 text-center text-lg transition-colors"
											onClick={() => setMenuOpen(false)}
										>
											{item.label}
										</a>
									</motion.li>
								))}
							</ul>
						</nav>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

export const NavBarLink = ({
	className,
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) => (
	<div
		className={cn(
			"relative z-20 h-fit w-full text-center transition-colors ease-out",
			className,
		)}
	>
		{children}
	</div>
);
