class Population
{
    constructor(_goalText, _generationSize, _mutationFactor)
    {
        this.goalText = _goalText;
        this.generationSize = _generationSize;
        this.mutationFactor = _mutationFactor;
        this.numGenerations = 1;
        this.asciiCodeMin = 32;
        this.asciiCodeMax = 126;
        this.currentGeneration = this.getRandomGeneration();
    }

    compareSpecies(a, b)
    {
        return (a.getFitness() > b.getFitness()) ?
            -1 :
            (a.getFitness() < b.getFitness()) ?
                1 :
                0;
    }

    getRandomIntInclusive(min, max)
    {
        return Math.floor(Math.random()*(max - min + 1)) + min;
    }

    getRandomChar()
    {
        return String.fromCharCode(this.getRandomIntInclusive(this.asciiCodeMin, this.asciiCodeMax)).charAt(0);
    }

    getFitnessBasedInheritedChar(currentSpecies, randomlySelectedSpecies, textIndex)
    {
        return (Math.random() <=
                (currentSpecies.getFitness()/(currentSpecies.getFitness() + randomlySelectedSpecies.getFitness()))) ?
            currentSpecies.getText()[textIndex] :
            randomlySelectedSpecies.getText()[textIndex];
    }

    getInheritedChar(speciesIndex, textIndex)
    {
        var randomlySelectedSpecies = this.currentGeneration[Math.floor(Math.random()*this.currentGeneration.length)];
        return (this.currentGeneration[speciesIndex].getText()[textIndex] ==
                randomlySelectedSpecies.getText()[textIndex]) ?
            this.currentGeneration[speciesIndex].getText()[textIndex] :
            this.getFitnessBasedInheritedChar(this.currentGeneration[speciesIndex], randomlySelectedSpecies,
                textIndex);
    }

    getNewSpecies(speciesIndex)
    {
        var speciesText = [];
        for (var textIndex = 0; textIndex < this.goalText.length; textIndex++) {
            speciesText[textIndex] = (Math.random() <= this.mutationFactor) ?
                this.getRandomChar() :
                this.getInheritedChar(speciesIndex, textIndex);
        }
        return new Species(speciesText, this.goalText);
    }

    getNextGeneration()
    {
        var nextGeneration = [];
        for (var speciesIndex = 0; speciesIndex < this.currentGeneration.length; speciesIndex++) {
            nextGeneration[speciesIndex] = this.getNewSpecies(speciesIndex);
        }
        return nextGeneration.sort(this.compareSpecies);
    }

    getRandomSpecies()
    {
        var speciesText = [];
        for (var textIndex = 0; textIndex < this.goalText.length; textIndex++) {
            speciesText[textIndex] = this.getRandomChar();
        }
        return new Species(speciesText, this.goalText);
    }

    getRandomGeneration()
    {
        var generation = [];
        for (var speciesIndex = 0; speciesIndex < this.generationSize; speciesIndex++) {
            generation[speciesIndex] = this.getRandomSpecies();
        }
        return generation.sort(this.compareSpecies);
    }

    updateCurrentGeneration()
    {
        this.currentGeneration = this.getNextGeneration();
        this.numGenerations += 1;
    }

    getNumGenerations()
    {
        return this.numGenerations;
    }

    getFittestSpeciesInCurrentGeneration()
    {
        return this.currentGeneration[0];
    }

    isFinished()
    {
        return (this.getFittestSpeciesInCurrentGeneration().getFitness() == this.goalText.length);
    }

    getAverageFitnessOfCurrentGeneration()
    {
        var sum = 0;
        for (var speciesIndex = 0; speciesIndex < this.currentGeneration.length; speciesIndex++) {
            sum += this.currentGeneration[speciesIndex].getFitness();
        }
        return sum/this.currentGeneration.length;
    }

    allSpeciesTextInCurrentGeneration()
    {
        var displayString = "";
        var displayLimit = min(this.currentGeneration.length, 50);

        for (var speciesIndex = 0; speciesIndex < displayLimit; speciesIndex++) {
            displayString += this.currentGeneration[speciesIndex].getTextAsString() + "<br>";
        }
        return displayString;
    }
}
