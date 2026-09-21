function updateSummary() {

    const tasks = document.querySelectorAll(".task");
    const completed = document.querySelectorAll(".task:checked");

    const completedCount = completed.length;
    const totalCount = tasks.length;

    const percentage = (completedCount / totalCount) * 100;

    document.getElementById("summary").textContent =
        completedCount +
        " of " +
        totalCount +
        " tasks completed";

    document.getElementById("progress-bar").style.width =
        percentage + "%";
}

/* Run once when the page loads */
window.onload = function () {
    updateSummary();
};
