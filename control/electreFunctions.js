/**
 * This function render a HTML form to be showed on page
 * and be filled by the user
 * @returns
 */
function showPerformanceForm() {
	// getting overclassification indexes
	concordance = ($("#concordance").val());
	discordance = ($("#discordance").val());

	// criating a multidimentional performance array as pmatrix with form values
	pmatrix = [];
	for (i=0; i<rows; i++) {
		pmatrix[i] = new Array(); // elements
		
		for (j=0; j<cols; j++) 
			pmatrix[i][j] = ($("#pmvaluesl"+i+"c"+j).val()*1); // criteries
	}
	console.log("pmatrix:");
	console.log(pmatrix);

	// filling the weight array
	weight	= [];
	for (k=0; k<cols; k++) {
		//console.log($("#pmvaluesl"+rows+"c"+k).val()*1);
		weight[k] = $("#pmvaluesl"+rows+"c"+k).val()*1;
	}
}

/**
 * This function calculate the maximum delta values as documentation
 * @returns
 */
function findMaxDelta() {
	var max		= [];		
	var min		= [];
	var maux, minx;
	
	// calculate the max
	for (k=0; k<cols; k++) {
		for (l=0; l<rows; l++) {
			if (l==0)
				maux = pmatrix[l][k];
			else if (maux < pmatrix[l][k])
				maux = pmatrix[l][k];
		}
		max[k] = maux;
	}

	// calculate the min
	for (k=0; k<cols; k++) {
		for (l=0; l<rows; l++) {
			if (l==0)
				minx = pmatrix[l][k];
			else if (minx > pmatrix[l][k])
				minx = pmatrix[l][k];
		}
		min[k] = minx;
	}

	// calculate the maxdelta
	for (k=0; k<cols; k++) {
		if (k==0)
			maxdelta = max[k]-min[k];
		else if ( maxdelta < (max[k]-min[k]) )
			maxdelta = max[k]-min[k];
	}		
}

/**
 * this function return the value of each concordance cell 
 * from performance's matrix ROW and COLUMN information
 * @param row
 * @param col
 * @returns "-" or double
 */
function concordCel(row, col) {
	var aux = 0;
	var sumweight = 0;
	if (row==col)
		return "-";
	else {
		for (k=0; k<cols; k++) {
			if (pmatrix[row][k] >= pmatrix[col][k])
				aux += weight[k];
			
			sumweight += weight[k];
		}
		return parseFloat((aux/sumweight).toFixed(2)); // keep just 2 decinal digits			
	}
}

/**
 * this function return the value of each discordance cell 
 * from performance's matrix ROW and COLUMN information
 * @param row
 * @param col
 * @returns "-" or double
 */
function discordCel(row, col) {
	var aux = 0;
	
	if (row==col)
		return "-";
	else {
		for (k=0; k<cols; k++) {
			r = (pmatrix[col][k]-pmatrix[row][k])/maxdelta;
			if (r > aux)
				aux = r;
		}
		return parseFloat((aux).toFixed(2)); // keep just 2 decinal digits				
	}
}

/**
 * this function return the value of each credibility cell 
 * from performance's matrix ROW and COLUMN information
 * @param row
 * @param col
 * @returns "-" or int
 */
function credibCel(row, col) {
	if (row==col)
		return "-";
	else {
		if (dmatrix[row][col] >= concordance)
			return 0;
		else if (dmatrix[row][col] <= discordance)
			return 1;
		else
			return 0;
	}
}

/**
 * function for fill the concordance matrix table
 * @returns HTML string
 */
function showConcordanceMatrixTable() {
	// calculatind the multidimentional concordance array as cmatrix from pmatrix array
	cmatrix = [];
	for (i=0; i<rows; i++) {
		cmatrix[i] = new Array(); // elements
		
		for (j=0; j<cols; j++) 
			cmatrix[i][j] = concordCel(i, j);
	}
	console.log("cmatrix");
	console.log(cmatrix);
	
	cmatrixhtml = "<table id='cmatrix-table' border='0'>";

	for (i=0; i<rows; i++) {
		cmatrixhtml += "<tr>";

		if (i==0) // verifying if it's the first cell of table for keep it empty 
			cmatrixhtml += "<th></th>";

		if (i==0) { // filling with titles
			for (k=0; k<cols; k++)
				cmatrixhtml += "<th>"+elementnames[k]+"</th>";
		} else {
			for (j=0; j<cols; j++) {
				if (j==0) {
					cmatrixhtml += "<th>"+elementnames[i-1]+"</th><td>"+cmatrix[(i-1)][j]+"</td>";
				} else
					cmatrixhtml += "<td>"+cmatrix[(i-1)][j]+"</td>";
			}
		}
		
		cmatrixhtml += "</tr>";

	}

	for (l=0; l<cols; l++) {
		if (l==0) {
			cmatrixhtml += "<th>"+elementnames[i-1]+"</th><td>"+cmatrix[(i-1)][l]+"</td>";
		} else
			cmatrixhtml += "<td>"+cmatrix[(i-1)][l]+"</td>";
	} 
	cmatrixhtml += "</table>";

	$("#concordance-matrix").append(cmatrixhtml);
}

/**
 * function for fill the discordance matrix table
 * @returns HTML string
 */
function showDiscordanceMatrixTable() {
	// calculatind the multidimentional discordance array as dmatrix from pmatrix array
	dmatrix = [];
	for (i=0; i<rows; i++) {
		dmatrix[i] = new Array(); // elements
		
		for (j=0; j<cols; j++) 
			dmatrix[i][j] = discordCel(i, j);
	}
	console.log("dmatrix");
	console.log(dmatrix);
	
	dmatrixhtml = "<table id='dmatrix-table' border='0'>";

	for (i=0; i<rows; i++) {
		dmatrixhtml += "<tr>";

		if (i==0) // verifying if it's the first cell of table for keep it empty 
			dmatrixhtml += "<th></th>";

		if (i==0) { // filling with titles
			for (k=0; k<cols; k++)
				dmatrixhtml += "<th>"+elementnames[k]+"</th>";
		} else {
			for (j=0; j<cols; j++) {
				if (j==0) {
					dmatrixhtml += "<th>"+elementnames[i-1]+"</th><td>"+dmatrix[(i-1)][j]+"</td>";
				} else
					dmatrixhtml += "<td>"+dmatrix[(i-1)][j]+"</td>";
			}
		}
		
		dmatrixhtml += "</tr>";

	}

	for (l=0; l<cols; l++) {
		if (l==0) {
			dmatrixhtml += "<th>"+elementnames[i-1]+"</th><td>"+dmatrix[(i-1)][l]+"</td>";
		} else
			dmatrixhtml += "<td>"+dmatrix[(i-1)][l]+"</td>";
	} 
	dmatrixhtml += "</table>";

	$("#discordance-matrix").append(dmatrixhtml);
}

/**
 * function for fill the credibility matrix table
 * @returns HTML string
 */
function showCredibilityMatrixTable() {
	// calculatind the multidimentional discordance array as dmatrix from pmatrix array
	smatrix = [];
	for (i=0; i<rows; i++) {
		smatrix[i] = new Array(); // elements
		
		for (j=0; j<cols; j++) 
			smatrix[i][j] = credibCel(i, j);
	}
	console.log("smatrix");
	console.log(smatrix);
	
	smatrixhtml = "<table id='smatrix-table' border='0'>";

	for (i=0; i<rows; i++) {
		smatrixhtml += "<tr>";

		if (i==0) // verifying if it's the first cell of table for keep it empty 
			smatrixhtml += "<th></th>";

		if (i==0) { // filling with titles
			for (k=0; k<cols; k++)
				smatrixhtml += "<th>"+elementnames[k]+"</th>";
		} else {
			for (j=0; j<cols; j++) {
				if (j==0) {
					smatrixhtml += "<th>"+elementnames[i-1]+"</th><td>"+smatrix[(i-1)][j]+"</td>";
				} else
					smatrixhtml += "<td>"+smatrix[(i-1)][j]+"</td>";
			}
		}
		
		smatrixhtml += "</tr>";

	}

	for (l=0; l<cols; l++) {
		if (l==0) {
			smatrixhtml += "<th>"+elementnames[i-1]+"</th><td>"+smatrix[(i-1)][l]+"</td>";
		} else
			smatrixhtml += "<td>"+smatrix[(i-1)][l]+"</td>";
	} 
	smatrixhtml += "</table>";

	$("#credibility-matrix").append(smatrixhtml);
}
