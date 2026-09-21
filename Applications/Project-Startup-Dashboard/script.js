function updateSummary() {

    const tasks =
        document.querySelectorAll(".task");

    const completed =
        document.querySelectorAll(".task:checked");

    document.getElementById("summary").textContent =
        completed.length +
        " of " +
        tasks.length +
        " tasks completed";
}
