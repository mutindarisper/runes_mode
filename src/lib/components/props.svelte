<script lang="ts">
    
    type Props = {
        name:String;
        age:Number;
        job:String;
    }

    let { name, age, job } : Props = $props()

</script>
<p>{name}</p>
<p>{age}</p>
<p>{job}</p>