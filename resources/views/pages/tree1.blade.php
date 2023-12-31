<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>Nguyen Van</title>
{{--    <script src="js/lib/jquery.min.js" type="text/javascript"></script>--}}
{{--    <script type="text/javascript" src="js/lib/jquery.validate.js"></script>--}}
{{--    <script charset="utf-8" src="js/lib/d3.v3.min.js" type="text/javascript"></script>--}}

{{--    <script src="js/lib/bootstrap.min.js" type="text/javascript"></script>--}}
{{--    <link rel="stylesheet" href="styles/bootstrap.min.css">--}}
{{--    <link rel="stylesheet" href="styles/font-awesome-4.7.0/css/font-awesome.min.css">--}}
    <!--<script src="js/lib/tether.min.js" type="text/javascript"></script>-->

{{--    <link rel="stylesheet" href="styles/main.css">--}}
    <link rel="stylesheet" href="/family/css/styles.css">

{{--    <script src="js/familyTreeUtil.js" type="text/javascript"></script>--}}
{{--    <script src="js/dictionary.js" type="text/javascript"></script>--}}
{{--    <script src="js/actionHistory.js" type="text/javascript"></script>--}}
{{--    <script src="js/tooltipManager.js" type="text/javascript"></script>--}}
{{--    <script src="js/contextMenuManager.js" type="text/javascript"></script>--}}
{{--    <script src="js/familyTree.js" type="text/javascript"></script>--}}
</head>
<body>
<nav id="main-family-tree-navbar" class = "navbar navbar-default navbar-inverse" role = "navigation">
    <div class = "navbar-header">
        <button type = "button" class = "navbar-toggle" data-toggle = "collapse" data-target = "#main-navbar-collapse">
            <span class = "sr-only">Family tree</span>
            <span class = "icon-bar"></span>
            <span class = "icon-bar"></span>
            <span class = "icon-bar"></span>
        </button>
        <div class = "navbar-brand">Family tree</div>
    </div>
    <div class = "collapse navbar-collapse" id = "main-navbar-collapse">
        <ul class = "nav navbar-nav">
            <li class = "dropdown">
                <a href = "#" class = "dropdown-toggle" data-toggle = "dropdown" id="file-menu">File<b class = "caret"></b></a>
                <ul class = "dropdown-menu">
                    <li>
                        <a href = "#" id="new-item">
                            <i class="glyphicon fa fa-file"></i>
                            <span class="item-text">New</span>
                        </a>
                    </li>
                    <li>
                        <a href = "#" id="open-item">
                            <span class="glyphicon glyphicon-folder-open"></span>
                            <span class="item-text">Open</span>...
                        </a>
                    </li>
                    <li class = "divider"></li>
                    <li>
                        <a href = "#" id="save-as-item">
                            <span class="glyphicon glyphicon-save-file"></span>
                            <span class="item-text">Save as</span>...
                        </a>
                    </li>
                </ul>
            </li>
            <li class = "dropdown">
                <a href = "#" class = "dropdown-toggle" data-toggle = "dropdown" id="edit-menu">
                    <span class="item-text">Edit</span>
                    <b class = "caret"></b>
                </a>
                <ul class = "dropdown-menu">
                    <li><a href = "#" id="undo-item" class="disabled">
                            <span class="cmd-text">Ctrl+Z</span>
                            <i class="glyphicon fa fa-undo"></i>
                            <span class="item-text">Undo</span>
                        </a></li>
                    <li><a href = "#" id="redo-item" class="disabled">
                            <span class="cmd-text">Ctrl+Y</span>
                            <i class="glyphicon fa fa-repeat"></i>
                            <span class="item-text">Redo</span>
                        </a></li>
                    <li class = "divider"></li>
                    <li><a href = "#" id="delete-item" class="disabled">
                            <span class="cmd-text">Del</span>
                            <span class="glyphicon glyphicon-trash"></span>
                            <span class="item-text">Delete</span>
                        </a></li>
                    <li class = "divider"></li>
                    <li><a href = "#" id="select-all-item">
                            <span class="cmd-text">Ctrl+A</span>
                            <span class="item-text">Select all</span>
                        </a></li>
                    <li><a href = "#" id="selection-area-item">
                            <span class="item-text">Select area</span>
                        </a></li>
                </ul>
            </li>
            <li class = "dropdown">
                <a href = "#" class = "dropdown-toggle" data-toggle = "dropdown" id="view-menu">
                    <span class="item-text">View</span>
                    <b class = "caret"></b>
                </a>
                <ul class = "dropdown-menu">
                    <li><a href="#" class="disabled" id="center-selection-item">
                            <span class="cmd-text">S</span>
                            <i class="glyphicon fa fa-bullseye"></i>
                            <span class="item-text">Center selection</span>
                        </a></li>
                    <li><a href="#" id="extend-item">
                            <span class="cmd-text">E</span>
                            <span class="glyphicon glyphicon-fullscreen"></span>
                            <span class="item-text">Extend</span>
                        </a></li>
                </ul>
            </li>
        </ul>
        <ul class = "nav navbar-nav navbar-right">
            <li class = "dropdown">
                <a href = "#" class = "dropdown-toggle" data-toggle = "dropdown" id="language-menu">Eng<b class = "caret"></b></a>
                <ul class = "dropdown-menu">
                    <li class="active" id="eng-item"><a href = "#">Eng</a></li>
                    <li id="ita-item"><a href = "#">Ita</a></li>
                </ul>
            </li>
            <form class="navbar-form hide" id="search-field">
                <div class="input-group">
                    <span class="input-group-addon glyphicon glyphicon-search" id="search-icon"></span>
                    <input type="text" class="form-control" placeholder="Search">
                </div>
            </form>
        </ul>
    </div>
</nav>
<nav id="selection-in-touch-device" class = "hide d-none navbar navbar-inverse">
    <ul class = "nav navbar-nav">
        <li id="exit-from-selection-mode">
            <a href = "#">
                <i class="glyphicon fa fa-arrow-left"></i>
            </a>
        </li>
        <li class = "dropdown" id="selection-counter-menu">
            <a href = "#" class = "dropdown-toggle" data-toggle = "dropdown"><span>#</span> <b class = "caret"></b></a>
            <ul class = "dropdown-menu">
                <li>
                    <a href = "#" id="select-all-objects">
                        <span class="item-text">Select all</span>
                    </a>
                    <a href = "#" id="deselect-all-objects">
                        <span class="item-text">Deselect all</span>
                    </a>
                </li>
            </ul>
        </li>
    </ul>
    <ul class = "nav navbar-nav navbar-right">
        <li id="delete-selected-objects">
            <a href = "#">
                <span class="glyphicon glyphicon-trash"></span>
            </a>
        </li>
        <li id="center-selected-objects">
            <a href = "#">
                <i class="glyphicon fa fa-bullseye"></i>
            </a>
        </li>
    </ul>
</nav>
<nav class = "navbar navbar-default navbar-inverse tree-name">
    <div class = "navbar-header">
        <div class = "navbar-brand file-name"><span id="loaded-tree-label">Loaded tree</span>: <span id="loaded-tree-name">Default</span></div>
    </div>
</nav>
<div class='container-fluid' id="viewport">
    <div class="modal fade" id="alert-popup" role="dialog" >
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">x</button>
                    <h4 class="modal-title">Warning</h4>
                </div>
                <div class="modal-body">
                    'Current tree has been modified. Do you want save changes?'
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" id="yes">Yes</button>
                    <button type="button" class="btn btn-default" id="no" data-dismiss="modal">No</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="save-as-popup" role="dialog" >
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">x</button>
                    <h4 class="modal-title">Save</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form" data-toggle="buttons">
                        <div class="form-group" id="field-file-format">
                            <label  class="col-sm-2 control-label" for="input-format" id="file-format-label">Extension:</label>
                            <div class="col-sm-10" data-toggle="buttons">
                                <label class="btn btn-default active" id="json-format-opt" onclick="$('#save-as-popup #input-format').val($(this).find('input').val()).trigger('change');">
                                    <input type="radio" value="json" autocomplete="off">File JSON
                                </label>
                                <label class="btn btn-default" id="svg-format-opt" onclick="$('#save-as-popup #input-format').val($(this).find('input').val()).trigger('change');">
                                    <input type="radio" value="svg" autocomplete="off">Image SVG
                                </label>
                                <label class="btn btn-default" id="png-format-opt" onclick="$('#save-as-popup #input-format').val($(this).find('input').val()).trigger('change')">
                                    <input type="radio" value="png"  autocomplete="off">Image PNG
                                </label>
                            </div>
                            <input class="form-control hide" id="input-format" name="format" value="json">
                        </div>
                        <div class="form-group has-feedback" id="field-file-name">
                            <label  class="col-sm-2 control-label" for="input-name">File name</label>
                            <div class="col-sm-10">
                                <input class="form-control" id="input-name" name="fileName" required data-error="Questo campo non può essere vuoto">
                            </div>
                            <span class="glyphicon form-control-feedback" aria-hidden="true"></span>
                            <div class="help-block with-errors"></div>
                        </div>
                        <div class="form-group hide" id="field-scale">
                            <label  class="col-sm-2 control-label" for="input-scale">Scale (%):</label>
                            <div class="col-sm-10">
                                <input class="form-control" id="input-scale" name="scale" type="number" min="1" max="100" value="100">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" id="save">Save</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal" id="cancel">Cancel</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="node-popup" role="dialog" >
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">x</button>
                    <h4 class="modal-title">Relative</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form" data-toggle="validator">
                        <div class="form-group hide" id="field-id">
                            <div class="col-sm-10">
                                <input class="form-control" id="input-id" name="id">
                            </div>
                        </div>
                        <div class="form-group has-feedback" id="field-name">
                            <label  class="col-sm-2 control-label" for="input-name">Name:</label>
                            <div class="col-sm-10">
                                <input class="form-control" id="input-name" name="name" required data-error="Questo campo non può essere vuoto">
                            </div>
                            <span class="glyphicon form-control-feedback" aria-hidden="true"></span>
                            <div class="help-block with-errors"></div>
                        </div>
                        <div class="form-group" id="field-surname">
                            <label class="col-sm-2 control-label" for="input-surname" >Surname:</label>
                            <div class="col-sm-10">
                                <input class="form-control" id="input-surname" name="surname">
                            </div>
                        </div>
                        <div class="form-group" id="field-sex">
                            <label class="col-sm-2 control-label" for="input-sex">Sex:</label>
                            <div class="col-sm-10">
                                <select class="form-control" id="input-sex" name="sex">
                                    <option value=""></option>
                                    <option value="f">F</option>
                                    <option value="m">M</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group" id="field-description">
                            <label class="col-sm-2 control-label" for="input-description" >Description:</label>
                            <div class="col-sm-10">
                                <textarea class="form-control" rows="2" id="input-description" name="description"></textarea>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" id="submit">Save</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal" id="cancel">Cancel</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="group-popup" role="dialog" >
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">x</button>
                    <h4 class="modal-title">Group</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form" data-toggle="validator">
                        <div class="form-group hide" id="field-id">
                            <div class="col-sm-10">
                                <input class="form-control" id="input-id" name="id" />
                            </div>
                        </div>
                        <div class="form-group has-feedback" id="field-text">
                            <label  class="col-sm-2 control-label" for="input-text">Text:</label>
                            <div class="col-sm-10">
                                <textarea class="form-control" rows="2" id="input-text" name="text"></textarea>
                            </div>
                            <span class="glyphicon form-control-feedback" aria-hidden="true"></span>
                            <div class="help-block with-errors"></div>
                        </div>
                        <div class="form-group has-feedback" id="field-color">
                            <label  class="col-sm-2 control-label" for="input-color">Color:</label>
                            <div class="col-sm-10">
                                <select class="form-control" id="input-color" name="color" value="#e18585" style="background-color:#e18585" onchange="var colorField = $(this); var val = colorField.val(); colorField.css('backgroundColor', val);">
                                    <option style="background:#e18585;" value="#e18585" selected="true">#e18585</option>
                                    <option style="background:#e1a685;" value="#e1a685">#e1a685</option>
                                    <option style="background:#e1ca85;" value="#e1ca85">#e1ca85</option>
                                    <option style="background:#d6e185;" value="#d6e185">#d6e185</option>
                                    <option style="background:#b3e185;" value="#b3e185">#b3e185</option>
                                    <option style="background:#91e185;" value="#91e185">#91e185</option>
                                    <option style="background:#85e19c;" value="#85e19c">#85e19c</option>
                                    <option style="background:#85e1bd;" value="#85e1bd">#85e1bd</option>
                                    <option style="background:#85e1e1;" value="#85e1e1">#85e1e1</option>
                                    <option style="background:#85bfe1;" value="#85bfe1">#85bfe1</option>
                                    <option style="background:#859ce1;" value="#859ce1">#859ce1</option>
                                    <option style="background:#8f85e1;" value="#8f85e1">#8f85e1</option>
                                    <option style="background:#b385e1;" value="#b385e1">#b385e1</option>
                                    <option style="background:#d485e1;" value="#d485e1">#d485e1</option>
                                    <option style="background:#e185ca;" value="#e185ca">#e185ca</option>
                                    <option style="background:#e185a8;" value="#e185a8">#e185a8</option>
                                    <option style="background:#cccccc;" value="#cccccc">#cccccc</option>
                                </select>
                            </div>
                            <span class="glyphicon form-control-feedback" aria-hidden="true"></span>
                            <div class="help-block with-errors"></div>
                        </div>
                        <div class="form-group" id="field-textSize">
                            <label  class="col-sm-2 control-label" for="input-textSize">Text size:</label>
                            <div class="col-sm-10">
                                <input class="form-control" id="input-textSize" name="textSize" type="number" min="1" value="14">
                            </div>
                        </div>
                        <div class="form-group" id="field-width">
                            <label  class="col-sm-2 control-label" for="input-width">Width:</label>
                            <div class="col-sm-10">
                                <input class="form-control" id="input-width" name="width" type="number" min="32" value="100">
                            </div>
                        </div>
                        <div class="form-group" id="field-height">
                            <label  class="col-sm-2 control-label" for="input-height">Height:</label>
                            <div class="col-sm-10">
                                <input class="form-control" id="input-height" name="height" type="number" min="32" value="100">
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" id="submit">Save</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal" id="cancel">Cancel</button>
                </div>
            </div>
        </div>
    </div>
    <div id="open-file-popup" class="modal fade" role="dialog">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">x</button>
                    <h4 class="modal-title">Open</h4>
                </div>
                <div class="modal-body">
                    <form class="form-horizontal" role="form" data-toggle="validator">
                        <div class="form-group has-feedback" id="field-file-name">
                            <label  class="col-sm-4 control-label" for="input-file">Choose file:</label>
                            <div class="col-sm-8" style="position:relative;">
                                <a class="btn btn-primary" onclick="var input = $(this).find('#input-file'); if (event.target != input[0]) input.trigger('click');">
                                    <i class="glyphicon glyphicon-folder-open" onclick="var input = $('#input-file'); if (event.target != input[0]) input.trigger('click');"></i>
                                    <input id="input-file" type="file" accept=".json" style='position:absolute;z-index:2;top:0;left:0;filter: alpha(opacity=0);-ms-filter:"progid:DXImageTransform.Microsoft.Alpha(Opacity=0)";opacity:0;background-color:transparent;color:transparent;' name="input-file-name" size="40"  />
                                </a>
                                &nbsp;
                                <input class="file-info form-control" type="text" id="upload-file-info" readonly>
                            </div>
                            <span class="glyphicon form-control-feedback" aria-hidden="true"></span>
                            <div class="help-block with-errors"></div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" id="upload-file-btn">Ok</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal" id='cancel'>Cancel</button>
                </div>
            </div>
        </div>
    </div>
    <div class="fixed-menu container-fluid navbar-inverse"></div>
    <div class="panel panel-default" id="search-result-list" style="display: none;">
        <div class="panel-heading">
	      			<span id="close-search-result-list" style="display: inline-block; float: right; font-size: 20px; margin-top: -5px; cursor: pointer;">
	      				<i class="glyphicon fa fa-close" style="color: #555;"></i>
	      			</span>
            <h4 class="panel-title">
                Results for: <span>query</span>
            </h4>
        </div>
        <div class="panel-body">
            <table class="table table-sm table-striped table-dark">
                <thead>
                <tr>
                    <th scope="col">Element</th>
                    <th scope="col">Name</th>
                    <th scope="col">Surname</th>
                    <th scope="col">Description</th>
                </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>
    </div>
    <script src="/family/js/script.js?{{time()}}" type="text/javascript"></script>
</body>
</html>
