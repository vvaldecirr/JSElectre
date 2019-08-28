/**
 * CAMADA DE INTERFACE DA VIEW COM O CONTROLADOR
 */
var text, cmatrixhtml, dmatrixhtml, smatrixhtml, teamhtml, graphhtml, rows, cols, maxdelta, pmatrix, cmatrix, dmatrix, smatrix, concordance, discordance, i, j, k, l, weight;
var elementnames	= ["eA", "eB", "eC", "eD", "eE", "eF", "eG", "eH", "eI", "eJ", "eK", "eL", "eM", "eN", "eO", "eP", "eQ", "eR", "eS", "eT", "eW", "eU", "eV", "eX", "eY", "eZ", ];
var criterianames	= ["cA", "cB", "cC", "cD", "cE", "cF", "cG", "cH", "cI", "cJ", "cK", "cL", "cM", "cN", "cO", "cP", "cQ", "cR", "cS", "cT", "cW", "cU", "cV", "cX", "cY", "cZ", ];

// script that get the size of matrix entry and generate the performance matrix
$( "#dimentions" ).submit(function( event ) {

	// render a HTML form to be showed on page
	$("#matrix-input").html("");
	showPerformanceForm();
	
	event.preventDefault();
});

// script that get the values of performance matrix and full fill the other matrix already souwing the results	
$( "#matrix" ).submit(function( event ) {
	
	//event.preventDefault();
	
	// filling the performance matrix
	fillPerformanceMatrix();
	
	// calculate the maximun delta
	findMaxDelta();
	
	// filling the concordance matrix table
	$("#concordance-matrix").html("");
	showConcordanceMatrixTable();

	// filling the concordance matrix table
	$("#discordance-matrix").html("");
	showDiscordanceMatrixTable();
	
	// filling the credibility matrix table
	$("#credibility-matrix").html("");
	showCredibilityMatrixTable();
	
	// filling the team table
	$("#team-table").html("");
	showTeamTable();
	
	// rendering the graph
	//$("#graph-table").html("");
	showGraph();
	
	event.preventDefault();
});

// script that get the values of performance matrix and full fill the other matrix already souwing the results	
$( "#renaming" ).submit(function( event ) {
	// scripts
	/*
	for (i=0; i<cols; i++) 
		criterianames[i] = ($("#cnames"+i).val()); // criteries
	
	for (i=0; i<rows; i++) 
		elementnames[i] = ($("#enames"+i).val()); // elements
	*/
	// render a HTML form to be showed on page
	//$("#matrix-input").html("");
	//showPerformanceForm();
	console.log(criterianames);
	console.log(elementnames);

	event.preventDefault();
});
