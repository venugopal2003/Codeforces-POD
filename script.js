const solveButton = document.getElementById("solve-button")
const problemStatement = document.querySelector(".problem-statement");
const filterInput = document.getElementById("filter-rating");
const contestId = document.getElementById("contestID");
const problemID = document.getElementById("problemID");
const problemRating = document.getElementById("problem-rating");

var problemURL;


async function fetchCodeforcesProblemData() {
	
	const response = await fetch('https://codeforces.com/api/problemset.problems');
	const data = await response.json();

	return data.result.problems;
}

function getProblem(problemList) {
	const index = Math.floor(Math.random() * problemList.length);
	const selectedProblem = problemList[index];

	if (selectedProblem !== {} && selectedProblem !== undefined) {
		
		localStorage.selectedProblem = JSON.stringify(selectedProblem);

		
		problemURL = `https://codeforces.com/problemset/problem/${selectedProblem.contestId}/${selectedProblem.index}`;
	}

	return selectedProblem;
}

function updateHTML(selectedProblem) {
	if (selectedProblem !== {} && selectedProblem !== undefined) {
		
		problemStatement.innerText = selectedProblem.name;
		problemID.innerText = selectedProblem.index;
		problemRating.innerText = selectedProblem.rating;

		problemURL = `https://codeforces.com/problemset/problem/${selectedProblem.contestId}/${selectedProblem.index}`;
	}
}

async function updateProblemByRating() {

	const filterRating = Number(filterInput.value);


	const problemList = await fetchCodeforcesProblemData();

	
	const filterProblemsList = problemList.filter(item => item.rating === filterRating);

	
	const selectedProblem = getProblem(filterProblemsList);

	updateHTML(selectedProblem);

	filterInput.value = null;

	console.log(selectedProblem);
}

function uuid() {
	return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
		(c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
	);
}

function enterIntoTheProblem() {
	window.open(problemURL, "_blank");
}

solveButton.addEventListener("click", enterIntoTheProblem);

