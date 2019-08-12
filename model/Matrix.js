/**
 * Matrix Class
 */
function Matrix(lines, rows){
	//Atributes
	this.AttributeNames			= [lines];			// group of integrants to be classified
	this.CriterieaNames			= [rows];			// list of criterias to be analized
	this.PerformanceStructure	= [lines][rows];	// Performance Matrix
	this.ConcordanceStructure	= [lines][rows];	// Concordance Matrix
	this.DiscordanceStructure	= [lines][rows];	// Discordance Matrix
	this.CredibilityStructure	= [lines][rows];	// Credibility Matrix

	//Methods
	this.printMatrix = function(){
		var text;
		
		
		
		document.getElementById("demo").innerHTML = this.AttributeNames.length;
	};

	this.updateAtributeName = function(oldName, newName){
	};

	this.updateCriterieaName = function(oldName, newName){
	};

	this.updateStructureValue = function(structure, atribute, criteria, value){
	};

};
