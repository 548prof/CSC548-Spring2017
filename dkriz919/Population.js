class Population {
    constructor(_goalText, _generationSize, _mutationFactor) {
        this.goalText = _goalText;
        this.generationSize = _generationSize;
        this.mutationFactor = _mutationFactor;
        this.numGenerations = 1;
        this.asciiCodeMin = 32;
        this.asciiCodeMax = 126;
        this.currentGeneration = this.getRandomGeneration();
    }

    getRandomGeneration() {
        var generation = [];
        var candidateSpecies;
        for (var speciesIndex = 0, len = this.generationSize; speciesIndex < len; speciesIndex++) {
            do {
                candidateSpecies = this.getRandomSpecies();
            } while (generation.indexOf(candidateSpecies) > -1);
            generation[speciesIndex] = candidateSpecies;
        }
        return generation.sort(this.compareSpecies);
    }

    getRandomSpecies() {
        var speciesText = [];
        for (var textIndex = 0, len = this.goalText.length; textIndex < len; textIndex++) {
            speciesText[textIndex] = this.getRandomChar();
        }
        return new Species(speciesText, this.goalText);
    }

    getRandomChar() {
        return String.fromCharCode(this.getRandomIntInclusive(this.asciiCodeMin, this.asciiCodeMax)).charAt(0);
    }

    getRandomIntInclusive(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    compareSpecies(a, b) {
        return (a.getFitness() > b.getFitness()) ?
            -1 :
            (a.getFitness() < b.getFitness()) ?
                1 :
                0;
    }

    updateCurrentGeneration() {
        this.currentGeneration = this.getNextGeneration();
        this.numGenerations += 1;
    }

    getNextGeneration() {
        var nextGeneration = [];
        var candidateSpecies;
        for (var speciesIndex = 0, len = this.currentGeneration.length; speciesIndex < len; speciesIndex++) {
            do {
                candidateSpecies = this.getNewSpecies(speciesIndex);
            } while (nextGeneration.indexOf(candidateSpecies) > -1);
            nextGeneration[speciesIndex] = candidateSpecies;
        }
        return nextGeneration.sort(this.compareSpecies);
    }

    getNewSpecies(speciesIndex) {
        var speciesText = [];
        for (var textIndex = 0, len = this.goalText.length; textIndex < len; textIndex++) {
            speciesText[textIndex] = (Math.random() <= this.mutationFactor) ?
                this.getRandomChar() :
                this.getInheritedChar(speciesIndex, textIndex);
        }
        return new Species(speciesText, this.goalText);
    }

    getInheritedChar(speciesIndex, textIndex) {
        var randomlySelectedSpecies =
            this.currentGeneration[Math.floor(Math.random() * this.currentGeneration.length)];
        return (this.currentGeneration[speciesIndex].getText()[textIndex] ==
                randomlySelectedSpecies.getText()[textIndex]) ?
            this.currentGeneration[speciesIndex].getText()[textIndex] :
            this.getFitnessBasedInheritedChar(this.currentGeneration[speciesIndex], randomlySelectedSpecies,
                textIndex);
    }

    getFitnessBasedInheritedChar(currentSpecies, randomlySelectedSpecies, textIndex) {
        return (Math.random() <=
                (currentSpecies.getFitness() / (currentSpecies.getFitness() + randomlySelectedSpecies.getFitness()))) ?
            currentSpecies.getText()[textIndex] :
            randomlySelectedSpecies.getText()[textIndex];
    }

    getNumGenerations() {
        return this.numGenerations;
    }

    isFinished() {
        return (this.getFittestSpeciesInCurrentGeneration().getFitness() == this.goalText.length);
    }

    getFittestSpeciesInCurrentGeneration() {
        return this.currentGeneration[0];
    }

    getAverageFitnessOfCurrentGeneration() {
        var sum = 0;
        for (var speciesIndex = 0, len = this.currentGeneration.length; speciesIndex < len; speciesIndex++) {
            sum += this.currentGeneration[speciesIndex].getFitness();
        }
        return sum / this.currentGeneration.length;
    }

    allSpeciesTextInCurrentGeneration() {
        var displayString = "";
        for (var speciesIndex = 0, displayLimit = min(this.currentGeneration.length, 50); speciesIndex < displayLimit;
                speciesIndex++) {
            displayString += this.currentGeneration[speciesIndex].getTextAsString() + "<br>";
        }
        return displayString;
    }
}
