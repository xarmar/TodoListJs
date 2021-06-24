/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
// todoModule
var todoModule = (function () {
    var Todo = /** @class */ (function () {
        function Todo(title, priority, description) {
            this.title = title;
            this.priority = priority;
            this.description = description;
            // this.dueDate = dueDate;
            this.notes = null;
            this.completed = false;
        }
        Todo.prototype.changeTitle = function (newTitle) {
            this.title = newTitle;
        };
        Todo.prototype.changePriority = function (newPriority) {
            this.priority = newPriority;
        };
        Todo.prototype.changeDescription = function (newDescription) {
            this.description = newDescription;
        };
        Todo.prototype.changeDueDate = function (newDueDate) {
            this.dueDate = newDueDate;
        };
        Todo.prototype.addNewNote = function (noteToAdd) {
            this.notes.push(noteToAdd);
        };
        Todo.prototype.toggleCompleteStatus = function () {
            this.completed = !this.completed;
        };
        return Todo;
    }());
    var newTodo = function (title, priority, description) {
        var newTodoObject = new Todo(title, priority, description);
        return newTodoObject;
    };
    return {
        newTodo: newTodo,
    };
})();
var projectModule = (function () {
    var Project = /** @class */ (function () {
        function Project(title, description) {
            this.title = title;
            this.description = description;
            this.children = [];
        }
        return Project;
    }());
    var newProject = function (title, description) {
        var newObject = new Project(title, description);
        return newObject;
    };
    var addTodoToProject = function (todo, project) {
        project.children.push(todo);
    };
    return {
        newProject: newProject,
        addTodoToProject: addTodoToProject
    };
})();
var todoTest = todoModule.newTodo('Buy pizza for Tom', 'high');
console.log(todoTest);
todoTest.changeDescription('forgot to add this description, here it is! I will change status to true!');
todoTest.toggleCompleteStatus();
console.log(todoTest);
todoTest.toggleCompleteStatus();
console.log(todoTest);

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvbGlzdC5qcy8uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGFBQWE7QUFDYixJQUFNLFVBQVUsR0FBRyxDQUFDO0lBSXBCO1FBU0ksY0FBWSxLQUFhLEVBQUUsUUFBa0IsRUFBRSxXQUFvQjtZQUMvRCxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztZQUN6QixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztZQUMvQiwwQkFBMEI7WUFDMUIsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFDbEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDM0IsQ0FBQztRQUVELDBCQUFXLEdBQVgsVUFBYSxRQUFnQjtZQUN6QixJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQztRQUMxQixDQUFDO1FBRUQsNkJBQWMsR0FBZCxVQUFnQixXQUFxQjtZQUNqQyxJQUFJLENBQUMsUUFBUSxHQUFHLFdBQVcsQ0FBQztRQUNoQyxDQUFDO1FBRUQsZ0NBQWlCLEdBQWpCLFVBQW1CLGNBQXNCO1lBQ3JDLElBQUksQ0FBQyxXQUFXLEdBQUcsY0FBYyxDQUFDO1FBQ3RDLENBQUM7UUFFRCw0QkFBYSxHQUFiLFVBQWUsVUFBZ0I7WUFDM0IsSUFBSSxDQUFDLE9BQU8sR0FBRyxVQUFVLENBQUM7UUFDOUIsQ0FBQztRQUVELHlCQUFVLEdBQVYsVUFBWSxTQUFpQjtZQUN6QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMvQixDQUFDO1FBRUQsbUNBQW9CLEdBQXBCO1lBQ0ksSUFBSSxDQUFDLFNBQVMsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDckMsQ0FBQztRQUNMLFdBQUM7SUFBRCxDQUFDO0lBRUQsSUFBTSxPQUFPLEdBQUcsVUFBQyxLQUFhLEVBQUUsUUFBa0IsRUFBRSxXQUFvQjtRQUNwRSxJQUFJLGFBQWEsR0FBRyxJQUFJLElBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQzNELE9BQU8sYUFBYSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxPQUFPO1FBQ0gsT0FBTyxFQUFFLE9BQU87S0FDbkI7QUFFRCxDQUFDLENBQUMsRUFBRSxDQUFDO0FBR0wsSUFBTSxhQUFhLEdBQUcsQ0FBQztJQUV2QjtRQUtJLGlCQUFZLEtBQWEsRUFBRSxXQUFvQjtZQUMzQyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztZQUNuQixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztZQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUN2QixDQUFDO1FBQ0wsY0FBQztJQUFELENBQUM7SUFFRCxJQUFNLFVBQVUsR0FBRyxVQUFDLEtBQWEsRUFBRSxXQUFvQjtRQUNuRCxJQUFJLFNBQVMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDaEQsT0FBTyxTQUFTLENBQUM7SUFDckIsQ0FBQztJQUVELElBQU0sZ0JBQWdCLEdBQUcsVUFBQyxJQUFZLEVBQUUsT0FBZ0I7UUFDcEQsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVELE9BQU87UUFDSCxVQUFVLEVBQUUsVUFBVTtRQUN0QixnQkFBZ0IsRUFBRyxnQkFBZ0I7S0FDdEM7QUFFRCxDQUFDLENBQUMsRUFBRSxDQUFDO0FBRUwsSUFBSSxRQUFRLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUMvRCxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3RCLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQywyRUFBMkUsQ0FBQyxDQUFDO0FBQ3hHLFFBQVEsQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO0FBQ2hDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDdEIsUUFBUSxDQUFDLG9CQUFvQixFQUFFLENBQUM7QUFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0b2RvTW9kdWxlXG5jb25zdCB0b2RvTW9kdWxlID0gKCgpID0+IHtcblxudHlwZSBQcmlvcml0eSA9ICdsb3cnIHwgJ21lZGl1bScgfCAnaGlnaCc7XG5cbmNsYXNzIFRvZG8ge1xuICAgIHBhcmVudFByb2plY3Q6IHN0cmluZztcbiAgICBwcmlvcml0eTogUHJpb3JpdHk7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICAgIGR1ZURhdGU6IERhdGU7XG4gICAgbm90ZXM6IHN0cmluZ1tdO1xuICAgIGNvbXBsZXRlZDogYm9vbGVhbjtcbiAgICBcbiAgICBjb25zdHJ1Y3Rvcih0aXRsZTogc3RyaW5nLCBwcmlvcml0eTogUHJpb3JpdHksIGRlc2NyaXB0aW9uPzogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcbiAgICAgICAgdGhpcy5wcmlvcml0eSA9IHByaW9yaXR5O1xuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgICAgIC8vIHRoaXMuZHVlRGF0ZSA9IGR1ZURhdGU7XG4gICAgICAgIHRoaXMubm90ZXMgPSBudWxsO1xuICAgICAgICB0aGlzLmNvbXBsZXRlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGNoYW5nZVRpdGxlIChuZXdUaXRsZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMudGl0bGUgPSBuZXdUaXRsZTtcbiAgICB9XG5cbiAgICBjaGFuZ2VQcmlvcml0eSAobmV3UHJpb3JpdHk6IFByaW9yaXR5KSB7XG4gICAgICAgIHRoaXMucHJpb3JpdHkgPSBuZXdQcmlvcml0eTtcbiAgICB9XG5cbiAgICBjaGFuZ2VEZXNjcmlwdGlvbiAobmV3RGVzY3JpcHRpb246IHN0cmluZykge1xuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gbmV3RGVzY3JpcHRpb247XG4gICAgfVxuICAgIFxuICAgIGNoYW5nZUR1ZURhdGUgKG5ld0R1ZURhdGU6IERhdGUpIHtcbiAgICAgICAgdGhpcy5kdWVEYXRlID0gbmV3RHVlRGF0ZTtcbiAgICB9XG5cbiAgICBhZGROZXdOb3RlIChub3RlVG9BZGQ6IHN0cmluZykge1xuICAgICAgICB0aGlzLm5vdGVzLnB1c2gobm90ZVRvQWRkKTtcbiAgICB9XG5cbiAgICB0b2dnbGVDb21wbGV0ZVN0YXR1cygpIHtcbiAgICAgICAgdGhpcy5jb21wbGV0ZWQgPSAhdGhpcy5jb21wbGV0ZWQ7XG4gICAgfVxufVxuXG5jb25zdCBuZXdUb2RvID0gKHRpdGxlOiBzdHJpbmcsIHByaW9yaXR5OiBQcmlvcml0eSwgZGVzY3JpcHRpb24/OiBzdHJpbmcpID0+IHtcbiAgICBsZXQgbmV3VG9kb09iamVjdCA9IG5ldyBUb2RvKHRpdGxlLCBwcmlvcml0eSwgZGVzY3JpcHRpb24pO1xuICAgIHJldHVybiBuZXdUb2RvT2JqZWN0O1xufVxuXG5yZXR1cm4ge1xuICAgIG5ld1RvZG86IG5ld1RvZG8sXG59XG5cbn0pKCk7XG5cblxuY29uc3QgcHJvamVjdE1vZHVsZSA9ICgoKSA9PiB7XG5cbmNsYXNzIFByb2plY3Qge1xuICAgIHRpdGxlOiBzdHJpbmc7XG4gICAgZGVzY3JpcHRpb246IHN0cmluZztcbiAgICBjaGlsZHJlbjogb2JqZWN0W107XG4gICAgXG4gICAgY29uc3RydWN0b3IodGl0bGU6IHN0cmluZywgZGVzY3JpcHRpb24/OiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb247XG4gICAgICAgIHRoaXMuY2hpbGRyZW4gPSBbXTtcbiAgICB9XG59XG5cbmNvbnN0IG5ld1Byb2plY3QgPSAodGl0bGU6IHN0cmluZywgZGVzY3JpcHRpb24/OiBzdHJpbmcpID0+IHtcbiAgICBsZXQgbmV3T2JqZWN0ID0gbmV3IFByb2plY3QodGl0bGUsIGRlc2NyaXB0aW9uKTtcbiAgICByZXR1cm4gbmV3T2JqZWN0O1xufVxuXG5jb25zdCBhZGRUb2RvVG9Qcm9qZWN0ID0gKHRvZG86IG9iamVjdCwgcHJvamVjdDogUHJvamVjdCkgPT4ge1xuICAgIHByb2plY3QuY2hpbGRyZW4ucHVzaCh0b2RvKTtcbn1cblxucmV0dXJuIHtcbiAgICBuZXdQcm9qZWN0OiBuZXdQcm9qZWN0LFxuICAgIGFkZFRvZG9Ub1Byb2plY3QgOiBhZGRUb2RvVG9Qcm9qZWN0XG59XG5cbn0pKCk7XG5cbmxldCB0b2RvVGVzdCA9IHRvZG9Nb2R1bGUubmV3VG9kbygnQnV5IHBpenphIGZvciBUb20nLCAnaGlnaCcpO1xuY29uc29sZS5sb2codG9kb1Rlc3QpO1xudG9kb1Rlc3QuY2hhbmdlRGVzY3JpcHRpb24oJ2ZvcmdvdCB0byBhZGQgdGhpcyBkZXNjcmlwdGlvbiwgaGVyZSBpdCBpcyEgSSB3aWxsIGNoYW5nZSBzdGF0dXMgdG8gdHJ1ZSEnKTtcbnRvZG9UZXN0LnRvZ2dsZUNvbXBsZXRlU3RhdHVzKCk7XG5jb25zb2xlLmxvZyh0b2RvVGVzdCk7XG50b2RvVGVzdC50b2dnbGVDb21wbGV0ZVN0YXR1cygpO1xuY29uc29sZS5sb2codG9kb1Rlc3QpOyJdLCJzb3VyY2VSb290IjoiIn0=