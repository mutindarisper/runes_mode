<script>
	import Props from "$lib/components/props.svelte";
    import Runes from "$lib/components/runes.svelte"
	import Snippets from "$lib/components/snippets.svelte";
</script>


<div>
    <h1>$state(), $derived(), $effect()</h1>
    <Runes />
    <h1>$props()</h1>
    <Props name="Risper" age={27} job="Software Engineer" />
    <h1>$snippet()</h1>
    <Snippets />
</div>
