class Species {
    constructor(_text, _goalText) {
        this.text = _text;
        this.fitness = this.calculateFitness(_goalText);
    }

    calculateFitness(goalText) {
        var score = 0;
        for (var charIndex = 0; charIndex < this.text.length; charIndex++) {
            if (this.text[charIndex] == goalText[charIndex]) {
                score++;
            }
        }
        return score;
    }

    getText() {
        return this.text;
    }

    getFitness() {
        return this.fitness;
    }

    getTextAsString() {
        return this.text.join("");
    }
}
