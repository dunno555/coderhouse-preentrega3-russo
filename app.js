class Option {
    constructor(name, hexColor = '') {
        this.name = name;
        this.hexColor = hexColor;
    };

    hexColorGenerator() {
        let hexValues = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
        let generatedColor = '';

        for (let i = 0; i < 6; i++) {
            let hexValue;

            hexValue = hexValues[Math.floor(Math.random() * hexValues.length)];
            generatedColor += hexValue;
        };

        this.hexColor = `#${generatedColor}`;
    };

    hexColorURL() {
        let colorWithoutHash = this.hexColor.slice(1);
        return `https://www.htmlcsscolor.com/hex/${colorWithoutHash}`;
    };
};

const textarea = document.querySelector('#options');
const enteredOptions = document.querySelector('#entered-options');
const result = document.getElementById('result');
const tryAgainBtn = document.getElementById('try-again');
const chosenOptionLS = localStorage.getItem('chosen-option') || '';
if (chosenOptionLS != '') {
    let newOption = new Option(JSON.parse(chosenOptionLS).name, JSON.parse(chosenOptionLS).hexColor);
    result.style.display = 'block';
    result.innerHTML = resultText(newOption.name, newOption.hexColor, newOption.hexColorURL());
};

function resultText(name, color, colorURL) {
    return `<p>The Random Picker has spoken!</p>
    <p>Your option for today is <b>${name}</b>!</p>
    <p>And, just for today, your option's special color is <input type="color" value="${color}"> <b><span style="color:${color};">${color}</span></b>!</p>
    <p>For more info on your color, click <a target="_blank" href="${colorURL}">here</a></p>`
}

function optionsGenerator(input) {
    // The array is made up of options without whitespace. "  1  " is turned into "1", for example
    const arr = input.split(',').filter(option => option.trim() !== '').map(option => option.trim());

    return arr;
}

textarea.focus();

textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        let options = optionsGenerator(e.target.value);
        localStorage.setItem('options', JSON.stringify(options));
        enteredOptions.innerHTML = `
            <p>Your options are: ${new Intl.ListFormat("en-US", { style: "long", type: "conjunction" }).format(
                JSON.parse(localStorage.getItem('options'))
            )}</p>
        `;

        let option;
        let chosenOption;
        option = options[Math.floor(Math.random() * options.length)];
        chosenOption = new Option(option);
        chosenOption.hexColorGenerator();
        localStorage.setItem('chosen-option', JSON.stringify(chosenOption));
        textarea.value = '';
        result.style.display = 'block';
        result.innerHTML = resultText(chosenOption.name, chosenOption.hexColor, chosenOption.hexColorURL());
        tryAgainBtn.style.display = 'block';
    };
});

tryAgainBtn.addEventListener('click', () => {
    enteredOptions.innerHTML = '';
    result.innerHTML = '';
    result.style.display = 'none';
    tryAgainBtn.style.display = 'none';
    localStorage.removeItem('options');
})