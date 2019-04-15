"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var springtype_incubator_core_1 = require("@springtype/springtype-incubator-core");
var springtype_incubator_state_1 = require("@springtype/springtype-incubator-state");
var TodoService = /** @class */ (function () {
    function TodoService(state) {
        this.state = state;
    }
    TodoService.prototype.getById = function (id) {
        return this.state.TodoModel.todos
            .filter(function (todo) {
            return todo.id === id;
        })[0];
    };
    TodoService = tslib_1.__decorate([
        springtype_incubator_state_1.Stateful,
        springtype_incubator_core_1.Component,
        tslib_1.__metadata("design:paramtypes", [Object])
    ], TodoService);
    return TodoService;
}());
exports.TodoService = TodoService;
//# sourceMappingURL=TodoService.js.map