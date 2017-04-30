// algorithm inputs
var goalText;
var generationSize;
var mutationFactor;

// graphical elements
var bestPhrase;
var allPhrases;
var stats;

// population object
var population;

function setup() {
    bestPhrase = createP("Best phrase:");
    bestPhrase.class("best");
    allPhrases = createP("All phrases:");
    allPhrases.position(600, 10);
    allPhrases.class("all");
    stats = createP("Stats");
    stats.class("stats");
    goalText = "To be, or not to be?".split('');
    generationSize = 200;
    mutationFactor = 0.01;
    population = new Population(goalText, generationSize, mutationFactor);
}

function draw() {
    displayInfo();
    if (population.isFinished()) {
        noLoop();
    }
    population.updateCurrentGeneration();
}

function displayInfo() {
    bestPhrase.html("Best phrase:<br>" + population.getFittestSpeciesInCurrentGeneration().getTextAsString());
    var statstext = "total generations:     " + population.getNumGenerations() + "<br>";
    statstext +=    "average fitness:       " + nf(population.getAverageFitnessOfCurrentGeneration()) + "<br>";
    statstext +=    "total population:      " + generationSize + "<br>";
    statstext +=    "mutation rate:         " + floor(mutationFactor * 100) + "%";
    stats.html(statstext);
    allPhrases.html("All phrases:<br>" + population.allSpeciesTextInCurrentGeneration());
}
