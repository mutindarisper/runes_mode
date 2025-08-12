<script lang="ts">
    const message = "Life is good"

    let items = [
        { id:1, name:"Risper", age:27 },
        { id:2, name:"John", age:30 },
        { id:3, name:"Jane", age:25 }
    ]


</script>

{#snippet itemRow(item:any)}
    <li>
        <span>{item.name}</span>
        <span>{item.age}</span>
        <span>{message}</span>
    </li>
    
{/snippet}

<ul>
    {#each items as  item}
    {@render itemRow(item)}
        
    {/each}
</ul>

