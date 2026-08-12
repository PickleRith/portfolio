<script lang="ts">
	import { onMount } from "svelte";

	let { greeting = "Hello" }: { greeting?: string } = $props();

	const typingInterval = 70;

	let typed = $state("");
	let caret: HTMLElement | undefined = $state();

	const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

	onMount(async () => {
		// Respect users who have asked for less motion — show it fully typed.
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			typed = greeting;
			caret?.classList.add("hidden");
			return;
		}

		await sleep(400);
		for (let i = 0; i < greeting.length; i++) {
			typed += greeting[i];
			await sleep(typingInterval);
		}
		caret?.classList.remove("animate-pulse");
		caret?.classList.add("hidden");
	});
</script>

<span>
	{typed}<span bind:this={caret} class="animate-pulse font-extralight">|</span>
</span>
