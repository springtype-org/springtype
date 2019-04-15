"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var springtype_incubator_core_1 = require("@springtype/springtype-incubator-core");
var springtype_incubator_state_1 = require("@springtype/springtype-incubator-state");
var getPhantomId_1 = require("../function/getPhantomId");
var initialTodos = [{
        done: false,
        id: getPhantomId_1.getPhantomId(),
        text: 'Bar'
    }, {
        done: false,
        id: getPhantomId_1.getPhantomId(),
        text: 'Toms'
    }];
var TodoModel = /** @class */ (function () {
    function TodoModel(initialState, reducers, logger) {
        this.initialState = initialState;
        this.reducers = reducers;
        this.logger = logger;
        initialState.todos = initialTodos;
    }
    TodoModel.prototype.onAddTodo = function (state, todoItem) {
        state.todos.push(todoItem);
        return state;
    };
    TodoModel.prototype.onRemoveTodo = function (state, todoItem) {
        state.todos = state.todos.filter(function (currentTodoItem) { return currentTodoItem.id !== todoItem.id; });
        return state;
    };
    TodoModel.prototype.onToggleTodo = function (state, todoItem) {
        state.todos = state.todos.map(function (currentTodoItem) {
            if (currentTodoItem.id === todoItem.id) {
                currentTodoItem.done = !currentTodoItem.done;
            }
            return currentTodoItem;
        });
        return state;
    };
    TodoModel.prototype.addTodo = function (todoItem) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.reducers.onAddTodo(todoItem)];
            });
        });
    };
    TodoModel.prototype.toggleTodo = function (todoItem) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.reducers.onToggleTodo(todoItem)];
            });
        });
    };
    TodoModel.prototype.removeTodo = function (todoItem) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                this.logger.log('Removing todoItem in 1000 ms...', todoItem);
                return [2 /*return*/, new Promise(function (resolve) {
                        setTimeout(function () {
                            resolve(_this.reducers.onRemoveTodo(todoItem));
                            springtype_incubator_core_1.log('Removed todoItem', todoItem);
                        }, 1000);
                    })];
            });
        });
    };
    TodoModel.selectTodos = function (state) {
        return state.TodoModel.todos;
    };
    tslib_1.__decorate([
        springtype_incubator_state_1.StateReducer,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object]),
        tslib_1.__metadata("design:returntype", Object)
    ], TodoModel.prototype, "onAddTodo", null);
    tslib_1.__decorate([
        springtype_incubator_state_1.StateReducer,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object]),
        tslib_1.__metadata("design:returntype", Object)
    ], TodoModel.prototype, "onRemoveTodo", null);
    tslib_1.__decorate([
        springtype_incubator_state_1.StateReducer,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object, Object]),
        tslib_1.__metadata("design:returntype", Object)
    ], TodoModel.prototype, "onToggleTodo", null);
    tslib_1.__decorate([
        springtype_incubator_state_1.StateEffect,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", Promise)
    ], TodoModel.prototype, "addTodo", null);
    tslib_1.__decorate([
        springtype_incubator_state_1.StateEffect,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", Promise)
    ], TodoModel.prototype, "toggleTodo", null);
    tslib_1.__decorate([
        springtype_incubator_state_1.StateEffect,
        tslib_1.__metadata("design:type", Function),
        tslib_1.__metadata("design:paramtypes", [Object]),
        tslib_1.__metadata("design:returntype", Promise)
    ], TodoModel.prototype, "removeTodo", null);
    TodoModel = tslib_1.__decorate([
        springtype_incubator_state_1.StateModel("TodoModel"),
        tslib_1.__metadata("design:paramtypes", [Object, Object, springtype_incubator_core_1.ActiveLogger])
    ], TodoModel);
    return TodoModel;
}());
exports.TodoModel = TodoModel;
//# sourceMappingURL=TodoModel.js.map