const validateCard = require('./validateCard');

describe('Validação de Cartão de Crédito', () => {
    it('deve validar um número de cartão de crédito válido', () => {
        expect(validateCard('4111111111111111', 'luhn')).toBe(true); // Cartão válido
    });

    it('deve invalidar um número de cartão de crédito inválido', () => {
        expect(validateCard('1234567890123456', 'luhn')).toBe(false); // Cartão inválido
    });

    it('deve invalidar um número de cartão de crédito com menos de 13 dígitos', () => {
        expect(validateCard('1234', 'luhn')).toBe(false); // Cartão inválido (4 dígitos)
    });

    it('deve invalidar um número de cartão de crédito com mais de 19 dígitos', () => {
        expect(validateCard('12345678901234567890', 'luhn')).toBe(false); // Cartão inválido (20 dígitos)
    });

    it('deve invalidar um número de cartão de crédito com caracteres não numéricos', () => {
        expect(validateCard('4111-1111-1111-1111', 'luhn')).toBe(false); // Cartão inválido (caracteres não numéricos)
    });
});

test('Valida número de cartão com flag luhn', () => {
    expect(validateCard('4532015112830366', 'luhn')).toBe(true); // Cartão válido
    expect(validateCard('4532015112830367', 'luhn')).toBe(false); // Cartão inválido
});

test('Valida número de cartão com flag length', () => {
    expect(validateCard('4532015112830366', 'length')).toBe(true); // Cartão válido
    expect(validateCard('453201511283036', 'length')).toBe(false); // Cartão inválido (15 dígitos)
});

// spell-checker: disable
test('Valida número de cartão com formato incorreto', () => {
    expect(validateCard('453201511283036', 'luhn')).toBe(false); // Cartão inválido (15 dígitos)
    expect(validateCard('45320151128303667', 'length')).toBe(false); // Cartão inválido (17 dígitos)
});
// spell-checker: enable