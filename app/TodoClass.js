define(["js/core/Application", "js/core/I18n", "app/model/Todo", "app/collection/TodoList", "js/data/FilterDataView", "js/data/LocalStorageDataSource"],
    function (Application, I18n, Todo, TodoList, FilterDataView, DataSource) {

        var ENTER_KEY = 13;

        return Application.inherit("app.TodoClass", {
            /**
             * Initializes the app
             * In this method we set the initial models
             */
            initialize: function () {
                this.set("todoList", null);
                this.set("filterList", null);
                this.set("newTodo", new Todo());
                this.callBase();
            },
            /**
             * Are triggered
             */
            showAll: function () {
                this.$.filterList.set("filter", 'all');
            },
            showActive: function () {
                this.$.filterList.set("filter", "active");
            },
            showCompleted: function () {
                this.$.filterList.set("filter", "completed");
            },
            /**
             * The rest is just controller stuff
             */
            addNewTodo: function (e) {
                if (e.$.keyCode === ENTER_KEY) {
                    var tmp = this.get("newTodo");
                    if (tmp.hasTitle()) {
                        var newTodo = this.$.dataSource.createEntity(Todo);
                        newTodo.set({title: tmp.get("title"), completed: false});
                        this.get("todoList").add(newTodo);

                        // save the new item
                        newTodo.save();

                        tmp.set("title", "");
                    }
                }
            },
            markAllComplete: function (e, input) {
                this.get("todoList").markAll(input.get("checked"));
            },
            clearCompleted: function () {
                this.get("todoList").clearCompleted();
            },
            removeTodo: function (e) {
                this.get("todoList").remove(e.$);
            },
            /**
             * Start the application and render it to the body ...
             */
            start: function (parameter, callback) {
                // false - disables autostart
                this.callBase(parameter, false);

                this.set('todoList',this.$.dataSource.createCollection(TodoList));

                // fetch all todos, can be done sync because we use localStorage
                this.$.todoList.fetch();

                this.set('filterList', new FilterDataView({
                    baseList: this.get("todoList"),
                    filter: 'all',
                    filterFnc: function (item) {
                        var filter = this.$.filter;
                        if (filter == "active") {
                            return !item.isCompleted();
                        } else if (filter == "completed") {
                            return item.isCompleted();
                        } else {
                            return true;
                        }
                }}));

                this.$.i18n.set("locale", "en_EN", {silent: true});
                this.$.i18n.loadLocale("en_EN", callback);
            },
            // HELPER METHODS
            // transform method for trimming input value before setting it as title
            trim: function(value){
                return value.trim();
            },
            // compares 2 strings
            isStringEqual: function (str1, str2) {
                return str1 == str2;
            }
        });
    });