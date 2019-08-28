FuseBox.pkg("default", {}, function(___scope___){
___scope___.file("integration-todo/src/index.module.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// materialize JS import
require("materialize-css");
// CSS import
require("./index.scss");
const core_1 = require("~/core/src/index.js");
const AppLayout_1 = require("./element/layout/AppLayout");
const ListInnerPartial_1 = require("./element/list/ListInnerPartial");
const Logo_1 = require("./element/logo/Logo");
const NotFoundPage_1 = require("./page/NotFoundPage");
const TodoDetailsPage_1 = require("./page/TodoDetailsPage");
const TodoListPage_1 = require("./page/TodoListPage");
const index_1 = require("./index");
const router_1 = require("~/router/src/index.js");
exports.ROUTE_BASE = '';
exports.ROUTE_TODO_LIST = '/todos';
exports.ROUTE_TODO_DETIALS = '/todo/:id';
let IndexModule = class IndexModule {
};
IndexModule = tslib_1.__decorate([
    core_1.Module('index', index_1.Index, 
    // elements
    AppLayout_1.AppLayout, ListInnerPartial_1.ListInnerPartial, Logo_1.Logo, 
    // pages
    NotFoundPage_1.NotFoundPage, TodoDetailsPage_1.TodoDetailsPage, TodoListPage_1.TodoListPage),
    router_1.Route(exports.ROUTE_BASE, TodoListPage_1.TodoListPage),
    router_1.Route(exports.ROUTE_TODO_LIST, TodoListPage_1.TodoListPage),
    router_1.Route(exports.ROUTE_TODO_DETIALS, TodoDetailsPage_1.TodoDetailsPage),
    router_1.Route(router_1.ROUTE_NOT_FOUND, NotFoundPage_1.NotFoundPage)
], IndexModule);
exports.IndexModule = IndexModule;
//# sourceMappingURL=index.module.js.map
});
___scope___.file("integration-todo/src/index.scss", function(exports, require, module){
require("fuse-box-css")("default/integration-todo/src/index.scss",".materialize-red {\n  background-color: #e51c23 !important; }\n\n.materialize-red-text {\n  color: #e51c23 !important; }\n\n.materialize-red.lighten-5 {\n  background-color: #fdeaeb !important; }\n\n.materialize-red-text.text-lighten-5 {\n  color: #fdeaeb !important; }\n\n.materialize-red.lighten-4 {\n  background-color: #f8c1c3 !important; }\n\n.materialize-red-text.text-lighten-4 {\n  color: #f8c1c3 !important; }\n\n.materialize-red.lighten-3 {\n  background-color: #f3989b !important; }\n\n.materialize-red-text.text-lighten-3 {\n  color: #f3989b !important; }\n\n.materialize-red.lighten-2 {\n  background-color: #ee6e73 !important; }\n\n.materialize-red-text.text-lighten-2 {\n  color: #ee6e73 !important; }\n\n.materialize-red.lighten-1 {\n  background-color: #ea454b !important; }\n\n.materialize-red-text.text-lighten-1 {\n  color: #ea454b !important; }\n\n.materialize-red.darken-1 {\n  background-color: #d0181e !important; }\n\n.materialize-red-text.text-darken-1 {\n  color: #d0181e !important; }\n\n.materialize-red.darken-2 {\n  background-color: #b9151b !important; }\n\n.materialize-red-text.text-darken-2 {\n  color: #b9151b !important; }\n\n.materialize-red.darken-3 {\n  background-color: #a21318 !important; }\n\n.materialize-red-text.text-darken-3 {\n  color: #a21318 !important; }\n\n.materialize-red.darken-4 {\n  background-color: #8b1014 !important; }\n\n.materialize-red-text.text-darken-4 {\n  color: #8b1014 !important; }\n\n.red {\n  background-color: #F44336 !important; }\n\n.red-text {\n  color: #F44336 !important; }\n\n.red.lighten-5 {\n  background-color: #FFEBEE !important; }\n\n.red-text.text-lighten-5 {\n  color: #FFEBEE !important; }\n\n.red.lighten-4 {\n  background-color: #FFCDD2 !important; }\n\n.red-text.text-lighten-4 {\n  color: #FFCDD2 !important; }\n\n.red.lighten-3 {\n  background-color: #EF9A9A !important; }\n\n.red-text.text-lighten-3 {\n  color: #EF9A9A !important; }\n\n.red.lighten-2 {\n  background-color: #E57373 !important; }\n\n.red-text.text-lighten-2 {\n  color: #E57373 !important; }\n\n.red.lighten-1 {\n  background-color: #EF5350 !important; }\n\n.red-text.text-lighten-1 {\n  color: #EF5350 !important; }\n\n.red.darken-1 {\n  background-color: #E53935 !important; }\n\n.red-text.text-darken-1 {\n  color: #E53935 !important; }\n\n.red.darken-2 {\n  background-color: #D32F2F !important; }\n\n.red-text.text-darken-2 {\n  color: #D32F2F !important; }\n\n.red.darken-3 {\n  background-color: #C62828 !important; }\n\n.red-text.text-darken-3 {\n  color: #C62828 !important; }\n\n.red.darken-4 {\n  background-color: #B71C1C !important; }\n\n.red-text.text-darken-4 {\n  color: #B71C1C !important; }\n\n.red.accent-1 {\n  background-color: #FF8A80 !important; }\n\n.red-text.text-accent-1 {\n  color: #FF8A80 !important; }\n\n.red.accent-2 {\n  background-color: #FF5252 !important; }\n\n.red-text.text-accent-2 {\n  color: #FF5252 !important; }\n\n.red.accent-3 {\n  background-color: #FF1744 !important; }\n\n.red-text.text-accent-3 {\n  color: #FF1744 !important; }\n\n.red.accent-4 {\n  background-color: #D50000 !important; }\n\n.red-text.text-accent-4 {\n  color: #D50000 !important; }\n\n.pink {\n  background-color: #e91e63 !important; }\n\n.pink-text {\n  color: #e91e63 !important; }\n\n.pink.lighten-5 {\n  background-color: #fce4ec !important; }\n\n.pink-text.text-lighten-5 {\n  color: #fce4ec !important; }\n\n.pink.lighten-4 {\n  background-color: #f8bbd0 !important; }\n\n.pink-text.text-lighten-4 {\n  color: #f8bbd0 !important; }\n\n.pink.lighten-3 {\n  background-color: #f48fb1 !important; }\n\n.pink-text.text-lighten-3 {\n  color: #f48fb1 !important; }\n\n.pink.lighten-2 {\n  background-color: #f06292 !important; }\n\n.pink-text.text-lighten-2 {\n  color: #f06292 !important; }\n\n.pink.lighten-1 {\n  background-color: #ec407a !important; }\n\n.pink-text.text-lighten-1 {\n  color: #ec407a !important; }\n\n.pink.darken-1 {\n  background-color: #d81b60 !important; }\n\n.pink-text.text-darken-1 {\n  color: #d81b60 !important; }\n\n.pink.darken-2 {\n  background-color: #c2185b !important; }\n\n.pink-text.text-darken-2 {\n  color: #c2185b !important; }\n\n.pink.darken-3 {\n  background-color: #ad1457 !important; }\n\n.pink-text.text-darken-3 {\n  color: #ad1457 !important; }\n\n.pink.darken-4 {\n  background-color: #880e4f !important; }\n\n.pink-text.text-darken-4 {\n  color: #880e4f !important; }\n\n.pink.accent-1 {\n  background-color: #ff80ab !important; }\n\n.pink-text.text-accent-1 {\n  color: #ff80ab !important; }\n\n.pink.accent-2 {\n  background-color: #ff4081 !important; }\n\n.pink-text.text-accent-2 {\n  color: #ff4081 !important; }\n\n.pink.accent-3 {\n  background-color: #f50057 !important; }\n\n.pink-text.text-accent-3 {\n  color: #f50057 !important; }\n\n.pink.accent-4 {\n  background-color: #c51162 !important; }\n\n.pink-text.text-accent-4 {\n  color: #c51162 !important; }\n\n.purple {\n  background-color: #9c27b0 !important; }\n\n.purple-text {\n  color: #9c27b0 !important; }\n\n.purple.lighten-5 {\n  background-color: #f3e5f5 !important; }\n\n.purple-text.text-lighten-5 {\n  color: #f3e5f5 !important; }\n\n.purple.lighten-4 {\n  background-color: #e1bee7 !important; }\n\n.purple-text.text-lighten-4 {\n  color: #e1bee7 !important; }\n\n.purple.lighten-3 {\n  background-color: #ce93d8 !important; }\n\n.purple-text.text-lighten-3 {\n  color: #ce93d8 !important; }\n\n.purple.lighten-2 {\n  background-color: #ba68c8 !important; }\n\n.purple-text.text-lighten-2 {\n  color: #ba68c8 !important; }\n\n.purple.lighten-1 {\n  background-color: #ab47bc !important; }\n\n.purple-text.text-lighten-1 {\n  color: #ab47bc !important; }\n\n.purple.darken-1 {\n  background-color: #8e24aa !important; }\n\n.purple-text.text-darken-1 {\n  color: #8e24aa !important; }\n\n.purple.darken-2 {\n  background-color: #7b1fa2 !important; }\n\n.purple-text.text-darken-2 {\n  color: #7b1fa2 !important; }\n\n.purple.darken-3 {\n  background-color: #6a1b9a !important; }\n\n.purple-text.text-darken-3 {\n  color: #6a1b9a !important; }\n\n.purple.darken-4 {\n  background-color: #4a148c !important; }\n\n.purple-text.text-darken-4 {\n  color: #4a148c !important; }\n\n.purple.accent-1 {\n  background-color: #ea80fc !important; }\n\n.purple-text.text-accent-1 {\n  color: #ea80fc !important; }\n\n.purple.accent-2 {\n  background-color: #e040fb !important; }\n\n.purple-text.text-accent-2 {\n  color: #e040fb !important; }\n\n.purple.accent-3 {\n  background-color: #d500f9 !important; }\n\n.purple-text.text-accent-3 {\n  color: #d500f9 !important; }\n\n.purple.accent-4 {\n  background-color: #aa00ff !important; }\n\n.purple-text.text-accent-4 {\n  color: #aa00ff !important; }\n\n.deep-purple {\n  background-color: #673ab7 !important; }\n\n.deep-purple-text {\n  color: #673ab7 !important; }\n\n.deep-purple.lighten-5 {\n  background-color: #ede7f6 !important; }\n\n.deep-purple-text.text-lighten-5 {\n  color: #ede7f6 !important; }\n\n.deep-purple.lighten-4 {\n  background-color: #d1c4e9 !important; }\n\n.deep-purple-text.text-lighten-4 {\n  color: #d1c4e9 !important; }\n\n.deep-purple.lighten-3 {\n  background-color: #b39ddb !important; }\n\n.deep-purple-text.text-lighten-3 {\n  color: #b39ddb !important; }\n\n.deep-purple.lighten-2 {\n  background-color: #9575cd !important; }\n\n.deep-purple-text.text-lighten-2 {\n  color: #9575cd !important; }\n\n.deep-purple.lighten-1 {\n  background-color: #7e57c2 !important; }\n\n.deep-purple-text.text-lighten-1 {\n  color: #7e57c2 !important; }\n\n.deep-purple.darken-1 {\n  background-color: #5e35b1 !important; }\n\n.deep-purple-text.text-darken-1 {\n  color: #5e35b1 !important; }\n\n.deep-purple.darken-2 {\n  background-color: #512da8 !important; }\n\n.deep-purple-text.text-darken-2 {\n  color: #512da8 !important; }\n\n.deep-purple.darken-3 {\n  background-color: #4527a0 !important; }\n\n.deep-purple-text.text-darken-3 {\n  color: #4527a0 !important; }\n\n.deep-purple.darken-4 {\n  background-color: #311b92 !important; }\n\n.deep-purple-text.text-darken-4 {\n  color: #311b92 !important; }\n\n.deep-purple.accent-1 {\n  background-color: #b388ff !important; }\n\n.deep-purple-text.text-accent-1 {\n  color: #b388ff !important; }\n\n.deep-purple.accent-2 {\n  background-color: #7c4dff !important; }\n\n.deep-purple-text.text-accent-2 {\n  color: #7c4dff !important; }\n\n.deep-purple.accent-3 {\n  background-color: #651fff !important; }\n\n.deep-purple-text.text-accent-3 {\n  color: #651fff !important; }\n\n.deep-purple.accent-4 {\n  background-color: #6200ea !important; }\n\n.deep-purple-text.text-accent-4 {\n  color: #6200ea !important; }\n\n.indigo {\n  background-color: #3f51b5 !important; }\n\n.indigo-text {\n  color: #3f51b5 !important; }\n\n.indigo.lighten-5 {\n  background-color: #e8eaf6 !important; }\n\n.indigo-text.text-lighten-5 {\n  color: #e8eaf6 !important; }\n\n.indigo.lighten-4 {\n  background-color: #c5cae9 !important; }\n\n.indigo-text.text-lighten-4 {\n  color: #c5cae9 !important; }\n\n.indigo.lighten-3 {\n  background-color: #9fa8da !important; }\n\n.indigo-text.text-lighten-3 {\n  color: #9fa8da !important; }\n\n.indigo.lighten-2 {\n  background-color: #7986cb !important; }\n\n.indigo-text.text-lighten-2 {\n  color: #7986cb !important; }\n\n.indigo.lighten-1 {\n  background-color: #5c6bc0 !important; }\n\n.indigo-text.text-lighten-1 {\n  color: #5c6bc0 !important; }\n\n.indigo.darken-1 {\n  background-color: #3949ab !important; }\n\n.indigo-text.text-darken-1 {\n  color: #3949ab !important; }\n\n.indigo.darken-2 {\n  background-color: #303f9f !important; }\n\n.indigo-text.text-darken-2 {\n  color: #303f9f !important; }\n\n.indigo.darken-3 {\n  background-color: #283593 !important; }\n\n.indigo-text.text-darken-3 {\n  color: #283593 !important; }\n\n.indigo.darken-4 {\n  background-color: #1a237e !important; }\n\n.indigo-text.text-darken-4 {\n  color: #1a237e !important; }\n\n.indigo.accent-1 {\n  background-color: #8c9eff !important; }\n\n.indigo-text.text-accent-1 {\n  color: #8c9eff !important; }\n\n.indigo.accent-2 {\n  background-color: #536dfe !important; }\n\n.indigo-text.text-accent-2 {\n  color: #536dfe !important; }\n\n.indigo.accent-3 {\n  background-color: #3d5afe !important; }\n\n.indigo-text.text-accent-3 {\n  color: #3d5afe !important; }\n\n.indigo.accent-4 {\n  background-color: #304ffe !important; }\n\n.indigo-text.text-accent-4 {\n  color: #304ffe !important; }\n\n.blue {\n  background-color: #2196F3 !important; }\n\n.blue-text {\n  color: #2196F3 !important; }\n\n.blue.lighten-5 {\n  background-color: #E3F2FD !important; }\n\n.blue-text.text-lighten-5 {\n  color: #E3F2FD !important; }\n\n.blue.lighten-4 {\n  background-color: #BBDEFB !important; }\n\n.blue-text.text-lighten-4 {\n  color: #BBDEFB !important; }\n\n.blue.lighten-3 {\n  background-color: #90CAF9 !important; }\n\n.blue-text.text-lighten-3 {\n  color: #90CAF9 !important; }\n\n.blue.lighten-2 {\n  background-color: #64B5F6 !important; }\n\n.blue-text.text-lighten-2 {\n  color: #64B5F6 !important; }\n\n.blue.lighten-1 {\n  background-color: #42A5F5 !important; }\n\n.blue-text.text-lighten-1 {\n  color: #42A5F5 !important; }\n\n.blue.darken-1 {\n  background-color: #1E88E5 !important; }\n\n.blue-text.text-darken-1 {\n  color: #1E88E5 !important; }\n\n.blue.darken-2 {\n  background-color: #1976D2 !important; }\n\n.blue-text.text-darken-2 {\n  color: #1976D2 !important; }\n\n.blue.darken-3 {\n  background-color: #1565C0 !important; }\n\n.blue-text.text-darken-3 {\n  color: #1565C0 !important; }\n\n.blue.darken-4 {\n  background-color: #0D47A1 !important; }\n\n.blue-text.text-darken-4 {\n  color: #0D47A1 !important; }\n\n.blue.accent-1 {\n  background-color: #82B1FF !important; }\n\n.blue-text.text-accent-1 {\n  color: #82B1FF !important; }\n\n.blue.accent-2 {\n  background-color: #448AFF !important; }\n\n.blue-text.text-accent-2 {\n  color: #448AFF !important; }\n\n.blue.accent-3 {\n  background-color: #2979FF !important; }\n\n.blue-text.text-accent-3 {\n  color: #2979FF !important; }\n\n.blue.accent-4 {\n  background-color: #2962FF !important; }\n\n.blue-text.text-accent-4 {\n  color: #2962FF !important; }\n\n.light-blue {\n  background-color: #03a9f4 !important; }\n\n.light-blue-text {\n  color: #03a9f4 !important; }\n\n.light-blue.lighten-5 {\n  background-color: #e1f5fe !important; }\n\n.light-blue-text.text-lighten-5 {\n  color: #e1f5fe !important; }\n\n.light-blue.lighten-4 {\n  background-color: #b3e5fc !important; }\n\n.light-blue-text.text-lighten-4 {\n  color: #b3e5fc !important; }\n\n.light-blue.lighten-3 {\n  background-color: #81d4fa !important; }\n\n.light-blue-text.text-lighten-3 {\n  color: #81d4fa !important; }\n\n.light-blue.lighten-2 {\n  background-color: #4fc3f7 !important; }\n\n.light-blue-text.text-lighten-2 {\n  color: #4fc3f7 !important; }\n\n.light-blue.lighten-1 {\n  background-color: #29b6f6 !important; }\n\n.light-blue-text.text-lighten-1 {\n  color: #29b6f6 !important; }\n\n.light-blue.darken-1 {\n  background-color: #039be5 !important; }\n\n.light-blue-text.text-darken-1 {\n  color: #039be5 !important; }\n\n.light-blue.darken-2 {\n  background-color: #0288d1 !important; }\n\n.light-blue-text.text-darken-2 {\n  color: #0288d1 !important; }\n\n.light-blue.darken-3 {\n  background-color: #0277bd !important; }\n\n.light-blue-text.text-darken-3 {\n  color: #0277bd !important; }\n\n.light-blue.darken-4 {\n  background-color: #01579b !important; }\n\n.light-blue-text.text-darken-4 {\n  color: #01579b !important; }\n\n.light-blue.accent-1 {\n  background-color: #80d8ff !important; }\n\n.light-blue-text.text-accent-1 {\n  color: #80d8ff !important; }\n\n.light-blue.accent-2 {\n  background-color: #40c4ff !important; }\n\n.light-blue-text.text-accent-2 {\n  color: #40c4ff !important; }\n\n.light-blue.accent-3 {\n  background-color: #00b0ff !important; }\n\n.light-blue-text.text-accent-3 {\n  color: #00b0ff !important; }\n\n.light-blue.accent-4 {\n  background-color: #0091ea !important; }\n\n.light-blue-text.text-accent-4 {\n  color: #0091ea !important; }\n\n.cyan {\n  background-color: #00bcd4 !important; }\n\n.cyan-text {\n  color: #00bcd4 !important; }\n\n.cyan.lighten-5 {\n  background-color: #e0f7fa !important; }\n\n.cyan-text.text-lighten-5 {\n  color: #e0f7fa !important; }\n\n.cyan.lighten-4 {\n  background-color: #b2ebf2 !important; }\n\n.cyan-text.text-lighten-4 {\n  color: #b2ebf2 !important; }\n\n.cyan.lighten-3 {\n  background-color: #80deea !important; }\n\n.cyan-text.text-lighten-3 {\n  color: #80deea !important; }\n\n.cyan.lighten-2 {\n  background-color: #4dd0e1 !important; }\n\n.cyan-text.text-lighten-2 {\n  color: #4dd0e1 !important; }\n\n.cyan.lighten-1 {\n  background-color: #26c6da !important; }\n\n.cyan-text.text-lighten-1 {\n  color: #26c6da !important; }\n\n.cyan.darken-1 {\n  background-color: #00acc1 !important; }\n\n.cyan-text.text-darken-1 {\n  color: #00acc1 !important; }\n\n.cyan.darken-2 {\n  background-color: #0097a7 !important; }\n\n.cyan-text.text-darken-2 {\n  color: #0097a7 !important; }\n\n.cyan.darken-3 {\n  background-color: #00838f !important; }\n\n.cyan-text.text-darken-3 {\n  color: #00838f !important; }\n\n.cyan.darken-4 {\n  background-color: #006064 !important; }\n\n.cyan-text.text-darken-4 {\n  color: #006064 !important; }\n\n.cyan.accent-1 {\n  background-color: #84ffff !important; }\n\n.cyan-text.text-accent-1 {\n  color: #84ffff !important; }\n\n.cyan.accent-2 {\n  background-color: #18ffff !important; }\n\n.cyan-text.text-accent-2 {\n  color: #18ffff !important; }\n\n.cyan.accent-3 {\n  background-color: #00e5ff !important; }\n\n.cyan-text.text-accent-3 {\n  color: #00e5ff !important; }\n\n.cyan.accent-4 {\n  background-color: #00b8d4 !important; }\n\n.cyan-text.text-accent-4 {\n  color: #00b8d4 !important; }\n\n.teal {\n  background-color: #009688 !important; }\n\n.teal-text {\n  color: #009688 !important; }\n\n.teal.lighten-5 {\n  background-color: #e0f2f1 !important; }\n\n.teal-text.text-lighten-5 {\n  color: #e0f2f1 !important; }\n\n.teal.lighten-4 {\n  background-color: #b2dfdb !important; }\n\n.teal-text.text-lighten-4 {\n  color: #b2dfdb !important; }\n\n.teal.lighten-3 {\n  background-color: #80cbc4 !important; }\n\n.teal-text.text-lighten-3 {\n  color: #80cbc4 !important; }\n\n.teal.lighten-2 {\n  background-color: #4db6ac !important; }\n\n.teal-text.text-lighten-2 {\n  color: #4db6ac !important; }\n\n.teal.lighten-1 {\n  background-color: #26a69a !important; }\n\n.teal-text.text-lighten-1 {\n  color: #26a69a !important; }\n\n.teal.darken-1 {\n  background-color: #00897b !important; }\n\n.teal-text.text-darken-1 {\n  color: #00897b !important; }\n\n.teal.darken-2 {\n  background-color: #00796b !important; }\n\n.teal-text.text-darken-2 {\n  color: #00796b !important; }\n\n.teal.darken-3 {\n  background-color: #00695c !important; }\n\n.teal-text.text-darken-3 {\n  color: #00695c !important; }\n\n.teal.darken-4 {\n  background-color: #004d40 !important; }\n\n.teal-text.text-darken-4 {\n  color: #004d40 !important; }\n\n.teal.accent-1 {\n  background-color: #a7ffeb !important; }\n\n.teal-text.text-accent-1 {\n  color: #a7ffeb !important; }\n\n.teal.accent-2 {\n  background-color: #64ffda !important; }\n\n.teal-text.text-accent-2 {\n  color: #64ffda !important; }\n\n.teal.accent-3 {\n  background-color: #1de9b6 !important; }\n\n.teal-text.text-accent-3 {\n  color: #1de9b6 !important; }\n\n.teal.accent-4 {\n  background-color: #00bfa5 !important; }\n\n.teal-text.text-accent-4 {\n  color: #00bfa5 !important; }\n\n.green {\n  background-color: #4CAF50 !important; }\n\n.green-text {\n  color: #4CAF50 !important; }\n\n.green.lighten-5 {\n  background-color: #E8F5E9 !important; }\n\n.green-text.text-lighten-5 {\n  color: #E8F5E9 !important; }\n\n.green.lighten-4 {\n  background-color: #C8E6C9 !important; }\n\n.green-text.text-lighten-4 {\n  color: #C8E6C9 !important; }\n\n.green.lighten-3 {\n  background-color: #A5D6A7 !important; }\n\n.green-text.text-lighten-3 {\n  color: #A5D6A7 !important; }\n\n.green.lighten-2 {\n  background-color: #81C784 !important; }\n\n.green-text.text-lighten-2 {\n  color: #81C784 !important; }\n\n.green.lighten-1 {\n  background-color: #66BB6A !important; }\n\n.green-text.text-lighten-1 {\n  color: #66BB6A !important; }\n\n.green.darken-1 {\n  background-color: #43A047 !important; }\n\n.green-text.text-darken-1 {\n  color: #43A047 !important; }\n\n.green.darken-2 {\n  background-color: #388E3C !important; }\n\n.green-text.text-darken-2 {\n  color: #388E3C !important; }\n\n.green.darken-3 {\n  background-color: #2E7D32 !important; }\n\n.green-text.text-darken-3 {\n  color: #2E7D32 !important; }\n\n.green.darken-4 {\n  background-color: #1B5E20 !important; }\n\n.green-text.text-darken-4 {\n  color: #1B5E20 !important; }\n\n.green.accent-1 {\n  background-color: #B9F6CA !important; }\n\n.green-text.text-accent-1 {\n  color: #B9F6CA !important; }\n\n.green.accent-2 {\n  background-color: #69F0AE !important; }\n\n.green-text.text-accent-2 {\n  color: #69F0AE !important; }\n\n.green.accent-3 {\n  background-color: #00E676 !important; }\n\n.green-text.text-accent-3 {\n  color: #00E676 !important; }\n\n.green.accent-4 {\n  background-color: #00C853 !important; }\n\n.green-text.text-accent-4 {\n  color: #00C853 !important; }\n\n.light-green {\n  background-color: #8bc34a !important; }\n\n.light-green-text {\n  color: #8bc34a !important; }\n\n.light-green.lighten-5 {\n  background-color: #f1f8e9 !important; }\n\n.light-green-text.text-lighten-5 {\n  color: #f1f8e9 !important; }\n\n.light-green.lighten-4 {\n  background-color: #dcedc8 !important; }\n\n.light-green-text.text-lighten-4 {\n  color: #dcedc8 !important; }\n\n.light-green.lighten-3 {\n  background-color: #c5e1a5 !important; }\n\n.light-green-text.text-lighten-3 {\n  color: #c5e1a5 !important; }\n\n.light-green.lighten-2 {\n  background-color: #aed581 !important; }\n\n.light-green-text.text-lighten-2 {\n  color: #aed581 !important; }\n\n.light-green.lighten-1 {\n  background-color: #9ccc65 !important; }\n\n.light-green-text.text-lighten-1 {\n  color: #9ccc65 !important; }\n\n.light-green.darken-1 {\n  background-color: #7cb342 !important; }\n\n.light-green-text.text-darken-1 {\n  color: #7cb342 !important; }\n\n.light-green.darken-2 {\n  background-color: #689f38 !important; }\n\n.light-green-text.text-darken-2 {\n  color: #689f38 !important; }\n\n.light-green.darken-3 {\n  background-color: #558b2f !important; }\n\n.light-green-text.text-darken-3 {\n  color: #558b2f !important; }\n\n.light-green.darken-4 {\n  background-color: #33691e !important; }\n\n.light-green-text.text-darken-4 {\n  color: #33691e !important; }\n\n.light-green.accent-1 {\n  background-color: #ccff90 !important; }\n\n.light-green-text.text-accent-1 {\n  color: #ccff90 !important; }\n\n.light-green.accent-2 {\n  background-color: #b2ff59 !important; }\n\n.light-green-text.text-accent-2 {\n  color: #b2ff59 !important; }\n\n.light-green.accent-3 {\n  background-color: #76ff03 !important; }\n\n.light-green-text.text-accent-3 {\n  color: #76ff03 !important; }\n\n.light-green.accent-4 {\n  background-color: #64dd17 !important; }\n\n.light-green-text.text-accent-4 {\n  color: #64dd17 !important; }\n\n.lime {\n  background-color: #cddc39 !important; }\n\n.lime-text {\n  color: #cddc39 !important; }\n\n.lime.lighten-5 {\n  background-color: #f9fbe7 !important; }\n\n.lime-text.text-lighten-5 {\n  color: #f9fbe7 !important; }\n\n.lime.lighten-4 {\n  background-color: #f0f4c3 !important; }\n\n.lime-text.text-lighten-4 {\n  color: #f0f4c3 !important; }\n\n.lime.lighten-3 {\n  background-color: #e6ee9c !important; }\n\n.lime-text.text-lighten-3 {\n  color: #e6ee9c !important; }\n\n.lime.lighten-2 {\n  background-color: #dce775 !important; }\n\n.lime-text.text-lighten-2 {\n  color: #dce775 !important; }\n\n.lime.lighten-1 {\n  background-color: #d4e157 !important; }\n\n.lime-text.text-lighten-1 {\n  color: #d4e157 !important; }\n\n.lime.darken-1 {\n  background-color: #c0ca33 !important; }\n\n.lime-text.text-darken-1 {\n  color: #c0ca33 !important; }\n\n.lime.darken-2 {\n  background-color: #afb42b !important; }\n\n.lime-text.text-darken-2 {\n  color: #afb42b !important; }\n\n.lime.darken-3 {\n  background-color: #9e9d24 !important; }\n\n.lime-text.text-darken-3 {\n  color: #9e9d24 !important; }\n\n.lime.darken-4 {\n  background-color: #827717 !important; }\n\n.lime-text.text-darken-4 {\n  color: #827717 !important; }\n\n.lime.accent-1 {\n  background-color: #f4ff81 !important; }\n\n.lime-text.text-accent-1 {\n  color: #f4ff81 !important; }\n\n.lime.accent-2 {\n  background-color: #eeff41 !important; }\n\n.lime-text.text-accent-2 {\n  color: #eeff41 !important; }\n\n.lime.accent-3 {\n  background-color: #c6ff00 !important; }\n\n.lime-text.text-accent-3 {\n  color: #c6ff00 !important; }\n\n.lime.accent-4 {\n  background-color: #aeea00 !important; }\n\n.lime-text.text-accent-4 {\n  color: #aeea00 !important; }\n\n.yellow {\n  background-color: #ffeb3b !important; }\n\n.yellow-text {\n  color: #ffeb3b !important; }\n\n.yellow.lighten-5 {\n  background-color: #fffde7 !important; }\n\n.yellow-text.text-lighten-5 {\n  color: #fffde7 !important; }\n\n.yellow.lighten-4 {\n  background-color: #fff9c4 !important; }\n\n.yellow-text.text-lighten-4 {\n  color: #fff9c4 !important; }\n\n.yellow.lighten-3 {\n  background-color: #fff59d !important; }\n\n.yellow-text.text-lighten-3 {\n  color: #fff59d !important; }\n\n.yellow.lighten-2 {\n  background-color: #fff176 !important; }\n\n.yellow-text.text-lighten-2 {\n  color: #fff176 !important; }\n\n.yellow.lighten-1 {\n  background-color: #ffee58 !important; }\n\n.yellow-text.text-lighten-1 {\n  color: #ffee58 !important; }\n\n.yellow.darken-1 {\n  background-color: #fdd835 !important; }\n\n.yellow-text.text-darken-1 {\n  color: #fdd835 !important; }\n\n.yellow.darken-2 {\n  background-color: #fbc02d !important; }\n\n.yellow-text.text-darken-2 {\n  color: #fbc02d !important; }\n\n.yellow.darken-3 {\n  background-color: #f9a825 !important; }\n\n.yellow-text.text-darken-3 {\n  color: #f9a825 !important; }\n\n.yellow.darken-4 {\n  background-color: #f57f17 !important; }\n\n.yellow-text.text-darken-4 {\n  color: #f57f17 !important; }\n\n.yellow.accent-1 {\n  background-color: #ffff8d !important; }\n\n.yellow-text.text-accent-1 {\n  color: #ffff8d !important; }\n\n.yellow.accent-2 {\n  background-color: #ffff00 !important; }\n\n.yellow-text.text-accent-2 {\n  color: #ffff00 !important; }\n\n.yellow.accent-3 {\n  background-color: #ffea00 !important; }\n\n.yellow-text.text-accent-3 {\n  color: #ffea00 !important; }\n\n.yellow.accent-4 {\n  background-color: #ffd600 !important; }\n\n.yellow-text.text-accent-4 {\n  color: #ffd600 !important; }\n\n.amber {\n  background-color: #ffc107 !important; }\n\n.amber-text {\n  color: #ffc107 !important; }\n\n.amber.lighten-5 {\n  background-color: #fff8e1 !important; }\n\n.amber-text.text-lighten-5 {\n  color: #fff8e1 !important; }\n\n.amber.lighten-4 {\n  background-color: #ffecb3 !important; }\n\n.amber-text.text-lighten-4 {\n  color: #ffecb3 !important; }\n\n.amber.lighten-3 {\n  background-color: #ffe082 !important; }\n\n.amber-text.text-lighten-3 {\n  color: #ffe082 !important; }\n\n.amber.lighten-2 {\n  background-color: #ffd54f !important; }\n\n.amber-text.text-lighten-2 {\n  color: #ffd54f !important; }\n\n.amber.lighten-1 {\n  background-color: #ffca28 !important; }\n\n.amber-text.text-lighten-1 {\n  color: #ffca28 !important; }\n\n.amber.darken-1 {\n  background-color: #ffb300 !important; }\n\n.amber-text.text-darken-1 {\n  color: #ffb300 !important; }\n\n.amber.darken-2 {\n  background-color: #ffa000 !important; }\n\n.amber-text.text-darken-2 {\n  color: #ffa000 !important; }\n\n.amber.darken-3 {\n  background-color: #ff8f00 !important; }\n\n.amber-text.text-darken-3 {\n  color: #ff8f00 !important; }\n\n.amber.darken-4 {\n  background-color: #ff6f00 !important; }\n\n.amber-text.text-darken-4 {\n  color: #ff6f00 !important; }\n\n.amber.accent-1 {\n  background-color: #ffe57f !important; }\n\n.amber-text.text-accent-1 {\n  color: #ffe57f !important; }\n\n.amber.accent-2 {\n  background-color: #ffd740 !important; }\n\n.amber-text.text-accent-2 {\n  color: #ffd740 !important; }\n\n.amber.accent-3 {\n  background-color: #ffc400 !important; }\n\n.amber-text.text-accent-3 {\n  color: #ffc400 !important; }\n\n.amber.accent-4 {\n  background-color: #ffab00 !important; }\n\n.amber-text.text-accent-4 {\n  color: #ffab00 !important; }\n\n.orange {\n  background-color: #ff9800 !important; }\n\n.orange-text {\n  color: #ff9800 !important; }\n\n.orange.lighten-5 {\n  background-color: #fff3e0 !important; }\n\n.orange-text.text-lighten-5 {\n  color: #fff3e0 !important; }\n\n.orange.lighten-4 {\n  background-color: #ffe0b2 !important; }\n\n.orange-text.text-lighten-4 {\n  color: #ffe0b2 !important; }\n\n.orange.lighten-3 {\n  background-color: #ffcc80 !important; }\n\n.orange-text.text-lighten-3 {\n  color: #ffcc80 !important; }\n\n.orange.lighten-2 {\n  background-color: #ffb74d !important; }\n\n.orange-text.text-lighten-2 {\n  color: #ffb74d !important; }\n\n.orange.lighten-1 {\n  background-color: #ffa726 !important; }\n\n.orange-text.text-lighten-1 {\n  color: #ffa726 !important; }\n\n.orange.darken-1 {\n  background-color: #fb8c00 !important; }\n\n.orange-text.text-darken-1 {\n  color: #fb8c00 !important; }\n\n.orange.darken-2 {\n  background-color: #f57c00 !important; }\n\n.orange-text.text-darken-2 {\n  color: #f57c00 !important; }\n\n.orange.darken-3 {\n  background-color: #ef6c00 !important; }\n\n.orange-text.text-darken-3 {\n  color: #ef6c00 !important; }\n\n.orange.darken-4 {\n  background-color: #e65100 !important; }\n\n.orange-text.text-darken-4 {\n  color: #e65100 !important; }\n\n.orange.accent-1 {\n  background-color: #ffd180 !important; }\n\n.orange-text.text-accent-1 {\n  color: #ffd180 !important; }\n\n.orange.accent-2 {\n  background-color: #ffab40 !important; }\n\n.orange-text.text-accent-2 {\n  color: #ffab40 !important; }\n\n.orange.accent-3 {\n  background-color: #ff9100 !important; }\n\n.orange-text.text-accent-3 {\n  color: #ff9100 !important; }\n\n.orange.accent-4 {\n  background-color: #ff6d00 !important; }\n\n.orange-text.text-accent-4 {\n  color: #ff6d00 !important; }\n\n.deep-orange {\n  background-color: #ff5722 !important; }\n\n.deep-orange-text {\n  color: #ff5722 !important; }\n\n.deep-orange.lighten-5 {\n  background-color: #fbe9e7 !important; }\n\n.deep-orange-text.text-lighten-5 {\n  color: #fbe9e7 !important; }\n\n.deep-orange.lighten-4 {\n  background-color: #ffccbc !important; }\n\n.deep-orange-text.text-lighten-4 {\n  color: #ffccbc !important; }\n\n.deep-orange.lighten-3 {\n  background-color: #ffab91 !important; }\n\n.deep-orange-text.text-lighten-3 {\n  color: #ffab91 !important; }\n\n.deep-orange.lighten-2 {\n  background-color: #ff8a65 !important; }\n\n.deep-orange-text.text-lighten-2 {\n  color: #ff8a65 !important; }\n\n.deep-orange.lighten-1 {\n  background-color: #ff7043 !important; }\n\n.deep-orange-text.text-lighten-1 {\n  color: #ff7043 !important; }\n\n.deep-orange.darken-1 {\n  background-color: #f4511e !important; }\n\n.deep-orange-text.text-darken-1 {\n  color: #f4511e !important; }\n\n.deep-orange.darken-2 {\n  background-color: #e64a19 !important; }\n\n.deep-orange-text.text-darken-2 {\n  color: #e64a19 !important; }\n\n.deep-orange.darken-3 {\n  background-color: #d84315 !important; }\n\n.deep-orange-text.text-darken-3 {\n  color: #d84315 !important; }\n\n.deep-orange.darken-4 {\n  background-color: #bf360c !important; }\n\n.deep-orange-text.text-darken-4 {\n  color: #bf360c !important; }\n\n.deep-orange.accent-1 {\n  background-color: #ff9e80 !important; }\n\n.deep-orange-text.text-accent-1 {\n  color: #ff9e80 !important; }\n\n.deep-orange.accent-2 {\n  background-color: #ff6e40 !important; }\n\n.deep-orange-text.text-accent-2 {\n  color: #ff6e40 !important; }\n\n.deep-orange.accent-3 {\n  background-color: #ff3d00 !important; }\n\n.deep-orange-text.text-accent-3 {\n  color: #ff3d00 !important; }\n\n.deep-orange.accent-4 {\n  background-color: #dd2c00 !important; }\n\n.deep-orange-text.text-accent-4 {\n  color: #dd2c00 !important; }\n\n.brown {\n  background-color: #795548 !important; }\n\n.brown-text {\n  color: #795548 !important; }\n\n.brown.lighten-5 {\n  background-color: #efebe9 !important; }\n\n.brown-text.text-lighten-5 {\n  color: #efebe9 !important; }\n\n.brown.lighten-4 {\n  background-color: #d7ccc8 !important; }\n\n.brown-text.text-lighten-4 {\n  color: #d7ccc8 !important; }\n\n.brown.lighten-3 {\n  background-color: #bcaaa4 !important; }\n\n.brown-text.text-lighten-3 {\n  color: #bcaaa4 !important; }\n\n.brown.lighten-2 {\n  background-color: #a1887f !important; }\n\n.brown-text.text-lighten-2 {\n  color: #a1887f !important; }\n\n.brown.lighten-1 {\n  background-color: #8d6e63 !important; }\n\n.brown-text.text-lighten-1 {\n  color: #8d6e63 !important; }\n\n.brown.darken-1 {\n  background-color: #6d4c41 !important; }\n\n.brown-text.text-darken-1 {\n  color: #6d4c41 !important; }\n\n.brown.darken-2 {\n  background-color: #5d4037 !important; }\n\n.brown-text.text-darken-2 {\n  color: #5d4037 !important; }\n\n.brown.darken-3 {\n  background-color: #4e342e !important; }\n\n.brown-text.text-darken-3 {\n  color: #4e342e !important; }\n\n.brown.darken-4 {\n  background-color: #3e2723 !important; }\n\n.brown-text.text-darken-4 {\n  color: #3e2723 !important; }\n\n.blue-grey {\n  background-color: #607d8b !important; }\n\n.blue-grey-text {\n  color: #607d8b !important; }\n\n.blue-grey.lighten-5 {\n  background-color: #eceff1 !important; }\n\n.blue-grey-text.text-lighten-5 {\n  color: #eceff1 !important; }\n\n.blue-grey.lighten-4 {\n  background-color: #cfd8dc !important; }\n\n.blue-grey-text.text-lighten-4 {\n  color: #cfd8dc !important; }\n\n.blue-grey.lighten-3 {\n  background-color: #b0bec5 !important; }\n\n.blue-grey-text.text-lighten-3 {\n  color: #b0bec5 !important; }\n\n.blue-grey.lighten-2 {\n  background-color: #90a4ae !important; }\n\n.blue-grey-text.text-lighten-2 {\n  color: #90a4ae !important; }\n\n.blue-grey.lighten-1 {\n  background-color: #78909c !important; }\n\n.blue-grey-text.text-lighten-1 {\n  color: #78909c !important; }\n\n.blue-grey.darken-1 {\n  background-color: #546e7a !important; }\n\n.blue-grey-text.text-darken-1 {\n  color: #546e7a !important; }\n\n.blue-grey.darken-2 {\n  background-color: #455a64 !important; }\n\n.blue-grey-text.text-darken-2 {\n  color: #455a64 !important; }\n\n.blue-grey.darken-3 {\n  background-color: #37474f !important; }\n\n.blue-grey-text.text-darken-3 {\n  color: #37474f !important; }\n\n.blue-grey.darken-4 {\n  background-color: #263238 !important; }\n\n.blue-grey-text.text-darken-4 {\n  color: #263238 !important; }\n\n.grey {\n  background-color: #9e9e9e !important; }\n\n.grey-text {\n  color: #9e9e9e !important; }\n\n.grey.lighten-5 {\n  background-color: #fafafa !important; }\n\n.grey-text.text-lighten-5 {\n  color: #fafafa !important; }\n\n.grey.lighten-4 {\n  background-color: #f5f5f5 !important; }\n\n.grey-text.text-lighten-4 {\n  color: #f5f5f5 !important; }\n\n.grey.lighten-3 {\n  background-color: #eeeeee !important; }\n\n.grey-text.text-lighten-3 {\n  color: #eeeeee !important; }\n\n.grey.lighten-2 {\n  background-color: #e0e0e0 !important; }\n\n.grey-text.text-lighten-2 {\n  color: #e0e0e0 !important; }\n\n.grey.lighten-1 {\n  background-color: #bdbdbd !important; }\n\n.grey-text.text-lighten-1 {\n  color: #bdbdbd !important; }\n\n.grey.darken-1 {\n  background-color: #757575 !important; }\n\n.grey-text.text-darken-1 {\n  color: #757575 !important; }\n\n.grey.darken-2 {\n  background-color: #616161 !important; }\n\n.grey-text.text-darken-2 {\n  color: #616161 !important; }\n\n.grey.darken-3 {\n  background-color: #424242 !important; }\n\n.grey-text.text-darken-3 {\n  color: #424242 !important; }\n\n.grey.darken-4 {\n  background-color: #212121 !important; }\n\n.grey-text.text-darken-4 {\n  color: #212121 !important; }\n\n.black {\n  background-color: #000000 !important; }\n\n.black-text {\n  color: #000000 !important; }\n\n.white {\n  background-color: #FFFFFF !important; }\n\n.white-text {\n  color: #FFFFFF !important; }\n\n.transparent {\n  background-color: transparent !important; }\n\n.transparent-text {\n  color: transparent !important; }\n\n/*! normalize.css v7.0.0 | MIT License | github.com/necolas/normalize.css */\n/* Document\n   ========================================================================== */\n/**\n * 1. Correct the line height in all browsers.\n * 2. Prevent adjustments of font size after orientation changes in\n *    IE on Windows Phone and in iOS.\n */\nhtml {\n  line-height: 1.15;\n  /* 1 */\n  -ms-text-size-adjust: 100%;\n  /* 2 */\n  -webkit-text-size-adjust: 100%;\n  /* 2 */ }\n\n/* Sections\n   ========================================================================== */\n/**\n * Remove the margin in all browsers (opinionated).\n */\nbody {\n  margin: 0; }\n\n/**\n * Add the correct display in IE 9-.\n */\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block; }\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0; }\n\n/* Grouping content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in IE.\n */\nfigcaption,\nfigure,\nmain {\n  /* 1 */\n  display: block; }\n\n/**\n * Add the correct margin in IE 8.\n */\nfigure {\n  margin: 1em 40px; }\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\nhr {\n  box-sizing: content-box;\n  /* 1 */\n  height: 0;\n  /* 1 */\n  overflow: visible;\n  /* 2 */ }\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\npre {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */ }\n\n/* Text-level semantics\n   ========================================================================== */\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\na {\n  background-color: transparent;\n  /* 1 */\n  -webkit-text-decoration-skip: objects;\n  /* 2 */ }\n\n/**\n * 1. Remove the bottom border in Chrome 57- and Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\nabbr[title] {\n  border-bottom: none;\n  /* 1 */\n  text-decoration: underline;\n  /* 2 */\n  text-decoration: underline dotted;\n  /* 2 */ }\n\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\nb,\nstrong {\n  font-weight: inherit; }\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\nb,\nstrong {\n  font-weight: bolder; }\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace;\n  /* 1 */\n  font-size: 1em;\n  /* 2 */ }\n\n/**\n * Add the correct font style in Android 4.3-.\n */\ndfn {\n  font-style: italic; }\n\n/**\n * Add the correct background and color in IE 9-.\n */\nmark {\n  background-color: #ff0;\n  color: #000; }\n\n/**\n * Add the correct font size in all browsers.\n */\nsmall {\n  font-size: 80%; }\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline; }\n\nsub {\n  bottom: -0.25em; }\n\nsup {\n  top: -0.5em; }\n\n/* Embedded content\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\naudio,\nvideo {\n  display: inline-block; }\n\n/**\n * Add the correct display in iOS 4-7.\n */\naudio:not([controls]) {\n  display: none;\n  height: 0; }\n\n/**\n * Remove the border on images inside links in IE 10-.\n */\nimg {\n  border-style: none; }\n\n/**\n * Hide the overflow in IE.\n */\nsvg:not(:root) {\n  overflow: hidden; }\n\n/* Forms\n   ========================================================================== */\n/**\n * 1. Change the font styles in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif;\n  /* 1 */\n  font-size: 100%;\n  /* 1 */\n  line-height: 1.15;\n  /* 1 */\n  margin: 0;\n  /* 2 */ }\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\nbutton,\ninput {\n  /* 1 */\n  overflow: visible; }\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\nbutton,\nselect {\n  /* 1 */\n  text-transform: none; }\n\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\nbutton,\nhtml [type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n  /* 2 */ }\n\n/**\n * Remove the inner border and padding in Firefox.\n */\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0; }\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText; }\n\n/**\n * Correct the padding in Firefox.\n */\nfieldset {\n  padding: 0.35em 0.75em 0.625em; }\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\nlegend {\n  box-sizing: border-box;\n  /* 1 */\n  color: inherit;\n  /* 2 */\n  display: table;\n  /* 1 */\n  max-width: 100%;\n  /* 1 */\n  padding: 0;\n  /* 3 */\n  white-space: normal;\n  /* 1 */ }\n\n/**\n * 1. Add the correct display in IE 9-.\n * 2. Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\nprogress {\n  display: inline-block;\n  /* 1 */\n  vertical-align: baseline;\n  /* 2 */ }\n\n/**\n * Remove the default vertical scrollbar in IE.\n */\ntextarea {\n  overflow: auto; }\n\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */ }\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto; }\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  outline-offset: -2px;\n  /* 2 */ }\n\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on macOS.\n */\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none; }\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  /* 1 */\n  font: inherit;\n  /* 2 */ }\n\n/* Interactive\n   ========================================================================== */\n/*\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n */\ndetails,\nmenu {\n  display: block; }\n\n/*\n * Add the correct display in all browsers.\n */\nsummary {\n  display: list-item; }\n\n/* Scripting\n   ========================================================================== */\n/**\n * Add the correct display in IE 9-.\n */\ncanvas {\n  display: inline-block; }\n\n/**\n * Add the correct display in IE.\n */\ntemplate {\n  display: none; }\n\n/* Hidden\n   ========================================================================== */\n/**\n * Add the correct display in IE 10-.\n */\n[hidden] {\n  display: none; }\n\nhtml {\n  box-sizing: border-box; }\n\n*, *:before, *:after {\n  box-sizing: inherit; }\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen-Sans, Ubuntu, Cantarell, \"Helvetica Neue\", sans-serif; }\n\nul:not(.browser-default) {\n  padding-left: 0;\n  list-style-type: none; }\n  ul:not(.browser-default) > li {\n    list-style-type: none; }\n\na {\n  color: #039be5;\n  text-decoration: none;\n  -webkit-tap-highlight-color: transparent; }\n\n.valign-wrapper {\n  display: flex;\n  align-items: center; }\n\n.clearfix {\n  clear: both; }\n\n.z-depth-0 {\n  box-shadow: none !important; }\n\n/* 2dp elevation modified*/\n.z-depth-1, nav, .card-panel, .card, .toast, .btn, .btn-large, .btn-small, .btn-floating, .dropdown-content, .collapsible, .sidenav {\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2); }\n\n.z-depth-1-half, .btn:hover, .btn-large:hover, .btn-small:hover, .btn-floating:hover {\n  box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.14), 0 1px 7px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -1px rgba(0, 0, 0, 0.2); }\n\n/* 6dp elevation modified*/\n.z-depth-2 {\n  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14), 0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.3); }\n\n/* 12dp elevation modified*/\n.z-depth-3 {\n  box-shadow: 0 8px 17px 2px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2); }\n\n/* 16dp elevation */\n.z-depth-4 {\n  box-shadow: 0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -7px rgba(0, 0, 0, 0.2); }\n\n/* 24dp elevation */\n.z-depth-5, .modal {\n  box-shadow: 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12), 0 11px 15px -7px rgba(0, 0, 0, 0.2); }\n\n.hoverable {\n  transition: box-shadow .25s; }\n  .hoverable:hover {\n    box-shadow: 0 8px 17px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); }\n\n.divider {\n  height: 1px;\n  overflow: hidden;\n  background-color: #e0e0e0; }\n\nblockquote {\n  margin: 20px 0;\n  padding-left: 1.5rem;\n  border-left: 5px solid #ee6e73; }\n\ni {\n  line-height: inherit; }\n  i.left {\n    float: left;\n    margin-right: 15px; }\n  i.right {\n    float: right;\n    margin-left: 15px; }\n  i.tiny {\n    font-size: 1rem; }\n  i.small {\n    font-size: 2rem; }\n  i.medium {\n    font-size: 4rem; }\n  i.large {\n    font-size: 6rem; }\n\nimg.responsive-img,\nvideo.responsive-video {\n  max-width: 100%;\n  height: auto; }\n\n.pagination li {\n  display: inline-block;\n  border-radius: 2px;\n  text-align: center;\n  vertical-align: top;\n  height: 30px; }\n  .pagination li a {\n    color: #444;\n    display: inline-block;\n    font-size: 1.2rem;\n    padding: 0 10px;\n    line-height: 30px; }\n  .pagination li.active a {\n    color: #fff; }\n  .pagination li.active {\n    background-color: #ee6e73; }\n  .pagination li.disabled a {\n    cursor: default;\n    color: #999; }\n  .pagination li i {\n    font-size: 2rem; }\n\n.pagination li.pages ul li {\n  display: inline-block;\n  float: none; }\n\n@media only screen and (max-width: 992px) {\n  .pagination {\n    width: 100%; }\n    .pagination li.prev,\n    .pagination li.next {\n      width: 10%; }\n    .pagination li.pages {\n      width: 80%;\n      overflow: hidden;\n      white-space: nowrap; } }\n\n.breadcrumb {\n  font-size: 18px;\n  color: rgba(255, 255, 255, 0.7); }\n  .breadcrumb i,\n  .breadcrumb [class^=\"mdi-\"], .breadcrumb [class*=\"mdi-\"],\n  .breadcrumb i.material-icons {\n    display: inline-block;\n    float: left;\n    font-size: 24px; }\n  .breadcrumb:before {\n    content: '\\E5CC';\n    color: rgba(255, 255, 255, 0.7);\n    vertical-align: top;\n    display: inline-block;\n    font-family: 'Material Icons';\n    font-weight: normal;\n    font-style: normal;\n    font-size: 25px;\n    margin: 0 10px 0 8px;\n    -webkit-font-smoothing: antialiased; }\n  .breadcrumb:first-child:before {\n    display: none; }\n  .breadcrumb:last-child {\n    color: #fff; }\n\n.parallax-container {\n  position: relative;\n  overflow: hidden;\n  height: 500px; }\n  .parallax-container .parallax {\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    z-index: -1; }\n    .parallax-container .parallax img {\n      opacity: 0;\n      position: absolute;\n      left: 50%;\n      bottom: 0;\n      min-width: 100%;\n      min-height: 100%;\n      transform: translate3d(0, 0, 0);\n      transform: translateX(-50%); }\n\n.pin-top, .pin-bottom {\n  position: relative; }\n\n.pinned {\n  position: fixed !important; }\n\n/*********************\n  Transition Classes\n**********************/\nul.staggered-list li {\n  opacity: 0; }\n\n.fade-in {\n  opacity: 0;\n  transform-origin: 0 50%; }\n\n/*********************\n  Media Query Classes\n**********************/\n@media only screen and (max-width: 600px) {\n  .hide-on-small-only, .hide-on-small-and-down {\n    display: none !important; } }\n\n@media only screen and (max-width: 992px) {\n  .hide-on-med-and-down {\n    display: none !important; } }\n\n@media only screen and (min-width: 601px) {\n  .hide-on-med-and-up {\n    display: none !important; } }\n\n@media only screen and (min-width: 600px) and (max-width: 992px) {\n  .hide-on-med-only {\n    display: none !important; } }\n\n@media only screen and (min-width: 993px) {\n  .hide-on-large-only {\n    display: none !important; } }\n\n@media only screen and (min-width: 1201px) {\n  .hide-on-extra-large-only {\n    display: none !important; } }\n\n@media only screen and (min-width: 1201px) {\n  .show-on-extra-large {\n    display: block !important; } }\n\n@media only screen and (min-width: 993px) {\n  .show-on-large {\n    display: block !important; } }\n\n@media only screen and (min-width: 600px) and (max-width: 992px) {\n  .show-on-medium {\n    display: block !important; } }\n\n@media only screen and (max-width: 600px) {\n  .show-on-small {\n    display: block !important; } }\n\n@media only screen and (min-width: 601px) {\n  .show-on-medium-and-up {\n    display: block !important; } }\n\n@media only screen and (max-width: 992px) {\n  .show-on-medium-and-down {\n    display: block !important; } }\n\n@media only screen and (max-width: 600px) {\n  .center-on-small-only {\n    text-align: center; } }\n\n.page-footer {\n  padding-top: 20px;\n  color: #fff;\n  background-color: #ee6e73; }\n  .page-footer .footer-copyright {\n    overflow: hidden;\n    min-height: 50px;\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    padding: 10px 0px;\n    color: rgba(255, 255, 255, 0.8);\n    background-color: rgba(51, 51, 51, 0.08); }\n\ntable, th, td {\n  border: none; }\n\ntable {\n  width: 100%;\n  display: table;\n  border-collapse: collapse;\n  border-spacing: 0; }\n  table.striped tr {\n    border-bottom: none; }\n  table.striped > tbody > tr:nth-child(odd) {\n    background-color: rgba(242, 242, 242, 0.5); }\n  table.striped > tbody > tr > td {\n    border-radius: 0; }\n  table.highlight > tbody > tr {\n    transition: background-color .25s ease; }\n    table.highlight > tbody > tr:hover {\n      background-color: rgba(242, 242, 242, 0.5); }\n  table.centered thead tr th, table.centered tbody tr td {\n    text-align: center; }\n\ntr {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.12); }\n\ntd, th {\n  padding: 15px 5px;\n  display: table-cell;\n  text-align: left;\n  vertical-align: middle;\n  border-radius: 2px; }\n\n@media only screen and (max-width: 992px) {\n  table.responsive-table {\n    width: 100%;\n    border-collapse: collapse;\n    border-spacing: 0;\n    display: block;\n    position: relative;\n    /* sort out borders */ }\n    table.responsive-table td:empty:before {\n      content: '\\00a0'; }\n    table.responsive-table th,\n    table.responsive-table td {\n      margin: 0;\n      vertical-align: top; }\n    table.responsive-table th {\n      text-align: left; }\n    table.responsive-table thead {\n      display: block;\n      float: left; }\n      table.responsive-table thead tr {\n        display: block;\n        padding: 0 10px 0 0; }\n        table.responsive-table thead tr th::before {\n          content: \"\\00a0\"; }\n    table.responsive-table tbody {\n      display: block;\n      width: auto;\n      position: relative;\n      overflow-x: auto;\n      white-space: nowrap; }\n      table.responsive-table tbody tr {\n        display: inline-block;\n        vertical-align: top; }\n    table.responsive-table th {\n      display: block;\n      text-align: right; }\n    table.responsive-table td {\n      display: block;\n      min-height: 1.25em;\n      text-align: left; }\n    table.responsive-table tr {\n      border-bottom: none;\n      padding: 0 10px; }\n    table.responsive-table thead {\n      border: 0;\n      border-right: 1px solid rgba(0, 0, 0, 0.12); } }\n\n.collection {\n  margin: 0.5rem 0 1rem 0;\n  border: 1px solid #e0e0e0;\n  border-radius: 2px;\n  overflow: hidden;\n  position: relative; }\n  .collection .collection-item {\n    background-color: #fff;\n    line-height: 1.5rem;\n    padding: 10px 20px;\n    margin: 0;\n    border-bottom: 1px solid #e0e0e0; }\n    .collection .collection-item.avatar {\n      min-height: 84px;\n      padding-left: 72px;\n      position: relative; }\n      .collection .collection-item.avatar:not(.circle-clipper) > .circle,\n      .collection .collection-item.avatar :not(.circle-clipper) > .circle {\n        position: absolute;\n        width: 42px;\n        height: 42px;\n        overflow: hidden;\n        left: 15px;\n        display: inline-block;\n        vertical-align: middle; }\n      .collection .collection-item.avatar i.circle {\n        font-size: 18px;\n        line-height: 42px;\n        color: #fff;\n        background-color: #999;\n        text-align: center; }\n      .collection .collection-item.avatar .title {\n        font-size: 16px; }\n      .collection .collection-item.avatar p {\n        margin: 0; }\n      .collection .collection-item.avatar .secondary-content {\n        position: absolute;\n        top: 16px;\n        right: 16px; }\n    .collection .collection-item:last-child {\n      border-bottom: none; }\n    .collection .collection-item.active {\n      background-color: #26a69a;\n      color: #eafaf9; }\n      .collection .collection-item.active .secondary-content {\n        color: #fff; }\n  .collection a.collection-item {\n    display: block;\n    transition: .25s;\n    color: #26a69a; }\n    .collection a.collection-item:not(.active):hover {\n      background-color: #ddd; }\n  .collection.with-header .collection-header {\n    background-color: #fff;\n    border-bottom: 1px solid #e0e0e0;\n    padding: 10px 20px; }\n  .collection.with-header .collection-item {\n    padding-left: 30px; }\n  .collection.with-header .collection-item.avatar {\n    padding-left: 72px; }\n\n.secondary-content {\n  float: right;\n  color: #26a69a; }\n\n.collapsible .collection {\n  margin: 0;\n  border: none; }\n\n.video-container {\n  position: relative;\n  padding-bottom: 56.25%;\n  height: 0;\n  overflow: hidden; }\n  .video-container iframe, .video-container object, .video-container embed {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%; }\n\n.progress {\n  position: relative;\n  height: 4px;\n  display: block;\n  width: 100%;\n  background-color: #acece6;\n  border-radius: 2px;\n  margin: 0.5rem 0 1rem 0;\n  overflow: hidden; }\n  .progress .determinate {\n    position: absolute;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    background-color: #26a69a;\n    transition: width .3s linear; }\n  .progress .indeterminate {\n    background-color: #26a69a; }\n    .progress .indeterminate:before {\n      content: '';\n      position: absolute;\n      background-color: inherit;\n      top: 0;\n      left: 0;\n      bottom: 0;\n      will-change: left, right;\n      animation: indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite; }\n    .progress .indeterminate:after {\n      content: '';\n      position: absolute;\n      background-color: inherit;\n      top: 0;\n      left: 0;\n      bottom: 0;\n      will-change: left, right;\n      animation: indeterminate-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;\n      animation-delay: 1.15s; }\n\n@keyframes indeterminate {\n  0% {\n    left: -35%;\n    right: 100%; }\n  60% {\n    left: 100%;\n    right: -90%; }\n  100% {\n    left: 100%;\n    right: -90%; } }\n\n@keyframes indeterminate-short {\n  0% {\n    left: -200%;\n    right: 100%; }\n  60% {\n    left: 107%;\n    right: -8%; }\n  100% {\n    left: 107%;\n    right: -8%; } }\n\n/*******************\n  Utility Classes\n*******************/\n.hide {\n  display: none !important; }\n\n.left-align {\n  text-align: left; }\n\n.right-align {\n  text-align: right; }\n\n.center, .center-align {\n  text-align: center; }\n\n.left {\n  float: left !important; }\n\n.right {\n  float: right !important; }\n\n.no-select, input[type=range],\ninput[type=range] + .thumb {\n  user-select: none; }\n\n.circle {\n  border-radius: 50%; }\n\n.center-block {\n  display: block;\n  margin-left: auto;\n  margin-right: auto; }\n\n.truncate {\n  display: block;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis; }\n\n.no-padding {\n  padding: 0 !important; }\n\nspan.badge {\n  min-width: 3rem;\n  padding: 0 6px;\n  margin-left: 14px;\n  text-align: center;\n  font-size: 1rem;\n  line-height: 22px;\n  height: 22px;\n  color: #757575;\n  float: right;\n  box-sizing: border-box; }\n  span.badge.new {\n    font-weight: 300;\n    font-size: 0.8rem;\n    color: #fff;\n    background-color: #26a69a;\n    border-radius: 2px; }\n  span.badge.new:after {\n    content: \" new\"; }\n  span.badge[data-badge-caption]::after {\n    content: \" \" attr(data-badge-caption); }\n\nnav ul a span.badge {\n  display: inline-block;\n  float: none;\n  margin-left: 4px;\n  line-height: 22px;\n  height: 22px;\n  -webkit-font-smoothing: auto; }\n\n.collection-item span.badge {\n  margin-top: calc(0.75rem - 11px); }\n\n.collapsible span.badge {\n  margin-left: auto; }\n\n.sidenav span.badge {\n  margin-top: calc(24px - 11px); }\n\ntable span.badge {\n  display: inline-block;\n  float: none;\n  margin-left: auto; }\n\n/* This is needed for some mobile phones to display the Google Icon font properly */\n.material-icons {\n  text-rendering: optimizeLegibility;\n  font-feature-settings: 'liga'; }\n\n.container {\n  margin: 0 auto;\n  max-width: 1280px;\n  width: 90%; }\n\n@media only screen and (min-width: 601px) {\n  .container {\n    width: 85%; } }\n\n@media only screen and (min-width: 993px) {\n  .container {\n    width: 70%; } }\n\n.col .row {\n  margin-left: -0.75rem;\n  margin-right: -0.75rem; }\n\n.section {\n  padding-top: 1rem;\n  padding-bottom: 1rem; }\n  .section.no-pad {\n    padding: 0; }\n  .section.no-pad-bot {\n    padding-bottom: 0; }\n  .section.no-pad-top {\n    padding-top: 0; }\n\n.row {\n  margin-left: auto;\n  margin-right: auto;\n  margin-bottom: 20px; }\n  .row:after {\n    content: \"\";\n    display: table;\n    clear: both; }\n  .row .col {\n    float: left;\n    box-sizing: border-box;\n    padding: 0 0.75rem;\n    min-height: 1px; }\n    .row .col[class*=\"push-\"], .row .col[class*=\"pull-\"] {\n      position: relative; }\n    .row .col.s1 {\n      width: 8.33333%;\n      margin-left: auto;\n      left: auto;\n      right: auto; }\n    .row .col.s2 {\n      width: 16.66667%;\n      margin-left: auto;\n      left: auto;\n      right: auto; }\n    .row .col.s3 {\n      width: 25%;\n      margin-left: auto;\n      left: auto;\n      right: auto; }\n    .row .col.s4 {\n      width: 33.33333%;\n      margin-left: auto;\n      left: auto;\n      right: auto; }\n    .row .col.s5 {\n      width: 41.66667%;\n      margin-left: auto;\n      left: auto;\n      right: auto; }\n    .row .col.s6 {\n      width: 50%;\n      margin-left: auto;\n      left: auto;\n      right: auto; }\n    .row .col.s7 {\n      width: 58.33333%;\n      margin-left: auto;\n      left: auto;\n      right: auto; }\n    .row .col.s8 {\n      width: 66.66667%;\n      margin-left: auto;\n      left: auto;\n      right: auto; }\n    .row .col.s9 {\n      width: 75%;\n      margin-left: auto;\n      left: auto;\n      right: auto; }\n    .row .col.s10 {\n      width: 83.33333%;\n      margin-left: auto;\n      left: auto;\n      right: auto; }\n    .row .col.s11 {\n      width: 91.66667%;\n      margin-left: auto;\n      left: auto;\n      right: auto; }\n    .row .col.s12 {\n      width: 100%;\n      margin-left: auto;\n      left: auto;\n      right: auto; }\n    .row .col.offset-s1 {\n      margin-left: 8.33333%; }\n    .row .col.pull-s1 {\n      right: 8.33333%; }\n    .row .col.push-s1 {\n      left: 8.33333%; }\n    .row .col.offset-s2 {\n      margin-left: 16.66667%; }\n    .row .col.pull-s2 {\n      right: 16.66667%; }\n    .row .col.push-s2 {\n      left: 16.66667%; }\n    .row .col.offset-s3 {\n      margin-left: 25%; }\n    .row .col.pull-s3 {\n      right: 25%; }\n    .row .col.push-s3 {\n      left: 25%; }\n    .row .col.offset-s4 {\n      margin-left: 33.33333%; }\n    .row .col.pull-s4 {\n      right: 33.33333%; }\n    .row .col.push-s4 {\n      left: 33.33333%; }\n    .row .col.offset-s5 {\n      margin-left: 41.66667%; }\n    .row .col.pull-s5 {\n      right: 41.66667%; }\n    .row .col.push-s5 {\n      left: 41.66667%; }\n    .row .col.offset-s6 {\n      margin-left: 50%; }\n    .row .col.pull-s6 {\n      right: 50%; }\n    .row .col.push-s6 {\n      left: 50%; }\n    .row .col.offset-s7 {\n      margin-left: 58.33333%; }\n    .row .col.pull-s7 {\n      right: 58.33333%; }\n    .row .col.push-s7 {\n      left: 58.33333%; }\n    .row .col.offset-s8 {\n      margin-left: 66.66667%; }\n    .row .col.pull-s8 {\n      right: 66.66667%; }\n    .row .col.push-s8 {\n      left: 66.66667%; }\n    .row .col.offset-s9 {\n      margin-left: 75%; }\n    .row .col.pull-s9 {\n      right: 75%; }\n    .row .col.push-s9 {\n      left: 75%; }\n    .row .col.offset-s10 {\n      margin-left: 83.33333%; }\n    .row .col.pull-s10 {\n      right: 83.33333%; }\n    .row .col.push-s10 {\n      left: 83.33333%; }\n    .row .col.offset-s11 {\n      margin-left: 91.66667%; }\n    .row .col.pull-s11 {\n      right: 91.66667%; }\n    .row .col.push-s11 {\n      left: 91.66667%; }\n    .row .col.offset-s12 {\n      margin-left: 100%; }\n    .row .col.pull-s12 {\n      right: 100%; }\n    .row .col.push-s12 {\n      left: 100%; }\n    @media only screen and (min-width: 601px) {\n      .row .col.m1 {\n        width: 8.33333%;\n        margin-left: auto;\n        left: auto;\n        right: auto; }\n      .row .col.m2 {\n        width: 16.66667%;\n        margin-left: auto;\n        left: auto;\n        right: auto; }\n      .row .col.m3 {\n        width: 25%;\n        margin-left: auto;\n        left: auto;\n        right: auto; }\n      .row .col.m4 {\n        width: 33.33333%;\n        margin-left: auto;\n        left: auto;\n        right: auto; }\n      .row .col.m5 {\n        width: 41.66667%;\n        margin-left: auto;\n        left: auto;\n        right: auto; }\n      .row .col.m6 {\n        width: 50%;\n        margin-left: auto;\n        left: auto;\n        right: auto; }\n      .row .col.m7 {\n        width: 58.33333%;\n        margin-left: auto;\n        left: auto;\n        right: auto; }\n      .row .col.m8 {\n        width: 66.66667%;\n        margin-left: auto;\n        left: auto;\n        right: auto; }\n      .row .col.m9 {\n        width: 75%;\n        margin-left: auto;\n        left: auto;\n        right: auto; }\n      .row .col.m10 {\n        width: 83.33333%;\n        margin-left: auto;\n        left: auto;\n        right: auto; }\n      .row .col.m11 {\n        width: 91.66667%;\n        margin-left: auto;\n        left: auto;\n        right: auto; }\n      .row .col.m12 {\n        width: 100%;\n        margin-left: auto;\n        left: auto;\n        right: auto; }\n      .row .col.offset-m1 {\n        margin-left: 8.33333%; }\n      .row .col.pull-m1 {\n        right: 8.33333%; }\n      .row .col.push-m1 {\n        left: 8.33333%; }\n      .row .col.offset-m2 {\n        margin-left: 16.66667%; }\n      .row .col.pull-m2 {\n        right: 16.66667%; }\n      .row .col.push-m2 {\n        left: 16.66667%; }\n      .row .col.offset-m3 {\n        margin-left: 25%; }\n      .row .col.pull-m3 {\n        right: 25%; }\n      .row .col.push-m3 {\n        left: 25%; }\n      .row .col.offset-m4 {\n        margin-left: 33.33333%; }\n      .row .col.pull-m4 {\n        right: 33.33333%; }\n      .row .col.push-m4 {\n        left: 33.33333%; }\n      .row .col.offset-m5 {\n        margin-left: 41.66667%; }\n      .row .col.pull-m5 {\n        right: 41.66667%; }\n      .row .col.push-m5 {\n        left: 41.66667%; }\n      .row .col.offset-m6 {\n        margin-left: 50%; }\n      .row .col.pull-m6 {\n        right: 50%; }\n      .row .col.push-m6 {\n        left: 50%; }\n      .row .col.offset-m7 {\n        margin-left: 58.33333%; }\n      .row .col.pull-m7 {\n        right: 58.33333%; }\n      .row .col.push-m7 {\n        left: 58.33333%; }\n      .row .col.offset-m8 {\n        margin-left: 66.66667%; }\n      .row .col.pull-m8 {\n        right: 66.66667%; }\n      .row .col.push-m8 {\n        left: 66.66667%; }\n      .row .col.offset-m9 {\n        margin-left: 75%; }\n      .row .col.pull-m9 {\n        right: 75%; }\n      .row .col.push-m9 {\n        left: 75%; }\n      .row .col.offset-m10 {\n        margin-left: 83.33333%; }\n      .row .col.pull-m10 {\n        right: 83.33333%; }\n      .row .col.push-m10 {\n        left: 83.33333%; }\n      .row .col.offset-m11 {\n        margin-left: 91.66667%; }\n      .row .col.pull-m11 {\n        right: 91.66667%; }\n      .row .col.push-m11 {\n        left: 91.66667%; }\n      .row .col.offset-m12 {\n        margin-left: 100%; }\n      .row .col.pull-m12 {\n        right: 100%; }\n      .row .col.push-m12 {\n        left: 100%; } }\n    @media only screen and (min-width: 993px) {\n      .row .col.l1 {\n        width: 8.33333%;\n        margin-left: auto;\n        left: auto;\n        right: auto; }\n      .row .col.l2 {\n        width: 16.66667%;\n        margin-left: auto;\n        left: auto;\n        right: auto; }\n      .row .col.l3 {\n        width: 25%;\n        margin-left: auto;\n        left: auto;\n        right: auto; }\n      .row .col.l4 {\n        width: 33.33333%;\n        margin-left: auto;\n        left: auto;\n        right: auto; }\n      .row .col.l5 {\n        width: 41.66667%;\n        margin-left: auto;\n        left: auto;\n        right: auto; }\n      .row .col.l6 {\n        width: 50%;\n        margin-left: auto;\n        left: auto;\n        right: auto; }\n      .row .col.l7 {\n        width: 58.33333%;\n        margin-left: auto;\n        left: auto;\n        right: auto; }\n      .row .col.l8 {\n        width: 66.66667%;\n        margin-left: auto;\n        left: auto;\n        right: auto; }\n      .row .col.l9 {\n        width: 75%;\n        margin-left: auto;\n        left: auto;\n        right: auto; }\n      .row .col.l10 {\n        width: 83.33333%;\n        margin-left: auto;\n        left: auto;\n        right: auto; }\n      .row .col.l11 {\n        width: 91.66667%;\n        margin-left: auto;\n        left: auto;\n        right: auto; }\n      .row .col.l12 {\n        width: 100%;\n        margin-left: auto;\n        left: auto;\n        right: auto; }\n      .row .col.offset-l1 {\n        margin-left: 8.33333%; }\n      .row .col.pull-l1 {\n        right: 8.33333%; }\n      .row .col.push-l1 {\n        left: 8.33333%; }\n      .row .col.offset-l2 {\n        margin-left: 16.66667%; }\n      .row .col.pull-l2 {\n        right: 16.66667%; }\n      .row .col.push-l2 {\n        left: 16.66667%; }\n      .row .col.offset-l3 {\n        margin-left: 25%; }\n      .row .col.pull-l3 {\n        right: 25%; }\n      .row .col.push-l3 {\n        left: 25%; }\n      .row .col.offset-l4 {\n        margin-left: 33.33333%; }\n      .row .col.pull-l4 {\n        right: 33.33333%; }\n      .row .col.push-l4 {\n        left: 33.33333%; }\n      .row .col.offset-l5 {\n        margin-left: 41.66667%; }\n      .row .col.pull-l5 {\n        right: 41.66667%; }\n      .row .col.push-l5 {\n        left: 41.66667%; }\n      .row .col.offset-l6 {\n        margin-left: 50%; }\n      .row .col.pull-l6 {\n        right: 50%; }\n      .row .col.push-l6 {\n        left: 50%; }\n      .row .col.offset-l7 {\n        margin-left: 58.33333%; }\n      .row .col.pull-l7 {\n        right: 58.33333%; }\n      .row .col.push-l7 {\n        left: 58.33333%; }\n      .row .col.offset-l8 {\n        margin-left: 66.66667%; }\n      .row .col.pull-l8 {\n        right: 66.66667%; }\n      .row .col.push-l8 {\n        left: 66.66667%; }\n      .row .col.offset-l9 {\n        margin-left: 75%; }\n      .row .col.pull-l9 {\n        right: 75%; }\n      .row .col.push-l9 {\n        left: 75%; }\n      .row .col.offset-l10 {\n        margin-left: 83.33333%; }\n      .row .col.pull-l10 {\n        right: 83.33333%; }\n      .row .col.push-l10 {\n        left: 83.33333%; }\n      .row .col.offset-l11 {\n        margin-left: 91.66667%; }\n      .row .col.pull-l11 {\n        right: 91.66667%; }\n      .row .col.push-l11 {\n        left: 91.66667%; }\n      .row .col.offset-l12 {\n        margin-left: 100%; }\n      .row .col.pull-l12 {\n        right: 100%; }\n      .row .col.push-l12 {\n        left: 100%; } }\n    @media only screen and (min-width: 1201px) {\n      .row .col.xl1 {\n        width: 8.33333%;\n        margin-left: auto;\n        left: auto;\n        right: auto; }\n      .row .col.xl2 {\n        width: 16.66667%;\n        margin-left: auto;\n        left: auto;\n        right: auto; }\n      .row .col.xl3 {\n        width: 25%;\n        margin-left: auto;\n        left: auto;\n        right: auto; }\n      .row .col.xl4 {\n        width: 33.33333%;\n        margin-left: auto;\n        left: auto;\n        right: auto; }\n      .row .col.xl5 {\n        width: 41.66667%;\n        margin-left: auto;\n        left: auto;\n        right: auto; }\n      .row .col.xl6 {\n        width: 50%;\n        margin-left: auto;\n        left: auto;\n        right: auto; }\n      .row .col.xl7 {\n        width: 58.33333%;\n        margin-left: auto;\n        left: auto;\n        right: auto; }\n      .row .col.xl8 {\n        width: 66.66667%;\n        margin-left: auto;\n        left: auto;\n        right: auto; }\n      .row .col.xl9 {\n        width: 75%;\n        margin-left: auto;\n        left: auto;\n        right: auto; }\n      .row .col.xl10 {\n        width: 83.33333%;\n        margin-left: auto;\n        left: auto;\n        right: auto; }\n      .row .col.xl11 {\n        width: 91.66667%;\n        margin-left: auto;\n        left: auto;\n        right: auto; }\n      .row .col.xl12 {\n        width: 100%;\n        margin-left: auto;\n        left: auto;\n        right: auto; }\n      .row .col.offset-xl1 {\n        margin-left: 8.33333%; }\n      .row .col.pull-xl1 {\n        right: 8.33333%; }\n      .row .col.push-xl1 {\n        left: 8.33333%; }\n      .row .col.offset-xl2 {\n        margin-left: 16.66667%; }\n      .row .col.pull-xl2 {\n        right: 16.66667%; }\n      .row .col.push-xl2 {\n        left: 16.66667%; }\n      .row .col.offset-xl3 {\n        margin-left: 25%; }\n      .row .col.pull-xl3 {\n        right: 25%; }\n      .row .col.push-xl3 {\n        left: 25%; }\n      .row .col.offset-xl4 {\n        margin-left: 33.33333%; }\n      .row .col.pull-xl4 {\n        right: 33.33333%; }\n      .row .col.push-xl4 {\n        left: 33.33333%; }\n      .row .col.offset-xl5 {\n        margin-left: 41.66667%; }\n      .row .col.pull-xl5 {\n        right: 41.66667%; }\n      .row .col.push-xl5 {\n        left: 41.66667%; }\n      .row .col.offset-xl6 {\n        margin-left: 50%; }\n      .row .col.pull-xl6 {\n        right: 50%; }\n      .row .col.push-xl6 {\n        left: 50%; }\n      .row .col.offset-xl7 {\n        margin-left: 58.33333%; }\n      .row .col.pull-xl7 {\n        right: 58.33333%; }\n      .row .col.push-xl7 {\n        left: 58.33333%; }\n      .row .col.offset-xl8 {\n        margin-left: 66.66667%; }\n      .row .col.pull-xl8 {\n        right: 66.66667%; }\n      .row .col.push-xl8 {\n        left: 66.66667%; }\n      .row .col.offset-xl9 {\n        margin-left: 75%; }\n      .row .col.pull-xl9 {\n        right: 75%; }\n      .row .col.push-xl9 {\n        left: 75%; }\n      .row .col.offset-xl10 {\n        margin-left: 83.33333%; }\n      .row .col.pull-xl10 {\n        right: 83.33333%; }\n      .row .col.push-xl10 {\n        left: 83.33333%; }\n      .row .col.offset-xl11 {\n        margin-left: 91.66667%; }\n      .row .col.pull-xl11 {\n        right: 91.66667%; }\n      .row .col.push-xl11 {\n        left: 91.66667%; }\n      .row .col.offset-xl12 {\n        margin-left: 100%; }\n      .row .col.pull-xl12 {\n        right: 100%; }\n      .row .col.push-xl12 {\n        left: 100%; } }\n\nnav {\n  color: #fff;\n  background-color: #ee6e73;\n  width: 100%;\n  height: 56px;\n  line-height: 56px; }\n  nav.nav-extended {\n    height: auto; }\n    nav.nav-extended .nav-wrapper {\n      min-height: 56px;\n      height: auto; }\n    nav.nav-extended .nav-content {\n      position: relative;\n      line-height: normal; }\n  nav a {\n    color: #fff; }\n  nav i,\n  nav [class^=\"mdi-\"], nav [class*=\"mdi-\"],\n  nav i.material-icons {\n    display: block;\n    font-size: 24px;\n    height: 56px;\n    line-height: 56px; }\n  nav .nav-wrapper {\n    position: relative;\n    height: 100%; }\n  @media only screen and (min-width: 993px) {\n    nav a.sidenav-trigger {\n      display: none; } }\n  nav .sidenav-trigger {\n    float: left;\n    position: relative;\n    z-index: 1;\n    height: 56px;\n    margin: 0 18px; }\n    nav .sidenav-trigger i {\n      height: 56px;\n      line-height: 56px; }\n  nav .brand-logo {\n    position: absolute;\n    color: #fff;\n    display: inline-block;\n    font-size: 2.1rem;\n    padding: 0; }\n    nav .brand-logo.center {\n      left: 50%;\n      transform: translateX(-50%); }\n    @media only screen and (max-width: 992px) {\n      nav .brand-logo {\n        left: 50%;\n        transform: translateX(-50%); }\n        nav .brand-logo.left, nav .brand-logo.right {\n          padding: 0;\n          transform: none; }\n        nav .brand-logo.left {\n          left: 0.5rem; }\n        nav .brand-logo.right {\n          right: 0.5rem;\n          left: auto; } }\n    nav .brand-logo.right {\n      right: 0.5rem;\n      padding: 0; }\n    nav .brand-logo i,\n    nav .brand-logo [class^=\"mdi-\"], nav .brand-logo [class*=\"mdi-\"],\n    nav .brand-logo i.material-icons {\n      float: left;\n      margin-right: 15px; }\n  nav .nav-title {\n    display: inline-block;\n    font-size: 32px;\n    padding: 28px 0; }\n  nav ul {\n    margin: 0; }\n    nav ul li {\n      transition: background-color .3s;\n      float: left;\n      padding: 0; }\n      nav ul li.active {\n        background-color: rgba(0, 0, 0, 0.1); }\n    nav ul a {\n      transition: background-color .3s;\n      font-size: 1rem;\n      color: #fff;\n      display: block;\n      padding: 0 15px;\n      cursor: pointer; }\n      nav ul a.btn, nav ul a.btn-large, nav ul a.btn-small, nav ul a.btn-large, nav ul a.btn-flat, nav ul a.btn-floating {\n        margin-top: -2px;\n        margin-left: 15px;\n        margin-right: 15px; }\n        nav ul a.btn > .material-icons, nav ul a.btn-large > .material-icons, nav ul a.btn-small > .material-icons, nav ul a.btn-large > .material-icons, nav ul a.btn-flat > .material-icons, nav ul a.btn-floating > .material-icons {\n          height: inherit;\n          line-height: inherit; }\n      nav ul a:hover {\n        background-color: rgba(0, 0, 0, 0.1); }\n    nav ul.left {\n      float: left; }\n  nav form {\n    height: 100%; }\n  nav .input-field {\n    margin: 0;\n    height: 100%; }\n    nav .input-field input {\n      height: 100%;\n      font-size: 1.2rem;\n      border: none;\n      padding-left: 2rem; }\n      nav .input-field input:focus, nav .input-field input[type=text]:valid, nav .input-field input[type=password]:valid, nav .input-field input[type=email]:valid, nav .input-field input[type=url]:valid, nav .input-field input[type=date]:valid {\n        border: none;\n        box-shadow: none; }\n    nav .input-field label {\n      top: 0;\n      left: 0; }\n      nav .input-field label i {\n        color: rgba(255, 255, 255, 0.7);\n        transition: color .3s; }\n      nav .input-field label.active i {\n        color: #fff; }\n\n.navbar-fixed {\n  position: relative;\n  height: 56px;\n  z-index: 997; }\n  .navbar-fixed nav {\n    position: fixed; }\n\n@media only screen and (min-width: 601px) {\n  nav.nav-extended .nav-wrapper {\n    min-height: 64px; }\n  nav, nav .nav-wrapper i, nav a.sidenav-trigger, nav a.sidenav-trigger i {\n    height: 64px;\n    line-height: 64px; }\n  .navbar-fixed {\n    height: 64px; } }\n\na {\n  text-decoration: none; }\n\nhtml {\n  line-height: 1.5;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen-Sans, Ubuntu, Cantarell, \"Helvetica Neue\", sans-serif;\n  font-weight: normal;\n  color: rgba(0, 0, 0, 0.87); }\n  @media only screen and (min-width: 0) {\n    html {\n      font-size: 14px; } }\n  @media only screen and (min-width: 992px) {\n    html {\n      font-size: 14.5px; } }\n  @media only screen and (min-width: 1200px) {\n    html {\n      font-size: 15px; } }\n\nh1, h2, h3, h4, h5, h6 {\n  font-weight: 400;\n  line-height: 1.3; }\n\nh1 a, h2 a, h3 a, h4 a, h5 a, h6 a {\n  font-weight: inherit; }\n\nh1 {\n  font-size: 4.2rem;\n  line-height: 110%;\n  margin: 2.8rem 0 1.68rem 0; }\n\nh2 {\n  font-size: 3.56rem;\n  line-height: 110%;\n  margin: 2.37333rem 0 1.424rem 0; }\n\nh3 {\n  font-size: 2.92rem;\n  line-height: 110%;\n  margin: 1.94667rem 0 1.168rem 0; }\n\nh4 {\n  font-size: 2.28rem;\n  line-height: 110%;\n  margin: 1.52rem 0 0.912rem 0; }\n\nh5 {\n  font-size: 1.64rem;\n  line-height: 110%;\n  margin: 1.09333rem 0 0.656rem 0; }\n\nh6 {\n  font-size: 1.15rem;\n  line-height: 110%;\n  margin: 0.76667rem 0 0.46rem 0; }\n\nem {\n  font-style: italic; }\n\nstrong {\n  font-weight: 500; }\n\nsmall {\n  font-size: 75%; }\n\n.light {\n  font-weight: 300; }\n\n.thin {\n  font-weight: 200; }\n\n@media only screen and (min-width: 360px) {\n  .flow-text {\n    font-size: 1.2rem; } }\n\n@media only screen and (min-width: 390px) {\n  .flow-text {\n    font-size: 1.224rem; } }\n\n@media only screen and (min-width: 420px) {\n  .flow-text {\n    font-size: 1.248rem; } }\n\n@media only screen and (min-width: 450px) {\n  .flow-text {\n    font-size: 1.272rem; } }\n\n@media only screen and (min-width: 480px) {\n  .flow-text {\n    font-size: 1.296rem; } }\n\n@media only screen and (min-width: 510px) {\n  .flow-text {\n    font-size: 1.32rem; } }\n\n@media only screen and (min-width: 540px) {\n  .flow-text {\n    font-size: 1.344rem; } }\n\n@media only screen and (min-width: 570px) {\n  .flow-text {\n    font-size: 1.368rem; } }\n\n@media only screen and (min-width: 600px) {\n  .flow-text {\n    font-size: 1.392rem; } }\n\n@media only screen and (min-width: 630px) {\n  .flow-text {\n    font-size: 1.416rem; } }\n\n@media only screen and (min-width: 660px) {\n  .flow-text {\n    font-size: 1.44rem; } }\n\n@media only screen and (min-width: 690px) {\n  .flow-text {\n    font-size: 1.464rem; } }\n\n@media only screen and (min-width: 720px) {\n  .flow-text {\n    font-size: 1.488rem; } }\n\n@media only screen and (min-width: 750px) {\n  .flow-text {\n    font-size: 1.512rem; } }\n\n@media only screen and (min-width: 780px) {\n  .flow-text {\n    font-size: 1.536rem; } }\n\n@media only screen and (min-width: 810px) {\n  .flow-text {\n    font-size: 1.56rem; } }\n\n@media only screen and (min-width: 840px) {\n  .flow-text {\n    font-size: 1.584rem; } }\n\n@media only screen and (min-width: 870px) {\n  .flow-text {\n    font-size: 1.608rem; } }\n\n@media only screen and (min-width: 900px) {\n  .flow-text {\n    font-size: 1.632rem; } }\n\n@media only screen and (min-width: 930px) {\n  .flow-text {\n    font-size: 1.656rem; } }\n\n@media only screen and (min-width: 960px) {\n  .flow-text {\n    font-size: 1.68rem; } }\n\n@media only screen and (max-width: 360px) {\n  .flow-text {\n    font-size: 1.2rem; } }\n\n.scale-transition {\n  transition: transform 0.3s cubic-bezier(0.53, 0.01, 0.36, 1.63) !important; }\n  .scale-transition.scale-out {\n    transform: scale(0);\n    transition: transform .2s !important; }\n  .scale-transition.scale-in {\n    transform: scale(1); }\n\n.card-panel {\n  transition: box-shadow .25s;\n  padding: 24px;\n  margin: 0.5rem 0 1rem 0;\n  border-radius: 2px;\n  background-color: #fff; }\n\n.card {\n  position: relative;\n  margin: 0.5rem 0 1rem 0;\n  background-color: #fff;\n  transition: box-shadow .25s;\n  border-radius: 2px; }\n  .card .card-title {\n    font-size: 24px;\n    font-weight: 300; }\n    .card .card-title.activator {\n      cursor: pointer; }\n  .card.small, .card.medium, .card.large {\n    position: relative; }\n    .card.small .card-image, .card.medium .card-image, .card.large .card-image {\n      max-height: 60%;\n      overflow: hidden; }\n    .card.small .card-image + .card-content, .card.medium .card-image + .card-content, .card.large .card-image + .card-content {\n      max-height: 40%; }\n    .card.small .card-content, .card.medium .card-content, .card.large .card-content {\n      max-height: 100%;\n      overflow: hidden; }\n    .card.small .card-action, .card.medium .card-action, .card.large .card-action {\n      position: absolute;\n      bottom: 0;\n      left: 0;\n      right: 0; }\n  .card.small {\n    height: 300px; }\n  .card.medium {\n    height: 400px; }\n  .card.large {\n    height: 500px; }\n  .card.horizontal {\n    display: flex; }\n    .card.horizontal.small .card-image, .card.horizontal.medium .card-image, .card.horizontal.large .card-image {\n      height: 100%;\n      max-height: none;\n      overflow: visible; }\n      .card.horizontal.small .card-image img, .card.horizontal.medium .card-image img, .card.horizontal.large .card-image img {\n        height: 100%; }\n    .card.horizontal .card-image {\n      max-width: 50%; }\n      .card.horizontal .card-image img {\n        border-radius: 2px 0 0 2px;\n        max-width: 100%;\n        width: auto; }\n    .card.horizontal .card-stacked {\n      display: flex;\n      flex-direction: column;\n      flex: 1;\n      position: relative; }\n      .card.horizontal .card-stacked .card-content {\n        flex-grow: 1; }\n  .card.sticky-action .card-action {\n    z-index: 2; }\n  .card.sticky-action .card-reveal {\n    z-index: 1;\n    padding-bottom: 64px; }\n  .card .card-image {\n    position: relative; }\n    .card .card-image img {\n      display: block;\n      border-radius: 2px 2px 0 0;\n      position: relative;\n      left: 0;\n      right: 0;\n      top: 0;\n      bottom: 0;\n      width: 100%; }\n    .card .card-image .card-title {\n      color: #fff;\n      position: absolute;\n      bottom: 0;\n      left: 0;\n      max-width: 100%;\n      padding: 24px; }\n  .card .card-content {\n    padding: 24px;\n    border-radius: 0 0 2px 2px; }\n    .card .card-content p {\n      margin: 0; }\n    .card .card-content .card-title {\n      display: block;\n      line-height: 32px;\n      margin-bottom: 8px; }\n      .card .card-content .card-title i {\n        line-height: 32px; }\n  .card .card-action {\n    background-color: inherit;\n    border-top: 1px solid rgba(160, 160, 160, 0.2);\n    position: relative;\n    padding: 16px 24px; }\n    .card .card-action:last-child {\n      border-radius: 0 0 2px 2px; }\n    .card .card-action a:not(.btn):not(.btn-large):not(.btn-small):not(.btn-large):not(.btn-floating) {\n      color: #ffab40;\n      margin-right: 24px;\n      transition: color .3s ease;\n      text-transform: uppercase; }\n      .card .card-action a:not(.btn):not(.btn-large):not(.btn-small):not(.btn-large):not(.btn-floating):hover {\n        color: #ffd8a6; }\n  .card .card-reveal {\n    padding: 24px;\n    position: absolute;\n    background-color: #fff;\n    width: 100%;\n    overflow-y: auto;\n    left: 0;\n    top: 100%;\n    height: 100%;\n    z-index: 3;\n    display: none; }\n    .card .card-reveal .card-title {\n      cursor: pointer;\n      display: block; }\n\n#toast-container {\n  display: block;\n  position: fixed;\n  z-index: 10000; }\n  @media only screen and (max-width: 600px) {\n    #toast-container {\n      min-width: 100%;\n      bottom: 0%; } }\n  @media only screen and (min-width: 601px) and (max-width: 992px) {\n    #toast-container {\n      left: 5%;\n      bottom: 7%;\n      max-width: 90%; } }\n  @media only screen and (min-width: 993px) {\n    #toast-container {\n      top: 10%;\n      right: 7%;\n      max-width: 86%; } }\n\n.toast {\n  border-radius: 2px;\n  top: 35px;\n  width: auto;\n  margin-top: 10px;\n  position: relative;\n  max-width: 100%;\n  height: auto;\n  min-height: 48px;\n  line-height: 1.5em;\n  background-color: #323232;\n  padding: 10px 25px;\n  font-size: 1.1rem;\n  font-weight: 300;\n  color: #fff;\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  cursor: default; }\n  .toast .toast-action {\n    color: #eeff41;\n    font-weight: 500;\n    margin-right: -25px;\n    margin-left: 3rem; }\n  .toast.rounded {\n    border-radius: 24px; }\n  @media only screen and (max-width: 600px) {\n    .toast {\n      width: 100%;\n      border-radius: 0; } }\n\n.tabs {\n  position: relative;\n  overflow-x: auto;\n  overflow-y: hidden;\n  height: 48px;\n  width: 100%;\n  background-color: #fff;\n  margin: 0 auto;\n  white-space: nowrap; }\n  .tabs.tabs-transparent {\n    background-color: transparent; }\n    .tabs.tabs-transparent .tab a,\n    .tabs.tabs-transparent .tab.disabled a,\n    .tabs.tabs-transparent .tab.disabled a:hover {\n      color: rgba(255, 255, 255, 0.7); }\n    .tabs.tabs-transparent .tab a:hover,\n    .tabs.tabs-transparent .tab a.active {\n      color: #fff; }\n    .tabs.tabs-transparent .indicator {\n      background-color: #fff; }\n  .tabs.tabs-fixed-width {\n    display: flex; }\n    .tabs.tabs-fixed-width .tab {\n      flex-grow: 1; }\n  .tabs .tab {\n    display: inline-block;\n    text-align: center;\n    line-height: 48px;\n    height: 48px;\n    padding: 0;\n    margin: 0;\n    text-transform: uppercase; }\n    .tabs .tab a {\n      color: rgba(238, 110, 115, 0.7);\n      display: block;\n      width: 100%;\n      height: 100%;\n      padding: 0 24px;\n      font-size: 14px;\n      text-overflow: ellipsis;\n      overflow: hidden;\n      transition: color .28s ease, background-color .28s ease; }\n      .tabs .tab a:focus, .tabs .tab a:focus.active {\n        background-color: rgba(246, 178, 181, 0.2);\n        outline: none; }\n      .tabs .tab a:hover, .tabs .tab a.active {\n        background-color: transparent;\n        color: #ee6e73; }\n    .tabs .tab.disabled a,\n    .tabs .tab.disabled a:hover {\n      color: rgba(238, 110, 115, 0.4);\n      cursor: default; }\n  .tabs .indicator {\n    position: absolute;\n    bottom: 0;\n    height: 2px;\n    background-color: #f6b2b5;\n    will-change: left, right; }\n\n@media only screen and (max-width: 992px) {\n  .tabs {\n    display: flex; }\n    .tabs .tab {\n      flex-grow: 1; }\n      .tabs .tab a {\n        padding: 0 12px; } }\n\n.material-tooltip {\n  padding: 10px 8px;\n  font-size: 1rem;\n  z-index: 2000;\n  background-color: transparent;\n  border-radius: 2px;\n  color: #fff;\n  min-height: 36px;\n  line-height: 120%;\n  opacity: 0;\n  position: absolute;\n  text-align: center;\n  max-width: calc(100% - 4px);\n  overflow: hidden;\n  left: 0;\n  top: 0;\n  pointer-events: none;\n  visibility: hidden;\n  background-color: #323232; }\n\n.backdrop {\n  position: absolute;\n  opacity: 0;\n  height: 7px;\n  width: 14px;\n  border-radius: 0 0 50% 50%;\n  background-color: #323232;\n  z-index: -1;\n  transform-origin: 50% 0%;\n  visibility: hidden; }\n\n.btn, .btn-large, .btn-small,\n.btn-flat {\n  border: none;\n  border-radius: 2px;\n  display: inline-block;\n  height: 36px;\n  line-height: 36px;\n  padding: 0 16px;\n  text-transform: uppercase;\n  vertical-align: middle;\n  -webkit-tap-highlight-color: transparent; }\n\n.btn.disabled, .disabled.btn-large, .disabled.btn-small,\n.btn-floating.disabled,\n.btn-large.disabled,\n.btn-small.disabled,\n.btn-flat.disabled,\n.btn:disabled,\n.btn-large:disabled,\n.btn-small:disabled,\n.btn-floating:disabled,\n.btn-large:disabled,\n.btn-small:disabled,\n.btn-flat:disabled,\n.btn[disabled],\n.btn-large[disabled],\n.btn-small[disabled],\n.btn-floating[disabled],\n.btn-large[disabled],\n.btn-small[disabled],\n.btn-flat[disabled] {\n  pointer-events: none;\n  background-color: #DFDFDF !important;\n  box-shadow: none;\n  color: #9F9F9F !important;\n  cursor: default; }\n  .btn.disabled:hover, .disabled.btn-large:hover, .disabled.btn-small:hover,\n  .btn-floating.disabled:hover,\n  .btn-large.disabled:hover,\n  .btn-small.disabled:hover,\n  .btn-flat.disabled:hover,\n  .btn:disabled:hover,\n  .btn-large:disabled:hover,\n  .btn-small:disabled:hover,\n  .btn-floating:disabled:hover,\n  .btn-large:disabled:hover,\n  .btn-small:disabled:hover,\n  .btn-flat:disabled:hover,\n  .btn[disabled]:hover,\n  .btn-large[disabled]:hover,\n  .btn-small[disabled]:hover,\n  .btn-floating[disabled]:hover,\n  .btn-large[disabled]:hover,\n  .btn-small[disabled]:hover,\n  .btn-flat[disabled]:hover {\n    background-color: #DFDFDF !important;\n    color: #9F9F9F !important; }\n\n.btn, .btn-large, .btn-small,\n.btn-floating,\n.btn-large,\n.btn-small,\n.btn-flat {\n  font-size: 14px;\n  outline: 0; }\n  .btn i, .btn-large i, .btn-small i,\n  .btn-floating i,\n  .btn-large i,\n  .btn-small i,\n  .btn-flat i {\n    font-size: 1.3rem;\n    line-height: inherit; }\n\n.btn:focus, .btn-large:focus, .btn-small:focus,\n.btn-floating:focus {\n  background-color: #1d7d74; }\n\n.btn, .btn-large, .btn-small {\n  text-decoration: none;\n  color: #fff;\n  background-color: #26a69a;\n  text-align: center;\n  letter-spacing: .5px;\n  transition: background-color .2s ease-out;\n  cursor: pointer; }\n  .btn:hover, .btn-large:hover, .btn-small:hover {\n    background-color: #2bbbad; }\n\n.btn-floating {\n  display: inline-block;\n  color: #fff;\n  position: relative;\n  overflow: hidden;\n  z-index: 1;\n  width: 40px;\n  height: 40px;\n  line-height: 40px;\n  padding: 0;\n  background-color: #26a69a;\n  border-radius: 50%;\n  transition: background-color .3s;\n  cursor: pointer;\n  vertical-align: middle; }\n  .btn-floating:hover {\n    background-color: #26a69a; }\n  .btn-floating:before {\n    border-radius: 0; }\n  .btn-floating.btn-large {\n    width: 56px;\n    height: 56px;\n    padding: 0; }\n    .btn-floating.btn-large.halfway-fab {\n      bottom: -28px; }\n    .btn-floating.btn-large i {\n      line-height: 56px; }\n  .btn-floating.btn-small {\n    width: 32.4px;\n    height: 32.4px; }\n    .btn-floating.btn-small.halfway-fab {\n      bottom: -16.2px; }\n    .btn-floating.btn-small i {\n      line-height: 32.4px; }\n  .btn-floating.halfway-fab {\n    position: absolute;\n    right: 24px;\n    bottom: -20px; }\n    .btn-floating.halfway-fab.left {\n      right: auto;\n      left: 24px; }\n  .btn-floating i {\n    width: inherit;\n    display: inline-block;\n    text-align: center;\n    color: #fff;\n    font-size: 1.6rem;\n    line-height: 40px; }\n\nbutton.btn-floating {\n  border: none; }\n\n.fixed-action-btn {\n  position: fixed;\n  right: 23px;\n  bottom: 23px;\n  padding-top: 15px;\n  margin-bottom: 0;\n  z-index: 997; }\n  .fixed-action-btn.active ul {\n    visibility: visible; }\n  .fixed-action-btn.direction-left, .fixed-action-btn.direction-right {\n    padding: 0 0 0 15px; }\n    .fixed-action-btn.direction-left ul, .fixed-action-btn.direction-right ul {\n      text-align: right;\n      right: 64px;\n      top: 50%;\n      transform: translateY(-50%);\n      height: 100%;\n      left: auto;\n      /*width 100% only goes to width of button container */\n      width: 500px; }\n      .fixed-action-btn.direction-left ul li, .fixed-action-btn.direction-right ul li {\n        display: inline-block;\n        margin: 7.5px 15px 0 0; }\n  .fixed-action-btn.direction-right {\n    padding: 0 15px 0 0; }\n    .fixed-action-btn.direction-right ul {\n      text-align: left;\n      direction: rtl;\n      left: 64px;\n      right: auto; }\n      .fixed-action-btn.direction-right ul li {\n        margin: 7.5px 0 0 15px; }\n  .fixed-action-btn.direction-bottom {\n    padding: 0 0 15px 0; }\n    .fixed-action-btn.direction-bottom ul {\n      top: 64px;\n      bottom: auto;\n      display: flex;\n      flex-direction: column-reverse; }\n      .fixed-action-btn.direction-bottom ul li {\n        margin: 15px 0 0 0; }\n  .fixed-action-btn.toolbar {\n    padding: 0;\n    height: 56px; }\n    .fixed-action-btn.toolbar.active > a i {\n      opacity: 0; }\n    .fixed-action-btn.toolbar ul {\n      display: flex;\n      top: 0;\n      bottom: 0;\n      z-index: 1; }\n      .fixed-action-btn.toolbar ul li {\n        flex: 1;\n        display: inline-block;\n        margin: 0;\n        height: 100%;\n        transition: none; }\n        .fixed-action-btn.toolbar ul li a {\n          display: block;\n          overflow: hidden;\n          position: relative;\n          width: 100%;\n          height: 100%;\n          background-color: transparent;\n          box-shadow: none;\n          color: #fff;\n          line-height: 56px;\n          z-index: 1; }\n          .fixed-action-btn.toolbar ul li a i {\n            line-height: inherit; }\n  .fixed-action-btn ul {\n    left: 0;\n    right: 0;\n    text-align: center;\n    position: absolute;\n    bottom: 64px;\n    margin: 0;\n    visibility: hidden; }\n    .fixed-action-btn ul li {\n      margin-bottom: 15px; }\n    .fixed-action-btn ul a.btn-floating {\n      opacity: 0; }\n  .fixed-action-btn .fab-backdrop {\n    position: absolute;\n    top: 0;\n    left: 0;\n    z-index: -1;\n    width: 40px;\n    height: 40px;\n    background-color: #26a69a;\n    border-radius: 50%;\n    transform: scale(0); }\n\n.btn-flat {\n  box-shadow: none;\n  background-color: transparent;\n  color: #343434;\n  cursor: pointer;\n  transition: background-color .2s; }\n  .btn-flat:focus, .btn-flat:hover {\n    box-shadow: none; }\n  .btn-flat:focus {\n    background-color: rgba(0, 0, 0, 0.1); }\n  .btn-flat.disabled, .btn-flat.btn-flat[disabled] {\n    background-color: transparent !important;\n    color: #b3b3b3 !important;\n    cursor: default; }\n\n.btn-large {\n  height: 54px;\n  line-height: 54px;\n  font-size: 15px;\n  padding: 0 28px; }\n  .btn-large i {\n    font-size: 1.6rem; }\n\n.btn-small {\n  height: 32.4px;\n  line-height: 32.4px;\n  font-size: 13px; }\n  .btn-small i {\n    font-size: 1.2rem; }\n\n.btn-block {\n  display: block; }\n\n.dropdown-content {\n  background-color: #fff;\n  margin: 0;\n  display: none;\n  min-width: 100px;\n  overflow-y: auto;\n  opacity: 0;\n  position: absolute;\n  left: 0;\n  top: 0;\n  z-index: 9999;\n  transform-origin: 0 0; }\n  .dropdown-content:focus {\n    outline: 0; }\n  .dropdown-content li {\n    clear: both;\n    color: rgba(0, 0, 0, 0.87);\n    cursor: pointer;\n    min-height: 50px;\n    line-height: 1.5rem;\n    width: 100%;\n    text-align: left; }\n    .dropdown-content li:hover, .dropdown-content li.active {\n      background-color: #eee; }\n    .dropdown-content li:focus {\n      outline: none; }\n    .dropdown-content li.divider {\n      min-height: 0;\n      height: 1px; }\n    .dropdown-content li > a, .dropdown-content li > span {\n      font-size: 16px;\n      color: #26a69a;\n      display: block;\n      line-height: 22px;\n      padding: 14px 16px; }\n    .dropdown-content li > span > label {\n      top: 1px;\n      left: 0;\n      height: 18px; }\n    .dropdown-content li > a > i {\n      height: inherit;\n      line-height: inherit;\n      float: left;\n      margin: 0 24px 0 0;\n      width: 24px; }\n\nbody.keyboard-focused .dropdown-content li:focus {\n  background-color: #dadada; }\n\n.input-field.col .dropdown-content [type=\"checkbox\"] + label {\n  top: 1px;\n  left: 0;\n  height: 18px;\n  transform: none; }\n\n.dropdown-trigger {\n  cursor: pointer; }\n\n/*!\n * Waves v0.6.0\n * http://fian.my.id/Waves\n *\n * Copyright 2014 Alfiana E. Sibuea and other contributors\n * Released under the MIT license\n * https://github.com/fians/Waves/blob/master/LICENSE\n */\n.waves-effect {\n  position: relative;\n  cursor: pointer;\n  display: inline-block;\n  overflow: hidden;\n  user-select: none;\n  -webkit-tap-highlight-color: transparent;\n  vertical-align: middle;\n  z-index: 1;\n  transition: .3s ease-out; }\n  .waves-effect .waves-ripple {\n    position: absolute;\n    border-radius: 50%;\n    width: 20px;\n    height: 20px;\n    margin-top: -10px;\n    margin-left: -10px;\n    opacity: 0;\n    background: rgba(0, 0, 0, 0.2);\n    transition: all 0.7s ease-out;\n    transition-property: transform, opacity;\n    transform: scale(0);\n    pointer-events: none; }\n  .waves-effect.waves-light .waves-ripple {\n    background-color: rgba(255, 255, 255, 0.45); }\n  .waves-effect.waves-red .waves-ripple {\n    background-color: rgba(244, 67, 54, 0.7); }\n  .waves-effect.waves-yellow .waves-ripple {\n    background-color: rgba(255, 235, 59, 0.7); }\n  .waves-effect.waves-orange .waves-ripple {\n    background-color: rgba(255, 152, 0, 0.7); }\n  .waves-effect.waves-purple .waves-ripple {\n    background-color: rgba(156, 39, 176, 0.7); }\n  .waves-effect.waves-green .waves-ripple {\n    background-color: rgba(76, 175, 80, 0.7); }\n  .waves-effect.waves-teal .waves-ripple {\n    background-color: rgba(0, 150, 136, 0.7); }\n  .waves-effect input[type=\"button\"], .waves-effect input[type=\"reset\"], .waves-effect input[type=\"submit\"] {\n    border: 0;\n    font-style: normal;\n    font-size: inherit;\n    text-transform: inherit;\n    background: none; }\n  .waves-effect img {\n    position: relative;\n    z-index: -1; }\n\n.waves-notransition {\n  transition: none !important; }\n\n.waves-circle {\n  transform: translateZ(0);\n  -webkit-mask-image: -webkit-radial-gradient(circle, white 100%, black 100%); }\n\n.waves-input-wrapper {\n  border-radius: 0.2em;\n  vertical-align: bottom; }\n  .waves-input-wrapper .waves-button-input {\n    position: relative;\n    top: 0;\n    left: 0;\n    z-index: 1; }\n\n.waves-circle {\n  text-align: center;\n  width: 2.5em;\n  height: 2.5em;\n  line-height: 2.5em;\n  border-radius: 50%;\n  -webkit-mask-image: none; }\n\n.waves-block {\n  display: block; }\n\n/* Firefox Bug: link not triggered */\n.waves-effect .waves-ripple {\n  z-index: -1; }\n\n.modal {\n  display: none;\n  position: fixed;\n  left: 0;\n  right: 0;\n  background-color: #fafafa;\n  padding: 0;\n  max-height: 70%;\n  width: 55%;\n  margin: auto;\n  overflow-y: auto;\n  border-radius: 2px;\n  will-change: top, opacity; }\n  .modal:focus {\n    outline: none; }\n  @media only screen and (max-width: 992px) {\n    .modal {\n      width: 80%; } }\n  .modal h1, .modal h2, .modal h3, .modal h4 {\n    margin-top: 0; }\n  .modal .modal-content {\n    padding: 24px; }\n  .modal .modal-close {\n    cursor: pointer; }\n  .modal .modal-footer {\n    border-radius: 0 0 2px 2px;\n    background-color: #fafafa;\n    padding: 4px 6px;\n    height: 56px;\n    width: 100%;\n    text-align: right; }\n    .modal .modal-footer .btn, .modal .modal-footer .btn-large, .modal .modal-footer .btn-small, .modal .modal-footer .btn-flat {\n      margin: 6px 0; }\n\n.modal-overlay {\n  position: fixed;\n  z-index: 999;\n  top: -25%;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  height: 125%;\n  width: 100%;\n  background: #000;\n  display: none;\n  will-change: opacity; }\n\n.modal.modal-fixed-footer {\n  padding: 0;\n  height: 70%; }\n  .modal.modal-fixed-footer .modal-content {\n    position: absolute;\n    height: calc(100% - 56px);\n    max-height: 100%;\n    width: 100%;\n    overflow-y: auto; }\n  .modal.modal-fixed-footer .modal-footer {\n    border-top: 1px solid rgba(0, 0, 0, 0.1);\n    position: absolute;\n    bottom: 0; }\n\n.modal.bottom-sheet {\n  top: auto;\n  bottom: -100%;\n  margin: 0;\n  width: 100%;\n  max-height: 45%;\n  border-radius: 0;\n  will-change: bottom, opacity; }\n\n.collapsible {\n  border-top: 1px solid #ddd;\n  border-right: 1px solid #ddd;\n  border-left: 1px solid #ddd;\n  margin: 0.5rem 0 1rem 0; }\n\n.collapsible-header {\n  display: flex;\n  cursor: pointer;\n  -webkit-tap-highlight-color: transparent;\n  line-height: 1.5;\n  padding: 1rem;\n  background-color: #fff;\n  border-bottom: 1px solid #ddd; }\n  .collapsible-header:focus {\n    outline: 0; }\n  .collapsible-header i {\n    width: 2rem;\n    font-size: 1.6rem;\n    display: inline-block;\n    text-align: center;\n    margin-right: 1rem; }\n\n.keyboard-focused .collapsible-header:focus {\n  background-color: #eee; }\n\n.collapsible-body {\n  display: none;\n  border-bottom: 1px solid #ddd;\n  box-sizing: border-box;\n  padding: 2rem; }\n\n.sidenav .collapsible,\n.sidenav.fixed .collapsible {\n  border: none;\n  box-shadow: none; }\n  .sidenav .collapsible li,\n  .sidenav.fixed .collapsible li {\n    padding: 0; }\n\n.sidenav .collapsible-header,\n.sidenav.fixed .collapsible-header {\n  background-color: transparent;\n  border: none;\n  line-height: inherit;\n  height: inherit;\n  padding: 0 16px; }\n  .sidenav .collapsible-header:hover,\n  .sidenav.fixed .collapsible-header:hover {\n    background-color: rgba(0, 0, 0, 0.05); }\n  .sidenav .collapsible-header i,\n  .sidenav.fixed .collapsible-header i {\n    line-height: inherit; }\n\n.sidenav .collapsible-body,\n.sidenav.fixed .collapsible-body {\n  border: 0;\n  background-color: #fff; }\n  .sidenav .collapsible-body li a,\n  .sidenav.fixed .collapsible-body li a {\n    padding: 0 23.5px 0 31px; }\n\n.collapsible.popout {\n  border: none;\n  box-shadow: none; }\n  .collapsible.popout > li {\n    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);\n    margin: 0 24px;\n    transition: margin 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94); }\n  .collapsible.popout > li.active {\n    box-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15);\n    margin: 16px 0; }\n\n.chip {\n  display: inline-block;\n  height: 32px;\n  font-size: 13px;\n  font-weight: 500;\n  color: rgba(0, 0, 0, 0.6);\n  line-height: 32px;\n  padding: 0 12px;\n  border-radius: 16px;\n  background-color: #e4e4e4;\n  margin-bottom: 5px;\n  margin-right: 5px; }\n  .chip:focus {\n    outline: none;\n    background-color: #26a69a;\n    color: #fff; }\n  .chip > img {\n    float: left;\n    margin: 0 8px 0 -12px;\n    height: 32px;\n    width: 32px;\n    border-radius: 50%; }\n  .chip .close {\n    cursor: pointer;\n    float: right;\n    font-size: 16px;\n    line-height: 32px;\n    padding-left: 8px; }\n\n.chips {\n  border: none;\n  border-bottom: 1px solid #9e9e9e;\n  box-shadow: none;\n  margin: 0 0 8px 0;\n  min-height: 45px;\n  outline: none;\n  transition: all .3s; }\n  .chips.focus {\n    border-bottom: 1px solid #26a69a;\n    box-shadow: 0 1px 0 0 #26a69a; }\n  .chips:hover {\n    cursor: text; }\n  .chips .input {\n    background: none;\n    border: 0;\n    color: rgba(0, 0, 0, 0.6);\n    display: inline-block;\n    font-size: 16px;\n    height: 3rem;\n    line-height: 32px;\n    outline: 0;\n    margin: 0;\n    padding: 0 !important;\n    width: 120px !important; }\n  .chips .input:focus {\n    border: 0 !important;\n    box-shadow: none !important; }\n  .chips .autocomplete-content {\n    margin-top: 0;\n    margin-bottom: 0; }\n\n.prefix ~ .chips {\n  margin-left: 3rem;\n  width: 92%;\n  width: calc(100% - 3rem); }\n\n.chips:empty ~ label {\n  font-size: 0.8rem;\n  transform: translateY(-140%); }\n\n.materialboxed {\n  display: block;\n  cursor: zoom-in;\n  position: relative;\n  transition: opacity .4s;\n  -webkit-backface-visibility: hidden; }\n  .materialboxed:hover:not(.active) {\n    opacity: .8; }\n  .materialboxed.active {\n    cursor: zoom-out; }\n\n#materialbox-overlay {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  background-color: #292929;\n  z-index: 1000;\n  will-change: opacity; }\n\n.materialbox-caption {\n  position: fixed;\n  display: none;\n  color: #fff;\n  line-height: 50px;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  text-align: center;\n  padding: 0% 15%;\n  height: 50px;\n  z-index: 1000;\n  -webkit-font-smoothing: antialiased; }\n\nselect:focus {\n  outline: 1px solid #c9f3ef; }\n\nbutton:focus {\n  outline: none;\n  background-color: #2ab7a9; }\n\nlabel {\n  font-size: 0.8rem;\n  color: #9e9e9e; }\n\n/* Text Inputs + Textarea\n   ========================================================================== */\n/* Style Placeholders */\n::placeholder {\n  color: #d1d1d1; }\n\n/* Text inputs */\ninput:not([type]),\ninput[type=text]:not(.browser-default),\ninput[type=password]:not(.browser-default),\ninput[type=email]:not(.browser-default),\ninput[type=url]:not(.browser-default),\ninput[type=time]:not(.browser-default),\ninput[type=date]:not(.browser-default),\ninput[type=datetime]:not(.browser-default),\ninput[type=datetime-local]:not(.browser-default),\ninput[type=tel]:not(.browser-default),\ninput[type=number]:not(.browser-default),\ninput[type=search]:not(.browser-default),\ntextarea.materialize-textarea {\n  background-color: transparent;\n  border: none;\n  border-bottom: 1px solid #9e9e9e;\n  border-radius: 0;\n  outline: none;\n  height: 3rem;\n  width: 100%;\n  font-size: 16px;\n  margin: 0 0 8px 0;\n  padding: 0;\n  box-shadow: none;\n  box-sizing: content-box;\n  transition: box-shadow .3s, border .3s; }\n  input:not([type]):disabled, input:not([type])[readonly=\"readonly\"],\n  input[type=text]:not(.browser-default):disabled,\n  input[type=text]:not(.browser-default)[readonly=\"readonly\"],\n  input[type=password]:not(.browser-default):disabled,\n  input[type=password]:not(.browser-default)[readonly=\"readonly\"],\n  input[type=email]:not(.browser-default):disabled,\n  input[type=email]:not(.browser-default)[readonly=\"readonly\"],\n  input[type=url]:not(.browser-default):disabled,\n  input[type=url]:not(.browser-default)[readonly=\"readonly\"],\n  input[type=time]:not(.browser-default):disabled,\n  input[type=time]:not(.browser-default)[readonly=\"readonly\"],\n  input[type=date]:not(.browser-default):disabled,\n  input[type=date]:not(.browser-default)[readonly=\"readonly\"],\n  input[type=datetime]:not(.browser-default):disabled,\n  input[type=datetime]:not(.browser-default)[readonly=\"readonly\"],\n  input[type=datetime-local]:not(.browser-default):disabled,\n  input[type=datetime-local]:not(.browser-default)[readonly=\"readonly\"],\n  input[type=tel]:not(.browser-default):disabled,\n  input[type=tel]:not(.browser-default)[readonly=\"readonly\"],\n  input[type=number]:not(.browser-default):disabled,\n  input[type=number]:not(.browser-default)[readonly=\"readonly\"],\n  input[type=search]:not(.browser-default):disabled,\n  input[type=search]:not(.browser-default)[readonly=\"readonly\"],\n  textarea.materialize-textarea:disabled,\n  textarea.materialize-textarea[readonly=\"readonly\"] {\n    color: rgba(0, 0, 0, 0.42);\n    border-bottom: 1px dotted rgba(0, 0, 0, 0.42); }\n  input:not([type]):disabled + label,\n  input:not([type])[readonly=\"readonly\"] + label,\n  input[type=text]:not(.browser-default):disabled + label,\n  input[type=text]:not(.browser-default)[readonly=\"readonly\"] + label,\n  input[type=password]:not(.browser-default):disabled + label,\n  input[type=password]:not(.browser-default)[readonly=\"readonly\"] + label,\n  input[type=email]:not(.browser-default):disabled + label,\n  input[type=email]:not(.browser-default)[readonly=\"readonly\"] + label,\n  input[type=url]:not(.browser-default):disabled + label,\n  input[type=url]:not(.browser-default)[readonly=\"readonly\"] + label,\n  input[type=time]:not(.browser-default):disabled + label,\n  input[type=time]:not(.browser-default)[readonly=\"readonly\"] + label,\n  input[type=date]:not(.browser-default):disabled + label,\n  input[type=date]:not(.browser-default)[readonly=\"readonly\"] + label,\n  input[type=datetime]:not(.browser-default):disabled + label,\n  input[type=datetime]:not(.browser-default)[readonly=\"readonly\"] + label,\n  input[type=datetime-local]:not(.browser-default):disabled + label,\n  input[type=datetime-local]:not(.browser-default)[readonly=\"readonly\"] + label,\n  input[type=tel]:not(.browser-default):disabled + label,\n  input[type=tel]:not(.browser-default)[readonly=\"readonly\"] + label,\n  input[type=number]:not(.browser-default):disabled + label,\n  input[type=number]:not(.browser-default)[readonly=\"readonly\"] + label,\n  input[type=search]:not(.browser-default):disabled + label,\n  input[type=search]:not(.browser-default)[readonly=\"readonly\"] + label,\n  textarea.materialize-textarea:disabled + label,\n  textarea.materialize-textarea[readonly=\"readonly\"] + label {\n    color: rgba(0, 0, 0, 0.42); }\n  input:not([type]):focus:not([readonly]),\n  input[type=text]:not(.browser-default):focus:not([readonly]),\n  input[type=password]:not(.browser-default):focus:not([readonly]),\n  input[type=email]:not(.browser-default):focus:not([readonly]),\n  input[type=url]:not(.browser-default):focus:not([readonly]),\n  input[type=time]:not(.browser-default):focus:not([readonly]),\n  input[type=date]:not(.browser-default):focus:not([readonly]),\n  input[type=datetime]:not(.browser-default):focus:not([readonly]),\n  input[type=datetime-local]:not(.browser-default):focus:not([readonly]),\n  input[type=tel]:not(.browser-default):focus:not([readonly]),\n  input[type=number]:not(.browser-default):focus:not([readonly]),\n  input[type=search]:not(.browser-default):focus:not([readonly]),\n  textarea.materialize-textarea:focus:not([readonly]) {\n    border-bottom: 1px solid #26a69a;\n    box-shadow: 0 1px 0 0 #26a69a; }\n  input:not([type]):focus:not([readonly]) + label,\n  input[type=text]:not(.browser-default):focus:not([readonly]) + label,\n  input[type=password]:not(.browser-default):focus:not([readonly]) + label,\n  input[type=email]:not(.browser-default):focus:not([readonly]) + label,\n  input[type=url]:not(.browser-default):focus:not([readonly]) + label,\n  input[type=time]:not(.browser-default):focus:not([readonly]) + label,\n  input[type=date]:not(.browser-default):focus:not([readonly]) + label,\n  input[type=datetime]:not(.browser-default):focus:not([readonly]) + label,\n  input[type=datetime-local]:not(.browser-default):focus:not([readonly]) + label,\n  input[type=tel]:not(.browser-default):focus:not([readonly]) + label,\n  input[type=number]:not(.browser-default):focus:not([readonly]) + label,\n  input[type=search]:not(.browser-default):focus:not([readonly]) + label,\n  textarea.materialize-textarea:focus:not([readonly]) + label {\n    color: #26a69a; }\n  input:not([type]):focus.valid ~ label,\n  input[type=text]:not(.browser-default):focus.valid ~ label,\n  input[type=password]:not(.browser-default):focus.valid ~ label,\n  input[type=email]:not(.browser-default):focus.valid ~ label,\n  input[type=url]:not(.browser-default):focus.valid ~ label,\n  input[type=time]:not(.browser-default):focus.valid ~ label,\n  input[type=date]:not(.browser-default):focus.valid ~ label,\n  input[type=datetime]:not(.browser-default):focus.valid ~ label,\n  input[type=datetime-local]:not(.browser-default):focus.valid ~ label,\n  input[type=tel]:not(.browser-default):focus.valid ~ label,\n  input[type=number]:not(.browser-default):focus.valid ~ label,\n  input[type=search]:not(.browser-default):focus.valid ~ label,\n  textarea.materialize-textarea:focus.valid ~ label {\n    color: #4CAF50; }\n  input:not([type]):focus.invalid ~ label,\n  input[type=text]:not(.browser-default):focus.invalid ~ label,\n  input[type=password]:not(.browser-default):focus.invalid ~ label,\n  input[type=email]:not(.browser-default):focus.invalid ~ label,\n  input[type=url]:not(.browser-default):focus.invalid ~ label,\n  input[type=time]:not(.browser-default):focus.invalid ~ label,\n  input[type=date]:not(.browser-default):focus.invalid ~ label,\n  input[type=datetime]:not(.browser-default):focus.invalid ~ label,\n  input[type=datetime-local]:not(.browser-default):focus.invalid ~ label,\n  input[type=tel]:not(.browser-default):focus.invalid ~ label,\n  input[type=number]:not(.browser-default):focus.invalid ~ label,\n  input[type=search]:not(.browser-default):focus.invalid ~ label,\n  textarea.materialize-textarea:focus.invalid ~ label {\n    color: #F44336; }\n  input:not([type]).validate + label,\n  input[type=text]:not(.browser-default).validate + label,\n  input[type=password]:not(.browser-default).validate + label,\n  input[type=email]:not(.browser-default).validate + label,\n  input[type=url]:not(.browser-default).validate + label,\n  input[type=time]:not(.browser-default).validate + label,\n  input[type=date]:not(.browser-default).validate + label,\n  input[type=datetime]:not(.browser-default).validate + label,\n  input[type=datetime-local]:not(.browser-default).validate + label,\n  input[type=tel]:not(.browser-default).validate + label,\n  input[type=number]:not(.browser-default).validate + label,\n  input[type=search]:not(.browser-default).validate + label,\n  textarea.materialize-textarea.validate + label {\n    width: 100%; }\n\n/* Validation Sass Placeholders */\ninput.valid:not([type]), input.valid:not([type]):focus,\ninput.valid[type=text]:not(.browser-default),\ninput.valid[type=text]:not(.browser-default):focus,\ninput.valid[type=password]:not(.browser-default),\ninput.valid[type=password]:not(.browser-default):focus,\ninput.valid[type=email]:not(.browser-default),\ninput.valid[type=email]:not(.browser-default):focus,\ninput.valid[type=url]:not(.browser-default),\ninput.valid[type=url]:not(.browser-default):focus,\ninput.valid[type=time]:not(.browser-default),\ninput.valid[type=time]:not(.browser-default):focus,\ninput.valid[type=date]:not(.browser-default),\ninput.valid[type=date]:not(.browser-default):focus,\ninput.valid[type=datetime]:not(.browser-default),\ninput.valid[type=datetime]:not(.browser-default):focus,\ninput.valid[type=datetime-local]:not(.browser-default),\ninput.valid[type=datetime-local]:not(.browser-default):focus,\ninput.valid[type=tel]:not(.browser-default),\ninput.valid[type=tel]:not(.browser-default):focus,\ninput.valid[type=number]:not(.browser-default),\ninput.valid[type=number]:not(.browser-default):focus,\ninput.valid[type=search]:not(.browser-default),\ninput.valid[type=search]:not(.browser-default):focus,\ntextarea.materialize-textarea.valid,\ntextarea.materialize-textarea.valid:focus, .select-wrapper.valid > input.select-dropdown {\n  border-bottom: 1px solid #4CAF50;\n  box-shadow: 0 1px 0 0 #4CAF50; }\n\ninput.invalid:not([type]), input.invalid:not([type]):focus,\ninput.invalid[type=text]:not(.browser-default),\ninput.invalid[type=text]:not(.browser-default):focus,\ninput.invalid[type=password]:not(.browser-default),\ninput.invalid[type=password]:not(.browser-default):focus,\ninput.invalid[type=email]:not(.browser-default),\ninput.invalid[type=email]:not(.browser-default):focus,\ninput.invalid[type=url]:not(.browser-default),\ninput.invalid[type=url]:not(.browser-default):focus,\ninput.invalid[type=time]:not(.browser-default),\ninput.invalid[type=time]:not(.browser-default):focus,\ninput.invalid[type=date]:not(.browser-default),\ninput.invalid[type=date]:not(.browser-default):focus,\ninput.invalid[type=datetime]:not(.browser-default),\ninput.invalid[type=datetime]:not(.browser-default):focus,\ninput.invalid[type=datetime-local]:not(.browser-default),\ninput.invalid[type=datetime-local]:not(.browser-default):focus,\ninput.invalid[type=tel]:not(.browser-default),\ninput.invalid[type=tel]:not(.browser-default):focus,\ninput.invalid[type=number]:not(.browser-default),\ninput.invalid[type=number]:not(.browser-default):focus,\ninput.invalid[type=search]:not(.browser-default),\ninput.invalid[type=search]:not(.browser-default):focus,\ntextarea.materialize-textarea.invalid,\ntextarea.materialize-textarea.invalid:focus, .select-wrapper.invalid > input.select-dropdown,\n.select-wrapper.invalid > input.select-dropdown:focus {\n  border-bottom: 1px solid #F44336;\n  box-shadow: 0 1px 0 0 #F44336; }\n\ninput:not([type]).valid ~ .helper-text[data-success],\ninput:not([type]):focus.valid ~ .helper-text[data-success],\ninput:not([type]).invalid ~ .helper-text[data-error],\ninput:not([type]):focus.invalid ~ .helper-text[data-error],\ninput[type=text]:not(.browser-default).valid ~ .helper-text[data-success],\ninput[type=text]:not(.browser-default):focus.valid ~ .helper-text[data-success],\ninput[type=text]:not(.browser-default).invalid ~ .helper-text[data-error],\ninput[type=text]:not(.browser-default):focus.invalid ~ .helper-text[data-error],\ninput[type=password]:not(.browser-default).valid ~ .helper-text[data-success],\ninput[type=password]:not(.browser-default):focus.valid ~ .helper-text[data-success],\ninput[type=password]:not(.browser-default).invalid ~ .helper-text[data-error],\ninput[type=password]:not(.browser-default):focus.invalid ~ .helper-text[data-error],\ninput[type=email]:not(.browser-default).valid ~ .helper-text[data-success],\ninput[type=email]:not(.browser-default):focus.valid ~ .helper-text[data-success],\ninput[type=email]:not(.browser-default).invalid ~ .helper-text[data-error],\ninput[type=email]:not(.browser-default):focus.invalid ~ .helper-text[data-error],\ninput[type=url]:not(.browser-default).valid ~ .helper-text[data-success],\ninput[type=url]:not(.browser-default):focus.valid ~ .helper-text[data-success],\ninput[type=url]:not(.browser-default).invalid ~ .helper-text[data-error],\ninput[type=url]:not(.browser-default):focus.invalid ~ .helper-text[data-error],\ninput[type=time]:not(.browser-default).valid ~ .helper-text[data-success],\ninput[type=time]:not(.browser-default):focus.valid ~ .helper-text[data-success],\ninput[type=time]:not(.browser-default).invalid ~ .helper-text[data-error],\ninput[type=time]:not(.browser-default):focus.invalid ~ .helper-text[data-error],\ninput[type=date]:not(.browser-default).valid ~ .helper-text[data-success],\ninput[type=date]:not(.browser-default):focus.valid ~ .helper-text[data-success],\ninput[type=date]:not(.browser-default).invalid ~ .helper-text[data-error],\ninput[type=date]:not(.browser-default):focus.invalid ~ .helper-text[data-error],\ninput[type=datetime]:not(.browser-default).valid ~ .helper-text[data-success],\ninput[type=datetime]:not(.browser-default):focus.valid ~ .helper-text[data-success],\ninput[type=datetime]:not(.browser-default).invalid ~ .helper-text[data-error],\ninput[type=datetime]:not(.browser-default):focus.invalid ~ .helper-text[data-error],\ninput[type=datetime-local]:not(.browser-default).valid ~ .helper-text[data-success],\ninput[type=datetime-local]:not(.browser-default):focus.valid ~ .helper-text[data-success],\ninput[type=datetime-local]:not(.browser-default).invalid ~ .helper-text[data-error],\ninput[type=datetime-local]:not(.browser-default):focus.invalid ~ .helper-text[data-error],\ninput[type=tel]:not(.browser-default).valid ~ .helper-text[data-success],\ninput[type=tel]:not(.browser-default):focus.valid ~ .helper-text[data-success],\ninput[type=tel]:not(.browser-default).invalid ~ .helper-text[data-error],\ninput[type=tel]:not(.browser-default):focus.invalid ~ .helper-text[data-error],\ninput[type=number]:not(.browser-default).valid ~ .helper-text[data-success],\ninput[type=number]:not(.browser-default):focus.valid ~ .helper-text[data-success],\ninput[type=number]:not(.browser-default).invalid ~ .helper-text[data-error],\ninput[type=number]:not(.browser-default):focus.invalid ~ .helper-text[data-error],\ninput[type=search]:not(.browser-default).valid ~ .helper-text[data-success],\ninput[type=search]:not(.browser-default):focus.valid ~ .helper-text[data-success],\ninput[type=search]:not(.browser-default).invalid ~ .helper-text[data-error],\ninput[type=search]:not(.browser-default):focus.invalid ~ .helper-text[data-error],\ntextarea.materialize-textarea.valid ~ .helper-text[data-success],\ntextarea.materialize-textarea:focus.valid ~ .helper-text[data-success],\ntextarea.materialize-textarea.invalid ~ .helper-text[data-error],\ntextarea.materialize-textarea:focus.invalid ~ .helper-text[data-error], .select-wrapper.valid .helper-text[data-success],\n.select-wrapper.invalid ~ .helper-text[data-error] {\n  color: transparent;\n  user-select: none;\n  pointer-events: none; }\n\ninput:not([type]).valid ~ .helper-text:after,\ninput:not([type]):focus.valid ~ .helper-text:after,\ninput[type=text]:not(.browser-default).valid ~ .helper-text:after,\ninput[type=text]:not(.browser-default):focus.valid ~ .helper-text:after,\ninput[type=password]:not(.browser-default).valid ~ .helper-text:after,\ninput[type=password]:not(.browser-default):focus.valid ~ .helper-text:after,\ninput[type=email]:not(.browser-default).valid ~ .helper-text:after,\ninput[type=email]:not(.browser-default):focus.valid ~ .helper-text:after,\ninput[type=url]:not(.browser-default).valid ~ .helper-text:after,\ninput[type=url]:not(.browser-default):focus.valid ~ .helper-text:after,\ninput[type=time]:not(.browser-default).valid ~ .helper-text:after,\ninput[type=time]:not(.browser-default):focus.valid ~ .helper-text:after,\ninput[type=date]:not(.browser-default).valid ~ .helper-text:after,\ninput[type=date]:not(.browser-default):focus.valid ~ .helper-text:after,\ninput[type=datetime]:not(.browser-default).valid ~ .helper-text:after,\ninput[type=datetime]:not(.browser-default):focus.valid ~ .helper-text:after,\ninput[type=datetime-local]:not(.browser-default).valid ~ .helper-text:after,\ninput[type=datetime-local]:not(.browser-default):focus.valid ~ .helper-text:after,\ninput[type=tel]:not(.browser-default).valid ~ .helper-text:after,\ninput[type=tel]:not(.browser-default):focus.valid ~ .helper-text:after,\ninput[type=number]:not(.browser-default).valid ~ .helper-text:after,\ninput[type=number]:not(.browser-default):focus.valid ~ .helper-text:after,\ninput[type=search]:not(.browser-default).valid ~ .helper-text:after,\ninput[type=search]:not(.browser-default):focus.valid ~ .helper-text:after,\ntextarea.materialize-textarea.valid ~ .helper-text:after,\ntextarea.materialize-textarea:focus.valid ~ .helper-text:after, .select-wrapper.valid ~ .helper-text:after {\n  content: attr(data-success);\n  color: #4CAF50; }\n\ninput:not([type]).invalid ~ .helper-text:after,\ninput:not([type]):focus.invalid ~ .helper-text:after,\ninput[type=text]:not(.browser-default).invalid ~ .helper-text:after,\ninput[type=text]:not(.browser-default):focus.invalid ~ .helper-text:after,\ninput[type=password]:not(.browser-default).invalid ~ .helper-text:after,\ninput[type=password]:not(.browser-default):focus.invalid ~ .helper-text:after,\ninput[type=email]:not(.browser-default).invalid ~ .helper-text:after,\ninput[type=email]:not(.browser-default):focus.invalid ~ .helper-text:after,\ninput[type=url]:not(.browser-default).invalid ~ .helper-text:after,\ninput[type=url]:not(.browser-default):focus.invalid ~ .helper-text:after,\ninput[type=time]:not(.browser-default).invalid ~ .helper-text:after,\ninput[type=time]:not(.browser-default):focus.invalid ~ .helper-text:after,\ninput[type=date]:not(.browser-default).invalid ~ .helper-text:after,\ninput[type=date]:not(.browser-default):focus.invalid ~ .helper-text:after,\ninput[type=datetime]:not(.browser-default).invalid ~ .helper-text:after,\ninput[type=datetime]:not(.browser-default):focus.invalid ~ .helper-text:after,\ninput[type=datetime-local]:not(.browser-default).invalid ~ .helper-text:after,\ninput[type=datetime-local]:not(.browser-default):focus.invalid ~ .helper-text:after,\ninput[type=tel]:not(.browser-default).invalid ~ .helper-text:after,\ninput[type=tel]:not(.browser-default):focus.invalid ~ .helper-text:after,\ninput[type=number]:not(.browser-default).invalid ~ .helper-text:after,\ninput[type=number]:not(.browser-default):focus.invalid ~ .helper-text:after,\ninput[type=search]:not(.browser-default).invalid ~ .helper-text:after,\ninput[type=search]:not(.browser-default):focus.invalid ~ .helper-text:after,\ntextarea.materialize-textarea.invalid ~ .helper-text:after,\ntextarea.materialize-textarea:focus.invalid ~ .helper-text:after, .select-wrapper.invalid ~ .helper-text:after {\n  content: attr(data-error);\n  color: #F44336; }\n\ninput:not([type]) + label:after,\ninput[type=text]:not(.browser-default) + label:after,\ninput[type=password]:not(.browser-default) + label:after,\ninput[type=email]:not(.browser-default) + label:after,\ninput[type=url]:not(.browser-default) + label:after,\ninput[type=time]:not(.browser-default) + label:after,\ninput[type=date]:not(.browser-default) + label:after,\ninput[type=datetime]:not(.browser-default) + label:after,\ninput[type=datetime-local]:not(.browser-default) + label:after,\ninput[type=tel]:not(.browser-default) + label:after,\ninput[type=number]:not(.browser-default) + label:after,\ninput[type=search]:not(.browser-default) + label:after,\ntextarea.materialize-textarea + label:after, .select-wrapper + label:after {\n  display: block;\n  content: \"\";\n  position: absolute;\n  top: 100%;\n  left: 0;\n  opacity: 0;\n  transition: .2s opacity ease-out, .2s color ease-out; }\n\n.input-field {\n  position: relative;\n  margin-top: 1rem;\n  margin-bottom: 1rem; }\n  .input-field.inline {\n    display: inline-block;\n    vertical-align: middle;\n    margin-left: 5px; }\n    .input-field.inline input,\n    .input-field.inline .select-dropdown {\n      margin-bottom: 1rem; }\n  .input-field.col label {\n    left: 0.75rem; }\n  .input-field.col .prefix ~ label,\n  .input-field.col .prefix ~ .validate ~ label {\n    width: calc(100% - 3rem - 1.5rem); }\n  .input-field > label {\n    color: #9e9e9e;\n    position: absolute;\n    top: 0;\n    left: 0;\n    font-size: 1rem;\n    cursor: text;\n    transition: transform .2s ease-out, color .2s ease-out;\n    transform-origin: 0% 100%;\n    text-align: initial;\n    transform: translateY(12px); }\n    .input-field > label:not(.label-icon).active {\n      transform: translateY(-14px) scale(0.8);\n      transform-origin: 0 0; }\n  .input-field > input[type]:-webkit-autofill:not(.browser-default):not([type=\"search\"]) + label,\n  .input-field > input[type=date]:not(.browser-default) + label,\n  .input-field > input[type=time]:not(.browser-default) + label {\n    transform: translateY(-14px) scale(0.8);\n    transform-origin: 0 0; }\n  .input-field .helper-text {\n    position: relative;\n    min-height: 18px;\n    display: block;\n    font-size: 12px;\n    color: rgba(0, 0, 0, 0.54); }\n    .input-field .helper-text::after {\n      opacity: 1;\n      position: absolute;\n      top: 0;\n      left: 0; }\n  .input-field .prefix {\n    position: absolute;\n    width: 3rem;\n    font-size: 2rem;\n    transition: color .2s;\n    top: 0.5rem; }\n    .input-field .prefix.active {\n      color: #26a69a; }\n  .input-field .prefix ~ input,\n  .input-field .prefix ~ textarea,\n  .input-field .prefix ~ label,\n  .input-field .prefix ~ .validate ~ label,\n  .input-field .prefix ~ .helper-text,\n  .input-field .prefix ~ .autocomplete-content {\n    margin-left: 3rem;\n    width: 92%;\n    width: calc(100% - 3rem); }\n  .input-field .prefix ~ label {\n    margin-left: 3rem; }\n  @media only screen and (max-width: 992px) {\n    .input-field .prefix ~ input {\n      width: 86%;\n      width: calc(100% - 3rem); } }\n  @media only screen and (max-width: 600px) {\n    .input-field .prefix ~ input {\n      width: 80%;\n      width: calc(100% - 3rem); } }\n\n/* Search Field */\n.input-field input[type=search] {\n  display: block;\n  line-height: inherit;\n  transition: .3s background-color; }\n  .nav-wrapper .input-field input[type=search] {\n    height: inherit;\n    padding-left: 4rem;\n    width: calc(100% - 4rem);\n    border: 0;\n    box-shadow: none; }\n  .input-field input[type=search]:focus:not(.browser-default) {\n    background-color: #fff;\n    border: 0;\n    box-shadow: none;\n    color: #444; }\n    .input-field input[type=search]:focus:not(.browser-default) + label i,\n    .input-field input[type=search]:focus:not(.browser-default) ~ .mdi-navigation-close,\n    .input-field input[type=search]:focus:not(.browser-default) ~ .material-icons {\n      color: #444; }\n  .input-field input[type=search] + .label-icon {\n    transform: none;\n    left: 1rem; }\n  .input-field input[type=search] ~ .mdi-navigation-close,\n  .input-field input[type=search] ~ .material-icons {\n    position: absolute;\n    top: 0;\n    right: 1rem;\n    color: transparent;\n    cursor: pointer;\n    font-size: 2rem;\n    transition: .3s color; }\n\n/* Textarea */\ntextarea {\n  width: 100%;\n  height: 3rem;\n  background-color: transparent; }\n  textarea.materialize-textarea {\n    line-height: normal;\n    overflow-y: hidden;\n    /* prevents scroll bar flash */\n    padding: .8rem 0 .8rem 0;\n    /* prevents text jump on Enter keypress */\n    resize: none;\n    min-height: 3rem;\n    box-sizing: border-box; }\n\n.hiddendiv {\n  visibility: hidden;\n  white-space: pre-wrap;\n  word-wrap: break-word;\n  overflow-wrap: break-word;\n  /* future version of deprecated 'word-wrap' */\n  padding-top: 1.2rem;\n  /* prevents text jump on Enter keypress */\n  position: absolute;\n  top: 0;\n  z-index: -1; }\n\n/* Autocomplete */\n.autocomplete-content li .highlight {\n  color: #444; }\n\n.autocomplete-content li img {\n  height: 40px;\n  width: 40px;\n  margin: 5px 15px; }\n\n/* Character Counter */\n.character-counter {\n  min-height: 18px; }\n\n/* Radio Buttons\n   ========================================================================== */\n[type=\"radio\"]:not(:checked),\n[type=\"radio\"]:checked {\n  position: absolute;\n  opacity: 0;\n  pointer-events: none; }\n\n[type=\"radio\"]:not(:checked) + span,\n[type=\"radio\"]:checked + span {\n  position: relative;\n  padding-left: 35px;\n  cursor: pointer;\n  display: inline-block;\n  height: 25px;\n  line-height: 25px;\n  font-size: 1rem;\n  transition: .28s ease;\n  user-select: none; }\n\n[type=\"radio\"] + span:before,\n[type=\"radio\"] + span:after {\n  content: '';\n  position: absolute;\n  left: 0;\n  top: 0;\n  margin: 4px;\n  width: 16px;\n  height: 16px;\n  z-index: 0;\n  transition: .28s ease; }\n\n/* Unchecked styles */\n[type=\"radio\"]:not(:checked) + span:before,\n[type=\"radio\"]:not(:checked) + span:after,\n[type=\"radio\"]:checked + span:before,\n[type=\"radio\"]:checked + span:after,\n[type=\"radio\"].with-gap:checked + span:before,\n[type=\"radio\"].with-gap:checked + span:after {\n  border-radius: 50%; }\n\n[type=\"radio\"]:not(:checked) + span:before,\n[type=\"radio\"]:not(:checked) + span:after {\n  border: 2px solid #5a5a5a; }\n\n[type=\"radio\"]:not(:checked) + span:after {\n  transform: scale(0); }\n\n/* Checked styles */\n[type=\"radio\"]:checked + span:before {\n  border: 2px solid transparent; }\n\n[type=\"radio\"]:checked + span:after,\n[type=\"radio\"].with-gap:checked + span:before,\n[type=\"radio\"].with-gap:checked + span:after {\n  border: 2px solid #26a69a; }\n\n[type=\"radio\"]:checked + span:after,\n[type=\"radio\"].with-gap:checked + span:after {\n  background-color: #26a69a; }\n\n[type=\"radio\"]:checked + span:after {\n  transform: scale(1.02); }\n\n/* Radio With gap */\n[type=\"radio\"].with-gap:checked + span:after {\n  transform: scale(0.5); }\n\n/* Focused styles */\n[type=\"radio\"].tabbed:focus + span:before {\n  box-shadow: 0 0 0 10px rgba(0, 0, 0, 0.1); }\n\n/* Disabled Radio With gap */\n[type=\"radio\"].with-gap:disabled:checked + span:before {\n  border: 2px solid rgba(0, 0, 0, 0.42); }\n\n[type=\"radio\"].with-gap:disabled:checked + span:after {\n  border: none;\n  background-color: rgba(0, 0, 0, 0.42); }\n\n/* Disabled style */\n[type=\"radio\"]:disabled:not(:checked) + span:before,\n[type=\"radio\"]:disabled:checked + span:before {\n  background-color: transparent;\n  border-color: rgba(0, 0, 0, 0.42); }\n\n[type=\"radio\"]:disabled + span {\n  color: rgba(0, 0, 0, 0.42); }\n\n[type=\"radio\"]:disabled:not(:checked) + span:before {\n  border-color: rgba(0, 0, 0, 0.42); }\n\n[type=\"radio\"]:disabled:checked + span:after {\n  background-color: rgba(0, 0, 0, 0.42);\n  border-color: #949494; }\n\n/* Checkboxes\n   ========================================================================== */\n/* Remove default checkbox */\n[type=\"checkbox\"]:not(:checked),\n[type=\"checkbox\"]:checked {\n  position: absolute;\n  opacity: 0;\n  pointer-events: none; }\n\n[type=\"checkbox\"] {\n  /* checkbox aspect */ }\n  [type=\"checkbox\"] + span:not(.lever) {\n    position: relative;\n    padding-left: 35px;\n    cursor: pointer;\n    display: inline-block;\n    height: 25px;\n    line-height: 25px;\n    font-size: 1rem;\n    user-select: none; }\n  [type=\"checkbox\"] + span:not(.lever):before,\n  [type=\"checkbox\"]:not(.filled-in) + span:not(.lever):after {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 18px;\n    height: 18px;\n    z-index: 0;\n    border: 2px solid #5a5a5a;\n    border-radius: 1px;\n    margin-top: 3px;\n    transition: .2s; }\n  [type=\"checkbox\"]:not(.filled-in) + span:not(.lever):after {\n    border: 0;\n    transform: scale(0); }\n  [type=\"checkbox\"]:not(:checked):disabled + span:not(.lever):before {\n    border: none;\n    background-color: rgba(0, 0, 0, 0.42); }\n  [type=\"checkbox\"].tabbed:focus + span:not(.lever):after {\n    transform: scale(1);\n    border: 0;\n    border-radius: 50%;\n    box-shadow: 0 0 0 10px rgba(0, 0, 0, 0.1);\n    background-color: rgba(0, 0, 0, 0.1); }\n\n[type=\"checkbox\"]:checked + span:not(.lever):before {\n  top: -4px;\n  left: -5px;\n  width: 12px;\n  height: 22px;\n  border-top: 2px solid transparent;\n  border-left: 2px solid transparent;\n  border-right: 2px solid #26a69a;\n  border-bottom: 2px solid #26a69a;\n  transform: rotate(40deg);\n  backface-visibility: hidden;\n  transform-origin: 100% 100%; }\n\n[type=\"checkbox\"]:checked:disabled + span:before {\n  border-right: 2px solid rgba(0, 0, 0, 0.42);\n  border-bottom: 2px solid rgba(0, 0, 0, 0.42); }\n\n/* Indeterminate checkbox */\n[type=\"checkbox\"]:indeterminate + span:not(.lever):before {\n  top: -11px;\n  left: -12px;\n  width: 10px;\n  height: 22px;\n  border-top: none;\n  border-left: none;\n  border-right: 2px solid #26a69a;\n  border-bottom: none;\n  transform: rotate(90deg);\n  backface-visibility: hidden;\n  transform-origin: 100% 100%; }\n\n[type=\"checkbox\"]:indeterminate:disabled + span:not(.lever):before {\n  border-right: 2px solid rgba(0, 0, 0, 0.42);\n  background-color: transparent; }\n\n[type=\"checkbox\"].filled-in + span:not(.lever):after {\n  border-radius: 2px; }\n\n[type=\"checkbox\"].filled-in + span:not(.lever):before,\n[type=\"checkbox\"].filled-in + span:not(.lever):after {\n  content: '';\n  left: 0;\n  position: absolute;\n  /* .1s delay is for check animation */\n  transition: border .25s, background-color .25s, width .20s .1s, height .20s .1s, top .20s .1s, left .20s .1s;\n  z-index: 1; }\n\n[type=\"checkbox\"].filled-in:not(:checked) + span:not(.lever):before {\n  width: 0;\n  height: 0;\n  border: 3px solid transparent;\n  left: 6px;\n  top: 10px;\n  transform: rotateZ(37deg);\n  transform-origin: 100% 100%; }\n\n[type=\"checkbox\"].filled-in:not(:checked) + span:not(.lever):after {\n  height: 20px;\n  width: 20px;\n  background-color: transparent;\n  border: 2px solid #5a5a5a;\n  top: 0px;\n  z-index: 0; }\n\n[type=\"checkbox\"].filled-in:checked + span:not(.lever):before {\n  top: 0;\n  left: 1px;\n  width: 8px;\n  height: 13px;\n  border-top: 2px solid transparent;\n  border-left: 2px solid transparent;\n  border-right: 2px solid #fff;\n  border-bottom: 2px solid #fff;\n  transform: rotateZ(37deg);\n  transform-origin: 100% 100%; }\n\n[type=\"checkbox\"].filled-in:checked + span:not(.lever):after {\n  top: 0;\n  width: 20px;\n  height: 20px;\n  border: 2px solid #26a69a;\n  background-color: #26a69a;\n  z-index: 0; }\n\n[type=\"checkbox\"].filled-in.tabbed:focus + span:not(.lever):after {\n  border-radius: 2px;\n  border-color: #5a5a5a;\n  background-color: rgba(0, 0, 0, 0.1); }\n\n[type=\"checkbox\"].filled-in.tabbed:checked:focus + span:not(.lever):after {\n  border-radius: 2px;\n  background-color: #26a69a;\n  border-color: #26a69a; }\n\n[type=\"checkbox\"].filled-in:disabled:not(:checked) + span:not(.lever):before {\n  background-color: transparent;\n  border: 2px solid transparent; }\n\n[type=\"checkbox\"].filled-in:disabled:not(:checked) + span:not(.lever):after {\n  border-color: transparent;\n  background-color: #949494; }\n\n[type=\"checkbox\"].filled-in:disabled:checked + span:not(.lever):before {\n  background-color: transparent; }\n\n[type=\"checkbox\"].filled-in:disabled:checked + span:not(.lever):after {\n  background-color: #949494;\n  border-color: #949494; }\n\n/* Switch\n   ========================================================================== */\n.switch,\n.switch * {\n  -webkit-tap-highlight-color: transparent;\n  user-select: none; }\n\n.switch label {\n  cursor: pointer; }\n\n.switch label input[type=checkbox] {\n  opacity: 0;\n  width: 0;\n  height: 0; }\n  .switch label input[type=checkbox]:checked + .lever {\n    background-color: #84c7c1; }\n    .switch label input[type=checkbox]:checked + .lever:before, .switch label input[type=checkbox]:checked + .lever:after {\n      left: 18px; }\n    .switch label input[type=checkbox]:checked + .lever:after {\n      background-color: #26a69a; }\n\n.switch label .lever {\n  content: \"\";\n  display: inline-block;\n  position: relative;\n  width: 36px;\n  height: 14px;\n  background-color: rgba(0, 0, 0, 0.38);\n  border-radius: 15px;\n  margin-right: 10px;\n  transition: background 0.3s ease;\n  vertical-align: middle;\n  margin: 0 16px; }\n  .switch label .lever:before, .switch label .lever:after {\n    content: \"\";\n    position: absolute;\n    display: inline-block;\n    width: 20px;\n    height: 20px;\n    border-radius: 50%;\n    left: 0;\n    top: -3px;\n    transition: left 0.3s ease, background .3s ease, box-shadow 0.1s ease, transform .1s ease; }\n  .switch label .lever:before {\n    background-color: rgba(38, 166, 154, 0.15); }\n  .switch label .lever:after {\n    background-color: #F1F1F1;\n    box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12); }\n\ninput[type=checkbox]:checked:not(:disabled) ~ .lever:active::before,\ninput[type=checkbox]:checked:not(:disabled).tabbed:focus ~ .lever::before {\n  transform: scale(2.4);\n  background-color: rgba(38, 166, 154, 0.15); }\n\ninput[type=checkbox]:not(:disabled) ~ .lever:active:before,\ninput[type=checkbox]:not(:disabled).tabbed:focus ~ .lever::before {\n  transform: scale(2.4);\n  background-color: rgba(0, 0, 0, 0.08); }\n\n.switch input[type=checkbox][disabled] + .lever {\n  cursor: default;\n  background-color: rgba(0, 0, 0, 0.12); }\n\n.switch label input[type=checkbox][disabled] + .lever:after,\n.switch label input[type=checkbox][disabled]:checked + .lever:after {\n  background-color: #949494; }\n\n/* Select Field\n   ========================================================================== */\nselect {\n  display: none; }\n\nselect.browser-default {\n  display: block; }\n\nselect {\n  background-color: rgba(255, 255, 255, 0.9);\n  width: 100%;\n  padding: 5px;\n  border: 1px solid #f2f2f2;\n  border-radius: 2px;\n  height: 3rem; }\n\n.select-label {\n  position: absolute; }\n\n.select-wrapper {\n  position: relative; }\n  .select-wrapper.valid + label,\n  .select-wrapper.invalid + label {\n    width: 100%;\n    pointer-events: none; }\n  .select-wrapper input.select-dropdown {\n    position: relative;\n    cursor: pointer;\n    background-color: transparent;\n    border: none;\n    border-bottom: 1px solid #9e9e9e;\n    outline: none;\n    height: 3rem;\n    line-height: 3rem;\n    width: 100%;\n    font-size: 16px;\n    margin: 0 0 8px 0;\n    padding: 0;\n    display: block;\n    user-select: none;\n    z-index: 1; }\n    .select-wrapper input.select-dropdown:focus {\n      border-bottom: 1px solid #26a69a; }\n  .select-wrapper .caret {\n    position: absolute;\n    right: 0;\n    top: 0;\n    bottom: 0;\n    margin: auto 0;\n    z-index: 0;\n    fill: rgba(0, 0, 0, 0.87); }\n  .select-wrapper + label {\n    position: absolute;\n    top: -26px;\n    font-size: 0.8rem; }\n\nselect:disabled {\n  color: rgba(0, 0, 0, 0.42); }\n\n.select-wrapper.disabled + label {\n  color: rgba(0, 0, 0, 0.42); }\n\n.select-wrapper.disabled .caret {\n  fill: rgba(0, 0, 0, 0.42); }\n\n.select-wrapper input.select-dropdown:disabled {\n  color: rgba(0, 0, 0, 0.42);\n  cursor: default;\n  user-select: none; }\n\n.select-wrapper i {\n  color: rgba(0, 0, 0, 0.3); }\n\n.select-dropdown li.disabled,\n.select-dropdown li.disabled > span,\n.select-dropdown li.optgroup {\n  color: rgba(0, 0, 0, 0.3);\n  background-color: transparent; }\n\nbody.keyboard-focused .select-dropdown.dropdown-content li:focus {\n  background-color: rgba(0, 0, 0, 0.08); }\n\n.select-dropdown.dropdown-content li:hover {\n  background-color: rgba(0, 0, 0, 0.08); }\n\n.select-dropdown.dropdown-content li.selected {\n  background-color: rgba(0, 0, 0, 0.03); }\n\n.prefix ~ .select-wrapper {\n  margin-left: 3rem;\n  width: 92%;\n  width: calc(100% - 3rem); }\n\n.prefix ~ label {\n  margin-left: 3rem; }\n\n.select-dropdown li img {\n  height: 40px;\n  width: 40px;\n  margin: 5px 15px;\n  float: right; }\n\n.select-dropdown li.optgroup {\n  border-top: 1px solid #eee; }\n  .select-dropdown li.optgroup.selected > span {\n    color: rgba(0, 0, 0, 0.7); }\n  .select-dropdown li.optgroup > span {\n    color: rgba(0, 0, 0, 0.4); }\n  .select-dropdown li.optgroup ~ li.optgroup-option {\n    padding-left: 1rem; }\n\n/* File Input\n   ========================================================================== */\n.file-field {\n  position: relative; }\n  .file-field .file-path-wrapper {\n    overflow: hidden;\n    padding-left: 10px; }\n  .file-field input.file-path {\n    width: 100%; }\n  .file-field .btn, .file-field .btn-large, .file-field .btn-small {\n    float: left;\n    height: 3rem;\n    line-height: 3rem; }\n  .file-field span {\n    cursor: pointer; }\n  .file-field input[type=file] {\n    position: absolute;\n    top: 0;\n    right: 0;\n    left: 0;\n    bottom: 0;\n    width: 100%;\n    margin: 0;\n    padding: 0;\n    font-size: 20px;\n    cursor: pointer;\n    opacity: 0;\n    filter: alpha(opacity=0); }\n    .file-field input[type=file]::-webkit-file-upload-button {\n      display: none; }\n\n/* Range\n   ========================================================================== */\n.range-field {\n  position: relative; }\n\ninput[type=range],\ninput[type=range] + .thumb {\n  cursor: pointer; }\n\ninput[type=range] {\n  position: relative;\n  background-color: transparent;\n  border: none;\n  outline: none;\n  width: 100%;\n  margin: 15px 0;\n  padding: 0; }\n  input[type=range]:focus {\n    outline: none; }\n\ninput[type=range] + .thumb {\n  position: absolute;\n  top: 10px;\n  left: 0;\n  border: none;\n  height: 0;\n  width: 0;\n  border-radius: 50%;\n  background-color: #26a69a;\n  margin-left: 7px;\n  transform-origin: 50% 50%;\n  transform: rotate(-45deg); }\n  input[type=range] + .thumb .value {\n    display: block;\n    width: 30px;\n    text-align: center;\n    color: #26a69a;\n    font-size: 0;\n    transform: rotate(45deg); }\n  input[type=range] + .thumb.active {\n    border-radius: 50% 50% 50% 0; }\n    input[type=range] + .thumb.active .value {\n      color: #fff;\n      margin-left: -1px;\n      margin-top: 8px;\n      font-size: 10px; }\n\ninput[type=range] {\n  -webkit-appearance: none; }\n\ninput[type=range]::-webkit-slider-runnable-track {\n  height: 3px;\n  background: #c2c0c2;\n  border: none; }\n\ninput[type=range]::-webkit-slider-thumb {\n  border: none;\n  height: 14px;\n  width: 14px;\n  border-radius: 50%;\n  background: #26a69a;\n  transition: box-shadow .3s;\n  -webkit-appearance: none;\n  background-color: #26a69a;\n  transform-origin: 50% 50%;\n  margin: -5px 0 0 0; }\n\n.keyboard-focused input[type=range]:focus:not(.active)::-webkit-slider-thumb {\n  box-shadow: 0 0 0 10px rgba(38, 166, 154, 0.26); }\n\ninput[type=range] {\n  /* fix for FF unable to apply focus style bug  */\n  border: 1px solid white;\n  /*required for proper track sizing in FF*/ }\n\ninput[type=range]::-moz-range-track {\n  height: 3px;\n  background: #c2c0c2;\n  border: none; }\n\ninput[type=range]::-moz-focus-inner {\n  border: 0; }\n\ninput[type=range]::-moz-range-thumb {\n  border: none;\n  height: 14px;\n  width: 14px;\n  border-radius: 50%;\n  background: #26a69a;\n  transition: box-shadow .3s;\n  margin-top: -5px; }\n\ninput[type=range]:-moz-focusring {\n  outline: 1px solid #fff;\n  outline-offset: -1px; }\n\n.keyboard-focused input[type=range]:focus:not(.active)::-moz-range-thumb {\n  box-shadow: 0 0 0 10px rgba(38, 166, 154, 0.26); }\n\ninput[type=range]::-ms-track {\n  height: 3px;\n  background: transparent;\n  border-color: transparent;\n  border-width: 6px 0;\n  /*remove default tick marks*/\n  color: transparent; }\n\ninput[type=range]::-ms-fill-lower {\n  background: #777; }\n\ninput[type=range]::-ms-fill-upper {\n  background: #ddd; }\n\ninput[type=range]::-ms-thumb {\n  border: none;\n  height: 14px;\n  width: 14px;\n  border-radius: 50%;\n  background: #26a69a;\n  transition: box-shadow .3s; }\n\n.keyboard-focused input[type=range]:focus:not(.active)::-ms-thumb {\n  box-shadow: 0 0 0 10px rgba(38, 166, 154, 0.26); }\n\n/***************\n    Nav List\n***************/\n.table-of-contents.fixed {\n  position: fixed; }\n\n.table-of-contents li {\n  padding: 2px 0; }\n\n.table-of-contents a {\n  display: inline-block;\n  font-weight: 300;\n  color: #757575;\n  padding-left: 16px;\n  height: 1.5rem;\n  line-height: 1.5rem;\n  letter-spacing: .4;\n  display: inline-block; }\n  .table-of-contents a:hover {\n    color: #a8a8a8;\n    padding-left: 15px;\n    border-left: 1px solid #ee6e73; }\n  .table-of-contents a.active {\n    font-weight: 500;\n    padding-left: 14px;\n    border-left: 2px solid #ee6e73; }\n\n.sidenav {\n  position: fixed;\n  width: 300px;\n  left: 0;\n  top: 0;\n  margin: 0;\n  transform: translateX(-100%);\n  height: 100%;\n  height: calc(100% + 60px);\n  height: -moz-calc(100%);\n  padding-bottom: 60px;\n  background-color: #fff;\n  z-index: 999;\n  overflow-y: auto;\n  will-change: transform;\n  backface-visibility: hidden;\n  transform: translateX(-105%); }\n  .sidenav.right-aligned {\n    right: 0;\n    transform: translateX(105%);\n    left: auto;\n    transform: translateX(100%); }\n  .sidenav .collapsible {\n    margin: 0; }\n  .sidenav li {\n    float: none;\n    line-height: 48px; }\n    .sidenav li.active {\n      background-color: rgba(0, 0, 0, 0.05); }\n  .sidenav li > a {\n    color: rgba(0, 0, 0, 0.87);\n    display: block;\n    font-size: 14px;\n    font-weight: 500;\n    height: 48px;\n    line-height: 48px;\n    padding: 0 32px; }\n    .sidenav li > a:hover {\n      background-color: rgba(0, 0, 0, 0.05); }\n    .sidenav li > a.btn, .sidenav li > a.btn-large, .sidenav li > a.btn-small, .sidenav li > a.btn-large, .sidenav li > a.btn-flat, .sidenav li > a.btn-floating {\n      margin: 10px 15px; }\n    .sidenav li > a.btn, .sidenav li > a.btn-large, .sidenav li > a.btn-small, .sidenav li > a.btn-large, .sidenav li > a.btn-floating {\n      color: #fff; }\n    .sidenav li > a.btn-flat {\n      color: #343434; }\n    .sidenav li > a.btn:hover, .sidenav li > a.btn-large:hover, .sidenav li > a.btn-small:hover, .sidenav li > a.btn-large:hover {\n      background-color: #2bbbad; }\n    .sidenav li > a.btn-floating:hover {\n      background-color: #26a69a; }\n    .sidenav li > a > i,\n    .sidenav li > a > [class^=\"mdi-\"], .sidenav li > a li > a > [class*=\"mdi-\"],\n    .sidenav li > a > i.material-icons {\n      float: left;\n      height: 48px;\n      line-height: 48px;\n      margin: 0 32px 0 0;\n      width: 24px;\n      color: rgba(0, 0, 0, 0.54); }\n  .sidenav .divider {\n    margin: 8px 0 0 0; }\n  .sidenav .subheader {\n    cursor: initial;\n    pointer-events: none;\n    color: rgba(0, 0, 0, 0.54);\n    font-size: 14px;\n    font-weight: 500;\n    line-height: 48px; }\n    .sidenav .subheader:hover {\n      background-color: transparent; }\n  .sidenav .user-view {\n    position: relative;\n    padding: 32px 32px 0;\n    margin-bottom: 8px; }\n    .sidenav .user-view > a {\n      height: auto;\n      padding: 0; }\n      .sidenav .user-view > a:hover {\n        background-color: transparent; }\n    .sidenav .user-view .background {\n      overflow: hidden;\n      position: absolute;\n      top: 0;\n      right: 0;\n      bottom: 0;\n      left: 0;\n      z-index: -1; }\n    .sidenav .user-view .circle, .sidenav .user-view .name, .sidenav .user-view .email {\n      display: block; }\n    .sidenav .user-view .circle {\n      height: 64px;\n      width: 64px; }\n    .sidenav .user-view .name,\n    .sidenav .user-view .email {\n      font-size: 14px;\n      line-height: 24px; }\n    .sidenav .user-view .name {\n      margin-top: 16px;\n      font-weight: 500; }\n    .sidenav .user-view .email {\n      padding-bottom: 16px;\n      font-weight: 400; }\n\n.drag-target {\n  height: 100%;\n  width: 10px;\n  position: fixed;\n  top: 0;\n  z-index: 998; }\n  .drag-target.right-aligned {\n    right: 0; }\n\n.sidenav.sidenav-fixed {\n  left: 0;\n  transform: translateX(0);\n  position: fixed; }\n  .sidenav.sidenav-fixed.right-aligned {\n    right: 0;\n    left: auto; }\n\n@media only screen and (max-width: 992px) {\n  .sidenav.sidenav-fixed {\n    transform: translateX(-105%); }\n    .sidenav.sidenav-fixed.right-aligned {\n      transform: translateX(105%); }\n  .sidenav > a {\n    padding: 0 16px; }\n  .sidenav .user-view {\n    padding: 16px 16px 0; } }\n\n.sidenav .collapsible-body > ul:not(.collapsible) > li.active,\n.sidenav.sidenav-fixed .collapsible-body > ul:not(.collapsible) > li.active {\n  background-color: #ee6e73; }\n  .sidenav .collapsible-body > ul:not(.collapsible) > li.active a,\n  .sidenav.sidenav-fixed .collapsible-body > ul:not(.collapsible) > li.active a {\n    color: #fff; }\n\n.sidenav .collapsible-body {\n  padding: 0; }\n\n.sidenav-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  opacity: 0;\n  height: 120vh;\n  background-color: rgba(0, 0, 0, 0.5);\n  z-index: 997;\n  display: none; }\n\n/*\n    @license\n    Copyright (c) 2014 The Polymer Project Authors. All rights reserved.\n    This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt\n    The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt\n    The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt\n    Code distributed by Google as part of the polymer project is also\n    subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt\n */\n/**************************/\n/* STYLES FOR THE SPINNER */\n/**************************/\n/*\n * Constants:\n *      STROKEWIDTH = 3px\n *      ARCSIZE     = 270 degrees (amount of circle the arc takes up)\n *      ARCTIME     = 1333ms (time it takes to expand and contract arc)\n *      ARCSTARTROT = 216 degrees (how much the start location of the arc\n *                                should rotate each time, 216 gives us a\n *                                5 pointed star shape (it's 360/5 * 3).\n *                                For a 7 pointed star, we might do\n *                                360/7 * 3 = 154.286)\n *      CONTAINERWIDTH = 28px\n *      SHRINK_TIME = 400ms\n */\n.preloader-wrapper {\n  display: inline-block;\n  position: relative;\n  width: 50px;\n  height: 50px; }\n  .preloader-wrapper.small {\n    width: 36px;\n    height: 36px; }\n  .preloader-wrapper.big {\n    width: 64px;\n    height: 64px; }\n  .preloader-wrapper.active {\n    /* duration: 360 * ARCTIME / (ARCSTARTROT + (360-ARCSIZE)) */\n    -webkit-animation: container-rotate 1568ms linear infinite;\n    animation: container-rotate 1568ms linear infinite; }\n\n@-webkit-keyframes container-rotate {\n  to {\n    -webkit-transform: rotate(360deg); } }\n\n@keyframes container-rotate {\n  to {\n    transform: rotate(360deg); } }\n\n.spinner-layer {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  opacity: 0;\n  border-color: #26a69a; }\n\n.spinner-blue,\n.spinner-blue-only {\n  border-color: #4285f4; }\n\n.spinner-red,\n.spinner-red-only {\n  border-color: #db4437; }\n\n.spinner-yellow,\n.spinner-yellow-only {\n  border-color: #f4b400; }\n\n.spinner-green,\n.spinner-green-only {\n  border-color: #0f9d58; }\n\n/**\n * IMPORTANT NOTE ABOUT CSS ANIMATION PROPERTIES (keanulee):\n *\n * iOS Safari (tested on iOS 8.1) does not handle animation-delay very well - it doesn't\n * guarantee that the animation will start _exactly_ after that value. So we avoid using\n * animation-delay and instead set custom keyframes for each color (as redundant as it\n * seems).\n *\n * We write out each animation in full (instead of separating animation-name,\n * animation-duration, etc.) because under the polyfill, Safari does not recognize those\n * specific properties properly, treats them as -webkit-animation, and overrides the\n * other animation rules. See https://github.com/Polymer/platform/issues/53.\n */\n.active .spinner-layer.spinner-blue {\n  /* durations: 4 * ARCTIME */\n  -webkit-animation: fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both, blue-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n  animation: fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both, blue-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both; }\n\n.active .spinner-layer.spinner-red {\n  /* durations: 4 * ARCTIME */\n  -webkit-animation: fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both, red-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n  animation: fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both, red-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both; }\n\n.active .spinner-layer.spinner-yellow {\n  /* durations: 4 * ARCTIME */\n  -webkit-animation: fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both, yellow-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n  animation: fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both, yellow-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both; }\n\n.active .spinner-layer.spinner-green {\n  /* durations: 4 * ARCTIME */\n  -webkit-animation: fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both, green-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n  animation: fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both, green-fade-in-out 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both; }\n\n.active .spinner-layer,\n.active .spinner-layer.spinner-blue-only,\n.active .spinner-layer.spinner-red-only,\n.active .spinner-layer.spinner-yellow-only,\n.active .spinner-layer.spinner-green-only {\n  /* durations: 4 * ARCTIME */\n  opacity: 1;\n  -webkit-animation: fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n  animation: fill-unfill-rotate 5332ms cubic-bezier(0.4, 0, 0.2, 1) infinite both; }\n\n@-webkit-keyframes fill-unfill-rotate {\n  12.5% {\n    -webkit-transform: rotate(135deg); }\n  /* 0.5 * ARCSIZE */\n  25% {\n    -webkit-transform: rotate(270deg); }\n  /* 1   * ARCSIZE */\n  37.5% {\n    -webkit-transform: rotate(405deg); }\n  /* 1.5 * ARCSIZE */\n  50% {\n    -webkit-transform: rotate(540deg); }\n  /* 2   * ARCSIZE */\n  62.5% {\n    -webkit-transform: rotate(675deg); }\n  /* 2.5 * ARCSIZE */\n  75% {\n    -webkit-transform: rotate(810deg); }\n  /* 3   * ARCSIZE */\n  87.5% {\n    -webkit-transform: rotate(945deg); }\n  /* 3.5 * ARCSIZE */\n  to {\n    -webkit-transform: rotate(1080deg); }\n  /* 4   * ARCSIZE */ }\n\n@keyframes fill-unfill-rotate {\n  12.5% {\n    transform: rotate(135deg); }\n  /* 0.5 * ARCSIZE */\n  25% {\n    transform: rotate(270deg); }\n  /* 1   * ARCSIZE */\n  37.5% {\n    transform: rotate(405deg); }\n  /* 1.5 * ARCSIZE */\n  50% {\n    transform: rotate(540deg); }\n  /* 2   * ARCSIZE */\n  62.5% {\n    transform: rotate(675deg); }\n  /* 2.5 * ARCSIZE */\n  75% {\n    transform: rotate(810deg); }\n  /* 3   * ARCSIZE */\n  87.5% {\n    transform: rotate(945deg); }\n  /* 3.5 * ARCSIZE */\n  to {\n    transform: rotate(1080deg); }\n  /* 4   * ARCSIZE */ }\n\n@-webkit-keyframes blue-fade-in-out {\n  from {\n    opacity: 1; }\n  25% {\n    opacity: 1; }\n  26% {\n    opacity: 0; }\n  89% {\n    opacity: 0; }\n  90% {\n    opacity: 1; }\n  100% {\n    opacity: 1; } }\n\n@keyframes blue-fade-in-out {\n  from {\n    opacity: 1; }\n  25% {\n    opacity: 1; }\n  26% {\n    opacity: 0; }\n  89% {\n    opacity: 0; }\n  90% {\n    opacity: 1; }\n  100% {\n    opacity: 1; } }\n\n@-webkit-keyframes red-fade-in-out {\n  from {\n    opacity: 0; }\n  15% {\n    opacity: 0; }\n  25% {\n    opacity: 1; }\n  50% {\n    opacity: 1; }\n  51% {\n    opacity: 0; } }\n\n@keyframes red-fade-in-out {\n  from {\n    opacity: 0; }\n  15% {\n    opacity: 0; }\n  25% {\n    opacity: 1; }\n  50% {\n    opacity: 1; }\n  51% {\n    opacity: 0; } }\n\n@-webkit-keyframes yellow-fade-in-out {\n  from {\n    opacity: 0; }\n  40% {\n    opacity: 0; }\n  50% {\n    opacity: 1; }\n  75% {\n    opacity: 1; }\n  76% {\n    opacity: 0; } }\n\n@keyframes yellow-fade-in-out {\n  from {\n    opacity: 0; }\n  40% {\n    opacity: 0; }\n  50% {\n    opacity: 1; }\n  75% {\n    opacity: 1; }\n  76% {\n    opacity: 0; } }\n\n@-webkit-keyframes green-fade-in-out {\n  from {\n    opacity: 0; }\n  65% {\n    opacity: 0; }\n  75% {\n    opacity: 1; }\n  90% {\n    opacity: 1; }\n  100% {\n    opacity: 0; } }\n\n@keyframes green-fade-in-out {\n  from {\n    opacity: 0; }\n  65% {\n    opacity: 0; }\n  75% {\n    opacity: 1; }\n  90% {\n    opacity: 1; }\n  100% {\n    opacity: 0; } }\n\n/**\n * Patch the gap that appear between the two adjacent div.circle-clipper while the\n * spinner is rotating (appears on Chrome 38, Safari 7.1, and IE 11).\n */\n.gap-patch {\n  position: absolute;\n  top: 0;\n  left: 45%;\n  width: 10%;\n  height: 100%;\n  overflow: hidden;\n  border-color: inherit; }\n\n.gap-patch .circle {\n  width: 1000%;\n  left: -450%; }\n\n.circle-clipper {\n  display: inline-block;\n  position: relative;\n  width: 50%;\n  height: 100%;\n  overflow: hidden;\n  border-color: inherit; }\n  .circle-clipper .circle {\n    width: 200%;\n    height: 100%;\n    border-width: 3px;\n    /* STROKEWIDTH */\n    border-style: solid;\n    border-color: inherit;\n    border-bottom-color: transparent !important;\n    border-radius: 50%;\n    -webkit-animation: none;\n    animation: none;\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0; }\n  .circle-clipper.left .circle {\n    left: 0;\n    border-right-color: transparent !important;\n    -webkit-transform: rotate(129deg);\n    transform: rotate(129deg); }\n  .circle-clipper.right .circle {\n    left: -100%;\n    border-left-color: transparent !important;\n    -webkit-transform: rotate(-129deg);\n    transform: rotate(-129deg); }\n\n.active .circle-clipper.left .circle {\n  /* duration: ARCTIME */\n  -webkit-animation: left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n  animation: left-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both; }\n\n.active .circle-clipper.right .circle {\n  /* duration: ARCTIME */\n  -webkit-animation: right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both;\n  animation: right-spin 1333ms cubic-bezier(0.4, 0, 0.2, 1) infinite both; }\n\n@-webkit-keyframes left-spin {\n  from {\n    -webkit-transform: rotate(130deg); }\n  50% {\n    -webkit-transform: rotate(-5deg); }\n  to {\n    -webkit-transform: rotate(130deg); } }\n\n@keyframes left-spin {\n  from {\n    transform: rotate(130deg); }\n  50% {\n    transform: rotate(-5deg); }\n  to {\n    transform: rotate(130deg); } }\n\n@-webkit-keyframes right-spin {\n  from {\n    -webkit-transform: rotate(-130deg); }\n  50% {\n    -webkit-transform: rotate(5deg); }\n  to {\n    -webkit-transform: rotate(-130deg); } }\n\n@keyframes right-spin {\n  from {\n    transform: rotate(-130deg); }\n  50% {\n    transform: rotate(5deg); }\n  to {\n    transform: rotate(-130deg); } }\n\n#spinnerContainer.cooldown {\n  /* duration: SHRINK_TIME */\n  -webkit-animation: container-rotate 1568ms linear infinite, fade-out 400ms cubic-bezier(0.4, 0, 0.2, 1);\n  animation: container-rotate 1568ms linear infinite, fade-out 400ms cubic-bezier(0.4, 0, 0.2, 1); }\n\n@-webkit-keyframes fade-out {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0; } }\n\n@keyframes fade-out {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0; } }\n\n.slider {\n  position: relative;\n  height: 400px;\n  width: 100%; }\n  .slider.fullscreen {\n    height: 100%;\n    width: 100%;\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0; }\n    .slider.fullscreen ul.slides {\n      height: 100%; }\n    .slider.fullscreen ul.indicators {\n      z-index: 2;\n      bottom: 30px; }\n  .slider .slides {\n    background-color: #9e9e9e;\n    margin: 0;\n    height: 400px; }\n    .slider .slides li {\n      opacity: 0;\n      position: absolute;\n      top: 0;\n      left: 0;\n      z-index: 1;\n      width: 100%;\n      height: inherit;\n      overflow: hidden; }\n      .slider .slides li img {\n        height: 100%;\n        width: 100%;\n        background-size: cover;\n        background-position: center; }\n      .slider .slides li .caption {\n        color: #fff;\n        position: absolute;\n        top: 15%;\n        left: 15%;\n        width: 70%;\n        opacity: 0; }\n        .slider .slides li .caption p {\n          color: #e0e0e0; }\n      .slider .slides li.active {\n        z-index: 2; }\n  .slider .indicators {\n    position: absolute;\n    text-align: center;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    margin: 0; }\n    .slider .indicators .indicator-item {\n      display: inline-block;\n      position: relative;\n      cursor: pointer;\n      height: 16px;\n      width: 16px;\n      margin: 0 12px;\n      background-color: #e0e0e0;\n      transition: background-color .3s;\n      border-radius: 50%; }\n      .slider .indicators .indicator-item.active {\n        background-color: #4CAF50; }\n\n.carousel {\n  overflow: hidden;\n  position: relative;\n  width: 100%;\n  height: 400px;\n  perspective: 500px;\n  transform-style: preserve-3d;\n  transform-origin: 0% 50%; }\n  .carousel.carousel-slider {\n    top: 0;\n    left: 0; }\n    .carousel.carousel-slider .carousel-fixed-item {\n      position: absolute;\n      left: 0;\n      right: 0;\n      bottom: 20px;\n      z-index: 1; }\n      .carousel.carousel-slider .carousel-fixed-item.with-indicators {\n        bottom: 68px; }\n    .carousel.carousel-slider .carousel-item {\n      width: 100%;\n      height: 100%;\n      min-height: 400px;\n      position: absolute;\n      top: 0;\n      left: 0; }\n      .carousel.carousel-slider .carousel-item h2 {\n        font-size: 24px;\n        font-weight: 500;\n        line-height: 32px; }\n      .carousel.carousel-slider .carousel-item p {\n        font-size: 15px; }\n  .carousel .carousel-item {\n    visibility: hidden;\n    width: 200px;\n    height: 200px;\n    position: absolute;\n    top: 0;\n    left: 0; }\n    .carousel .carousel-item > img {\n      width: 100%; }\n  .carousel .indicators {\n    position: absolute;\n    text-align: center;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    margin: 0; }\n    .carousel .indicators .indicator-item {\n      display: inline-block;\n      position: relative;\n      cursor: pointer;\n      height: 8px;\n      width: 8px;\n      margin: 24px 4px;\n      background-color: rgba(255, 255, 255, 0.5);\n      transition: background-color .3s;\n      border-radius: 50%; }\n      .carousel .indicators .indicator-item.active {\n        background-color: #fff; }\n  .carousel.scrolling .carousel-item .materialboxed,\n  .carousel .carousel-item:not(.active) .materialboxed {\n    pointer-events: none; }\n\n.tap-target-wrapper {\n  width: 800px;\n  height: 800px;\n  position: fixed;\n  z-index: 1000;\n  visibility: hidden;\n  transition: visibility 0s .3s; }\n\n.tap-target-wrapper.open {\n  visibility: visible;\n  transition: visibility 0s; }\n  .tap-target-wrapper.open .tap-target {\n    transform: scale(1);\n    opacity: .95;\n    transition: transform 0.3s cubic-bezier(0.42, 0, 0.58, 1), opacity 0.3s cubic-bezier(0.42, 0, 0.58, 1); }\n  .tap-target-wrapper.open .tap-target-wave::before {\n    transform: scale(1); }\n  .tap-target-wrapper.open .tap-target-wave::after {\n    visibility: visible;\n    animation: pulse-animation 1s cubic-bezier(0.24, 0, 0.38, 1) infinite;\n    transition: opacity .3s, transform .3s, visibility 0s 1s; }\n\n.tap-target {\n  position: absolute;\n  font-size: 1rem;\n  border-radius: 50%;\n  background-color: #ee6e73;\n  box-shadow: 0 20px 20px 0 rgba(0, 0, 0, 0.14), 0 10px 50px 0 rgba(0, 0, 0, 0.12), 0 30px 10px -20px rgba(0, 0, 0, 0.2);\n  width: 100%;\n  height: 100%;\n  opacity: 0;\n  transform: scale(0);\n  transition: transform 0.3s cubic-bezier(0.42, 0, 0.58, 1), opacity 0.3s cubic-bezier(0.42, 0, 0.58, 1); }\n\n.tap-target-content {\n  position: relative;\n  display: table-cell; }\n\n.tap-target-wave {\n  position: absolute;\n  border-radius: 50%;\n  z-index: 10001; }\n  .tap-target-wave::before, .tap-target-wave::after {\n    content: '';\n    display: block;\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    border-radius: 50%;\n    background-color: #ffffff; }\n  .tap-target-wave::before {\n    transform: scale(0);\n    transition: transform .3s; }\n  .tap-target-wave::after {\n    visibility: hidden;\n    transition: opacity .3s, transform .3s, visibility 0s;\n    z-index: -1; }\n\n.tap-target-origin {\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  z-index: 10002;\n  position: absolute !important; }\n  .tap-target-origin:not(.btn):not(.btn-large):not(.btn-small), .tap-target-origin:not(.btn):not(.btn-large):not(.btn-small):hover {\n    background: none; }\n\n@media only screen and (max-width: 600px) {\n  .tap-target, .tap-target-wrapper {\n    width: 600px;\n    height: 600px; } }\n\n.pulse {\n  overflow: visible;\n  position: relative; }\n  .pulse::before {\n    content: '';\n    display: block;\n    position: absolute;\n    width: 100%;\n    height: 100%;\n    top: 0;\n    left: 0;\n    background-color: inherit;\n    border-radius: inherit;\n    transition: opacity .3s, transform .3s;\n    animation: pulse-animation 1s cubic-bezier(0.24, 0, 0.38, 1) infinite;\n    z-index: -1; }\n\n@keyframes pulse-animation {\n  0% {\n    opacity: 1;\n    transform: scale(1); }\n  50% {\n    opacity: 0;\n    transform: scale(1.5); }\n  100% {\n    opacity: 0;\n    transform: scale(1.5); } }\n\n/* Modal */\n.datepicker-modal {\n  max-width: 325px;\n  min-width: 300px;\n  max-height: none; }\n\n.datepicker-container.modal-content {\n  display: flex;\n  flex-direction: column;\n  padding: 0; }\n\n.datepicker-controls {\n  display: flex;\n  justify-content: space-between;\n  width: 280px;\n  margin: 0 auto; }\n  .datepicker-controls .selects-container {\n    display: flex; }\n  .datepicker-controls .select-wrapper input {\n    border-bottom: none;\n    text-align: center;\n    margin: 0; }\n    .datepicker-controls .select-wrapper input:focus {\n      border-bottom: none; }\n  .datepicker-controls .select-wrapper .caret {\n    display: none; }\n  .datepicker-controls .select-year input {\n    width: 50px; }\n  .datepicker-controls .select-month input {\n    width: 70px; }\n\n.month-prev, .month-next {\n  margin-top: 4px;\n  cursor: pointer;\n  background-color: transparent;\n  border: none; }\n\n/* Date Display */\n.datepicker-date-display {\n  flex: 1 auto;\n  background-color: #26a69a;\n  color: #fff;\n  padding: 20px 22px;\n  font-weight: 500; }\n  .datepicker-date-display .year-text {\n    display: block;\n    font-size: 1.5rem;\n    line-height: 25px;\n    color: rgba(255, 255, 255, 0.7); }\n  .datepicker-date-display .date-text {\n    display: block;\n    font-size: 2.8rem;\n    line-height: 47px;\n    font-weight: 500; }\n\n/* Calendar */\n.datepicker-calendar-container {\n  flex: 2.5 auto; }\n\n.datepicker-table {\n  width: 280px;\n  font-size: 1rem;\n  margin: 0 auto; }\n  .datepicker-table thead {\n    border-bottom: none; }\n  .datepicker-table th {\n    padding: 10px 5px;\n    text-align: center; }\n  .datepicker-table tr {\n    border: none; }\n  .datepicker-table abbr {\n    text-decoration: none;\n    color: #999; }\n  .datepicker-table td {\n    border-radius: 50%;\n    padding: 0; }\n    .datepicker-table td.is-today {\n      color: #26a69a; }\n    .datepicker-table td.is-selected {\n      background-color: #26a69a;\n      color: #fff; }\n    .datepicker-table td.is-outside-current-month, .datepicker-table td.is-disabled {\n      color: rgba(0, 0, 0, 0.3);\n      pointer-events: none; }\n\n.datepicker-day-button {\n  background-color: transparent;\n  border: none;\n  line-height: 38px;\n  display: block;\n  width: 100%;\n  border-radius: 50%;\n  padding: 0 5px;\n  cursor: pointer;\n  color: inherit; }\n  .datepicker-day-button:focus {\n    background-color: rgba(43, 161, 150, 0.25); }\n\n/* Footer */\n.datepicker-footer {\n  width: 280px;\n  margin: 0 auto;\n  padding-bottom: 5px;\n  display: flex;\n  justify-content: space-between; }\n\n.datepicker-cancel,\n.datepicker-clear,\n.datepicker-today,\n.datepicker-done {\n  color: #26a69a;\n  padding: 0 1rem; }\n\n.datepicker-clear {\n  color: #F44336; }\n\n/* Media Queries */\n@media only screen and (min-width: 601px) {\n  .datepicker-modal {\n    max-width: 625px; }\n  .datepicker-container.modal-content {\n    flex-direction: row; }\n  .datepicker-date-display {\n    flex: 0 1 270px; }\n  .datepicker-controls,\n  .datepicker-table,\n  .datepicker-footer {\n    width: 320px; }\n  .datepicker-day-button {\n    line-height: 44px; } }\n\n/* Timepicker Containers */\n.timepicker-modal {\n  max-width: 325px;\n  max-height: none; }\n\n.timepicker-container.modal-content {\n  display: flex;\n  flex-direction: column;\n  padding: 0; }\n\n.text-primary {\n  color: white; }\n\n/* Clock Digital Display */\n.timepicker-digital-display {\n  flex: 1 auto;\n  background-color: #26a69a;\n  padding: 10px;\n  font-weight: 300; }\n\n.timepicker-text-container {\n  font-size: 4rem;\n  font-weight: bold;\n  text-align: center;\n  color: rgba(255, 255, 255, 0.6);\n  font-weight: 400;\n  position: relative;\n  user-select: none; }\n\n.timepicker-span-hours,\n.timepicker-span-minutes,\n.timepicker-span-am-pm div {\n  cursor: pointer; }\n\n.timepicker-span-hours {\n  margin-right: 3px; }\n\n.timepicker-span-minutes {\n  margin-left: 3px; }\n\n.timepicker-display-am-pm {\n  font-size: 1.3rem;\n  position: absolute;\n  right: 1rem;\n  bottom: 1rem;\n  font-weight: 400; }\n\n/* Analog Clock Display */\n.timepicker-analog-display {\n  flex: 2.5 auto; }\n\n.timepicker-plate {\n  background-color: #eee;\n  border-radius: 50%;\n  width: 270px;\n  height: 270px;\n  overflow: visible;\n  position: relative;\n  margin: auto;\n  margin-top: 25px;\n  margin-bottom: 5px;\n  user-select: none; }\n\n.timepicker-canvas,\n.timepicker-dial {\n  position: absolute;\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0; }\n\n.timepicker-minutes {\n  visibility: hidden; }\n\n.timepicker-tick {\n  border-radius: 50%;\n  color: rgba(0, 0, 0, 0.87);\n  line-height: 40px;\n  text-align: center;\n  width: 40px;\n  height: 40px;\n  position: absolute;\n  cursor: pointer;\n  font-size: 15px; }\n\n.timepicker-tick.active,\n.timepicker-tick:hover {\n  background-color: rgba(38, 166, 154, 0.25); }\n\n.timepicker-dial {\n  transition: transform 350ms, opacity 350ms; }\n\n.timepicker-dial-out {\n  opacity: 0; }\n  .timepicker-dial-out.timepicker-hours {\n    transform: scale(1.1, 1.1); }\n  .timepicker-dial-out.timepicker-minutes {\n    transform: scale(0.8, 0.8); }\n\n.timepicker-canvas {\n  transition: opacity 175ms; }\n  .timepicker-canvas line {\n    stroke: #26a69a;\n    stroke-width: 4;\n    stroke-linecap: round; }\n\n.timepicker-canvas-out {\n  opacity: 0.25; }\n\n.timepicker-canvas-bearing {\n  stroke: none;\n  fill: #26a69a; }\n\n.timepicker-canvas-bg {\n  stroke: none;\n  fill: #26a69a; }\n\n/* Footer */\n.timepicker-footer {\n  margin: 0 auto;\n  padding: 5px 1rem;\n  display: flex;\n  justify-content: space-between; }\n\n.timepicker-clear {\n  color: #F44336; }\n\n.timepicker-close {\n  color: #26a69a; }\n\n.timepicker-clear,\n.timepicker-close {\n  padding: 0 20px; }\n\n/* Media Queries */\n@media only screen and (min-width: 601px) {\n  .timepicker-modal {\n    max-width: 600px; }\n  .timepicker-container.modal-content {\n    flex-direction: row; }\n  .timepicker-text-container {\n    top: 32%; }\n  .timepicker-display-am-pm {\n    position: relative;\n    right: auto;\n    bottom: auto;\n    text-align: center;\n    margin-top: 1.2rem; } }\n\n.example {\n  display: block;\n  border: 1px solid #0D47A1; }\n\n/*# sourceMappingURL=/resources/css/76dacbc3.css.map */")
});
___scope___.file("core/src/index.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./environment/index"), exports);
tslib_1.__exportStar(require("./di/index"), exports);
tslib_1.__exportStar(require("./hmr/index"), exports);
tslib_1.__exportStar(require("./lang/index"), exports);
tslib_1.__exportStar(require("./logger/index"), exports);
tslib_1.__exportStar(require("./virtualdom/index"), exports);
tslib_1.__exportStar(require("./renderer/index"), exports);
tslib_1.__exportStar(require("./tss/index"), exports);
tslib_1.__exportStar(require("./cd/index"), exports);
tslib_1.__exportStar(require("./webcomponent/index"), exports);
//# sourceMappingURL=index.js.map
});
___scope___.file("core/src/environment/index.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./src/function/isInProductionMode"), exports);
tslib_1.__exportStar(require("./src/enum/ApplicationEnvironment"), exports);
tslib_1.__exportStar(require("./src/enum/ApplicationRuntime"), exports);
tslib_1.__exportStar(require("./src/function/getRuntime"), exports);
tslib_1.__exportStar(require("./src/function/getRuntimeGlobalObject"), exports);
//# sourceMappingURL=index.js.map
});
___scope___.file("core/src/environment/src/function/isInProductionMode.js", function(exports, require, module){
var process = require("process");
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInProductionMode = () => process.env.NODE_ENV !== 'production';
//# sourceMappingURL=isInProductionMode.js.map
});
___scope___.file("core/src/environment/src/enum/ApplicationEnvironment.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApplicationEnvironment;
(function (ApplicationEnvironment) {
    ApplicationEnvironment["PRODUCTION"] = "PRODUCTION";
    ApplicationEnvironment["E2E_TEST"] = "E2E_TEST";
    ApplicationEnvironment["INTEGRATION_TEST"] = "INTEGRATION_TEST";
    ApplicationEnvironment["STAGING"] = "STAGING";
    ApplicationEnvironment["DEV"] = "DEV";
})(ApplicationEnvironment = exports.ApplicationEnvironment || (exports.ApplicationEnvironment = {}));
//# sourceMappingURL=ApplicationEnvironment.js.map
});
___scope___.file("core/src/environment/src/enum/ApplicationRuntime.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApplicationRuntime;
(function (ApplicationRuntime) {
    ApplicationRuntime["WEBBROWSER"] = "WEBBROWSER";
    ApplicationRuntime["NODE"] = "NODE";
})(ApplicationRuntime = exports.ApplicationRuntime || (exports.ApplicationRuntime = {}));
//# sourceMappingURL=ApplicationRuntime.js.map
});
___scope___.file("core/src/environment/src/function/getRuntime.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApplicationRuntime_1 = require("../enum/ApplicationRuntime");
exports.getRuntime = () => {
    if (typeof window != 'undefined') {
        return ApplicationRuntime_1.ApplicationRuntime.WEBBROWSER;
    }
    return ApplicationRuntime_1.ApplicationRuntime.NODE;
};
//# sourceMappingURL=getRuntime.js.map
});
___scope___.file("core/src/environment/src/function/getRuntimeGlobalObject.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getRuntime_1 = require("./getRuntime");
const ApplicationRuntime_1 = require("../enum/ApplicationRuntime");
exports.getRuntimeGlobalObject = () => {
    // Note: maybe use globalThis someday (when the standard API is stable)
    switch (getRuntime_1.getRuntime()) {
        case ApplicationRuntime_1.ApplicationRuntime.WEBBROWSER:
            if (!window['$st']) {
                window['$st'] = {};
            }
            return window.$st;
    }
    // return local object context
    return {};
};
//# sourceMappingURL=getRuntimeGlobalObject.js.map
});
___scope___.file("core/src/di/index.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./src/ApplicationContext"), exports);
tslib_1.__exportStar(require("./src/BeanFactory"), exports);
tslib_1.__exportStar(require("./src/ComponentReflector"), exports);
tslib_1.__exportStar(require("./src/decorator/Component"), exports);
tslib_1.__exportStar(require("./src/decorator/Autowired"), exports);
tslib_1.__exportStar(require("./src/decorator/Inject"), exports);
tslib_1.__exportStar(require("./src/interface/ComponentImpl"), exports);
tslib_1.__exportStar(require("./src/AbstractWeakMapReflector"), exports);
tslib_1.__exportStar(require("./src/enum/InjectionProfile"), exports);
tslib_1.__exportStar(require("./src/enum/InjectionStrategy"), exports);
tslib_1.__exportStar(require("./src/decorator/Module"), exports);
//# sourceMappingURL=index.js.map
});
___scope___.file("core/src/di/src/ApplicationContext.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BeanFactory_1 = require("./BeanFactory");
const environment_1 = require("../../environment");
const APPLICATION_CONTEXT = 'APPLICATION_CONTEXT';
class ApplicationContext extends BeanFactory_1.BeanFactory {
    constructor() {
        super(...arguments);
        this.environment = environment_1.ApplicationEnvironment.DEV;
        this.config = {};
    }
    setEnvironment(environment) {
        this.environment = environment;
    }
    getEnvironment() {
        return this.environment;
    }
    static setGlobal(name, value) {
        environment_1.getRuntimeGlobalObject()[name] = value;
    }
    static getGlobal(name) {
        return environment_1.getRuntimeGlobalObject()[name];
    }
    static getInstance() {
        let globalContext = ApplicationContext.getGlobal(APPLICATION_CONTEXT);
        if (!globalContext) {
            globalContext = new ApplicationContext();
            ApplicationContext.setGlobal(APPLICATION_CONTEXT, globalContext);
        }
        return globalContext;
    }
    set(name, value) {
        Reflect.set(this.config, name, value);
    }
    get(name) {
        return Reflect.get(this.config, name);
    }
}
exports.ApplicationContext = ApplicationContext;
//# sourceMappingURL=ApplicationContext.js.map
});
___scope___.file("core/src/di/src/BeanFactory.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ComponentReflector_1 = require("./ComponentReflector");
const InjectionProfile_1 = require("./enum/InjectionProfile");
const InjectionStrategy_1 = require("./enum/InjectionStrategy");
const resolveInjectionArgumentValue_1 = require("./function/resolveInjectionArgumentValue");
const PRIMITIVE_TYPE_NAMES = ['Number', 'Array', 'String', 'Boolean', 'RegExp', 'Date'];
class BeanFactory {
    constructor() {
        this.registry = {};
        this.singletonInstances = {};
    }
    getBean(componentCtor, injectionProfile = InjectionProfile_1.InjectionProfile.DEFAULT, injectionStrategy = InjectionStrategy_1.InjectionStrategy.SINGLETON) {
        const originalCtor = componentCtor;
        // validate component reference
        componentCtor = this.getComponent(componentCtor);
        if (!componentCtor || !ComponentReflector_1.ComponentReflector.isComponent(componentCtor)) {
            return this.solveUnresolvableBean(originalCtor);
        }
        // web component injected via "st-inject"
        if (componentCtor.prototype instanceof HTMLElement) {
            return componentCtor;
        }
        const classSymbol = ComponentReflector_1.ComponentReflector.getSymbol(componentCtor);
        const beanConfig = ComponentReflector_1.ComponentReflector.getConfig(componentCtor);
        if (injectionProfile === InjectionProfile_1.InjectionProfile.TEST &&
            beanConfig &&
            beanConfig.mockedBy &&
            ComponentReflector_1.ComponentReflector.isComponent(beanConfig.mockedBy)) {
            componentCtor = this.getComponent(beanConfig.mockedBy);
            ComponentReflector_1.ComponentReflector.setIsMockComponent(componentCtor);
        }
        // only in case of singleton instance retrieval,
        // try to fetch from cache, otherwise directly head to new instance creation
        if (injectionStrategy === InjectionStrategy_1.InjectionStrategy.SINGLETON) {
            const singletonInstance = this.getSingletonBeanInstance(classSymbol);
            if (singletonInstance) {
                return singletonInstance;
            }
        }
        // injectionStrategy === InjectionStrategy.FACTORY || singleton instance not found
        const beanInstance = new componentCtor(...this.resolveConstructorArguments(componentCtor, injectionProfile));
        this.initializeBeanInstance(beanInstance, ComponentReflector_1.ComponentReflector.getInitializers(componentCtor));
        if (injectionStrategy === InjectionStrategy_1.InjectionStrategy.SINGLETON) {
            this.setSingletonBeanInstance(classSymbol, beanInstance);
        }
        return beanInstance;
    }
    setComponent(componentCtor) {
        Reflect.set(this.registry, ComponentReflector_1.ComponentReflector.getSymbol(componentCtor), componentCtor);
    }
    getComponent(componentCtor) {
        return Reflect.get(this.registry, ComponentReflector_1.ComponentReflector.getSymbol(componentCtor)) || null;
    }
    initializeBeanInstance(instance, initializers) {
        initializers.forEach((initializer) => {
            initializer(instance);
        });
    }
    getSingletonBeanInstance(classSymbol) {
        return Reflect.get(this.singletonInstances, classSymbol);
    }
    setSingletonBeanInstance(classSymbol, beanInstance) {
        Reflect.set(this.singletonInstances, classSymbol, beanInstance);
    }
    resolveConstructorArguments(componentCtor, injectionProfile = InjectionProfile_1.InjectionProfile.DEFAULT) {
        componentCtor = this.getComponent(componentCtor);
        const isTestComponent = ComponentReflector_1.ComponentReflector.getIsMockComponent(componentCtor);
        const cachedConstructorArguments = ComponentReflector_1.ComponentReflector.getResolvedConstructorArguments(componentCtor);
        if (cachedConstructorArguments) {
            return cachedConstructorArguments;
        }
        // fetch constructor parameter types from reflection metadata
        const constructorParameterTypes = ComponentReflector_1.ComponentReflector.getConstructorArgumentTypes(componentCtor);
        // and do the default round-trip to get all instances by type
        const constructorArguments = this.getBeans(constructorParameterTypes, componentCtor, injectionProfile);
        const constructorArgumentsParameterInjectionMetadata = ComponentReflector_1.ComponentReflector.getConstructorArgumentsInjectionMetadata(componentCtor);
        // but if there are special @Inject decorations,
        // we head to resolve them and use these values instead
        if (constructorArgumentsParameterInjectionMetadata &&
            constructorArgumentsParameterInjectionMetadata.arguments &&
            constructorArgumentsParameterInjectionMetadata.arguments.length) {
            const overrideInjectParamValues = constructorArgumentsParameterInjectionMetadata.arguments;
            for (let i = 0; i < overrideInjectParamValues.length; i++) {
                if (typeof overrideInjectParamValues[i] !== 'undefined') {
                    constructorArguments[overrideInjectParamValues[i].index] =
                        resolveInjectionArgumentValue_1.resolveInjectionArgumentValue(constructorArgumentsParameterInjectionMetadata, overrideInjectParamValues[i].index, isTestComponent);
                }
            }
        }
        const constructorArgumentInitializers = ComponentReflector_1.ComponentReflector.getConstructorArgumentInitializers(componentCtor);
        if (constructorArgumentInitializers.length) {
            constructorArgumentInitializers.forEach((initializer) => {
                constructorArguments[initializer.argumentIndex] = initializer.initializer(constructorArguments[initializer.argumentIndex]);
            });
        }
        // cache
        ComponentReflector_1.ComponentReflector.setResolvedConstructorArguments(componentCtor, constructorArguments);
        return constructorArguments;
    }
    getBeans(types, forComponentCtor, injectionProfile = InjectionProfile_1.InjectionProfile.DEFAULT) {
        if (types && types.length > 0) {
            const beans = [];
            types.forEach((_componentCtor) => {
                const componentCtor = this.getComponent(_componentCtor);
                // the component to inject (componentCtor) matches the component to inject in (forComponentCtor)
                if (forComponentCtor === componentCtor) {
                    beans.push(this.solveCyclicDependency(componentCtor));
                }
                else if (!componentCtor) {
                    // bean unresolvable -> inject undefined
                    beans.push(this.solveUnresolvableBean(_componentCtor));
                }
                else {
                    const singletonBeanInstanceFromRegistry = this.getSingletonBeanInstance(ComponentReflector_1.ComponentReflector.getSymbol(componentCtor));
                    if (singletonBeanInstanceFromRegistry) {
                        beans.push(singletonBeanInstanceFromRegistry);
                    }
                    else {
                        beans.push(
                        // follow down the rabbit hole
                        this.getBean(componentCtor, injectionProfile));
                    }
                }
            });
            return beans;
        }
        return [];
    }
    solveUnresolvableBean(componentCtor) {
        // inject interfaces as empty objects
        if (componentCtor.prototype.constructor === Object) {
            return {};
        }
        else {
            const typeName = componentCtor.name;
            if (!typeName.match(/HTML.*Element/) && !typeName.match(/SVG.*Element/) && PRIMITIVE_TYPE_NAMES.indexOf(typeName) === -1) {
                console.warn(`The component referenced for injection is missing a @Component decorator: ${typeName}`);
            }
            return undefined;
        }
    }
    solveCyclicDependency(componentCtor) {
        console.warn(`Cyclic dependency detected in @Component: ${ComponentReflector_1.ComponentReflector.getName(componentCtor)}`);
        return componentCtor;
    }
}
exports.BeanFactory = BeanFactory;
//# sourceMappingURL=BeanFactory.js.map
});
___scope___.file("core/src/di/src/function/resolveInjectionArgumentValue.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ComponentReflector_1 = require("../ComponentReflector");
const ApplicationContext_1 = require("../ApplicationContext");
const InjectionProfile_1 = require("../enum/InjectionProfile");
function resolveInjectionArgumentValue(argumentsInjectionMetaData, index, isTestComponent) {
    let injectionValue;
    if (!argumentsInjectionMetaData.arguments[index])
        return;
    const injectionReference = argumentsInjectionMetaData.arguments[index].injectionReference;
    if (typeof injectionReference !== 'undefined') {
        if (typeof injectionReference === 'function') {
            if (ComponentReflector_1.ComponentReflector.isComponent(injectionReference)) {
                // it is not a InjectBeanFactory, just use the instance
                injectionValue = ApplicationContext_1.ApplicationContext.getInstance().getBean(injectionReference, isTestComponent ? InjectionProfile_1.InjectionProfile.TEST : InjectionProfile_1.InjectionProfile.DEFAULT, argumentsInjectionMetaData.arguments[index].injectionStrategy);
            }
            else {
                // case: function is not a InjectBeanFactory NOR registered bean -> inject function reference
                injectionValue = injectionReference;
            }
        }
        else {
            // use the value directly (any value case)
            injectionValue = injectionReference;
        }
    }
    return injectionValue;
}
exports.resolveInjectionArgumentValue = resolveInjectionArgumentValue;
//# sourceMappingURL=resolveInjectionArgumentValue.js.map
});
___scope___.file("core/src/di/src/type/InjectionReference.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=InjectionReference.js.map
});
___scope___.file("core/src/di/src/interface/ArgumentsInjectionMetadata.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=ArgumentsInjectionMetadata.js.map
});
___scope___.file("core/src/di/src/interface/ArgumentInjectionMetadata.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=ArgumentInjectionMetadata.js.map
});
___scope___.file("core/src/di/src/interface/ConstructorArgumentInitializer.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=ConstructorArgumentInitializer.js.map
});
___scope___.file("core/src/di/src/interface/ConstructorArgumentInitializerFunction.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=ConstructorArgumentInitializerFunction.js.map
});
___scope___.file("core/src/di/src/ComponentReflector.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createDefaultArgumentsInjectionMetadata_1 = require("./function/createDefaultArgumentsInjectionMetadata");
const registerBean_1 = require("./function/registerBean");
const COMPONENT = 'COMPONENT';
const COMPONENT_CONFIG = 'COMPONENT_CONFIG';
const COMPONENT_CONSTRUCTOR_PARAMETER_METADATA = 'COMPONENT_CONSTRUCTOR_PARAMETER_METADATA';
const COMPONENT_INITIALIZERS = 'COMPONENT_INITIALIZERS';
const COMPONENT_IS_MOCK_FLAG = 'COMPONENT_IS_MOCK_FLAG';
const COMPONENT_NAME = 'COMPONENT_NAME';
const CONSTRUCTOR_ARGUMENT_INITIALIZERS = 'CONSTRUCTOR_ARGUMENT_INITIALIZERS';
const RESOLVED_CONSTRUCTOR_ARGUMENTS = 'RESOLVED_CONSTRUCTOR_ARGUMENTS';
/**
 * This class uses the Reflect.metadata standard API (polyfilled)
 * to fetch and store compile-time and runtime reflected metadata.
 *
 * Calls to Reflect.getMetadata() point to TypeScript compiler generated
 * metadata. All other Reflect.* calls deal with runtime metadata (from decorators, BeanFactory).
 */
class ComponentReflector {
    static setIsMockComponent(componentCtor) {
        Reflect.set(componentCtor, COMPONENT_IS_MOCK_FLAG, true);
    }
    static getIsMockComponent(componentCtor) {
        return !!Reflect.get(componentCtor, COMPONENT_IS_MOCK_FLAG);
    }
    static getMethodArgumentTypes(componentCtor, propertyName) {
        return Reflect.getMetadata('design:paramtypes', componentCtor, propertyName) || [];
    }
    static getConstructorArgumentTypes(componentCtor) {
        return Reflect.getMetadata('design:paramtypes', componentCtor) || [];
    }
    static register(componentCtor, parameterInjectionMetadata, beanConfig) {
        Reflect.set(componentCtor, COMPONENT_CONFIG, beanConfig);
        Reflect.set(componentCtor, COMPONENT, Symbol(componentCtor.name));
        Reflect.set(componentCtor, COMPONENT_NAME, componentCtor.name);
        Reflect.set(componentCtor, COMPONENT_CONSTRUCTOR_PARAMETER_METADATA, parameterInjectionMetadata);
    }
    static registerDerived(originalComponentCtor, derivedComponentCtor) {
        Reflect.set(derivedComponentCtor, COMPONENT, ComponentReflector.getSymbol(originalComponentCtor));
        Reflect.set(derivedComponentCtor, COMPONENT_NAME, ComponentReflector.getName(originalComponentCtor));
        Reflect.set(derivedComponentCtor, COMPONENT_CONFIG, ComponentReflector.getConfig(originalComponentCtor));
        Reflect.set(derivedComponentCtor, COMPONENT_CONSTRUCTOR_PARAMETER_METADATA, ComponentReflector.getConstructorArgumentsInjectionMetadata(originalComponentCtor));
    }
    static getConstructorArgumentsInjectionMetadata(componentCtor) {
        return Reflect.get(componentCtor, COMPONENT_CONSTRUCTOR_PARAMETER_METADATA);
    }
    static setConstructorArgumentsInjectionMetadata(targetClassInstanceOrCtor, parameterIndex, injectionReference, injectionStrategy) {
        // fetch (probably existing) meta data
        const parameterInjectionMetaData = Reflect.getOwnMetadata(registerBean_1.INJECT_DECORATOR_METADATA_KEY, targetClassInstanceOrCtor, targetClassInstanceOrCtor.name) || createDefaultArgumentsInjectionMetadata_1.createDefaultArgumentsInjectionMetadata();
        // enhance meta data for parameter
        parameterInjectionMetaData.arguments[parameterIndex] = {
            index: parameterIndex,
            injectionReference,
            injectionStrategy
        };
        // (re-)define injection reference meta data
        Reflect.defineMetadata(registerBean_1.INJECT_DECORATOR_METADATA_KEY, parameterInjectionMetaData, targetClassInstanceOrCtor, targetClassInstanceOrCtor.name);
    }
    static setMethodArgumentsInjectionMetadata(targetClassInstanceOrCtor, parameterIndex, propertyKey, injectionReference, injectionStrategy) {
        // fetch (probably existing) meta data
        const parameterInjectionMetaData = ComponentReflector.getMethodArgumentsInjectionMetadata(targetClassInstanceOrCtor, propertyKey) || createDefaultArgumentsInjectionMetadata_1.createDefaultArgumentsInjectionMetadata();
        // enhance meta data for parameter
        parameterInjectionMetaData.arguments[parameterIndex] = {
            index: parameterIndex,
            injectionReference,
            injectionStrategy
        };
        // (re-define) injection reference for parameter index
        Reflect.defineMetadata(registerBean_1.INJECT_DECORATOR_METADATA_KEY, parameterInjectionMetaData, targetClassInstanceOrCtor, propertyKey);
    }
    static getMethodArgumentsInjectionMetadata(targetClassInstanceOrCtor, propertyKey) {
        return Reflect.getOwnMetadata(registerBean_1.INJECT_DECORATOR_METADATA_KEY, targetClassInstanceOrCtor, propertyKey);
    }
    static getSymbol(targetCtor) {
        return Reflect.get(targetCtor, COMPONENT);
    }
    static getName(targetCtor) {
        return Reflect.get(targetCtor, COMPONENT_NAME);
    }
    static getConfig(targetCtor) {
        return Reflect.get(targetCtor, COMPONENT_CONFIG);
    }
    /* When constructor arguments (injections) are resolved, the result is cached for later use */
    static setResolvedConstructorArguments(targetCtor, constructorArguments) {
        Reflect.set(targetCtor, RESOLVED_CONSTRUCTOR_ARGUMENTS, constructorArguments);
    }
    static getResolvedConstructorArguments(targetCtor) {
        return Reflect.get(targetCtor, RESOLVED_CONSTRUCTOR_ARGUMENTS);
    }
    static isComponent(componentCtor) {
        return !!ComponentReflector.getSymbol(componentCtor);
    }
    static getInitializers(targetCtor) {
        return Reflect.get(targetCtor, COMPONENT_INITIALIZERS) || [];
    }
    static addInitializer(targetCtor, initializer) {
        const initializers = ComponentReflector.getInitializers(targetCtor);
        initializers.push(initializer);
        Reflect.set(targetCtor, COMPONENT_INITIALIZERS, initializers);
    }
    static callInitializers(initializers, instance) {
        initializers.forEach(initializer => initializer(instance));
    }
    static getConstructorArgumentInitializers(targetCtor) {
        return Reflect.get(targetCtor, CONSTRUCTOR_ARGUMENT_INITIALIZERS) || [];
    }
    static addConstructorArgumentInitializer(targetCtor, initializer, argumentIndex) {
        const initializers = ComponentReflector.getConstructorArgumentInitializers(targetCtor);
        initializers.push({
            initializer,
            argumentIndex
        });
        Reflect.set(targetCtor, CONSTRUCTOR_ARGUMENT_INITIALIZERS, initializers);
    }
}
exports.ComponentReflector = ComponentReflector;
//# sourceMappingURL=ComponentReflector.js.map
});
___scope___.file("core/src/di/src/interface/BeanConfig.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=BeanConfig.js.map
});
___scope___.file("core/src/di/src/function/createDefaultArgumentsInjectionMetadata.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createDefaultArgumentsInjectionMetadata() {
    return {
        arguments: []
    };
}
exports.createDefaultArgumentsInjectionMetadata = createDefaultArgumentsInjectionMetadata;
//# sourceMappingURL=createDefaultArgumentsInjectionMetadata.js.map
});
___scope___.file("core/src/di/src/interface/BeanInitializer.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=BeanInitializer.js.map
});
___scope___.file("core/src/di/src/function/registerBean.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ComponentReflector_1 = require("../ComponentReflector");
const ApplicationContext_1 = require("../ApplicationContext");
exports.INJECT_DECORATOR_METADATA_KEY = "@Inject";
function registerBean(componentCtor, beanConfig) {
    // @Inject decorators that may be defined inside of the class definition
    // this @Component decorator is bound to, are processed first.
    // This call collects it's meta data so the BeanFactory can
    // handle the constructor parameter value injection correctly.
    const parameterInjectionMetaData = Reflect.getOwnMetadata(exports.INJECT_DECORATOR_METADATA_KEY, componentCtor, componentCtor.name);
    ComponentReflector_1.ComponentReflector.register(componentCtor, parameterInjectionMetaData, beanConfig);
    // a generic intermediate class is conjured, inheriting the class
    // the decorator is bound to. This keeps the prototype chain and later
    // instanceof checks sane. It is necessary, because we want to
    // *replace* the constructor with one that resolves it's arguments by itself (injection)
    // and is capable of even handling @Inject decorators in it constructor arguments (wohoo)
    const InjectionClassProxy = class extends componentCtor {
        constructor(...args) {
            super(...ApplicationContext_1.ApplicationContext.getInstance().resolveConstructorArguments(componentCtor));
        }
    };
    ComponentReflector_1.ComponentReflector.registerDerived(componentCtor, InjectionClassProxy);
    ApplicationContext_1.ApplicationContext.getInstance().setComponent(InjectionClassProxy);
    // just replace the original class declaration by our generic one
    return InjectionClassProxy;
}
exports.registerBean = registerBean;
//# sourceMappingURL=registerBean.js.map
});
___scope___.file("core/src/di/src/decorator/Component.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// MUST be imported here
require("reflect-metadata");
const registerBean_1 = require("../function/registerBean");
function Component(beanConfigOrCtor) {
    // called with @Component - no beanConfig object
    if (!(typeof beanConfigOrCtor === 'function')) {
        return (target) => {
            return registerBean_1.registerBean(target, beanConfigOrCtor);
        };
    }
    else {
        // called with @Component() or @Component({ ... })
        return registerBean_1.registerBean(beanConfigOrCtor);
    }
}
exports.Component = Component;
//# sourceMappingURL=Component.js.map
});
___scope___.file("core/src/di/src/decorator/Autowired.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ComponentReflector_1 = require("../ComponentReflector");
const ApplicationContext_1 = require("../ApplicationContext");
const InjectionProfile_1 = require("../enum/InjectionProfile");
const resolveInjectionArgumentValue_1 = require("../function/resolveInjectionArgumentValue");
function Autowired(target, propertyName, descriptor) {
    const methodArgumentTypes = ComponentReflector_1.ComponentReflector.getMethodArgumentTypes(target, propertyName);
    // backup original method
    const method = descriptor.value;
    // we replace the method again, the call the original impl. with injected arguments
    descriptor.value = function () {
        const cmp = ApplicationContext_1.ApplicationContext.getInstance().getComponent(target.constructor);
        if (!cmp) {
            throw new Error('@Autowired on methods requires @Component on the class.');
        }
        const isTestComponent = ComponentReflector_1.ComponentReflector.getIsMockComponent(cmp);
        // replacement method impl. -> this is called when the actual @BeanMethod annotated method is called (hook)
        const argumentsInjectionMetaData = ComponentReflector_1.ComponentReflector.getMethodArgumentsInjectionMetadata(target, propertyName);
        const newArgs = [];
        // 1. Copy initial argument values (non-optionals, default values)
        for (let i = 0; i < arguments.length; i++) {
            newArgs[i] = arguments[i];
        }
        // 2. There might be @Inject(...) decorations, process them and inject
        if (argumentsInjectionMetaData &&
            argumentsInjectionMetaData.arguments &&
            argumentsInjectionMetaData.arguments.length) {
            // copy arguments over into new arguments array (because arguments are immutable in modern times ;)
            for (let i = 0; i < argumentsInjectionMetaData.arguments.length; i++) {
                // resolve override injection argument
                const injectionValue = resolveInjectionArgumentValue_1.resolveInjectionArgumentValue(argumentsInjectionMetaData, i, isTestComponent);
                // conditionally overwrite original call argument for sub-call
                if (typeof injectionValue !== 'undefined') {
                    newArgs[i] = injectionValue;
                }
                else if (argumentsInjectionMetaData.arguments[i]) {
                    // parameter has @Inject() decorator, but no explicit value; fallback to default strategy
                    if (methodArgumentTypes[i]) {
                        // fetch singleton from cache by reflected type
                        newArgs[i] = ApplicationContext_1.ApplicationContext.getInstance().getBean(methodArgumentTypes[i], isTestComponent ? InjectionProfile_1.InjectionProfile.TEST : InjectionProfile_1.InjectionProfile.DEFAULT, argumentsInjectionMetaData.arguments[i].injectionStrategy);
                    }
                }
            }
        }
        // 3. For all arguments that are appended optional and are not passed and not injects by @Inject(...)
        //    try to inject them using their type reference
        for (let i = arguments.length; i < methodArgumentTypes.length; i++) {
            if (typeof newArgs[i] === 'undefined' &&
                ComponentReflector_1.ComponentReflector.isComponent(methodArgumentTypes[i])) {
                newArgs[i] = ApplicationContext_1.ApplicationContext.getInstance().getBean(methodArgumentTypes[i], isTestComponent ? InjectionProfile_1.InjectionProfile.TEST : InjectionProfile_1.InjectionProfile.DEFAULT);
            }
        }
        return method.apply(this, newArgs);
    };
}
exports.Autowired = Autowired;
//# sourceMappingURL=Autowired.js.map
});
___scope___.file("core/src/di/src/decorator/Inject.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ComponentReflector_1 = require("../ComponentReflector");
const InjectionStrategy_1 = require("../enum/InjectionStrategy");
function Inject(injectionReference, injectionStrategy = InjectionStrategy_1.InjectionStrategy.SINGLETON) {
    return function (targetClassInstanceOrCtor, propertyKey, argumentIndex) {
        if (typeof targetClassInstanceOrCtor === 'function') {
            // case: param on constructor function
            ComponentReflector_1.ComponentReflector.setConstructorArgumentsInjectionMetadata(targetClassInstanceOrCtor, argumentIndex, injectionReference, injectionStrategy);
        }
        else {
            // case: param on method
            ComponentReflector_1.ComponentReflector.setMethodArgumentsInjectionMetadata(targetClassInstanceOrCtor, argumentIndex, propertyKey, injectionReference, injectionStrategy);
        }
    };
}
exports.Inject = Inject;
//# sourceMappingURL=Inject.js.map
});
___scope___.file("core/src/di/src/interface/ComponentImpl.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=ComponentImpl.js.map
});
___scope___.file("core/src/di/src/AbstractWeakMapReflector.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApplicationContext_1 = require("./ApplicationContext");
class AbstractWeakMapReflector {
    static get REFLECTOR_NAME() { return ''; }
    ;
    static setup() {
        this.state = ApplicationContext_1.ApplicationContext.getGlobal(this.REFLECTOR_NAME);
        if (!this.state) {
            this.state = new WeakMap();
            ApplicationContext_1.ApplicationContext.setGlobal(this.REFLECTOR_NAME, this.state);
        }
    }
    static set(instance, value) {
        if (!this.state)
            this.setup();
        this.state.set(instance, value);
    }
    static get(instance) {
        if (!this.state)
            this.setup();
        return this.state.get(instance);
    }
    static has(instance) {
        if (!this.state)
            this.setup();
        return this.state.has(instance);
    }
}
exports.AbstractWeakMapReflector = AbstractWeakMapReflector;
//# sourceMappingURL=AbstractWeakMapReflector.js.map
});
___scope___.file("core/src/di/src/enum/InjectionProfile.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InjectionProfile;
(function (InjectionProfile) {
    InjectionProfile["DEFAULT"] = "DEFAULT";
    InjectionProfile["TEST"] = "TEST";
})(InjectionProfile = exports.InjectionProfile || (exports.InjectionProfile = {}));
//# sourceMappingURL=InjectionProfile.js.map
});
___scope___.file("core/src/di/src/enum/InjectionStrategy.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InjectionStrategy;
(function (InjectionStrategy) {
    InjectionStrategy["SINGLETON"] = "SINGLETON";
    InjectionStrategy["FACTORY"] = "FACTORY";
})(InjectionStrategy = exports.InjectionStrategy || (exports.InjectionStrategy = {}));
//# sourceMappingURL=InjectionStrategy.js.map
});
___scope___.file("core/src/di/src/decorator/Module.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Module(name, ...imports) {
    return (target) => {
        // stub impl. to be filled out by @springtype/transform, TODO
    };
}
exports.Module = Module;
//# sourceMappingURL=Module.js.map
});
___scope___.file("core/src/hmr/index.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./src/function/setupReloadOnCodeChange"), exports);
tslib_1.__exportStar(require("./src/decorator/ReloadOnCodeChange"), exports);
//# sourceMappingURL=index.js.map
});
___scope___.file("core/src/hmr/src/function/setupReloadOnCodeChange.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupReloadOnCodeChange = (module) => {
    if (module && module.hot) {
        module.hot.dispose(() => { });
        module.hot.accept(() => {
            // make sure to hard-reload on hot module replacement
            // to prevent odd/buggy behaviour with certain build systems
            // (as cache invalidation isn't as easy as it seems to be, huh...)
            window.location.reload();
        });
    }
};
//# sourceMappingURL=setupReloadOnCodeChange.js.map
});
___scope___.file("core/src/hmr/src/decorator/ReloadOnCodeChange.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../..");
// @ts-ignore
const _module = module;
function ReloadOnCodeChange(target) {
    __1.setupReloadOnCodeChange(_module);
    return target;
}
exports.ReloadOnCodeChange = ReloadOnCodeChange;
//# sourceMappingURL=ReloadOnCodeChange.js.map
});
___scope___.file("core/src/lang/index.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./src/interface/Partial"), exports);
tslib_1.__exportStar(require("./src/interface/Merge"), exports);
tslib_1.__exportStar(require("./src/interface/Omit"), exports);
tslib_1.__exportStar(require("./src/random/Randomizer"), exports);
tslib_1.__exportStar(require("./src/util/Try"), exports);
tslib_1.__exportStar(require("./src/string/CaseTransformer"), exports);
tslib_1.__exportStar(require("./src/function/buffer"), exports);
tslib_1.__exportStar(require("./src/decorator/Buffer"), exports);
tslib_1.__exportStar(require("./src/function/memoize"), exports);
tslib_1.__exportStar(require("./src/decorator/Memoize"), exports);
tslib_1.__exportStar(require("./src/function/measureSpeed"), exports);
tslib_1.__exportStar(require("./src/decorator/MeasureSpeed"), exports);
tslib_1.__exportStar(require("./src/function/isMemorizedReturnValue"), exports);
tslib_1.__exportStar(require("./src/function/delay"), exports);
//# sourceMappingURL=index.js.map
});
___scope___.file("core/src/lang/src/interface/Partial.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=Partial.js.map
});
___scope___.file("core/src/lang/src/interface/Merge.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=Merge.js.map
});
___scope___.file("core/src/lang/src/interface/Omit.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=Omit.js.map
});
___scope___.file("core/src/lang/src/random/Randomizer.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This class generates random numbers or strings to a given characterSet.
 */
class Randomizer {
    /**
     * Generate one random string
     * @param characterSet the characters that will be included
     * @param length the length of string
     */
    static generateString(characterSet, length) {
        let str = "";
        for (let i = 0; i < length; i++) {
            str += characterSet[~~(Math.random() * characterSet.length)];
        }
        return str;
    }
    /**
     * Generate an array of random strings
     * @param characterSet the characters that will be included
     * @param length the length of string
     * @param amount the size of generated strings
     */
    static generateStrings(characterSet, length, amount) {
        let result = new Array(amount);
        for (let i = 0; i < length; i++) {
            result[i] = Randomizer.generateString(characterSet, length);
        }
        return result;
    }
    /**
     * Generate a array of random numbers
     * @param min the minimum value
     * @param max the maximum value
     * @param amount amount the size of generated numbers
     */
    static generateNumbers(min, max, amount) {
        let result = new Array(amount);
        for (let i = 0; i < amount; i++) {
            result[i] = (Math.floor(Math.random() * (max - min + 1)) + min);
        }
        return result;
    }
}
exports.Randomizer = Randomizer;
//# sourceMappingURL=Randomizer.js.map
});
___scope___.file("core/src/lang/src/util/Try.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Try {
    static requireNonNullDefined(value, message) {
        if (typeof value === 'undefined') {
            throw new UndefinedError(message + ' was undefined');
        }
        if (value === null) {
            throw new NullPointerError(message + ' was null');
        }
        return value;
    }
    static of(callable) {
        try {
            const result = callable();
            Try.requireNonNullDefined(result, "result");
            return new TrySuccess(result);
        }
        catch (t) {
            return new TryFailure(t);
        }
    }
    filter(predicate) {
        if (this.isSuccess()) {
            try {
                const value = this.get();
                if (!predicate(value)) {
                    return new TryFailure(new NoSuchElementError("Predicate does not hold for " + value));
                }
            }
            catch (e) {
                return new TryFailure(e);
            }
        }
        return this;
    }
    flatMap(mapper) {
        if (this.isSuccess()) {
            try {
                return Try.of(() => mapper(this.get()));
            }
            catch (t) {
                return new TryFailure(t);
            }
            finally {
            }
        }
        else {
            return new TryFailure(this.getCause());
        }
    }
    fold(ifTryFailure, ifSuccess) {
        return this.isSuccess() ? ifSuccess(this.get()) : ifTryFailure(this.getCause());
    }
    getOrElse(other) {
        return this.isSuccess() ? this.get() : other;
    }
    getOrElseGet(supplier) {
        return this.isSuccess() ? this.get() : supplier();
    }
    getOrElseThrow(exceptionProvider) {
        if (this.isSuccess()) {
            return this.get();
        }
        else {
            throw exceptionProvider(this.getCause());
        }
    }
    map(mapper) {
        if (this.isSuccess()) {
            try {
                return new TrySuccess(mapper(this.get()));
            }
            catch (t) {
                return new TryFailure(t);
            }
        }
        else {
            return new TryFailure(this.getCause());
        }
    }
    mapFailure(mapper) {
        if (this.isFailure()) {
            try {
                return new TryFailure(mapper(this.getCause()));
            }
            catch (t) {
                return new TryFailure(t);
            }
        }
        else {
            return this;
        }
    }
    onFailure(action) {
        if (this.isFailure()) {
            action(this.getCause());
        }
        return this;
    }
    onSuccess(action) {
        if (this.isSuccess()) {
            try {
                action(this.get());
            }
            catch (e) {
                return new TryFailure(e);
            }
        }
        return this;
    }
    orElse(callable) {
        if (this.isSuccess()) {
            return this;
        }
        else {
            try {
                return callable();
            }
            catch (x) {
                return new TryFailure(x);
            }
        }
    }
    recover(exceptionType, recoveryFunction) {
        if (this.isFailure()) {
            if (this.getCause().constructor === exceptionType) {
                return Try.of(() => recoveryFunction());
            }
        }
        return this;
    }
}
exports.Try = Try;
class TrySuccess extends Try {
    constructor(value) {
        super();
        this.value = value;
    }
    get() {
        return this.value;
    }
    getCause() {
        throw new UnsupportedOperationError("getCause() on Success");
    }
    isFailure() {
        return false;
    }
    isSuccess() {
        return true;
    }
    toString() {
        return "Success(" + this.value + ")";
    }
}
class TryFailure extends Try {
    constructor(cause) {
        super();
        this.cause = cause;
    }
    get() {
        throw this.cause;
    }
    getCause() {
        return this.cause;
    }
    isFailure() {
        return true;
    }
    isSuccess() {
        return false;
    }
    toString() {
        return "Failure(" + this.cause + ")";
    }
}
class NullPointerError extends Error {
    constructor(message) {
        super(message);
        this.__proto__ = NullPointerError.prototype;
    }
}
exports.NullPointerError = NullPointerError;
class UndefinedError extends Error {
    constructor(message) {
        super(message);
        this.__proto__ = UndefinedError.prototype;
    }
}
exports.UndefinedError = UndefinedError;
class NoSuchElementError extends Error {
    constructor(message) {
        super(message);
        this.__proto__ = NoSuchElementError.prototype;
    }
}
exports.NoSuchElementError = NoSuchElementError;
class UnsupportedOperationError extends Error {
    constructor(message) {
        super(message);
        this.__proto__ = UnsupportedOperationError.prototype;
    }
}
exports.UnsupportedOperationError = UnsupportedOperationError;
//# sourceMappingURL=Try.js.map
});
___scope___.file("core/src/lang/src/string/CaseTransformer.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CaseTransformer {
    static kebabToCamelCase(name) {
        return name.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    }
    static camelToKebabCase(name) {
        return name.replace(/[A-Z]/g, (g) => '-' + g[0].toLowerCase());
    }
    static camelCaseToColonCase(name) {
        return name.replace(/[A-Z]/g, (g) => ':' + g[0].toLowerCase());
    }
}
exports.CaseTransformer = CaseTransformer;
//# sourceMappingURL=CaseTransformer.js.map
});
___scope___.file("core/src/lang/src/function/buffer.js", function(exports, require, module){
var buffer = require("buffer").Buffer;
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buffer = (fn, ms, returnPromise = true) => {
    let currentPromise;
    let resolveFn;
    const guaranteePromise = () => {
        if (!currentPromise) {
            currentPromise = new Promise((resolve) => {
                resolveFn = resolve;
            });
        }
        return currentPromise;
    };
    const invalidatePromise = () => {
        currentPromise = null;
    };
    const bufferedFn = function (...args) {
        let returnValue;
        let guaranteedPromise = guaranteePromise();
        // ms
        const bufferTime = Reflect.get(bufferedFn, 'BUFFER_TIME') || 0;
        const lastCallTimestamp = Reflect.get(bufferedFn, 'BUFFER_LAST_CALL') || 0;
        if (!lastCallTimestamp || lastCallTimestamp < (Date.now() - bufferTime)) {
            returnValue = fn(...args);
            Reflect.set(bufferedFn, 'BUFFER_LAST_CALL', Date.now());
            if (returnPromise) {
                resolveFn(returnValue);
            }
            invalidatePromise();
        }
        if (returnPromise) {
            return guaranteedPromise;
        }
        else {
            return returnValue;
        }
    };
    Reflect.set(bufferedFn, 'BUFFER_TIME', ms);
    return bufferedFn;
};
//# sourceMappingURL=buffer.js.map
});
___scope___.file("core/src/lang/src/decorator/Buffer.js", function(exports, require, module){
var Buffer = require("buffer").Buffer;
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const buffer_1 = require("../function/buffer");
exports.Buffer = (ms, returnPromise = true) => {
    return function (target, methodName, descriptor) {
        descriptor.value = buffer_1.buffer(target[methodName], ms, returnPromise);
    };
};
//# sourceMappingURL=Buffer.js.map
});
___scope___.file("core/src/lang/src/function/memoize.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Comparator_1 = require("../object/Comparator");
exports.memoize = (fn, ignoreArguments = []) => {
    let memoizedReturnValue;
    let previousArguments = [];
    const callFunction = (...args) => {
        memoizedReturnValue = fn(...args);
        previousArguments = args || [];
    };
    return function (...args) {
        // optimization: arguments length differ
        if (previousArguments.length !== args.length) {
            callFunction(...args);
        }
        else {
            // arguments length is the same, but contents may differ
            for (let i = 0; i < args.length; i++) {
                // may fall through by not checking certain arguments
                if (ignoreArguments.indexOf(i) !== -1)
                    continue;
                // if all arguments are equal, nothing happens (return of memoized result value)
                if (!Comparator_1.Comparator.isEqual(args[i], previousArguments[i])) {
                    callFunction(...args);
                    break;
                }
            }
        }
        if (typeof memoizedReturnValue === 'object') {
            Reflect.set(memoizedReturnValue, 'IS_MEMORIZED_RETURN_VALUE', true);
        }
        return memoizedReturnValue;
    };
};
//# sourceMappingURL=memoize.js.map
});
___scope___.file("core/src/lang/src/object/Comparator.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Comparator {
    /**
     * Compares two objects by equaling all own property types and values.
     */
    static isEqual(a, b, type = CompareType.EQUAL) {
        a = Comparator.toPrimitive(a);
        b = Comparator.toPrimitive(b);
        if (a === b) {
            return true;
        }
        else if ((typeof a == "object" && a != null) &&
            (typeof b == "object" && b != null)) {
            const aKeys = Object.keys(a);
            const aKeyLength = aKeys.length;
            const bKeyLength = Object.keys(b).length;
            // same amount of properties
            if (type === CompareType.EQUAL && aKeyLength !== bKeyLength
                // length of properties of a bigger than properties are missing
                || type === CompareType.PARTIALLY_EQUAL && aKeyLength > bKeyLength) {
                return false;
            }
            for (const prop of aKeys) {
                // check if b has the property of a and check the value
                if (b.hasOwnProperty(prop) &&
                    Comparator.isEqual(a[prop], b[prop], type)) {
                    continue;
                }
                // don't has the property or not equal
                return false;
            }
            // everything is equal
            return true;
        }
        // maybe null or undefined
        return false;
    }
    static toPrimitive(value) {
        if (value !== null && typeof value === 'object') {
            return value.valueOf();
        }
        return value;
    }
}
exports.Comparator = Comparator;
var CompareType;
(function (CompareType) {
    CompareType[CompareType["PARTIALLY_EQUAL"] = 0] = "PARTIALLY_EQUAL";
    CompareType[CompareType["EQUAL"] = 1] = "EQUAL";
})(CompareType = exports.CompareType || (exports.CompareType = {}));
//# sourceMappingURL=Comparator.js.map
});
___scope___.file("core/src/lang/src/decorator/Memoize.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const memoize_1 = require("../function/memoize");
exports.Memoize = (target, methodName, descriptor) => {
    descriptor.value = memoize_1.memoize(target[methodName]);
};
//# sourceMappingURL=Memoize.js.map
});
___scope___.file("core/src/lang/src/function/measureSpeed.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("../../../di");
const buffer_1 = require("./buffer");
exports.measureSpeed = (name, fn) => {
    const aggregateTimings = buffer_1.buffer(() => {
        const callTimings = di_1.ApplicationContext.getGlobal('MEASURE_SPEED_CALL_STACK_TIMING_TMP') || {};
        const callAvg = di_1.ApplicationContext.getGlobal('MEASURE_PERFORMANCE_CALL_TIME_AVERAGE') || {};
        const callAmount = di_1.ApplicationContext.getGlobal('MEASURE_PERFORMANCE_CALL_AMOUNT') || {};
        if (!callAmount[name]) {
            callAmount[name] = 0;
        }
        callAmount[name] += callTimings[name].length;
        if (callAvg[name]) {
            callTimings[name].push(callAvg[name]);
        }
        callAvg[name] = callTimings[name].reduce((previousTiming, currentTiming) => previousTiming + currentTiming)
            / (callTimings[name].length);
        // reset timing stack
        callTimings[name] = [];
        di_1.ApplicationContext.setGlobal('MEASURE_PERFORMANCE_CALL_TIME_AVERAGE', callAvg);
        di_1.ApplicationContext.setGlobal('MEASURE_PERFORMANCE_CALL_AMOUNT', callAmount);
        di_1.ApplicationContext.setGlobal('MEASURE_SPEED_CALL_STACK_TIMING_TMP', callTimings);
    }, 100);
    return function (...args) {
        const callTimings = di_1.ApplicationContext.getGlobal('MEASURE_SPEED_CALL_STACK_TIMING_TMP') || {};
        if (!callTimings[name]) {
            callTimings[name] = [];
        }
        const start = performance.now();
        const returnValue = fn(...args);
        const end = performance.now();
        callTimings[name].push(end - start);
        di_1.ApplicationContext.setGlobal('MEASURE_SPEED_CALL_STACK_TIMING_TMP', callTimings);
        aggregateTimings();
        return returnValue;
    };
};
//# sourceMappingURL=measureSpeed.js.map
});
___scope___.file("core/src/lang/src/decorator/MeasureSpeed.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const measureSpeed_1 = require("../function/measureSpeed");
exports.MeasureSpeed = (target, methodName, descriptor) => {
    descriptor.value = measureSpeed_1.measureSpeed(target.constructor.name + '.' + methodName, target[methodName]);
};
//# sourceMappingURL=MeasureSpeed.js.map
});
___scope___.file("core/src/lang/src/function/isMemorizedReturnValue.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isMemorizedReturnValue = (value) => {
    return Reflect.get(value, 'IS_MEMORIZED_RETURN_VALUE');
};
//# sourceMappingURL=isMemorizedReturnValue.js.map
});
___scope___.file("core/src/lang/src/function/delay.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delay = (fn, ms) => {
    return function (...args) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(fn(...args));
            }, ms);
        });
    };
};
//# sourceMappingURL=delay.js.map
});
___scope___.file("core/src/logger/index.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./src/ActiveLogger"), exports);
tslib_1.__exportStar(require("./src/decorator/Logger"), exports);
tslib_1.__exportStar(require("./src/interface/LoggerConfig"), exports);
tslib_1.__exportStar(require("./src/enum/LogLevel"), exports);
tslib_1.__exportStar(require("./src/interface/LogFilterFunction"), exports);
tslib_1.__exportStar(require("./src/function/log"), exports);
tslib_1.__exportStar(require("./src/function/info"), exports);
tslib_1.__exportStar(require("./src/function/warn"), exports);
tslib_1.__exportStar(require("./src/function/debug"), exports);
tslib_1.__exportStar(require("./src/function/error"), exports);
tslib_1.__exportStar(require("./src/function/trace"), exports);
tslib_1.__exportStar(require("./src/interface/LoggerImpl"), exports);
tslib_1.__exportStar(require("./src/context/logger"), exports);
//# sourceMappingURL=index.js.map
});
___scope___.file("core/src/logger/src/ActiveLogger.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const di_1 = require("../../di");
const LogLevel_1 = require("./enum/LogLevel");
const filterByLogLevel_1 = require("./function/filterByLogLevel");
const logger_1 = require("./context/logger");
/**
 * Logger to inject which uses the decorator-provided application logger (@AppLogger(...))
 * or falls back to the default configuration (default/DefaultAppLoggerConfig.ts).
 *
 * Inject this Logger in any class using:
 *
 * constructor(protected logger: Logger) { ... }
 */
let ActiveLogger = class ActiveLogger {
    filterArgs(args, methodLogLevel) {
        let filteredArgs = filterByLogLevel_1.filterByLogLevel(args, this.getLogLevel(), methodLogLevel);
        const customFilterFn = this.getFilterFunction();
        if (typeof customFilterFn === 'function') {
            filteredArgs = customFilterFn(filteredArgs);
        }
        return filteredArgs;
    }
    get loggerImpl() {
        // fetch cached instance
        if (this._loggerImpl)
            return this._loggerImpl;
        const appLoggerImpl = logger_1.getLogger();
        if (appLoggerImpl) {
            this._loggerImpl = appLoggerImpl;
        }
        return this._loggerImpl;
    }
    log(...args) {
        const filteredArgs = this.filterArgs(args, LogLevel_1.LogLevel.LOG);
        if (filteredArgs.length) {
            this.loggerImpl.log(...filteredArgs);
        }
    }
    trace(...args) {
        const filteredArgs = this.filterArgs(args, LogLevel_1.LogLevel.TRACE);
        if (filteredArgs.length) {
            this.loggerImpl.trace(...filteredArgs);
        }
    }
    error(...args) {
        const filteredArgs = this.filterArgs(args, LogLevel_1.LogLevel.ERROR);
        if (filteredArgs.length) {
            this.loggerImpl.error(...filteredArgs);
        }
    }
    warn(...args) {
        const filteredArgs = this.filterArgs(args, LogLevel_1.LogLevel.WARN);
        if (filteredArgs.length) {
            this.loggerImpl.warn(...filteredArgs);
        }
    }
    debug(...args) {
        const filteredArgs = this.filterArgs(args, LogLevel_1.LogLevel.DEBUG);
        if (filteredArgs.length) {
            this.loggerImpl.debug(...filteredArgs);
        }
    }
    info(...args) {
        const filteredArgs = this.filterArgs(args, LogLevel_1.LogLevel.INFO);
        if (filteredArgs.length) {
            this.loggerImpl.info(...filteredArgs);
        }
    }
    setLogLevel(level) {
        this.loggerImpl.setLogLevel(level);
    }
    setFilterFunction(filter) {
        this.setFilterFunction(filter);
    }
    getLogLevel() {
        return this.loggerImpl.getLogLevel();
    }
    getFilterFunction() {
        return this.loggerImpl.getFilterFunction();
    }
    ;
};
ActiveLogger = tslib_1.__decorate([
    di_1.Component
], ActiveLogger);
exports.ActiveLogger = ActiveLogger;
//# sourceMappingURL=ActiveLogger.js.map
});
___scope___.file("core/src/logger/src/function/filterByLogLevel.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getLogLevelSeverity_1 = require("./getLogLevelSeverity");
exports.filterByLogLevel = (args, logLevel, methodLogLevel) => {
    const loggingSeverity = getLogLevelSeverity_1.getLogLevelSeverity(logLevel);
    const actualMethodSeverity = getLogLevelSeverity_1.getLogLevelSeverity(methodLogLevel);
    // numb logging output because e.g. method severity (log() = LOG = 4 is lower than logging severity set (ERROR = 1)
    if (actualMethodSeverity > loggingSeverity) {
        return [];
    }
    return args;
};
//# sourceMappingURL=filterByLogLevel.js.map
});
___scope___.file("core/src/logger/src/function/getLogLevelSeverity.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../..");
exports.getLogLevelSeverity = (logLevel) => {
    switch (logLevel) {
        case __1.LogLevel.NONE:
            return 0;
        case __1.LogLevel.ERROR:
            return 1;
        case __1.LogLevel.WARN:
            return 2;
        case __1.LogLevel.DEBUG:
            return 3;
        default:
        case __1.LogLevel.LOG:
            return 4;
        case __1.LogLevel.INFO:
            return 5;
        case __1.LogLevel.TRACE:
            return 6;
    }
};
//# sourceMappingURL=getLogLevelSeverity.js.map
});
___scope___.file("core/src/logger/src/decorator/Logger.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../context/logger");
function Logger(loggerConfig) {
    // called with @AppLogger() or @AppLogger({})
    if (!(typeof loggerConfig === 'function')) {
        return (target) => {
            logger_1.setLogger(loggerConfig);
            return target;
        };
    }
}
exports.Logger = Logger;
//# sourceMappingURL=Logger.js.map
});
___scope___.file("core/src/logger/src/interface/LoggerConfig.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=LoggerConfig.js.map
});
___scope___.file("core/src/logger/src/enum/LoggerImplType.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LoggerImplType;
(function (LoggerImplType) {
    LoggerImplType["CONSOLE"] = "CONSOLE";
})(LoggerImplType = exports.LoggerImplType || (exports.LoggerImplType = {}));
//# sourceMappingURL=LoggerImplType.js.map
});
___scope___.file("core/src/logger/src/enum/LogLevel.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// in order of chattiness
var LogLevel;
(function (LogLevel) {
    LogLevel["NONE"] = "NONE";
    LogLevel["ERROR"] = "ERROR";
    LogLevel["WARN"] = "WARN";
    LogLevel["DEBUG"] = "DEBUG";
    LogLevel["LOG"] = "LOG";
    LogLevel["INFO"] = "INFO";
    LogLevel["TRACE"] = "TRACE";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
//# sourceMappingURL=LogLevel.js.map
});
___scope___.file("core/src/logger/src/interface/LogFilterFunction.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=LogFilterFunction.js.map
});
___scope___.file("core/src/logger/src/function/log.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("../../../di");
const ActiveLogger_1 = require("../ActiveLogger");
exports.log = (...args) => {
    di_1.ApplicationContext.getInstance().getBean(ActiveLogger_1.ActiveLogger).log(...args);
};
//# sourceMappingURL=log.js.map
});
___scope___.file("core/src/logger/src/function/info.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ActiveLogger_1 = require("../ActiveLogger");
const di_1 = require("../../../di");
exports.info = (...args) => {
    di_1.ApplicationContext.getInstance().getBean(ActiveLogger_1.ActiveLogger).info(...args);
};
//# sourceMappingURL=info.js.map
});
___scope___.file("core/src/logger/src/function/warn.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ActiveLogger_1 = require("../ActiveLogger");
const di_1 = require("../../../di");
exports.warn = (...args) => {
    di_1.ApplicationContext.getInstance().getBean(ActiveLogger_1.ActiveLogger).warn(...args);
};
//# sourceMappingURL=warn.js.map
});
___scope___.file("core/src/logger/src/function/debug.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ActiveLogger_1 = require("../ActiveLogger");
const di_1 = require("../../../di");
exports.debug = (...args) => {
    di_1.ApplicationContext.getInstance().getBean(ActiveLogger_1.ActiveLogger).debug(...args);
};
//# sourceMappingURL=debug.js.map
});
___scope___.file("core/src/logger/src/function/error.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ActiveLogger_1 = require("../ActiveLogger");
const di_1 = require("../../../di");
exports.error = (...args) => {
    di_1.ApplicationContext.getInstance().getBean(ActiveLogger_1.ActiveLogger).error(...args);
};
//# sourceMappingURL=error.js.map
});
___scope___.file("core/src/logger/src/function/trace.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ActiveLogger_1 = require("../ActiveLogger");
const di_1 = require("../../../di");
exports.trace = (...args) => {
    di_1.ApplicationContext.getInstance().getBean(ActiveLogger_1.ActiveLogger).trace(...args);
};
//# sourceMappingURL=trace.js.map
});
___scope___.file("core/src/logger/src/interface/LoggerImpl.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=LoggerImpl.js.map
});
___scope___.file("core/src/logger/src/context/logger.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("../../../di");
const defaultLoggerConfig_1 = require("../defaultLoggerConfig");
const getLoggerImplInstance_1 = require("../function/getLoggerImplInstance");
const LOGGER = 'LOGGER';
exports.getLogger = () => {
    let loggerImpl = di_1.ApplicationContext.getInstance().get(LOGGER);
    if (!loggerImpl) {
        exports.setLogger(defaultLoggerConfig_1.defaultLoggerConfig);
    }
    return di_1.ApplicationContext.getInstance().get(LOGGER);
};
exports.setLogger = (appLoggerConfig) => {
    di_1.ApplicationContext.getInstance().set(LOGGER, getLoggerImplInstance_1.getLoggerImplInstance(appLoggerConfig));
};
//# sourceMappingURL=logger.js.map
});
___scope___.file("core/src/logger/src/defaultLoggerConfig.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LoggerImplType_1 = require("./enum/LoggerImplType");
const LogLevel_1 = require("./enum/LogLevel");
exports.defaultLoggerConfig = {
    type: LoggerImplType_1.LoggerImplType.CONSOLE,
    level: LogLevel_1.LogLevel.LOG
};
//# sourceMappingURL=defaultLoggerConfig.js.map
});
___scope___.file("core/src/logger/src/function/getLoggerImplInstance.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConsoleLoggerImpl_1 = require("../impl/ConsoleLoggerImpl");
const LoggerImplType_1 = require("../enum/LoggerImplType");
exports.getLoggerImplInstance = (loggerConfig) => {
    let loggerImpl;
    // custom impl provided via config
    if (loggerConfig.impl) {
        loggerImpl = loggerConfig.impl;
    }
    else {
        // using standard implementation
        switch (loggerConfig.type) {
            default:
            case LoggerImplType_1.LoggerImplType.CONSOLE:
                loggerImpl = new ConsoleLoggerImpl_1.ConsoleLoggerImpl();
                break;
        }
    }
    loggerImpl.setLogLevel(loggerConfig.level);
    loggerImpl.setFilterFunction(loggerConfig.filter);
    return loggerImpl;
};
//# sourceMappingURL=getLoggerImplInstance.js.map
});
___scope___.file("core/src/logger/src/impl/ConsoleLoggerImpl.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("../../../di/index");
let ConsoleLoggerImpl = class ConsoleLoggerImpl {
    setLogLevel(level) {
        this.level = level;
    }
    setFilterFunction(filter) {
        this.filter = filter;
    }
    getLogLevel() {
        return this.level;
    }
    getFilterFunction() {
        return this.filter;
    }
    ;
    log(...args) {
        console.log(...args);
    }
    trace(...args) {
        console.trace(...args);
    }
    error(...args) {
        console.error(...args);
    }
    warn(...args) {
        console.warn(...args);
    }
    debug(...args) {
        console.debug(...args);
    }
    info(...args) {
        console.info(...args);
    }
};
ConsoleLoggerImpl = tslib_1.__decorate([
    index_1.Component
], ConsoleLoggerImpl);
exports.ConsoleLoggerImpl = ConsoleLoggerImpl;
//# sourceMappingURL=ConsoleLoggerImpl.js.map
});
___scope___.file("core/src/virtualdom/index.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
// force-import interfaces for framework and Web Standard TSX types
require("./src/interface/HTMLIntrinsicElements");
require("./src/interface/SVGIntrinsicElements");
// typing for <st-fragment>
require("./src/interface/SpringTypeFragmentElementAttributes");
// typing for <st-slot>
require("./src/interface/SpringTypeSlotElementAttributes");
tslib_1.__exportStar(require("./src/interface/VirtualElement"), exports);
tslib_1.__exportStar(require("./src/constants"), exports);
tslib_1.__exportStar(require("./src/transformation/transformElementToVirtualElement"), exports);
tslib_1.__exportStar(require("./src/transformation/transformToFlatElementList"), exports);
tslib_1.__exportStar(require("./src/transformation/VirtualDOMTransformer"), exports);
tslib_1.__exportStar(require("./src/mutation/VirtualDOMMutator"), exports);
//# sourceMappingURL=index.js.map
});
___scope___.file("core/src/virtualdom/src/interface/HTMLIntrinsicElements.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=HTMLIntrinsicElements.js.map
});
___scope___.file("core/src/virtualdom/src/interface/TypedVirtualElementAttributes.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=TypedVirtualElementAttributes.js.map
});
___scope___.file("core/src/virtualdom/src/interface/VirtualElementGlobalEventHandlers.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=VirtualElementGlobalEventHandlers.js.map
});
___scope___.file("core/src/virtualdom/src/interface/SVGIntrinsicElements.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=SVGIntrinsicElements.js.map
});
___scope___.file("core/src/virtualdom/src/interface/SpringTypeFragmentElementAttributes.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=SpringTypeFragmentElementAttributes.js.map
});
___scope___.file("core/src/virtualdom/src/interface/SpringTypeSlotElementAttributes.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=SpringTypeSlotElementAttributes.js.map
});
___scope___.file("core/src/virtualdom/src/interface/VirtualElement.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=VirtualElement.js.map
});
___scope___.file("core/src/virtualdom/src/constants.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FRAGMENT_ELEMENT_TAG_NAME = 'st-fragment';
exports.SLOT_ELEMENT_TAG_NAME = 'st-slot';
exports.LIST_KEY_ATTRIBUTE_NAME = 'key';
//# sourceMappingURL=constants.js.map
});
___scope___.file("core/src/virtualdom/src/transformation/transformElementToVirtualElement.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformElementToVirtualElement = (element) => {
    const virtualAttributes = {};
    const virtualChildren = [];
    if (element.nodeType !== Node.TEXT_NODE) {
        if (element.attributes) {
            const attributes = Array.from(element.attributes);
            for (let i = 0; i < attributes.length; i++) {
                virtualAttributes[attributes[i].name] = attributes[i].value;
            }
        }
        if (element.childNodes) {
            for (let i = 0; i < element.childNodes.length; i++) {
                virtualChildren.push(exports.transformElementToVirtualElement(element.childNodes[i]));
            }
        }
        return {
            name: element.tagName.toLowerCase(),
            attributes: virtualAttributes,
            children: virtualChildren
        };
    }
    else {
        return element.textContent || '';
    }
};
//# sourceMappingURL=transformElementToVirtualElement.js.map
});
___scope___.file("core/src/virtualdom/src/transformation/transformToFlatElementList.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformToFlatElementList = (destination, tsx) => {
    if (Array.isArray(tsx)) {
        tsx.forEach(tsx => destination.push(tsx));
    }
    else {
        destination.push(tsx);
    }
};
//# sourceMappingURL=transformToFlatElementList.js.map
});
___scope___.file("core/src/virtualdom/src/transformation/VirtualDOMTransformer.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../../../logger");
const index_1 = require("../../index");
const lang_1 = require("../../../lang");
class VirtualDOMTransformer {
}
exports.VirtualDOMTransformer = VirtualDOMTransformer;
VirtualDOMTransformer.transformVirtualElementAttributes = (virtualElement) => {
    // transform attributes
    if (virtualElement.attributes) {
        const mutatedAttributes = {};
        for (let attributeName in virtualElement.attributes) {
            if (virtualElement.attributes.hasOwnProperty(attributeName)) {
                let mutatedAttributeName = attributeName;
                // 1. Transform React className -> class
                if (attributeName.toLowerCase() === 'classname') {
                    mutatedAttributeName = 'class';
                }
                mutatedAttributes[mutatedAttributeName] =
                    virtualElement.attributes[attributeName];
            }
        }
        virtualElement.attributes = mutatedAttributes;
    }
};
VirtualDOMTransformer.transformVirtualElementList = (parent, childrenDestination, list) => {
    for (let i = 0; i < list.length; i++) {
        if (typeof list[i] !== 'string' &&
            (!list[i].attributes || typeof list[i].attributes.key === 'undefined')) {
            logger_1.warn('The element ', parent, ' is a list (Array). Each entry in a list must have an unique "key" attribute like: key="$index". But ', list[i], 'is missing it.');
        }
        childrenDestination.push(list[i]);
    }
};
VirtualDOMTransformer.transformVirtualElementTree = lang_1.measureSpeed('transformVirtualElementTree', (virtualElement) => {
    if (typeof virtualElement === 'object') {
        VirtualDOMTransformer.transformVirtualElementAttributes(virtualElement);
        // make sure it's a true VirtualElement, not a text node and has children to walk thru
        if (virtualElement && virtualElement.children) {
            const nonFragmentChildren = [];
            // 1. Filter / aggregate elements that are not <st-fragment>'s
            for (let i = 0; i < virtualElement.children.length; i++) {
                const virtualElementChild = VirtualDOMTransformer.transformVirtualElementTree(virtualElement.children[i]);
                if (typeof virtualElementChild === 'object') {
                    if (virtualElementChild.name === index_1.FRAGMENT_ELEMENT_TAG_NAME &&
                        virtualElementChild.children && virtualElementChild.children.length) {
                        for (let j = 0; j < virtualElementChild.children.length; j++) {
                            // TODO: abstract logic
                            // flatten lists
                            if (Array.isArray(virtualElementChild.children[j])) {
                                VirtualDOMTransformer.transformVirtualElementList(virtualElement, nonFragmentChildren, virtualElementChild.children[j]);
                            }
                            else {
                                nonFragmentChildren.push(VirtualDOMTransformer.transformVirtualElementTree(virtualElementChild.children[j]));
                            }
                        }
                    }
                    else {
                        // flatten lists
                        if (Array.isArray(virtualElementChild)) {
                            VirtualDOMTransformer.transformVirtualElementList(virtualElement, nonFragmentChildren, virtualElementChild);
                        }
                        else {
                            nonFragmentChildren.push(virtualElementChild);
                        }
                    }
                }
                else {
                    nonFragmentChildren.push(virtualElementChild);
                }
            }
            virtualElement.children = nonFragmentChildren;
        }
    }
    return virtualElement;
});
//# sourceMappingURL=VirtualDOMTransformer.js.map
});
___scope___.file("core/src/virtualdom/src/mutation/VirtualDOMMutator.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
const renderer_1 = require("../../../renderer");
const isWebComponent_1 = require("../../../webcomponent/src/function/isWebComponent");
const lang_1 = require("../../../lang");
const FlowIdReflector_1 = require("../../../webcomponent/src/reflector/cross-instance/FlowIdReflector");
const SlotChildrenReflector_1 = require("../../../webcomponent/src/reflector/cross-instance/SlotChildrenReflector");
class VirtualDOMMutator {
}
exports.VirtualDOMMutator = VirtualDOMMutator;
VirtualDOMMutator.cacheSlotChildren = (virtualElement, domElement) => {
    // in case a WebComponent is found, all virtual children are assigned to it's DOM element
    // so they can be assigned to <st-slot> elements inside (general purpose <slot> polyfill)
    if (virtualElement && domElement &&
        virtualElement.children && virtualElement.children.length &&
        isWebComponent_1.isWebComponent(virtualElement.name)) {
        SlotChildrenReflector_1.SlotChildrenReflector.set(domElement, virtualElement.children);
    }
};
VirtualDOMMutator.getSlotChildrenFromParentTree = (domElement) => {
    let slotChildren = SlotChildrenReflector_1.SlotChildrenReflector.get(domElement);
    if (slotChildren && slotChildren.length) {
        return slotChildren;
    }
    else if (domElement.parentNode && (FlowIdReflector_1.FlowIdReflector.has(domElement.parentNode) ||
        isWebComponent_1.isWebComponent(domElement.parentNode.tagName))) {
        return VirtualDOMMutator.getSlotChildrenFromParentTree(domElement.parentNode);
    }
    return slotChildren;
};
VirtualDOMMutator.mutateSlotElement = (parent, virtualElement) => {
    if (parent) {
        const slotChildren = VirtualDOMMutator.getSlotChildrenFromParentTree(parent);
        if (slotChildren) {
            const filteredSlotChildren = [];
            // iterate slot children
            for (let s = 0; s < slotChildren.length; s++) {
                const slotChild = slotChildren[s];
                const slotName = virtualElement.attributes ? virtualElement.attributes.name : undefined;
                if (typeof slotChild !== 'string') {
                    const slotSelectionName = slotChild.attributes ? slotChild.attributes['slot'] : undefined;
                    // in case the <st-slot> has a name="?" attribute and the slotChild has a slot="?" attribute,
                    // the slotChild is only allowed to be slotted here, if the name matches
                    if (slotName) {
                        if (slotName === slotSelectionName) {
                            filteredSlotChildren.push(...slotChild.children);
                        }
                    }
                    else if (!slotSelectionName) {
                        // in case of <slot> without name and no slot name selection
                        filteredSlotChildren.push(...slotChild.children);
                    }
                }
                else {
                    // no slot name based selection possible as it is a TextNode
                    filteredSlotChildren.push(...slotChild);
                }
            }
            // set slot children only if they match, otherwise fallback to default content
            if (filteredSlotChildren && filteredSlotChildren.length) {
                virtualElement.children = filteredSlotChildren;
            }
        }
    }
};
VirtualDOMMutator.mutateSlotChildrenElement = (domElement) => {
    // clean implicitly created elements space (slot target itself)
    domElement.childNodes.forEach((node) => {
        domElement.removeChild(node);
    });
};
VirtualDOMMutator.mutateElementTree = lang_1.memoize((domElements, virtualElements, parent, flowId) => {
    // length to walk is the bigger number of both lists (reality in DOM vs. virtual DOM)
    let maxLength = domElements.length > virtualElements.length ?
        domElements.length : virtualElements.length;
    // walk through max. possible  differences on this level of the subtree
    for (let i = 0; i < maxLength; i++) {
        // removeChild() called before and end of similarities is logically reached
        if (!virtualElements[i] && !domElements[i]) {
            break;
        }
        let domElement = domElements[i];
        if (typeof virtualElements[i] === 'object') {
            VirtualDOMMutator.mutateElement(parent, domElement, virtualElements[i], flowId);
        }
        else {
            VirtualDOMMutator.mutateTextNode(parent, domElement, virtualElements[i], flowId);
        }
    }
}, [3 /* ignore flowId in memorization check */]);
VirtualDOMMutator.mutateElement = (parent, domElement, virtualElement, flowId) => {
    // mutation result states (apart from atomic attribute changes)
    let created = false;
    let replaced = false;
    if (virtualElement && virtualElement.attributes && virtualElement.attributes.slot) {
        VirtualDOMMutator.mutateSlotChildrenElement(domElement);
        // ignore further rendering here; this gonna be rendered somewhere else
        return;
    }
    if (virtualElement && virtualElement.name === index_1.SLOT_ELEMENT_TAG_NAME) {
        // Apply <st-slot> transformation
        VirtualDOMMutator.mutateSlotElement(parent, virtualElement);
    }
    // TODO: Inform web component and hook lifecycle like @OnSlotChildrenPrepared
    // mutation options per child element on each level:
    if (!virtualElement && domElement) {
        // DOMElement existing but no such VirtualElement: Evict zombie node
        parent.removeChild(domElement);
    }
    else if (virtualElement && !domElement) {
        // VirtualElement exists but no DOMElement: Append node
        domElement = renderer_1.getRenderer().createNativeElement(virtualElement, flowId);
        created = true;
        VirtualDOMMutator.cacheSlotChildren(virtualElement, domElement);
        // this.updateAllAttributeEventListeners(virtualElement, domElement);
        // VirtualElement exists but no DOMElement: Append node
        parent.appendChild(domElement);
    }
    else if (virtualElement && domElement &&
        ((domElement.tagName || '').toUpperCase() !== virtualElement.name.toUpperCase())) {
        // DOMElement and VirtualElement existing but tagName differs: Replace node
        // also: DOMElement is a TextNode (typeof tagName == 'undefined') but VirtualElement is not
        // tag name differs, replace node
        parent.removeChild(domElement);
        domElement = renderer_1.getRenderer().createNativeElement(virtualElement, flowId);
        created = true;
        VirtualDOMMutator.cacheSlotChildren(virtualElement, domElement);
        // this.updateAllAttributeEventListeners(virtualElement, domElement);
        parent.appendChild(domElement);
    }
    else {
        // DOMElement and VirtualElement are the same on index and tagName
        // but attributes might differ: May update attributes
        // this.updateAllAttributeEventListeners(virtualElement, domElement);
        // DOMElement might have attributes that differ from VirtualElement attributes
        // Replace attribute value then
        if (domElement.attributes) {
            const attributes = Array.from(domElement.attributes);
            for (let a = 0; a < attributes.length; a++) {
                const attributeName = attributes[a].name;
                if (!attributeName.startsWith('on')) {
                    if (!virtualElement.attributes || !virtualElement.attributes[attributeName]) {
                        // DOMElement has an attribute that doesn't exist on VirtualElement attributes anymore
                        domElement.removeAttribute(attributeName);
                    }
                    else if (domElement.getAttribute(attributeName) !== virtualElement.attributes[attributeName].toString()) {
                        if (attributeName === index_1.LIST_KEY_ATTRIBUTE_NAME) {
                            const domElementReplacement = renderer_1.getRenderer().createNativeElement(virtualElement, flowId);
                            replaced = true;
                            VirtualDOMMutator.cacheSlotChildren(virtualElement, domElementReplacement);
                            // this.updateAllAttributeEventListeners(virtualElement, domElementReplacement);
                            parent.replaceChild(domElementReplacement, domElement);
                        }
                        else {
                            // DOMElement attribute value differs from VirtualElement attribute: Update
                            domElement.setAttribute(attributeName, virtualElement.attributes[attributeName]);
                        }
                    }
                }
            }
        }
        // VirtualElement might have additional attributes, DOMElement doesn't have atm
        if (!replaced && virtualElement.attributes) {
            // update attributes
            for (let attributeName in virtualElement.attributes) {
                if (virtualElement.attributes.hasOwnProperty(attributeName) &&
                    !domElement.hasAttribute(attributeName) && !attributeName.startsWith('on')) {
                    // DOMElement attribute value differs from VirtualElement attribute: Set
                    domElement.setAttribute(attributeName, virtualElement.attributes[attributeName]);
                }
            }
        }
    }
    // process children (recursion)
    // optimization: If freshly created, all children are already perfectly rendered
    // so no need to walk through all child nodes
    if ((!created && !replaced) || isWebComponent_1.isWebComponent(virtualElement.name)) {
        // parent elements must be both existing
        if (domElement && virtualElement &&
            // and at least the existing DOM subtree
            // or the virtual DOM subtree must be given
            ((domElement.childNodes && domElement.childNodes.length) ||
                (virtualElement.children && virtualElement.children.length))) {
            // recursive call with childNodes and virtualElement childNodes
            VirtualDOMMutator.mutateElementTree(domElement.childNodes || [], virtualElement.children, domElement, flowId);
        }
    }
};
VirtualDOMMutator.mutateTextNode = (parent, domElement, virtualElementTextContent, flowId) => {
    // text node content
    if (typeof virtualElementTextContent == 'undefined' && domElement) {
        // DOMElement existing but no such VirtualElement: Evict zombie node
        parent.removeChild(domElement);
    }
    else if (virtualElementTextContent && !domElement) {
        // VirtualElement exists but no DOMElement: Append node
        if (parent.nodeType === Node.TEXT_NODE) {
            parent.textContent += virtualElementTextContent;
        }
        else {
            parent.appendChild(renderer_1.getRenderer().createNativeTextNode(virtualElementTextContent, flowId));
        }
    }
    else if (virtualElementTextContent && domElement) {
        // TextNode is present on both sides but content might differ
        // update innerText
        if (domElement.nodeType === Node.TEXT_NODE) {
            // DOMElement remains being a TextNode
            // ...but has changed: Reflect the change
            if (domElement.textContent !== virtualElementTextContent) {
                domElement.textContent = virtualElementTextContent;
            }
        }
        else {
            // VirtualElement is a TextNode now but DOMElement is not: remove and replace
            parent.removeChild(domElement);
            parent.appendChild(renderer_1.getRenderer().createNativeTextNode(virtualElementTextContent, flowId));
        }
    }
};
//# sourceMappingURL=VirtualDOMMutator.js.map
});
___scope___.file("core/src/webcomponent/src/function/isWebComponent.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const WebComponentReflector_1 = require("../WebComponentReflector");
exports.isWebComponent = (tagName) => typeof WebComponentReflector_1.WebComponentReflector.getByTagName(tagName) != undefined;
//# sourceMappingURL=isWebComponent.js.map
});
___scope___.file("core/src/webcomponent/src/WebComponentReflector.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("../../di");
const TAG_NAME = 'TAG_NAME';
const WEB_COMPONENTS_REGISTERED = 'WEB_COMPONENTS_REGISTERED';
class WebComponentReflector {
    static getTagName(component) {
        return Reflect.get(component, TAG_NAME);
    }
    static setTagName(component, tagName) {
        Reflect.set(component, TAG_NAME, tagName);
    }
    static registerByTagName(tagName, component) {
        const registeredWebComponents = WebComponentReflector.getAll();
        registeredWebComponents[tagName.toUpperCase()] = component;
        di_1.ApplicationContext.setGlobal(WEB_COMPONENTS_REGISTERED, registeredWebComponents);
    }
    static getByTagName(tagName) {
        if (!tagName)
            tagName = '';
        const registeredWebComponents = WebComponentReflector.getAll();
        return registeredWebComponents[tagName.toUpperCase()];
    }
    static getAll() {
        return di_1.ApplicationContext.getGlobal(WEB_COMPONENTS_REGISTERED) || {};
    }
}
exports.WebComponentReflector = WebComponentReflector;
//# sourceMappingURL=WebComponentReflector.js.map
});
___scope___.file("core/src/webcomponent/src/interface/RegisteredWebComponents.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=RegisteredWebComponents.js.map
});
___scope___.file("core/src/webcomponent/src/reflector/cross-instance/FlowIdReflector.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../../../di/index");
class FlowIdReflector extends index_1.AbstractWeakMapReflector {
    static get REFLECTOR_NAME() {
        return 'FlowIdReflector';
    }
    ;
    static set(node, id) {
        return super.set(node, id);
    }
    static get(node) {
        return super.get(node) || -1;
    }
    static has(node) {
        return super.has(node);
    }
}
exports.FlowIdReflector = FlowIdReflector;
//# sourceMappingURL=FlowIdReflector.js.map
});
___scope___.file("core/src/webcomponent/src/reflector/cross-instance/SlotChildrenReflector.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../../../di/index");
class SlotChildrenReflector extends index_1.AbstractWeakMapReflector {
    static get REFLECTOR_NAME() {
        return 'SlotChildrenReflector';
    }
    ;
    static set(node, slotChildren) {
        return super.set(node, slotChildren);
    }
    static get(node) {
        return super.get(node) || [];
    }
    static has(node) {
        return super.has(node);
    }
}
exports.SlotChildrenReflector = SlotChildrenReflector;
//# sourceMappingURL=SlotChildrenReflector.js.map
});
___scope___.file("core/src/renderer/index.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./src/decorator/Renderer"), exports);
tslib_1.__exportStar(require("./src/interface/RendererConfig"), exports);
tslib_1.__exportStar(require("./src/enum/RendererImplType"), exports);
tslib_1.__exportStar(require("./src/context/renderer"), exports);
tslib_1.__exportStar(require("./src/function/injectScript"), exports);
tslib_1.__exportStar(require("./src/function/injectStyleSheet"), exports);
//# sourceMappingURL=index.js.map
});
___scope___.file("core/src/renderer/src/decorator/Renderer.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const renderer_1 = require("../context/renderer");
function Renderer(rendererConfig) {
    // called with @AppRenderer() or @AppRenderer({})
    if (!(typeof rendererConfig === 'function')) {
        return (target) => {
            renderer_1.setRenderer(rendererConfig);
            return target;
        };
    }
}
exports.Renderer = Renderer;
let DefaultRenderer = class DefaultRenderer {
};
DefaultRenderer = tslib_1.__decorate([
    Renderer({})
], DefaultRenderer);
//# sourceMappingURL=Renderer.js.map
});
___scope___.file("core/src/renderer/src/interface/RendererConfig.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=RendererConfig.js.map
});
___scope___.file("core/src/renderer/src/interface/RendererImpl.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=RendererImpl.js.map
});
___scope___.file("core/src/renderer/src/impl/tsx-to-html-renderer-impl/interface/Namespace.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=Namespace.js.map
});
___scope___.file("core/src/renderer/src/impl/TSXToHTMLRendererImpl.js", function(exports, require, module){
"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
"use strict";
const index_1 = require("../../../index");
const parseAttributeNS_1 = require("./tsx-to-html-renderer-impl/function/parseAttributeNS");
const collectNamespaceAttributes_1 = require("./tsx-to-html-renderer-impl/function/collectNamespaceAttributes");
const getInternalRenderApi_1 = require("../function/getInternalRenderApi");
const FlowIdReflector_1 = require("../../../webcomponent/src/reflector/cross-instance/FlowIdReflector");
const constants_1 = require("./tsx-to-html-renderer-impl/constants");
let TSXToHTMLRendererImpl = class TSXToHTMLRendererImpl {
    constructor(activeLogger) {
        this.activeLogger = activeLogger;
        /**
         * WebComponent observeAttributes observeAttributes heap cache.
         * Global cache. Used for intermediate value transmission.
         * Memory is freed directly after the atomic transmission
         * operation (DOM -> WebComponent JS instance) has ended.
         */
        this.attributeValueCache = {};
        /**
         * Constantly incremented sequence to address a certain attribute
         * observeAttributes in transmission between DOM and WebComponent JS instance.
         */
        this.attributeValueSequence = 0;
        /**
         * Original DOM/native createElement implementation reference.
         */
        this._createDOMElement = document.createElement.bind(document);
        this._createDOMElementNS = document.createElementNS.bind(document);
        this.generateUniqueAttributeValueId = () => {
            return 'attr-' + (++window.ActiveRenderer.attributeValueSequence);
        };
        this.appendChild = (child, element) => {
            let childToAppend = child;
            if (child instanceof Node) {
                childToAppend = child;
            }
            else if (typeof child == 'string' ||
                typeof child == 'number' ||
                typeof child == 'boolean') {
                childToAppend = document.createTextNode(child.toString());
            }
            if (childToAppend instanceof Node) {
                return element.appendChild(childToAppend);
            }
        };
        this.render = (virtualElementOrTagName, level = 0, namespaces = [], flowId = -1) => {
            let name = typeof virtualElementOrTagName === 'string' ? virtualElementOrTagName : virtualElementOrTagName.name;
            let attributes = virtualElementOrTagName.attributes || {};
            let children = virtualElementOrTagName.children || [];
            const nativeOptions = !!attributes.is ? { is: attributes.is } : undefined;
            delete attributes.is;
            const namespaceAttributes = collectNamespaceAttributes_1.collectNamespaceAttributes(attributes, namespaces);
            // 0. add all namespaces
            namespaces = namespaceAttributes.xmlNs;
            const element = this.createDOMElement(name, namespaces, nativeOptions);
            // ...and apply common flow process id (subtree re-flow identifier)
            FlowIdReflector_1.FlowIdReflector.set(element, flowId);
            // 1. add all bindings
            namespaceAttributes.injections.forEach((attribute) => {
                const scope = attribute.value;
                for (let injectionFieldName in scope) {
                    if (scope.hasOwnProperty(injectionFieldName)) {
                        const view = scope[injectionFieldName];
                        // setting the value of the st-inject
                        // (element instance) on the web component
                        // (injection target) with the name provided
                        // as object key name in st-inject
                        //
                        // for example: <p st-inject={{ paragraph1: view }}></p>
                        //
                        // view is an instance of SomeWebComponentInstance:
                        //
                        // class SomeWebComponentInstance {
                        //     constructor(protected paragraph1: HTMLParagraphElement) {
                        //         super();
                        //     }
                        //
                        //     onFlow(initial: boolean) {
                        //         console.log('');
                        //     }
                        // }
                        //
                        // We're setting view['paragraph1'] as the <p>-element instance reference here.
                        view[injectionFieldName] = element;
                    }
                }
            });
            // 2. add all events
            namespaceAttributes.event.forEach(([eventName, callback]) => {
                const eventListener = callback;
                //ElementEventListenersReflector.setEventListener(element, eventName, eventListener);
                element.addEventListener(eventName, eventListener);
            });
            // 3. reference JS objects to properties heap cache (to de-reference them later and fetch the JS object again)
            namespaceAttributes.property.forEach((attribute) => {
                const attributeValueId = this.generateUniqueAttributeValueId();
                this.attributeValueCache[attributeValueId] = attribute.value;
                this.setAttribute(element, {
                    name: attribute.name,
                    value: attributeValueId
                }, namespaces);
            });
            // 4. add html stuff
            namespaceAttributes.html.forEach((attribute) => {
                this.setAttribute(element, attribute, namespaces);
            });
            // 5. log error if attribute is not mappable
            namespaceAttributes.other.forEach((attribute) => {
                this.activeLogger.error(`Attribute(${attribute.name}) on element ${name} cannot be mapped.`, attribute.value);
            });
            children.filter(child => !(child == null || typeof child == 'undefined')).forEach((child) => {
                // child: string | number | boolean | Node | Array<Node>
                const append = (child) => {
                    const _append = (child, element) => {
                        const childType = typeof child;
                        if (childType == 'string' ||
                            childType == 'number' ||
                            childType == 'boolean' ||
                            child instanceof Node) {
                            this.appendChild(child, element);
                        }
                        else {
                            element.appendChild(this.render(child, level + 1, namespaces, flowId));
                        }
                    };
                    // <st-fragment> found in sub-tree
                    if (child.name === index_1.FRAGMENT_ELEMENT_TAG_NAME) {
                        // just don't render fragments, place their children one level up
                        if (child.children) {
                            child.children.forEach((childOfChild) => {
                                _append(childOfChild, element);
                            });
                        }
                    }
                    else {
                        _append(child, element);
                    }
                };
                if (child instanceof Array) {
                    child.filter(child => !(child == null || typeof child == 'undefined'))
                        .forEach(child => append(child));
                }
                else {
                    append(child);
                }
            });
            return element;
        };
        this.init();
    }
    cleanCaches() {
        this.attributeValueCache = {};
        this.attributeValueSequence = 0;
    }
    init() {
        // tsconfig.json tsx -> preserve
        // implement React TSX rendering API
        // (used globally by TypeScript compiler --jsx emitted code)
        window.ActiveRenderer = this;
        // assign at global scope for the native DOM functions to instantiate
        // WebComponents using this TSX renderer
        document.createElement = getInternalRenderApi_1.getInternalRenderApi().render.bind(getInternalRenderApi_1.getInternalRenderApi().createElement.bind((getInternalRenderApi_1.getInternalRenderApi())));
    }
    createNativeElement(virtualElementOrString, flowId) {
        return window.ActiveRenderer.render(virtualElementOrString, 0, [], flowId);
    }
    createNativeTextNode(data, flowId) {
        const textNode = document.createTextNode(data);
        FlowIdReflector_1.FlowIdReflector.set(textNode, flowId);
        return textNode;
    }
    createDOMElement(tagName, namespaces = [], nativeOptions) {
        const namespaceAttribute = parseAttributeNS_1.parseAttributeNS(tagName);
        const namespaceTagName = namespaceAttribute.name;
        if (namespaceAttribute.found) {
            const namespace = namespaces.find((ns) => namespaceAttribute.ns === ns.name);
            if (namespace) {
                return this._createDOMElementNS(namespace.value, namespaceTagName, nativeOptions);
            }
            this.activeLogger.error("No namespace found for attribute ", namespaceAttribute.ns, namespaceAttribute);
            return this._createDOMElementNS(null, namespaceTagName, nativeOptions);
        }
        const defaultNamespace = namespaces.find((ns) => constants_1.DEFAULT_NAMESPACE_NAME === ns.name);
        if (defaultNamespace) {
            return this._createDOMElementNS(defaultNamespace.value, namespaceTagName, nativeOptions);
        }
        else {
            return this._createDOMElement(namespaceTagName, nativeOptions);
        }
    }
    ;
    setAttribute(element, attribute, namespaces) {
        const namespaceAttribute = parseAttributeNS_1.parseAttributeNS(attribute.name);
        const attributeName = namespaceAttribute.name;
        if (namespaceAttribute.found || namespaces.length > 0) {
            const namespace = namespaces
                .find((ns) => namespaceAttribute.ns != undefined && namespaceAttribute.ns.startsWith(ns.name));
            if (namespace) {
                element.setAttributeNS(namespace.value, attributeName, attribute.value);
            }
            else {
                element.setAttributeNS(null, attributeName, attribute.value);
            }
        }
        else {
            element.setAttribute(attributeName, attribute.value);
        }
    }
    ;
    createElement(name, attributes, ...children) {
        return {
            name: name,
            attributes: attributes,
            children: children
        };
    }
    ;
};
TSXToHTMLRendererImpl = tslib_1.__decorate([
    index_1.Component,
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof index_1.ActiveLogger !== "undefined" && index_1.ActiveLogger) === "function" ? _a : Object])
], TSXToHTMLRendererImpl);
exports.TSXToHTMLRendererImpl = TSXToHTMLRendererImpl;
//# sourceMappingURL=TSXToHTMLRendererImpl.js.map
});
___scope___.file("core/src/renderer/src/impl/tsx-to-html-renderer-impl/function/parseAttributeNS.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const lang_1 = require("../../../../../lang");
const NS_INDICATOR_ATTRIBUTES = [
    'xmlnsXlink',
    'xmlnsSvgjs',
    'xlinkHref',
    'xlinkActuate',
    'xlinkArcrole',
    'xlinkRole',
    'xlinkShow',
    'xlinkTitle',
    'xlinkType',
    'xmlBase',
    'xmlLang',
    'xmlSpace',
];
exports.parseAttributeNS = (name) => {
    if (!!name && NS_INDICATOR_ATTRIBUTES.indexOf(name) > -1) {
        const nsParts = lang_1.CaseTransformer.camelCaseToColonCase(name).split(constants_1.DEFAULT_NAMESPACE_DELIMITER)
            .filter(nsPart => !!nsPart);
        if (nsParts.length == 2) {
            return {
                found: true,
                name: nsParts[1],
                ns: nsParts[2]
            };
        }
    }
    return {
        found: false,
        name: name
    };
};
//# sourceMappingURL=parseAttributeNS.js.map
});
___scope___.file("core/src/renderer/src/impl/tsx-to-html-renderer-impl/interface/NamespaceAttributesMap.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=NamespaceAttributesMap.js.map
});
___scope___.file("core/src/renderer/src/impl/tsx-to-html-renderer-impl/function/collectNamespaceAttributes.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../constants");
const CaseTransformer_1 = require("../../../../../lang/src/string/CaseTransformer");
const parseAttributeNS_1 = require("./parseAttributeNS");
exports.collectNamespaceAttributes = (attributes, knownNamespaces) => {
    let collectedNamespaceAttributes = [];
    // 0. transform TSX attribute names (like: "className") back to standard attribute names ("class")
    const transformedAttributes = Object.entries(attributes)
        .map(([name, value]) => ({
        name,
        value
    }));
    // 0.1 collect all possible namespace attributes
    // order required
    // 1. filter all namespaces
    const rawXmlNs = transformedAttributes.filter((attribute) => attribute.name.indexOf(constants_1.DEFAULT_NAMESPACE_NAME) == 0);
    // 1.1 get namespace values
    const xmlNs = knownNamespaces.concat(rawXmlNs
        .map((attribute) => {
        if (parseAttributeNS_1.parseAttributeNS(attribute.name).found) {
            return {
                name: CaseTransformer_1.CaseTransformer.camelCaseToColonCase(attribute.name)
                    .split(constants_1.DEFAULT_NAMESPACE_DELIMITER).filter(s => !!s).pop() || '',
                value: attribute.value
            };
        }
        else {
            return {
                name: attribute.name.split(constants_1.DEFAULT_NAMESPACE_DELIMITER).filter(s => !!s).pop() || '',
                value: attribute.value
            };
        }
    })
        .filter((attrib) => !!attrib.name));
    collectedNamespaceAttributes = collectedNamespaceAttributes.concat(rawXmlNs);
    // 3. filter all DOM element injections
    const injections = transformedAttributes
        .filter(e => collectedNamespaceAttributes.indexOf(e) < 0)
        .filter((attribute) => constants_1.DOM_ELEMENT_INJECT_ATTRIBUTE_NAME === attribute.name);
    collectedNamespaceAttributes = collectedNamespaceAttributes.concat(injections);
    // 4. filter all events
    let event = transformedAttributes
        .filter(e => collectedNamespaceAttributes.indexOf(e) < 0)
        .filter((attribute) => attribute.name.startsWith('on') &&
        typeof attribute.value === 'function');
    collectedNamespaceAttributes = collectedNamespaceAttributes.concat(event);
    // 5. filter all properties
    const property = transformedAttributes
        .filter(e => collectedNamespaceAttributes.indexOf(e) < 0)
        .filter((attribute) => typeof attribute.value !== 'string' &&
        typeof attribute.value !== 'number' &&
        typeof attribute.value !== 'boolean');
    collectedNamespaceAttributes = collectedNamespaceAttributes.concat(property);
    // 6. filter all html
    const html = transformedAttributes
        .filter(e => collectedNamespaceAttributes.indexOf(e) < 0)
        .filter((attribute) => typeof attribute.value === 'string' ||
        typeof attribute.value === 'number' ||
        typeof attribute.value === 'boolean');
    collectedNamespaceAttributes = collectedNamespaceAttributes.concat(html);
    return {
        injections: injections,
        xmlNs: xmlNs,
        event: event.map((attribute) => ([
            attribute.name.substring(2, attribute.name.length).toLowerCase(), attribute.value
        ])),
        property: property,
        html: html,
        other: transformedAttributes.filter(e => collectedNamespaceAttributes.indexOf(e) < 0)
    };
};
//# sourceMappingURL=collectNamespaceAttributes.js.map
});
___scope___.file("core/src/renderer/src/impl/tsx-to-html-renderer-impl/interface/Attribute.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=Attribute.js.map
});
___scope___.file("core/src/renderer/src/impl/tsx-to-html-renderer-impl/interface/RuntimeDOMAttributeCacheMap.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=RuntimeDOMAttributeCacheMap.js.map
});
___scope___.file("core/src/renderer/src/impl/tsx-to-html-renderer-impl/interface/NamespaceAttribute.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
;
//# sourceMappingURL=NamespaceAttribute.js.map
});
___scope___.file("core/src/renderer/src/function/getInternalRenderApi.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInternalRenderApi = () => {
    return window.ActiveRenderer;
};
//# sourceMappingURL=getInternalRenderApi.js.map
});
___scope___.file("core/src/renderer/src/impl/tsx-to-html-renderer-impl/constants.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_NAMESPACE_DELIMITER = ':';
exports.DEFAULT_NAMESPACE_NAME = 'xmlns';
exports.DOM_ELEMENT_INJECT_ATTRIBUTE_NAME = 'st-inject';
//# sourceMappingURL=constants.js.map
});
___scope___.file("core/src/renderer/src/enum/RendererImplType.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RendererImplType;
(function (RendererImplType) {
    RendererImplType["TSX"] = "TSX";
})(RendererImplType = exports.RendererImplType || (exports.RendererImplType = {}));
//# sourceMappingURL=RendererImplType.js.map
});
___scope___.file("core/src/renderer/src/context/renderer.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("../../../di");
const defaultRendererConfig_1 = require("../defaultRendererConfig");
const getRendererImplInstance_1 = require("../function/getRendererImplInstance");
const RENDERER = 'RENDERER';
exports.getRenderer = () => {
    let rendererImpl = di_1.ApplicationContext.getInstance().get(RENDERER);
    // @Renderer(...) not used in application
    if (!rendererImpl) {
        exports.setRenderer(defaultRendererConfig_1.defaultRendererConfig);
    }
    return di_1.ApplicationContext.getInstance().get(RENDERER);
};
exports.setRenderer = (appRendererConfig) => {
    di_1.ApplicationContext.getInstance().set(RENDERER, getRendererImplInstance_1.getRendererImplInstance(appRendererConfig));
};
exports.ActiveRenderer = exports.getRenderer();
//# sourceMappingURL=renderer.js.map
});
___scope___.file("core/src/renderer/src/defaultRendererConfig.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RendererImplType_1 = require("./enum/RendererImplType");
exports.defaultRendererConfig = {
    type: RendererImplType_1.RendererImplType.TSX
};
//# sourceMappingURL=defaultRendererConfig.js.map
});
___scope___.file("core/src/renderer/src/function/getRendererImplInstance.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RendererImplType_1 = require("../enum/RendererImplType");
const TSXToHTMLRendererImpl_1 = require("../impl/TSXToHTMLRendererImpl");
const di_1 = require("../../../di");
exports.getRendererImplInstance = (rendererConfig) => {
    let rendererImpl;
    // custom impl provided via config
    if (rendererConfig.impl) {
        rendererImpl = rendererConfig.impl;
    }
    else {
        // using standard implementation
        switch (rendererConfig.type) {
            default:
            case RendererImplType_1.RendererImplType.TSX:
                rendererImpl = di_1.ApplicationContext.getInstance().getBean(TSXToHTMLRendererImpl_1.TSXToHTMLRendererImpl);
                break;
        }
    }
    return rendererImpl;
};
//# sourceMappingURL=getRendererImplInstance.js.map
});
___scope___.file("core/src/renderer/src/function/injectScript.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.injectScript = (src, name) => {
    return new Promise((resolve) => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = src;
        // internet explorer
        if (script.readyState) {
            script.onreadystatechange = () => {
                if (script.readyState === "loaded" || script.readyState === "complete") {
                    script.onreadystatechange = null;
                    resolve({ script: name, loaded: true, status: 'Loaded' });
                }
            };
        }
        else {
            script.onload = () => {
                resolve({ script: name, loaded: true, status: 'Loaded' });
            };
        }
        script.onerror = (error) => resolve({ script: name, loaded: false, status: 'Loaded' });
        document.getElementsByTagName('head')[0].appendChild(script);
    });
};
//# sourceMappingURL=injectScript.js.map
});
___scope___.file("core/src/renderer/src/function/injectStyleSheet.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.injectStyleSheet = (href, name) => {
    return new Promise((resolve) => {
        const stylesheet = document.createElement('link');
        stylesheet.rel = 'stylesheet';
        stylesheet.href = href;
        // internet explorer
        if (stylesheet.readyState) {
            stylesheet.onreadystatechange = () => {
                if (stylesheet.readyState === "loaded" || stylesheet.readyState === "complete") {
                    stylesheet.onreadystatechange = null;
                    resolve({ stylesheet: name, loaded: true, status: 'Loaded' });
                }
            };
        }
        else {
            stylesheet.onload = () => {
                resolve({ stylesheet: name, loaded: true, status: 'Loaded' });
            };
        }
        stylesheet.onerror = (error) => resolve({ stylesheet: name, loaded: false, status: 'Loaded' });
        document.getElementsByTagName('head')[0].appendChild(stylesheet);
    });
};
//# sourceMappingURL=injectStyleSheet.js.map
});
___scope___.file("core/src/tss/index.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./src/CSSDeclarationBlockGenerator"), exports);
tslib_1.__exportStar(require("./src/CSSInlineStyleGenerator"), exports);
tslib_1.__exportStar(require("./src/decorator/Theme"), exports);
tslib_1.__exportStar(require("./src/constant/HOST_SELECTOR"), exports);
tslib_1.__exportStar(require("./src/interface/StyleFunction"), exports);
tslib_1.__exportStar(require("./src/interface/TypedStyleSheet"), exports);
tslib_1.__exportStar(require("./src/interface/TemplateStringStyleSheet"), exports);
tslib_1.__exportStar(require("./src/context/theme"), exports);
//# sourceMappingURL=index.js.map
});
___scope___.file("core/src/tss/src/CSSDeclarationBlockGenerator.jsx", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lang_1 = require("../../lang");
const renderer_1 = require("../../renderer");
class CSSDeclarationBlockGenerator {
    static generate(declaration) {
        const generateDeclaration = (declaration, mediaQuery = false) => {
            let styles = '';
            // support for template-string based stylesheets
            if (typeof declaration === 'string') {
                return declaration;
            }
            for (let selector in declaration) {
                if (declaration.hasOwnProperty(selector)) {
                    if (selector.indexOf('@') === 0) {
                        styles = `${styles}\n\n${selector} {${generateDeclaration(declaration[selector], true)}    \n}\n\n`;
                    }
                    else {
                        let styleMapping = '';
                        for (let property in declaration[selector]) {
                            if (declaration[selector].hasOwnProperty(property)) {
                                if (typeof declaration[selector] === 'string') {
                                    // support for template-string based block styles
                                    styleMapping = declaration[selector];
                                }
                                else {
                                    let styleValue = declaration[selector][property];
                                    // uniform to array (multiple values for one CSS property)
                                    if (!Array.isArray(styleValue)) {
                                        styleValue = [styleValue];
                                    }
                                    for (let i = 0; i < styleValue.length; i++) {
                                        styleMapping = `${styleMapping}\n    ${mediaQuery ? '    ' : ''}${lang_1.CaseTransformer.camelToKebabCase(property) // selector
                                        }: ${styleValue[i]};`;
                                    }
                                }
                            }
                        }
                        styles = `${styles} \n\n${mediaQuery ? '    ' : ''}${selector} {\n${mediaQuery ? '        ' : '    '}${styleMapping}\n${mediaQuery ? '    ' : ''}}`;
                    }
                }
            }
            return styles;
        };
        return renderer_1.ActiveRenderer.createElement("style", { type: "text/css" }, generateDeclaration(declaration));
    }
}
exports.CSSDeclarationBlockGenerator = CSSDeclarationBlockGenerator;
//# sourceMappingURL=CSSDeclarationBlockGenerator.js.map
});
___scope___.file("core/src/tss/src/CSSInlineStyleGenerator.jsx", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HOST_SELECTOR_1 = require("./constant/HOST_SELECTOR");
const lang_1 = require("../../lang");
class CSSInlineStyleGenerator {
    static generateForStyleAttribute(declaration) {
        const inlineStyles = {};
        for (let selector in declaration) {
            if (selector === HOST_SELECTOR_1.HOST_SELECTOR) {
                // support for template-string based styling
                if (typeof declaration[selector] === 'string') {
                    return declaration[selector];
                }
                for (let identifier in declaration[selector]) {
                    inlineStyles[lang_1.CaseTransformer.camelToKebabCase(identifier)] = declaration[selector][identifier];
                }
            }
        }
        return inlineStyles;
    }
}
exports.CSSInlineStyleGenerator = CSSInlineStyleGenerator;
//# sourceMappingURL=CSSInlineStyleGenerator.js.map
});
___scope___.file("core/src/tss/src/decorator/Theme.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const theme_1 = require("../context/theme");
function Theme(theme) {
    // called with @Theme() or @Theme({ ... })
    if (!(typeof theme === 'function')) {
        return (target) => {
            theme_1.setTheme(target, theme);
            return target;
        };
    }
}
exports.Theme = Theme;
//# sourceMappingURL=Theme.js.map
});
___scope___.file("core/src/tss/src/constant/HOST_SELECTOR.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// see: https://developer.mozilla.org/en-US/docs/Web/CSS/:host()
exports.HOST_SELECTOR = ':host';
//# sourceMappingURL=HOST_SELECTOR.js.map
});
___scope___.file("core/src/tss/src/interface/StyleFunction.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=StyleFunction.js.map
});
___scope___.file("core/src/tss/src/interface/TypedStyleSheet.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=TypedStyleSheet.js.map
});
___scope___.file("core/src/tss/src/interface/TypedCSSStyleDeclaration.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=TypedCSSStyleDeclaration.js.map
});
___scope___.file("core/src/tss/src/interface/TemplateStringStyleSheet.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=TemplateStringStyleSheet.js.map
});
___scope___.file("core/src/tss/src/context/theme.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("../../../di");
const THEME = "THEME";
exports.setTheme = (prototype, theme) => {
    di_1.ApplicationContext.getInstance().set(THEME, theme);
};
exports.getTheme = () => di_1.ApplicationContext.getInstance().get(THEME);
//# sourceMappingURL=theme.js.map
});
___scope___.file("core/src/cd/index.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./src/decorator/Field"), exports);
tslib_1.__exportStar(require("./src/decorator/OnFieldChange"), exports);
tslib_1.__exportStar(require("./src/function/createChangeDetector"), exports);
tslib_1.__exportStar(require("./src/function/createFieldChangeDetector"), exports);
tslib_1.__exportStar(require("./src/decorator/Provide"), exports);
tslib_1.__exportStar(require("./src/decorator/Consume"), exports);
//# sourceMappingURL=index.js.map
});
___scope___.file("core/src/cd/src/decorator/Field.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerForChangeDetection_1 = require("../function/registerForChangeDetection");
const fieldChangeCallbacks_1 = require("../reflector/fieldChangeCallbacks");
function Field(webComponentInstance, fieldName) {
    registerForChangeDetection_1.registerForChangeDetection(webComponentInstance.constructor, fieldName, false, (props, propName, value, instance) => {
        const onFieldChangeCallbacks = fieldChangeCallbacks_1.getOnFieldChangeCallbacks(webComponentInstance.constructor);
        onFieldChangeCallbacks.forEach((onFieldChangeCallbackRegistration) => {
            if (fieldName === onFieldChangeCallbackRegistration.fieldName) {
                instance[onFieldChangeCallbackRegistration.methodName](propName, value);
            }
        });
    });
}
exports.Field = Field;
//# sourceMappingURL=Field.js.map
});
___scope___.file("core/src/cd/src/function/registerForChangeDetection.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createFieldChangeDetector_1 = require("./createFieldChangeDetector");
const di_1 = require("../../../di");
exports.registerForChangeDetection = (prototype, fieldName, memorize, onChange = (instance, name, value) => { }, onBeforeChange = (instance, name, value) => true) => {
    di_1.ComponentReflector.addInitializer(prototype, (instance) => {
        createFieldChangeDetector_1.createFieldChangeDetector(instance, fieldName, memorize, onChange, onBeforeChange);
    });
};
//# sourceMappingURL=registerForChangeDetection.js.map
});
___scope___.file("core/src/cd/src/interface/ChangeDetectionInterceptor.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=ChangeDetectionInterceptor.js.map
});
___scope___.file("core/src/cd/src/interface/FieldChangeCallbackRegistration.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=FieldChangeCallbackRegistration.js.map
});
___scope___.file("core/src/cd/src/reflector/fieldChangeCallbacks.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ON_FIELD_CHANGE_CALLBACKS = 'ON_FIELD_CHANGE_CALLBACKS';
exports.setOnFieldChangeCallbacks = (prototype, onFieldChangeCallbacks) => Reflect.set(prototype, ON_FIELD_CHANGE_CALLBACKS, onFieldChangeCallbacks);
exports.getOnFieldChangeCallbacks = (prototype) => Reflect.get(prototype, ON_FIELD_CHANGE_CALLBACKS) || [];
//# sourceMappingURL=fieldChangeCallbacks.js.map
});
___scope___.file("core/src/cd/src/decorator/OnFieldChange.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const addFieldChangeCallback_1 = require("../function/addFieldChangeCallback");
function OnFieldChange(fieldName) {
    return (prototype, methodName) => {
        addFieldChangeCallback_1.addFieldChangeCallback(prototype, methodName, fieldName);
        return prototype;
    };
}
exports.OnFieldChange = OnFieldChange;
//# sourceMappingURL=OnFieldChange.js.map
});
___scope___.file("core/src/cd/src/function/addFieldChangeCallback.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fieldChangeCallbacks_1 = require("../reflector/fieldChangeCallbacks");
exports.addFieldChangeCallback = (prototype, methodName, fieldName) => {
    const onFieldChangeCallbacks = fieldChangeCallbacks_1.getOnFieldChangeCallbacks(prototype.constructor);
    onFieldChangeCallbacks.push({
        fieldName,
        methodName
    });
    fieldChangeCallbacks_1.setOnFieldChangeCallbacks(prototype.constructor, onFieldChangeCallbacks);
};
//# sourceMappingURL=addFieldChangeCallback.js.map
});
___scope___.file("core/src/cd/src/function/createChangeDetector.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interceptableChange_1 = require("./interceptableChange");
const Comparator_1 = require("../../../lang/src/object/Comparator");
exports.createChangeDetector = (initialValue, memorize, onChange = (instance, name, value) => { }, onBeforeChange = (instance, name, value) => true, instance) => {
    return new Proxy(initialValue, {
        set: (props, name, value) => {
            if (memorize) {
                if (!Comparator_1.Comparator.isEqual(props[name], value)) {
                    interceptableChange_1.interceptableChange(props, name, value, onChange, onBeforeChange, instance);
                }
            }
            else {
                interceptableChange_1.interceptableChange(props, name, value, onChange, onBeforeChange, instance);
            }
            return true;
        },
        getPrototypeOf() {
            return {
                isChangeDetector: true
            };
        }
    });
};
//# sourceMappingURL=createChangeDetector.js.map
});
___scope___.file("core/src/cd/src/function/interceptableChange.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interceptableChange = (props, name, value, onChange, onBeforeChange, instance) => {
    const cancelled = !onBeforeChange(props, name, value, instance);
    if (!cancelled) {
        props[name] = value;
        onChange(props, name, value, instance);
    }
};
//# sourceMappingURL=interceptableChange.js.map
});
___scope___.file("core/src/cd/src/function/createFieldChangeDetector.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createChangeDetector_1 = require("./createChangeDetector");
exports.createFieldChangeDetector = (instance, fieldName, memorize, onChange = (props, name, value) => { }, onBeforeChange = (props, name, value) => true) => {
    instance[fieldName] = createChangeDetector_1.createChangeDetector({
        ...instance[fieldName]
    }, memorize, onChange, onBeforeChange, instance);
    // make property immutable so it can't loose change detection
    // in case of instance[fieldName] = someThingElse but throws
    Object.defineProperty(instance, fieldName, {
        writable: false
    });
};
//# sourceMappingURL=createFieldChangeDetector.js.map
});
___scope___.file("core/src/cd/src/decorator/Provide.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getProvidedFieldConsumerListName_1 = require("../function/getProvidedFieldConsumerListName");
const addFieldChangeCallback_1 = require("../function/addFieldChangeCallback");
function Provide(webComponent, fieldName) {
    const providedFieldConsumerListName = getProvidedFieldConsumerListName_1.getProvidedFieldConsumerListName(fieldName.toString());
    const providedFieldChangeCallbackName = `$onProvidedField_${fieldName.toString()}_change`;
    if (!webComponent[providedFieldConsumerListName]) {
        webComponent[providedFieldConsumerListName] = [];
    }
    if (!webComponent[providedFieldChangeCallbackName]) {
        webComponent[providedFieldChangeCallbackName] = (propertyName, newValue) => {
            webComponent[providedFieldConsumerListName].forEach((notificationTarget) => {
                notificationTarget.instance[notificationTarget.fieldName][propertyName] = newValue;
            });
        };
        addFieldChangeCallback_1.addFieldChangeCallback(webComponent, providedFieldChangeCallbackName, fieldName.toString());
    }
}
exports.Provide = Provide;
//# sourceMappingURL=Provide.js.map
});
___scope___.file("core/src/cd/src/function/getProvidedFieldConsumerListName.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProvidedFieldConsumerListName = (fieldName) => {
    return `$st_providedField_${fieldName}_consumerList`;
};
//# sourceMappingURL=getProvidedFieldConsumerListName.js.map
});
___scope___.file("core/src/cd/src/decorator/Consume.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("../../../di");
const getProvidedFieldConsumerListName_1 = require("../function/getProvidedFieldConsumerListName");
function Consume(targetProviderWebComponent, fieldNameTarget) {
    return (webComponent, fieldName) => {
        const providedAttributeConsumerListName = getProvidedFieldConsumerListName_1.getProvidedFieldConsumerListName(fieldNameTarget.toString());
        if (!targetProviderWebComponent.prototype[providedAttributeConsumerListName]) {
            console.error(di_1.ComponentReflector.getName(targetProviderWebComponent), 'has no @Provide decorated field', fieldNameTarget, 'but it is @Consume by', webComponent.constructor.name, '->', fieldNameTarget);
        }
        di_1.ComponentReflector.addInitializer(webComponent.constructor, (instance) => {
            if (targetProviderWebComponent.prototype[providedAttributeConsumerListName]) {
                targetProviderWebComponent.prototype[providedAttributeConsumerListName].push({
                    instance,
                    fieldName
                });
            }
        });
    };
}
exports.Consume = Consume;
//# sourceMappingURL=Consume.js.map
});
___scope___.file("core/src/webcomponent/index.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./src/decorator/WebComponent"), exports);
tslib_1.__exportStar(require("./src/WebComponentReflector"), exports);
tslib_1.__exportStar(require("./src/component/ErrorMessage"), exports);
tslib_1.__exportStar(require("./src/interface/Lifecycle"), exports);
tslib_1.__exportStar(require("./src/enum/ShadowAttachMode"), exports);
tslib_1.__exportStar(require("./src/decorator/Use"), exports);
tslib_1.__exportStar(require("./src/decorator/Attribute"), exports);
tslib_1.__exportStar(require("./src/decorator/OnAttributeChange"), exports);
tslib_1.__exportStar(require("./src/decorator/Style"), exports);
tslib_1.__exportStar(require("./src/decorator/Template"), exports);
tslib_1.__exportStar(require("./src/interface/TemplateFunction"), exports);
tslib_1.__exportStar(require("./src/decorator/ShadowDOM"), exports);
tslib_1.__exportStar(require("./src/decorator/EventAttribute"), exports);
tslib_1.__exportStar(require("./src/function/DOMAttributeValueTransformers"), exports);
tslib_1.__exportStar(require("./src/enum/AttributeType"), exports);
//# sourceMappingURL=index.js.map
});
___scope___.file("core/src/webcomponent/src/decorator/WebComponent.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import es5 adapter for backward-compatibility
const polyfillCustomElementsAPI_1 = require("../polyfill/polyfillCustomElementsAPI");
const decorateWebComponent_1 = require("../function/decorateWebComponent");
const logger_1 = require("../../../logger");
polyfillCustomElementsAPI_1.polyfillCustomElementsAPI();
function WebComponent(tagName) {
    return (webComponent) => {
        if (!tagName) {
            logger_1.error("The @WebComponent ", webComponent, " has no tag name! It should look like: @WebComponent('foo-bar-element')");
        }
        // must contain a kebab-dash
        if (tagName.indexOf('-') === -1) {
            logger_1.error("The @WebComponent ", webComponent, " tag name is not prefixed. It should look like: app-your-element-name, but it is: " + tagName);
        }
        return decorateWebComponent_1.decorateWebComponent(tagName, webComponent);
    };
}
exports.WebComponent = WebComponent;
//# sourceMappingURL=WebComponent.js.map
});
___scope___.file("core/src/webcomponent/src/polyfill/polyfillCustomElementsAPI.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 @license @nocompile
 Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 Code distributed by Google as part of the polymer project is also
 subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
exports.polyfillCustomElementsAPI = function () {
    'use strict';
    (function () {
        if (void 0 === window.Reflect || void 0 === window.customElements || window.customElements.hasOwnProperty('polyfillWrapFlushCallback'))
            return;
        const a = HTMLElement;
        window.HTMLElement = function HTMLElement() {
            return Reflect.construct(a, [], this.constructor);
        }, HTMLElement.prototype = a.prototype, HTMLElement.prototype.constructor = HTMLElement, Object.setPrototypeOf(HTMLElement, a);
    })();
};
//# sourceMappingURL=polyfillCustomElementsAPI.js.map
});
___scope___.file("core/src/webcomponent/src/interface/WebComponentImpl.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=WebComponentImpl.js.map
});
___scope___.file("core/src/webcomponent/src/function/decorateWebComponent.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("../../../di");
const createWebComponentClass_1 = require("./createWebComponentClass");
const WebComponentReflector_1 = require("../WebComponentReflector");
const installInitialMutationObserver_1 = require("./installInitialMutationObserver");
exports.decorateWebComponent = (tagName, webComponent) => {
    // @Component by default
    const injectableWebComponent = di_1.Component(webComponent);
    const CustomWebComponent = createWebComponentClass_1.createWebComponentClass(tagName, injectableWebComponent);
    const registeredCustomWebComponent = window.customElements.get(tagName);
    if (!registeredCustomWebComponent) {
        // register custom element
        window.customElements.define(tagName, CustomWebComponent);
        WebComponentReflector_1.WebComponentReflector.setTagName(CustomWebComponent, tagName);
        WebComponentReflector_1.WebComponentReflector.registerByTagName(tagName, CustomWebComponent);
    }
    di_1.ComponentReflector.addInitializer(CustomWebComponent, (instance) => {
        installInitialMutationObserver_1.installInitialMutationObserver(instance, tagName);
    });
    return CustomWebComponent;
};
//# sourceMappingURL=decorateWebComponent.js.map
});
___scope___.file("core/src/webcomponent/src/function/createWebComponentClass.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const virtualdom_1 = require("../../../virtualdom");
const tss_1 = require("../../../tss");
const di_1 = require("../../../di");
const getAttributeReferencedValue_1 = require("./getAttributeReferencedValue");
const getAttributeEventListenerValue_1 = require("./getAttributeEventListenerValue");
const observedAttributes_1 = require("../reflector/protoype/observedAttributes");
const shadow_1 = require("../reflector/protoype/shadow");
const shadowRoot_1 = require("../reflector/instance/shadowRoot");
const style_1 = require("../reflector/protoype/style");
const template_1 = require("../reflector/protoype/template");
const VirtualDOMMutator_1 = require("../../../virtualdom/src/mutation/VirtualDOMMutator");
const VIRTUAL_DOM = 'VIRTUAL_DOM';
exports.createWebComponentClass = (tagName, injectableWebComponent) => {
    // custom web component extends user implemented web component class
    // which extends HTMLElement
    const CustomWebComponent = class extends injectableWebComponent {
        constructor(...args) {
            super();
            // call all registered initializer functions for this WebComponent as BeanFactory is not
            // creating instances of WebComponents but document.createElement. Thus, we need to do it here.
            di_1.ComponentReflector.callInitializers(di_1.ComponentReflector.getInitializers(CustomWebComponent), this);
        }
        static get observedAttributes() {
            return observedAttributes_1.getObservedAttributes(CustomWebComponent);
        }
        shouldAttributeChange(name, oldValue, newValue) {
            return true;
        }
        changeAttribute(name, newValue) {
            this[name] = newValue;
        }
        render() {
            let cancelled = false;
            const elements = [];
            if (super.onBeforeRender) {
                cancelled = super.onBeforeRender();
            }
            if (!cancelled) {
                const style = style_1.getStyleForComponent(CustomWebComponent);
                // generate and inject styles
                if (style) {
                    const contextTheme = tss_1.getTheme();
                    const theme = {
                        ...contextTheme ? contextTheme : {}
                    };
                    virtualdom_1.transformToFlatElementList(elements, tss_1.CSSDeclarationBlockGenerator.generate(style(this, theme)));
                    // support for :component selector (self-referenced component styles) works even in shadow DOM
                    const componentInlineStyle = tss_1.CSSInlineStyleGenerator.generateForStyleAttribute(style(this, theme));
                    const allStyles = {};
                    for (let styleAttributeName in componentInlineStyle) {
                        if (componentInlineStyle.hasOwnProperty(styleAttributeName)) {
                            // cannot set directly, because browsers removed the setter / DOM API change
                            allStyles[styleAttributeName] = componentInlineStyle[styleAttributeName];
                        }
                    }
                    // @ts-ignore
                    this.style = allStyles;
                }
                if (super.render) {
                    virtualdom_1.transformToFlatElementList(elements, super.render());
                }
                else {
                    const template = template_1.getTemplateForComponent(CustomWebComponent);
                    if (typeof template === 'function') {
                        virtualdom_1.transformToFlatElementList(elements, template(this));
                    }
                }
                if (super.onAfterRender) {
                    super.onAfterRender(elements);
                }
            }
            return elements;
        }
        doFlow() {
            const virtualElements = this.render();
            if (virtualElements) {
                const root = shadow_1.getShadowForComponent(CustomWebComponent) ?
                    shadowRoot_1.getShadowRootForComponent(this) :
                    this;
                const virtualElementRoot = virtualdom_1.VirtualDOMTransformer.transformVirtualElementTree({
                    name: tagName,
                    children: virtualElements
                });
                Reflect.set(this, VIRTUAL_DOM, virtualElementRoot);
                VirtualDOMMutator_1.VirtualDOMMutator.mutateElementTree(root.childNodes, virtualElementRoot && typeof virtualElementRoot === 'object' ?
                    virtualElementRoot.children : [], root, performance.now());
            }
        }
        async flow(initial = false) {
            let cancelled = false;
            if (super.onBeforeFlow) {
                cancelled = super.onBeforeFlow(initial);
            }
            if (!cancelled && this.isConnected) {
                this.doFlow();
                if (super.onFlow) {
                    super.onFlow(initial);
                }
            }
        }
        shouldFlowOnAttributeChange(attributeName, oldValue, newValue) {
            return true;
        }
        flowOnAttributeChange(attributeName, oldValue, newValue) {
            if (this.shouldFlowOnAttributeChange(attributeName, oldValue, newValue)) {
                this.flow();
            }
        }
        attributeChangedCallback(name, oldValue, newValue) {
            let cancelled = false;
            const attributeValue = getAttributeEventListenerValue_1.getAttributeEventListenerValue(CustomWebComponent, name, newValue, this) ||
                getAttributeReferencedValue_1.getAttributeReferencedValue(newValue);
            if (super.onBeforeAttributeChange) {
                cancelled = super.onBeforeAttributeChange(name, oldValue, attributeValue);
            }
            if (!cancelled && this.shouldAttributeChange(name, oldValue, newValue)) {
                this.changeAttribute(name, attributeValue);
                if (super.onAttributeChanged) {
                    return super.onAttributeChanged(name, oldValue, attributeValue);
                }
            }
        }
        doConnect() {
            // delay initial flow so that MutationObserver for initial
            // DOM changes is called first (it's a DOM impl. timing/lifecycle glitch)
            setTimeout(() => {
                this.flow(true);
            }, 1 /* ms delay */);
        }
        connectedCallback() {
            let cancelled = false;
            if (super.onBeforeConnect) {
                cancelled = super.onBeforeConnect();
            }
            if (!cancelled) {
                this.doConnect();
                if (super.onConnect) {
                    super.onConnect();
                }
            }
        }
    };
    return CustomWebComponent;
};
//# sourceMappingURL=createWebComponentClass.js.map
});
___scope___.file("core/src/webcomponent/src/function/getAttributeReferencedValue.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getInternalRenderApi_1 = require("../../../renderer/src/function/getInternalRenderApi");
exports.getAttributeReferencedValue = (attributeValueIdOrValue) => {
    // de-reference attribute value
    const attributeValue = getInternalRenderApi_1.getInternalRenderApi().attributeValueCache[attributeValueIdOrValue];
    delete getInternalRenderApi_1.getInternalRenderApi().attributeValueCache[attributeValueIdOrValue];
    return attributeValue || attributeValueIdOrValue;
};
//# sourceMappingURL=getAttributeReferencedValue.js.map
});
___scope___.file("core/src/webcomponent/src/function/getAttributeEventListenerValue.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../../../logger");
const eventAttributes_1 = require("../reflector/protoype/eventAttributes");
exports.getAttributeEventListenerValue = (prototype, attributeName, attributeValueIdOrValue, scope) => {
    const eventAttributes = eventAttributes_1.getEventAttributes(prototype);
    if (eventAttributes.indexOf(attributeName) !== -1) {
        if (typeof attributeValueIdOrValue == 'function') {
            return attributeValueIdOrValue.bind(scope);
        }
        else if (typeof attributeValueIdOrValue == 'string') {
            return function () {
                return attributeValueIdOrValue;
            }.bind(scope);
        }
        else {
            return function () {
                logger_1.error('Event listener set for ' + attributeName + ' is neither code nor function.');
            }.bind(scope);
        }
    }
    return null;
};
//# sourceMappingURL=getAttributeEventListenerValue.js.map
});
___scope___.file("core/src/webcomponent/src/reflector/protoype/eventAttributes.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EVENT_ATTRIBUTES = 'EVENT_ATTRIBUTES';
exports.getEventAttributes = (prototype) => Reflect.get(prototype, EVENT_ATTRIBUTES) || [];
exports.setEventAttributes = (prototype, eventAttributes) => Reflect.set(prototype, EVENT_ATTRIBUTES, eventAttributes) || [];
//# sourceMappingURL=eventAttributes.js.map
});
___scope___.file("core/src/webcomponent/src/reflector/protoype/observedAttributes.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OBSERVED_ATTRIBUTES = 'OBSERVED_ATTRIBUTES';
exports.setObservedAttributes = (prototype, observedAttributes) => Reflect.set(prototype, OBSERVED_ATTRIBUTES, observedAttributes) || [];
exports.getObservedAttributes = (prototype) => Reflect.get(prototype, OBSERVED_ATTRIBUTES) || [];
//# sourceMappingURL=observedAttributes.js.map
});
___scope___.file("core/src/webcomponent/src/reflector/protoype/shadow.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SHADOW = 'SHADOW';
const SHADOW_ATTACH_MODE = 'SHADOW_ATTACH_MODE';
exports.getShadowAttachModeForComponent = (webComponent) => {
    return Reflect.get(webComponent, SHADOW_ATTACH_MODE);
};
exports.getShadowForComponent = (webComponent) => {
    return Reflect.get(webComponent, SHADOW);
};
exports.setShadowForComponent = (webComponent, hasShadowDOM) => {
    return Reflect.set(webComponent, SHADOW, hasShadowDOM);
};
exports.setShadowAttachModeForComponent = (webComponent, shadowAttachMode) => {
    return Reflect.set(webComponent, SHADOW_ATTACH_MODE, shadowAttachMode);
};
//# sourceMappingURL=shadow.js.map
});
___scope___.file("core/src/webcomponent/src/reflector/instance/shadowRoot.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SHADOW_ROOT = 'SHADOW_ROOT';
exports.getShadowRootForComponent = (webComponent) => {
    return Reflect.get(webComponent, exports.SHADOW_ROOT);
};
exports.setShadowRootForComponent = (webComponent, shadowRoot) => {
    return Reflect.set(webComponent, exports.SHADOW_ROOT, shadowRoot);
};
//# sourceMappingURL=shadowRoot.js.map
});
___scope___.file("core/src/webcomponent/src/reflector/protoype/style.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const STYLE = 'STYLE';
exports.getStyleForComponent = (webComponent) => {
    return Reflect.get(webComponent, STYLE);
};
exports.setStyleForComponent = (webComponent, style) => {
    Reflect.set(webComponent, STYLE, style);
};
//# sourceMappingURL=style.js.map
});
___scope___.file("core/src/webcomponent/src/reflector/protoype/template.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TEMPLATE = 'TEMPLATE';
exports.getTemplateForComponent = (webComponent) => {
    return Reflect.get(webComponent, TEMPLATE);
};
exports.setTemplateForComponent = (webComponent, template) => {
    Reflect.set(webComponent, TEMPLATE, template);
};
//# sourceMappingURL=template.js.map
});
___scope___.file("core/src/webcomponent/src/function/installInitialMutationObserver.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const virtualdom_1 = require("../../../virtualdom");
const FlowIdReflector_1 = require("../reflector/cross-instance/FlowIdReflector");
const isWebComponent_1 = require("./isWebComponent");
exports.installInitialMutationObserver = (instance, tagName) => {
    // initial DOM children processing -> transform <web-component>$childNodes</web-component>
    // into an Array<VirtualElement> to be further transformed and re-rendered
    const observer = new MutationObserver((mutationsList) => {
        const webComponentNode = instance;
        let initialChildren = [];
        const addedNodes = mutationsList
            .filter(mutation => mutation.type === 'childList')
            .filter(mutation => mutation.addedNodes && mutation.addedNodes.length)
            .map(mutation => mutation.addedNodes);
        addedNodes.forEach((mutationNodeList) => {
            initialChildren = [...initialChildren, ...mutationNodeList];
            // prevent mutation from firing re-flows by self-change
            initialChildren = initialChildren.filter((child) => !FlowIdReflector_1.FlowIdReflector.has(child) && child.tagName && !isWebComponent_1.isWebComponent(child.tagName));
        });
        // ECMAScript spec. whitespace-only check
        // https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Whitespace_in_the_DOM
        initialChildren = initialChildren.filter(node => (/[^\t\n\r ]/.test(node.textContent || '')));
        // must be a direct child of this component
        initialChildren = initialChildren.filter(node => node.parentNode === webComponentNode);
        if (initialChildren && initialChildren.length > 0) {
            virtualdom_1.VirtualDOMMutator.cacheSlotChildren({
                name: tagName,
                children: initialChildren.map(element => virtualdom_1.transformElementToVirtualElement(element))
            }, instance);
            // evict all children
            instance.innerHTML = '';
            // queue re-flows
            instance.flow(!instance.isConnected);
        }
        observer.disconnect();
    });
    observer.observe(instance, { childList: true });
};
//# sourceMappingURL=installInitialMutationObserver.js.map
});
___scope___.file("core/src/webcomponent/src/component/ErrorMessage.jsx", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const WebComponent_1 = require("../decorator/WebComponent");
const Attribute_1 = require("../decorator/Attribute");
const Style_1 = require("../decorator/Style");
const renderer_1 = require("../../../renderer");
let ErrorMessage = class ErrorMessage extends HTMLElement {
    constructor() {
        super(...arguments);
        this.message = "Unknown error.";
    }
    render() {
        return renderer_1.ActiveRenderer.createElement("p", null, this.message);
    }
};
tslib_1.__decorate([
    Attribute_1.Attribute,
    tslib_1.__metadata("design:type", String)
], ErrorMessage.prototype, "message", void 0);
ErrorMessage = tslib_1.__decorate([
    WebComponent_1.WebComponent('st-error-message'),
    Style_1.Style((view) => ({
        'p': {
            color: '#ff0000'
        }
    }))
], ErrorMessage);
exports.ErrorMessage = ErrorMessage;
//# sourceMappingURL=ErrorMessage.js.map
});
___scope___.file("core/src/webcomponent/src/interface/Lifecycle.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=Lifecycle.js.map
});
___scope___.file("core/src/webcomponent/src/enum/ShadowAttachMode.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ShadowAttachMode;
(function (ShadowAttachMode) {
    ShadowAttachMode["OPEN"] = "open";
    ShadowAttachMode["CLOSED"] = "closed";
})(ShadowAttachMode = exports.ShadowAttachMode || (exports.ShadowAttachMode = {}));
//# sourceMappingURL=ShadowAttachMode.js.map
});
___scope___.file("core/src/webcomponent/src/decorator/Use.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Use(component, ...moreComponents) {
    return (targetWebComponent) => {
        return targetWebComponent;
    };
}
exports.Use = Use;
//# sourceMappingURL=Use.js.map
});
___scope___.file("core/src/webcomponent/src/decorator/Attribute.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const di_1 = require("../../../di");
const decorateTransparentAttributeGetterAndSetter_1 = require("../function/decorateTransparentAttributeGetterAndSetter");
const logger_1 = require("../../../logger");
const observedAttributes_1 = require("../reflector/protoype/observedAttributes");
const attributes_1 = require("../reflector/instance/attributes");
const __1 = require("../..");
exports.ATTRIBUTE_TRANSFORM_FN_NAME = 'ATTR_TRANSFORM_FN';
function Attribute(webComponentInstanceOrTransformFnOrAttributeType, attributeName) {
    const setup = (webComponentInstance, attributeName, webComponentInstanceOrTransformFnOrAttributeType) => {
        let transformFn;
        // test for uppercase characters
        if (/[ABCDEFGHIJKLMNOPQRSTUVWXYZ]/g.test(attributeName.toString())) {
            logger_1.warn('The @WebComponent', webComponentInstance.constructor, ' has an @Attribute with camelCase naming: ', attributeName, '. Use kebab-case instead!');
        }
        if (typeof webComponentInstanceOrTransformFnOrAttributeType === 'string') {
            switch (webComponentInstanceOrTransformFnOrAttributeType) {
                case __1.AttributeType.BOOLEAN:
                    transformFn = __1.transformBooleanDOMAttributeValue;
                    break;
                case __1.AttributeType.FLOAT:
                    transformFn = __1.transformFloatDOMAttributeValue;
                    break;
                case __1.AttributeType.INT:
                    transformFn = __1.transformIntDOMAttributeValue;
                    break;
            }
        }
        else if (typeof webComponentInstanceOrTransformFnOrAttributeType === 'function') {
            transformFn = webComponentInstanceOrTransformFnOrAttributeType;
        }
        else if (typeof webComponentInstanceOrTransformFnOrAttributeType !== 'undefined') {
            logger_1.warn('The @WebComponent', webComponentInstance.constructor, ' has an @Attribute(attributeTypeOrTransformFn) with an invalid AttributeType / no transform function: ', attributeName, ' value cannot be transformed by: ', webComponentInstanceOrTransformFnOrAttributeType);
        }
        const observedAttributes = observedAttributes_1.getObservedAttributes(webComponentInstance.constructor);
        observedAttributes.push(attributeName);
        if (transformFn) {
            Reflect.set(webComponentInstance, exports.ATTRIBUTE_TRANSFORM_FN_NAME + attributeName.toString(), transformFn);
        }
        observedAttributes_1.setObservedAttributes(webComponentInstance.constructor, observedAttributes);
        di_1.ComponentReflector.addInitializer(webComponentInstance.constructor, (instance) => {
            attributes_1.initializeAttributes(instance, webComponentInstance.constructor, observedAttributes);
            decorateTransparentAttributeGetterAndSetter_1.decorateTransparentAttributeGetterAndSetter(instance, webComponentInstance.constructor, observedAttributes);
            attributes_1.registerAttributeHooks(instance, observedAttributes);
        });
    };
    if (webComponentInstanceOrTransformFnOrAttributeType instanceof HTMLElement) {
        setup(webComponentInstanceOrTransformFnOrAttributeType, attributeName);
    }
    else {
        return (webComponentInstance, attributeName) => {
            setup(webComponentInstance, attributeName, webComponentInstanceOrTransformFnOrAttributeType);
        };
    }
}
exports.Attribute = Attribute;
//# sourceMappingURL=Attribute.js.map
});
___scope___.file("core/src/webcomponent/src/function/decorateTransparentAttributeGetterAndSetter.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const attributes_1 = require("../reflector/instance/attributes");
const __1 = require("../..");
const ATTRIBUTE_REGISTERED = "ATTRIBUTE_REGISTERED_";
exports.decorateTransparentAttributeGetterAndSetter = (instance, prototype, observedAttributes) => {
    observedAttributes.forEach((attributeName) => {
        if (!Reflect.get(instance, (ATTRIBUTE_REGISTERED + attributeName))) {
            const transformFn = Reflect.get(instance, __1.ATTRIBUTE_TRANSFORM_FN_NAME + attributeName.toString());
            Object.defineProperty(instance, attributeName, {
                // call: $webComponent.$attribute = x
                set: (newValue) => {
                    newValue = transformFn ? transformFn(newValue) : newValue;
                    const oldValue = instance[attributeName];
                    let changeCancelled = false;
                    if (instance.onBeforeAttributeChange) {
                        changeCancelled = instance.onBeforeAttributeChange(attributeName, oldValue, newValue);
                    }
                    if (!changeCancelled) {
                        attributes_1.setAttribute(instance, attributeName, newValue);
                        attributes_1.executeOnAttributeChangeCallbacks(prototype, instance, attributeName);
                        instance.flowOnAttributeChange(attributeName, oldValue, newValue);
                    }
                    return true;
                },
                // call: let y = $webComponent.$attribute
                get: () => attributes_1.getAttribute(instance, attributeName),
            });
            Reflect.set(instance, (ATTRIBUTE_REGISTERED + attributeName), true);
        }
    });
};
//# sourceMappingURL=decorateTransparentAttributeGetterAndSetter.js.map
});
___scope___.file("core/src/webcomponent/src/reflector/instance/attributes.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const attributeChangeCallbacks_1 = require("../protoype/attributeChangeCallbacks");
const __1 = require("../../..");
const ATTRIBUTE_DEFAULT_INITIALIZED = 'ATTRIBUTE_DEFAULT_INITIALIZED';
const ATTRIBUTE_VALUE = "ATTRIBUTE_VALUE_";
const ATTRIBUTE_HOOK_REGISTERED = 'TRANSPARENT_ATTRIBUTE_HOOK_REGISTERED';
// Web Standard API naming, do NOT change
const GET_ATTRIBUTE_METHOD_NAME = 'getAttribute';
const ATTRIBUTES_GETTER_NAME = 'attributes';
exports.getAttribute = (instance, attributeName) => Reflect.get(instance, (ATTRIBUTE_VALUE + attributeName));
exports.setAttribute = (instance, attributeName, value) => {
    Reflect.set(instance, (ATTRIBUTE_VALUE + attributeName), value);
};
exports.initializeAttributes = (instance, prototype, observedAttributes) => {
    // set default attribute values (initial)
    observedAttributes.forEach((attributeName) => {
        if (!Reflect.get(instance, (ATTRIBUTE_DEFAULT_INITIALIZED + attributeName))) {
            const transformFn = Reflect.get(instance, __1.ATTRIBUTE_TRANSFORM_FN_NAME + attributeName.toString());
            exports.setAttribute(instance, attributeName, transformFn ? transformFn(instance[attributeName]) : instance[attributeName]);
            exports.executeOnAttributeChangeCallbacks(prototype, instance, attributeName);
            Reflect.set(instance, (ATTRIBUTE_DEFAULT_INITIALIZED + attributeName), true);
        }
    });
};
exports.executeOnAttributeChangeCallbacks = (prototype, instance, attributeName) => {
    const attributeChangeCallbacks = attributeChangeCallbacks_1.getAttributeChangeCallbacks(prototype);
    attributeChangeCallbacks.forEach((attributeChangeCallbackRegistration) => {
        if (attributeChangeCallbackRegistration.attributeName === attributeName) {
            instance[attributeChangeCallbackRegistration.methodName]();
        }
    });
};
exports.registerAttributeHooks = (instance, observedAttributes) => {
    // if transparent hooks are not yet registered for this @Attribute...
    if (!Reflect.get(instance, (ATTRIBUTE_HOOK_REGISTERED))) {
        // $webComponent.getAttribute(...) [native]
        const originalGetAttribute = instance[GET_ATTRIBUTE_METHOD_NAME].bind(instance);
        // replace $webComponent.getAttribute(...)
        instance[GET_ATTRIBUTE_METHOD_NAME] = (attributeName) => {
            // if attribute is not @Attribute observed, call native
            // $webComponent.getAttribute(...)
            if (observedAttributes.indexOf(attributeName) === -1) {
                return originalGetAttribute(attributeName);
            }
            // else return transparent value
            return exports.getAttribute(instance, attributeName);
        };
        // $webComponent.attributes [native]
        const originalAttributes = instance[ATTRIBUTES_GETTER_NAME];
        // replace $webComponent.attributes
        Object.defineProperty(instance, ATTRIBUTES_GETTER_NAME, {
            get: () => {
                // get all native $webComponent.attributes
                const attributes = originalAttributes;
                // enrich them with @Attribute added attributes
                observedAttributes.forEach((observedAttributeName) => {
                    attributes[observedAttributeName] = instance[observedAttributeName];
                });
                return attributes;
            }
        });
        Reflect.set(instance, (ATTRIBUTE_HOOK_REGISTERED), true);
    }
};
//# sourceMappingURL=attributes.js.map
});
___scope___.file("core/src/webcomponent/src/reflector/protoype/attributeChangeCallbacks.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ATTRIBUTE_CHANGE_CALLBACKS = 'ATTRIBUTE_CHANGE_CALLBACKS';
exports.getAttributeChangeCallbacks = (prototype) => Reflect.get(prototype, ATTRIBUTE_CHANGE_CALLBACKS) || [];
exports.setAttributeChangeCallbacks = (prototype, attributeChangeCallbacks) => Reflect.set(prototype, ATTRIBUTE_CHANGE_CALLBACKS, attributeChangeCallbacks) || [];
//# sourceMappingURL=attributeChangeCallbacks.js.map
});
___scope___.file("core/src/webcomponent/src/interface/AttributeChangeCallbackRegistration.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=AttributeChangeCallbackRegistration.js.map
});
___scope___.file("core/src/webcomponent/src/interface/DOMAttributeValueTransformer.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=DOMAttributeValueTransformer.js.map
});
___scope___.file("core/src/webcomponent/src/decorator/OnAttributeChange.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const attributeChangeCallbacks_1 = require("../reflector/protoype/attributeChangeCallbacks");
function OnAttributeChange(attributeName) {
    return (prototype, methodName) => {
        const attributeChangeCallbacks = attributeChangeCallbacks_1.getAttributeChangeCallbacks(prototype.constructor);
        attributeChangeCallbacks.push({
            methodName,
            attributeName
        });
        attributeChangeCallbacks_1.setAttributeChangeCallbacks(prototype.constructor, attributeChangeCallbacks);
        return prototype;
    };
}
exports.OnAttributeChange = OnAttributeChange;
//# sourceMappingURL=OnAttributeChange.js.map
});
___scope___.file("core/src/webcomponent/src/decorator/Style.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const style_1 = require("../reflector/protoype/style");
function Style(style) {
    return (targetWebComponent) => {
        style_1.setStyleForComponent(targetWebComponent, style);
        return targetWebComponent;
    };
}
exports.Style = Style;
//# sourceMappingURL=Style.js.map
});
___scope___.file("core/src/webcomponent/src/decorator/Template.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const template_1 = require("../reflector/protoype/template");
function Template(template) {
    return (targetWebComponent) => {
        template_1.setTemplateForComponent(targetWebComponent, template);
        return targetWebComponent;
    };
}
exports.Template = Template;
//# sourceMappingURL=Template.js.map
});
___scope___.file("core/src/webcomponent/src/interface/TemplateFunction.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=TemplateFunction.js.map
});
___scope___.file("core/src/webcomponent/src/decorator/ShadowDOM.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const decorateShadowAndAttachModeForComponent_1 = require("../function/decorateShadowAndAttachModeForComponent");
function ShadowDOM(shadowAttachModeOrComponent) {
    if (typeof shadowAttachModeOrComponent === 'function') {
        decorateShadowAndAttachModeForComponent_1.decorateShadowAndAttachModeForComponent(shadowAttachModeOrComponent);
    }
    else {
        return (targetWebComponent) => {
            decorateShadowAndAttachModeForComponent_1.decorateShadowAndAttachModeForComponent(targetWebComponent, shadowAttachModeOrComponent);
            return targetWebComponent;
        };
    }
}
exports.ShadowDOM = ShadowDOM;
//# sourceMappingURL=ShadowDOM.js.map
});
___scope___.file("core/src/webcomponent/src/function/decorateShadowAndAttachModeForComponent.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../index");
const di_1 = require("../../../di");
const shadow_1 = require("../reflector/protoype/shadow");
const shadowRoot_1 = require("../reflector/instance/shadowRoot");
exports.decorateShadowAndAttachModeForComponent = (webComponent, shadowAttachMode) => {
    shadow_1.setShadowForComponent(webComponent, true);
    if (shadowAttachMode) {
        shadow_1.setShadowAttachModeForComponent(webComponent, shadowAttachMode);
    }
    di_1.ComponentReflector.addInitializer(webComponent, (instance) => {
        const shadow = shadow_1.getShadowForComponent(webComponent);
        if (shadow) {
            const shadowAttachMode = shadow_1.getShadowAttachModeForComponent(webComponent);
            const shadowRoot = instance.attachShadow({
                mode: shadowAttachMode ? shadowAttachMode : index_1.ShadowAttachMode.OPEN
            });
            shadowRoot_1.setShadowRootForComponent(instance, shadowRoot);
        }
    });
};
//# sourceMappingURL=decorateShadowAndAttachModeForComponent.js.map
});
___scope___.file("core/src/webcomponent/src/decorator/EventAttribute.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Attribute_1 = require("./Attribute");
const eventAttributes_1 = require("../reflector/protoype/eventAttributes");
function EventAttribute(webComponentInstance, attributeName) {
    // an event is an attribute with added annotation to transform string functions
    // into evaluated functions (in case of plain HTML use, integration)
    Attribute_1.Attribute(webComponentInstance, attributeName);
    const eventAttributes = eventAttributes_1.getEventAttributes(webComponentInstance.constructor);
    eventAttributes.push(attributeName);
    eventAttributes_1.setEventAttributes(webComponentInstance.constructor, eventAttributes);
}
exports.EventAttribute = EventAttribute;
//# sourceMappingURL=EventAttribute.js.map
});
___scope___.file("core/src/webcomponent/src/function/DOMAttributeValueTransformers.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformBooleanDOMAttributeValue = (value) => {
    if (typeof value === 'boolean') {
        return value;
    }
    else {
        //check if variable is false
        if (value === 'false') {
            return false;
        }
        // i.e.: "disabled" on an HTML element ends in an empty string which should
        // be transformed to: true. Likewise disabled="disabled" should end up as true whereas
        // no presence at all should result in false.
        return typeof value !== 'undefined';
    }
};
exports.transformFloatDOMAttributeValue = (value) => parseFloat(value.toString());
exports.transformIntDOMAttributeValue = (value) => parseInt(value.toString());
//# sourceMappingURL=DOMAttributeValueTransformers.js.map
});
___scope___.file("core/src/webcomponent/src/enum/AttributeType.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AttributeType;
(function (AttributeType) {
    AttributeType["STRING"] = "STRING";
    AttributeType["INT"] = "INT";
    AttributeType["FLOAT"] = "FLOAT";
    AttributeType["BOOLEAN"] = "BOOLEAN";
})(AttributeType = exports.AttributeType || (exports.AttributeType = {}));
//# sourceMappingURL=AttributeType.js.map
});
___scope___.file("integration-todo/src/element/layout/AppLayout.jsx", function(exports, require, module){
"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
"use strict";
const core_1 = require("~/core/src/index.js");
const i18n_1 = require("~/i18n/src/index.js");
const Logo_1 = require("../logo/Logo");
const router_1 = require("~/router/src/index.js");
let AppLayout = class AppLayout extends HTMLElement {
    constructor(translator, activeRoute) {
        super();
        this.translator = translator;
        this.activeRoute = activeRoute;
        this.setLanguage = (language) => {
            if (this.translator.getActiveLanguage() !== language) {
                this.translator.changeLanguage(language);
                this.activeRoute.refresh();
            }
        };
    }
    onLogoClick(evt) {
        console.log('onLogoClick', evt);
    }
    render() {
        return core_1.ActiveRenderer.createElement("st-fragment", null,
            core_1.ActiveRenderer.createElement("div", { style: "margin-top: 20px; text-align: center" },
                core_1.ActiveRenderer.createElement("app-logo", { onclick: this.onLogoClick })),
            core_1.ActiveRenderer.createElement("st-slot", { name: "children" },
                "Did you forget to provide some CDATA content in the component that uses ",
                "<app-layout>",
                "?"),
            core_1.ActiveRenderer.createElement("div", { style: "margin-top: 20px" },
                core_1.ActiveRenderer.createElement("a", { className: "waves-effect waves-light btn", onclick: () => this.setLanguage('de') }, i18n_1.t('german')),
                core_1.ActiveRenderer.createElement("a", { className: "waves-effect waves-light btn", onclick: () => this.setLanguage('en') }, i18n_1.t('english'))),
            core_1.ActiveRenderer.createElement("st-slot", { class: "copyright-footer", name: "copyright" },
                core_1.ActiveRenderer.createElement("st-t", { key: "copyright.firstLine" }),
                core_1.ActiveRenderer.createElement("br", null),
                core_1.ActiveRenderer.createElement("st-t", { key: "copyright.secondLine", values: {
                        buildDate: new Date(),
                        branch: 'master'
                    } })));
    }
};
AppLayout = tslib_1.__decorate([
    core_1.WebComponent('app-layout'),
    core_1.Style((view) => ({
        '.copyright-footer': {
            marginTop: '20px',
            display: 'flex',
            flexDirection: 'column'
        }
    })),
    core_1.Use(Logo_1.Logo),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof i18n_1.Translator !== "undefined" && i18n_1.Translator) === "function" ? _a : Object, typeof (_b = typeof router_1.ActiveRoute !== "undefined" && router_1.ActiveRoute) === "function" ? _b : Object])
], AppLayout);
exports.AppLayout = AppLayout;
//# sourceMappingURL=AppLayout.js.map
});
___scope___.file("i18n/src/index.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./i18nextAdaper"), exports);
tslib_1.__exportStar(require("./component/Translate"), exports);
tslib_1.__exportStar(require("./interface/LanguageDetectorOptions"), exports);
tslib_1.__exportStar(require("./decorator/Translation"), exports);
tslib_1.__exportStar(require("./decorator/Translations"), exports);
tslib_1.__exportStar(require("./interface/TranslationCatalog"), exports);
tslib_1.__exportStar(require("./Translator"), exports);
tslib_1.__exportStar(require("./decorator/TranslationFormat"), exports);
//# sourceMappingURL=index.js.map
});
___scope___.file("i18n/src/i18nextAdaper.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const i18next_1 = tslib_1.__importDefault(require("i18next"));
exports.i18n = i18next_1.default;
const translate = i18next_1.default.t.bind(i18next_1.default);
exports.t = (key, options) => {
    return translate(key, options);
};
//# sourceMappingURL=i18nextAdaper.js.map
});
___scope___.file("i18n/src/component/Translate.jsx", function(exports, require, module){
"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
"use strict";
const core_1 = require("~/core/src/index.js");
const i18nextAdaper_1 = require("../i18nextAdaper");
const i18next_1 = require("i18next");
let Translate = class Translate extends HTMLElement {
    onBeforeRender() {
        if (!this.cachedTranslation) {
            this.cachedTranslation = i18nextAdaper_1.t(this.key, { ...this.values || {}, ...this.options || {} });
        }
    }
    render() {
        return this.cachedTranslation;
    }
};
tslib_1.__decorate([
    core_1.Attribute,
    tslib_1.__metadata("design:type", String)
], Translate.prototype, "key", void 0);
tslib_1.__decorate([
    core_1.Attribute,
    tslib_1.__metadata("design:type", Object)
], Translate.prototype, "values", void 0);
tslib_1.__decorate([
    core_1.Attribute,
    tslib_1.__metadata("design:type", typeof (_a = typeof i18next_1.TOptions !== "undefined" && i18next_1.TOptions) === "function" ? _a : Object)
], Translate.prototype, "options", void 0);
Translate = tslib_1.__decorate([
    core_1.WebComponent('st-t')
], Translate);
exports.Translate = Translate;
//# sourceMappingURL=Translate.js.map
});
___scope___.file("i18n/src/interface/LanguageDetectorOptions.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=LanguageDetectorOptions.js.map
});
___scope___.file("i18n/src/decorator/Translation.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const i18next_1 = tslib_1.__importDefault(require("i18next"));
const i18next_browser_languagedetector_1 = tslib_1.__importDefault(require("i18next-browser-languagedetector"));
const defaults_1 = require("../defaults");
const format_1 = require("../function/format");
// see https://www.i18next.com/overview/configuration-options
function Translation(translationConfig, languageDetectorConfig, onInit) {
    const lngDetector = new i18next_browser_languagedetector_1.default();
    if (languageDetectorConfig) {
        lngDetector.init(languageDetectorConfig);
    }
    if (!translationConfig) {
        translationConfig = {};
    }
    if (!translationConfig.ns) {
        translationConfig.ns = [defaults_1.DEFAULT_NAMESPACE];
    }
    if (!translationConfig.defaultNS) {
        translationConfig.defaultNS = defaults_1.DEFAULT_NAMESPACE;
    }
    if (!translationConfig.fallbackLng) {
        translationConfig.fallbackLng = defaults_1.DEFAULT_FALLBACK_LANGUAGES;
    }
    if (!onInit) {
        onInit = () => { };
    }
    if (!translationConfig.interpolation) {
        translationConfig.interpolation = {};
    }
    if (!translationConfig.interpolation.format) {
        translationConfig.interpolation.format = format_1.format;
    }
    i18next_1.default
        .use(lngDetector)
        .init(translationConfig, onInit);
    // called with @Translation() or @Translation({})
    if (!(typeof translationConfig === 'function')) {
        return (target) => {
            return target;
        };
    }
}
exports.Translation = Translation;
//# sourceMappingURL=Translation.js.map
});
___scope___.file("i18n/src/defaults.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_FALLBACK_LANGUAGES = ['en'];
exports.DEFAULT_NAMESPACE = 'common';
//# sourceMappingURL=defaults.js.map
});
___scope___.file("i18n/src/function/format.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("~/core/src/index.js");
const constants_1 = require("../constants");
exports.format = (value, format, lng) => {
    const formatters = core_1.ApplicationContext.getGlobal(constants_1.TRANSLATION_FORMAT);
    if (typeof formatters[format || ''] === 'function') {
        return formatters[format || ''](value, format, lng);
    }
    return value;
};
//# sourceMappingURL=format.js.map
});
___scope___.file("i18n/src/interface/TranslationFormatterMap.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=TranslationFormatterMap.js.map
});
___scope___.file("i18n/src/constants.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TRANSLATION_FORMAT = 'TRANSLATION_FORMAT';
//# sourceMappingURL=constants.js.map
});
___scope___.file("i18n/src/decorator/Translations.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const i18next_1 = tslib_1.__importDefault(require("i18next"));
const defaults_1 = require("../defaults");
const Translation_1 = require("./Translation");
function Translations(locale, catalog, namespace = defaults_1.DEFAULT_NAMESPACE) {
    // called with @Translations({})
    if (!(typeof catalog === 'function')) {
        return (target) => {
            if (!i18next_1.default.isInitialized) {
                Translation_1.Translation(undefined, undefined, () => {
                    i18next_1.default.addResourceBundle(locale, namespace, catalog, true, true);
                });
            }
            else {
                i18next_1.default.addResourceBundle(locale, namespace, catalog, true, true);
            }
            return target;
        };
    }
}
exports.Translations = Translations;
//# sourceMappingURL=Translations.js.map
});
___scope___.file("i18n/src/interface/TranslationCatalog.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=TranslationCatalog.js.map
});
___scope___.file("i18n/src/Translator.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("~/core/src/index.js");
const i18next_1 = tslib_1.__importDefault(require("i18next"));
let Translator = class Translator {
    async changeLanguage(language) {
        return new Promise((resolve) => {
            i18next_1.default.changeLanguage(language, resolve);
        });
    }
    async isInitialized() {
        return new Promise((resolve) => {
            i18next_1.default.init({}, resolve);
        });
    }
    getActiveLanguage() {
        return i18next_1.default.language;
    }
    onLanguageChanged(eventHandler) {
        i18next_1.default.on('languageChanged', eventHandler);
    }
    get i18next() {
        return i18next_1.default;
    }
};
Translator = tslib_1.__decorate([
    core_1.Component
], Translator);
exports.Translator = Translator;
//# sourceMappingURL=Translator.js.map
});
___scope___.file("i18n/src/interface/LanguageChangedHandler.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=LanguageChangedHandler.js.map
});
___scope___.file("i18n/src/decorator/TranslationFormat.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("~/core/src/index.js");
const constants_1 = require("../constants");
function TranslationFormat(formatName, formatter) {
    let formatters = core_1.ApplicationContext.getGlobal(constants_1.TRANSLATION_FORMAT);
    if (!formatters)
        formatters = {};
    formatters[formatName] = formatter;
    core_1.ApplicationContext.setGlobal(constants_1.TRANSLATION_FORMAT, formatters);
    // called with @TranslationFormat({})
    if (!(typeof formatName === 'function')) {
        return (target) => {
            return target;
        };
    }
}
exports.TranslationFormat = TranslationFormat;
//# sourceMappingURL=TranslationFormat.js.map
});
___scope___.file("integration-todo/src/element/list/ListInnerPartial.jsx", function(exports, require, module){
"use strict";
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
"use strict";
const core_1 = require("~/core/src/index.js");
const TodoModel_1 = require("../../model/TodoModel");
const state_1 = require("~/state/src/index.js");
const i18n_1 = require("~/i18n/src/index.js");
const ListInnerPartial_style_1 = require("./ListInnerPartial.style");
const router_1 = require("~/router/src/index.js");
const test_selectors_1 = require("../../test-selectors");
const core_2 = require("~/core/src/index.js");
const TodoListPage_1 = require("../../page/TodoListPage");
const index_module_1 = require("../../index.module");
let ListInnerPartial = class ListInnerPartial extends HTMLElement {
    constructor(localTodoListState, model, activeRoute) {
        super();
        this.localTodoListState = localTodoListState;
        this.model = model;
        this.activeRoute = activeRoute;
        this.onListItemClick = (id) => {
            this.activeRoute.navigate(index_module_1.ROUTE_TODO_DETIALS, { id });
        };
        this.onRemove = async (evt, todoItem) => {
            evt.preventDefault();
            evt.stopPropagation();
            await this.model.removeTodo(todoItem);
        };
        this.onDoneToggle = async (evt, todoItem) => {
            evt.preventDefault();
            evt.stopPropagation();
            await this.model.toggleTodo(todoItem);
        };
    }
    onConsumerFieldChange() {
        console.log('WebComponent ListInnerPartial received changes from WebComponent ListPage', this.listPageLocalChanges.newTodoItemText);
    }
    render() {
        return core_1.ActiveRenderer.createElement("ul", null, (this.localTodoListState.todos || []).sort((a, b) => {
            return a.text > b.text ? 0 : 1;
        }).map((todo) => {
            const text = todo.done ? core_1.ActiveRenderer.createElement("s", null,
                todo.text,
                " ") : todo.text;
            const input = core_1.ActiveRenderer.createElement("input", { type: "checkbox" });
            if (todo.done) {
                input.attributes['checked'] = true;
            }
            const onListItemClick = () => {
                this.onListItemClick(todo.id);
            };
            const onDoneToggleClick = (evt) => {
                console.log('onDoneToggleClick', this);
                this.onDoneToggle(evt, todo);
            };
            const onRemoveClick = (evt) => this.onRemove(evt, todo);
            return core_1.ActiveRenderer.createElement("li", { key: todo.id, onclick: onListItemClick, class: "todo-item" },
                input,
                core_1.ActiveRenderer.createElement("span", { onclick: onDoneToggleClick }),
                core_1.ActiveRenderer.createElement("div", { class: "todo-item-text" }, text),
                core_1.ActiveRenderer.createElement("a", { class: "waves-effect waves-light btn", onclick: onRemoveClick }, i18n_1.t('remove')));
        }));
    }
};
tslib_1.__decorate([
    core_1.Field,
    core_2.Consume(TodoListPage_1.TodoListPage, 'localChanges'),
    tslib_1.__metadata("design:type", typeof (_a = typeof TodoListPage_1.ListPageLocalChanges !== "undefined" && TodoListPage_1.ListPageLocalChanges) === "function" ? _a : Object)
], ListInnerPartial.prototype, "listPageLocalChanges", void 0);
tslib_1.__decorate([
    core_1.OnFieldChange('listPageLocalChanges'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], ListInnerPartial.prototype, "onConsumerFieldChange", null);
ListInnerPartial = tslib_1.__decorate([
    core_1.Style(ListInnerPartial_style_1.style),
    core_1.WebComponent(test_selectors_1.testSelectors.element["app-list-inner-partial"]),
    tslib_1.__param(0, state_1.MapStateToField((state) => ({
        todos: TodoModel_1.TodoModel.selectTodos(state)
    }))),
    tslib_1.__metadata("design:paramtypes", [Object, typeof (_b = typeof TodoModel_1.TodoModel !== "undefined" && TodoModel_1.TodoModel) === "function" ? _b : Object, typeof (_c = typeof router_1.ActiveRoute !== "undefined" && router_1.ActiveRoute) === "function" ? _c : Object])
], ListInnerPartial);
exports.ListInnerPartial = ListInnerPartial;
//# sourceMappingURL=ListInnerPartial.js.map
});
___scope___.file("integration-todo/src/state/IRootState.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=IRootState.js.map
});
___scope___.file("integration-todo/src/model/TodoModel.js", function(exports, require, module){
"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
"use strict";
const core_1 = require("~/core/src/index.js");
const state_1 = require("~/state/src/index.js");
const ITodoState_1 = require("../state/ITodoState");
const getPhantomId_1 = require("../function/getPhantomId");
const initialTodos = [{
        done: false,
        id: getPhantomId_1.getPhantomId(),
        text: 'Bar'
    }, {
        done: false,
        id: getPhantomId_1.getPhantomId(),
        text: 'Toms'
    }];
let TodoModel = class TodoModel {
    constructor(initialState, reducers, logger) {
        this.initialState = initialState;
        this.reducers = reducers;
        this.logger = logger;
        initialState.todos = initialTodos;
    }
    onAddTodo(state, todoItem) {
        state.todos.push(todoItem);
        return state;
    }
    onRemoveTodo(state, todoItem) {
        state.todos = state.todos.filter((currentTodoItem) => currentTodoItem.id !== todoItem.id);
        return state;
    }
    onToggleTodo(state, todoItem) {
        state.todos = state.todos.map((currentTodoItem) => {
            if (currentTodoItem.id === todoItem.id) {
                currentTodoItem.done = !currentTodoItem.done;
            }
            return currentTodoItem;
        });
        return state;
    }
    async addTodo(todoItem) {
        return this.reducers.onAddTodo(todoItem);
    }
    async toggleTodo(todoItem) {
        return this.reducers.onToggleTodo(todoItem);
    }
    async removeTodo(todoItem) {
        this.logger.log('Removing todoItem in 1000 ms...', todoItem);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.reducers.onRemoveTodo(todoItem));
                core_1.log('Removed todoItem', todoItem);
            }, 1000);
        });
    }
    static selectTodos(state) {
        return state.TodoModel.todos;
    }
};
tslib_1.__decorate([
    state_1.StateReducer,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof ITodoState_1.ITodoState !== "undefined" && ITodoState_1.ITodoState) === "function" ? _a : Object, typeof (_b = typeof ITodoState_1.ITodoItem !== "undefined" && ITodoState_1.ITodoItem) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", typeof (_c = typeof ITodoState_1.ITodoState !== "undefined" && ITodoState_1.ITodoState) === "function" ? _c : Object)
], TodoModel.prototype, "onAddTodo", null);
tslib_1.__decorate([
    state_1.StateReducer,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof ITodoState_1.ITodoState !== "undefined" && ITodoState_1.ITodoState) === "function" ? _d : Object, typeof (_e = typeof ITodoState_1.ITodoItem !== "undefined" && ITodoState_1.ITodoItem) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", typeof (_f = typeof ITodoState_1.ITodoState !== "undefined" && ITodoState_1.ITodoState) === "function" ? _f : Object)
], TodoModel.prototype, "onRemoveTodo", null);
tslib_1.__decorate([
    state_1.StateReducer,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_g = typeof ITodoState_1.ITodoState !== "undefined" && ITodoState_1.ITodoState) === "function" ? _g : Object, typeof (_h = typeof ITodoState_1.ITodoItem !== "undefined" && ITodoState_1.ITodoItem) === "function" ? _h : Object]),
    tslib_1.__metadata("design:returntype", typeof (_j = typeof ITodoState_1.ITodoState !== "undefined" && ITodoState_1.ITodoState) === "function" ? _j : Object)
], TodoModel.prototype, "onToggleTodo", null);
tslib_1.__decorate([
    state_1.StateEffect,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_k = typeof ITodoState_1.ITodoItem !== "undefined" && ITodoState_1.ITodoItem) === "function" ? _k : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TodoModel.prototype, "addTodo", null);
tslib_1.__decorate([
    state_1.StateEffect,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_l = typeof ITodoState_1.ITodoItem !== "undefined" && ITodoState_1.ITodoItem) === "function" ? _l : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TodoModel.prototype, "toggleTodo", null);
tslib_1.__decorate([
    state_1.StateEffect,
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_m = typeof ITodoState_1.ITodoItem !== "undefined" && ITodoState_1.ITodoItem) === "function" ? _m : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], TodoModel.prototype, "removeTodo", null);
TodoModel = tslib_1.__decorate([
    state_1.StateModel("TodoModel"),
    tslib_1.__metadata("design:paramtypes", [typeof (_o = typeof ITodoState_1.ITodoState !== "undefined" && ITodoState_1.ITodoState) === "function" ? _o : Object, Object, typeof (_p = typeof core_1.ActiveLogger !== "undefined" && core_1.ActiveLogger) === "function" ? _p : Object])
], TodoModel);
exports.TodoModel = TodoModel;
//# sourceMappingURL=TodoModel.js.map
});
___scope___.file("integration-todo/src/function/getPhantomId.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPhantomId = () => Date.now() + Math.round(Math.random() * 1000);
//# sourceMappingURL=getPhantomId.js.map
});
___scope___.file("integration-todo/src/state/ITodoState.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=ITodoState.js.map
});
___scope___.file("state/src/index.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./StateManager"), exports);
tslib_1.__exportStar(require("./decorator/StateEffect"), exports);
tslib_1.__exportStar(require("./decorator/StateModel"), exports);
tslib_1.__exportStar(require("./decorator/Stateful"), exports);
tslib_1.__exportStar(require("./decorator/StateReducer"), exports);
tslib_1.__exportStar(require("./Store"), exports);
tslib_1.__exportStar(require("./interface/StateModelLifecycle"), exports);
tslib_1.__exportStar(require("./interface/StatefulLifecycle"), exports);
tslib_1.__exportStar(require("./decorator/MapStateToField"), exports);
//# sourceMappingURL=index.js.map
});
___scope___.file("state/src/StateManager.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Rematch = tslib_1.__importStar(require("@rematch/core/dist/umd/rematch.js"));
const core_1 = require("~/core/src/index.js");
const STORE_1 = require("./constant/STORE");
const MODEL_1 = require("./constant/MODEL");
const immer_1 = tslib_1.__importDefault(require("@rematch/immer/dist/rematch-immer.umd.js"));
class StateManager {
    static createStore(storeInitConfig) {
        if (!storeInitConfig) {
            storeInitConfig = {};
        }
        if (!storeInitConfig.plugins) {
            storeInitConfig.plugins = [];
        }
        // activate "immer"
        storeInitConfig.plugins.push(immer_1.default());
        //console.log('StateManager initConfig', storeInitConfig);
        // TODO: Construct config based on StoreConfig configurable using @Store(storeConfig: StoreConfig)
        const store = Rematch.init(storeInitConfig);
        StateManager.setStore(store);
        return store;
    }
    static setStore(store) {
        core_1.ApplicationContext.getInstance().set(STORE_1.STORE, store);
    }
    static getStore() {
        return core_1.ApplicationContext.getInstance().get(STORE_1.STORE);
    }
    static createModel(stateModel, modelConfig) {
        Reflect.set(stateModel, MODEL_1.MODEL, Rematch.createModel(modelConfig));
    }
    static addModel(stateModel, modelConfig) {
        let store = StateManager.getStore();
        // automatically create singleton store
        if (!store) {
            store = StateManager.createStore();
        }
        store.model(modelConfig);
        Reflect.set(stateModel, MODEL_1.MODEL, Rematch.createModel(modelConfig));
    }
    static getNativeModel(stateModel) {
        return Reflect.get(stateModel, MODEL_1.MODEL);
    }
}
exports.StateManager = StateManager;
//# sourceMappingURL=StateManager.js.map
});
___scope___.file("state/src/constant/STORE.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STORE = 'STORE';
//# sourceMappingURL=STORE.js.map
});
___scope___.file("state/src/constant/MODEL.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MODEL = 'MODEL';
//# sourceMappingURL=MODEL.js.map
});
___scope___.file("state/src/decorator/StateEffect.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IS_EFFECT_1 = require("../constant/IS_EFFECT");
exports.StateEffect = (prototype, methodName, descriptor) => {
    Reflect.set(prototype[methodName], IS_EFFECT_1.IS_EFFECT, true);
};
//# sourceMappingURL=StateEffect.js.map
});
___scope___.file("state/src/constant/IS_EFFECT.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IS_EFFECT = 'IS_EFFECT';
//# sourceMappingURL=IS_EFFECT.js.map
});
___scope___.file("state/src/decorator/StateModel.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("~/core/src/index.js");
const StateManager_1 = require("../StateManager");
const IS_EFFECT_1 = require("../constant/IS_EFFECT");
const IS_REDUCER_1 = require("../constant/IS_REDUCER");
function StateModel(modelName) {
    return (model) => {
        const injectableModel = core_1.Component(model);
        const appContext = core_1.ApplicationContext.getInstance();
        const modelInstance = appContext.getBean(injectableModel);
        const modelConfig = {
            name: modelName,
            state: modelInstance.initialState,
            reducers: {},
            effects: {}
            // TODO: selectors
        };
        const memberMethods = injectableModel.__proto__.prototype;
        const memberMethodNames = Object.getOwnPropertyNames(memberMethods);
        let effectCount = 0;
        let reducerCount = 0;
        for (let i = 0; i < memberMethodNames.length; i++) {
            const methodName = memberMethodNames[i];
            if (memberMethods.hasOwnProperty(methodName) &&
                typeof memberMethods[methodName] === 'function') {
                if (memberMethods[methodName][IS_EFFECT_1.IS_EFFECT]) {
                    modelConfig.effects[methodName] = memberMethods[methodName];
                    effectCount++;
                }
                if (memberMethods[methodName][IS_REDUCER_1.IS_REDUCER]) {
                    modelConfig.reducers[methodName] = memberMethods[methodName];
                    reducerCount++;
                }
            }
        }
        if (!effectCount) {
            console.warn(`@StateModel("${modelName}") has no *effect* methods (e.g. whatever()). Did you forgot to add the @StateEffect decorator?`);
        }
        if (!reducerCount) {
            console.warn(`@StateModel("${modelName}") has no *reducer* methods (e.g. onWhatever()). Did you forgot to add the @StateReducer decorator?`);
        }
        if (reducerCount > effectCount) {
            console.warn(`@StateModel("${modelName}") has more reducers than effects. Please check the method naming.`);
        }
        if (effectCount > reducerCount) {
            console.warn(`@StateModel("${modelName}") has more effects than reducers. Please check the method naming.`);
        }
        const effects = modelConfig.effects;
        modelConfig.effects = dispatch => {
            modelInstance.reducers = dispatch[modelName];
            return effects;
        };
        StateManager_1.StateManager.addModel(injectableModel, modelConfig);
        return injectableModel;
    };
}
exports.StateModel = StateModel;
//# sourceMappingURL=StateModel.js.map
});
___scope___.file("state/src/constant/IS_REDUCER.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IS_REDUCER = 'IS_REDUCER';
//# sourceMappingURL=IS_REDUCER.js.map
});
___scope___.file("state/src/decorator/Stateful.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerToCreateStateGetter_1 = require("../function/registerToCreateStateGetter");
const DEFAULT_STATE_FIELD_NAME_1 = require("../constant/DEFAULT_STATE_FIELD_NAME");
function Stateful(stateFieldName) {
    // called with @Stateful() or @Stateful({})
    if (!(typeof stateFieldName === 'function')) {
        return (target) => {
            registerToCreateStateGetter_1.registerToCreateStateGetter(target, stateFieldName);
            return target;
        };
    }
    else {
        registerToCreateStateGetter_1.registerToCreateStateGetter(stateFieldName, DEFAULT_STATE_FIELD_NAME_1.DEFAULT_STATE_FIELD_NAME);
        // called with @Stateful
        return stateFieldName;
    }
}
exports.Stateful = Stateful;
//# sourceMappingURL=Stateful.js.map
});
___scope___.file("state/src/function/registerToCreateStateGetter.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const createStateGetter_1 = require("./createStateGetter");
const core_1 = require("~/core/src/index.js");
exports.registerToCreateStateGetter = (prototype, stateFieldName) => {
    core_1.ComponentReflector.addInitializer(prototype, (instance) => {
        createStateGetter_1.createStateGetter(instance, stateFieldName);
    });
};
//# sourceMappingURL=registerToCreateStateGetter.js.map
});
___scope___.file("state/src/function/createStateGetter.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Store_1 = require("../Store");
const core_1 = require("~/core/src/index.js");
const DEFAULT_STATE_FIELD_NAME_1 = require("../constant/DEFAULT_STATE_FIELD_NAME");
exports.createStateGetter = (instance, stateFieldName = DEFAULT_STATE_FIELD_NAME_1.DEFAULT_STATE_FIELD_NAME, onStateChange) => {
    const store = core_1.ApplicationContext.getInstance().getBean(Store_1.Store);
    // set the state object
    Object.defineProperty(instance, stateFieldName, {
        get: () => store.getState()
    });
    // TODO: Unused and refactor to @MapStateToField
    store.subscribe(() => {
        if (onStateChange && typeof onStateChange === 'function') {
            onStateChange(store.getState());
        }
        if (instance.onStoreStateChange && typeof instance.onStoreStateChange === 'function') {
            instance.onStoreStateChange(store.getState());
        }
    });
    return store;
};
//# sourceMappingURL=createStateGetter.js.map
});
___scope___.file("state/src/constant/DEFAULT_STATE_FIELD_NAME.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_STATE_FIELD_NAME = 'state';
//# sourceMappingURL=DEFAULT_STATE_FIELD_NAME.js.map
});
___scope___.file("state/src/decorator/StateReducer.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const IS_REDUCER_1 = require("../constant/IS_REDUCER");
exports.StateReducer = (modelPrototype, methodName, descriptor) => {
    Reflect.set(modelPrototype[methodName], IS_REDUCER_1.IS_REDUCER, true);
};
//# sourceMappingURL=StateReducer.js.map
});
___scope___.file("state/src/Store.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("~/core/src/index.js");
const STORE_1 = require("./constant/STORE");
let Store = class Store {
    get nativeStore() {
        if (this._nativeStore)
            return this._nativeStore;
        return this._nativeStore = core_1.ApplicationContext.getInstance().get(STORE_1.STORE);
    }
    get name() {
        return this.nativeStore.name;
    }
    getState() {
        return this.nativeStore.getState();
    }
    subscribe(listenerFn) {
        return this.nativeStore.subscribe(listenerFn);
    }
};
Store = tslib_1.__decorate([
    core_1.Component
], Store);
exports.Store = Store;
//# sourceMappingURL=Store.js.map
});
___scope___.file("state/src/interface/StateModelLifecycle.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=StateModelLifecycle.js.map
});
___scope___.file("state/src/interface/StatefulLifecycle.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=StatefulLifecycle.js.map
});
___scope___.file("state/src/decorator/MapStateToField.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("~/core/src/index.js");
const Store_1 = require("../Store");
function MapStateToField(mapFn, callReflowOnAttributeChange = true) {
    // called with @MapStateToField(...)
    return (targetClass, methodName, argumentIndex) => {
        const store = core_1.ApplicationContext.getInstance().getBean(Store_1.Store);
        const instances = [];
        core_1.ComponentReflector.addInitializer(targetClass, (instance) => {
            instances.push(instance);
        });
        const updateField = (argumentValue) => {
            const mappedState = mapFn(store.getState());
            for (let key in mappedState) {
                if (mappedState.hasOwnProperty(key)) {
                    argumentValue[key] = mappedState[key];
                }
            }
            return mappedState;
        };
        const createField = (argumentValue) => {
            let oldMappedState;
            argumentValue = core_1.createChangeDetector(argumentValue, true, (props, name, value) => {
                instances.forEach((instance) => {
                    if (callReflowOnAttributeChange) {
                        instance.flowOnAttributeChange(name, oldMappedState, value);
                        oldMappedState = value;
                        Reflect.set(instance, 'MAPPED_STATE', value);
                    }
                });
            });
            updateField(argumentValue);
            return argumentValue;
        };
        core_1.ComponentReflector.addConstructorArgumentInitializer(targetClass, (argumentValue) => {
            const field = createField(argumentValue);
            store.subscribe(() => {
                updateField(field);
            });
            return field;
        }, argumentIndex);
        return targetClass;
    };
}
exports.MapStateToField = MapStateToField;
//# sourceMappingURL=MapStateToField.js.map
});
___scope___.file("integration-todo/src/element/list/ListInnerPartial.style.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.style = () => ({
    'app-list-inner-partial .btn': {
        marginRight: '10px',
        // traditional style
        'margin-top': '19.5px'
    },
    'app-list-inner-partial .todo-item': {
        height: '75px',
        'line-height': '75px',
        display: 'flex',
    },
    'app-list-inner-partial .todo-item-text': {
        flex: [
            'non-auto',
            'auto'
        ]
    },
    'app-list-inner-partial span': {
        marginTop: '26px'
    }
});
//# sourceMappingURL=ListInnerPartial.style.js.map
});
___scope___.file("integration-todo/src/test-selectors.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// central object for identifiers of elements used in the app (app code and e2e-tests)
// this file is placed here to prevent testcafe from having a direct code dependency on
// app code and to make sure that id changes automatically reflect on both sides: e2e tests and app code.
exports.testSelectors = {
    element: {
        'app-list-inner-partial': 'app-list-inner-partial'
    },
    page: {
        TodoListPage: {
            addButton: 'addButton',
            newTodoItemText: 'newTodoItemText'
        }
    }
};
//# sourceMappingURL=test-selectors.js.map
});
___scope___.file("integration-todo/src/element/logo/Logo.jsx", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("~/core/src/index.js");
const Logo_tpl_1 = tslib_1.__importDefault(require("./Logo.tpl"));
let Logo = class Logo extends HTMLElement {
    constructor() {
        super(...arguments);
        this.onclick = (evt) => {
        };
    }
};
tslib_1.__decorate([
    core_1.EventAttribute,
    tslib_1.__metadata("design:type", Object)
], Logo.prototype, "onclick", void 0);
Logo = tslib_1.__decorate([
    core_1.WebComponent('app-logo'),
    core_1.ShadowDOM(core_1.ShadowAttachMode.CLOSED),
    core_1.Template(Logo_tpl_1.default),
    core_1.Style(() => ({
        [core_1.HOST_SELECTOR]: 'margin: 5px;',
        '@media (max-width: 70em)': {
            [core_1.HOST_SELECTOR]: 'margin: 15px;',
        }
    }))
], Logo);
exports.Logo = Logo;
//# sourceMappingURL=Logo.js.map
});
___scope___.file("integration-todo/src/element/logo/Logo.tpl.jsx", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("~/core/src/index.js");
exports.default = (component) => core_1.ActiveRenderer.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", id: "logo", version: "1.1", viewBox: "0 0 225 52.5", height: "70", "st-inject": {
        svg: component
    }, width: "300" },
    core_1.ActiveRenderer.createElement("defs", { id: "defs880" }),
    core_1.ActiveRenderer.createElement("g", { style: "fill:#333333;fill-opacity:1", transform: "matrix(0.89791874,0,0,0.88624663,-24.912756,-131.8912)", id: "#fefefeff" },
        core_1.ActiveRenderer.createElement("path", { style: "opacity:1;fill:#333333;fill-opacity:1", id: "path867", d: "m 112.38,149.53 c 10.14,-2.15 21.53,0.7 28.72,8.38 10.85,10.81 10.75,30.29 -0.13,41.05 -11.16,11.92 -32.03,12.11 -43.55,0.62 -9.27,-8.93 -11.26,-24.08 -5.09,-35.27 3.99,-7.65 11.65,-13.05 20.05,-14.78 z" }),
        core_1.ActiveRenderer.createElement("path", { style: "opacity:1;fill:#333333;fill-opacity:1", id: "path869", d: "m 241.38,149.54 c 10.41,-2.24 22.11,0.76 29.32,8.81 10.08,10.63 10.14,28.88 0.33,39.71 -10.67,12.32 -31.51,13.42 -43.47,2.38 -8.84,-7.68 -11.83,-20.91 -7.97,-31.85 3.2,-9.62 11.89,-17.06 21.79,-19.05 z" }),
        core_1.ActiveRenderer.createElement("path", { style: "opacity:1;fill:#333333;fill-opacity:1", id: "path871", d: "m 27.76,150.01 c 17.91,-0.02 35.82,-0.01 53.74,0 0.01,5.33 0.01,10.65 0,15.98 -6.08,0.02 -12.17,0 -18.25,0.02 0.11,13.66 -0.23,27.33 0.19,40.99 -5.9,0 -11.79,0.01 -17.68,-0.01 -0.02,-13.66 0,-27.32 -0.01,-40.98 -6,-0.02 -12,0 -17.99,-0.02 -0.02,-5.33 -0.02,-10.65 0,-15.98 z" }),
        core_1.ActiveRenderer.createElement("path", { style: "opacity:1;fill:#333333;fill-opacity:1", id: "path873", d: "m 160.25,150.01 c 12.66,0.34 26.85,-2.06 37.76,6 15.84,11.29 13.39,39.51 -4.62,47.42 -10.32,4.96 -22.08,3.26 -33.14,3.56 -0.01,-18.99 -0.01,-37.99 0,-56.98 z" })));
//# sourceMappingURL=Logo.tpl.js.map
});
___scope___.file("integration-todo/src/page/NotFoundPage.jsx", function(exports, require, module){
"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
"use strict";
const core_1 = require("~/core/src/index.js");
const i18n_1 = require("~/i18n/src/index.js");
const englishTranslations = tslib_1.__importStar(require("../translation/en.json"));
const germanTranslations = tslib_1.__importStar(require("../translation/de.json"));
const router_1 = require("~/router/src/index.js");
let NotFoundPage = class NotFoundPage extends HTMLElement {
    constructor(activeRoute) {
        super();
        this.activeRoute = activeRoute;
    }
    render() {
        return core_1.ActiveRenderer.createElement("st-t", { key: "page_not_found", values: { siteUrl: document.location.hash } });
    }
};
NotFoundPage = tslib_1.__decorate([
    i18n_1.Translations('de', germanTranslations),
    i18n_1.Translations('en', englishTranslations),
    core_1.WebComponent('app-not-found-page'),
    core_1.Use(i18n_1.Translate),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof router_1.ActiveRoute !== "undefined" && router_1.ActiveRoute) === "function" ? _a : Object])
], NotFoundPage);
exports.NotFoundPage = NotFoundPage;
//# sourceMappingURL=NotFoundPage.js.map
});
___scope___.file("integration-todo/src/translation/en.json", function(exports, require, module){
module.exports = {
  "add": "Add",
  "what_todo_next": "What's TODO next?",
  "remove": "Remove (after 1 sec.)",
  "copyright.firstLine": "Copyright 2019, the SpringType team.",
  "german": "German",
  "english": "English",
  "copyright": {
    "firstLine": "Copyright 2019, the SpringType team.",
    "secondLine": "Build: {{ branch, uppercase }} Time: {{ buildDate, DD-MM-YYYY_HH:mm:ss }}"
  }
};
});
___scope___.file("integration-todo/src/translation/de.json", function(exports, require, module){
module.exports = {
  "add": "Hinzufügen",
  "what_todo_next": "Was als nächstes?",
  "remove": "Löschen (nach 1 Sek.)",
  "german": "Deutsch",
  "english": "Englisch",
  "copyright": {
    "firstLine": "Copyright 2019, das SpringType team.",
    "secondLine": "Build: {{ branch, uppercase }} Zeit: {{ buildDate, DD-MM-YYYY_HH:mm:ss }}"
  }
};
});
___scope___.file("integration-todo/src/page/TodoDetailsPage.jsx", function(exports, require, module){
"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
"use strict";
const core_1 = require("~/core/src/index.js");
const TodoService_1 = require("../service/TodoService");
const AppLayout_1 = require("../element/layout/AppLayout");
const router_1 = require("~/router/src/index.js");
let TodoDetailsPage = class TodoDetailsPage extends HTMLElement {
    constructor(todoService, activeRoute) {
        super();
        this.todoService = todoService;
        this.activeRoute = activeRoute;
    }
    render() {
        const params = this.activeRoute.getParams();
        const todo = this.todoService.getById(parseInt(params.id, 10)) || {
            id: -1,
            text: 'Invalid id'
        };
        // what is returned, will be attached to this node
        return core_1.ActiveRenderer.createElement("app-layout", null,
            core_1.ActiveRenderer.createElement("div", { slot: "children" },
                core_1.ActiveRenderer.createElement("ul", null,
                    core_1.ActiveRenderer.createElement("li", null,
                        "ID: ",
                        todo.id),
                    core_1.ActiveRenderer.createElement("li", null,
                        "Text: ",
                        todo.text))));
    }
};
TodoDetailsPage = tslib_1.__decorate([
    core_1.WebComponent('example-todo-detail'),
    core_1.Use(AppLayout_1.AppLayout),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof TodoService_1.TodoService !== "undefined" && TodoService_1.TodoService) === "function" ? _a : Object, typeof (_b = typeof router_1.ActiveRoute !== "undefined" && router_1.ActiveRoute) === "function" ? _b : Object])
], TodoDetailsPage);
exports.TodoDetailsPage = TodoDetailsPage;
//# sourceMappingURL=TodoDetailsPage.js.map
});
___scope___.file("integration-todo/src/service/TodoService.js", function(exports, require, module){
"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
"use strict";
const core_1 = require("~/core/src/index.js");
const state_1 = require("~/state/src/index.js");
const IRootState_1 = require("../state/IRootState");
let TodoService = class TodoService {
    constructor(state) {
        this.state = state;
    }
    getById(id) {
        return this.state.TodoModel.todos
            .filter((todo) => {
            return todo.id === id;
        })[0];
    }
};
TodoService = tslib_1.__decorate([
    state_1.Stateful,
    core_1.Component,
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof IRootState_1.IRootState !== "undefined" && IRootState_1.IRootState) === "function" ? _a : Object])
], TodoService);
exports.TodoService = TodoService;
//# sourceMappingURL=TodoService.js.map
});
___scope___.file("integration-todo/src/page/TodoListPage.jsx", function(exports, require, module){
"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
"use strict";
const core_1 = require("~/core/src/index.js");
const TodoModel_1 = require("../model/TodoModel");
const i18n_1 = require("~/i18n/src/index.js");
const TodoListPage_style_1 = require("./TodoListPage.style");
const test_selectors_1 = require("../test-selectors");
let TodoListPage = class TodoListPage extends HTMLElement {
    constructor(localState, todoModel, textInputEl) {
        super();
        this.localState = localState;
        this.todoModel = todoModel;
        this.textInputEl = textInputEl;
        this.localChanges = {};
        this.onAddItem = () => {
            console.log('onAddItem', this.localState.newTodoItemText);
            // change @Provide @Field (just an example for inter-WebComponent communication)
            this.localChanges.newTodoItemText = this.localState.newTodoItemText;
            if (this.textInputEl.value !== '') {
                this.todoModel.addTodo({
                    text: this.localState.newTodoItemText,
                    id: Date.now(),
                    done: false
                });
                this.textInputEl.value = '';
            }
            this.textInputEl.focus();
        };
        this.onNewTodoTextChange = (evt) => {
            if (evt.key === "Enter") {
                this.onAddItem();
            }
            else {
                this.localState.newTodoItemText = evt.target.value;
            }
            evt.preventDefault();
        };
        console.log('textInputEl', this.textInputEl);
    }
    render() {
        return core_1.ActiveRenderer.createElement("st-fragment", null,
            core_1.ActiveRenderer.createElement("app-layout", null,
                core_1.ActiveRenderer.createElement("div", { slot: "children" },
                    core_1.ActiveRenderer.createElement("app-list-inner-partial", null),
                    core_1.ActiveRenderer.createElement("input", { "st-inject": { textInputEl: this }, type: "text", id: test_selectors_1.testSelectors.page.TodoListPage.newTodoItemText, placeholder: i18n_1.t("what_todo_next"), onkeyup: this.onNewTodoTextChange }),
                    core_1.ActiveRenderer.createElement("a", { className: "waves-effect waves-light btn", id: test_selectors_1.testSelectors.page.TodoListPage.addButton, onclick: this.onAddItem }, i18n_1.t('add')))));
    }
};
tslib_1.__decorate([
    core_1.Provide,
    core_1.Field,
    tslib_1.__metadata("design:type", Object)
], TodoListPage.prototype, "localChanges", void 0);
TodoListPage = tslib_1.__decorate([
    core_1.WebComponent('example-todo-list'),
    core_1.Style(TodoListPage_style_1.style),
    tslib_1.__metadata("design:paramtypes", [Object, typeof (_a = typeof TodoModel_1.TodoModel !== "undefined" && TodoModel_1.TodoModel) === "function" ? _a : Object, typeof (_b = typeof HTMLInputElement !== "undefined" && HTMLInputElement) === "function" ? _b : Object])
], TodoListPage);
exports.TodoListPage = TodoListPage;
//# sourceMappingURL=TodoListPage.js.map
});
___scope___.file("integration-todo/src/page/TodoListPage.style.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.style = () => ({
    // template string based styling
    '.todo-item': `
          cursor: pointer;
          background-color: #efefef;
          border-bottom: 1px solid #ccc;
          padding-left: 20px;
          padding-right: 20px;
    `,
    '.todo-item:hover': {
        'background-color': '#ccc'
    },
});
//# sourceMappingURL=TodoListPage.style.js.map
});
___scope___.file("integration-todo/src/index.jsx", function(exports, require, module){
"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
"use strict";
const core_1 = require("~/core/src/index.js");
const translation_config_1 = require("./translation-config");
let Index = class Index extends HTMLElement {
    constructor(appTranslation) {
        super();
        this.appTranslation = appTranslation;
    }
    render() {
        // use the router for this app
        return core_1.ActiveRenderer.createElement("st-router-outlet", null);
    }
};
Index = tslib_1.__decorate([
    core_1.WebComponent('example-todo-mvc'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof translation_config_1.AppTranslationConfig !== "undefined" && translation_config_1.AppTranslationConfig) === "function" ? _a : Object])
], Index);
exports.Index = Index;
//# sourceMappingURL=index.js.map
});
___scope___.file("integration-todo/src/translation-config.js", function(exports, require, module){
var buffer = require("buffer").Buffer;
"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
"use strict";
const i18n_1 = require("~/i18n/src/index.js");
const core_1 = require("~/core/src/index.js");
const date_fns_1 = require("date-fns");
const englishTranslations = tslib_1.__importStar(require("./translation/en.json"));
const germanTranslations = tslib_1.__importStar(require("./translation/de.json"));
const dateFnsLocales = {
    en: require("date-fns/locale/en/index.js"),
    de: require("date-fns/locale/de/index.js")
};
let localeId = 'de';
exports.dateFormat = (date, dateFormat) => {
    return date_fns_1.format(date, dateFormat, {
        locale: dateFnsLocales[localeId]
    });
};
let AppTranslationConfig = class AppTranslationConfig {
    constructor(translator) {
        this.translator = translator;
        // this method is called 4 times by the framework internally.
        // this is because of language detection and expected behaviour,
        // but we want to aggregate those calls and listen to only the
        // last one in a time-frame of 10ms. Thus, we buffer the event listener:
        const onLanguageChange = core_1.buffer((language) => {
            // keep translations in sync: when language changes, tell date-fns to change accordingly
            localeId = language;
            console.log('Language changed to: ', localeId);
        }, 10 /* ms */);
        translator.onLanguageChanged(onLanguageChange);
    }
};
AppTranslationConfig = tslib_1.__decorate([
    i18n_1.Translations('en', englishTranslations),
    i18n_1.Translations('de', germanTranslations),
    i18n_1.TranslationFormat('uppercase', (value) => (value || '').toUpperCase()),
    i18n_1.TranslationFormat('DD-MM-YYYY_HH:mm:ss', (value) => exports.dateFormat(value, 'dddd, DD-MM-YYYY HH:mm:ss')),
    core_1.Component,
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof i18n_1.Translator !== "undefined" && i18n_1.Translator) === "function" ? _a : Object])
], AppTranslationConfig);
exports.AppTranslationConfig = AppTranslationConfig;
//# sourceMappingURL=translation-config.js.map
});
___scope___.file("router/src/index.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
tslib_1.__exportStar(require("./ActiveRoute"), exports);
tslib_1.__exportStar(require("./RouterOutlet"), exports);
tslib_1.__exportStar(require("./decorator/Route"), exports);
tslib_1.__exportStar(require("./decorator/Router"), exports);
tslib_1.__exportStar(require("./interface/RouterConfig"), exports);
tslib_1.__exportStar(require("./interface/RouterImpl"), exports);
tslib_1.__exportStar(require("./enum/RouterImplType"), exports);
tslib_1.__exportStar(require("./constants"), exports);
tslib_1.__exportStar(require("./context/router"), exports);
//# sourceMappingURL=index.js.map
});
___scope___.file("router/src/ActiveRoute.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("~/core/src/index.js");
const router_1 = require("./context/router");
let ActiveRoute = class ActiveRoute {
    get routerImpl() {
        if (this._routerImpl)
            return this._routerImpl;
        const appRouter = router_1.getRouter();
        if (appRouter) {
            this._routerImpl = appRouter;
        }
        return this._routerImpl;
    }
    // TODO: getParamNumeric(paramName: string)
    getParams() {
        return this.routerImpl.getParams();
    }
    getPath() {
        return this.routerImpl.getPath();
    }
    reload() {
        return this.routerImpl.reload();
    }
    refresh() {
        this.routerImpl.refresh();
    }
    navigate(path, params) {
        return this.routerImpl.navigate(path, params);
    }
    registerRoutes(routes) {
        return this.routerImpl.registerRoutes(routes);
    }
};
ActiveRoute = tslib_1.__decorate([
    core_1.Component
], ActiveRoute);
exports.ActiveRoute = ActiveRoute;
//# sourceMappingURL=ActiveRoute.js.map
});
___scope___.file("router/src/interface/Routes.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=Routes.js.map
});
___scope___.file("router/src/interface/RouteDefinition.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=RouteDefinition.js.map
});
___scope___.file("router/src/interface/LocationChangeDecision.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=LocationChangeDecision.js.map
});
___scope___.file("router/src/RouterOutlet.jsx", function(exports, require, module){
"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
"use strict";
const ActiveRoute_1 = require("./ActiveRoute");
const core_1 = require("~/core/src/index.js");
let RouterOutlet = class RouterOutlet extends HTMLElement {
    constructor(activeRoute) {
        super();
        this.activeRoute = activeRoute;
        this.activeRoute.routerImpl.registerRouterOutlet(this);
        this.activeRoute.routerImpl.enable();
    }
    refresh() {
        this.element = null; // chance reference to trigger re-flow
        this.element = this.locationChangeDecision.element;
    }
    present(locationChangeDecision) {
        this.locationChangeDecision = locationChangeDecision;
        // clean renderer caches on whole re-render
        core_1.getRenderer().cleanCaches();
        if (this.isConnected) {
            this.element = this.locationChangeDecision.element;
        }
    }
    onFlow(initial) {
        if (initial) {
            this.element = this.locationChangeDecision.element;
        }
    }
    render() {
        if (this.element) {
            return this.element;
        }
        return core_1.ActiveRenderer.createElement("st-error-message", { message: "ERROR (RouterOutlet): No component found for route!" });
    }
};
tslib_1.__decorate([
    core_1.Attribute,
    tslib_1.__metadata("design:type", Object)
], RouterOutlet.prototype, "element", void 0);
RouterOutlet = tslib_1.__decorate([
    core_1.WebComponent('st-router-outlet'),
    core_1.Use(core_1.ErrorMessage),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof ActiveRoute_1.ActiveRoute !== "undefined" && ActiveRoute_1.ActiveRoute) === "function" ? _b : Object])
], RouterOutlet);
exports.RouterOutlet = RouterOutlet;
//# sourceMappingURL=RouterOutlet.js.map
});
___scope___.file("router/src/decorator/Route.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const registerRoute_1 = require("../function/registerRoute");
function Route(route, routeTargetWebComponent) {
    return (targetWebComponent) => {
        registerRoute_1.registerRoute(route, routeTargetWebComponent);
        return targetWebComponent;
    };
}
exports.Route = Route;
//# sourceMappingURL=Route.js.map
});
___scope___.file("router/src/function/registerRoute.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("~/core/src/index.js");
const ActiveRoute_1 = require("../ActiveRoute");
exports.registerRoute = (route, webComponent) => {
    const router = core_1.ApplicationContext.getInstance().getBean(ActiveRoute_1.ActiveRoute);
    router.registerRoutes({
        [route]: webComponent
    });
};
//# sourceMappingURL=registerRoute.js.map
});
___scope___.file("router/src/decorator/Router.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("../context/router");
function Router(routerConfig) {
    // called with @Router() or @Router({})
    if (!(typeof routerConfig === 'function')) {
        return (target) => {
            router_1.setRouter(routerConfig);
            return target;
        };
    }
}
exports.Router = Router;
//# sourceMappingURL=Router.js.map
});
___scope___.file("router/src/interface/RouterConfig.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=RouterConfig.js.map
});
___scope___.file("router/src/interface/RouterImpl.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=RouterImpl.js.map
});
___scope___.file("router/src/enum/RouterImplType.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RouterImplType;
(function (RouterImplType) {
    RouterImplType["HISTORY"] = "HISTORY";
})(RouterImplType = exports.RouterImplType || (exports.RouterImplType = {}));
//# sourceMappingURL=RouterImplType.js.map
});
___scope___.file("router/src/constants.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROUTE_NOT_FOUND = '*';
exports.ROUTE_BASE = '';
//# sourceMappingURL=constants.js.map
});
___scope___.file("router/src/context/router.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("~/core/src/index.js");
const defaultRouterConfig_1 = require("../defaultRouterConfig");
const getRouterImplInstance_1 = require("../function/getRouterImplInstance");
const ROUTER = 'ROUTER';
exports.getRouter = () => {
    let routerImpl = core_1.ApplicationContext.getInstance().get(ROUTER);
    // @Router(...) not used in application
    if (!routerImpl) {
        exports.setRouter(defaultRouterConfig_1.defaultRouterConfig);
    }
    return core_1.ApplicationContext.getInstance().get(ROUTER);
};
exports.setRouter = (appRouterConfig) => {
    core_1.ApplicationContext.getInstance().set(ROUTER, getRouterImplInstance_1.getRouterImplInstance(appRouterConfig));
};
//# sourceMappingURL=router.js.map
});
___scope___.file("router/src/defaultRouterConfig.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultRouterConfig = {};
//# sourceMappingURL=defaultRouterConfig.js.map
});
___scope___.file("router/src/function/getRouterImplInstance.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RouterImplType_1 = require("../enum/RouterImplType");
const HistoryRouterImpl_1 = require("../impl/HistoryRouterImpl");
exports.getRouterImplInstance = (routerConfig) => {
    let routerImpl;
    // custom impl provided via config
    if (routerConfig.impl) {
        routerImpl = routerConfig.impl;
    }
    else {
        // using standard implementation
        switch (routerConfig.type) {
            default:
            case RouterImplType_1.RouterImplType.HISTORY:
                routerImpl = new HistoryRouterImpl_1.HistoryRouterImpl();
                break;
        }
    }
    return routerImpl;
};
//# sourceMappingURL=getRouterImplInstance.js.map
});
___scope___.file("router/src/impl/HistoryRouterImpl.jsx", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const core_1 = require("~/core/src/index.js");
const constants_1 = require("../constants");
let HistoryRouterImpl = class HistoryRouterImpl {
    constructor() {
        this.TOKENIZED_ROUTES = {};
        this.ROUTE_MAP = {};
        this.CURRENT_PARAMS = {};
    }
    setParams(params) {
        this.CURRENT_PARAMS = params;
    }
    getParams() {
        return this.CURRENT_PARAMS;
    }
    getPath() {
        return this.CURRENT_PATH;
    }
    reload() {
        this.navigate(this.getPath(), this.getParams());
    }
    refresh() {
        this.ROUTER_OUTLET.refresh();
    }
    registerRoutes(routes) {
        for (let route in routes) {
            this.TOKENIZED_ROUTES[route] = this.tokenizeRoute(route, true);
        }
        this.ROUTE_MAP = {
            ...this.ROUTE_MAP,
            ...routes
        };
    }
    tokenizeRoute(route, registration = false) {
        const tokenizedRoute = route.split('/');
        if (registration && route[0] === '/') {
            tokenizedRoute[0] = '#';
        }
        if (tokenizedRoute[0] !== '#') {
            tokenizedRoute.unshift('#');
        }
        return tokenizedRoute;
    }
    match(realRoute) {
        const tokenizedRoute = this.tokenizeRoute(realRoute);
        const params = {};
        for (let route in this.TOKENIZED_ROUTES) {
            const tokenizedRouteCandidate = this.TOKENIZED_ROUTES[route];
            let routeMatches = true;
            for (let i = 0; i < tokenizedRouteCandidate.length; i++) {
                const token = tokenizedRouteCandidate[i];
                if (token.startsWith(':')) {
                    params[token.replace(':', '')] = tokenizedRoute[i];
                }
                else {
                    if (token !== tokenizedRoute[i]) {
                        routeMatches = false;
                        break; // stop looping further, path doesn't match
                    }
                }
            }
            if (routeMatches) {
                const resolvedComponentAndParams = this.getComponent(this.ROUTE_MAP[route]);
                return {
                    params: {
                        ...resolvedComponentAndParams.params,
                        ...params,
                    },
                    element: resolvedComponentAndParams.element,
                    route
                };
            }
        }
        if (this.ROUTE_MAP[constants_1.ROUTE_NOT_FOUND]) {
            const resolvedComponentAndParams = this.getComponent(this.ROUTE_MAP[constants_1.ROUTE_NOT_FOUND]);
            return {
                route: constants_1.ROUTE_NOT_FOUND,
                element: resolvedComponentAndParams.element,
                params: resolvedComponentAndParams.params
            };
        }
        else {
            return {
                route: constants_1.ROUTE_NOT_FOUND,
                element: core_1.ActiveRenderer.createElement("st-error-message", { message: `No Web Component found for rendering this route. Please specify a route for ${realRoute.replace('#', '')} or ROUTE_WILDCARD("${constants_1.ROUTE_NOT_FOUND}")!` }),
                params: {}
            };
        }
    }
    isWebComponentClass(component) {
        return !!core_1.WebComponentReflector.getTagName(component);
    }
    getComponent(cmpOrDef) {
        let element = cmpOrDef.element ?
            cmpOrDef.element :
            cmpOrDef;
        if (this.isWebComponentClass(element)) {
            const tagName = core_1.WebComponentReflector.getTagName(element);
            element = {
                name: tagName,
                attributes: [],
                children: []
            };
        }
        const params = cmpOrDef.params || {};
        return {
            element,
            params
        };
    }
    async decideOnLocationChange(hash) {
        const decision = this.CURRENT_DECISION = this.match(hash);
        if (decision !== null) {
            if (!this.ROUTER_OUTLET) {
                throw new Error('You must place a <router-outlet /> in your HTML.');
            }
            else {
                // set active route params
                this.setParams(decision.params);
                let isAllowedToPresent = true;
                if (decision.guard && typeof decision.guard === 'function') {
                    isAllowedToPresent = await decision.guard(decision);
                }
                if (isAllowedToPresent) {
                    this.ROUTER_OUTLET.present(decision);
                }
            }
        }
        else {
            throw new Error(`No route registered for hash url: '${hash}'. Add this route to an @WebModule({ route: { ... } })!`);
        }
    }
    disable() {
        // numb callback
        window.onpopstate = () => { };
    }
    async onLocationChange() {
        await this.decideOnLocationChange(window.location.hash);
    }
    async enable() {
        // register callback
        window.onpopstate = async () => {
            await this.onLocationChange();
        };
        // initial call for base URL
        await this.onLocationChange();
    }
    registerRouterOutlet(routerOutlet) {
        this.ROUTER_OUTLET = routerOutlet;
    }
    navigate(path, params) {
        let route = path;
        for (let param in params) {
            if (params.hasOwnProperty(param)) {
                route = route.replace(':' + param, params[param]);
            }
        }
        this.CURRENT_PATH = '#' + route;
        window.location.href = this.CURRENT_PATH;
    }
};
HistoryRouterImpl = tslib_1.__decorate([
    core_1.Component,
    core_1.Use(core_1.ErrorMessage)
], HistoryRouterImpl);
exports.HistoryRouterImpl = HistoryRouterImpl;
//# sourceMappingURL=HistoryRouterImpl.js.map
});
___scope___.file("router/src/interface/TokenizedRoutes.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//# sourceMappingURL=TokenizedRoutes.js.map
});
	___scope___.entry = "integration-todo/src/index.module.js";
})
FuseBox.import("fuse-box-hot-reload").connect({"port":4444})
//# sourceMappingURL=02e10d476_app.js.map