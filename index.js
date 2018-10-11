document.getElementById("count").addEventListener("click", showIssueCount);

function showIssueCount(event) {
  event.preventDefault();
  let count_repo = document.getElementById("countQueryRepositoryInput").value;
  let count_issue = document.getElementById("countQueryIssueType").value;

  if (count_issue && count_repo && parseInt(count_issue)) {
    document.getElementById("modal-count").innerHTML = count_issue;
    $("#countModal").modal();
  }
};

var gitAPI = 'https://gitlab-cts.stackroute.in/api/v3/projects';
var tokenKey = 'H2NtMhMm1TZckHp7V8cD';

function requestGitRepoDetails() {
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.timeout = 2000;

    xhr.onreadystatechange = function (e) {
      if (xhr.readyState === 4) {

        console.log("Ready State : " + xhr.readyState);
        console.log("State : " + xhr.state);

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
  .then(populateRepoIssueCount)
  .catch(handleErrors);

function handleGitRepoDetails(repoDetails) {
  return JSON.parse(repoDetails);
}

function handleErrors(error) {
  console.log("Error occured");
  console.log(error);
}

function populateRepoIssueCount(repoDetails) {

  //console.log(repoDetails);
  if (Array.isArray(repoDetails)) {
    repoDetails.forEach(function (element, index) {

        // var issue_count_table = document.getElementById("issue-summary");
        
        // issue_count_table.insert(index);

        // var cell0 = row.insertCell(0);
        // var cell1 = row.insertCell(1);
        // var cell2 = row.insertCell(2);
        // var cell3 = row.insertCell(3);

        // cell0.innerHTML = `<td>${element.path_with_namespace}</td>`;
        // cell1.innerHTML = `<td>${element.open_issues_count}</td>`;
        // cell2.innerHTML = `<td>${element.open_issues_count}</td>`;
        // cell3.innerHTML = `<td>${element.open_issues_count}</td>`;

    }, this);
  }
}
