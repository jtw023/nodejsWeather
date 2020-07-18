console.log('loaded...');

const input = document.querySelector('input');

const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    fetch(`/weather?address=${input.value}`).then((res) => {
        res.json().then((data) => {
            form.style.display = 'none';
            const p = document.createElement('p');
            document.getElementById('div').appendChild(p);
            const para = document.querySelector('p');
            para.classList.add('weatherP');
            const btn = document.createElement('button');
            btn.textContent = 'Search Again';
            btn.classList.add('btn');
            btn.addEventListener('click', (e) => {
                window.location.reload();
            });

            if (data.Error) {
                para.textContent = data.Error;
                document.querySelector('p').appendChild(btn);
            } else if (data.weather.location === 'null, null, null') {
                const weatherData = data.weather;
                para.textContent = `It was ${weatherData.description} and ${weatherData.temperature}॰ F in ${input.value} at ${weatherData.lastObservedTime}.`;
                document.querySelector('p').appendChild(btn);
            } else {
                const weatherData = data.weather;
                para.textContent = `It was ${weatherData.description} and ${weatherData.temperature}॰ F in ${weatherData.location} at ${weatherData.lastObservedTime}.`;
                document.querySelector('p').appendChild(btn);
            }
        });
    });
});
