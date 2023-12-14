**Model Table**

| Columns     | Type    |
| ----------- | ------- |
| id          | INTEGER |
| title       | TEXT    |
| description | TEXT    |
| date        | DATE    |
| status      | TEXT    |

### API 1

#### Path: `/tasks/`

#### Method: `GET`

#### Description:

Returns a list of all tasks in the model table

#### Response

```
[
  {
    "id": 1,
    "title": "HomeWork",
    "description": "Complete the home work",
    "date": "2023-12-14",
    "status": "Pending"
  },

  ...
]
```

### API 2

#### Path: `/tasks/:TaskId/`

#### Method: `GET`

#### Description:

Returns a task based on the task ID

#### Response

```
{
    "id": 1,
    "title": "HomeWork",
    "description": "Complete the home work",
    "date": "2023-12-14",
    "status": "Pending"
}
```

### API 3

#### Path: `/tasks/`

#### Method: `POST`

#### Description:

Create a task in the model table, `id` is auto-incremented

#### Request

```
{
    "title": "HomeWork",
    "description": "Complete the home work",
    "date": "2023-12-14",
    "status": "Pending"
}
```

#### Response

```
Task Created Successfully
```

### API 4

#### Path: `/tasks/:taskId/`

#### Method: `PUT`

#### Description:

Updates the details of a specific task based on the task id

#### Request

```
{
    "title": "HomeWork",
    "description": "Complete the home work",
    "date": "2023-12-14",
    "status": "Pending"
}
```

#### Response

```

Task Updated Successfully

```

### API 5

#### Path: `/tasks/:taskId/`

#### Method: `DELETE`

#### Description:

Deletes a task from the model table based on the task id

#### Response

```
Task Deleted Successfully

```
