const STORAGE_KEY = "nicholsonProjectStartupDashboard";

function getProjectFields() {
    return document.querySelectorAll(".project-field");
}

function getTasks() {
    return document.querySelectorAll(".task");
}

function updateSummary() {
    const tasks = getTasks();

    const completedTasks =
        document.querySelectorAll(".task:checked");

    const completedCount = completedTasks.length;
    const totalCount = tasks.length;

    const percentage =
        totalCount === 0
            ? 0
            : Math.round(
                (completedCount / totalCount) * 100
            );

    const summary =
        document.getElementById("summary");

    const progressBar =
        document.getElementById("progress-bar");

    const progressContainer =
        document.getElementById("progress-container");

    summary.textContent =
        completedCount +
        " of " +
        totalCount +
        " tasks completed (" +
        percentage +
        "%)";

    progressBar.style.width =
        percentage + "%";

    progressContainer.setAttribute(
        "aria-valuenow",
        percentage
    );

    if (percentage < 50) {
        progressBar.style.backgroundColor =
            "#a12622";
    } else if (percentage < 100) {
        progressBar.style.backgroundColor =
            "#d69e00";
    } else {
        progressBar.style.backgroundColor =
            "#16834b";
    }
}

function showSaveStatus(message) {
    const saveStatus =
        document.getElementById("save-status");

    saveStatus.textContent = message;
}

function saveDashboard() {
    const projectFields = getProjectFields();
    const tasks = getTasks();

    const projectInformation = {};

    projectFields.forEach(function (field) {
        projectInformation[field.id] = field.value;
    });

    const taskStatus = {};

    tasks.forEach(function (task) {
        taskStatus[task.id] = task.checked;
    });

    const dashboardData = {
        projectInformation: projectInformation,
        taskStatus: taskStatus
    };

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(dashboardData)
    );

    showSaveStatus(
        "Changes saved automatically in this browser."
    );
}

function loadDashboard() {
    const savedData =
        localStorage.getItem(STORAGE_KEY);

    if (savedData === null) {
        updateSummary();

        showSaveStatus(
            "Changes are saved automatically in this browser."
        );

        return;
    }

    try {
        const dashboardData =
            JSON.parse(savedData);

        const projectFields =
            getProjectFields();

        const tasks =
            getTasks();

        projectFields.forEach(function (field) {
            if (
                dashboardData.projectInformation &&
                dashboardData.projectInformation[field.id] !== undefined
            ) {
                field.value =
                    dashboardData.projectInformation[field.id];
            }
        });

        tasks.forEach(function (task) {
            if (
                dashboardData.taskStatus &&
                dashboardData.taskStatus[task.id] !== undefined
            ) {
                task.checked =
                    dashboardData.taskStatus[task.id];
            }
        });

        showSaveStatus(
            "Saved dashboard information restored."
        );
    } catch (error) {
        console.error(
            "The dashboard data could not be restored.",
            error
        );

        showSaveStatus(
            "Saved information could not be restored."
        );
    }

    updateSummary();
}

function clearDashboard() {
    const shouldClear =
        window.confirm(
            "Clear all project information and checklist progress?"
        );

    if (!shouldClear) {
        return;
    }

    localStorage.removeItem(STORAGE_KEY);

    const projectFields = getProjectFields();
    const tasks = getTasks();

    projectFields.forEach(function (field) {
        field.value = "";
    });

    tasks.forEach(function (task) {
        task.checked = false;
    });

    updateSummary();

    showSaveStatus(
        "Dashboard cleared. New changes will be saved automatically."
    );
}

document.addEventListener(
    "DOMContentLoaded",
    function () {
        const projectFields = getProjectFields();
        const tasks = getTasks();

        const clearButton =
            document.getElementById("clear-dashboard");

        projectFields.forEach(function (field) {
            field.addEventListener(
                "input",
                function () {
                    saveDashboard();
                }
            );
        });

        tasks.forEach(function (task) {
            task.addEventListener(
                "change",
                function () {
                    updateSummary();
                    saveDashboard();
                }
            );
        });

        clearButton.addEventListener(
            "click",
            clearDashboard
        );

        loadDashboard();
    }
);
