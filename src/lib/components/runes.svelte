<!-- <script>
    import { counter } from "$lib/components/Global.svelte"
    // let counter = $state(0);


    // const increment = () => counter ++;

</script>

<div>
<button onclick={() => counter.increment()}>Increment</button>
<p>Counter: {counter.value}</p>
   
</div> -->

<!-- effect and derived state -->

<script>
    import { person } from "../state/global.svelte"
    let count = $state(0)
    let doubled = $derived(count * 2) //derived/computed values are read only, cannot directly assign a value


    function increment() {
        count += 1
    }

    function changeTitle() {
        person.jobTitle = "Frontend Engineer"
    }

    //handles side effects, runs everytime dependencies (count) change
    //runs after the DOM has been updated
    $effect(() => { 
        console.log('effect has run, count is:', count)
        return () => {console.log('effect has been unmounted')}
    })

</script>

<div>
    <button onclick={increment}>Increment</button>
    <h1>{doubled}</h1>

</div>


<h1>Render values from global state</h1>

<p>{person.name}</p>
<p>{person.age}</p>
<p>{person.jobTitle}</p>

<h1>Change values from global state</h1>
<button onclick={changeTitle}>Change Title</button>
<p>{person.jobTitle}</p>

