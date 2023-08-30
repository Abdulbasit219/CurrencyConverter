const FromCountrySelect = document.getElementById('FromCountrySelect');
const ToCountrySelect = document.getElementById('ToCountrySelect');

const options = async () => {
    try {
        const res = await fetch('https://restcountries.com/v3/all');
        const data = await res.json();
        console.log(data);
        const currencyCodes = new Set(); 
        data.forEach(country => {
            const currencies = country.currencies;
            // console.log(currencies);
            if (currencies) {
                Object.keys(currencies).forEach(currencyCode => {
                    currencyCodes.add(currencyCode);
                });
            }
        });

        Array.from(currencyCodes).forEach(currencyCode => {
            const optionFrom = document.createElement('option');
            const optionTo = document.createElement('option');
            optionFrom.value = currencyCode;
            optionFrom.textContent = currencyCode;
            optionTo.value = currencyCode;
            optionTo.textContent = currencyCode;
            FromCountrySelect.appendChild(optionFrom);
            ToCountrySelect.appendChild(optionTo);
        });

        FromCountrySelect.addEventListener("change", () => {
            const selectedCountry = data.find(country => {
                const currencies = country.currencies;
                if (currencies && currencies[FromCountrySelect.value]) {
                    return true;
                }
                return false;
            });
            console.log(selectedCountry);
            document.getElementById('Flags').innerHTML = `<img src="${selectedCountry.flags[0]}">`;
        });

        ToCountrySelect.addEventListener("change", () => {
            const ToselectedCountry = data.find(country => {
                const currencies = country.currencies;
                if (currencies && currencies[ToCountrySelect.value]) {
                    return true;
                }
                return false;
            });
            console.log(ToselectedCountry);
            document.getElementById('ToFlags').innerHTML = `<img src="${ToselectedCountry.flags[0]}">`;
        });
        

    } catch (e) {
        console.log(e);
    }
}

options();

let countriesData;

const restCountries = async () => {
    try{
        const res = await fetch('https://restcountries.com/v3/all');
        countriesData = await res.json();
        // console.log(countriesData);
    }catch(e){
        console.log(e);
    }
}

restCountries();

const fetchCurrencyData = async (currency, base_currency) => {
    const Ammount = document.getElementById("Enter_Ammount");
    const Display = document.getElementById("display");
    const Flags = document.getElementById("Flags");
    const API_Key_URL = 'cur_live_0OqDn8Qiu3C8zcZGeqWjpo6yNMqHpur0mZaqTQVy';
    if(base_currency === '' || currency === '' || base_currency === currency || Ammount.value === ''){
        alert('Please Select two Different Currency');
        return
    }
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

    let currency = ToCountrySelect.value;
    let base_currency = FromCountrySelect.value;
    // let countryFlags = FromCountrySelect.value

    FromCountrySelect.addEventListener('change', (event) => {
        base_currency = event.target.value;
        // console.log(event.target.value);
    });

    ToCountrySelect.addEventListener('change', (event) => {
        currency = event.target.value;
    });

    fetchCurrencyData(currency, base_currency);
}

// fetchData();