const options = async () => {
    try {
        const res = await fetch('list.json');
        const data = await res.json();

        const FromCountrySelect = document.getElementById('FromCountrySelect');
        data.forEach(country => {
            const option = document.createElement('option');
            option.value = country.currency_code;
            option.textContent = country.currency_code;
            FromCountrySelect.appendChild(option);
        })

        const ToCountrySelect = document.getElementById('ToCountrySelect');
        data.forEach(country => {
            const option = document.createElement('option');
            option.value = country.currency_code;
            option.textContent = country.currency_code;
            ToCountrySelect.appendChild(option);
        })

    } catch (e) {
        console.log(e);
    }
}

options();

const fetchCurrencyData = async (currency, base_currency) => {
    const Ammount = document.getElementById("Enter_Ammount");
    const Display = document.getElementById("display");
    const API_Key_URL = 'cur_live_0OqDn8Qiu3C8zcZGeqWjpo6yNMqHpur0mZaqTQVy';
    try {
        const resp = await fetch(`https://api.currencyapi.com/v3/latest?apikey=${API_Key_URL}&currencies=${currency}&base_currency=${base_currency}`);
        const data2 = await resp.json();

        Object.keys(data2.data).forEach(currencyCode => {
            let rate = data2.data[currencyCode].value * Ammount.value;
            let roundedRate = Math.round(rate * 100) / 100;
            Display.innerHTML = `${Ammount.value} ${base_currency} To ${currency} = ${roundedRate}`
        });

    } catch (e) {
        console.log(e);
    }
}

const fetchData = () => {

    const FromCountrySelect = document.getElementById('FromCountrySelect');
    const ToCountrySelect = document.getElementById('ToCountrySelect');

    let currency = ToCountrySelect.value;
    let base_currency = FromCountrySelect.value;

    FromCountrySelect.addEventListener('change', (event) => {
        base_currency = event.target.value;
    });

    ToCountrySelect.addEventListener('change', (event) => {
        currency = event.target.value;
    });

    fetchCurrencyData(currency, base_currency);
}
