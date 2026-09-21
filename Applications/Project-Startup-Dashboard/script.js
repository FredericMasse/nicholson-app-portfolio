function updateSummary() {

    const checkboxes =
        document.querySelectorAll(".task");

    const completed =
        document.querySelectorAll(".task:checked");

    document.getElementById("summary").innerHTML =
        completed.length +
        " of " +
        checkboxes.length +
        " tasks completed";

}
