const taskInput = document.getElementById('newTask');
const taskList = document.getElementById('taskList');

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        const listItem = document.createElement('li');
        listItem.className = 'bg-white p-3 rounded shadow flex items-center justify-between';
        listItem.innerHTML = `
            <span>${taskText}</span>
            <div>
                <button class="text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mr-1" onclick="editTask(this)">Edit</button>
                <button class="text-sm bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline" onclick="deleteTask(this)">Delete</button>
            </div>
        `;
        taskList.appendChild(listItem);
        taskInput.value = "";
    }
}

function deleteTask(button) {
    const listItem = button.parentNode.parentNode;
    taskList.removeChild(listItem);
}

function editTask(button) {
    const listItem = button.parentNode.parentNode;
    const taskSpan = listItem.querySelector('span');
    const currentText = taskSpan.textContent;
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.value = currentText;
    inputField.className = 'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-2';

    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.className = 'text-sm bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline';
    saveButton.onclick = function() {
        taskSpan.textContent = inputField.value;
        listItem.replaceChild(taskSpan, inputField);
        listItem.replaceChild(button, saveButton); // Replace Save button with Edit button
    };

    listItem.replaceChild(inputField, taskSpan);
    listItem.replaceChild(saveButton, button); // Replace Edit button with Save button
}

// Optional: Allow adding tasks by pressing Enter
taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});