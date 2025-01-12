function validateCard(cardNumber, flag) {
    const regex = /^\d{13,19}$/;
    if (!regex.test(cardNumber)) {
        return false;
    }

    if (flag === 'luhn') {
        return luhnCheck(cardNumber);
    } else if (flag === 'length') {
        return cardNumber.length >= 13 && cardNumber.length <= 19;
    }
    return false;
}

function getCardType(cardNumber) {
    const cardTypes = {
        visa: /^4/,
        mastercard: /^(5|2)/,
        elo: /^(4|5)/,
        amex: /^(34|37)/, 
        discover: /^6/,
        hipercard: /^(6060|6070)/,
        diners: /^(36|38|39)/,
        enroute: /^(201|214)/,
        jcb: /^3/,
        voyager: /^8699/,
        aura: /^50/
    };

    for (const [type, pattern] of Object.entries(cardTypes)) {
        if (pattern.test(cardNumber)) {
            return type;
        }
    }
    return null;
}

function luhnCheck(cardNumber) {
    let sum = 0;
    let alternate = false;
    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let n = parseInt(cardNumber.charAt(i), 10);
        if (alternate) {
            n *= 2;
            if (n > 9) {
                n -= 9;
            }
        }
        sum += n;
        alternate = !alternate;
    }
    return sum % 10 === 0;
}

module.exports = { validateCard, getCardType };