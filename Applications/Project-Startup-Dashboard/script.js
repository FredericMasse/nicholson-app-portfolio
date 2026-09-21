function updateSummary() {

    const tasks =
        document.querySelectorAll(".task");

    const completed =
        document.querySelectorAll(".task:checked");

    const percentage =
        (completed.length / tasks.length) * 100;

    document.getElementById("summary").textContent =
        completed.length +
        " of " +
        tasks.length +
        " tasks completed";

    document.getElementById("progress-bar").style.width =
        percentage + "%";
}
updateSummary();
