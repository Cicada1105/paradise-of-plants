// Function for initializing page
function init() {
	// Variables 
	//	constants
	const table = document.getElementById("plant-table");
	const tableBody = table.getElementsByTagName("tbody")[0];
	const form = document.forms["plant-form"];
	//	dynamic
	let mockPlantDb = [
		{
			name: "Fitonia",
			birthday: "2021-5-18",
			lastWatering: "2022-4-21",
			wateringPeriod: 7,
			lastFertilizing: "2022-3-15",
			fertilizingPeriod: 180,
			nicknames: ["Nerve plant","Mosaic plant"],
			notes: "Water when stems get limp"
		},
		{
			name: "Monstera Adansonaii",
			birthday: "2021-7-1",
			lastWatering: "2022-4-8",
			wateringPeriod: 14,
			lastFertilizing: "2022-3-25",
			fertilizingPeriod: 180,
			nicknames: ["Swiss Cheese plant","Monkey Mask","5 Holes plant"],
			notes: "Water when soil dries out"
		},
	]

	// Function for refreshing table
	function updateTable() {
		/* Remove any previously added plants to have a fresh update */
		// Convert nodelist to array to be able to work with loops
		let rowsArray = [...tableBody.children];
		// Remove rows
		rowsArray.forEach(el => el.remove());
		// Loop through plants, adding them to the visual plant table
		for (let plant of mockPlantDb) {
			// Create a row for each piece of data
			let plantRow = createPlantRow(plant);
			// Append row to the plant table
			tableBody.appendChild(plantRow);
		}
	}

	// Initial update
	updateTable();

	// Define callback function for when form is submitted
	function handleFormSubmit() {
		const DEFAULT_COLOUR = "#359e88";
		const ERR_COLOUR = "#ff4040";
		const ERR_MSG = "Required";
		// Retrieve input fields
		const nameInput = form["name"];
		const birthdayInput = form["birthday"];
		const nicknamesInput = form["nicknames"];
		const notesInput = form["description"];
		const lastWateringInput = form["lastWatering"];
		const wateringPeriodInput = form["wateringPeriod"];
		const lastFertilizingInput = form["lastFertilizing"];
		const fertilizingPeriodInput = form["fertilizingPeriod"];

		/* Reset any previous errors */
		// Set required inputs back to default colour
		nameInput.style.backgroundColor = DEFAULT_COLOUR;
		notesInput.style.backgroundColor = DEFAULT_COLOUR;
		wateringPeriodInput.style.backgroundColor = DEFAULT_COLOUR;
		fertilizingPeriodInput.style.backgroundColor = DEFAULT_COLOUR;
		// Return error messages back to "empty" messages
		nameInput.nextElementSibling.innerText = "*";
		notesInput.nextElementSibling.innerText = "*";
		wateringPeriodInput.nextElementSibling.innerText = "*";
		fertilizingPeriodInput.nextElementSibling.innerText = "*";

		// Check for required fields
		if (nameInput.value === "") {
			// Set background-color of input field to the error colour
			nameInput.style.backgroundColor = ERR_COLOUR;
			// Set focus back to input
			nameInput.focus();
			// Update required message
			nameInput.nextElementSibling.innerText += ERR_MSG;

			// Prevent form from being submitted
			return false;
		}
		if (notesInput.value === "") {
			// Set background-color of input field to the error colour
			notesInput.style.backgroundColor = ERR_COLOUR;
			// Set focus back to input
			notesInput.focus();
			// Update required message
			notesInput.nextElementSibling.innerText += ERR_MSG;

			// Prevent form from being submitted
			return false;
		}
		if (wateringPeriodInput.value === "") {
			// Set background-color of input field to the error colour
			wateringPeriodInput.style.backgroundColor = ERR_COLOUR;
			// Set focus back to input
			wateringPeriodInput.focus();
			// Update required message
			wateringPeriodInput.nextElementSibling.innerText += ERR_MSG;

			// Prevent form from being submitted
			return false;
		}
		if (fertilizingPeriodInput.value === "") {
			// Set background-color of input field to the error colour
			fertilizingPeriodInput.style.backgroundColor = ERR_COLOUR;
			// Set focus back to input
			fertilizingPeriodInput.focus();
			// Update required message
			fertilizingPeriodInput.nextElementSibling.innerText += ERR_MSG;

			// Prevent form from being submitted
			return false;
		}

		// Put values into properly formatted object
		let newPlant = {
			name: nameInput.value,
			birthday: birthdayInput.value,
			lastWatering: lastWateringInput.value,
			wateringPeriod: wateringPeriodInput.value,
			lastFertilizing: lastFertilizingInput.value,
			fertilizingPeriod: fertilizingPeriodInput.value,
			nicknames: nicknamesInput.value.split(","),
			notes: notesInput.value
		}

		// Add new plant to mock plant databaes
		mockPlantDb.push(newPlant);
		// Update table
		updateTable();

		// Clear form
		form.reset();

		// Prevent form from being submitted
		return false;
	}
	function handleDeleteRow(event) {
		// Path contains [delete button,td,tr,...]
		const row = event.path[2];
		// Remove row associated with current delete button
		row.remove();
	}

	/* Event listeners */
	// Loop through delete buttons, adding listener to delete buttons
	let deleteBtnsArray = [...tableBody.getElementsByClassName("delete-btn")];
	deleteBtnsArray.forEach(btn => btn.addEventListener("click",handleDeleteRow));
	form.onsubmit = handleFormSubmit;
}

/*************************/
/*   Utility Functions   */
/*************************/
// createPlantRow takes in information about a plant and returns a tr element to be added to the plant table
const createPlantRow = function(plantData) {
	// Create row element to store plant data elements
	const plantRow = document.createElement("tr");

	// Create td elements for each piece of plant data (including delete button)
	const nameTD = document.createElement("td");
	const birthdayTD = document.createElement("td");
	const lastWateringTD = document.createElement("td");
	const wateringPeriodTD = document.createElement("td");
	const lastFertilizingTD = document.createElement("td");
	const fertilizingPeriodTD = document.createElement("td");
	const daysTilWateringTD = document.createElement("td");
	const nicknamesTD = document.createElement("td");
	const descriptionTD = document.createElement("td");
	const iconTD = document.createElement("td");

	// Add respective data to td elements
	nameTD.innerText = plantData["name"];
	birthdayTD.innerText = plantData["birthday"];
	lastWateringTD.innerText = plantData["lastWatering"];
	// Add "days" to watering period
	wateringPeriodTD.innerText = plantData["wateringPeriod"] + " days";
	lastFertilizingTD.innerText = plantData["lastFertilizing"];
	// Add "days" to fertilizing period
	fertilizingPeriodTD.innerText = plantData["fertilizingPeriod"] + " days";
	// Retrieve text format on days until net watering
	daysTilWateringTD.innerText = daysTilWatering(plantData["lastWatering"],plantData["wateringPeriod"]);
	// For nicknames, if none display "N/A" else take array and join them together with a comma
	nicknamesTD.innerText = plantData["nicknames"].length === 0 ? "N/A" : plantData["nicknames"].join(", ");
	descriptionTD.innerText = plantData["notes"];
	// Add delete icon to last td (use innerHTML since retrieving element from utility function)
	iconTD.appendChild(createEditBtn());

	// Append td elements to the tr parent element
	plantRow.appendChild(nameTD);
	plantRow.appendChild(birthdayTD);
	plantRow.appendChild(lastWateringTD);
	plantRow.appendChild(wateringPeriodTD);
	plantRow.appendChild(lastFertilizingTD);
	plantRow.appendChild(fertilizingPeriodTD);
	plantRow.appendChild(daysTilWateringTD);
	plantRow.appendChild(nicknamesTD);
	plantRow.appendChild(descriptionTD);
	plantRow.appendChild(iconTD);

	// Return plant row
	return plantRow;
}
const daysTilWatering = function(lastWatered,wateringPeriod) {
	let formattedTxt = "";

	// Find difference in dates
	let dateDiffMS = Date.now() - Date.parse(lastWatered);
	// Convert date difference in milliseconds
	const dayInMS = 1000 * 60 * 60 * 24;
	let dateDiff = dateDiffMS / dayInMS;

	// Check if the time is passed the watering period
	formattedTxt = dateDiff > wateringPeriod ? "Time to water!" : `${wateringPeriod - Math.floor(dateDiff)} days left`;

	return formattedTxt;
}
const createEditBtn = function() {
	// Create i element for button
	const icon = document.createElement("i");

	// Add respective font-awesome classes and styling class to button
	icon.classList.add("delete-btn");
	icon.classList.add("fa-solid");
	icon.classList.add("fa-x");

	// Return icon
	return icon;
}

// Set page onload event
window.onload = init;