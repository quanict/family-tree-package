<div class="nested-padding-{{$level}}">
    <span></span>
    <span>{{$human->name}}</span>
</div>
@foreach($human->children as $child)
    @include("IctFamilyTree::components.nested",['human'=>$child, 'level'=>$level+1])
@endforeach

