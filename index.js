document.getElementById("count").addEventListener("click", showIssueCount);

function showIssueCount(event) {
  event.preventDefault();
  let count_repo = document.getElementById("countQueryRepositoryInput").value;
  let count_issue = document.getElementById("countQueryIssueType").value;

  if(count_issue && count_repo && parseInt(count_issue)) {
    document.getElementById("modal-count").innerHTML = count_issue;
    $("#countModal").modal();
  }  
};