'use strict';

const BASE_URL = new URL("http://tasks-api.std-900.ist.mospolytech.ru/");
const API_KEY = "50d2199a-42dc-447d-81ed-d68a443b697e";

const varToString = varObj => Object.keys(varObj)[0].toLowerCase();

const showMessage = async (title, message, type = "alert-success") => {
    let alert = document.getElementById(
        "alert-template"
    ).content.firstElementChild.cloneNode(true);
    const stitle = document.createElement("strong");
    stitle.innerHTML = title;
    alert.querySelector(".msg").innerHTML = `${stitle.outerHTML} ${message}`;
    alert.classList.add(type);
    setTimeout(() => alert.remove(), 5000);
    document.querySelector('.alerts').append(alert);
};

const dataShield = async (data) => {
    let formBody = [];
    for (let property in data) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(data[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    return formBody;
};

const getTasks = async () => {
    let endpoint = new URL("api/tasks", BASE_URL);
    endpoint.searchParams.set(varToString({ API_KEY }), API_KEY);
    let response = await fetch(endpoint);
    if (response.ok) {
        let datas = await response.json();
        if ("error" in datas) throw new Error(datas.error);
        else {
            return datas;
        }
    } else throw new Error(response.status);
};

const getTask = async (taskId) => {
    let endpoint = new URL(`api/tasks/${taskId}`, BASE_URL);
    endpoint.searchParams.set(varToString({ API_KEY }), API_KEY);
    let response = await fetch(endpoint);
    if (response.ok) {
        let data = await response.json();
        if ("error" in data) throw new Error(data.error);
        else {
            return data;
        }
    } else throw new Error(response.status);
};

const setTask = async (data) => {
    let endpoint = new URL("api/tasks", BASE_URL);
    endpoint.searchParams.set(varToString({ API_KEY }), API_KEY);
    let response = await fetch(
        endpoint,
        {
            headers: new Headers(
                {
                    'content-type': 'application/x-www-form-urlencoded',
                }
            ),
            method: "POST",
            body: await dataShield(data),
            mode: "cors"
        }
    );
    if (response.ok) {
        let data = await response.json();
        if ("error" in data) throw new Error(data.error);
        else {
            return data;
        }
    } else throw new Error(response.status);
};

const editTask = async (taskId, data) => {
    let endpoint = new URL(`api/tasks/${taskId}`, BASE_URL);
    endpoint.searchParams.set(varToString({ API_KEY }), API_KEY);
    let response = await fetch(
        endpoint,
        {
            headers: new Headers(
                {
                    'content-type': 'application/x-www-form-urlencoded',
                }
            ),
            method: "PUT",
            body: await dataShield(data),
            mode: "cors"
        }
    );
    if (response.ok) {
        let data = await response.json();
        if ("error" in data) throw new Error(data.error);
        else {
            return data;
        }
    } else throw new Error(response.status);
};

const deleteTask = async (taskId) => {
    let endpoint = new URL(`api/tasks/${taskId}`, BASE_URL);
    endpoint.searchParams.set(varToString({ API_KEY }), API_KEY);
    let response = await fetch(endpoint, {
        method: "DELETE"
    });
    if (response.ok) {
        let data = await response.json();
        if (Number.isInteger(data)) return data;
        else {
            throw new Error(data.error);
        }
    } else throw new Error(response.status);
};

const getTasksData = async () => {
    try {
        return await getTasks();
    } catch (err) {
        throw err;
    }
};

const getTaskData = async (taskId) => {
    try {
        return await getTask(taskId);
    } catch (err) {
        throw err;
    }
};

const setTaskData = async (data) => {
    try {
        data = await setTask(data);
        showMessage(
            "Уведомление!",
            `Успешно добавлена задача ${data.name}`
        );
        return data;
    } catch (err) {
        throw err;
    }
};

const editTaskData = async (taskId, data) => {
    try {
        data = await editTask(taskId, data);
        showMessage(
            "Уведомление!",
            `Успешно изменена задача ${data.name}`
        );
        return data;
    } catch (err) {
        throw err;
    }
};

const deleteTaskData = async (taskId) => {
    try {
        await deleteTask(taskId);
        showMessage(
            "Уведомление!",
            "Успешно удалена задача"
        );
    } catch (err) {
        throw err;
    }
};

const changeListCounter = async (list, incOrDec = true) => {
    let todoList = document.querySelector('#to-do-list');
    let doneList = document.querySelector('#done-list');
    let listCounter = (list == 'to-do-list' ? todoList : doneList
    ).closest('.card').querySelector(
        '.tasks-counter'
    );
    listCounter.innerHTML = Number.parseInt(listCounter.innerHTML) +
        (incOrDec ? 1 : -1);
};

const onColumnChange = async (event) => {
    try {
        let taskId = event.target.closest('.task').id;
        let data = await getTaskData(taskId);
        data.status = data.status == 'to-do' ? 'done' : 'to-do';
        data = await editTaskData(data.id, data);
        await window["editTaskNode"](data);
    } catch (err) {
        showMessage("Ошибка!", err.message, "alert-danger");
    }
};

const addTaskNode = async (data) => {
    try {
        let taskNode = document.querySelector(
            '#task-template'
        ).content.firstElementChild.cloneNode(true);
        let todoList = document.querySelector('#to-do-list');
        let doneList = document.querySelector('#done-list');
        taskNode.querySelector('.task-name').innerHTML = data.name;
        taskNode.setAttribute('id', data.id);
        (data.status == 'to-do' ? todoList : doneList).append(taskNode);
        taskNode.querySelector('.move-to-do').onclick = onColumnChange;
        document.querySelector('.move-done').onclick = onColumnChange;
        await changeListCounter(`${data.status}-list`);
    } catch (err) {
        throw err;
    }

};

const deleteTaskNode = async (data, currentList) => {
    try {
        let taskNode = document.getElementById(data.id);
        taskNode.remove();
        await changeListCounter(currentList, false);
    } catch (err) {
        throw err;
    }
};

async function editTaskNode(data) {
    try {
        let taskNode = document.getElementById(data.id);
        let currentList = taskNode.closest("ul").id;
        if (currentList != `${data.status}-list`) {
            await deleteTaskNode(data, currentList);
            await addTaskNode(data);
        } else {
            taskNode.querySelector(
                '.task-name'
            ).innerHTML = data.name;
        }
    } catch (err) {
        throw err;
    }
}

const onAddClick = async (event) => {
    try {
        let form = event.target.closest('.modal').querySelector('form');
        let data = {
            name: form.elements['taskName'].value,
            desc: form.elements['taskDesc'].value,
            status: form.elements['taskState'].value
        };
        form.reset();
        data = await setTaskData(data);
        await addTaskNode(data);
    } catch (err) {
        showMessage("Ошибка!", err.message, "alert-danger");
    }
};

const onEditClick = async (event) => {
    try {
        let form = event.target.closest('.modal').querySelector('form');
        const data = {
            id: form.id,
            name: form.elements['taskName'].value,
            desc: form.elements['taskDesc'].value,
            status: form.elements['taskState'].value
        };
        form.reset();
        await editTaskNode(data);
        await editTaskData(form.id, data);
        form.id = "";
    } catch (err) {
        showMessage("Ошибка!", err.message, "alert-danger");
    }
};

const onDeleteClick = async (event) => {
    try {
        let form = event.target.closest('.modal').querySelector('form');
        form.reset();
        let data = await getTaskData(form.id);
        await deleteTaskNode(data, `${data.status}-list`);
        await deleteTaskData(form.id);
        form.id = "";
    } catch (err) {
        showMessage("Ошибка!", err.message, "alert-danger");
    }
};

const onEditOpen = async (event) => {
    let form = event.target.querySelector('form');
    let taskId = event.relatedTarget.closest('.task').id;
    form.id = taskId;
    let data = await getTaskData(taskId);
    form.elements['taskName'].value = data['name'];
    form.elements['taskDesc'].value = data['desc'];
    form.elements['taskState'].value = data['status'];
};

const onViewOpen = async (event) => {
    let form = event.target.querySelector('form');
    let taskId = event.relatedTarget.closest('.task').id;
    let data = await getTaskData(taskId);
    form.elements['taskName'].value = data['name'];
    form.elements['taskDesc'].value = data['desc'];
    form.elements['taskState'].value = data['status'];
};

const onDeleteOpen = async (event) => {
    let form = event.target.querySelector('form');
    let taskId = event.relatedTarget.closest('.task').id;
    form.id = taskId;
    let data = await getTaskData(taskId);
    form.elements['taskName'].value = data['name'];
    form.elements['taskDesc'].value = data['desc'];
    form.elements['taskState'].value = data['status'];
};

window.onload = async () => {
    try {
        let datas = await getTasksData();
        document.getElementById('task_add').onclick = onAddClick;
        document.getElementById('task_edit').onclick = onEditClick;
        document.getElementById('task_delete').onclick = onDeleteClick;
        for (let i = 0; i < datas["tasks"]["length"]; i++) {
            await addTaskNode(await getTaskData(datas.tasks[i].id));
        }
        let modalEdit = document.getElementById('ModalEdit');
        modalEdit.addEventListener('show.bs.modal', onEditOpen);
        let modalView = document.getElementById('ModalView');
        modalView.addEventListener('show.bs.modal', onViewOpen);
        let modalDelete = document.getElementById('ModalDelete');
        modalDelete.addEventListener('show.bs.modal', onDeleteOpen);
    } catch (err) { }
};