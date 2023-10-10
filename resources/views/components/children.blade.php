<table class="table table-flush">
    <thead>
    <tr>
    <th>Name</th>
    <th class="text-center">Child</th>
    </tr>
    </thead>
    <tbody>
    @foreach($children as $child)
        <tr>
            <td><a href="{{route("faTreeAdmin.human.edit",['id'=>$child->id])}}">{{$child->name}}</a></td>
            <td class="text-center">{{$child->child_count}}</td>
        </tr>
    @endforeach
    </tbody>
</table>