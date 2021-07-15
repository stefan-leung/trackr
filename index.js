const div = document.querySelector("#view");
const dataurl = ["https://api.covidactnow.org/v2/states.json?apiKey=", "7c2276fd308c4b07b03eaa7f63b44ff7"];

// let title, a, b, c, stateDiv, states;
states = document.createElement('div');

const makeaLI = function(text, info) {
    let output = document.createElement('li');
    output.innerHTML = `<b>${text} </b>${info}`;
    return output;
};

var lang = document.createElement('div'); // Different formatting/language

fetch(dataurl[0] + dataurl[1]).then((res) => res.json()).then(data => {
    console.log(data);

    title = document.createElement('div');
    a = document.createElement('ul');

    title.innerHTML = `<a href=\'#view\'>States</a><span style='font-size: small;'> - Last Refreshed on ${data[0].lastUpdatedDate}</span>`;
    title.classList.add('dropdown-head');
    a.classList.add('dropdown-content');

    data.forEach(element => {
        b = document.createElement('li');
        c = document.createElement('a');

        c.setAttribute('href', '#' + element.state);
        c.innerText = element.state;

        b.appendChild(c);
        a.appendChild(b);
    });

    title.appendChild(a);
    div.appendChild(title);

    fetch('https://worldpopulationreview.com/static/states/abbr-name.json').then((res) => res.json()).then(stateCodes => {
        data.forEach(element => {
            stateDiv = document.createElement('div');
            d = document.createElement('span');
            e = document.createElement('span');
            information = document.createElement('ul');
            

            stateDiv.id = element.state;
            d.innerHTML = `<a href='${element.url}'>${element.state}</a>`;
            e.innerText = '  ' + stateCodes[element.state];

            console.log(element.state)
            
            if (element.state == 'MP') {
                e.innerText = '  Northern Mariana Islands'
            } else if (element.state == 'PR') {
                e.innerText = '  Puerto Rico'
            };

            information.appendChild(makeaLI('Case Count:', element.actuals.cases.toLocaleString('fr')));
            information.appendChild(makeaLI('Population:', element.population.toLocaleString('fr')));
            information.appendChild(makeaLI('Case Count:', element.actuals.cases.toLocaleString('fr')));

            stateDiv.appendChild(d);
            stateDiv.appendChild(e);
            stateDiv.appendChild(information);

            stateDiv.classList.add('state');
            d.classList.add('state-code');
            e.classList.add('state-name');
    
            states.appendChild(stateDiv);
        });
        div.appendChild(states);
    });
});