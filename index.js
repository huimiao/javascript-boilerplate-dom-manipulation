var gitAPI = 'https://gitlab-cts.stackroute.in/api/v3/projects';
var tokenKey = 'H2NtMhMm1TZckHp7V8cD';

document.getElementById("count").addEventListener("click", showIssueCount);
function showIssueCount(event) {
  event.preventDefault();
  let count_repo = document.getElementById("countQueryRepositoryInput").value;
  let count_issue = document.getElementById("countQueryIssueType").value;

  if (count_issue && count_repo && parseInt(count_issue)) {
    document.getElementById("modal-count").innerHTML = count_issue;
    $("#countModal").modal();
  }
}

function requestGitRepoDetails() {
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.timeout = 2000;
    xhr.onreadystatechange = function (e) {
      if (xhr.readyState === XMLHttpRequest.DONE) {

        console.log("Ready State : " + xhr.readyState);
        if (xhr.status === 200) {
          resolve(xhr.response);
        } else {
          reject(xhr.response);
        }

      }
    };
    xhr.ontimeout = function () {
      reject('timeout')
    };
    xhr.open('get', gitAPI, true);
    xhr.setRequestHeader('PRIVATE-TOKEN', tokenKey);
    xhr.send();
  })

}

const requestPromiseObj = requestGitRepoDetails();
//console.log('will be pending when logged', requestPromiseObj);

requestPromiseObj
  .then(handleGitRepoDetails)
  .then(populateRepoForIssueSummary)
  .catch(handleErrors);

function handleGitRepoDetails(repoDetails) {
  //console.log(JSON.parse(repoDetails));
  return JSON.parse(repoDetails);
}

function handleErrors(error) {
  console.log("Error occured");
  console.log(error);
}

function populateRepoForIssueSummary(repoDetails) {
  if (Array.isArray(repoDetails)) {
    repoDetails.forEach(function (element, index) {
      //console.log('path : ' + element.path_with_namespace);
      displayIssueSummaryTable(element, index);
      displayIssueSummaryDropdown(element);
    }, this);
  }
}

var displayIssueSummaryTable = (content, index) => {
  let table = document.getElementById("issueSummary").getElementsByTagName('tbody')[0];
  let row = table.insertRow(index);
  var cell0 = row.insertCell(0);
  var cell1 = row.insertCell(1);
  var cell2 = row.insertCell(2);
  var cell3 = row.insertCell(3);
  cell0.innerHTML = `<td>${content.path_with_namespace}</td>`;
  cell1.innerHTML = `<td>${content.open_issues_count}</td>`;
  cell2.innerHTML = `<td>${content.open_issues_count}</td>`;
  cell3.innerHTML = `<td>${content.open_issues_count}</td>`;
}

var displayIssueSummaryDropdown = (content) => {
  let select = document.getElementById("countQueryRepositoryInput");
  var option = document.createElement("option");
  option.text = `${content.path_with_namespace}`;
  select.add(option);
}
