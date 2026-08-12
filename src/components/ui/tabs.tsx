"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

function Tabs({
	className,
	...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
	return (
		<TabsPrimitive.Root
			data-slot="tabs"
			className={cn("flex flex-col gap-3", className)}
			{...props}
		/>
	);
}

function TabsList({
	className,
	...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
	return (
		<TabsPrimitive.List
			data-slot="tabs-list"
			className={cn(
				"border-hairline bg-surface text-primary inline-flex w-fit items-center justify-center rounded-xl border p-1",
				className,
			)}
			{...props}
		/>
	);
}

function TabsTrigger({
	className,
	...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
	return (
		<TabsPrimitive.Trigger
			data-slot="tabs-trigger"
			className={cn(
				"text-muted-foreground hover:text-primary focus-visible:outline-accent data-[state=active]:bg-accent/15 data-[state=active]:text-accent data-[state=active]:ring-accent/30 inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-transparent px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-[color,background-color,box-shadow] duration-300 focus-visible:outline-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:ring-1",
				className,
			)}
			{...props}
		/>
	);
}

function TabsContent({
	className,
	...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
	return (
		<TabsPrimitive.Content
			data-slot="tabs-content"
			className={cn("flex-1 outline-none", className)}
			{...props}
		/>
	);
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
