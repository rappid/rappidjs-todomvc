define(["js/core/Application", "js/core/I18n", "app/model/Todo", "app/collection/TodoList", "js/data/ListView"],
    function (Application, I18n, Todo, TodoList, ListView) {

        var ENTER_KEY = 13;

        return Application.inherit("app.TodoClass", {
            inject:{
                i18n:I18n
            },
            /**
             * Initializes the app
             * In this method we set the initial models
             */
            initialize:function () {

                this.set("todoList", new TodoList());
                this.set("filterList", new ListView({
                    list:this.get("todoList"),
                    filter:'all',
                    filterFnc:function (item) {
                        var filter = this.$.filter;
                        if (filter == "active") {
                            return !item.isCompleted();
                        } else if (filter == "completed") {
                            return item.isCompleted();
                        } else {
                            return true;
                        }
                    }}));
                this.set("newTodo", new Todo());
                this.set("locales", ["en_EN", "de_DE"]);
            },
            /**
             * Are triggered
             */
            showAll:function () {
                this.$.filterList.set("filter", 'all');
            },
            showActive:function () {
                this.$.filterList.set("filter", "active");
            },
            showCompleted:function () {
                this.$.filterList.set("filter", "completed");
            },
            isStringEqual:function (route, filter) {
                return route == filter;
            },
            /**
             * The rest is just controller stuff
             */
            addNewTodo:function (e) {
                if (e.$.keyCode === ENTER_KEY) {
                    var tmp = this.get("newTodo");
                    if (tmp.hasTitle()) {
                        var newTodo = new Todo({title:tmp.get("title")});
                        newTodo.setCompleted(false);
                        this.get("todoList").add(newTodo);
                        tmp.set("title", "");
                    }
                }
            },
            markAllComplete:function (e, input) {
                this.get("todoList").markAll(input.get("checked"));
            },
            clearCompleted:function (e) {
                this.get("todoList").clearCompleted();
            },
            removeTodo:function (e, el) {
                this.get("todoList").remove(e.$);
            },
            sort:function () {
                this.get("todoList").sort(function (t1, t2) {
                    if (t1.get("isDone") && t2.get("isDone")) {
                        return 0;
                    } else if (t1.get("isDone") === true && !t2.get("isDone")) {
                        return 1;
                    } else {
                        return -1;
                    }
                });
            },
            /**
             * Start the application and render it to the body ...
             */
            start:function (parameter, callback) {
                // false - disables autostart
                this.callBase(parameter, false);

                this.$.i18n.set("locale", "en_EN", {silent:true});
                this.$.i18n.loadLocale("en_EN", callback);
            }
        });
    });