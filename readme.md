# roadmap-taskTracker

## how to use

Adding a new task

 ```bash
node index add "Buy groceries"
```
Updating and deleting tasks
 ```bash
node index update 1 "Buy groceries and cook dinner"
node index delete 1
```
Marking a task as in progress or done
 ```bash
node index mark-in-progress 1
node index mark-done 1
```
Listing all tasks
 ```bash
node index list
```
Listing tasks by status
 ```bash
node index list done
node index list todo
node index list in-progress
node index list deleted
```