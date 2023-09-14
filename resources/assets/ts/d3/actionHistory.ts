const actionHistory = function(){
    let undoStack = [],
        redoStack =[];
    let action = null;

    return {
        action: action,
        execute: function(doAction, reverse=null, ctx=null ) {
            this.action = 'do';
            undoStack.push({ action: doAction, reverse: reverse, ctx: ctx });
            redoStack = [];
            doAction.call(ctx);
            $(document).trigger('action', ['do', undoStack.length, redoStack.length]);
        },
        undo: function() {
            var operation = undoStack.pop();
            this.action = 'undo';
            if (operation) {
                redoStack.push(operation);
                operation.reverse.call(operation.ctx);
                $(document).trigger('action', ['undo', undoStack.length, redoStack.length]);
            }
        },
        redo: function() {
            this.action = 'redo';
            var operation = redoStack.pop();
            if (operation) {
                undoStack.push(operation);
                operation.action.call(operation.ctx);
                $(document).trigger('action', ['redo', undoStack.length, redoStack.length]);
            }
        },
        reset: function(){
            undoStack = [];
            redoStack = [];
            $(document).trigger('action', ['reset', undoStack.length, redoStack.length]);
        }
    };
};
export default actionHistory;