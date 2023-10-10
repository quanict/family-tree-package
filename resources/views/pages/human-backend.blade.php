@extends('ThemeSneat::master')

@section('container')
    <div class="row">
        <div class="col-12">
            <div class="card " data-animation="FadeIn">
                <div class="card-body p-3 pt-0">
                    <x-input::form.open />


                    <x-input::text.hidden name="id" />

                    <div class="row mt-3">
                        <div class="col-xl-3">
                            <div class="row">
                                @if($model->src )
                                    <img src="{{"/$model->cdn/$model->src"}}" class="img-thumbnail" />
                                @endif
                            </div>

                            <div class="row mt-3">
                                <div class="col-2"></div>
                                <div class="col-8">
                                    <div class="mb-2">
                                        <x-input::checkbox.publish name="status" group="no-label" />
                                    </div>

                                </div>
                            </div>
                            {{--                                <x-input::text name="type" />--}}

                        </div>
                        <div class="col-xl-9">
                            <x-input::text name="name" />
                            <x-input::text name="surname" />
                            <x-input::select.categories name="parent" />
                            <div class="row">
                                <div class="col-6"><x-input::text name="death_at" /></div>
                                <div class="col-6"><x-input::text name="code" /></div>
                                <div class="col-6"><x-input::checkbox.sex name="sex" /></div>
                                <div class="col-6"><x-input::checkbox.is_dead name="alive" /></div>
                                <div class="col-12">@include("IctFamilyTree::components.children")</div>
                            </div>
                        </div>


                    </div>


                    <x-input::button.form-default />
                    <x-input::form.close />
                </div>
            </div>
        </div>
    </div>
@endsection