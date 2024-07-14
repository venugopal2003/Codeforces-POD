const solveButton = document.getElementById("solve-button")
const problemStatement = document.querySelector(".problem-statement");
const filterInput = document.getElementById("filter-rating");
const problemID = document.getElementById("problemID");
const problemRating = document.getElementById("problem-rating");

console.log("Fetching a new Problem");
var problemURL;

function hasOneDayPassed() {
	var date = new Date().toLocaleDateString();

	if (localStorage.previousDate == date)
		return false;

	localStorage.previousDate = date;
	return true;
}

async function fetchCodeforcesProblemData() {
	
	const response = await fetch('https://codeforces.com/api/problemset.problems');
	const data = await response.json();

	return data.result.problems;
}

