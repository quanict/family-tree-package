@extends('IctFamilyTree::layout.default')

@section('container')
    <div class="border mt-3 p-2">
        @foreach($humans as $human)
            @include("IctFamilyTree::components.nested",['human'=>$human, 'level'=>0])
        @endforeach
    </div>

@endsection